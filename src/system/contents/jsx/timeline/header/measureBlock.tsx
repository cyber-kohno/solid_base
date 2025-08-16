import { snapshot } from "node:test";
import { createMemo, For, Show } from "solid-js";
import { styled } from "solid-styled-components";
import StoreCache from "~/system/contents/store/manage/storeCache";
import { getSnapshot } from "~/system/contents/store/store";
import MusicTheory from "~/system/contents/util/musicTheory";

const MeasureBlock = (props: {
    base: StoreCache.BaseCache
}) => {
    const { snapshot } = getSnapshot();

    const beatDiv16Count = createMemo(() => MusicTheory.getBarDivBeatCount(props.base.scoreBase.ts));

    const list = createMemo(() => {
        const list: {
            x: number;
            width: number;
            height: number;
            bar?: number;
        }[] = [];
        const barDivBeatCnt = MusicTheory.getBeatDiv16Count(props.base.scoreBase.ts);
        const beatDiv16Cnt = beatDiv16Count();
        const barDiv16Cnt = barDivBeatCnt * beatDiv16Cnt;
        const beatWidth = snapshot.env.beatWidth;

        const num = props.base.lengthBeat * beatDiv16Cnt;
        for (let i = 0; i < num; i++) {
            let bar = -1;
            const x = (beatWidth / beatDiv16Cnt) * i;
            let width = 1;
            let height = 10;
            if (i % barDiv16Cnt === 0) {
                width = 4;
                height = 20;
                bar = props.base.startBar + Math.floor(i / barDiv16Cnt);
            } else if (i % beatDiv16Cnt === 0) {
                width = 2;
                height = 18;
            } else if (i % 2 === 0) {
                width = 2;
                height = 13;
            }
            list.push({ x, width, height, bar });
        }
        return list;
    });


    const beatWidth = createMemo(() => snapshot.env.beatWidth * (beatDiv16Count() / 4));

    return (<_Wrap
        left={props.base.startBeat * beatWidth()}
        width={props.base.lengthBeat * beatWidth()}
    >
        <For each={list()}>{memori => {

            // const isBar = createMemo(() => memori.bar !== -1);
            const isBar = memori.bar !== -1;
            return (
                <_Memori
                    left={memori.x}
                    width={memori.width}
                    height={memori.height}
                    isBar={isBar}
                >
                    <Show when={isBar}>
                        <_Bar>{memori.bar}</_Bar>
                    </Show>
                </_Memori>
            );
        }}</For>
    </_Wrap >);
};
export default MeasureBlock;


const _Wrap = styled.div<{
    left: number;
    width: number;
}>`
    display: inline-block;
    position: absolute;
    top: 0;
    height: 100%;
    /* background-color: rgb(166, 170, 198); */
    /* background: linear-gradient(to bottom, #ebebeb, rgb(145, 152, 185)); */
    background: linear-gradient(to bottom, #0e3465, rgb(0, 0, 0));
`;

const _Memori = styled.div<{
    left: number;
    width: number;
    height: number;
    isBar: boolean;
}>`
    display: inline-block;
    position: absolute;
    top: 0;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: ${props => !props.isBar ? 'rgb(170, 184, 198)' : 'rgb(255, 98, 98)'};
`;

const _Bar = styled.div`
    display: inline-block;
    position: absolute;
    font-size: 18px;
    font-weight: 600;
    left: -22px;
    top: 16px;
    color: rgb(255, 98, 98);
    /* background-color: rgba(46, 123, 190, 0.198); */
    width: 50px;
    text-align: center;
`;