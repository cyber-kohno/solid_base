import StoreOutline from "../store/data/storeOutline";
import ReducerCache from "../store/reducer/reducerCache";
import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";
import MusicTheory from "../util/musicTheory";

namespace InputOutline {

    export const control = (eventKey: string) => {

        switch (eventKey) {
            case 'a': {
                const data: StoreOutline.DataChord = {
                    beat: 4,
                    eat: 0
                }
                ReducerOutline.insertElement({
                    type: 'chord',
                    data
                });
                ReducerCache.compileElements();
            } break;
            case 's': {
                const data: StoreOutline.DataSection = {
                    name: 'section'
                };
                ReducerOutline.insertElement({
                    type: 'section',
                    data
                });
                ReducerCache.compileElements();
            } break;
            case 'Delete': {
                ReducerOutline.removeCurElement();
                ReducerCache.compileElements();
            }break;

            case 'ArrowUp': {
                ReducerOutline.moveFocus(-1);
            } break;
            case 'ArrowDown': {
                ReducerOutline.moveFocus(1);
            } break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7': {
                // if (isLock) break;
                const element = ReducerOutline.getCurrentElement();
                if (element.type === 'chord') {
                    const chordData: StoreOutline.DataChord = { ...element.data };
                    const scaleIndex = Number(eventKey) - 1;
                    const diatonic = MusicTheory.getDiatonicDegreeChord('major', scaleIndex);
                    chordData.degree = diatonic;
                    ReducerOutline.setChordData(chordData);
                    ReducerCache.compileElements();
                }
            } break;
        }
    }

    export const getHoldCallbacks = (eventKey: string): StoreInput.Callbacks => {
        const callbacks: StoreInput.Callbacks = {};

        const elementType = ReducerOutline.getCurrentElement().type;

        callbacks.holdF = () => {

            switch (elementType) {
                case 'chord': {
                    const chordData = ReducerOutline.getCurrentChordData();

                    const modBeat = (dir: -1 | 1) => {
                        const temp = chordData.beat + dir;
                        if (temp >= 1 && temp <= 4) chordData.beat = temp;
                        ReducerOutline.setChordData(chordData);
                        ReducerCache.compileElements();
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
}
export default InputOutline;