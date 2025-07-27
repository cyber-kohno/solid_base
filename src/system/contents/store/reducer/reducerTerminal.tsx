import assert from "assert";
import { setStore, store } from "../store";
import TerminalManager from "../../terminal/terminalManager";

namespace ReducerTerminal {

    export const getTerminal = () => {
        const terminal = store.terminal;
        if (terminal == null) throw new Error('terminalがnullでgetTerminalを呼び出さしてはならない。');
        return terminal;
    }

    export const isUse = () => store.terminal != null;

    export const open = () => {
        setStore('terminal', {
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
        });
    };
    export const close = () => {
        setStore('terminal', null);
    };
    export const registOrder = () => {
        const { logs } = TerminalManager.registOrder();

        const terminal = { ...getTerminal() };
        terminal.focus = 0;
        terminal.histories = terminal.histories.slice();
        // terminal.histories.push(() => `${terminal.target}>${terminal.order}`);
        logs.forEach(l => terminal.histories.push(l));
        terminal.order = '';
        setStore('terminal', terminal);
    }

    export const setOrder = (callback: (prev: string) => string) => {
        setStore('terminal', 'order', callback);
    }

    export const splitOrder = () => {
        const terminal = getTerminal();
        const splitStringAtIndex = (str: string, index: number) => {
            return [str.slice(0, index), str.slice(index)];
        }
        return splitStringAtIndex(terminal.order, terminal.focus);
    }

    export const removeOrder = () => {
        const [left, right] = splitOrder();
        if (left.length === 0) return;
        setOrder(() => left.slice(0, left.length - 1) + right);
        setStore('terminal', 'focus', prev => prev - 1);
    }

    export const insertOrder = (key: string) => {
        const [left, right] = splitOrder();
        setOrder(() => left + key + right);
        setStore('terminal', 'focus', prev => prev + key.length);
    }

    export const moveFocus = (dir: -1 | 1) => {
        setStore('terminal', 'focus', prev => {
            const newFocus = prev + dir;
            const order = getTerminal().order;
            return newFocus >= 0 && newFocus <= order.length ? newFocus : prev;
        });
    }
}

export default ReducerTerminal;