import { css } from "@emotion/react";
import { styled } from "solid-styled-components";
import StoreCache from "~/system/contents/store/manage/storeCache";
import { store } from "~/system/contents/store/store";

const ChordBlock = (props: {
    chordBlock: StoreCache.ChordBlock;
}) => {

    return <>{() => {
        const chordBlock = props.chordBlock;
        const focus = store.control.outline.focus;
        return (

            <_Wrap
                left={chordBlock.viewPosLeft}
                width={chordBlock.viewPosWidth}
                isFocus={focus === chordBlock.elementSeq}
            >
            </_Wrap>
        );
    }}</>;
};
export default ChordBlock;


const _Wrap = styled.div<{
    left: number;
    width: number;
    isFocus: boolean;
}>`
    display: inline-block;
    position: absolute;
    z-index: 1;

    background-color: #ffffff5b;
    top: 0;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: 100%;
    ${props => !props.isFocus ? '' : css`
        background-color: #b3c41686;
    `.styles}
`;