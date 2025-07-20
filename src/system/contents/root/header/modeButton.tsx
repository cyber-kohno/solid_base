import { css } from "@emotion/react";
import { style } from "solid-js/web";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";

const ModeButton = (props: {
    name: string;
    isActive: boolean;
}) => {

    return (
        <_Wrap isActive={props.isActive}>{props.name}</_Wrap>
    );
};

export default ModeButton;

const _Wrap = styled('div') <{
    isActive: boolean;
}>`
    ${SC.rect}
    width: 200px;
    margin: 2px 0 0 2px;
    height: calc(100% - 4px);
    border-radius: 2px;
    box-sizing: border-box;
    color: white;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    border: 1px solid #fff;
    background-color: #aadcdd;
    ${props => !props.isActive ? '' : css`
        background-color: #cfcf58;
    `.styles}
`;