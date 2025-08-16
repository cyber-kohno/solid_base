import { createEffect, createMemo, For } from "solid-js";
import { keyframes, styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import useReducerTerminal from "../../store/reducer/reducerTerminal";
import { css } from "@emotion/react";
import { getSnapshot, store } from "../../store/store";
import useAccessorTerminal from "../../store/accessor/accessorTerminal";

const TerminalFrame = () => {

  const { snapshot } = getSnapshot();

  const accessorTerminal = useAccessorTerminal(snapshot);

  const terminal = createMemo(() => accessorTerminal.getTerminal());
  const histories = createMemo(() => accessorTerminal.getHistories());

  const splitCommand = createMemo(() => accessorTerminal.getSplitCommand());

  const convHtmlText = (str: string) => str.replace(/ /g, '\u00A0');

  const initRef = (ref: HTMLDivElement) => store.ref.terminal = () => ref;

  return (<_Frame><_Wrap ref={initRef}>
    {/* ログ履歴 */}
    <For each={histories()}>{jsx => jsx()}</For>
    {/* コマンドのレコード */}
    <_Record isCurrent={true}>
      <_TargetSpan>{terminal().target + '>'}</_TargetSpan>

      {(() => {
        const [commandLeft, commandRight] = splitCommand().map(str => convHtmlText(str));
        return (<>
          {/* フォーカスより前 */}
          <_CommandInput>{commandLeft}</_CommandInput>
          <_Cursor />
          {/* フォーカスより後 */}
          <_CommandInput>{commandRight}</_CommandInput>
        </>);
      })()}
    </_Record>
    <_Margin />
  </_Wrap></_Frame>);
}
export default TerminalFrame;

const _Frame = styled.div`
  ${SC.absolute({ zIndex: 4 })}
  width: 700px;
  height: 700px;
  /* background-color: #003650; */
  background-color: #192055;
  /* border: 2px solid #fb0000; */
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  /* opacity: 0.99; */
  box-shadow: 10px 10px 15px -10px;
  /* border-radius: 4px; */
`;
const _Wrap = styled.div`
  ${SC.wrap({ margin: 4 })}
  overflow: hidden;
`;
const _Record = styled.div<{
  isCurrent?: boolean
}>`
  ${SC.rect}
  width: 100%;
  height: 24px;
  /* background-color: #0068f02e;
  margin: 2px 0 0 0; */
  
  ${SC.text({
  fontSize: 18,
  fontWeight: 400,
  lineHeight: 21,
  color: '#fff'
})}
  
  ${props => !props.isCurrent ? '' : css`
    background-color: #76ff062c;
  `.styles}
`;
const _TargetSpan = styled.span`
  color: yellow;
`;
const _CommandInput = styled.span`
  color: #ffffff;
  border: none;
  background-color: transparent;
  font-size: 18px;
  font-weight: 400;
  width: auto;
`;

const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 0; /* 完全に非表示 */
  }
  50% {
    opacity: 1; /* 完全に表示 */
  }
`;
const _Cursor = styled.div`
  ${SC.rect}
  margin: 3px 0 0 0;
  width: 2px;
  height: calc(100% - 6px);
  background-color: #ffff3d;
  animation: ${blinkAnimation} 1s step-start infinite; /* 点滅するアニメーション */
`;

const _Margin = styled.div`
  ${SC.rect}
  width: 100%;
  height: 50%;
  /* background-color: #ffffff41; */
`;