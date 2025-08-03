import { styled } from "solid-styled-components";
import Layout from "../../const/layout";
import SC from "~/system/common/styled";
import ElementList from "./elementList";
import ElementHeaderInfo from "./elementHeaderInfo";

const OutlineFrame = () => {

  return (<_Wrap>
    <ElementHeaderInfo />
    <ElementList />
    <_FooterDiv></_FooterDiv>
  </_Wrap>);
}

export default OutlineFrame;

const _Wrap = styled('div')`
    ${SC.rect}
    width: 100%;
    height: 100%;
    background-color: #a00;
`;

const layout = Layout.outline;

const _FooterDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: ${layout.FOOTER_HEIGHT.toString()}px;
    background-color: #b5f1a3;
`;