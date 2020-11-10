import React, { Component } from "react";
import PropTypes from "prop-types";
import echarts from "echarts";
import moment from "moment";
import { setHide, setShow } from "../../Home/templateData";
import { post } from "../../services";

const defaultProps = {
    title: "大药房大促期间单量趋势",
    reqTimeRange: 10,
    format: "MM/DD",
    interval: 10000,
};

const propTypes = {
    title: PropTypes.string,
    legend: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    reqTimeRange: PropTypes.number,
    format: PropTypes.string,
    interval: PropTypes.number,
};

const titleStyle = {
    color: "#8600FF",
};

class OrderQuantityTrend extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initMap();
        this.initResize();
        this.getData();
        setHide(this.myChart, { type: "bar" });
    }

    componentWillReceiveProps(nextProps) {
        const { hasDataAuth: currentAuth } = this.props;
        const { hasDataAuth: nextAuth } = nextProps;
        if (nextAuth !== currentAuth) {
            if (!nextAuth) {
                setHide(this.myChart, { type: "bar" });
            } else {
                setShow(this.myChart, { type: "bar" });
            }
        }
    }

    componentWillUnmount() {
        if (this.myChart) {
            this.myChart.dispose();
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        window.onresize = null;
    }

    initResize = () => {
        if (!window.onresize) {
            window.onresize = () => {
                this.myChart.resize();
            };
        }
    };

    callTimeout = () => {
        const { interval } = this.props;
        this.timeout = setTimeout(() => {
            this.getData();
        }, interval);
    };

    initMap = () => {
        const { id } = this.props;
        const quantityTrend = document.getElementById(id);
        if (quantityTrend) {
            this.myChart = echarts.init(quantityTrend);
            this.myChart.setOption(this.genOption(), true);
        }
    };

    getTitleConfig = () => {
        const { title, titleConfig = {} } = this.props;
        return Object.assign(
            {},
            {
                text: title,
                textStyle: titleStyle,
                left: 0,
            },
            titleConfig
        );
    };

    genOption = () => {
        const { legend, lineStyle = {}, areaStyle = {}, itemStyle, legendConfig, gridConfig, labelConfig = {} } = this.props;
        const option = {
            title: this.getTitleConfig(),
            legend: legendConfig || {
                data: legend,
                top: "20px", // 可以设置如下位置属性left、top、right、bottom、width、height、orient、align、padding
                left: 0,
                textStyle: {
                    color: "#8600FF",
                    fontSize: 12,
                },
                itemWidth: 14,
                itemHeight: 14,
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(50,50,50,0.7)",
                // extraCssText: 'z-index: 1000;transform: translateZ(1000)',
                // confine: true,
                appendToBody: true,
            },
            xAxis: {
                type: "category",
                data: [],
                axisTick: {
                    show: false, // 刻度线的显示
                },
                axisLine: {
                    show: true, // 轴线的显示
                    lineStyle: {
                        color: "#0051F3",
                        width: 2,
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                        fontFamily: "SFProText-Light",
                    },
                    interval: 2,
                },
            },
            yAxis: {
                type: "value",
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                        fontFamily: "PingFangSC-Light",
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "#0043A8",
                        width: 2,
                    },
                },
            },
            grid: gridConfig || {
                // left: 'left',
                right: 0,
            },
            series: [
                {
                    data: [],
                    type: "bar",
                    smooth: true,
                    symbolSize: 8,
                    name: legend[0],
                    label: Object.assign(
                        {},
                        {
                            show: false,
                            position: "top",
                            color: "#fff",
                        },
                        labelConfig
                    ),
                    lineStyle,
                    areaStyle,
                    itemStyle: itemStyle || {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            1,
                            0,
                            0, // 右 下 左 上
                            [{ offset: 0, color: "#ff0000" }, { offset: 0.7, color: "#2378f7" }, { offset: 1, color: "#83bff6" }]
                        ),
                        barBorderRadius: [4, 4, 0, 0], // 设置柱状图
                    },
                    barWidth: 6, // 设置柱状图宽度
                },
            ],
        };
        return option;
    };

    getReqParam = () => {
        const { url, reqTimeRange } = this.props;
        const data = {
            url,
            data: { num: reqTimeRange },
        };
        return data;
    };

    getAxisData = (data, field) => {
        if (Array.isArray(data)) {
            return data.map(({ [field]: value }) => value);
        }

        return data;
    };

    formatData = (data, format) => {
        if (Array.isArray(data) && data.length) {
            return data.map(item => moment(item).format(format));
        }
        return data;
    };

    handleData = data => {
        const { format, dataField = "orderCount" } = this.props;
        const xArr = this.formatData(this.getAxisData(data, "date"), format);
        const yArr = this.getAxisData(data, dataField);
        this.setOption(xArr, yArr);
    };

    setOption = (xArr, yArr) => {
        if (this.myChart) {
            this.myChart.setOption({
                xAxis: {
                    data: xArr,
                },
                series: [{ data: yArr }],
            });
        }
    };

    getData = async () => {
        const { success, data } = await post(this.getReqParam());
        if (success) {
            this.handleData(data);
        }

        if (this && this.callTimeout) {
            this.callTimeout();
        }
    };

    render() {
        const { id, className, style = {} } = this.props;
        return (
            <div className = {className}>
                <div id = {id} style = {{ width: "100%", height: "307px", ...style }} />
            </div>
        );
    }
}

OrderQuantityTrend.defaultProps = defaultProps;
OrderQuantityTrend.propTypes = propTypes;
export default OrderQuantityTrend;
