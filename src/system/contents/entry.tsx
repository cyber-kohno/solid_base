import { styled } from "solid-styled-components";
import RootFrame from "./jsx/rootFrame";
import SC from "../common/styled";
import InputRoot from "./input/inputRoot";


export const Entry = () => {

    return (
        <_Wrap
            tabIndex={-1}
            onKeyDown={InputRoot.onKeyDown}
            onKeyUp={InputRoot.onKeyUp}
        >
            <RootFrame />
        </_Wrap>
    );
}

export default Entry;

const _Wrap = styled(SC._Wrap)`
    background-color: #16adc4;
`;