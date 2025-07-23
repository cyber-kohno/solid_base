import StoreOutline from "../store/data/storeOutline";
import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";

namespace InputOutline {

    export const onKeyDown = (e: KeyboardEvent) => {

        switch (e.key) {
            case 'a': {
                const data: StoreOutline.DataChord = {
                    beat: 4,
                    eat: 0
                }
                ReducerOutline.insertElement({
                    type: 'chord',
                    data
                });
            } break;
            case 's': {
                const data: StoreOutline.DataSection = {
                    name: 'section'
                }
                ReducerOutline.insertElement({
                    type: 'section',
                    data
                })
            } break;

            case 'ArrowUp': {
                ReducerOutline.moveFocus(-1);
            } break;
            case 'ArrowDown': {
                ReducerOutline.moveFocus(1);
            } break;
        }
    }
}
export default InputOutline;