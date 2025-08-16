import { createMemo, For } from "solid-js";
import Note from "./note";
import { getSnapshot } from "~/system/contents/store/store";
import StoreMelody from "~/system/contents/store/data/storeMelody";

const ActiveNotes = () => {
    const { snapshot } = getSnapshot();

    const notes = createMemo(() => {
        const layer = snapshot.data.tracks[snapshot.control.melody.trackIndex] as StoreMelody.ScoreTrack;
        return layer.notes;
    });

    return (
        <For each={notes()}>{(note, i) =>
            <Note note={note} index={i()} />
        }</For>
    );
};

export default ActiveNotes;
