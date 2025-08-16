import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import DataInit from "./data/dataInit";
import DataSection from "./data/dataSection";
import DataChord from "./data/dataChord";
import DataModulate from "./data/dataModulate";
import { createMemo } from "solid-js";
import FocusCover from "~/system/common/item/focusCover";
import { store, getSnapshot } from "~/system/contents/store/store";
import StoreCache from "~/system/contents/store/manage/storeCache";
import StoreOutline from "~/system/contents/store/data/storeOutline";

const Element = (props: {
    element: StoreCache.ElementCache;
    index: number;
}) => {
    const { snapshot } = getSnapshot();

    const dataJsx = createMemo((() => {
        const element = props.element;
        const type = element.type;
        const data = element.data;
        switch (type) {
            case 'init': return <DataInit data={data} />;
            case 'section': return <DataSection data={data} />;
            case 'chord': {
                if (element.chordSeq == -1) throw new Error('element.chordSeqが-1であってはならない。');
                const cache = snapshot.cache.chordCaches[element.chordSeq];
                return <DataChord data={data} cache={cache} />;
            }
            case 'modulate': return <DataModulate data={data} />;
        }
        throw new Error(`type:[${type}]のcaseが未定義。`);
    }));

    const isFocus = createMemo(() => snapshot.control.outline.focus === props.index);

    const initRef = (ref: HTMLDivElement) => {
        const elementRefs = store.ref.elementRefs;
        let instance = elementRefs.find((r) => r.seq === props.index);
        if (instance == undefined) {
            instance = { seq: props.index, get: () => ref };
            elementRefs.push(instance);
        } else instance.get = () => ref;
    }

    return (<_Item
        ref={initRef}
        type={props.element.type}
    >
        {dataJsx()}
        <FocusCover dispCondition={isFocus()} bgColor="#ffec3d6c" />
    </_Item>);
}
export default Element;

const _Item = styled.div<{
    type: StoreOutline.ElementType;
}>`
    ${SC.rect}
    /* background-color: #f00; */
    width: 180px;
    /* height: 60px; */
    margin-top: 4px;
    /* border: 1px solid #000; */
    margin-left: ${props => (()=>{
        switch(props.type) {
            case 'init': return 4;
            case 'section': return 10;
            case 'chord':
            case 'tempo':
            case 'modulate': return 25;
        }
    })()}px;
`;