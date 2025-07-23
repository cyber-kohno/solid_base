import StoreOutline from "../data/storeOutline";
import { setStore, store } from "../store";

namespace ReducerRoot {
    
    export const switchMode = () => {
        const mode = store.control.mode;
        setStore('control', 'mode', mode === 'harmonize' ? 'melody' : 'harmonize');
    };
}

export default ReducerRoot;