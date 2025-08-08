namespace StoreMelody {

    export type Props = {
        layers: MelodyLayer[];
        layerIndex: number;
        
        cursor: Note;
        isOverlap: boolean;
        focus: number;
        focusLock: number;
        clipboard: {
            notes: Note[] | null;
        };
    }

    export interface Norm {
        div: number;
        tuplets: number;
    }

    export interface Pos {
        norm: Norm;
        pos: number;
    }

    export interface Note extends Pos {
        len: number;
        pitch: number;
    }
    
    export type MelodyLayerMethod = 'score' | 'audio';
    export interface MelodyLayer {
        name: string;
        isMute: boolean;
        volume: number;
        method: MelodyLayerMethod;
    }
    export interface MelodyLayerNotes extends MelodyLayer {
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