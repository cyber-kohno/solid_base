import Thema from "~/system/common/design/thema";
import StoreControl from "./manage/storeControl";
import StoreData from "./data/storeData";
import StoreOutline from "./data/storeOutline";
import StoreTerminal from "./manage/storeTerminal";
import StoreCache from "./manage/storeCache";
import { proxy, useSnapshot } from "solid-valtio";
import StoreRef from "./manage/storeRef";
import StoreMelody from "./data/storeMelody";
import StorePreview from "./manage/storePreview";

export type StoreProps = {
    control: StoreControl.Props;
    terminal: null | StoreTerminal.Props;
    data: StoreData.Props;
    thema: Thema.Props;

    input: StoreInput.KeyState;
    preview: StorePreview.Props;

    cache: StoreCache.Props;

    env: {
        beatWidth: number;
    },

    ref: StoreRef.Props;

    fileHandle: {
        score?: FileSystemFileHandle
    },

    info: string;
};

export const store = proxy<StoreProps>({
    thema: {
        main: "#599",
        accent: "#999",
        sub: "#fff",
    },
    control: {
        mode: "harmonize",
        outline: {
            focus: 1
        },
        melody: {
            cursor: {
                norm: { div: 1 },
                pos: 0,
                len: 1,
                pitch: 42
            },
            focus: -1,
            focusLock: -1,
            isOverlap: false,
            trackIndex: 0,
            clipboard: { notes: null }
        }
    },
    terminal: null,
    data: {
        elements: StoreOutline.getInitialElements(),
        tracks: [StoreMelody.createMelodyTrackScoreInitial()],
    },

    input: {
        holdE: false,
        holdD: false,
        holdF: false,
        holdC: false,
        holdX: false,
        holdG: false,
        holdShift: false,
        holdCtrl: false,
    },
    preview: {
        timerKeys: null,
        intervalKeys: null,
        lastTime: -1,
        progressTime: -1,
        linePos: -1,
        audios: [],
        sfItems: []
    },
    cache: {
        baseCaches: [],
        chordCaches: [],
        elementCaches: []
    },

    env: {
        beatWidth: 120
    },

    ref: {
        elementRefs: []
    },
    fileHandle: {
    },
    info: ''
});

export const getSnapshot = () => {
    const snapshot = useSnapshot(store);
    return { snapshot };
}