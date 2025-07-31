import Thema from "~/system/common/design/thema";
import StoreControl from "./manage/storeControl";
import StoreData from "./data/storeData";
import StoreOutline from "./data/storeOutline";
import StoreTerminal from "./manage/storeTerminal";
import StoreCache from "./manage/storeCache";
import { proxy, useSnapshot } from "solid-valtio";

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

    ref: {
        grid?: HTMLDivElement;
    }
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
        }
    },
    terminal: null,
    data: {
        elements: StoreOutline.getInitialElements()
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

    ref: {}
});

export const useGlobalStore = () => {
    const snapshot = useSnapshot(store);
    return {snapshot};
}