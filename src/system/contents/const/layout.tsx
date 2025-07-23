namespace Layout {

    export const root = {
        ROOT_HEADER: 40,
        OUTLINE_WIDTH: 210,
    }
    export const timelineHeader = {
        MEMORI_HEIGHT: 40,
        BLOCK_HEIGHT: 40,
        INFO_HEIGHT: 50,
    }
    export const timeline = {
        PITCH_WIDTH: 70,
        HEADER_HEIGHT: timelineHeader.MEMORI_HEIGHT + timelineHeader.BLOCK_HEIGHT + timelineHeader.INFO_HEIGHT,

    }
    export const outline = {
        HEADER_HEIGHT: 100,
        FOOTER_HEIGHT: 20,
    }
};

export default Layout;