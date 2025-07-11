import Thema from "~/system/common/design/thema";



namespace StoreRoot {

    export type Props = {

        thema: Thema.Props;
    }

    export const getInitialStore = (): Props => {

        return {
            thema: {
                main: '#599',
                accent: '#999',
                sub: '#fff'
            }
        }
    }
}

export default StoreRoot;