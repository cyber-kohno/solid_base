import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import { getSnapshot } from "../../store/store";

const Cursor = () => {
    const { snapshot } = getSnapshot();

    const left = createMemo(() => {
        const cursor = snapshot.control.melody.cursor;
        return cursor.pos.size / cursor.pos.div * snapshot.env.beatWidth;
    });

    return (<_Line left={left()} />);
};
export default Cursor;

const _Line = styled.div<{
    left: number;
}>`
    display: inline-block;
    position: absolute;
    left: ${props => props.left}px;
    top: 0;
    z-index: 2;
    width: 5px;
    height: 100%;
    background-color: red;
`;