import ReducerTerminal from "../store/reducer/reducerTerminal";
import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";
import { store } from "../store/store";
import InputTerminal from "./inputTerminal";
import InputMelody from "./inputMelody";
import InputOutline from "./inputOutline";

namespace InputRoot {

    const controlKeyHold = (eventKey: string, isDown: boolean) => {
        const set = ReducerRoot.setInputHold;
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

    export const holdControl = (callbacks: StoreInput.Callbacks) => {
        Object.keys(callbacks).some(key => {
            const holdKey = key as keyof typeof store.input; // キーをタイプアサーションして型を指定
            const callback = callbacks[holdKey];
            if(store.input[holdKey] && callback != undefined) {
                callback();
                // 1つでも処理したらループを抜ける。
                return 1;
            }
        });
    }

    export const onKeyDown = (e: KeyboardEvent) => {
        const eventKey = e.key;
        // console.log(eventKey);

        const mode = store.control.mode;

        if (!ReducerRoot.hasHold()) {
            if (ReducerTerminal.isUse()) {
                InputTerminal.control(eventKey);
                return;
            }

            switch (eventKey) {
                case 'r': {
                    ReducerRoot.switchMode();
                } break;
                case 't': {
                    ReducerTerminal.open();
                } break;
            }

            switch (mode) {
                case 'harmonize': {
                    InputOutline.control(eventKey);
                } break;
                case 'melody': {
                    InputMelody.control(eventKey);
                } break;
            }

            controlKeyHold(e.key, true);
        } else {
            holdControl(getHoldCallbacks(eventKey));
            
            switch (mode) {
                case 'harmonize': {
                    holdControl(InputOutline.getHoldCallbacks(eventKey));
                } break;
                case 'melody': {
                    holdControl(InputMelody.getHoldCallbacks(eventKey));
                } break;
            }
        }
    }

    export const onKeyUp = (e: KeyboardEvent) => {
        controlKeyHold(e.key, false);
    }

    // const getHoldCallbacks = (): StoreInput.Callbacks => {
    //     const callbacks: StoreInput.Callbacks = {};

    //     return callbacks;
    // }
    const getHoldCallbacks = (eventKey: string): StoreInput.Callbacks => {
        const callbacks: StoreInput.Callbacks = {};

        callbacks.holdE = () => {

            switch(eventKey) {
                case 'ArrowUp': {
                    console.log('E押しながら上');
                } break;
            }
        }
        return callbacks;
    }
}
export default InputRoot;