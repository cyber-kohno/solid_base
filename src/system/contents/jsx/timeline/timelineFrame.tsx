import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "../../const/layout";
import PitchListFrame from "./pitch/pitchListFrame";

const TimelineFrame = () => {

    return (
        <_Wrap margin={6}>
            <_HeaderDiv>
                <_Blank />
                <_Active>
                    <_MemoriDiv></_MemoriDiv>
                    <_BlockDiv></_BlockDiv>
                    <_InfoDiv></_InfoDiv>
                </_Active>
            </_HeaderDiv>
            <_MainDiv>
                <PitchListFrame />
                <_GridDiv></_GridDiv>
            </_MainDiv>
        </_Wrap>
    );
}

export default TimelineFrame;

const _Wrap = styled(SC._Wrap)`
    /* background-color: #16adc4; */
`;
const _HeaderDiv = styled.div`
    ${SC.rect}
    /* background-color: #c416c1; */
    width: 100%;
    height: ${Layout.timeline.HEADER_HEIGHT.toString()}px;
`;
const _Blank = styled.div`
    ${SC.rect}
    width: ${Layout.timeline.PITCH_WIDTH.toString()}px;
    height: 100%;
`;
const _Active = styled.div`
    ${SC.rect}
    width: calc(100% - ${Layout.timeline.PITCH_WIDTH.toString()}px);
    height: 100%;
`;

const _MemoriDiv = styled.div`
    ${SC.rect}
    background-color: #b6ebe4;
    width: 100%;
    height: ${Layout.timelineHeader.MEMORI_HEIGHT.toString()}px;
`;
const _BlockDiv = styled.div`
    ${SC.rect}
    background-color: #cd68cb;
    width: 100%;
    height: ${Layout.timelineHeader.BLOCK_HEIGHT.toString()}px;
`;
const _InfoDiv = styled.div`
    ${SC.rect}
    background-color: #d9b4d8;
    width: 100%;
    height: ${Layout.timelineHeader.INFO_HEIGHT.toString()}px;
`;

const _MainDiv = styled.div`
    ${SC.rect}
    background-color: #16c4b0;
    width: 100%;
    height: calc(100% - ${Layout.timeline.HEADER_HEIGHT.toString()}px);
`;
const _GridDiv = styled.div`
    ${SC.rect}
    background-color: #6716c4;
    width: calc(100% - ${Layout.timeline.PITCH_WIDTH.toString()}px);
    height: 100%;
`;
