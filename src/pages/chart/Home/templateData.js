import echarts from "echarts";
import { notification } from "antd";

const legend618 = "image:////img12.360buyimg.com/imagetools/jfs/t1/150970/5/4389/463/5f9631bbEb9947d21/0fed63bca6bebc8d.png";

export { legend618 };

const iconObj = {
    legend618,
    drugSingle: "image:////img14.360buyimg.com/imagetools/jfs/t1/131444/12/1318/652/5ed7779fEef6bfafa/9449c4dcc56cfa9c.png",
    hispitalSingle: "image:////img12.360buyimg.com/imagetools/jfs/t1/117925/35/9261/707/5ed777a4E84066893/4aa752d7e4003e46.png",
    ergentSingle: "image:////img14.360buyimg.com/imagetools/jfs/t1/115905/17/9156/719/5ed7779fE59d5c7a7/f24e88d1a86ae5e0.png",
    appSingle: "image:////img11.360buyimg.com/imagetools/jfs/t1/112812/21/9101/780/5ed7779fEf526dbea/07bec2d688335f92.png",
};

function genLegendIcon(field) {
    const res = {
        data: [{ name: "今日", icon: iconObj[field] }, { name: "618", icon: iconObj.legend618 }],
    };

    return res;
}

export { genLegendIcon };

const appQuatityTitle = {
    textStyle: {
        color: "#fff",
        fontSize: 22,
        fontFamily: "PingFangSC-Regular",
        lineHeight: 22,
    },
};

export { appQuatityTitle };

const appQuatityBar = {
    color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1, // 右 下 左 上
        [{ offset: 0, color: "#00DEC2" }, { offset: 1, color: "#0046A2" }]
    ),
    barBorderRadius: [4, 4, 0, 0], // 设置柱状图
};

export { appQuatityBar };

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

const yoyLine = {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "rgba(255,255,255,0.4)" }, { offset: 1, color: "#FFF" }]),
};

const yoyArea = {
    normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#FFF" }, { offset: 0.4, color: "rgba(255,255,255, .7)" }, { offset: 1, color: "rgba(255,255,255, .1)" }]),
    },
};

const drugRealLineStyle = {
    singlesLine: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#FF9B9B" }, { offset: 1, color: "#FF4242" }]),
    },
    yoyLine: { ...yoyLine },
};

const drugAreaStyle = {
    singleArea: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#FF3B51" }, { offset: 1, color: "rgba(255,107,109, .1)" }]),
        },
    },
    yoyArea: { ...yoyArea },
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

const drugLabelConfig = {
    rotate: 60,
    offset: [0, -10],
};

export { drugRealLineStyle, drugAreaStyle, drugQuantityGrid, drugQuantityBar, drugLabelConfig };

const hospitalRealLineStyle = {
    singlesLine: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#9AD4FF" }, { offset: 1, color: "#388BFF" }]),
    },
    yoyLine: { ...yoyLine },
};

const hospitalAreaStyle = {
    singleArea: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#2F8DFF" }, { offset: 1, color: "rgba(0,40,190, .11)" }]),
        },
    },
    yoyArea: { ...yoyArea },
};

const hospitalQuantityBar = {
    color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1, // 右 下 左 上
        [
            { offset: 0, color: "#3D89FF" },
            // { offset: 0.6, color: '##0040C2' },
            { offset: 1, color: "#89D3FF" },
        ]
    ),
    barBorderRadius: [4, 4, 0, 0], // 设置柱状图
};

const hospitalLabelConfig = {
    rotate: 60,
    ffset: [0, -10],
};

export { hospitalRealLineStyle, hospitalAreaStyle, hospitalQuantityBar, hospitalLabelConfig };

const urgentRealLineStyle = {
    singlesLine: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#FFD359" }, { offset: 1, color: "#FF6B00" }]),
    },
    yoyLine: { ...yoyLine },
};

const urgentAreaStyle = {
    singleArea: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#FF6600" }, { offset: 1, color: "rgba(255,183,89, .19)" }]),
        },
    },
    yoyArea: { ...yoyArea },
};

const urgentQuantityBar = {
    color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1, // 右 下 左 上
        [
            { offset: 0, color: "#FF9222" },
            // { offset: 0.6, color: '##0040C2' },
            { offset: 1, color: "#FFC72A" },
        ]
    ),
    barBorderRadius: [4, 4, 0, 0], // 设置柱状图
};

const urgentlLabelConfig = {
    rotate: 60,
    ffset: [0, -10],
};

export { urgentRealLineStyle, urgentAreaStyle, urgentQuantityBar, urgentlLabelConfig };

const healthMagLineStyle = {
    singlesLine: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#52FFEA" }, { offset: 1, color: "#28AFDF" }]),
    },
    yoyLine: { ...yoyLine },
};

const healthMagAreaStyle = {
    singleArea: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "rgba(40, 213, 223, 1)" }, { offset: 1, color: "rgba(40,213,223, .19)" }]),
        },
    },
    yoyArea: { ...yoyArea },
};

const healthMagLabelConfig = {
    rotate: 60,
    offset: [0, -10],
};

export { healthMagLineStyle, healthMagAreaStyle, healthMagLabelConfig };

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

const codeFunc = {
    "401": toLogin,
    "4002": toLogin,
    "9001": () => {
        if (isFirst) {
            notification.warning({
                message: "权限限制",
                description: "当前用户无权限操作                                                         ",
                placement: "topLeft",
            });
            isFirst = false;
            setTimeout(() => {
                isFirst = true;
            }, 300000);
        }
    },
};

function handleLogin(code) {
    if (code !== null && typeof code !== "undefined") {
        codeFunc[code]();
    }
}

export { handleLogin };

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

const lineStyle = {
    singlesLine: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#52FFEA" }, { offset: 1, color: "#28AFDF" }]),
    },
    yoyLine: { ...yoyLine },
};

const areaStyle = {
    singleArea: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "rgba(40, 213, 223, 1)" }, { offset: 1, color: "rgba(40,213,223, .19)" }]),
        },
    },
    yoyArea: { ...yoyArea },
};

export { titleConfig, legendConfig, lineStyle, areaStyle };
