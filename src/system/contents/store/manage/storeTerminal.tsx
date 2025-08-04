import { JSX } from "solid-js/jsx-runtime";

namespace StoreTerminal {

    export type Props = {
        histories: (()=>JSX.Element)[];
        command: string;
        target: string;
        focus: number;
    }
}
export default StoreTerminal;