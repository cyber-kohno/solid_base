import { styled } from "solid-styled-components";
import Thema from "~/system/common/design/thema";
import { store } from "../../store/store";
import Layout from "../../const/layout";
import SC from "~/system/common/styled";
import OutlineList from "./outlineList";

const OutlineFrame = () => {

  return (<_Wrap>
    <_HeaderDiv></_HeaderDiv>
    <_ListDiv><OutlineList /></_ListDiv>
    <_FooterDiv></_FooterDiv>
  </_Wrap>);
}

export default OutlineFrame;

const thema = store.thema;

const _Wrap = styled('div')`
    ${SC.rect}
    width: 100%;
    height: 100%;
    background-color: ${thema.accent};
`;

const layout = Layout.outline;

const _HeaderDiv = styled('div')`
    ${SC.rect}
    width: 100%;
    height: ${layout.HEADER_HEIGHT.toString()}px;
    background-color: #f1a3a3;
`;
const _ListDiv = styled('div')`
    ${SC.rect}
    width: 100%;
    height: calc(100% - ${(layout.HEADER_HEIGHT + layout.FOOTER_HEIGHT).toString()}px);
    background-color: #e9dfdf;
`;
const _FooterDiv = styled('div')`
    ${SC.rect}
    width: 100%;
    height: ${layout.FOOTER_HEIGHT.toString()}px;
    background-color: #b5f1a3;
`;