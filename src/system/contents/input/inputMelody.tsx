import ReducerOutline from "../store/reducer/reducerOutline";
import useReducerRoot from "../store/reducer/reducerRoot";
import { StoreProps } from "../store/store";

const useInputMelody = ()=> {

    const control = (eventKey: string) => {

        switch (eventKey) {
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