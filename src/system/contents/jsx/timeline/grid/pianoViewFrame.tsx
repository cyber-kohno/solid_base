import { createEffect } from "solid-js";
import PianoViewUtil from "../../common/pianoViewUtil";

const PianoViewFrame = (props: {
    uiParam: PianoViewUtil.UIParam;
    uses: number[];
    scaleList: number[];
}) => {
    let canvasRef: HTMLCanvasElement | null = null;

    createEffect(() => {
        if (canvasRef != null) {
            const { scaleList, uses, uiParam } = props;
            PianoViewUtil.updateCanvasRef({
                canvasRef,
                scaleList,
                uses,
                uiParam,
            });
        }
    });

    return (
        <canvas
            ref={ref => canvasRef = ref}
            width={props.uiParam.width}
            height={props.uiParam.height}
        />
    );
};
export default PianoViewFrame;