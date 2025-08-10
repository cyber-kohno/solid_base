import { For, Show } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store, getSnapshot } from "~/system/contents/store/store";
import BaseBlock from "./baseBlock";
import GridFocus from "./gridFocus";
import MarginBlock from "../../common/marginBlock";
import ChordBlock from "./chordBlock";
import Cursor from "../../melody/cursor";

const GridRootFrame = () => {
    const { snapshot } = getSnapshot();

    const initRef = (ref: HTMLDivElement) => store.ref.grid = () => ref;

    return (<_Wrap ref={initRef}>
        <For each={snapshot.cache.baseCaches}>
            {(base, i) => <BaseBlock baseBlock={base} index={i()} />}
        </For>
        <For each={snapshot.cache.chordCaches}>
            {chordBlock => <ChordBlock cache={chordBlock} />}
        </For>
        <MarginBlock.Block />
        <GridFocus />

        <Show when={snapshot.control.mode === 'melody'}>
            <Cursor />
        </Show>
    </_Wrap>);
};
export default GridRootFrame;

const _Wrap = styled.div`
    ${SC.rect}
    /* background-color: #776788; */
    width: calc(100% - ${Layout.timeline.PITCH_WIDTH.toString()}px);
    height: 100%;
    overflow: hidden;
`;