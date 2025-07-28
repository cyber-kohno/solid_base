import ReducerTerminal from "../store/reducer/reducerTerminal";
import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";
import { setStore } from "../store/store";

namespace InputTerminal {

    export const control = (eventKey: string) => {

        switch (eventKey) {
            case 'Escape': {
                ReducerTerminal.close();
            } break;
            case 'Enter': {
                ReducerTerminal.registOrder();
            } break;
            case 'Backspace': {
                ReducerTerminal.removeOrder();
            } break;
            case 'ArrowLeft': {
                ReducerTerminal.moveFocus(-1);
            } break;
            case 'ArrowRight': {
                ReducerTerminal.moveFocus(1);
            } break;
            default: {
                // 単一文字のキーのみ処理する
                if (eventKey.length === 1) {
                    ReducerTerminal.insertOrder(eventKey);
                }
            } break;
        }
    }
    
}
export default InputTerminal;