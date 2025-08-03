import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";

const DataModulate = (props: {
    data: StoreOutline.DataModulate;
}) => {

    return (<_Wrap>
        <_Method>{props.data.method}</_Method>
        <_Val>{props.data.val}</_Val>
        <_Change></_Change>
    </_Wrap>);
}
export default DataModulate;

const _Wrap = styled.div`
    ${SC.rect}
    width: 100%;
    border: 2px solid #ffea8b;
    box-sizing: border-box;
    border-radius: 18px;
    background-color: #00ccff4b;
`;


const _Method = styled.div`
    /* background-color: #001c1c7a; */
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: rgb(239, 255, 236);
`;

const _Val = styled.div`
    display: inline-block;
    position: relative;
    /* background-color: #001c1c7a; */
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: rgb(239, 255, 236);
`;

const _Change = styled.div`
    display: inline-block;
    position: relative;
    /* background-color: #7a8aa07a; */
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: rgb(255, 250, 149);
`;