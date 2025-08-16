import { store, StoreProps } from "../store";
import useReducerMelody from "./reducerMelody";

const useReducerRoot = () => {

    const reducerMelody = useReducerMelody();

    const switchMode = () => {
        const mode = store.control.mode;
        if (mode === 'harmonize') reducerMelody.syncChordSeqFromOutlineFocus();
        store.control.mode = mode === 'harmonize' ? 'melody' : 'harmonize';
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