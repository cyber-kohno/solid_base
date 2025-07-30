import { For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";

const ProgressInfoFrame = () => {

    return (<_Wrap>
    </_Wrap>);
};
export default ProgressInfoFrame;


const _Wrap = styled.div`
    ${SC.rect}
    background-color: #d9b4d8;
    width: 100%;
    height: ${Layout.timelineHeader.INFO_HEIGHT.toString()}px;
`;