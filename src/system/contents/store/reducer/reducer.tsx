import StoreOutline from "../data/storeOutline";
import { setStore, store } from "../store";

namespace Reducer {

    export const control = {
        switchMode: () => {
            const mode = store.control.mode;
            setStore('control', 'mode', mode === 'harmonize' ? 'melody' : 'harmonize');
        },

        outline: {
            addTest: () => {
                const elements = store.data.elements.slice();
                const data: StoreOutline.DataChord = {
                    beat: 4,
                    eat: 0
                }
                const element: StoreOutline.Element = {
                    type: 'chord',
                    data
                };
                elements.push(element);
                setStore('data', 'elements', elements);
            }
        }
    }
}

export default Reducer;