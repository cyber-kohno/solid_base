import StoreOutline from "../data/storeOutline";
import { setStore, store } from "../store";

namespace ReducerOutline {

    export const getCurrentElement = () => {
        const elementIndex = store.control.outline.focus;
        return store.data.elements[elementIndex];
    }
    export const getCurrentChordData = (): StoreOutline.DataChord => {
        // const elementIndex = store.control.outline.focus;
        const element = getCurrentElement();
        if(element.type !== 'chord') throw new Error('element.typeはchordでなければならない。');
        const data = element.data;
        return {...data};
    }

    export const insertElement = (element: StoreOutline.Element) => {
        const elements = store.data.elements.slice();
        const focus = store.control.outline.focus;
        elements.splice(focus+1, 0, element);
        setStore('data', 'elements', elements);
    };

    export const moveFocus = (val: number) => {
        setStore('control', 'outline', 'focus', focus => {
        const length = store.data.elements.length;
            const next = focus + val;
            if(next < 0 || next > length-1) return focus;
            return next;
        });
    }

    export const renameSectionData = (value: string) => {
        const elementIndex = store.control.outline.focus;
        const element = getCurrentElement();
        if(element.type !== 'section') throw Error(`section要素でない。[${element.type}]`);
        setStore('data', 'elements', elementIndex, 'data', 'name', value);
    }

    export const setChordData = (data: StoreOutline.DataChord) => {
        const elementIndex = store.control.outline.focus;
        const element = getCurrentElement();
        if(element.type !== 'chord') throw Error(`chord要素でない。[${element.type}]`);
        setStore('data', 'elements', elementIndex, 'data', data);
    }
}

export default ReducerOutline;