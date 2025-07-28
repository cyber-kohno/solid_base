import MusicTheory from "../../util/musicTheory";
import StoreOutline from "../data/storeOutline";

namespace StoreCache {

    export type Props = {
        baseBlocks: BaseBlock[];

        chordIndexes: ChordIndex[];
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
        viewPosRight: number;
    }
    export interface BaseBlock extends BeatRange {
        scoreBase: StoreOutline.DataInit;

        chordBlocks: ChordBlock[];
    }

    export interface ChordBlock extends BeatRange{
        chordSeq: number;
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
    
    export interface ChordIndex extends BeatInfo {
        chord: MusicTheory.KeyChordProps;
        structs: MusicTheory.CompiledStruct[];
    }
    
    export interface ElementIndex {
        chordSeq: number;
    }
}
export default StoreCache;