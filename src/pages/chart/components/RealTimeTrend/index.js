import React, { Component } from "react";
import PropTypes from "prop-types";
import echarts from "echarts";
import moment from "moment";
import classnames from "classnames";
import { setHide, setShow, legend618 } from "../../Home/templateData";
import { post } from "../../services";

const titleStyle = {
    color: "#8600FF",
};

const defaultProps = {
    title: "大药房下单量实时趋势",
    reqTimeRange: 15,
    format: "YYYY-MM-DD HH:mm",
    interval: 5000,
    hasDataAuth: true,
};

const propTypes = {
    title: PropTypes.string,
    legend: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    reqTimeRange: PropTypes.number,
    format: PropTypes.string,
    interval: PropTypes.number,
    hasDataAuth: PropTypes.bool,
};

class RealTimeTrend extends Component {
    hasYoy = true;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initMap();
        this.initResize();
        this.getData();
        setHide(this.myChart);
    }

    componentWillReceiveProps(nextProps) {
        const { hasDataAuth: currentAuth } = this.props;
        const { hasDataAuth: nextAuth } = nextProps;
        if (nextAuth !== currentAuth) {
            if (!nextAuth) {
                setHide(this.myChart);
            } else {
                setShow(this.myChart);
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

    getAuth = async () => {
        setHide(this.myChart);
    };

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
        const realTimeTrend = document.getElementById(id);
        if (realTimeTrend) {
            this.myChart = echarts.init(realTimeTrend);
            this.myChart.setOption(this.genOption(), true);
        }
    };

    getTitleConfig = () => {
        const { title, titleConfig } = this.props;
        const result = Object.assign(
            {},
            {
                text: title,
                textStyle: titleStyle,
                left: 0,
            },
            titleConfig
        );
        return result;
    };

    getLegendConfig = () => {
        const { legend, legendConfig = {} } = this.props;
        return Object.assign(
            {},
            {
                data: legend,
                top: 20,
                left: "left", // 可以设置如下位置属性left、top、right、bottom、width、height、orient、align、padding
                textStyle: {
                    color: "#8600FF",
                    fontSize: 12,
                },
            },
            legendConfig
        );
    };

    genOption = () => {
        const { legend, lineStyle: { singlesLine, yoyLine } = {}, areaStyle: { singleArea, yoyArea } = {}, gridConfig, labelConfig = {} } = this.props;
        const option = {
            title: this.getTitleConfig(),
            legend: this.getLegendConfig(),
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(50,50,50,0.7)",
                appendToBody: true, // 解决tooptip透过图表显示的问题
                show: true, // 隐藏浮动显示值
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
                    formatter: value => {
                        const time = moment(value).format("HH:mm");
                        const year = moment(value).format("YYYY/MM/DD");
                        return `${time}\n${year}`;
                    },
                    interval: 3,
                },
            },
            grid: gridConfig || {
                left: 30,
                right: 0,
            },
            yAxis: {
                type: "value",
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: "#0043A8",
                        width: 2,
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                        fontFamily: "PingFangSC-Light",
                    },
                    show: true, // 隐藏y轴刻度线
                },
            },
            series: [
                {
                    data: [],
                    type: "line",
                    smooth: true,
                    symbolSize: 8,
                    name: legend[0],
                    // stack: 'gap',
                    // 显示数值
                    label: Object.assign(
                        {},
                        {
                            show: false, // 是否展示折线上的坐标值
                            position: "top",
                            color: "#fff",
                            /* rotate: 60,
                    offset: [0, -10] */
                        },
                        labelConfig
                    ),
                    lineStyle: singlesLine,
                    areaStyle: singleArea,
                    itemStyle: {
                        borderWidth: 0,
                    },
                },
            ],
        };

        if (this.hasYoy) {
            const yoyData = {
                data: [],
                type: "line",
                smooth: true,
                symbolSize: 8,
                name: legend[1],
                // stack: 'gap',
                // 显示数值
                label: Object.assign(
                    {},
                    {
                        show: false, // 隐藏
                        position: "top",
                        color: "#fff",
                    },
                    labelConfig
                ),
                lineStyle: yoyLine,
                areaStyle: yoyArea,
                itemStyle: {
                    borderWidth: 0,
                },
            };
            option.series.push(yoyData);
        }
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

    getYoyData = (data, field) => {
        if (Array.isArray(data)) {
            const yoyData = data.filter(({ hasYoy }) => hasYoy);
            return yoyData.length ? yoyData.map(({ [field]: value }) => value) : [];
        }

        return [];
    };

    formatData = (data, format) => {
        if (Array.isArray(data) && data.length) {
            return data.map(item => moment(item).format(format));
        }
        return data;
    };

    handleData = data => {
        const { format, dataField = "total" } = this.props;
        const xArr = this.formatData(this.getAxisData(data, "date"), format);
        const yArr = this.getAxisData(data, dataField);
        const yoyData = this.getYoyData(data, "yoyTotal");
        const [hasYoy] = this.getYoyData(data, "hasYoy");
        // const yoyData = yArr.map(item => item * 2);
        this.setOption(xArr, yArr, [{ data: yoyData }], hasYoy);
    };

    setOption = (xArr, yArr, yoyData, hasYoy) => {
        const { data } = this.getLegendConfig();

        if (this.myChart) {
            const updateData = {
                xAxis: {
                    data: xArr,
                },
                series: [{ data: yArr }, ...yoyData],
                legend: {
                    data: hasYoy ? data.concat({ name: "618", icon: legend618 }) : data,
                },
            };
            this.myChart.setOption(updateData);
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

    getStyle = () => {
        const { className } = this.props;
        const res = classnames(className);
        return res;
    };

    render() {
        const { id, style = {} } = this.props;
        return (
            <div>
                <div className = {this.getStyle()} id = {id} style = {{ width: "100%", height: "307px", ...style }} />
            </div>
        );
    }
}

RealTimeTrend.defaultProps = defaultProps;
RealTimeTrend.propTypes = propTypes;

export default RealTimeTrend;
