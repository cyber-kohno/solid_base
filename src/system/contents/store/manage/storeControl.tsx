import StoreMelody from "../data/storeMelody";

namespace StoreControl {

    export type Props = {
        mode: "harmonize" | "melody";

        outline: {
            focus: number;
        },
        melody: StoreMelody.Props;
    }
}
export default StoreControl;