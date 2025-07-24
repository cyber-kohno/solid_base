import { createMemo } from "solid-js";
import ReducerTerminal from "../store/reducer/reducerTerminal";
import { styled } from "solid-styled-components";

namespace TerminalManager {

    export const registOrder = () => {
        const terminal = ReducerTerminal.getTerminal();
        
        const orderItems = terminal.order.split(' ');
        const func = orderItems[0];
        const args = orderItems.slice(1);

        return {
            logs: [()=><><_Func>{`func:[${func}]`}</_Func> {`args:[${args.join(', ')}]`}</>]
        };
    }

}
export default TerminalManager;

const _Func = styled.span`
    background-color: #ff0000a3;
    border-radius: 4px;
`;