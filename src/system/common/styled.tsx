import { css } from "@emotion/react";
import { styled } from "solid-styled-components";

namespace SC {

    export const rect = css`
        display: inline-block;
        position: relative;
        width: 100px;
        height: 100px;
        vertical-align: top;
        background-color: #40ecd5;
    `.styles;

    export const wrap = (props: {
        margin?: number;
    }) => css`
        ${rect}
        text-align: left;
        margin-top: ${props.margin ?? 0}px;
        margin-left: ${props.margin ?? 0}px;
        width: calc(100% - ${(props.margin ?? 0) * 2}px);
        height: calc(100% - ${(props.margin ?? 0) * 2}px);
        background-color: #40ecd5;
    `.styles;

    export const _Rect = styled('div')`
        ${rect}
    `;

    export const _Wrap = styled('div') <{
        margin?: number;
    }>`
        ${props => wrap(props)}
    `;
}

export default SC;