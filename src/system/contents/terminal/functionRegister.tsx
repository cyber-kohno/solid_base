import { JSX } from "solid-js/jsx-runtime";
import ReducerOutline from "../store/reducer/reducerOutline";
import LogBuilder from "./logBuilder";
import StoreOutline from "../store/data/storeOutline";
import useReducerOutline from "../store/reducer/reducerOutline";
import useReducerCache from "../store/reducer/reducerCache";
import useReducerTerminal from "../store/reducer/reducerTerminal";
import MusicTheory from "../util/musicTheory";
import FileUtil from "../util/fileUtil";

namespace FunctionRegister {

    export const execute = (target: string, funcName: string, args: string[]): (() => JSX.Element)[] => {

        const logs: (() => JSX.Element)[] = [];

        const funcs: FuncProps[] = getFuncs(target);

        const func = funcs.find(f => f.funcName === funcName);
        // 関数の存在チェック
        if (func == undefined) {
            logs.push(LogBuilder.error(`${funcName} is undefined.`));
            return logs;
        }

        // logs.push(LogBuilder.getFuncExecuteLog(funcName, args));

        // 関数の引数チェック
        if (args.length < func.args.length) {
            logs.push(LogBuilder.error(`Missing function[${funcName}] arguments.`));
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
                    case 'init': add(getFuncsHarmonizeInit()); break;
                    case 'section': add(getFuncsHarmonizeSection()); break;
                    case 'chord': add(getFuncsHarmonizeChord()); break;
                    case 'modulate': add(getFuncsHarmonizeModulate()); break;
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
                args: [{ name: 'newName' }],
                callback: (args) => {
                    const prev = reducerOutline.getCurrentSectionData().name;
                    const next = args[0];
                    reducerOutline.renameSectionData(next);
                    reducerCache.calculate();
                    return [
                        LogBuilder.success('rename'),
                        LogBuilder.diff(prev, next)
                    ];
                }
            },

        ];
    };
    const getFuncsHarmonizeChord = (): FuncProps[] => {
        const reducerOutline = useReducerOutline();
        const reducerCache = useReducerCache();

        const defaultProps = createDefaultProps('harmonize\\section');
        return [
            {
                ...defaultProps,
                funcName: 'symbol',
                args: [{ name: 'symbol' }],
                callback: (args) => {
                    const degree = reducerOutline.getCurrentChordData().degree;
                    if (degree == undefined) return [LogBuilder.error('This element has no chord set.')];
                    const prev = degree.symbol;
                    const next = args[0] as MusicTheory.ChordSymol;
                    // シンボルの存在チェック
                    if (!MusicTheory.ChordSymols.includes(next)) {
                        return [LogBuilder.error(`The specified symbol[${next}] is invalid.`)];
                    }
                    degree.symbol = next;
                    reducerCache.calculate();
                    return [
                        LogBuilder.success('mod symbol'),
                        LogBuilder.diff(prev, next)
                    ];
                }
            },
            {
                ...defaultProps,
                funcName: 'symbols',
                args: [],
                callback: () => {
                    const items = [...MusicTheory.ChordSymols] as string[];
                    return [LogBuilder.list(items)];
                }
            }

        ];
    };
    const getFuncsHarmonizeInit = (): FuncProps[] => {
        const reducerOutline = useReducerOutline();
        const reducerCache = useReducerCache();

        const defaultProps = createDefaultProps('harmonize\\init');

        const VALID_SCALES = MusicTheory.KEY12_MAJOR_SCALE_LIST.map(i => i + 'major')
            .concat(MusicTheory.KEY12_MINOR_SCALE_LIST.map(i => i + 'minor'));
        return [
            {
                ...defaultProps,
                funcName: 'scales',
                args: [],
                callback: () => {
                    return [LogBuilder.list(VALID_SCALES)];
                }
            },
            {
                ...defaultProps,
                funcName: 'tempo',
                args: [{ name: 'value' }],
                callback: (args) => {
                    const data = reducerOutline.getCurrentInitData();
                    const prev = data.tempo;
                    const next = Number(args[0]);
                    // シンボルの存在チェック
                    if (Number.isNaN(next)) {
                        return [LogBuilder.error(`The specified number[${next}] is invalid.`)];
                    }
                    data.tempo = next;
                    reducerCache.calculate();
                    return [
                        LogBuilder.success('modified tempo'),
                        LogBuilder.diff(prev.toString(), next.toString())
                    ];
                }
            },
            {
                ...defaultProps,
                funcName: 'scale',
                args: [{ name: 'scale' }],
                callback: (args) => {
                    const tonality = reducerOutline.getCurrentInitData().tonality;
                    const prev = MusicTheory.getScaleName(tonality);
                    const next = args[0];
                    // スケールの存在チェック
                    if (!VALID_SCALES.includes(args[0])) {
                        return [LogBuilder.error(`The specified scale[${next}] is invalid.`)];
                    }

                    const {keyIndex, scale} = MusicTheory.getKeyScaleFromName(next);
                    tonality.key12 = keyIndex;
                    tonality.scale = scale;
                    reducerCache.calculate();
                    return [
                        LogBuilder.success('modified scale'),
                        LogBuilder.diff(prev, next)
                    ];
                }
            },

        ];
    };
    const getFuncsHarmonizeModulate = (): FuncProps[] => {
        const reducerOutline = useReducerOutline();
        const reducerCache = useReducerCache();

        const defaultProps = createDefaultProps('harmonize\\modulate');

        const getCur = (data: StoreOutline.DataModulate) => `[${data.method}${data.val ? ' ' + data.val : ''}]`;
        return [
            {
                ...defaultProps,
                funcName: 'domm',
                args: [{ name: 'value' }],
                callback: (args) => {
                    const data = reducerOutline.getCurrentModulateData();
                    const prev = getCur(data);
                    const value = args[0];

                    // 数値の変換チェック
                    if (!['-3', -'2', '-1', '0', '1', '2', '3'].includes(value)) {
                        return [LogBuilder.error(`The specified value[${value}] is invalid.`)];
                    }
                    data.method = 'domm';
                    data.val = Number(value);
                    reducerCache.calculate();
                    const next = `domm ${value}`;
                    return [
                        LogBuilder.success('domm'),
                        LogBuilder.diff(prev, next)
                    ];
                }
            },
            {
                ...defaultProps,
                funcName: 'key',
                args: [{ name: 'value' }],
                callback: (args) => {
                    const data = reducerOutline.getCurrentModulateData();
                    const prev = getCur(data);
                    const value = args[0];

                    // 数値の変換チェック
                    if (!['-3', -'2', '-1', '0', '1', '2', '3'].includes(value)) {
                        return [LogBuilder.error(`The specified value[${value}] is invalid.`)];
                    }
                    data.method = 'key';
                    data.val = Number(value);
                    reducerCache.calculate();
                    const next = `key ${value}`;
                    return [
                        LogBuilder.success('key'),
                        LogBuilder.diff(prev, next)
                    ];
                }
            },
            {
                ...defaultProps,
                funcName: 'parallel',
                args: [],
                callback: () => {
                    const data = reducerOutline.getCurrentModulateData();
                    const prev = getCur(data);

                    data.method = 'parallel';
                    data.val = undefined;
                    reducerCache.calculate();
                    const next = `parallel`;
                    return [
                        LogBuilder.success('parallel'),
                        LogBuilder.diff(prev, next)
                    ];
                }
            },
            {
                ...defaultProps,
                funcName: 'relative',
                args: [],
                callback: () => {
                    const data = reducerOutline.getCurrentModulateData();
                    const prev = getCur(data);

                    data.method = 'relative';
                    data.val = undefined;
                    reducerCache.calculate();
                    const next = `relative`;
                    return [
                        LogBuilder.success('relative'),
                        LogBuilder.diff(prev, next)
                    ];
                }
            },

        ];
    };
    const getFuncsMelody = (): FuncProps[] => {
        const reducerOutline = useReducerOutline();
        const reducerCache = useReducerCache();

        const defaultProps = createDefaultProps('melody');
        return [
            {
                ...defaultProps,
                funcName: 'dl',
                args: [],
                callback: (args) => {
                    FileUtil.downloadMidi(args[0]);
                    return [LogBuilder.success('download midi')];
                }
            },
        ];
    };
}

export default FunctionRegister;
