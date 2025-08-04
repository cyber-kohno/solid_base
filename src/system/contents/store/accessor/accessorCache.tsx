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
    const getCurChord = () => {
        const element = getCurElement();
        if (element.chordSeq === -1) throw new Error('コード要素でないところで呼び出された。');
        const chordCache = snapshot.cache.chordCaches[element.chordSeq];
        return chordCache;
    }

    return {
        getChordBlockRight,
        getCurElement,
        getCurBase,
        getCurChord,
    }
}

export default useAccessorCache;