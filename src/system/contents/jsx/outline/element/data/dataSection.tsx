import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";

const DataSection = (props: {
    data: StoreOutline.DataSection;
}) => {

    return (<>
        <_Label>{props.data.name}</_Label>
        <_Border/>
    </>);
}
export default DataSection;

const _Label = styled.div`
    ${SC.rect}
    ${SC.text({color: '#f00'})}
    text-align: center;
    width: 100%;
    height: 30px;
    /* background-color: #5c75b634; */
`;

const _Border = styled.div`
    ${SC.rect}
    width: 100%;
    height: 8px;
    background-color: red;
`;