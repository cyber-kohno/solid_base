import StoreMelody from "../store/data/storeMelody";
import ReducerOutline from "../store/reducer/reducerOutline";
import useReducerRoot from "../store/reducer/reducerRoot";
import { store, StoreProps } from "../store/store";

const useInputMelody = () => {

    const melody = store.control.melody;
    const cursor = melody.cursor;

    const control = (eventKey: string) => {

        const moveCursor = (dir: -1 | 1) => {
            cursor.pos.size += dir;
        }
        const changeDiv = (len: StoreMelody.Len, div: number) => {
            const prev = len.div;
            len.div = div;
            len.size *= div / prev;
        }
        switch (eventKey) {
            case 'ArrowLeft': {
                moveCursor(-1);
            } break;
            case 'ArrowRight': {
                moveCursor(1);
            } break;
            case '1': {  changeDiv(cursor.pos, 4);  } break;
            case '2': {  changeDiv(cursor.pos, 2);  } break;
            case '3': {  changeDiv(cursor.pos, 1);  } break;
        }
    }


    const getHoldCallbacks = (eventKey: string): StoreInput.Callbacks => {
        const callbacks: StoreInput.Callbacks = {};

        // callbacks.holdE = () => {

        //     switch(eventKey) {
        //         case 'ArrowUp': {
        //             console.log('E押しながら上');
        //         } break;
        //     }
        // }
        return callbacks;
    }

    return {
        control,
        getHoldCallbacks
    };
}
export default useInputMelody;