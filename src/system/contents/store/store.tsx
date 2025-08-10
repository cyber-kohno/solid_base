import Thema from "~/system/common/design/thema";
import StoreControl from "./manage/storeControl";
import StoreData from "./data/storeData";
import StoreOutline from "./data/storeOutline";
import StoreTerminal from "./manage/storeTerminal";
import StoreCache from "./manage/storeCache";
import { proxy, useSnapshot } from "solid-valtio";
import StoreRef from "./manage/storeRef";

export type StoreProps = {
    control: StoreControl.Props;
    terminal: null | StoreTerminal.Props;
    data: StoreData.Props;
    thema: Thema.Props;

    input: StoreInput.KeyState;

    cache: StoreCache.Props;

    env: {
        beatWidth: number;
    },

    ref: StoreRef.Props;
};

export const store: StoreProps = proxy({
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
                pos: { size: 0, div: 1 },
                len: { size: 1, div: 1 },
                pitch: 33
            },
            focus: -1,
            focusLock: -1,
            isOverlap: false,
            layerIndex: 0,
            clipboard: { notes: null }
        }
    },
    terminal: null,
    data: {
        elements: StoreOutline.getInitialElements(),
        layers: [{
            name: '',
            method: 'score',
            volume: 10,
            isMute: false
        }],
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

    cache: {
        baseCaches: [],
        chordCaches: [],
        elementCaches: []
    },

    env: {
        beatWidth: 100
    },

    ref: {
        elementRefs: []
    }
});

export const getSnapshot = () => {
    const snapshot = useSnapshot(store);
    return { snapshot };
}