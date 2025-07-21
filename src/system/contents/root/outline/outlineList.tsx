import { createMemo, For } from "solid-js";
import { store } from "../../store/store";
import Element from "./element/element";

const OutlineList = () => {

    const elements = createMemo(()=> store.data.elements);
    return (

        <For each={elements()}>
            {(element) => <Element element={element}/>}
        </For>
    );
}
export default OutlineList;