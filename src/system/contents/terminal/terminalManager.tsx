import { JSX } from "solid-js/jsx-runtime";
import ReducerTerminal from "../store/reducer/reducerTerminal";
import FunctionRegister from "./functionRegister";
import LogBuilder from "./logBuilder";

namespace TerminalManager {

    export const registOrder = () => {
        const logs: (() => JSX.Element)[] = [];

        const terminal = ReducerTerminal.getTerminal();
        logs.push(LogBuilder.history(terminal.target, terminal.order));

        if (terminal.order !== '') {
            const orderItems = terminal.order.split(' ');
            const funcName = orderItems[0];
            const args = orderItems.slice(1);

            logs.push(...FunctionRegister.execute(terminal.target, funcName, args));
        }
        return {
            logs
        };
    }

}
export default TerminalManager;
