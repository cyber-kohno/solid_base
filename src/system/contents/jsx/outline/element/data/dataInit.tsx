import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";

const DataInit = (props: {
    data: StoreOutline.DataInit;
}) => {

    return (<>
        <_TonalityDiv></_TonalityDiv>
        <_TempoDiv></_TempoDiv>
    </>);
}
export default DataInit;

const _TonalityDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 50px;
    background-color: aliceblue;

`;
const _TempoDiv = styled.div`
    ${SC.rect}
    width: 100%;
    height: 40px;
    background-color: #82a6c5;
    
`;