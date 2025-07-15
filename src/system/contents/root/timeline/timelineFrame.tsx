import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "../../const/layout";

const TimelineFrame = () => {

    return (
        <_Wrap margin={6}>
            <_HeaderDiv></_HeaderDiv>
        </_Wrap>
    );
}

export default TimelineFrame;

const _Wrap = styled(SC._Wrap)`
    background-color: #16adc4;
`;
const _HeaderDiv = styled(SC._Rect)`
    background-color: #c416c1;
    width: 100%;
    height: ${Layout.timeline.HEADER_HEIGHT.toString()}px;
`;
