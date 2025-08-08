import MidiWriter from 'midi-writer-js';
import StoreOutline from '../store/data/storeOutline';
import { store } from '../store/store';

namespace FileUtil {

    export const downloadMidi = (fileName: string) => {
        // Start with a new track
        const track = new MidiWriter.Track();

        // Define an instrument (optional):
        track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

        const initData: StoreOutline.DataInit = store.cache.elementCaches[0].data;
        track.addEvent(new MidiWriter.TempoEvent({ bpm: initData.tempo }));

        // const timeline = store.timeline;
        // const layer = timeline.layers[timeline.layerIndex] as TimelineStore.MelodyLayerNotes;

        // let lastTail: TimelineStore.Pos = {
        //     pos: 0,
        //     norm: { div: 4, tuplets: 1 }
        // }
        // layer.notes.forEach(n => {
        //     let note: TimelineStore.Note = JSON.parse(JSON.stringify(n));
        //     const criteriaNorm = TimelineStore.getSmallerNorm(lastTail.norm, note.norm);
        //     if (criteriaNorm != null) {
        //         lastTail = TimelineStore.getChangedNorm(lastTail, criteriaNorm);
        //         note = TimelineStore.getChangedNorm(note, criteriaNorm) as TimelineStore.Note;
        //     }
        //     const diffLen = Math.abs(lastTail.pos - note.pos);
        //     // console.log(diffLen);
        //     let wait = 'T0';
        //     // 休符の挿入
        //     if (diffLen > 0) {

        //         wait = `T${128 * 4 / note.norm.div * diffLen}`;
        //         lastTail.pos += diffLen;
        //     }
        //     const pitch = getKey12FullName(note.pitch);

        //     const duration = `T${128 * 4 / note.norm.div * note.len}`;
        //     track.addEvent(new MidiWriter.NoteEvent({ pitch, duration, wait }));
        //     lastTail.pos += note.len;
        // });

        // Generate a data URI
        const writer = new MidiWriter.Writer(track);
        // console.log(write.dataUri());
        const link = document.createElement('a');
        link.href = writer.dataUri();
        link.download = `${fileName}.mid`;
        link.click();
    }
};
export default FileUtil;