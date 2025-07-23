import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";

const ConsoleFrame = () => {

    return(<_Wrap></_Wrap>);
}
export default ConsoleFrame;

const _Wrap = styled.div`
  ${SC.absolute({})}
  width: 1000px;
  height: 700px;
  background-color: #000000f2;
  border: 1px solid #21fa00;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
`;