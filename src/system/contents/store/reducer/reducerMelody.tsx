import { cursorTo } from "readline";
import StoreMelody from "../data/storeMelody";
import { store } from "../store";
import useReducerOutline from "./reducerOutline";
import useReducerRef from "./reducerRef";
import useAccessorMelody from "../accessor/accessorMelody";
import SoundFont, { instrument, type InstrumentName } from 'soundfont-player';
import StorePreview from "../manage/storePreview";

const useReducerMelody = () => {
    const { syncChordSeqFromNote } = useReducerOutline();
    const { adjustGridScrollXFromNote } = useReducerRef();

    const syncCursorFromElementSeq = () => {
        const focus = store.control.outline.focus;
        const cache = store.cache;
        const { lastChordSeq, chordSeq } = cache.elementCaches[focus];
        let pos = 0;
        // 先頭以降の要素
        if (lastChordSeq !== -1) {
            const chordCache = cache.chordCaches[lastChordSeq];

            pos = chordCache.startBeatNote;
            // コード要素
            if (chordSeq === -1) pos += chordCache.lengthBeatNote;
        }

        const melody = store.control.melody;
        const cursor = melody.cursor;
        cursor.norm.div = 1;
        cursor.norm.tuplets = undefined;
        cursor.pos = pos;
        cursor.len = 1;
        melody.focus = -1;
    }
    const addNote = (note: StoreMelody.Note) => {
        const melody = store.control.melody;
        const layer = store.data.tracks[melody.trackIndex];
        if (layer.method !== 'score') throw new Error();
        const notes = (layer as StoreMelody.ScoreTrack).notes;
        notes.push(note);
        notes.sort((n1, n2) => {
            const [n1Pos, n2Pos] = [n1, n2].map(n => StoreMelody.calcBeat(n.norm, n.pos));
            return n1Pos - n2Pos;
        });
    }

    const addNoteFromCursor = () => {
        addNote(JSON.parse(JSON.stringify(store.control.melody.cursor)));
    }

    const judgeOverlap = () => {
        const { getCurrScoreTrack } = useAccessorMelody(store);
        const melody = store.control.melody;
        const layer = getCurrScoreTrack();
        const notes = (layer as StoreMelody.ScoreTrack).notes;
        const overlapNote = notes.find(n => {
            return StoreMelody.judgeOverlapNotes(n, melody.cursor);
        });
        melody.isOverlap = overlapNote != undefined;
    }
    const focusInNearNote = (dir: -1 | 1) => {
        const { getCurrScoreTrack } = useAccessorMelody(store);
        const melody = store.control.melody;
        const cursor = melody.cursor;
        const layer = getCurrScoreTrack();
        const notes = (layer as StoreMelody.ScoreTrack).notes;

        const cursorPos = StoreMelody.calcBeat(cursor.norm, cursor.pos);
        const matchIndex = (dir === -1 ? notes.slice().reverse() : notes).findIndex(n => {
            const side = StoreMelody.calcBeatSide(n);
            const [left, right] = [side.pos, side.pos + side.len];
            return dir === -1 ? cursorPos > left : cursorPos < right;
        });
        if (matchIndex !== -1) {
            melody.focus = (dir === -1 ? notes.length - 1 - matchIndex : matchIndex);
            const note = notes[melody.focus];
            syncChordSeqFromNote(note);
            adjustGridScrollXFromNote(note);
        }
    }

    const focusOutNoteSide = (note: StoreMelody.Note, dir: -1 | 1) => {
        const melody = store.control.melody;
        melody.cursor = JSON.parse(JSON.stringify(note));
        const cursor = melody.cursor;
        // cursor.norm.div = note.norm.div;
        // cursor.pos = note.pos;
        cursor.len = 1;
        if (dir === 1) {
            cursor.pos += note.len;
        }
        melody.focus = -1;
        judgeOverlap();
        syncChordSeqFromNote(cursor);
        adjustGridScrollXFromNote(cursor);
    }

    const changeScoreTrack = (trackIndex: number) => {
        const melody = store.control.melody;
        const tracks = store.data.tracks;
        if (tracks[trackIndex] == undefined) throw new Error();
        const prevIndex = melody.trackIndex;
        const prevTrack = tracks[prevIndex];
        const nextTrack = tracks[trackIndex];
        if (nextTrack.method !== 'score') throw new Error();

        melody.trackIndex = trackIndex;
        if (prevTrack.method === 'score' && melody.focus !== -1) {
            const notes = (prevTrack as StoreMelody.ScoreTrack).notes;
            focusOutNoteSide(notes[melody.focus], -1);
        }
    }
    const setSFCurTrack = (sfName: InstrumentName) => {
        const melody = store.control.melody;
        const track = store.data.tracks[melody.trackIndex] as StoreMelody.ScoreTrack;
        if (track == undefined) throw new Error();
        if (track.method !== 'score') throw new Error();

        track.soundFont = sfName;

        const items = store.preview.sfItems;

        const isLoadAlready = items.find(c => c.instrumentName === sfName) != undefined;
        if (!isLoadAlready) {
            items.push({ instrumentName: sfName });

            store.info = `Loading soundfont[${sfName}].`;
            SoundFont.instrument(new AudioContext(), sfName).then(player => {
                const item = items.find(sf => sf.instrumentName === sfName);
                if (item == undefined) throw new Error();
                item.player = player;
                store.info = '';
            });
        }
    }
    const loadSFPlayer = (sfName: SoundFont.InstrumentName) => {
        const items = store.preview.sfItems;

        const isLoadAlready = items.find(c => c.instrumentName === sfName) != undefined;
        if (!isLoadAlready) {
            items.push({ instrumentName: sfName });

            store.info = `Loading soundfont[${sfName}].`;
            SoundFont.instrument(new AudioContext(), sfName).then(player => {
                const item = items.find(sf => sf.instrumentName === sfName);
                if (item == undefined) throw new Error();
                item.player = player;
                store.info = '';
            });
        }
    }

    return {
        syncCursorFromElementSeq,
        addNote,
        addNoteFromCursor,
        judgeOverlap,
        focusInNearNote,
        focusOutNoteSide,
        changeScoreTrack,
        setSFCurTrack,
        loadSFPlayer
    };
};
export default useReducerMelody;