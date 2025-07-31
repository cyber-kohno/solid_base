import { css } from "@emotion/react";
import { styled } from "solid-styled-components";
import StoreCache from "~/system/contents/store/manage/storeCache";

const ChordBlock = (props: {
    cache: StoreCache.ChordCache;
}) => {

    return <>{() => {
        const cache = props.cache;
        return (

            <_Wrap
                left={cache.viewPosLeft}
                width={cache.viewPosWidth}
            >
            </_Wrap>
        );
    }}</>;
};
export default ChordBlock;


const _Wrap = styled.div<{
    left: number;
    width: number;
}>`
    display: inline-block;
    position: absolute;
    z-index: 1;

    background-color: #ffffff5b;
    top: 0;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: 100%;
`;