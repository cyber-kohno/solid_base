import { css } from "@emotion/react";
import { createMemo, For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import StoreCache from "~/system/contents/store/manage/storeCache";
import { useGlobalStore } from "~/system/contents/store/store";
import MusicTheory from "~/system/contents/util/musicTheory";

const ChordListFrame = () => {
    const { snapshot } = useGlobalStore();

    const focus = createMemo(() => snapshot.control.outline.focus);

    const getChordName = (cache: StoreCache.ChordCache) => {
        const compiledChord = cache.compiledChord;
        if (compiledChord == undefined) return '-';
        return MusicTheory.getKeyChordName(compiledChord.chord);
    }

    return (<_Wrap>
        <For each={snapshot.cache.chordCaches}>{cache => {
            return <_Item
                left={cache.viewPosLeft}
                width={cache.viewPosWidth}
            ><_Inner
                isFocus={focus() === cache.elementSeq}
            >{getChordName(cache)}</_Inner></_Item>;
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

const _Item = styled.div<{
    left: number;
    width: number;
}>`
    display: inline-block;
    position: absolute;
    z-index: 1;
    background-color: #500000d6;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: ${Layout.timelineHeader.BLOCK_HEIGHT.toString()}px;
`;

const _Inner = styled.div<{
    isFocus: boolean;
}>`
    ${SC.wrap({ margin: 2 })}
    background-color: #b7a4a48f;

    ${SC.text({ fontSize: 22, lineHeight: 36 })}
    text-align: center;
    ${props => !props.isFocus ? '' : css`
        background-color: #b3c41686;
    `.styles}
`;