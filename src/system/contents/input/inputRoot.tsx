import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";
import { store } from "../store/store";
import InputMelody from "./inputMelody";
import InputOutline from "./inputOutline";

namespace InputRoot {

    export const onKeyDown = (e: KeyboardEvent) => {

        console.log(e.key);
        switch (e.key) {
            case 'r': {
                ReducerRoot.switchMode();
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