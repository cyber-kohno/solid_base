import { For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import FunctionRegister from "./functionRegister";

namespace LogBuilder {

    export const history = (target: string, command: string) => {
        return () => <_Record>{`${target}>${command}`}</_Record>;
    }
    export const error = (str: string) => {
        return () => <_Record><_Error>{str}</_Error></_Record>;
    }
    export const success = (target: string) => {
        return () => <_Record>
            <_Success><_Target>[{target}]</_Target> successfull!</_Success>
        </_Record>;
    }
    export const diff = (prev: string, next: string) => {
        return () => <_Record><_DiffItem>{prev}</_DiffItem>{` > `}<_DiffItem>{next}</_DiffItem></_Record>;
    }

    export const getFuncExecuteLog = (funcName: string, args: string[]) => {
        return () => <_Block>
            <_Record>{`function: `}<_Func>{`${funcName}`}</_Func></_Record>
            <For each={args}>
                {(arg, i) => <_Record>{`arg${i()}: `}<_Func>{`${arg}`}</_Func></_Record>}
            </For>
        </_Block>;
    }

    export const createRecord = (str: string) => {
        return () => <_Record>{str}</_Record>
    };
    export const funcDef = (func: FunctionRegister.FuncProps) => {
        return () => <_Record><_Func>{func.funcName}</_Func></_Record>
    };
    export const list = (items: string[]) => {
        return () => <_List><_Item>{items.join(' ')}</_Item></_List>
    };
}
export default LogBuilder;

const _Block = styled.div`
  ${SC.rect}
  width: calc(100% - 12px);
  background-color: #8cff9f36;
  padding: 2px;
  margin: 0 0 0 6px;
  /* border: 1px solid #ffffff83; */
  border-radius: 2px;
  box-sizing: border-box;
`;

const _Record = styled.div`
  ${SC.rect}
  width: 100%;
  height: 24px;
  
  ${SC.text({
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 21,
    color: '#fff'
})}
`;
const _List = styled.div`
  ${SC.rect}
  width: 100%;
  
  ${SC.text({
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 21,
    color: '#fff'
  })}
  line-height: 28px;
`;

const _Func = styled.span`
    /* background-color: #ffffff37; */
    color: #3cff00;
    background-color: black;
`;
const _Error = styled.span`
    color: #ff0000;
    font-weight: 300;
    background-color: black;
`;
const _Success = styled.span`
    color: #7af2ff;
    background-color: black;
`;
const _Target = styled.span`
    /* background-color: #f6ff0058;
    border-radius: 2px; */
    font-style: italic;
    opacity: 0.6;
    background-color: black;
`;
const _Item = styled.span`
    color: #4effd0;
    background-color: black;
`;
const _DiffItem = styled.span`
    color: #fca522;
    background-color: black;
`;