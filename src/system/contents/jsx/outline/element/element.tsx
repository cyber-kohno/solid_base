import assert from "assert";
import { style } from "solid-js/web";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";
import DataInit from "./data/dataInit";
import DataSection from "./data/dataSection";
import DataChord from "./data/dataChord";
import DataModulate from "./data/dataModulate";
import { createMemo } from "solid-js";
import FocusCover from "~/system/common/item/focusCover";
import { store } from "~/system/contents/store/store";

const Element = (props: {
    element: StoreOutline.Element;
    index: number;
}) => {

    const dataJsx = createMemo((() => {
        const type = props.element.type;
        switch (type) {
            case 'init': return <DataInit />;
            case 'section': return <DataSection />;
            case 'chord': return <DataChord />;
            case 'modulate': return <DataModulate />;
        }
        throw new Error(`type:[${type}]のcaseが未定義。`);
    }));

    const isFocus = createMemo(() => store.control.outline.focus === props.index);

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