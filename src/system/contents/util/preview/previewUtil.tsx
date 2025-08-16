import useAccessorMelody from "../../store/accessor/accessorMelody";
import StoreMelody from "../../store/data/storeMelody";
import StorePreview from "../../store/manage/storePreview";
import { store } from "../../store/store";
import FileUtil from "../fileUtil";
import MusicTheory from "../musicTheory"; import SoundFont, { instrument, type InstrumentName } from 'soundfont-player';

namespace PreviewUtil {

    export type NotePlayer = {
        pitchName: string;
        gain: number;
        startMs: number;
        sustainMs: number;
    };
    export type TrackPlayer = {
        sf: SoundFont.Player;
        notes: NotePlayer[];
    };

    export type LayerTargetMode = 'tl-layer-all' | 'tl-focus-layer' | 'ol-layer-all' | 'ol-focus-layer' | 'all';
    export type Option = {
        target: LayerTargetMode;
    }


    export const startTest = (option: Option) => {
        const { outline, melody } = store.control;
        const { chordCaches, elementCaches } = store.cache;
        const { elements, tracks } = store.data;
        const preview = store.preview;

        const { getCurrScoreTrack } = useAccessorMelody(store);

        const containsLayer = (...targets: LayerTargetMode[]) => {
            return targets.includes(option.target);
        }

        let elementSeq = outline.focus;
        const isChordElement = () => {
            return elementCaches[elementSeq].type === 'chord';
        }
        // コード要素でない場合、次のコード要素まで進める
        while (!isChordElement() && elementSeq < elementCaches.length - 1) {
            elementSeq++;
        }

        // 最後まで走査してもコード要素が見つからなかった場合は再生しない。
        if (!isChordElement()) return;

        const [outlineStart, timelineStart] = (() => {
            switch (store.control.mode) {
                case 'harmonize': {
                    const curChord = chordCaches[elementCaches[elementSeq].chordSeq];
                    const startBeat = curChord.startBeat;
                    const startBeatNote = curChord.startBeatNote;
                    return [startBeat, startBeatNote];
                }
                case 'melody': {
                    const note = melody.focus === -1 ? melody.cursor : getCurrScoreTrack().notes[melody.focus];
                    const timelineLeft = StoreMelody.calcBeat(note.norm, note.pos);
                    const curChord = chordCaches[elementCaches[elementSeq].chordSeq];
                    return [curChord.startBeat, timelineLeft];
                }
            }
        })();

        const trackPlayList: TrackPlayer[] = [];

        // メロディのノートを収集
        if (!containsLayer('ol-focus-layer', 'ol-layer-all')) {
            tracks.forEach((track, i) => {
                if (option.target === 'tl-focus-layer') {
                    if (melody.trackIndex !== i) return 1;
                }
                // ミュートの場合コンティニュー
                if (track.isMute) return 1;

                if (track.method === 'score') {
                    const trackScore = track as StoreMelody.ScoreTrack;

                    // 音源未設定の場合コンティニュー
                    const sfName = trackScore.soundFont;

                    if (sfName === '') return 1;

                    const sf = preview.sfItems.find(sf => sf.instrumentName === sfName);

                    if (sf == undefined || sf.player == undefined) return 1;

                    const notes: NotePlayer[] = [];
                    trackPlayList.push({
                        sf: sf.player, notes
                    });
                    // ノート情報の追加
                    trackScore.notes.forEach(note => {
                        const playInfo = buildNotePlayer(timelineStart, note, track.volume);
                        if (playInfo == null) return 1;
                        notes.push(playInfo);
                    });
                } else if (track.method === 'audio') {
                    const layerAudio = track as StoreMelody.AudioTrack;
                    // 音源未設定の場合コンティニュー
                    if (layerAudio.source === '') return 1;

                    // console.log(layerAudio.source);
                    const blob = FileUtil.base64ToBlob(layerAudio.source, 'audio/mp3')
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);

                    preview.audios.push({
                        element: audio,
                        referIndex: i
                    });
                }

            });
        }

        preview.timerKeys = [];
        preview.intervalKeys = [];

        const getTimerKeys = () => preview.timerKeys as NodeJS.Timeout[];
        const getIntervalKeys = () => preview.intervalKeys as NodeJS.Timeout[];

        // 開始の拍から時間を取得
        const startTime = getTimeFromPosBeat(timelineStart);

        const endTime = (() => {
            const tailChordCache = chordCaches[chordCaches.length - 1];

            if (chordCaches == undefined) return 0;

            return tailChordCache.startTime + tailChordCache.sustainTime;
        })();

        // 収集したノーツの音を再生
        trackPlayList.forEach(tp => {
            tp.notes.forEach(np => {
                const startMs = np.startMs;
                // console.log(`pitch:${np.pitchName}, ms:${np.startMs}, sus:${np.sustainMs}`);
                const key = setTimeout(() => {
                    // ミリ秒をサウンドフォントの時間基準（秒）に合わせる
                    const susSec = np.sustainMs / 1000;
                    tp.sf.play(np.pitchName, 0, { gain: np.gain, duration: susSec });
                }, startMs);
                getTimerKeys().push(key);

                // const tail = startMs + np.sustainMs;
                // if (endTime < tail) endTime = tail;
            });
        });
        // console.log(getTimerKeys());

        // プレビューを自動停止する終端の時間（ミリ秒）
        const autoStopTime = endTime - startTime;

        preview.progressTime = startTime;


        preview.lastTime = Date.now();

        const intervalKey = setInterval(() => {
            const nowTime = Date.now();
            // console.log(nowTime);
            preview.progressTime += (nowTime - preview.lastTime);
            // console.log(cache.progressTime);
            preview.lastTime = nowTime;

            const posBeat = getPosBeatFromTime(preview.progressTime);
            // console.log(`posBeat: ${posBeat}`);
            preview.linePos = posBeat;

        }, 50); // 50ミリ秒ごとに画面を更新

        getIntervalKeys().push(intervalKey);

        // 全てのノートを再生し終えたら止める
        const endKey = setTimeout(() => {
            stopTest();
        }, autoStopTime);
        preview.timerKeys.push(endKey);
    }

    const getTimeFromPosBeat = (left: number) => {

        let time = 0;
        store.cache.baseCaches.some(base => {
            const beatDiv16Cnt = MusicTheory.getBeatDiv16Count(base.scoreBase.ts);
            const beatRate = beatDiv16Cnt / 4;
            let tempo = base.scoreBase.tempo * beatRate;

            const start = base.startBeatNote;
            const end = start + base.lengthBeatNote;
            if (left < end) {
                time += (60000 / tempo) * (left - start);
                return 1;
            }
            time += (60000 / tempo) * base.lengthBeatNote;
        });
        return time;
    }

    /**
     * 経過時間から拍ポジションを取得して返す。
     * @param time 経過時間
     * @returns 拍ポジション
     */
    const getPosBeatFromTime = (time: number) => {

        let beat = 0;
        store.cache.baseCaches.some(base => {
            const beatDiv16Cnt = MusicTheory.getBeatDiv16Count(base.scoreBase.ts);
            const beatRate = beatDiv16Cnt / 4;
            let tempo = base.scoreBase.tempo * beatRate;

            const start = base.startTime;
            const end = start + base.sustainTime;
            // console.log(`start:${Math.floor(start)}, end:${Math.floor(end)}`);
            // ブロック内に収まっていれば、ブロック内の経過時間＊テンポを加算
            if (time < end) {

                beat += ((time - start) / 60000) * tempo;
                return 1;
            }
            // ブロックを超えていた場合、ブロック範囲の時間＊テンポを加算して次のブロックへ
            beat += (base.sustainTime / 60000) * tempo;
        });
        // console.log(`----------------time:${Math.floor(time)}`);
        return beat;
    }


    /**
     * 鳴らすノーツの情報を返す。
     * @param currentLeft 
     * @param note 
     * @returns 
     */
    export const buildNotePlayer = (currentLeft: number, note: StoreMelody.Note, velocity: number): NotePlayer | null => {

        const side = StoreMelody.calcBeatSide(note);
        const [left, right] = [side.pos, side.pos + side.len];
        // console.log(`noteLeft: ${noteLeft}, currentLet: ${currentLet}`);
        // プレビュー開始位置より前のノーツは除外する
        if (left < currentLeft) return null;

        /** 開始時間（ミリ秒） */
        let startMs = 0;
        const getTime = (len: number, tempo: number) => {
            return 60000 / tempo * len;
        }
        const addStart = (len: number, tempo: number) => {
            startMs += getTime(len, tempo);
        }
        /** 持続時間（ミリ秒） */
        let sustainMs = 0;

        // ベースリストを走査する
        // console.log(cache.baseBlocks);
        const baseCaches = store.cache.baseCaches;
        baseCaches.some(base => {
            /** ベースの終端 */
            const end = base.startBeatNote + base.lengthBeatNote;
            const beatDiv16Cnt = MusicTheory.getBeatDiv16Count(base.scoreBase.ts);
            const beatRate = beatDiv16Cnt / 4;
            const tempo = base.scoreBase.tempo * beatRate;

            // ベース範囲内のノーツである場合
            if (left < end) {

                // ベースのルールで持続時間を確定
                sustainMs = getTime(right - left, tempo);

                // ベースの開始からノーツまでの長さを加算
                addStart(left - base.startBeatNote, tempo);

                // ノーツ以降のベースは走査する必要がないためブレイク
                return 1;
            }

            // ベース終端以降のノーツである場合、ベースの持続時間を加算する
            // const start = currentLet + base.startBeatNote;
            // addStart(side.left - start, tempo);
            addStart(base.lengthBeatNote, tempo);
        });

        // プレビュー開始位置の考慮を、演奏開始時間に反映させる
        baseCaches.some(base => {
            /** ベースの終端 */
            const end = base.startBeatNote + base.lengthBeatNote;
            const beatDiv16Cnt = MusicTheory.getBeatDiv16Count(base.scoreBase.ts);
            const beatRate = beatDiv16Cnt / 4;
            const tempo = base.scoreBase.tempo * beatRate;

            // ベース範囲内の開始位置である場合
            if (currentLeft < end) {

                // ベースの開始からノーツまでの長さを加算
                addStart(-(currentLeft - base.startBeatNote), tempo);

                // ノーツ以降のベースは走査する必要がないためブレイク
                return 1;
            }

            // ベース終端以降のノーツである場合、ベースの持続時間を加算する
            addStart(-base.lengthBeatNote, tempo);
        });

        const pitchName = MusicTheory.getKey12FullName(note.pitch);
        const gain = 5 * (velocity / 10);
        return {
            startMs,
            gain,
            sustainMs,
            pitchName
        }
    }

    export const stopTest = () => {
        const preview = store.preview;
        if (preview.timerKeys == null) throw new Error('cache.timerKeysがnullであってはならない。');
        preview.timerKeys.forEach(key => {
            // console.log(`clear: [${key}]`);
            clearTimeout(key);
        });
        preview.timerKeys = null;
        if (preview.intervalKeys != null) {
            preview.intervalKeys.forEach(key => {
                // console.log(`clear: [${key}]`);
                clearInterval(key);
            });
            preview.intervalKeys = null;
        }
        preview.linePos = -1;
        preview.sfItems.forEach(sf => {
            if (sf.player) sf.player.stop();
        });

        preview.audios.forEach(audio => audio.element.pause());
        preview.audios.length = 0;
    }
};
export default PreviewUtil;