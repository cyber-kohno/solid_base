import { createMemo, For } from "solid-js";
import { store } from "../../store/store";
import Element from "./element/element";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "../../const/layout";

const ElementList = () => {

    const elements = createMemo(() => store.cache.elementIndexes);
    return (<_Wrap>

        <For each={elements()} >
            {(element, index) => {
                return <Element element={store.data.elements[index()]} index={index()} />
            }}
        </For>
    </_Wrap>);
}
export default ElementList;

const layout = Layout.outline;
const _Wrap = styled('div')`
    ${SC.rect}
    width: 100%;
    height: calc(100% - ${(layout.HEADER_HEIGHT + layout.FOOTER_HEIGHT).toString()}px);
    background-color: #e9dfdf;
    overflow: hidden;
`;