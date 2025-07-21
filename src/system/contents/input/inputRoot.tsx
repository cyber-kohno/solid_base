import Reducer from "../store/reducer/reducer";

namespace InputRoot {

    export const onKeyDown = (e: KeyboardEvent) => {

        console.log(e.key);
        switch (e.key) {
            case 'r': {
                Reducer.control.switchMode();
            } break;
            case 'a': {
                Reducer.control.outline.addTest();
            } break;
        }
    }
}
export default InputRoot;