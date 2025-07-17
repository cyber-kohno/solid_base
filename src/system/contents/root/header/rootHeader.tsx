import { styled } from "solid-styled-components";
import Thema from "~/system/common/design/thema";
import { store } from "../../store/store";
import SC from "~/system/common/styled";

const RootHeader = () => {

    const thema = store.thema;
    return <_Wrap />;
}

export default RootHeader;

const thema = store.thema;

const _Wrap = styled('div')`
    ${SC.rect}
    width: 100%;
    height: 100%;
    background-color: ${thema.main};
`;