import { store, StoreProps } from "../store";

const useReducerRoot = () => {

     const switchMode = () => {
        const mode = store.control.mode;
        store.control.mode= mode === 'harmonize' ? 'melody' : 'harmonize';
    };

     type InputKey = keyof StoreProps['input'];
     const setInputHold = (key: InputKey, isDown: boolean) => {
        store.input[key] = isDown;
    }

     const hasHold = () => {
        return Object.values(store.input).find(flg => flg) != undefined;
    }

    return {
        switchMode,
        setInputHold,
        hasHold
    };
}

export default useReducerRoot;