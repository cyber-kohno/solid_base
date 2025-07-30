import { css } from "@emotion/react";
import { styled } from "solid-styled-components";
import StoreCache from "~/system/contents/store/manage/storeCache";
import { useGlobalStore } from "~/system/contents/store/store";

const ChordBlock = (props: {
    cache: StoreCache.ChordCache;
}) => {
    const {snapshot} = useGlobalStore();

    return <>{() => {
        const cache = props.cache;
        const focus = snapshot.control.outline.focus;
        return (

            <_Wrap
                left={cache.viewPosLeft}
                width={cache.viewPosWidth}
                isFocus={focus === cache.elementSeq}
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