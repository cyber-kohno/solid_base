import MidiWriter from 'midi-writer-js';
import pako from 'pako';
import StoreOutline from '../store/data/storeOutline';
import { store } from '../store/store';
import useReducerCache from '../store/reducer/reducerCache';
import StoreMelody from '../store/data/storeMelody';

namespace FileUtil {

    export const downloadMidi = (fileName: string) => {
        // Start with a new track
        const track = new MidiWriter.Track();

        // Define an instrument (optional):
        track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

        const initData: StoreOutline.DataInit = store.cache.elementCaches[0].data;
        track.addEvent(new MidiWriter.TempoEvent({ bpm: initData.tempo }));

        // const timeline = store.timeline;
        // const layer = timeline.layers[timeline.layerIndex] as TimelineStore.MelodyLayerNotes;

        // let lastTail: TimelineStore.Pos = {
        //     pos: 0,
        //     norm: { div: 4, tuplets: 1 }
        // }
        // layer.notes.forEach(n => {
        //     let note: TimelineStore.Note = JSON.parse(JSON.stringify(n));
        //     const criteriaNorm = TimelineStore.getSmallerNorm(lastTail.norm, note.norm);
        //     if (criteriaNorm != null) {
        //         lastTail = TimelineStore.getChangedNorm(lastTail, criteriaNorm);
        //         note = TimelineStore.getChangedNorm(note, criteriaNorm) as TimelineStore.Note;
        //     }
        //     const diffLen = Math.abs(lastTail.pos - note.pos);
        //     // console.log(diffLen);
        //     let wait = 'T0';
        //     // 休符の挿入
        //     if (diffLen > 0) {

        //         wait = `T${128 * 4 / note.norm.div * diffLen}`;
        //         lastTail.pos += diffLen;
        //     }
        //     const pitch = getKey12FullName(note.pitch);

        //     const duration = `T${128 * 4 / note.norm.div * note.len}`;
        //     track.addEvent(new MidiWriter.NoteEvent({ pitch, duration, wait }));
        //     lastTail.pos += note.len;
        // });

        // Generate a data URI
        const writer = new MidiWriter.Writer(track);
        // console.log(write.dataUri());
        const link = document.createElement('a');
        link.href = writer.dataUri();
        link.download = `${fileName}.mid`;
        link.click();
    }

    
    export interface SaveBase {
        update: () => void;
        successCallback?: () => void;
        failCallback?: () => void;
    }
    export interface SaveFile extends SaveBase {
        plainData: string;
        extension: string;
    }

    export const saveScoreFile = (props: SaveBase) => {
        const saveFileStr = getSaveFile();
        FileUtil.saveFile({ ...props, plainData: saveFileStr, extension: 'rcv1' });
    }
    export const saveFile = (props: SaveFile) => {
        let fileHandle = store.fileHandle.score;

        const options: SaveFilePickerOptions = {
            types: [
                {
                    accept: {
                        'text/plain': [`.${props.extension}`],
                    },
                },
            ],
        };

        if (fileHandle) {
            (async () => {
                //ファイルへ書き込むための FileSystemWritableFileStream を作成
                const writable = await fileHandle.createWritable();
                //テキストデータの書き込み
                const text = gZip(props.plainData);
                await writable.write(text);
                //ファイルを閉じる
                await writable.close();

                if (props.successCallback != undefined) props.successCallback();
                props.update();
            })();
        } else {
            window.showSaveFilePicker(options).then((handle) => {
                (async () => {
                    //ファイルへ書き込むための FileSystemWritableFileStream を作成
                    const writable = await handle.createWritable();
                    //テキストデータの書き込み
                    const text = gZip(props.plainData);
                    await writable.write(text);
                    //ファイルを閉じる
                    await writable.close();
                    store.fileHandle.score = handle;

                    if (props.successCallback != undefined) props.successCallback();
                    props.update();
                })();
            }).catch((e) => {
                console.log(e);
                console.log('キャンセルされました');
                if (props.failCallback != undefined) props.failCallback();
            });
        }
    }

    const getSaveFile = (): string => {
        return JSON.stringify(store.data);
    }

    export const loadScoreFile = (update: () => void) => {
        const options: SaveFilePickerOptions = {
            types: [
                {
                    accept: {
                        // 'text/plain': [`.${props.extension}`],
                        'text/plain': [`.rcv1`],
                    },
                },
            ],
        };
        (async () => {
            const [fileHandle] = await window.showOpenFilePicker(options);
            const file = await fileHandle.getFile();
            const fileContents = await file.text();
            store.fileHandle = fileHandle;
            const text = unZip(fileContents);
            store.data = JSON.parse(text);

            useReducerCache().calculate();
            update();
        })();
    }


    /**
     * 文字列を圧縮する
     * @param baseStr 圧縮前の文字列
     * @returns 圧縮後の文字列
     */
    export const gZip = (baseStr: string) => {
        const encoder = new TextEncoder(); // 文字列をUint8Arrayにエンコードするために使用
        const textUint8Array = encoder.encode(baseStr);

        // gzip圧縮
        const compressed = pako.gzip(textUint8Array);// Uint8Array を Base64 文字列に変換
        const compressedBase64 = uint8ArrayToBase64(compressed);
        return compressedBase64;
    }
    // Uint8Array を Base64 にエンコードするヘルパー関数
    const uint8ArrayToBase64 = (buffer: Uint8Array) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    /**
     * 圧縮された文字列を複号する
     * @param baseStr 圧縮された文字列
     * @returns 複号後の文字列
     */
    export const unZip = (baseStr: string) => {
        // Base64 文字列を Uint8Array に戻す
        const compressedFromBase64 = Uint8Array.from(atob(baseStr), c => c.charCodeAt(0));
        return pako.inflate(compressedFromBase64, { to: 'string' });
    }

    
    export const loadMp3 = (layer: StoreMelody.AudioTrack) => {
        (async () => {
            // ファイルピッカーでMP3ファイルを選択
            const options: OpenFilePickerOptions = {
                types: [
                    {
                        description: 'MP3 Files',
                        accept: {
                            'audio/mp3': ['.mp3'],
                            'audio/mpeg': ['.mp3'], // 'audio/mpeg' も追加しても問題ありません
                        },
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
            };
            try {
                const [fileHandle] = await window.showOpenFilePicker(options);
                const file = await fileHandle.getFile();
                layer.fileName = file.name;
                // ファイルをArrayBufferとして読み込む
                const arrayBuffer = await file.arrayBuffer();

                // ArrayBufferをBase64にエンコード
                const base64String = arrayBufferToBase64(arrayBuffer);
                layer.source = base64String;

            } catch (error) {
                console.error('ファイルの読み込みエラー:', error);
            }
        })();
    }

    const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    export const base64ToBlob = (base64: string, type: string) => {
        const byteString = atob(base64);
        const arrayBuffer = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type });
    }
};
export default FileUtil;