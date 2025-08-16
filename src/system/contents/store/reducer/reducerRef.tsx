import Layout from "../../const/layout";
import StoreMelody from "../data/storeMelody";
import { store } from "../store";

const useReducerRef = () => {

    const adjustGridScrollX = (getLeft: ((width: number) => number)) => {

        if (store.ref.grid && store.ref.header) {
            const gridRef = store.ref.grid();
            const headerRef = store.ref.header();
            const width = gridRef.getBoundingClientRect().width;

            const left = getLeft(width);
            gridRef.scrollTo({ left, behavior: "smooth" });
            headerRef.scrollTo({ left, behavior: "smooth" });
        }
    }

    const adjustGridScrollY = (getTop: ((height: number) => number)) => {
        if (store.ref.grid && store.ref.pitch) {
            const gridRef = store.ref.grid();
            const pitchRef = store.ref.pitch();
            const height = gridRef.getBoundingClientRect().height;

            const top = getTop(height);
            gridRef.scrollTo({ top, behavior: "smooth" });
            pitchRef.scrollTo({ top, behavior: "smooth" });
        }
    }

    const adjustGridScrollXFromNote = (note: StoreMelody.Note) => {
        const [pos, len] = [note.pos, note.len]
            .map(size => StoreMelody.calcBeat(note.norm, size) * store.env.beatWidth);
        adjustGridScrollX((width) => pos + len / 2 - width / 2);
    }

    const adjustGridScrollYFromCursor = (note: StoreMelody.Note) => {
        const pos = (Layout.pitch.NUM - note.pitch) * Layout.pitch.ITEM_HEIGHT;
        adjustGridScrollY((height) => pos - height / 2);
    }
    const adjustGridScrollXFromOutline = () => {

        adjustGridScrollX((width) => {
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
            return pos;
        });
    }

    const adjustOutlineScroll = () => {

        if (store.ref.outline) {
            const ref = store.ref.outline();
            const { height: outlineHeight, top: outlineTop } = ref.getBoundingClientRect();

            const focus = store.control.outline.focus;
            let top = 0;
            const elementRef = store.ref.elementRefs.find(r => r.seq === focus);
            if (elementRef) {
                const rect = elementRef.get().getBoundingClientRect();
                // console.log(`seq:${elementRef.seq}, y:${rect.y}`);
                const domY = rect.y - outlineTop + ref.scrollTop;
                top = domY + rect.height / 2 - outlineHeight / 2;
            }
            ref.scrollTo({ top, behavior: "smooth" });
        }
    }
    const adjustTerminalScroll = () => {

        if (store.ref.terminal) {
            const ref = store.ref.terminal();
            const {height: frameHeight} = ref.getBoundingClientRect();

            const top = ref.scrollHeight - frameHeight / 2;
            ref.scrollTo({ top, behavior: "smooth" });
        }
    }

    return {
        adjustGridScrollXFromOutline,
        adjustOutlineScroll,
        adjustGridScrollXFromNote,
        adjustGridScrollYFromCursor,
        adjustTerminalScroll
    };
};

export default useReducerRef;