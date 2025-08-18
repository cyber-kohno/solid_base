import { StoreProps } from "../store";

const useAccessorCache = (snapshot: StoreProps) => {

    const getChordBlockRight = () => {
        const chordCaches = snapshot.cache.chordCaches;
        if (chordCaches.length === 0) return 0;
        const cache = chordCaches[chordCaches.length - 1];
        return cache.viewPosLeft + cache.viewPosWidth;
    }

    const getCurElement = () => {
        const { elementCaches } = snapshot.cache;
        const focus = snapshot.control.outline.focus;
        if (elementCaches[focus] == undefined) throw new Error('elementCacheが生成されていない時に呼び出してはならない。');
        return elementCaches[focus];
    }
    const getCurBase = () => {
        const element = getCurElement();
        return snapshot.cache.baseCaches[element.baseSeq];
    }
    const getBaseFromBeat = (pos: number) => {
        const base = snapshot.cache.baseCaches.find(b => {
            return b.startBeatNote <= pos && pos < b.startBeatNote + b.lengthBeatNote;
        });
        if (base == undefined) throw new Error();
        return base;
    }
    const getChordFromBeat = (pos: number) => {
        const chord = snapshot.cache.chordCaches.find(c => {
            return c.startBeatNote <= pos && pos < c.startBeatNote + c.lengthBeatNote;
        });
        if (chord == undefined) throw new Error();
        return chord;
    }
    const getCurChord = () => {
        const element = getCurElement();
        if (element.chordSeq === -1) throw new Error('コード要素でないところで呼び出された。');
        const chordCache = snapshot.cache.chordCaches[element.chordSeq];
        return chordCache;
    }

    const getFocusInfo = () => {
        const outline = snapshot.control.outline;
        const elementCache = snapshot.cache.elementCaches[outline.focus];
        const chordCaches = snapshot.cache.chordCaches;

        const lastChordSeq = elementCache.lastChordSeq;
        const chordSeq = elementCache.chordSeq;
        let left = 0;
        let width = 20;
        let isChord = false;
        if (chordSeq === -1) {

            if (lastChordSeq !== -1) {
                const chordCache = chordCaches[lastChordSeq];
                left = chordCache.viewPosLeft + chordCache.viewPosWidth;
            }
        } else {
            const chordCache = chordCaches[chordSeq];
            left = chordCache.viewPosLeft;
            width = chordCache.viewPosWidth;
            isChord = true;
        }
        return { left, width, isChord };
    }

    return {
        getChordBlockRight,
        getCurElement,
        getCurBase,
        getCurChord,
        getBaseFromBeat,
        getChordFromBeat,
        getFocusInfo
    }
}

export default useAccessorCache;