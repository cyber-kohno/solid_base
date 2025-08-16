import { styled } from "solid-styled-components";
import RootFrame from "./jsx/rootFrame";
import SC from "../common/styled";
import useInputRoot from "./input/inputRoot";
import { store, getSnapshot } from "./store/store";
import { createEffect, createMemo, onMount, Show } from "solid-js";
import useReducerCache from "./store/reducer/reducerCache";


export const Entry = () => {
    const { snapshot } = getSnapshot();
    const inputRoot = useInputRoot();

    onMount(() => {

        const handleKeyDown = (event: KeyboardEvent) => {
            // Ctrl + キーが押されたとき
            if (event.ctrlKey && ['a', 's', 'l', 'o', 't'].includes(event.key)) {
                event.preventDefault(); // デフォルトの動作を無効にする
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        // クリーンアップ関数を設定してイベントリスナーを削除
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

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
    /* background-color: #16adc4; */
`;