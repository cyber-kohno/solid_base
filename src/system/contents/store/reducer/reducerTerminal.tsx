import assert from "assert";
import { store, StoreProps, getSnapshot } from "../store";
import TerminalManager from "../../terminal/terminalManager";

const useReducerTerminal = () => {
    const getTerminal = () => {
        const terminal = store.terminal;
        if (terminal == null) throw new Error('terminalがnullでgetTerminalを呼び出さしてはならない。');
        return terminal;
    }

    const isUse = () => store.terminal != null;

    const open = () => {
        store.terminal = {
            histories: [],
            target: (() => {
                const control = store.control;
                const data = store.data;
                let ret = 'unknown';
                const set = (v: string) => { ret = v };
                const add = (v: string) => { ret += '\\' + v };
                switch (control.mode) {
                    case 'harmonize': {
                        const element = data.elements[control.outline.focus];
                        set('harmonize');
                        add(element.type);
                        switch (element.type) {
                            case 'init': {

                            } break;
                        }
                    } break;
                    case 'melody': {
                        set('melody');
                    }
                }
                return ret;
            })(),
            order: '',
            focus: 0
        };
    };
    const close = () => {
        store.terminal = null;
    };
    const registOrder = () => {
        const { logs } = TerminalManager.registOrder();

        const terminal = { ...getTerminal() };
        terminal.focus = 0;
        terminal.histories = terminal.histories.slice();
        // terminal.histories.push(() => `${terminal.target}>${terminal.order}`);
        logs.forEach(l => terminal.histories.push(l));
        terminal.order = '';
        store.terminal = terminal;
    }

    const setOrder = (callback: (prev: string) => string) => {
        const terminal = getTerminal();
        terminal.order = callback(terminal.order);
    }

    const splitOrder = () => {
        const terminal = getTerminal();
        const splitStringAtIndex = (str: string, index: number) => {
            return [str.slice(0, index), str.slice(index)];
        }
        return splitStringAtIndex(terminal.order, terminal.focus);
    }

    const removeOrder = () => {
        const [left, right] = splitOrder();
        if (left.length === 0) return;
        setOrder(() => left.slice(0, left.length - 1) + right);
        getTerminal().focus--;
    }

    const insertOrder = (key: string) => {
        const [left, right] = splitOrder();
        setOrder(() => left + key + right);
        getTerminal().focus += key.length;
    }

    const moveFocus = (dir: -1 | 1) => {
        const terminal = getTerminal();
        const newFocus = terminal.focus + dir;
        const order = terminal.order;
        if (newFocus >= 0 && newFocus <= order.length) terminal.focus = newFocus;
    }

    return {
        getTerminal,
        isUse,
        open,
        close,
        registOrder,
        splitOrder,
        removeOrder,
        insertOrder,
        moveFocus
    }
}

export default useReducerTerminal;