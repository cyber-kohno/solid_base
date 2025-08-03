import { store } from "../store";

const useReducerRef = () => {

    const adjustGridScrollX = () => {

        if (store.ref.grid && store.ref.header) {
            const gridRef = store.ref.grid();
            const headerRef = store.ref.header();
            const width = gridRef.getBoundingClientRect().width;

            const focus = store.control.outline.focus;
            const cache = store.cache;
            const { lastChordSeq, chordSeq } = cache.elementCaches[focus];
            let pos = 0;
            // 先頭以降の要素
            if (lastChordSeq !== -1) {
                const chordCache = cache.chordCaches[lastChordSeq];

                // コード要素
                if (chordSeq !== -1) {
                    pos = chordCache.viewPosLeft + chordCache.viewPosWidth / 2 - width / 2;
                } else {
                    pos = chordCache.viewPosLeft + chordCache.viewPosWidth - width / 2;
                }
            }
            // pos -= width / 2;
            // console.log(pos);
            gridRef.scrollTo({ left: pos, behavior: "smooth" });
            headerRef.scrollTo({ left: pos, behavior: "smooth" });
        }
    }

    const adjustOutlineScroll = () => {

        if (store.ref.outline) {
            const outlineRef = store.ref.outline();
            const { height: outlineHeight, top: outlineTop } = outlineRef.getBoundingClientRect();

            const focus = store.control.outline.focus;
            let top = 0;
            const elementRef = store.ref.elementRefs.find(r => r.seq === focus);
            if (elementRef) {
                const rect = elementRef.get().getBoundingClientRect();
                // console.log(`seq:${elementRef.seq}, y:${rect.y}`);
                const domY = rect.y - outlineTop + outlineRef.scrollTop;
                top = domY + rect.height / 2 - outlineHeight / 2;
            }
            outlineRef.scrollTo({ top, behavior: "smooth" });
        }
    }

    return {
        adjustGridScrollX,
        adjustOutlineScroll
    };
};

export default useReducerRef;