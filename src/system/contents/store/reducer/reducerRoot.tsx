import StoreOutline from "../data/storeOutline";
import { setStore, store, StoreProps } from "../store";

namespace ReducerRoot {

    export const switchMode = () => {
        const mode = store.control.mode;
        setStore('control', 'mode', mode === 'harmonize' ? 'melody' : 'harmonize');
    };

    export type InputKey = keyof StoreProps['input'];
    export const setInputHold = (key: InputKey, isDown: boolean) => {
        setStore('input', key, isDown);
    }

    export const hasHold = () => {
        return Object.values(store.input).find(flg => flg) != undefined;
    }
}

export default ReducerRoot;