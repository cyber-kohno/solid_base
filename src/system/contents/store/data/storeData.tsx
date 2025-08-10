import StoreMelody from "./storeMelody";
import StoreOutline from "./storeOutline";

namespace StoreData {

    export type Props = {
        
        elements: StoreOutline.Element[];
        layers: StoreMelody.MelodyLayer[];
    }
}
export default StoreData;