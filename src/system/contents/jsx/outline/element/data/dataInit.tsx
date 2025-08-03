import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";
import MusicTheory from "~/system/contents/util/musicTheory";

const DataInit = (props: {
    data: StoreOutline.DataInit;
}) => {

    const values = createMemo(() => {
        const data = props.data;
        const list = MusicTheory.KEY12_SHARP_LIST;
        const keyScaleName = list[data.tonality.key12] + data.tonality.scale;

        const tsName = MusicTheory.getTSName(data.ts);
        return { keyScaleName, tsName, tempo: data.tempo };
    });

    return (<_Wrap>{(() => {
        const { keyScaleName, tsName, tempo } = values();
        return (<>
            <_KeyScale>{keyScaleName}</_KeyScale>
            <_TS>{tsName}</_TS>
            <_Tempo>{tempo}</_Tempo>
        </>);
    })()}
    </_Wrap>);
}
export default DataInit;

const _Wrap = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    /* background-color: #ffffff44; */
    /* より強調された影 */
    /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6); */
    /* border: 1px solid #fff; */
    padding: 0 2px 4px 2px;
    box-sizing: border-box;
    * {   
       ${SC.rect}
        margin-top: 4px;
        width: 100%;
        background-color: #00a87e71;
        border-radius: 12px;
        color: rgb(255, 255, 255);
    }
`;

const _KeyScale = styled.div`
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
`;
const _TS = styled.div`
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
`;
const _Tempo = styled.div`
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
`;