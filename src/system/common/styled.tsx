import { css } from "@emotion/react";
import { styled } from "solid-styled-components";

namespace SC {

    export const rect = css`
        display: inline-block;
        position: relative;
        vertical-align: top;
    `.styles;
    export const absolute = (props: {
        zIndex?: number;
    }) => css`
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: ${props.zIndex ?? 1};
    `.styles;

    export const text = (props: {
        fontSize?: number;
        fontWeight?: number;
        lineHeight?: number;
        color?: string;
    }) => css`
        font-size: ${props.fontSize ?? 22}px;
        font-weight: ${props.fontWeight ?? 600};
        line-height: ${props.lineHeight ?? 24}px;
        color: ${props.color ?? '#000'};
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