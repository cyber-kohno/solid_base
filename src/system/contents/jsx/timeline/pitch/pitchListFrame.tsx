import { createMemo, For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import { store } from "~/system/contents/store/store";
import MusicTheory from "~/system/contents/util/musicTheory";

const PitchListFrame = () => {

    const pitchNames = createMemo(() => {
        return [...Array(Layout.pitch.NUM).keys()]
            .map(v => MusicTheory.getPitchKey(v)
                .reverse().join(""))
            // 音程は低い順に下から並べる
            .reverse();
    });
    return (<_Wrap ref={ref => store.ref.pitch = () => ref}>
        <For each={pitchNames()}>
            {pitch => <_Item>{pitch}</_Item>}
        </For>
    </_Wrap>);
};

export default PitchListFrame;


const _Wrap = styled.div`
    ${SC.rect}
    background-color: #16c450;
    width: ${Layout.timeline.PITCH_WIDTH.toString()}px;
    height: 100%;
    overflow: hidden;
`;
const _Item = styled.div`
    ${SC.rect}
    ${SC.text({ color: '#fafaffb2' })}
    background-color: #82c0cf;
    width: 100%;
    height: 30px;
    border: 1px solid #00000063;
    box-sizing: border-box;
    padding: 0 0 0 2px;
`;