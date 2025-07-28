import ReducerOutline from "../store/reducer/reducerOutline";
import ReducerRoot from "../store/reducer/reducerRoot";

namespace InputMelody {

    export const control = (eventKey: string) => {

        switch (eventKey) {
        }
    }

    
    export const getHoldCallbacks = (eventKey: string): StoreInput.Callbacks => {
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
}
export default InputMelody;