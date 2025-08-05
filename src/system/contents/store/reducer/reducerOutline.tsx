import StoreOutline from "../data/storeOutline";
import { store } from "../store";

const useReducerOutline = () => {

    const getCurrentElement = () => {
        const elementIndex = store.control.outline.focus;
        return store.data.elements[elementIndex];
    };

    const getCurrentChordData = (): StoreOutline.DataChord => {
        const element = getCurrentElement();
        if (element.type !== 'chord') throw new Error('element.typeはchordでなければならない。');
        return element.data;
    };
    const getCurrentSectionData = (): StoreOutline.DataSection => {
        const element = getCurrentElement();
        if (element.type !== 'section') throw new Error('element.typeはsectionでなければならない。');
        return element.data;
    };

    const insertElement = (element: StoreOutline.Element) => {
        const elements = store.data.elements;
        const focus = store.control.outline.focus;
        elements.splice(focus + 1, 0, element);
    };
    const removeCurElement = () => {
        const elements = store.data.elements;
        const focus = store.control.outline.focus;
        elements.splice(focus, 1);
        store.control.outline.focus--;
    };

    const moveFocus = (val: number) => {
        const focus = store.control.outline.focus;
        const length = store.data.elements.length;
        const next = focus + val;
        if (next >= 0 && next <= length - 1) store.control.outline.focus = next;
    };

    const renameSectionData = (value: string) => {
        const element = getCurrentElement();
        if (element.type !== 'section') throw Error(`section要素でない。[${element.type}]`);
        const data: StoreOutline.DataSection = element.data;
        data.name = value;
    };

    const setChordData = (data: StoreOutline.DataChord) => {
        const element = getCurrentElement();
        if (element.type !== 'chord') throw Error(`chord要素でない。[${element.type}]`);
        element.data = data;
    };
    return {
        getCurrentElement,
        getCurrentSectionData,
        getCurrentChordData,
        insertElement,
        removeCurElement,
        moveFocus,
        renameSectionData,
        setChordData,
    }
};

export default useReducerOutline;