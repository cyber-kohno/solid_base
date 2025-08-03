import { css } from "@emotion/react";
import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import { getSnapshot } from "~/system/contents/store/store";

const GridFocus = () => {
    const { snapshot } = getSnapshot();

    const values = createMemo(() => {
        const outline = snapshot.control.outline;
        const elementCache = snapshot.cache.elementCaches[outline.focus];
        const chordCaches = snapshot.cache.chordCaches;

        const lastChordSeq = elementCache.lastChordSeq;
        const chordSeq = elementCache.chordSeq;
        let left = 0;
        let width = 20;
        let isChord = false;
        if (chordSeq === -1) {

            if (lastChordSeq !== -1) {
                const chordCache = chordCaches[lastChordSeq];
                left = chordCache.viewPosLeft + chordCache.viewPosWidth;
            }
        } else {
            const chordCache = chordCaches[chordSeq];
            left = chordCache.viewPosLeft;
            width = chordCache.viewPosWidth;
            isChord = true;
        }
        return { left, width, isChord };
    });

    return (<>{() => {
        const { left, width, isChord } = values();
        return (<_Wrap
            left={left} width={width} isChord={isChord}
        />);
    }}</>);
}
export default GridFocus;

const _Wrap = styled.div<{
    left: number;
    width: number;
    isChord: boolean;
}>`
    ${SC.absolute({ zIndex: 2 })}
    top: 0;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: 100%;
    ${props => props.isChord ? css`
        background-color: #22f63e78;
    `.styles : css`
        background-color: #f60000da;
    `.styles};
`;