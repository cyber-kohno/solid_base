import useReducerTerminal from "../store/reducer/reducerTerminal";
import { StoreProps } from "../store/store";

const useInputTerminal = () => {

    const reducerTerminal = useReducerTerminal();

    const control = (eventKey: string) => {

        switch (eventKey) {
            case 'Escape': {
                reducerTerminal.close();
            } break;
            case 'Enter': {
                reducerTerminal.registOrder();
            } break;
            case 'Backspace': {
                reducerTerminal.removeOrder();
            } break;
            case 'ArrowLeft': {
                reducerTerminal.moveFocus(-1);
            } break;
            case 'ArrowRight': {
                reducerTerminal.moveFocus(1);
            } break;
            default: {
                // 単一文字のキーのみ処理する
                if (eventKey.length === 1) {
                    reducerTerminal.insertOrder(eventKey);
                }
            } break;
        }
    }
    
    return {
        control
    }
}
export default useInputTerminal;