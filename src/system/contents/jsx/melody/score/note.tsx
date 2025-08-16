import { css } from "@emotion/react";
import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import Layout from "~/system/contents/const/layout";
import StoreMelody from "~/system/contents/store/data/storeMelody";
import { getSnapshot } from "~/system/contents/store/store";
import Factors from "./factors";
import useAccessorCache from "~/system/contents/store/accessor/accessorCache";
import MusicTheory from "~/system/contents/util/musicTheory";

type OperationStates = 'scale' | 'octave' | 'len' | 'pos';

const Note = (props: {
    note: StoreMelody.Note;
    index: number;
}) => {
    const { snapshot } = getSnapshot();
    const { getBaseFromBeat } = useAccessorCache(snapshot);

    const noteInfo = createMemo(() => {
        const note = props.note;
        const beatSize = StoreMelody.calcBeat(note.norm, note.pos);
        const left = snapshot.env.beatWidth * beatSize;
        const pitch = note.pitch;
        return { left, pitch };
    });

    const width = createMemo(() => {
        const cursor = props.note;
        const beatSize = StoreMelody.calcBeat(cursor.norm, cursor.len);
        return snapshot.env.beatWidth * beatSize;
    });

    const isScale = createMemo(() => {
        const note = props.note;
        const tonality = getBaseFromBeat(StoreMelody.calcBeat(note.norm, note.pos)).scoreBase.tonality;
        return MusicTheory.isScale(note.pitch, tonality);
    });

    const isFocus = createMemo(() => {
        return snapshot.control.mode === 'melody' &&
            snapshot.control.melody.focus === props.index;
    });

    const operationStates = createMemo<OperationStates | null>(() => {
        const input = snapshot.input;
        if (input.holdD) return 'pos';
        if (input.holdF) return 'len';
        if (input.holdC) return 'scale';
        if (input.holdX) return 'octave';

        return null;
    });

    return (
        <_Div
            left={noteInfo().left}
            width={width()}
            isFocus={isFocus()}
            state={operationStates()}
        >
            <_Frame
                pitchIndex={noteInfo().pitch}
                isScale={isScale()}
            >
                <Factors note={props.note} />
                <_Info>{noteInfo().pitch}</_Info>
            </_Frame>
        </_Div>
    );
};
export default Note;

const PL = Layout.pitch;
const Height = PL.ITEM_HEIGHT * PL.NUM;

const MARGIN = 2;

const _Div = styled.div<{
    left: number;
    width: number;
    isFocus: boolean;
    state: OperationStates | null;
}>`
    display: inline-block;
    position: absolute;
    left: ${props => props.left}px;
    top: 0;
    width: ${props => props.width}px;
    height: ${() => Height}px;
    z-index: 2;
    background-color: ${props => !props.isFocus ? '#ffffff45' : (() => {
        switch (props.state) {
            case 'pos': return '#7cffc4aa';
            case 'len': return '#232affaa';
            case 'scale': return '#ffd53faa';
            case 'octave': return '#ffa03baa';
            default: return '#ffffff88';
        }
    })()};
    /* border: 1px solid #ffffff; */
    box-sizing: border-box;
`;
const _Frame = styled.div<{
    pitchIndex: number;
    isScale: boolean;
}>`
    display: inline-block;
    position: absolute;
    left: 0;
    top: ${props => Layout.getPitchTop(props.pitchIndex) - MARGIN}px;
    width: 100%;
    height: ${() => PL.ITEM_HEIGHT + MARGIN * 2}px;
    z-index: 2;
    /* background-color: #09c7f7a3; */
    /* background: linear-gradient(to bottom, #1cabcfd6,#addce8ac, #1cabcfd6); */
    background: linear-gradient(to bottom, #1ccf49d5,#b5e8adac, #1ccf49d5);
    ${props => props.isScale ? '' : css`    
        background: linear-gradient(to bottom, #eacb1dd5,#e8e1adac, #eacb1dd5);
    `.styles}
    border-radius: 0 12px 12px 0;
    box-sizing: border-box;
    box-shadow: 10px 10px 15px -10px;
`;

const _Info = styled.div`
    display: inline-block;
    position: absolute;
    z-index: 4;
    color: rgba(156, 0, 0, 0.726);
    left: 0;
    top: 32px;
    font-size: 12px;
    font-weight: 600;
`;