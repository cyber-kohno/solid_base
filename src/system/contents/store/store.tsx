import { createStore } from "solid-js/store";
import Thema from "~/system/common/design/thema";
import StoreControl from "./storeControl";
import StoreData from "./data/storeData";
import StoreOutline from "./data/storeOutline";

export type StoreProps = {
  control: StoreControl.Props;
  data: StoreData.Props;
  thema: Thema.Props;
};

export const [store, setStore] = createStore<StoreProps>({
  thema: {
    main: "#599",
    accent: "#999",
    sub: "#fff",
  },
  control: {
    mode: "harmonize",
    focus: 1
  },
  data: {
    elements: StoreOutline.getInitialElements()
  }
});
