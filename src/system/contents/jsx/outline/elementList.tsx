import { createMemo, For } from "solid-js";
import Element from "./element/element";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "../../const/layout";
import { store, getSnapshot } from "../../store/store";
import MarginBlock from "../common/marginBlock";

const ElementList = () => {
    const { snapshot } = getSnapshot();

    const elements = createMemo(() => {
        return snapshot.cache.elementCaches;
    });
    return (<_Wrap ref={ref => store.ref.outline = () => ref}>

        <For each={elements()} >
            {(element, index) => {
                return <Element element={element} index={index()} />
            }}
        </For>
        <MarginBlock.Outline />
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