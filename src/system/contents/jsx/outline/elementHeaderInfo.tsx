import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "../../const/layout";
import { createMemo } from "solid-js";
import { getSnapshot } from "../../store/store";
import useAccessorCache from "../../store/accessor/accessorCache";
import MusicTheory from "../../util/musicTheory";

const ElementHeaderInfo = () => {

    const { snapshot } = getSnapshot();

    const accessorCache = useAccessorCache(snapshot);

    const scoreBase = createMemo(() => {
        return accessorCache.getCurBase().scoreBase;
    });

    return (<_Wrap>
        <_Record>
            <_Title>Scale</_Title>
            <_Value>{MusicTheory.getScaleName(scoreBase().tonality)}</_Value>
        </_Record>
        <_Record>
            <_Title>Tempo</_Title>
            <_Value>{scoreBase().tempo}</_Value>
        </_Record>
        <_Record>
            <_Title>TS</_Title>
            <_Value>{MusicTheory.getTSName(scoreBase().ts)}</_Value>
        </_Record>
        <_Record></_Record>
    </_Wrap>);
};
export default ElementHeaderInfo;

const layout = Layout.outline;
const _Wrap = styled.div`
    ${SC.rect}
    width: 100%;
    height: ${layout.HEADER_HEIGHT.toString()}px;
    background-color: #456b7b;
`;

const _Record = styled.div`
    ${SC.rect}
    margin: 2px 0 0 0;
    background-color: rgba(211, 224, 252, 0.298);
    width: 100%;
    height: 20px;
    
    * {
        display: inline-block;
        font-size: 15px;
        font-weight: 600;
        line-height: 20px;
        height: 100%;
        vertical-align: top;
        padding: 0 0 0 4px;
        box-sizing: border-box;
    }
`;


const _Title = styled.div`
   width: 80px;
   background-color: rgba(127, 255, 212, 0.182);
   color: rgba(255, 255, 255, 0.497);
   font-style: italic;
`;

const _Value = styled.div`
   width: calc(100% - 80px);
   color: rgba(243, 239, 178, 0.928);
   font-style: italic;
   overflow: hidden;
`;
