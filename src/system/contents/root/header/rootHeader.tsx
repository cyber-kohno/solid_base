import { styled } from "solid-styled-components";
import Thema from "~/system/common/design/thema";
import { store } from "../../store/store";
import SC from "~/system/common/styled";
import ModeButton from "./modeButton";
import { createMemo } from "solid-js";

const RootHeader = () => {
  const mode = createMemo(() => store.sys.mode);
  return (
    <_Wrap>
      <ModeButton name="Harmonize" isActive={mode() === "harmonize"} />
      <ModeButton name="Melody" isActive={mode() === "melody"} />
    </_Wrap>
  );
};

export default RootHeader;

const thema = store.thema;

const _Wrap = styled("div")`
  ${SC.rect}
  width: 100%;
  height: 100%;
  background-color: ${thema.main};
`;
