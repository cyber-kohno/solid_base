import StoreOutline from "../data/storeOutline";
import { useGlobalStore } from "../store";

const useReducerOutline = () => {
    const store = useGlobalStore();

    const getCurrentElement = () => {
        const elementIndex = store.control.outline.focus;
        return store.data.elements[elementIndex];
    };

    const getCurrentChordData = (): StoreOutline.DataChord => {
        // const elementIndex = store.control.outline.focus;
        const element = useReducerOutline().getCurrentElement();
        if (element.type !== 'chord') throw new Error('element.typeはchordでなければならない。');
        const data = element.data;
        return { ...data };
    };

    const insertElement = (element: StoreOutline.Element) => {
        const elements = store.data.elements.slice();
        const focus = store.control.outline.focus;
        elements.splice(focus + 1, 0, element);
        setStore('data', 'elements', elements);
    };
    const removeCurElement = () => {
        const elements = store.data.elements.slice();
        const focus = store.control.outline.focus;
        elements.splice(focus, 1);
        setStore('data', 'elements', elements);
        setStore('control', 'outline', 'focus', prev => prev - 1);
    };

    const moveFocus = (val: number) => {
        setStore('control', 'outline', 'focus', focus => {
            const length = store.data.elements.length;
            const next = focus + val;
            if (next < 0 || next > length - 1) return focus;
            return next;
        });
    };

    const renameSectionData = (value: string) => {
        const elementIndex = store.control.outline.focus;
        const element = getCurrentElement();
        if (element.type !== 'section') throw Error(`section要素でない。[${element.type}]`);
        setStore('data', 'elements', elementIndex, 'data', 'name', value);
    };

    const setChordData = (data: StoreOutline.DataChord) => {
        const elementIndex = store.control.outline.focus;
        const element = getCurrentElement();
        if (element.type !== 'chord') throw Error(`chord要素でない。[${element.type}]`);
        setStore('data', 'elements', elementIndex, 'data', data);
    };
    return {
        getCurrentElement,
        getCurrentChordData,
        insertElement,
        removeCurElement,
        moveFocus,
        renameSectionData,
        setChordData,
    }
};

export default useReducerOutline;