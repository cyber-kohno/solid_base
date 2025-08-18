import { createMemo, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";
import Layout from "~/system/contents/const/layout";
import { getSnapshot } from "~/system/contents/store/store";

const PreviewLine = () => {
    const { snapshot } = getSnapshot();

    const pos = createMemo(() => {
        return snapshot.preview.linePos * snapshot.env.beatWidth;
    });

    return (
        <_Line
            left={pos()}
        />
    );
};
export default PreviewLine;

const BORDER_WIDTH = 6;

const PL = Layout.pitch;
const Height = PL.ITEM_HEIGHT * PL.NUM;

const _Line = styled.div<{
    left: number;
}>`
    display: inline-block;
    position: absolute;
    left: ${props => props.left}px;
    top: 0;
    z-index: 2;
    width: ${() => BORDER_WIDTH}px;
    height: ${() => Height}px;
    background-color: #ffdf13;
    /* opacity: 0.7; */
`;
