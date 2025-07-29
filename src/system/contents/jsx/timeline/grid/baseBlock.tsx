import { createMemo, For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import StoreCache from "~/system/contents/store/manage/storeCache";
import { store } from "~/system/contents/store/store";
import MusicTheory from "~/system/contents/util/musicTheory";
import ChordBlock from "./chordBlock";

type PitchType = 'tonic' | 'other' | 'scale';
const BaseBlock = (props: {
    baseBlock: StoreCache.BaseBlock;
}) => {

    const baseBlock = createMemo(() => props.baseBlock);

    const beatDiv16Count = createMemo(() => MusicTheory.getBeatDiv16Count(
        baseBlock().scoreBase.ts,
    ));

    const beatWidth = createMemo(() => store.env.beatWidth * (beatDiv16Count() / 4));

    const measureLines = createMemo(() => {
        const list: {
            left: number;
            width: number;
        }[] = [];
        const cnt = baseBlock().lengthBeat * beatDiv16Count();
        for (let i = 0; i < cnt; i++) {
            const left = (beatWidth() / beatDiv16Count()) * i;
            let width = 1;
            if (i % beatDiv16Count() === 0) width = 2;
            list.push({ left, width });
        }
        return list;
    });

    const pitchItems = createMemo(() => {
        const pitchNum = Layout.pitch.PITCH_NUM;
        const tonality = baseBlock().scoreBase.tonality;
        const scaleList =
            tonality.scale === "major"
                ? MusicTheory.MAJOR_SCALE_INTERVALS
                : MusicTheory.MINOR_SCALE_INTERVALS;
        const list: {
            top: number;
            type: PitchType;
        }[] = [];
        for (let i = 0; i < pitchNum; i++) {
            const top = i * Layout.pitch.PITCH_ITEM_HEIGHT;
            let type: PitchType = 'other';

            const pitchIndex = pitchNum - 1 - i;

            const keyIndex = MusicTheory.getKeyIndex(pitchIndex, tonality.key12);
            if (keyIndex === 0) type = 'tonic';
            else if (scaleList.includes(keyIndex)) type = 'scale';
            list.push({ top, type });
        }
        return list;
    });

    return (
        <_Wrap left={baseBlock().viewPosLeft} width={baseBlock().viewPosWidth}>

            {/* 16分音符毎の補助ライン */}
            <For each={measureLines()}>
                {line => <_Line left={line.left} width={line.width} />}
            </For>
            {/* 音程の補助ライン */}
            <For each={pitchItems()}>
                {pitch => <_Pitch top={pitch.top} type={pitch.type} />}
            </For>

            <For each={baseBlock().chordBlocks}>
                {chordBlock => <ChordBlock chordBlock={chordBlock}/>}
            </For>
        </_Wrap>
    );
};

export default BaseBlock;

const PL = Layout.pitch;
const Height = PL.PITCH_ITEM_HEIGHT * PL.PITCH_NUM;

const _Wrap = styled.div<{
    left: number;
    width: number;
}>`
    display: inline-block;
    position: relative;
    z-index: 1;

    background-color: #16c49687;
    top: 0;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: ${Height.toString()}px;
`;

const _Line = styled.div<{
    left: number;
    width: number;
}>`
    display: inline-block;
    position: absolute;
    z-index: 2;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.478);
`;


const _Pitch = styled.div<{
    top: number;
    type: PitchType;
}>`
    display: inline-block;
    position: absolute;
    z-index: 2;
    left: 0;
    top: ${props => props.top}px;
    width: 100%;
    height: ${PL.PITCH_ITEM_HEIGHT.toString()}px;
    background-color: ${props => (() => {
        switch (props.type) {
            case 'other': return '#000';
            case 'tonic': return '#f00';
            case 'scale': return '#fa3';
        }
    })()};
    opacity: 0.2;
`;