namespace StoreRef {

    export type Props = {
        grid?: () => HTMLDivElement;
        header?: () => HTMLDivElement;
        pitch?: () => HTMLDivElement;
        outline?: () => HTMLDivElement;
        terminal?: () => HTMLDivElement;

        elementRefs: { seq: number, get: () => HTMLDivElement }[];
    }
};
export default StoreRef;