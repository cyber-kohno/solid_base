namespace StoreInput {

    export type KeyState = {
        holdE: boolean;
        holdD: boolean;
        holdF: boolean;
        holdC: boolean;
        holdX: boolean;
        holdG: boolean;
        holdShift: boolean;
        holdCtrl: boolean;
    };
    
    export type Callbacks = {
        [K in keyof KeyState]?: () => void;
    };
}