namespace StoreMelody {

    export type Props = {
        layerIndex: number;
        
        cursor: Note;
        isOverlap: boolean;
        focus: number;
        focusLock: number;
        clipboard: {
            notes: Note[] | null;
        };
    }

    export interface Tuplets {
        div: number;
        size: number;
    }
    export interface Len {
        div: number;
        size: number;
        tuplets?: Tuplets;
    }

    export interface Note {
        pos: Len;
        len: Len;
        pitch: number;
    }
    
    export type MelodyLayerMethod = 'score' | 'audio';
    export interface MelodyLayer {
        name: string;
        isMute: boolean;
        volume: number;
        method: MelodyLayerMethod;
    }
    export interface MelodyLayerScore extends MelodyLayer {
        soundFont: string;
        notes: Note[];
    }
    export interface MelodyLayerAudio extends MelodyLayer {
        fileName: string;
        source: string;
        adjust: number;
    }
}

export default StoreMelody;