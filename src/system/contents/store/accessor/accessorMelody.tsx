import StoreMelody from "../data/storeMelody";
import { StoreProps } from "../store";


const useAccessorMelody = (snapshot: StoreProps) => {

    const getCurrScoreTrack = () => {
        const melody = snapshot.control.melody;
        const layer = snapshot.data.tracks[melody.trackIndex];
        if (layer.method !== 'score') throw new Error();
        return layer as StoreMelody.ScoreTrack;
    }

    return {
        getCurrScoreTrack,
    }
}
export default useAccessorMelody;