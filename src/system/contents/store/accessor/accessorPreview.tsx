import { StoreProps } from "../store";

const useAccessorPreview = (snapshot: StoreProps) => {

    const isPreview = () => snapshot.preview.timerKeys != null;

    return {
        isPreview
    }
}
export default useAccessorPreview;