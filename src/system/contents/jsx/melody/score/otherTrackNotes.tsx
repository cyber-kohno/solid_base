import { createMemo, For } from "solid-js";
import { getSnapshot } from "~/system/contents/store/store";
import StoreMelody from "~/system/contents/store/data/storeMelody";
import ShadeNote from "./shadeNote";

const OtherTrackNotes = () => {
    const { snapshot } = getSnapshot();

    const tracks = createMemo(() => {
        const trackIndex = snapshot.control.melody.trackIndex;
        // 自身以外のスコアトラックでフィルター
        return snapshot.data.tracks.filter((t, i) => t.method === 'score' && i !== trackIndex) as StoreMelody.ScoreTrack[];
    });

    const colorArr = ['#faa', '#aabeff', '#ffa', '#afa', '#aff', '#ced'];

    return (
        <For each={tracks()} >{(track, i) => {
            return (
                <For each={track.notes}>{note =>
                    <ShadeNote note={note} noteColor={colorArr[i()]}/>
                }</For>);
        }}</For>
    );
};

export default OtherTrackNotes;
