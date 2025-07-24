import ReducerTerminal from "../store/reducer/reducerTerminal";
import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";
import { setStore } from "../store/store";

namespace InputTerminal {

    export const onKeyDown = (e: KeyboardEvent) => {

        switch (e.key) {
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
                // アルファベットと特定の記号の正規表現
                const isAlphabetOrSymbol = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]*$/.test(e.key);
                if (e.key.length === 1) {
                    ReducerTerminal.insertOrder(e.key);
                }
            } break;
        }
    }
}
export default InputTerminal;