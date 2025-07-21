import { styled } from "solid-styled-components";
import Thema from "~/system/common/design/thema";
import RootFrame from "./root/rootFrame";
import SC from "../common/styled";
import { setStore, store } from "./store/store";
import InputRoot from "./input/inputRoot";


export const Entry = () => {

    return (
        <_Wrap tabIndex={-1} onKeyDown={InputRoot.onKeyDown}>
            <RootFrame />
        </_Wrap>
    );
}

export default Entry;

const _Wrap = styled(SC._Wrap)`
    background-color: #16adc4;
`;