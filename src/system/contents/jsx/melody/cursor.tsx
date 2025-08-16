import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import { getSnapshot } from "../../store/store";
import Layout from "../../const/layout";
import StoreMelody from "../../store/data/storeMelody";
import SC from "~/system/common/styled";

const Cursor = () => {
    const { snapshot } = getSnapshot();

    const noteInfo = createMemo(() => {
        const melody = snapshot.control.melody;
        const cursor = melody.cursor;
        const beatSize = StoreMelody.calcBeat(cursor.norm, cursor.pos);
        const left = snapshot.env.beatWidth * beatSize;
        const pitch = cursor.pitch;
        const isOverlap = melody.isOverlap;
        return { left, pitch, isOverlap };
    });

    const width = createMemo(() => {
        const melody = snapshot.control.melody;
        const cursor = melody.cursor;
        const beatSize = StoreMelody.calcBeat(cursor.norm, cursor.len);
        return snapshot.env.beatWidth * beatSize;
    });

    const unit = createMemo(() => {
        const melody = snapshot.control.melody;
        const cursor = melody.cursor;
        const tuplets = cursor.norm.tuplets;
        return `1/${cursor.norm.div * 4} ${!tuplets ? '' : ` ${tuplets}t`}`;
    });

    return (
        <_Line
            left={noteInfo().left}
            isOverlap={noteInfo().isOverlap}
        >
            <_Flag
                pitchIndex={noteInfo().pitch}
                width={width()}
                isOverlap={noteInfo().isOverlap}
            ><_INFO isOverlap={noteInfo().isOverlap}>{unit()}</_INFO></_Flag>
        </_Line>
    );
};
export default Cursor;

const BORDER_WIDTH = 10;

const PL = Layout.pitch;
const Height = PL.ITEM_HEIGHT * PL.NUM;

// const _normal = css`
//     background-color: #22ff00;
// `.styles;
// const _overlap = css`
//     background-color: #ff0000;
// `.styles;

const getColor = (isOverlap: boolean) => !isOverlap ? '#22ff00' : '#ff0000';

const _Line = styled.div<{
    left: number;
    isOverlap: boolean;
}>`
    display: inline-block;
    position: absolute;
    left: ${props => props.left}px;
    top: 0;
    z-index: 2;
    width: ${() => BORDER_WIDTH}px;
    height: ${() => Height}px;
    background-color: ${props => getColor(props.isOverlap)};
    opacity: 0.7;
`;
const PITCH_WIDTH = Layout.pitch.ITEM_HEIGHT;

const _Flag = styled.div<{
    pitchIndex: number;
    width: number;
    isOverlap: boolean;
}>`
    display: inline-block;
    position: absolute;
    left: ${() => BORDER_WIDTH}px;
    top: ${props => Layout.getPitchTop(props.pitchIndex)}px;
    z-index: 2;
    width: ${props => props.width - BORDER_WIDTH}px;
    height: ${() => PITCH_WIDTH}px;
    background-color: ${props => getColor(props.isOverlap)};
    border-radius: 0 2px 2px 0;
`;

const _INFO = styled.div<{
    isOverlap: boolean;
}>`
    display: inline-block;
    position: absolute;
    left: 4px;
    top: -28px;
    z-index: 2;
    ${props => SC.text({ color: getColor(props.isOverlap), fontSize: 18 })}
    white-space: nowrap;
`;