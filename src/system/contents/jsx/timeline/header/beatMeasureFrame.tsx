import { For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store } from "~/system/contents/store/store";

const BeatMeasureFrame = () => {

    return (<_Wrap>
    </_Wrap>);
};
export default BeatMeasureFrame;

const _Wrap = styled.div`
    ${SC.rect}
    background-color: #b6ebe4;
    width: 100%;
    height: ${Layout.timelineHeader.MEMORI_HEIGHT.toString()}px;
`;