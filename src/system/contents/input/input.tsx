import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";

namespace Input {

    export const onKeyDown = (e: KeyboardEvent) => {

        switch (e.key) {
            case 'r': {
                ReducerRoot.switchMode();
            } break;
        }
    }
}
export default Input;