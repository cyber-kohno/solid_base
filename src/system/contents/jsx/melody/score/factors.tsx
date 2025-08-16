import { css } from "@emotion/react";
import { createMemo, For } from "solid-js";
import { styled } from "solid-styled-components";
import SC from "~/system/common/styled";
import Layout from "~/system/contents/const/layout";
import StoreMelody from "~/system/contents/store/data/storeMelody";
import { getSnapshot } from "~/system/contents/store/store";


type Type = '4div' | '8div' | '16div' | '4div3t' | '8div3t';
const Factors = (props: {
    note: StoreMelody.Note;
}) => {
    const { snapshot } = getSnapshot();

    const norms = createMemo(() => {
        const norms: StoreMelody.Norm[] = [];
        const n = props.note;
        let pos = n.pos;
        const tail = n.pos + n.len;

        let cnt = 0;
        while (true) {
            if (cnt > 50) throw new Error('cntが50を超えた。');
            if (n.norm.div === 1) {
                if (!n.norm.tuplets) {
                    norms.push({ div: 1 });
                    pos++;
                } else {
                    if (pos % 3 === 0 && pos + 3 <= tail) {
                        norms.push({ div: 1 });
                        pos += 3;
                    } else {
                    norms.push({ div: 1, tuplets: 3 });
                        pos++;
                    }
                }
            } else if (n.norm.div === 2) {
                if (!n.norm.tuplets) {
                    if (pos % 2 === 0 && pos + 2 <= tail) {
                        norms.push({ div: 1 });
                        pos += 2;
                    } else {
                        norms.push({ div: 2 });
                        pos++;
                    }
                } else {
                    if (pos % 3 === 0 && pos + 3 <= tail) {
                        norms.push({ div: 2 });
                        pos += 3;
                    } else {
                        norms.push({ div: 2, tuplets: 3 });
                        pos++;
                    }
                }
            } else if (n.norm.div === 4) {
                if (pos % 4 === 0 && pos + 4 <= tail) {
                    norms.push({ div: 1 });
                    pos += 4;
                } else if (pos % 2 === 0 && pos + 2 <= tail) {
                    norms.push({ div: 2 });
                    pos += 2;
                } else {
                    norms.push({ div: 4 });
                    pos++;
                }
            }
            if (pos === tail) break;

            cnt++;
        }
        return norms;
    });

    return (<For each={norms()}>{norm => (<_Item
        type={`${norm.div * 4}div${!norm.tuplets ? '' : (norm.tuplets + 't')}` as Type}
        width={snapshot.env.beatWidth / norm.div / (norm.tuplets ?? 1)}
    />)}</For>);
}
export default Factors;

const PL = Layout.pitch;
const MARGIN = 2;
const Height = PL.ITEM_HEIGHT + MARGIN * 2;

const _Item = styled.div<{
    type: Type;
    width: number;
}>`
    ${SC.rect}
    vertical-align: top;
    width: ${props => props.width}px;
    border-radius: 4px;
    background-color: #7d7d7d85;
    border: solid 1px #000000d2;
    box-sizing: border-box;
    ${props => (() => {
        const center = Math.floor(Height / 2);
        switch (props.type) {
            case '4div': return css`
                height: 12px;
                margin-top: ${center - 6}px;
                border-radius: 6px;
            `.styles;
            case '4div3t': return css`
                height: 12px;
                margin-top: ${center - 6}px;
                border-radius: 6px;
                background-color: #f3717185;
                border: solid 1px #ba6c6cd2;
            `.styles;
            case '8div': return css`
                height: 10px;
                margin-top: ${center - 5}px;
                border-radius: 5px;
                background-color: #81949385;
                border: solid 1px #364040d2;
            `.styles;
            case '8div3t': return css`
                height: 10px;
                margin-top: ${center - 5}px;
                border-radius: 5px;
                background-color: #f3717185;
                border: solid 1px #ba6c6cd2;
            `.styles;
            case '16div': return css`
                height: 8px;
                margin-top: ${center - 4}px;
                border-radius: 4px;
                background-color: #6fa6a885;
                border: solid 1px #6fb5b1d2;
            `.styles;
        }
    })()}
`;