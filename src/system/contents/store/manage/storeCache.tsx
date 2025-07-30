import MusicTheory from "../../util/musicTheory";
import StoreOutline from "../data/storeOutline";

namespace StoreCache {

    export type Props = {
        baseCaches: BaseCache[];

        chordCaches: ChordCache[];
        elementCaches: ElementCache[];
    }

    export interface BeatRange {
        startTime: number;
        sustainTime: number;
        startBeat: number;
        lengthBeat: number;
        startBeatNote: number;
        lengthBeatNote: number;

        viewPosLeft: number;
        viewPosWidth: number;
    }
    export interface BaseCache extends BeatRange {
        scoreBase: StoreOutline.DataInit;

    }

    export interface ChordCache extends BeatRange {
        baseSeq: number;
        elementSeq: number;

        beat: BeatCache;
        compiledChord?: CompiledChord;
    }

    export interface ModulateCahce {
        prevTonality: MusicTheory.Tonality;
        nextTonality: MusicTheory.Tonality;
    }
    export interface TempoCahce {
        prev: number;
        next: number;
    }

    export interface BeatCache {
        num: number;
        eatHead: number;
        eatTail: number;
    }

    export type CompiledChord = {
        chord: MusicTheory.KeyChordProps;
        structs: MusicTheory.ChordStruct[];
    };

    export interface ElementCache extends StoreOutline.Element {
        chordSeq: number;
    }
}
export default StoreCache;