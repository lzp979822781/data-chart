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
