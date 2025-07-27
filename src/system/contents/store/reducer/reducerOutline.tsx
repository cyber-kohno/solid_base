import StoreOutline from "../data/storeOutline";
import { setStore, store } from "../store";

namespace ReducerOutline {

    export const insertElement = (element: StoreOutline.Element) => {
        const elements = store.data.elements.slice();
        const focus = store.control.outline.focus;
        elements.splice(focus+1, 0, element);
        setStore('data', 'elements', elements);
    };

    export const moveFocus = (val: number) => {
        setStore('control', 'outline', 'focus', focus => focus + val);
    }

    export const renmaeSectionData = (value: string) => {
        const elementIndex = store.control.outline.focus;
        const element = store.data.elements[elementIndex];
        if(element.type !== 'section') throw Error(`section要素でない。[${element.type}]`);
        // const data = element.data as StoreOutline.DataSection;
        // data.name = value;
        setStore('data', 'elements', elementIndex, 'data', 'name', value);
    }
}

export default ReducerOutline;