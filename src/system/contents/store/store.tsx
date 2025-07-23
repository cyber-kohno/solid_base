import { createStore } from "solid-js/store";
import Thema from "~/system/common/design/thema";
import StoreControl from "./storeControl";
import StoreData from "./data/storeData";
import StoreOutline from "./data/storeOutline";

export type StoreProps = {
    control: StoreControl.Props;
    data: StoreData.Props;
    thema: Thema.Props;

    input: {
        holdE: boolean;
        holdD: boolean;
        holdF: boolean;
        holdC: boolean;
        holdX: boolean;
        holdG: boolean;
        holdShift: boolean;
        holdCtrl: boolean;
    }
};

export const [store, setStore] = createStore<StoreProps>({
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
});
