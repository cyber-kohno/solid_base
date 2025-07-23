import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";

const DataChord = () => {

    return (<>
        <_TonalityDiv></_TonalityDiv>
        <_TempoDiv></_TempoDiv>
    </>);
}
export default DataChord;

const _TonalityDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 50px;
    background-color: #91cea3;

`;
const _TempoDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 40px;
    background-color: #82a6c5;
`;