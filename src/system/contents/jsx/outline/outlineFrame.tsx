import { styled } from "solid-styled-components";
import { store } from "../../store/store";
import Layout from "../../const/layout";
import SC from "~/system/common/styled";
import ElementList from "./elementList";

const OutlineFrame = () => {

  return (<_Wrap>
    <_HeaderDiv></_HeaderDiv>
    <ElementList />
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
const _FooterDiv = styled('div')`
    ${SC.rect}
    width: 100%;
    height: ${layout.FOOTER_HEIGHT.toString()}px;
    background-color: #b5f1a3;
`;