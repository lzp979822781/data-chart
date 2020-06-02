import echarts from "echarts";

const appQuatityTitle = {
    textStyle: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'PingFangSC-Regular',
        lineHeight: 22,
    },
};

export { appQuatityTitle };

const appQuatityBar = {
    color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1, // 右 下 左 上
        [
            { offset: 0, color: '#00DEC2' },
            { offset: 1, color: '#0046A2' }
        ]
    ),
    barBorderRadius: [ 4, 4, 0, 0], // 设置柱状图
};

export { appQuatityBar };

const appQuatitylegend = {
    top: 0,
    left: 'auto',
    right: 0,
    textStyle: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 22,
    },
    itemWidth: 14,
    itemHeight: 14
};

export { appQuatitylegend };

const comTitle = {
    textStyle: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'PingFangSC-Regular',
        lineHeight: 20,
    }
};

const comLegend = {
    top: 32,
    left: 0,
    textStyle: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 14,
    },
    // icon: 'image://../../../../assets/image/appLegend.png'
};

const barLegend = Object.assign({}, comLegend, {
    itemWidth: 14,
    itemHeight: 14
});

const comGrid = {
    left: 30,
    right: 0,
    top: 75
}

export { comTitle, comLegend, comGrid, barLegend };

const drugRealLineStyle = {
    color: new echarts.graphic.LinearGradient(
        0, 0, 1, 0,
        [
            { offset: 0, color: '#FF9B9B' },
            { offset: 1, color: '#FF4242' }
        ]
    )
};

const drugAreaStyle = {
    normal: {
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
                { offset: 0, color: '#FF3B51' },
                { offset: 1, color: 'rgba(255,107,109, .1)' }
            ]
        )
    }
};

const drugQuantityGrid = {
    left: 50,
    right: 0,
    top: 75
}

const drugQuantityBar = {
    color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1, // 右 下 左 上
        [
            { offset: 0, color: '#FF6060' },
            { offset: 0.6, color: '#FF6060' },
            { offset: 1, color: '#FFA77D' }
        ]
    ),
    barBorderRadius: [ 4, 4, 0, 0], // 设置柱状图
}

export { drugRealLineStyle, drugAreaStyle, drugQuantityGrid, drugQuantityBar };

const hospitalRealLineStyle = {
    color: new echarts.graphic.LinearGradient(
        0, 0, 1, 0,
        [
            { offset: 0, color: '#9AD4FF' },
            { offset: 1, color: '#388BFF' }
        ]
    )
};

const hospitalAreaStyle = {
    normal: {
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
                { offset: 0, color: '#2F8DFF' },
                { offset: 1, color: 'rgba(0,40,190, .11)' }
            ]
        )
    }
};

const hospitalQuantityBar = {
    color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1, // 右 下 左 上
        [
            { offset: 0, color: '#3D89FF' },
            // { offset: 0.6, color: '##0040C2' },
            { offset: 1, color: '#89D3FF' }
        ]
    ),
    barBorderRadius: [ 4, 4, 0, 0], // 设置柱状图
}

export { hospitalRealLineStyle, hospitalAreaStyle, hospitalQuantityBar };

const urgentRealLineStyle = {
    color: new echarts.graphic.LinearGradient(
        0, 0, 1, 0,
        [
            { offset: 0, color: '#FFD359' },
            { offset: 1, color: '#FF6B00' }
        ]
    )
};

const urgentAreaStyle = {
    normal: {
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
                { offset: 0, color: '#FF6600' },
                { offset: 1, color: 'rgba(255,183,89, .19)' }
            ]
        )
    }
};

const urgentQuantityBar = {
    color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1, // 右 下 左 上
        [
            { offset: 0, color: '#FF9222' },
            // { offset: 0.6, color: '##0040C2' },
            { offset: 1, color: '#FFC72A' }
        ]
    ),
    barBorderRadius: [ 4, 4, 0, 0], // 设置柱状图
}

export { urgentRealLineStyle, urgentAreaStyle, urgentQuantityBar };