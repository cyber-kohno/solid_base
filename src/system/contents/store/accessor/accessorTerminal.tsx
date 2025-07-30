import {  StoreProps } from "../store";

const useAccessorTerminal = (snapshot: StoreProps) => {
    const getTerminal = () => {
        const terminal = snapshot.terminal;
        if (terminal == null) throw new Error('terminalがnullでgetTerminalを呼び出さしてはならない。');
        return terminal;
    }

    const isUse = () => snapshot.terminal != null;

    const getSplitOrder = () => {
        const terminal = getTerminal();
        const splitStringAtIndex = (str: string, index: number) => {
            return [str.slice(0, index), str.slice(index)];
        }
        return splitStringAtIndex(terminal.order, terminal.focus);
    }

    return {
        getTerminal,
        isUse,
        getSplitOrder,
    }
}

export default useAccessorTerminal;