import { For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";

const BeatMeasureFrame = (props: {
    headerWidth: number;
}) => {

    return (<_Wrap width={props.headerWidth}>
    </_Wrap>);
};
export default BeatMeasureFrame;

const _Wrap = styled.div<{
    width: number;
}>`
    ${SC.rect}
    background-color: #b6ebe4;
    min-width: 100%;
    width: ${props => props.width}px;
    height: ${Layout.timelineHeader.MEMORI_HEIGHT.toString()}px;
`;