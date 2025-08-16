import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import ModeButton from "./modeButton";
import { createMemo } from "solid-js";
import { getSnapshot } from "../../store/store";

const RootHeader = () => {
  const {snapshot} = getSnapshot();

  const mode = createMemo(() => snapshot.control.mode);
  return (
    <_Wrap>
      <ModeButton name="Harmonize" isActive={mode() === "harmonize"} />
      <ModeButton name="Melody" isActive={mode() === "melody"} />
      <_Info>{snapshot.info}</_Info>
    </_Wrap>
  );
};

export default RootHeader;

const _Wrap = styled("div")`
  ${SC.rect}
  width: 100%;
  height: 100%;
  background-color: #a2b7c4;
`;

const _Info = styled("div")`
  ${SC.rect}
  width: calc(100% - 440px);
  height: calc(100% - 16px);
  background-color: #00153840;
  margin: 8px 0 0 20px;
  padding: 0 0 0 2px;
  ${SC.text({fontSize: 16, color: '#fff', fontWeight: 300})}
  overflow: hidden;
`;
