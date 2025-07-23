import { styled } from "solid-styled-components";
import SC from "../styled";
import { Show } from "solid-js";

const FocusCover = (props: {
    bgColor: string;
    dispCondition: boolean;
}) => {

    return (<Show when={props.dispCondition}>
        {<_Wrap bgColor={props.bgColor} />}
    </Show>);
}
export default FocusCover;

const _Wrap = styled.div<{
    bgColor: string;
}>`
    ${SC.absolute({})}
    width: 100%;
    height: 100%;
    background-color: ${props => props.bgColor};
`;