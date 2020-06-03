import request from "@/utils/request";

const URL = {
    DrugStoreRealTimeTrend: `/btb/order/latelyMinutes`, // 大药房下单量实时趋势
    DrugStoreQuantityTrend: `/btb/order/latelyDays`, // 大药房大促期间单量趋势
    DrugStoreTotal: `/btb/order/todayTotal`, // 大药房当日累积PV、累计下单量

    InterRealTimeTrend: `/hospital/order/latelyMinutes`, // 互联网医院实时趋势
    InterQuantityTrend: `/hospital/order/latelyDays`, // 互联网医院近n天每天总量
    InterTotal: `/hospital/order/todayTotal`, // 互联网医院当天订单量和订单金额

    UrgentRealTimeTrend: `/ds/order/latelyMinutes`, // 药急送下单量实时趋势
    UrgentQuantityTrend: `/ds/order/latelyDays`, // 药急送近n天每天总量
    UrgentTotal: `/ds/order/todayTotal`, // 药急送当天订单量和订单金额

    YjcStoreRealTimeTrend: `/btb/order/latelyMinutes`, // 药京采下单量实时趋势
    YjcQuantityTrend: `/btb/order/latelyDays`, // 药京采大促期间单量趋势
    YjcTotal: `/btb/order/todayTotal`, // 药京采当日累积PV、累计下单量

    AppRealTimeTrend: `/app/order/latelyMinutes`, // 京东健康app实时趋势
    AppQuantityTrend: `/app/order/latelyDays?num=10`, // 京东健康app大促期间单量趋势
    AppTotal: `/app/order/todayTotal`, // 京东健康app当天订单量和订单金额
};

/**
 *
 *
 * @params {object} param
 */
export function get(param) {
    /* const {data: {id} = {}} = param;
    let url =  URL[param.url];
    if(dynamicUrl) url = `${url}/${id}`; */
    const res = request(URL[param.url], {
        method: "GET",
        params: param.data,
    });
    return res;
}

export function post(param) {
    return new Promise((resolve) => {
        request(URL[param.url], {
            method: "POST",
            data: param.data,
        }).then(res => {
            const { success, data, errorMsg } = res;
            resolve({ success, data, error: errorMsg });
        }).catch(error => resolve({ success: false, error }))
    })
}

export function queryDetail(param) {
    const {
        url,
        data: { id, ...otherData },
    } = param;
    return request(`${URL[url]}${id}`, {
        method: "GET",
        params: otherData,
    });
}
