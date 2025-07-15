import { styled } from "solid-styled-components";
import Thema from "~/system/common/design/thema";
import { store } from "../../store/store";
import Layout from "../../const/layout";

const OutlineFrame = () => {

    return <_Wrap> </_Wrap>;
}

export default OutlineFrame;

const thema = store.thema;

const _Wrap = styled('div')`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${thema.accent};
`;