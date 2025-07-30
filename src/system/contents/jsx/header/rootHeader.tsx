import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import ModeButton from "./modeButton";
import { createMemo } from "solid-js";
import { useGlobalStore } from "../../store/store";

const RootHeader = () => {
  const {snapshot} = useGlobalStore();

  const mode = createMemo(() => snapshot.control.mode);
  return (
    <_Wrap>
      <ModeButton name="Harmonize" isActive={mode() === "harmonize"} />
      <ModeButton name="Melody" isActive={mode() === "melody"} />
    </_Wrap>
  );
};

export default RootHeader;

const _Wrap = styled("div")`
  ${SC.rect}
  width: 100%;
  height: 100%;
  background-color: #fda;
`;
