import { css } from "@emotion/react";
import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import useAccessorCache from "~/system/contents/store/accessor/accessorCache";
import { getSnapshot } from "~/system/contents/store/store";

const MeasureFocus = () => {

    const { snapshot } = getSnapshot();
    const { getFocusInfo } = useAccessorCache(snapshot);

    const values = createMemo(getFocusInfo);

    return () => {
        const { left, width, isChord } = values();
        return (<_Wrap
            left={left}
            width={width}
            isChord={isChord}
        />);
    };
};
export default MeasureFocus;


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
        background-color: #f6be224f;
    `.styles : css`
        background-color: #f60000da;
    `.styles};
`;