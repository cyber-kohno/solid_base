import { styled } from "solid-styled-components";
import RootFrame from "./jsx/rootFrame";
import SC from "../common/styled";
import useInputRoot from "./input/inputRoot";
import { store, useGlobalStore } from "./store/store";
import { createEffect, createMemo, onMount, Show } from "solid-js";
import useReducerCache from "./store/reducer/reducerCache";


export const Entry = () => {
    const { snapshot } = useGlobalStore();
    const inputRoot = useInputRoot();

    const reducerCache = useReducerCache();

    const isStandby = createMemo(() => snapshot.cache.elementCaches.length === 0);

    createEffect(() => {
        if (isStandby()) {
            reducerCache.calculate();
        }
    });

    return (
        <Show when={!isStandby()}>
            <_Wrap
                tabIndex={-1}
                onKeyDown={inputRoot.onKeyDown}
                onKeyUp={inputRoot.onKeyUp}
            >
                <RootFrame />
            </_Wrap>
        </Show>
    );
}

export default Entry;

const _Wrap = styled(SC._Wrap)`
    background-color: #16adc4;
`;