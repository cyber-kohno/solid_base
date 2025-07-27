import ReducerTerminal from "../store/reducer/reducerTerminal";
import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";
import { store } from "../store/store";
import InputTerminal from "./inputTerminal";
import InputMelody from "./inputMelody";
import InputOutline from "./inputOutline";

namespace InputRoot {

    export const onKeyDown = (e: KeyboardEvent) => {

        if(ReducerTerminal.isUse()) {
            InputTerminal.onKeyDown(e);
            return;
        }

        // console.log(e.key);
        switch (e.key) {
            case 'r': {
                ReducerRoot.switchMode();
            } break;
            case 't': {
                ReducerTerminal.open();
            } break;
        }

        switch (store.control.mode) {
            case 'harmonize': {
                InputOutline.onKeyDown(e);
            } break;
            case 'melody': {
                InputMelody.onKeyDown(e);
            } break;
        }
    }
}
export default InputRoot;