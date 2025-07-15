import { styled } from "solid-styled-components";

namespace SC {

    export const _Rect = styled('div')`
        display: inline-block;
        position: relative;
        /* width: 100px;
        height: 100px; */
        vertical-align: top;
        background-color: #40ecd5;
    `;
    export const _Wrap = styled(_Rect) <{
        margin?: number;
    }>`
        text-align: left;
        margin-top: ${props => (props.margin ?? 0)}px;
        margin-left: ${props => (props.margin ?? 0)}px;
        width: calc(100% - ${props => (props.margin ?? 0) * 2}px);
        height: calc(100% - ${props => (props.margin ?? 0) * 2}px);
        background-color: #40ecd5;
    `;
}

export default SC;