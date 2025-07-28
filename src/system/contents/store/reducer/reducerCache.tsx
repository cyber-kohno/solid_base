import MusicTheory from "../../util/musicTheory";
import StoreOutline from "../data/storeOutline";
import StoreCache from "../manage/storeCache";
import { setStore, store, StoreProps } from "../store";

namespace ReducerRoot {

    export const compileElements = () => {
        const elements = store.data.elements;

        const baseList: StoreCache.BaseBlock[] = [];
        const elementIndexes: StoreCache.ElementIndex[] = [];
        const chordIndexes: StoreCache.ChordIndex[] = [];

        const initialScoreBase: StoreOutline.DataInit = elements[0].data;

        let baseBlock: StoreCache.BaseBlock = {
            startTime: 0,
            sustainTime: 0,
            startBeat: 0,
            startBeatNote: 0,
            lengthBeat: 0,
            lengthBeatNote: 0,
            viewPosLeft: 0,
            viewPosRight: 0,
            chordBlocks: [],
            scoreBase: JSON.parse(JSON.stringify(initialScoreBase))
        }

        let startBeat = 0;
        let startBeatNote = 0;
        let elapsedTime = 0;
        let lastSectionName = '';
        let sectionStart: string | undefined = undefined;
        let prevEat = 0;

        let prevStartBeat = 0;
        let lastChordSeq = -1;

        let viewPos = 0;

        elements.forEach((el, i) => {
            let beatSize = 0;

            switch (el.type) {
                case 'section': {
                    const data = el.data as StoreOutline.DataSection;
                    if (lastSectionName !== data.name) {
                        lastSectionName = sectionStart = data.name;
                    }
                } break;
                case 'chord': {

                    lastChordSeq++;

                    const data = el.data as StoreOutline.DataChord;
                    let chord: MusicTheory.KeyChordProps | undefined = undefined;
                    let structs: undefined | MusicTheory.StructProps[] = undefined;

                    if (data.degree != undefined) {
                        const tonality = baseBlock.scoreBase.tonality;
                        chord = MusicTheory.getKeyChordFromDegree(tonality, data.degree);
                        const symbol = MusicTheory.getSymbolProps(chord.symbol);
                        structs = symbol.structs.map(s => {
                            if (chord == undefined) throw new Error('chordはundefinedであってはならない。');
                            const interval = MusicTheory.getIntervalFromRelation(s);

                            return {
                                key12: (chord.key12 + interval) % 12,
                                relation: s
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
                    }
                    const item: StoreOutline.KeyChord = {
                        beat: data.beat,
                        eat: data.eat,
                        chord,
                        structs
                    };

                    /**
                     * 小節跨ぎを判定する
                     * @returns 
                     */
                    const judgeStraddle = () => {
                        /** ベース上での経過拍数 */
                        const baseOnBeat = startBeat - baseBlock.startBeat;
                        const divCnt = MusicTheory.getBarDivBeatCount(baseBlock.scoreBase.ts);
                        const curBar = Math.floor(baseOnBeat / divCnt);
                        const nextBar = Math.floor((baseOnBeat + item.beat) / divCnt);
                        // 同じ小説に収まっている
                        const isSameBar = curBar === nextBar;
                        // 次の小節の頭に揃っている
                        const isNextFit = (nextBar - curBar === 1 && (baseOnBeat + item.beat) % divCnt === 0);
                        return !(isSameBar || isNextFit);
                    };

                    const beatDiv16Cnt = MusicTheory.getBeatDiv16Count(baseBlock.scoreBase.ts);
                    const beatRate = beatDiv16Cnt / 4;
                    beatSize = (data.beat + (prevEat * -1 + data.eat) / beatDiv16Cnt) * beatRate;

                    const beatNote = data.beat * beatRate;

                    const viewPosLeft = viewPos;
                    const viewPosWidth = beatSize * store.env.beatWidth;
                    viewPos += viewPosWidth;

                    const sustainTime = (60000 / baseBlock.scoreBase.tempo) * (data.beat + (-prevEat + data.eat) / 4);

                } break;
            }
        });

        setStore('cache', 'baseBlocks', baseList);
    };
}

export default ReducerRoot;