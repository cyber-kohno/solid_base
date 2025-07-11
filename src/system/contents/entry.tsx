import { styled } from "solid-styled-components";
import { createStore } from "solid-js/store";
import StoreRoot from "./store/storeRoot";
import Thema from "~/system/common/design/thema";

namespace Entry {

    export const Component = () => {

        const [store, setStore] = createStore<StoreRoot.Props>(StoreRoot.getInitialStore());

        const thema = store.thema as Thema.Props;
        return (
            <_Wrap thema={thema}></_Wrap>
        );
    }
}

export default Entry;

const _Wrap = styled('div') <{
    thema: Thema.Props;
}>`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  background-color: ${props => props.thema.main};
`;