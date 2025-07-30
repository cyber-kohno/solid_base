import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import DataInit from "./data/dataInit";
import DataSection from "./data/dataSection";
import DataChord from "./data/dataChord";
import DataModulate from "./data/dataModulate";
import { createMemo } from "solid-js";
import FocusCover from "~/system/common/item/focusCover";
import { useGlobalStore } from "~/system/contents/store/store";
import StoreCache from "~/system/contents/store/manage/storeCache";

const Element = (props: {
    element: StoreCache.ElementCache;
    index: number;
}) => {
    const { snapshot } = useGlobalStore();

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
            case 'modulate': return <DataModulate />;
        }
        throw new Error(`type:[${type}]のcaseが未定義。`);
    }));

    const isFocus = createMemo(() => snapshot.control.outline.focus === props.index);

    return (<_Item>
        {dataJsx()}
        <FocusCover dispCondition={isFocus()} bgColor="#ffec3d6c" />
    </_Item>);
}
export default Element;

const _Item = styled.div`
    ${SC.rect}
    /* background-color: #f00; */
    width: 180px;
    /* height: 60px; */
    margin: 2px 0 0 4px;
    /* border: 1px solid #000; */
`;