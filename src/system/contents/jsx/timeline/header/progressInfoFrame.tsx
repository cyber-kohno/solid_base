import { css } from "@emotion/react";
import { createMemo, For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store, getSnapshot } from "~/system/contents/store/store";
import MusicTheory from "~/system/contents/util/musicTheory";

const ProgressInfoFrame = (props: {
    headerWidth: number;
}) => {
    const { snapshot } = getSnapshot();

    const formatNumber = (num: number, decimalPlaces: number) => {
        // toFixedで指定した桁数にフォーマット
        const formattedNumber = num.toFixed(decimalPlaces);

        // parseFloatを使って余分な0を削除し、フォーマットを保つ
        return parseFloat(formattedNumber).toString();
    };

    return (<_Wrap width={props.headerWidth}>
        <For each={snapshot.cache.chordCaches}>{cache => {

            const time = formatNumber(cache.startTime * 0.001, 2);
            const info = createMemo(() => {


                const sectionStart = cache.sectionStart ?? '';
                let modulate = '';
                if (cache.modulate) {
                    const prev = MusicTheory.getScaleName(cache.modulate.prev);
                    const next = MusicTheory.getScaleName(cache.modulate.next);
                    modulate = `${prev}→${next}`;
                }
                let tempo = '';
                if (cache.tempo) tempo = `${cache.tempo.prev}→${cache.tempo.next}`;

                return <>
                    <_Start>{sectionStart}</_Start>
                    <_Modulate>{modulate}</_Modulate>
                    <_Tempo>{tempo}</_Tempo>
                </>
            });
            return <_Item
                left={cache.viewPosLeft}
                width={cache.viewPosWidth}
            >
                <_Time>{time}s</_Time>
                <_Info>{info()}</_Info>
            </_Item>
        }}</For>
    </_Wrap>);
};
export default ProgressInfoFrame;


const _Wrap = styled.div<{
    width: number;
}>`
    ${SC.rect}
    background-color: #4d625d;
    min-width: 100%;
    width: ${props => props.width}px;
    height: ${Layout.timelineHeader.INFO_HEIGHT.toString()}px;
`;

const _Item = styled.div<{
    left: number;
    width: number;
}>`
    display: inline-block;
    position: absolute;
    z-index: 1;
    background-color: #ffffff22;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: 100%;
    overflow-x: hidden;
`;

const inner = css`
    ${SC.rect}
    width: 100%;
    height: 50%;
    ${SC.text({ fontSize: 18, lineHeight: 22 })}
`.styles;

const _Time = styled.div`
    ${inner}
    color: #ffffff;
`;
const _Info = styled.div`
    ${inner}
`;
const _Start = styled.span`
    color: #44f6ff;
`;
const _Modulate = styled.span`
    color: #ffe944;
    background-color: #ffffff4f;
`;
const _Tempo = styled.span`
    color: #44ff70;
    background-color: #ffffff4f;
`;