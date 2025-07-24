import { createEffect, createMemo, For } from "solid-js";
import { keyframes, styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import ReducerTerminal from "../../store/reducer/reducerTerminal";
import { css } from "@emotion/react";

const TerminalFrame = () => {

  const terminal = createMemo(() => ReducerTerminal.getTerminal());

  const splitOrder = createMemo(() => ReducerTerminal.splitOrder());

  const convHtmlText = (str: string) => str.replace(/ /g, '\u00A0');

  return (<_Div><_Wrap>
    <For each={terminal().histories}>{getJsx => {
      return <_Record>{getJsx()}</_Record>
    }}</For>
    <_Record isCurrent={true}>
      <_TargetSpan>{terminal().target + '>'}</_TargetSpan>

      {(() => {
        const [orderLeft, orderRight] = splitOrder().map(str => convHtmlText(str));
        return (<>
          {/* フォーカスより前 */}
          <_OrderInput>{orderLeft}</_OrderInput>
          <_Cursor />
          {/* フォーカスより後 */}
          <_OrderInput>{orderRight}</_OrderInput>
        </>);
      })()}
    </_Record>
  </_Wrap></_Div>);
}
export default TerminalFrame;

const _Div = styled.div`
  ${SC.absolute({})}
  width: 700px;
  height: 700px;
  background-color: #003650;
  border: 2px solid #fa0000;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  opacity: 0.99;
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
const _OrderInput = styled.span`
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