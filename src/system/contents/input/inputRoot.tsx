import useReducerTerminal from "../store/reducer/reducerTerminal";
import useReducerRoot from "../store/reducer/reducerRoot";
import { store, StoreProps, useGlobalStore } from "../store/store";
import useInputTerminal from "./inputTerminal";
import useInputMelody from "./inputMelody";
import useInputOutline from "./inputOutline";

const useInputRoot = () => {
    const reducerRoot = useReducerRoot();
    const reducerTerminal = useReducerTerminal();

    const inputOutline = useInputOutline();
    const inputMelody = useInputMelody();
    const inputTerminal = useInputTerminal();

    const controlKeyHold = (eventKey: string, isDown: boolean) => {
        const set = reducerRoot.setInputHold;
        switch (eventKey) {
            case "e": { set('holdE', isDown) } break;
            case "d": { set('holdD', isDown) } break;
            case "f": { set('holdF', isDown) } break;
            case "c": { set('holdC', isDown) } break;
            case "x": { set('holdX', isDown) } break;
            case "g": { set('holdG', isDown) } break;
            case "Shift": { set('holdShift', isDown) } break;
            case "Control": { set('holdCtrl', isDown) } break;
        }
    }

    const holdControl = (callbacks: StoreInput.Callbacks) => {

        Object.keys(callbacks).some(key => {
            const holdKey = key as keyof typeof store.input; // キーをタイプアサーションして型を指定
            const callback = callbacks[holdKey];
            if (store.input[holdKey] && callback != undefined) {
                callback();
                // 1つでも処理したらループを抜ける。
                return 1;
            }
        });
    }

    const onKeyDown = (e: KeyboardEvent) => {
        const eventKey = e.key;

        const mode = store.control.mode;

        if (!reducerRoot.hasHold()) {
            if (reducerTerminal.isUse()) {
                inputTerminal.control(eventKey);
                return;
            }

            switch (eventKey) {
                case 'r': {
                    reducerRoot.switchMode();
                } break;
                case 't': {
                    reducerTerminal.open();
                } break;
            }

            switch (mode) {
                case 'harmonize': {
                    inputOutline.control(eventKey);
                } break;
                case 'melody': {
                    inputMelody.control(eventKey);
                } break;
            }

            controlKeyHold(e.key, true);
        } else {
            holdControl(getHoldCallbacks(eventKey));

            switch (mode) {
                case 'harmonize': {
                    holdControl(inputOutline.getHoldCallbacks(eventKey));
                } break;
                case 'melody': {
                    holdControl(inputMelody.getHoldCallbacks(eventKey));
                } break;
            }
        }
    }

    const onKeyUp = (e: KeyboardEvent) => {
        controlKeyHold(e.key, false);
    }

    // const getHoldCallbacks = (): StoreInput.Callbacks => {
    //     const callbacks: StoreInput.Callbacks = {};

    //     return callbacks;
    // }
    const getHoldCallbacks = (eventKey: string): StoreInput.Callbacks => {
        const callbacks: StoreInput.Callbacks = {};

        callbacks.holdE = () => {

            switch (eventKey) {
                case 'ArrowUp': {
                    console.log('E押しながら上');
                } break;
            }
        }
        return callbacks;
    }

    return {
        onKeyDown,
        onKeyUp
    }
}
export default useInputRoot;