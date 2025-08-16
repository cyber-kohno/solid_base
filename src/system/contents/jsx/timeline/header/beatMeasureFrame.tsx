import { For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { getSnapshot } from "~/system/contents/store/store";
import MeasureBlock from "./measureBlock";
import MeasureFocus from "./measureFocus";

const BeatMeasureFrame = (props: {
    headerWidth: number;
}) => {
    const { snapshot } = getSnapshot();

    return (<_Wrap width={props.headerWidth}>
        <For each={snapshot.cache.baseCaches}>{base => {

            return <MeasureBlock base={base}/>;
        }}</For>
        <MeasureFocus />
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