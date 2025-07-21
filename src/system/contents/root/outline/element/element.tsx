import { style } from "solid-js/web";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import StoreOutline from "~/system/contents/store/data/storeOutline";

const Element = (props: {
    element: StoreOutline.Element;
})=> {

    return (<_Item></_Item>);
}
export default Element;

const _Item = styled.div`
    ${SC.rect}
    background-color: #f00;
    width: 180px;
    height: 60px;
    margin: 2px 0 0 4px;
    border: 1px solid #000;
`;