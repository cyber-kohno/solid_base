import MusicTheory from "../../util/musicTheory";
import StoreOutline from "../data/storeOutline";
import StoreCache from "../manage/storeCache";
import { store } from "../store";

const useReducerCache = () => {

    const calculate = () => {
        const elements = store.data.elements;

        const baseCaches: StoreCache.BaseCache[] = [];
        const elementCaches: StoreCache.ElementCache[] = [];
        const chordCaches: StoreCache.ChordCache[] = [];

        const initialScoreBase: StoreOutline.DataInit = elements[0].data;

        let baseBlock: StoreCache.BaseCache = {
            startTime: 0,
            sustainTime: 0,
            startBeat: 0,
            startBeatNote: 0,
            lengthBeat: 0,
            lengthBeatNote: 0,
            viewPosLeft: 0,
            viewPosWidth: 0,
            scoreBase: JSON.parse(JSON.stringify(initialScoreBase))
        }

        let startBeat = 0;
        let startBeatNote = 0;
        let elapsedTime = 0;
        let lastSectionName = '';
        let prevEat = 0;

        let prevStartBeat = 0;
        let lastChordSeq = -1;

        let viewPos = 0;

        let sectionStart: string | undefined = undefined;
        let lastModulate: StoreCache.ModulateCahce | undefined = undefined;
        let lastTempo: StoreCache.TempoCahce | undefined = undefined;

        elements.forEach((el, i) => {
            let beatSize = 0;
            const elementIndex: StoreCache.ElementCache = {
                // データ要素をディープコピー
                ...JSON.parse(JSON.stringify(el)),
                baseSeq: baseCaches.length,
                chordSeq: -1,
                lastChordSeq
            }
            
            // let modulateCache: StoreCache.ModulateCahce | undefined = undefined;
            // let tempoCache: StoreCache.TempoCahce | undefined = undefined;

            switch (el.type) {
                case 'section': {
                    const data = el.data as StoreOutline.DataSection;
                    lastSectionName = sectionStart = data.name;
                } break;
                case 'chord': {

                    lastChordSeq++;
                    elementIndex.lastChordSeq = lastChordSeq;

                    const data = el.data as StoreOutline.DataChord;

                    let compiledChord: StoreCache.CompiledChord | undefined = undefined;
                    if (data.degree != undefined) {
                        const tonality = baseBlock.scoreBase.tonality;
                        const chord = MusicTheory.getKeyChordFromDegree(tonality, data.degree);
                        const symbol = MusicTheory.getSymbolProps(chord.symbol);
                        const structs: MusicTheory.ChordStruct[] = symbol.structs.map(s => {
                            if (chord == undefined) throw new Error('chordはundefinedであってはならない。');
                            const interval = MusicTheory.getIntervalFromRelation(s);

                            return {
                                key12: (chord.key12 + interval) % 12,
                                relation: s,
                            }
                        });

                        const on = chord.on;
                        if (on != undefined) {
                            const same = structs.find(s => {
                                return on.key12 === s.key12;
                            });
                            if (same == undefined) {
                                structs.push({
                                    key12: on.key12,
                                    relation: 'on'
                                });
                            } else {
                                same.relation = 'on';
                            }
                        }

                        compiledChord = { chord, structs };
                    }

                    /**
                     * 小節跨ぎを判定する
                     * @returns 
                     */
                    const judgeStraddle = () => {
                        /** ベース上での経過拍数 */
                        const baseOnBeat = startBeat - baseBlock.startBeat;
                        const divCnt = MusicTheory.getBarDivBeatCount(baseBlock.scoreBase.ts);
                        const curBar = Math.floor(baseOnBeat / divCnt);
                        const nextBar = Math.floor((baseOnBeat + data.beat) / divCnt);
                        // 同じ小説に収まっている
                        const isSameBar = curBar === nextBar;
                        // 次の小節の頭に揃っている
                        const isNextFit = (nextBar - curBar === 1 && (baseOnBeat + data.beat) % divCnt === 0);
                        return !(isSameBar || isNextFit);
                    };

                    const beatDiv16Cnt = MusicTheory.getBeatDiv16Count(baseBlock.scoreBase.ts);
                    const beatRate = beatDiv16Cnt / 4;
                    beatSize = (data.beat + (prevEat * -1 + data.eat) / beatDiv16Cnt) * beatRate;

                    const beatNote = data.beat * beatRate;

                    const viewPosLeft = viewPos;
                    const viewPosWidth = beatSize * store.env.beatWidth;
                    viewPos += viewPosWidth;
                    // console.log(viewPosLeft);
                    // console.log(viewPosWidth);

                    const sustainTime = (60000 / baseBlock.scoreBase.tempo) * (data.beat + (-prevEat + data.eat) / 4);

                    const beat: StoreCache.BeatCache = {
                        num: data.beat,
                        eatHead: prevEat,
                        eatTail: data.eat,
                    }
                    const chordCache: StoreCache.ChordCache = {
                        elementSeq: i,
                        beat,
                        compiledChord,
                        startBeat,
                        lengthBeat: data.beat,
                        startBeatNote,
                        lengthBeatNote: data.beat * beatRate,
                        viewPosLeft,
                        viewPosWidth,
                        sustainTime,
                        startTime: elapsedTime,
                        sectionStart,
                        modulate: lastModulate,
                        tempo: lastTempo
                    };
                    sectionStart = undefined;
                    lastModulate = undefined;
                    lastTempo = undefined;

                    chordCaches.push(chordCache);
                    elementIndex.chordSeq = lastChordSeq;

                    // 経過時間の加算
                    elapsedTime += sustainTime;
                    prevEat = data.eat;
                    baseBlock.sustainTime += sustainTime;
                    baseBlock.lengthBeat += data.beat;
                    baseBlock.lengthBeatNote += data.beat * beatRate;
                } break;
                case 'modulate':
                case 'tempo': {

                    baseBlock.viewPosWidth = viewPos - baseBlock.viewPosLeft;
                    baseCaches.push(baseBlock);
                    // console.log(baseList);

                    // インスタンスを複製
                    baseBlock = JSON.parse(JSON.stringify(baseBlock));

                    baseBlock.viewPosLeft = viewPos;
                    // console.log(viewPos);

                    baseBlock.startTime = elapsedTime;
                    // 経過時間をリセット
                    baseBlock.sustainTime = 0;

                    const divCnt = MusicTheory.getBarDivBeatCount(baseBlock.scoreBase.ts);
                    // baseBlock.startBar += Math.ceil(baseBlock.lengthBeat / divCnt);

                    baseBlock.startBeat = baseBlock.startBeat + baseBlock.lengthBeat;
                    baseBlock.startBeatNote += baseBlock.lengthBeatNote;
                    baseBlock.lengthBeat = 0;
                    baseBlock.lengthBeatNote = 0;

                    switch (el.type) {
                        case 'modulate': {
                            const data = el.data as StoreOutline.DataModulate;
                            const tonality = baseBlock.scoreBase.tonality;
                            const prevTonality: MusicTheory.Tonality = JSON.parse(JSON.stringify(tonality));

                            const updateKey12 = (val: number) => {
                                let nextKey12 = tonality.key12 + val;
                                // 負数の場合、整数になるまでオクターブ上げる
                                while (nextKey12 < 0) nextKey12 += 12;
                                tonality.key12 = nextKey12 % 12;
                            }
                            /**スケールを逆転 */
                            const invertScale = () => {
                                tonality.scale = tonality.scale === 'major' ? 'minor' : 'major';
                            }

                            // 転調
                            switch (data.method) {
                                case 'domm': {
                                    const val = data.val as number;
                                    updateKey12(val * MusicTheory.DOMMINANT_KEY_COEFFICENT);
                                } break;
                                case 'key': {
                                    const val = data.val as number;
                                    updateKey12(val);
                                } break;
                                case 'parallel': {
                                    invertScale();
                                } break;
                                case 'relative': {
                                    let val = MusicTheory.DOMMINANT_KEY_COEFFICENT * 3;
                                    if (tonality.scale === 'minor') val *= -1;
                                    updateKey12(val);
                                    invertScale();
                                } break;
                            }
                            lastModulate = {
                                prev: prevTonality,
                                next: tonality
                            };
                        } break;
                        case 'tempo': {
                            const data = el.data as StoreOutline.DataTempo;
                            let tempo = baseBlock.scoreBase.tempo;
                            const prev = tempo;

                            switch (data.method) {
                                case 'rate': {
                                    tempo = Math.floor(tempo * (data.val / 100));
                                } break;
                                case 'addition': {
                                    tempo += data.val;
                                }
                            }
                            lastTempo = {
                                prev, next: tempo
                            };

                            baseBlock.scoreBase.tempo = tempo;
                        } break;
                    }
                }
            }
            elementCaches.push(elementIndex);
        });

        // 後処理
        baseBlock.viewPosWidth = viewPos - baseBlock.viewPosLeft;
        baseCaches.push(baseBlock);

        store.cache.baseCaches = baseCaches;
        store.cache.chordCaches = chordCaches;
        store.cache.elementCaches = elementCaches;
    };

    const getChordInfoFromElementSeq = (elementSeq: number) => {
        const cache = store.cache;
        const chordSeq = cache.elementCaches[elementSeq].chordSeq;
        if (chordSeq === -1) throw new Error(`elementSeq[${elementSeq}]のchordSeqが存在しない。（コードでない要素でgetChordInfoFromElementSeqを呼び出した。）`);
        return cache.chordCaches[chordSeq];
    }

    return {
        calculate,
        getChordInfoFromElementSeq
    };
}

export default useReducerCache;