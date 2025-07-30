import { styled } from "solid-styled-components";
import RootFrame from "./jsx/rootFrame";
import SC from "../common/styled";
import useInputRoot from "./input/inputRoot";
import { useGlobalStore } from "./store/store";


export const Entry = () => {
    const inputRoot = useInputRoot();

    return (
        <_Wrap
            tabIndex={-1}
            onKeyDown={inputRoot.onKeyDown}
            onKeyUp={inputRoot.onKeyUp}
        >
            <RootFrame />
        </_Wrap>
    );
}

export default Entry;

const _Wrap = styled(SC._Wrap)`
    background-color: #16adc4;
`;