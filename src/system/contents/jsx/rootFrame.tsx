import { styled } from "solid-styled-components";
import RootHeader from "./header/rootHeader";
import OutlineFrame from "./outline/outlineFrame";
import Layout from "../const/layout";
import SC from "~/system/common/styled";
import TimelineFrame from "./timeline/timelineFrame";
import ConsoleFrame from "./console/consoleFrame";

const RootFrame = () => {
    return <>
        <_HeaderDiv>
            <RootHeader />
        </_HeaderDiv>
        <_MainDiv>
            <_OutlineDiv>
                <OutlineFrame />
            </_OutlineDiv>
            <_TimelineDiv>
                <TimelineFrame />
            </_TimelineDiv>
        </_MainDiv>

        <ConsoleFrame />
    </>;
}

export default RootFrame;

const _HeaderDiv = styled('div')`
    ${SC.rect}
    width: 100%;
    height: ${Layout.root.ROOT_HEADER.toString()}px;
    background-color: #ed0909;
`;

const _MainDiv = styled('div')`
    ${SC.rect}
    width: 100%;
    height: calc(100% - ${Layout.root.ROOT_HEADER.toString()}px);
    background-color: #aced09;
`;

const _OutlineDiv = styled('div')`
    ${SC.rect}
    width: ${Layout.root.OUTLINE_WIDTH + 'px'};
    height: 100%;
    background-color: #09aced;
`;

const _TimelineDiv = styled('div')`
    ${SC.rect}
    width: calc(100% - ${Layout.root.OUTLINE_WIDTH + 'px'});
    height: 100%;
    background-color: #09d2ed;
`;