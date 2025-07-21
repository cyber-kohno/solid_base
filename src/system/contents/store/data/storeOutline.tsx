import MusicTheory from "../../util/musicTheory";

namespace StoreOutline {

    export type ElementType = 'init' | 'section' | 'chord' | 'change' | 'modulate' | 'tempo' | 'ts';

    export type DataInit = {
        ts: MusicTheory.TimeSignature;
        tempo: number;
        tonality: MusicTheory.Tonality;
    };

    export type DataSection = {
        name: string;
    };

    export interface DataChord {
        beat: number;
        eat: number;
        degree?: MusicTheory.DegreeChord;
    };
    export interface KeyChord {
        beat: number;
        eat: number;
        chord?: MusicTheory.KeyChordProps;
        structs?: MusicTheory.StructProps[];
    };
    export type DataModulate = {
        method: ModulateMedhod;
        val?: number;
    };

    export const ModulateMedhods = ['domm', 'parallel', 'relative', 'key'] as const;
    export type ModulateMedhod = typeof ModulateMedhods[number];

    export type TempoRelation = 'diff' | 'rate' | 'abs';

    export type Element = {
        type: ElementType;
        data: any;
    }

    export const getInitialElements = () => {
        const list: Element[] = [];
        const initData: DataInit = {
            ts: { num: 4, den: 4 },
            tempo: 100,
            tonality: {
                key12: 0,
                scale: 'major'
            }
        };
        const firstSectionData: DataSection = {
            name: 'section0'
        }
        list.push({ type: 'init', data: initData });
        list.push({ type: 'section', data: firstSectionData });
        return list;
    }
}

export default StoreOutline;