import { createMemo, For, Show } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store, getSnapshot } from "~/system/contents/store/store";
import BaseBlock from "./baseBlock";
import GridFocus from "./gridFocus";
import MarginBlock from "../../common/marginBlock";
import ChordBlock from "./chordBlock";
import Cursor from "../../melody/cursor";
import ActiveNotes from "../../melody/score/activeNotes";
import { css } from "@emotion/react";
import OtherTrackNotes from "../../melody/score/otherTrackNotes";
import PreviewLine from "../preview/previewLine";
import useAccessorPreview from "~/system/contents/store/accessor/accessorPreview";

const GridRootFrame = () => {
    const { snapshot } = getSnapshot();
    const { isPreview } = useAccessorPreview(snapshot);

    const initRef = (ref: HTMLDivElement) => store.ref.grid = () => ref;

    const isDispCursor = createMemo(() => snapshot.control.melody.focus === -1 && !isPreview());
    const isMelodyMode = createMemo(() => snapshot.control.mode === 'melody');

    return (<_Wrap ref={initRef}>
        <For each={snapshot.cache.baseCaches}>
            {(base, i) => <BaseBlock baseBlock={base} index={i()} />}
        </For>
        <For each={snapshot.cache.chordCaches}>
            {chordBlock => <ChordBlock cache={chordBlock} />}
        </For>
        <MarginBlock.Block />
        <GridFocus />

        <Show when={isMelodyMode()}>
            {/* <Show when={isDispCursor()} >
                <Cursor />
            </Show> */}
            {(() => {
                if (!isDispCursor()) return <></>
                return <Cursor />
            })()}
        </Show>
        <_NotesWrap isActive={isMelodyMode()}>
            <OtherTrackNotes />
            <ActiveNotes />
        </_NotesWrap>


        <Show when={isPreview()}>
            <PreviewLine />
        </Show>
    </_Wrap>);
};
export default GridRootFrame;

const _Wrap = styled.div`
    ${SC.rect}
    background-color: #647d92;
    width: calc(100% - ${Layout.timeline.PITCH_WIDTH.toString()}px);
    height: 100%;
    overflow: hidden;
`;
const _NotesWrap = styled.div<{
    isActive: boolean;
}>`
    ${SC.rect}
    ${props => props.isActive ? '' : css`
        opacity: 0.6;
    `.styles}
`;