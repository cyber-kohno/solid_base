import { JSX } from "solid-js/jsx-runtime";
import ReducerOutline from "../store/reducer/reducerOutline";
import LogBuilder from "./logBuilder";

namespace FunctionRegister {

    export const execute = (target: string, funcName: string, args: string[]): (() => JSX.Element)[] => {

        const logs: (() => JSX.Element)[] = [];

        const funcs: FuncProps[] = getFuncs(target);

        const func = funcs.find(f => f.funcName === funcName);
        if (func == undefined) {
            logs.push(LogBuilder.error(`${funcName} is undefined.`));
            return logs;
        }

        logs.push(LogBuilder.getFuncExecuteLog(funcName, args));

        if (args.length < func.argNames.length) {
            logs.push(LogBuilder.error(`${funcName} is undefined.`));
            return logs;
        }

        logs.push(LogBuilder.success(func.funcName));
        logs.push(...func.callback(args));

        return logs;
    }

    const getFuncs = (target: string) => {
        switch (target) {
            case 'harmonize\\section': return FUNCS_HARMONIZE_SECTION;
            case 'melody': return FUNCS_MELODY;
        }
        throw new Error(`target:[${target}]の関数は定義されていない。`);
    }

    type FuncProps = {
        funcName: string;
        argNames: string[];
        callback: (args: string[]) => (() => JSX.Element)[]
    }

    const FUNCS_HARMONIZE_SECTION: FuncProps[] = [
        {
            funcName: 'rename',
            argNames: [],
            callback: (args: string[]) => {

                ReducerOutline.renmaeSectionData(args[0]);
                return [];
            }
        }
    ];
    const FUNCS_MELODY: FuncProps[] = [
    ];
}
export default FunctionRegister;
