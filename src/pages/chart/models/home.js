import cloneDeep from "lodash/cloneDeep";

export default {
    namespace: "home",

    state: {
        // 小程序
        minprograme: { close: true },

        // 健康app
        healthApp: { close: true },

        // 大药房
        drugStore: { close: true },

        // 互联网医院
        internetHospital: { close: true },

        // 药急送
        urgent: { close: true },

        // 健管平台
        healthMag: { close: true },

        // 药京采
        yjc: { close: true },

        // 菲加云
        feiJiaYun: { close: true },

        // 药店管家
        selfErp: { close: true },

        showAll: false,
    },

    effects: {
        /**
         * @param {*} { payload } { systemName: string, close: boolean }
         * @param {*} { put, select }
         * @returns
         */
        *changeState({ payload }, { put, select }) {
            const { systemName, ...otherData } = payload;
            if (!systemName) return;
            const { [systemName]: data } = yield select(state => state.home);
            const updateData = Object.assign({}, cloneDeep(data), otherData);
            yield put({
                type: "updateState",
                payload: {
                    [systemName]: updateData,
                },
            });
        },

        *openAll(param, { put }) {
            yield put({
                type: "updateState",
                payload: {
                    minprograme: { close: false },
                    healthApp: { close: false },
                    drugStore: { close: false },
                    internetHospital: { close: false },
                    urgent: { close: false },
                    healthMag: { close: false },
                    yjc: { close: false },
                    feiJiaYun: { close: false },
                    selfErp: { close: false },
                    showAll: true,
                },
            });
        },
    },

    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
