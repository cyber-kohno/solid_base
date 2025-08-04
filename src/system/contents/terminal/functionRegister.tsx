import { JSX } from "solid-js/jsx-runtime";
import ReducerOutline from "../store/reducer/reducerOutline";
import LogBuilder from "./logBuilder";
import StoreOutline from "../store/data/storeOutline";
import useReducerOutline from "../store/reducer/reducerOutline";
import useReducerCache from "../store/reducer/reducerCache";
import useReducerTerminal from "../store/reducer/reducerTerminal";

namespace FunctionRegister {

    export const execute = (target: string, funcName: string, args: string[]): (() => JSX.Element)[] => {

        const logs: (() => JSX.Element)[] = [];

        const funcs: FuncProps[] = getFuncs(target);

        const func = funcs.find(f => f.funcName === funcName);
        if (func == undefined) {
            logs.push(LogBuilder.error(`${funcName} is undefined.`));
            return logs;
        }

        // logs.push(LogBuilder.getFuncExecuteLog(funcName, args));

        if (args.length < func.args.length) {
            logs.push(LogBuilder.error(`${funcName} is undefined.`));
            return logs;
        }

        // logs.push(LogBuilder.success(func.funcName));
        logs.push(...func.callback(args));

        return logs;
    }

    const getFuncs = (target: string) => {
        const items: FuncProps[] = [];
        const add = (funcs: FuncProps[]) => {
            items.push(...funcs);
        }

        const sectors = target.split('\\');

        add(getFuncsCommon({ items }));

        switch (sectors[0]) {
            case 'harmonize': {
                switch (sectors[1] as StoreOutline.ElementType) {
                    case 'section': add(getFuncsHarmonizeSection()); break;
                }
            } break;
            case 'melody': add(getFuncsMelody());
        }

        return items;
    }

    type FuncArg = {
        name: string;
    }
    interface FuncPropsDefault {
        sector: string;
        usage: string;
        args: FuncArg[];
        callback: (args: string[]) => (() => JSX.Element)[]
    }
    export interface FuncProps extends FuncPropsDefault {
        funcName: string;
    }

    const createDefaultProps = (sector: string): FuncPropsDefault => ({
        sector,
        usage: '',
        args: [],
        callback: () => [],
    });

    const getFuncsCommon = (props: {
        items: FuncProps[];
    }): FuncProps[] => {
        const reducer = useReducerTerminal();

        const defaultProps = createDefaultProps('common');
        return [
            {
                ...defaultProps,
                funcName: 'clear',
                args: [],
                callback: () => {
                    reducer.getTerminal().histories.length = 0;
                    return [];
                }
            },
            {
                ...defaultProps,
                funcName: 'ls',
                args: [],
                callback: () => {
                    return props.items.map(item => LogBuilder.funcDef(item));
                }
            }
        ];
    };
    const getFuncsHarmonizeSection = (): FuncProps[] => {
        const reducerOutline = useReducerOutline();
        const reducerCache = useReducerCache();

        const defaultProps = createDefaultProps('harmonize\\section');
        return [
            {
                ...defaultProps,
                funcName: 'rename',
                args: [],
                callback: (args) => {
                    reducerOutline.renameSectionData(args[0]);
                    reducerCache.calculate();
                    return [];
                }
            }
        ];
    };
    const getFuncsMelody = (): FuncProps[] => {
        const reducerOutline = useReducerOutline();
        const reducerCache = useReducerCache();

        const defaultProps = createDefaultProps('melody');
        return [
        ];
    };
}

export default FunctionRegister;
