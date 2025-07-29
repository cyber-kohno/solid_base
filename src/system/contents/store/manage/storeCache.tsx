import MusicTheory from "../../util/musicTheory";
import StoreOutline from "../data/storeOutline";

namespace StoreCache {

    export type Props = {
        baseBlocks: BaseBlock[];

        chordIndexes: ChordInfo[];
        elementIndexes: ElementIndex[];
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
    export interface BaseBlock extends BeatRange {
        scoreBase: StoreOutline.DataInit;

        chordBlocks: ChordBlock[];
    }

    export interface ChordBlock extends BeatRange {
        chordSeq: number;
        elementSeq: number;
    }

    export interface ModulateCahce {
        prevTonality: MusicTheory.Tonality;
        nextTonality: MusicTheory.Tonality;
    }
    export interface TempoCahce {
        prev: number;
        next: number;
    }

    export interface BeatInfo {
        beat: number;
        eatHead: number;
        eatTail: number;
    }

    export type CompiledChord = {
        chord: MusicTheory.KeyChordProps;
        structs: MusicTheory.ChordStruct[];
    };
    export interface ChordInfo extends BeatInfo {
        compiledChord?: CompiledChord;
    }

    export interface ElementIndex {
        chordSeq: number;
    }
}
export default StoreCache;