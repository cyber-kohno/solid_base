import { store } from "../store";
import FunctionRegister from "../../terminal/functionRegister";
import LogBuilder from "../../terminal/logBuilder";
import { JSX } from "solid-js/jsx-runtime";
import useReducerRef from "./reducerRef";

const useReducerTerminal = () => {

    const {adjustTerminalScroll} = useReducerRef();

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
            command: '',
            focus: 0
        };
    };
    const close = () => {
        store.terminal = null;
    };

    /**
     * コマンドを実行する。
     */
    const registCommand = () => {

        const logs: (() => JSX.Element)[] = [];

        const terminal = getTerminal();
        logs.push(LogBuilder.history(terminal.target, terminal.command));

        if (terminal.command !== '') {
            const orderItems = terminal.command.split(' ');
            const funcName = orderItems[0];
            const args = orderItems.slice(1);

            logs.push(...FunctionRegister.execute(terminal.target, funcName, args));
        }

        terminal.focus = 0;
        // terminal.histories = terminal.histories.slice();
        // terminal.histories.push(() => `${terminal.target}>${terminal.order}`);
        logs.forEach(l => terminal.histories.push(l));
        // terminal.histories.push(...logs);
        terminal.command = '';
        
        adjustTerminalScroll();
    }

    const setCommand = (callback: (prev: string) => string) => {
        const terminal = getTerminal();
        terminal.command = callback(terminal.command);
    }

    const splitCommand = () => {
        const terminal = getTerminal();
        const splitStringAtIndex = (str: string, index: number) => {
            return [str.slice(0, index), str.slice(index)];
        }
        return splitStringAtIndex(terminal.command, terminal.focus);
    }

    const removeCommand = () => {
        const [left, right] = splitCommand();
        if (left.length === 0) return;
        setCommand(() => left.slice(0, left.length - 1) + right);
        getTerminal().focus--;
    }

    const insertCommand = (key: string) => {
        const [left, right] = splitCommand();
        setCommand(() => left + key + right);
        getTerminal().focus += key.length;
    }

    const moveFocus = (dir: -1 | 1) => {
        const terminal = getTerminal();
        const newFocus = terminal.focus + dir;
        const command = terminal.command;
        if (newFocus >= 0 && newFocus <= command.length) terminal.focus = newFocus;
    }

    return {
        getTerminal,
        isUse,
        open,
        close,
        registCommand,
        splitCommand,
        removeCommand,
        insertCommand,
        moveFocus
    }
}

export default useReducerTerminal;