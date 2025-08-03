import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "../../const/layout";
import PitchListFrame from "./pitch/pitchListFrame";
import GridRootFrame from "./grid/gridRootFrame";
import ChordListFrame from "./header/chordListFrame";
import ProgressInfoFrame from "./header/progressInfoFrame";
import BeatMeasureFrame from "./header/beatMeasureFrame";
import { store, getSnapshot } from "../../store/store";
import { createMemo } from "solid-js";

const TimelineFrame = () => {
    const { snapshot } = getSnapshot();

    const headerWidth = createMemo(() => snapshot.cache.chordCaches.reduce((total, cur) => total + cur.viewPosWidth, 0));
    return (
        <_Wrap margin={6}>
            <_HeaderDiv>
                <_Blank />
                <_Active ref={(ref) => {
                    // console.log('store.ref.header = () => ref');
                    store.ref.header = () => ref;
                }}>
                    <BeatMeasureFrame  headerWidth={headerWidth()}/>
                    <ChordListFrame headerWidth={headerWidth()}/>
                    <ProgressInfoFrame  headerWidth={headerWidth()}/>
                </_Active>
            </_HeaderDiv>
            <_MainDiv>
                <PitchListFrame />
                <GridRootFrame />
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
    overflow: hidden;
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
    overflow: hidden;
    background-color: aliceblue;
`;

const _MainDiv = styled.div`
    ${SC.rect}
    background-color: #16c4b0;
    width: 100%;
    height: calc(100% - ${Layout.timeline.HEADER_HEIGHT.toString()}px);
`;
