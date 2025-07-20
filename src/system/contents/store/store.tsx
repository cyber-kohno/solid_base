import { createStore } from "solid-js/store";
import Thema from "~/system/common/design/thema";

export type StoreProps = {
  sys: {
    mode: "harmonize" | "melody";
  };
  thema: Thema.Props;
};

export const [store, setStore] = createStore<StoreProps>({
  thema: {
    main: "#599",
    accent: "#999",
    sub: "#fff",
  },
  sys: {
    mode: "harmonize",
  },
});
