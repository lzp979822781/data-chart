import echarts from "echarts";
import { notification } from "antd";

const legend618 = "image:////img12.360buyimg.com/imagetools/jfs/t1/150970/5/4389/463/5f9631bbEb9947d21/0fed63bca6bebc8d.png";

export { legend618 };

const yoyLine = {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "rgba(255,255,255,0.4)" }, { offset: 1, color: "#FFF" }]),
};

const yoyArea = {
    normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#FFF" }, { offset: 0.4, color: "rgba(255,255,255, .7)" }, { offset: 1, color: "rgba(255,255,255, .1)" }]),
    },
};

const iconObj = {
    legend618,
    drugSingle: "image:////img14.360buyimg.com/imagetools/jfs/t1/131444/12/1318/652/5ed7779fEef6bfafa/9449c4dcc56cfa9c.png",
    hospitalSingle: "image:////img12.360buyimg.com/imagetools/jfs/t1/117925/35/9261/707/5ed777a4E84066893/4aa752d7e4003e46.png",
    ergentSingle: "image:////img14.360buyimg.com/imagetools/jfs/t1/115905/17/9156/719/5ed7779fE59d5c7a7/f24e88d1a86ae5e0.png",
    appSingle: "image:////img11.360buyimg.com/imagetools/jfs/t1/112812/21/9101/780/5ed7779fEf526dbea/07bec2d688335f92.png",
    yjcSingle: "image:////img13.360buyimg.com/imagetools/jfs/t1/150629/36/4521/603/5f977beeE7e2321c1/88f1ff637fffeb2a.png",
    cloudSingle: "image:////img13.360buyimg.com/imagetools/jfs/t1/122893/33/16458/664/5f977c4cEd85a34b1/5772798efea3afa6.png",
    // selfErpSingle: "image:////img12.360buyimg.com/imagetools/jfs/t1/132530/15/13727/610/5f977e08E6197d747/5db7f1660e739117.png"
};

const quatityBarObj = {
    drugSingle: { start: "#FF6060", end: "#FFA77D" },
    hospitalSingle: { start: "#3D89FF", end: "#89D3FF" },
    appSingle: { start: "#00DEC2", end: "#0046A2" },
    ergentSingle: { start: "#FF9222", end: "#FFC72A" },
};

function genQuatityBar(field) {
    const { start, end } = quatityBarObj[field];
    const res = {
        color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1, // 右 下 左 上
            [{ offset: 0, color: start }, { offset: 1, color: end }]
        ),
        barBorderRadius: [4, 4, 0, 0], // 设置柱状图
    };
    return res;
}

function genLegendIcon(field) {
    const res = {
        data: [{ name: "今日", icon: iconObj[field] }, { name: "618", icon: iconObj.legend618 }],
    };

    return res;
}

const lineStyleObj = {
    drugSingle: { start: "#FF9B9B", end: "#FF4242" },
    hospitalSingle: { start: "#9AD4FF", end: "#388BFF" },
    appSingle: { start: "#52FFEA", end: "#28AFDF" },
    ergentSingle: { start: "#FFD359", end: "#FF6B00" },
};

function genRealLineStyle(field) {
    const { start, end } = lineStyleObj[field];
    const res = {
        singlesLine: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: start }, { offset: 1, color: end }]),
        },
        yoyLine: { ...yoyLine },
    };
    return res;
}

const areaColorObj = {
    appSingle: { start: "rgba(40, 213, 223, 1)", end: "rgba(40,213,223, .19)" },
    drugSingle: { start: "#FF3B51", end: "rgba(255,107,109, .1)" },
    hospitalSingle: { start: "#2F8DFF", end: "rgba(0,40,190, .11)" },
    ergentSingle: { start: "#FF6600", end: "rgba(255,183,89, .19)" },
};

function genAreaStyle(field) {
    const { start, end } = areaColorObj[field];

    const res = {
        singleArea: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: start }, { offset: 1, color: end }]),
            },
        },
        yoyArea: { ...yoyArea },
    };

    return res;
}

export { genLegendIcon, genQuatityBar, genRealLineStyle, genAreaStyle };

const appQuatityTitle = {
    textStyle: {
        color: "#fff",
        fontSize: 22,
        fontFamily: "PingFangSC-Regular",
        lineHeight: 22,
    },
};

export { appQuatityTitle };

const appQuatitylegend = {
    top: 0,
    left: "auto",
    right: 0,
    textStyle: {
        color: "#fff",
        fontSize: 14,
        lineHeight: 22,
    },
    itemWidth: 14,
    itemHeight: 14,
};

export { appQuatitylegend };

const comTitle = {
    textStyle: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "PingFangSC-Regular",
        lineHeight: 20,
    },
};

const comLegend = {
    top: 32,
    left: 0,
    itemWidth: 32,
    itemHeight: 14,
    textStyle: {
        color: "#fff",
        fontSize: 14,
        lineHeight: 14,
    },
    // icon: 'image://../../../../assets/image/appLegend.png'
};

const barLegend = Object.assign({}, comLegend, {
    itemWidth: 14,
    itemHeight: 14,
});

const comGrid = {
    left: 30,
    right: 0,
    top: 75,
};

export { comTitle, comLegend, comGrid, barLegend };

const drugRealLineStyle = {
    singlesLine: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#FF9B9B" }, { offset: 1, color: "#FF4242" }]),
    },
    yoyLine: { ...yoyLine },
};

const drugQuantityGrid = {
    left: 50,
    right: 0,
    top: 75,
};

const drugQuantityBar = {
    color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1, // 右 下 左 上
        [{ offset: 0, color: "#FF6060" }, { offset: 0.6, color: "#FF6060" }, { offset: 1, color: "#FFA77D" }]
    ),
    barBorderRadius: [4, 4, 0, 0], // 设置柱状图
};

export { drugRealLineStyle, drugQuantityGrid, drugQuantityBar };

const labelConfig = {
    rotate: 60,
    offset: [0, -10],
};

export { labelConfig };

function fullScreen() {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}

function exitScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export { fullScreen, exitScreen };

/**
 * 登录权限处理
 * @param { string} code 接口返回的字段，是否有权限，有权限直接返回数据 code为4002表明没有权限
 * @returns { Boolean }
 */

let isFirst = true;

function toLogin() {
    const { location: { href } = {} } = window;
    window.location.href = `http://ssa.jd.com/sso/login?returnUrl=${encodeURIComponent(href)}`;
    return false;
}

function notifyError(msg = "权限限制", des = "当前用户无权限操作\n") {
    notification.warning({
        message: msg,
        description: des,
        placement: "topLeft",
    });
}

const codeFunc = {
    "401": toLogin,
    "4002": toLogin,
    "9001": () => {
        if (isFirst) {
            notifyError();
            isFirst = false;
            setTimeout(() => {
                isFirst = true;
            }, 300000);
        }
    },
};

function handleLogin(code, otherParam) {
    if (code !== null && typeof code !== "undefined") {
        if (codeFunc[code]) {
            codeFunc[code](code, otherParam);
        }
    }
}

const authObj = {
    cacheError: [],
    handleSysUnAuth(code, param) {
        const { url, errorMsg } = param;
        const tempArr = this.cacheError.filter(item => item.errorMsg === errorMsg);
        if (tempArr.length) {
            this.cacheError = this.cacheError.map(item => {
                const { errorMsg: tempMsg, url: urlArr } = item;
                const isContainerUrl = urlArr.includes(url);
                if (tempMsg === errorMsg && !isContainerUrl) {
                    return { errorMsg: tempMsg, url: urlArr.concat(url) };
                }
                return item;
            });
        } else {
            notifyError("权限限制", errorMsg);
            this.cacheError.push({ url: [url], errorMsg });
        }
    },
    handleSysAuth(code, param) {
        const { url } = param;
        // 找到url数组
        const tempArr = this.cacheError.filter(item => item.url.includes(url));
        if (!tempArr.length) return;
        this.cacheError = this.cacheError.filter(item => !item.url.includes(url));
    },
};

// 处理9002错误
function handleSysAuth(code, param) {
    if (param.errorMsg) {
        authObj.handleSysUnAuth(code, param);
    } else {
        authObj.handleSysAuth(code, param);
    }
}

export { handleLogin, handleSysAuth };

const titleConfig = {
    textStyle: {
        color: "#fff",
        fontSize: 22,
        fontFamily: "PingFangSC-Regular",
        lineHeight: 22,
    },
};

const legendConfig = {
    top: 0,
    left: "auto",
    right: 0,
    textStyle: {
        color: "#fff",
        fontSize: 14,
        lineHeight: 22,
    },
    itemWidth: 32,
    itemHeight: 14,
    itemGap: 20,
    icon: "image:////img11.360buyimg.com/imagetools/jfs/t1/112812/21/9101/780/5ed7779fEf526dbea/07bec2d688335f92.png",
    ...genLegendIcon("appSingle"),
};

export { titleConfig, legendConfig };

/**
 * 判断当前用户是否具有数据权限
 * @param {*} code 服务端返回编码
 * @returns
 */
function hasDataAuth(code) {
    return !code;
}

export { hasDataAuth };

function getOption(param, isHide) {
    const { type = "line" } = param;
    const data = {
        type,
        label: {
            show: !isHide, // 是否展示折线上的坐标值
        },
    };
    const option = {
        tooltip: { show: !isHide },
        yAxis: {
            axisLabel: {
                show: !isHide, // 隐藏y轴刻度线
            },
        },
        silent: isHide, // 禁止浮动显示
        series: [data, data],
    };
    return option;
}

function setHide(chartContext, param = {}) {
    if (!chartContext) return;
    chartContext.setOption(getOption(param, true));
}

function setShow(chartContext, param = {}) {
    if (!chartContext) return;
    chartContext.setOption(getOption(param, false));
}

export { setHide, setShow };
