import request from "@/utils/request";

const URL = {
    DrugStoreRealTimeTrend: `/btb/order/latelyMinutes`, // 大药房下单量实时趋势
    DrugStoreQuantityTrend: `/btb/order/latelyDays`, // 大药房大促期间单量趋势
    DrugStoreTotal: `/btb/order/todayTotal`, // 大药房当日累积PV、累计下单量

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
