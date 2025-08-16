import StoreMelody from "./storeMelody";
import StoreOutline from "./storeOutline";

namespace StoreData {

    export type Props = {
        
        elements: StoreOutline.Element[];
        tracks: StoreMelody.Track[];
    }
}
export default StoreData;