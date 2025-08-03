import { createEffect, createSignal, For, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store, getSnapshot } from "~/system/contents/store/store";
import BaseBlock from "./baseBlock";
import GridFocus from "./gridFocus";
import MarginBlock from "../../common/marginBlock";
import ChordBlock from "./chordBlock";

const GridRootFrame = () => {
    const { snapshot } = getSnapshot();

    return (<_Wrap ref={(ref) => {
        // console.log('store.ref.grid = () => ref');
        store.ref.grid = () => ref;
    }}>
        <For each={snapshot.cache.baseCaches}>
            {(base, i) => <BaseBlock baseBlock={base} index={i()} />}
        </For>
        <For each={snapshot.cache.chordCaches}>
            {chordBlock => <ChordBlock cache={chordBlock} />}
        </For>
        <MarginBlock.Block />
        <GridFocus />
    </_Wrap>);
};
export default GridRootFrame;

const _Wrap = styled.div`
    ${SC.rect}
    background-color: #6716c4;
    width: calc(100% - ${Layout.timeline.PITCH_WIDTH.toString()}px);
    height: 100%;
    overflow: hidden;
`;