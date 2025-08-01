import { createEffect, createSignal, For, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store, useGlobalStore } from "~/system/contents/store/store";
import BaseBlock from "./baseBlock";
import GridFocus from "./gridFocus";

const GridRootFrame = () => {
    const { snapshot } = useGlobalStore();

    return (<_Wrap ref={(ref) => store.ref.grid = () => ref}>
        <For each={snapshot.cache.baseCaches}>
            {(base, i) => <BaseBlock baseBlock={base} index={i()} />}
        </For>
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