import { style } from "solid-js/web";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import { store, getSnapshot } from "../../store/store";
import { createMemo } from "solid-js";
import useAccessorCache from "../../store/accessor/accessorCache";

namespace MarginBlock {

    export const Block = () => {
        const { snapshot } = getSnapshot();

        const accessorCache = useAccessorCache(snapshot);

        const values = createMemo(() => {
            let width = 0;
            const gridRef = store.ref.grid;
            if (gridRef) {
                const ref = gridRef();
                width = ref.getBoundingClientRect().width;
            }
            // console.log(width);

            const left = accessorCache.getChordBlockRight();
            return {left, width};
        });

        // const left = createMemo(() => accessorCache.getChordBlockRight());

        return (<_ScrollX left={values().left} width={values().width} />);
    }

    export const Outline = () => {
        const { snapshot } = getSnapshot();

        const height = createMemo(() => {
            let height = 0;
            const outlineRef = store.ref.outline;
            if (outlineRef) {
                const ref = outlineRef();
                height = ref.getBoundingClientRect().height;
            }
            
            // const elementRefs = store.ref.elementRefs;
            // const lastElementRef = elementRefs[elementRefs.length-1].get();
            // const top = lastElementRef.getBoundingClientRect().bottom;
            // console.log(snapshot.data.elements.length);

            const len = snapshot.data.elements.length;
            // return {top, height};
            return height + len - len;
        });

        // const left = createMemo(() => accessorCache.getChordBlockRight());

        return (<_ScrollY height={height()} />);
    }
};
export default MarginBlock;

const _ScrollX = styled.div<{
    left: number;
    width: number;
}>`
    ${SC.absolute({})}
    left: ${props => props.left}px;
    width: ${props => props.width / 2}px;
    height: 100%;
    /* background-color: aliceblue; */
`;
const _ScrollY = styled.div<{
    height: number;
}>`
    ${SC.rect}
    width: 100%;
    height: ${props => props.height / 2}px;
    /* background-color: aliceblue; */
`;