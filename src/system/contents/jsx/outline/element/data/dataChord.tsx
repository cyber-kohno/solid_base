import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";

const DataChord = (props: {
    data: StoreOutline.DataChord;
}) => {

    return (<>
        <SeqDiv>{1}</SeqDiv>
        <_TipDiv></_TipDiv>
        <_DegreeDiv></_DegreeDiv>
        <_ChordDiv></_ChordDiv>
    </>);
}
export default DataChord;

const SeqDiv = styled.div`
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

const _BeatTip = styled.div`
    display: inline-block;
    position: relative;
    /* width: 12px; */
    height: calc(100% - 4px);
    margin: 2px 2px 0 2px;
    background-color: #cec1cbbc;
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
    color: #ccc;
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