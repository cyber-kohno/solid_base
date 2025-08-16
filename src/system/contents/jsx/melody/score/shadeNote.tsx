import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import Layout from "~/system/contents/const/layout";
import StoreMelody from "~/system/contents/store/data/storeMelody";
import { getSnapshot } from "~/system/contents/store/store";

const ShadeNote = (props: {
    note: StoreMelody.Note;
    noteColor: string;
}) => {
    const { snapshot } = getSnapshot();

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

    return (
        <_Div
            left={noteInfo().left}
            width={width()}
        >
            <_Note
                pitchIndex={noteInfo().pitch}
                noteColor={props.noteColor}
            />
        </_Div>
    );
};
export default ShadeNote;

const PL = Layout.pitch;
const Height = PL.ITEM_HEIGHT * PL.NUM;

const MARGIN = -10;

const _Div = styled.div<{
    left: number;
    width: number;
}>`
    display: inline-block;
    position: absolute;
    left: ${props => props.left}px;
    top: 0;
    width: ${props => props.width}px;
    height: ${() => Height}px;
    z-index: 2;
`;
const _Note = styled.div<{
    pitchIndex: number;
    noteColor: string;
}>`
    display: inline-block;
    position: absolute;
    left: 0;
    top: ${props => Layout.getPitchTop(props.pitchIndex) - MARGIN}px;
    width: 100%;
    height: ${() => PL.ITEM_HEIGHT + MARGIN * 2}px;
    background-color: ${props => props.noteColor};
    border-radius: 0 12px 12px 0;
    box-sizing: border-box;
`;