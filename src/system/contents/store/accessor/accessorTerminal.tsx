import useReducerTerminal from "../reducer/reducerTerminal";
import { StoreProps } from "../store";

const useAccessorTerminal = (snapshot: StoreProps) => {

    const getTerminal = () => {
        const terminal = snapshot.terminal;
        if (terminal == null) throw new Error('terminalがnullでgetTerminalを呼び出さしてはならない。');
        return terminal;
    }

    const getHistories = () => {
        const len = getTerminal().histories.length;
        const reducer = useReducerTerminal();
        return reducer.getTerminal().histories.slice(0, len);
    }

    const isUse = () => snapshot.terminal != null;

    const getSplitCommand = () => {
        const terminal = getTerminal();
        const splitStringAtIndex = (str: string, index: number) => {
            return [str.slice(0, index), str.slice(index)];
        }
        return splitStringAtIndex(terminal.command, terminal.focus);
    }

    return {
        getTerminal,
        isUse,
        getSplitCommand,
        getHistories
    }
}

export default useAccessorTerminal;