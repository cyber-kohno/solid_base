import { createMemo, For, Show } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";
import StoreCache from "~/system/contents/store/manage/storeCache";
import { getSnapshot } from "~/system/contents/store/store";
import MusicTheory from "~/system/contents/util/musicTheory";

const TIP_BASE_WIDTH = 12;

const DataChord = (props: {
    data: StoreOutline.DataChord;
    cache: StoreCache.ChordCache;
}) => {
    const { snapshot } = getSnapshot();

    const chordSeq = createMemo(() => snapshot.cache.chordCaches
        .findIndex(c => c.elementSeq == props.cache.elementSeq));

    const beatTips = createMemo((): number[] => {
        const chordInfo = props.cache;
        const eatHead = -chordInfo.beat.eatHead;
        const eatTail = chordInfo.beat.eatTail;
        const beat = chordInfo.beat.num;

        const tips = Array.from({ length: beat }, () => 0);

        if (eatHead != 0) {
            tips[0] = eatHead;
        }
        if (eatTail != 0) {
            tips[tips.length - 1] = eatTail;
        }
        // console.log(`${props.cache.elementSeq}, tip:[${tips.length}]`);
        return tips;
    });

    const degreeName = createMemo(() => {
        const degree = props.data.degree;
        let degreeName = "-";
        if (degree != undefined) {
            degreeName = MusicTheory.getDegreeKeyName(degree) + degree.symbol;
            if (degree.on != undefined) {
                degreeName += ` / ${MusicTheory.getDegreeKeyName(degree.on)}`;
            }
        }
        return degreeName;
    });

    const chordName = createMemo(() => {
        const compiledChord = props.cache.compiledChord;
        if (compiledChord == undefined) return null;
        return MusicTheory.getKeyChordName(compiledChord.chord);
    });

    return (<_Wrap>
        <_SeqDiv>{chordSeq()}</_SeqDiv>
        <_TipDiv>
            <For each={beatTips()}>{tip => {

                return <_BeatTip width={TIP_BASE_WIDTH + tip * 3} />;
            }}</For>
        </_TipDiv>
        <_DegreeDiv>{degreeName()}</_DegreeDiv>
        <Show when={chordName()}>
            <_ChordDiv>{chordName()}  </_ChordDiv>
        </Show>
    </_Wrap>);
}
export default DataChord;

const _Wrap = styled.div`
    ${SC.rect}
    width: 100%;
    height: 100%;
    background-color: #acd3d2;
    border: solid 1px #2e6d77;
    box-sizing: border-box;
    border-radius: 4px;
`;
const _SeqDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 15px;
    text-align: left;
    padding: 0 0 0 4px;
    box-sizing: border-box;

    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.699);
    line-height: 15px;

`;
const _TipDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 20px;
    text-align: center;
`;

const _BeatTip = styled.div<{
    width: number;
}>`
    display: inline-block;
    position: relative;
    width: ${props => props.width}px;
    height: calc(100% - 4px);
    margin: 2px 2px 0 2px;
    background-color: ${props => (() => {
        if (props.width === TIP_BASE_WIDTH) return '#cec1cbbc';
        else if (props.width < TIP_BASE_WIDTH) return '#2d22ffbb';
        if (props.width > TIP_BASE_WIDTH) return '#dc0030bb';
    })()};
    border: 1px solid #0000005d;
    border-radius: 2px;
    box-sizing: border-box;
`;

const _DegreeDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: #d4e3e5;
`;
const _ChordDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.639);
`;