import StoreOutline from "../store/data/storeOutline";
import useReducerCache from "../store/reducer/reducerCache";
import useReducerOutline from "../store/reducer/reducerOutline";
import { store, StoreProps } from "../store/store";
import MusicTheory from "../util/musicTheory";

const useInputOutline = () => {

    const reducerOutline = useReducerOutline();
    const reducerCache = useReducerCache();

    const control = (eventKey: string) => {

        switch (eventKey) {
            case 'a': {
                const data: StoreOutline.DataChord = {
                    beat: 4,
                    eat: 0
                }
                reducerOutline.insertElement({
                    type: 'chord',
                    data
                });
                reducerCache.calculate();
            } break;
            case 's': {
                const data: StoreOutline.DataSection = {
                    name: 'section'
                };
                reducerOutline.insertElement({
                    type: 'section',
                    data
                });
                reducerCache.calculate();
            } break;
            case 'Delete': {
                reducerOutline.removeCurElement();
                reducerCache.calculate();
            } break;

            case 'ArrowUp': {
                reducerOutline.moveFocus(-1);
            } break;
            case 'ArrowDown': {
                reducerOutline.moveFocus(1);
            } break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7': {
                // if (isLock) break;
                const element = reducerOutline.getCurrentElement();
                if (element.type === 'chord') {
                    const chordData: StoreOutline.DataChord = { ...element.data };
                    const scaleIndex = Number(eventKey) - 1;
                    const diatonic = MusicTheory.getDiatonicDegreeChord('major', scaleIndex);
                    chordData.degree = diatonic;
                    reducerOutline.setChordData(chordData);
                    reducerCache.calculate();
                }
            } break;
        }
    }

    const getHoldCallbacks = (eventKey: string): StoreInput.Callbacks => {

        const callbacks: StoreInput.Callbacks = {};

        const elementType = reducerOutline.getCurrentElement().type;

        callbacks.holdF = () => {

            switch (elementType) {
                case 'chord': {
                    const chordData = reducerOutline.getCurrentChordData();

                    const modBeat = (dir: -1 | 1) => {
                        const temp = chordData.beat + dir;
                        if (temp >= 1 && temp <= 4) chordData.beat = temp;
                        reducerOutline.setChordData(chordData);
                        reducerCache.calculate();
                    }
                    switch (eventKey) {
                        case 'ArrowLeft': modBeat(-1); break;
                        case 'ArrowRight': modBeat(1); break;
                    }
                } break;
            }
        }
        return callbacks;
    }

    return {
        control,
        getHoldCallbacks
    };
}
export default useInputOutline;