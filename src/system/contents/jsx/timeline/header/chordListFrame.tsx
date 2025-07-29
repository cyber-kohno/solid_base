import { For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store } from "~/system/contents/store/store";

const ChordListFrame = () => {

    return (<_Wrap>
        <For each={store.cache.chordIndexes}>{chord => {

            return <></>;
        }}</For>
    </_Wrap>);
};
export default ChordListFrame;


const _Wrap = styled.div`
    ${SC.rect}
    background-color: #cd68cb;
    width: 100%;
    height: ${Layout.timelineHeader.BLOCK_HEIGHT.toString()}px;
`;

const _Item = styled.div`
    ${SC.rect}
    background-color: #9ebca990;
    width: 100%;
    height: ${Layout.timelineHeader.BLOCK_HEIGHT.toString()}px;
`;