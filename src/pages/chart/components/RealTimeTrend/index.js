import React, { Component } from 'react';
import PropTypes from 'prop-types';
import echarts from "echarts";
import moment from 'moment';
import { post } from '../../services';

const titleStyle = {
    color: '#8600FF'
}

const defaultProps = {
    title: '大药房下单量实时趋势',
    reqTimeRange: 15,
    format: 'HH:mm',
    interval: 5000,
}

const propTypes = {
    title: PropTypes.string,
    legend: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    reqTimeRange: PropTypes.number,
    format: PropTypes.string,
    interval: PropTypes.number
}

class RealTimeTrend extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.initMap();
        this.initResize();
        this.initInterval();
        this.getData();
    }

    componentWillUnmount() {
        if(this.myChart) {
            this.myChart.dispose();
        }
        if(this.timeInterval) {
            clearInterval(this.timeInterval);
        }
        window.onresize = null;
    }

    initResize = () => {
        if(!window.onresize) {
            window.onresize = () => {
                this.myChart.resize();
            }
        }
    }

    initInterval = () => {
        const { interval } = this.props;
        this.timeInterval = setInterval(() => {
            this.getData();
        }, interval)
    }

    initMap = () => {
        const { id } = this.props;
        const realTimeTrend = document.getElementById(id);
        if (realTimeTrend) {
            this.myChart = echarts.init(realTimeTrend);
            this.myChart.setOption(this.genOption(), true);
        }
    }

    getTitleConfig = () => {
        const { title, titleConfig } = this.props;
        const result = Object.assign({}, {
            text: title,
            textStyle: titleStyle,
            left: 0
        }, titleConfig);
        return result;
    }

    getLegendConfig = () => {
        const { legend, legendConfig = {} } = this.props;
        return Object.assign({}, {
            data: legend,
            top: 20,
            left: 'left', // 可以设置如下位置属性left、top、right、bottom、width、height、orient、align、padding
            textStyle: {
                color: '#8600FF',
                fontSize: 12
            },
        }, legendConfig);
    }

    genOption = () => {
        const { legend, lineStyle = {}, areaStyle = {}, gridConfig, labelConfig = {} } = this.props;
        const option = {
            title: this.getTitleConfig(),
            legend: this.getLegendConfig(),
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(50,50,50,0.7)',
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    show: false, // 刻度线的显示
                },
                axisLine: {
                    show: true, // 轴线的显示
                    lineStyle: {
                        color: '#0051F3',
                        width: 2
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        fontFamily: 'SFProText-Light'
                    },
                    formatter: value => {
                        const year = moment().format('YYYY/MM/DD');
                        return `${value}\n${year}`;
                    },
                    interval: 3
                }
            },
            grid: gridConfig || {
                left: 30,
                right: 0,
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#0043A8',
                        width: 2
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        fontFamily: 'PingFangSC-Light'
                    }
                },
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
                symbolSize: 8,
                name: legend[0],
                // 显示数值
                label: Object.assign({}, {
                    show: true,
                    position: 'top',
                    color: '#fff',
                    /* rotate: 60,
                    offset: [0, -10] */
                }, labelConfig ),
                lineStyle,
                areaStyle,
                itemStyle: {
                    borderWidth: 0,
                }
            }]
        };
        return option;
    }

    getReqParam = () => {
        const { url, reqTimeRange } = this.props;
        const data = {
            url,
            data: { num: reqTimeRange }
        };
        return data;
    }

    getAxisData = (data, field) => {
        if(Array.isArray(data)) {
            return data.map(({ [field]: value }) => value);
        }
        return data;
    }

    formatData = (data, format ) => {
        if(Array.isArray(data) && data.length) {
            return data.map(item => moment(item).format(format))
        }
        return data;
    }

    handleData = data => {
        const { format } = this.props;
        const xArr = this.formatData(this.getAxisData(data, 'date'), format);
        const yArr = this.getAxisData(data, 'total');
        this.setOption(xArr, yArr);
    }

    setOption = (xArr, yArr) => {
        if(this.myChart) {
            this.myChart.setOption({
                xAxis: {
                    data: xArr
                },
                series: [{ data: yArr }]
            })
        }
    }

    getData = async () => {
        const { success, data } = await post(this.getReqParam());
        if(success) {
            this.handleData(data);
        } else {
            clearInterval(this.timeInterval);
            if(typeof this.initInterVal === 'function') {
                this.initInterval();
            }
        }
    }

    render() {
        const { id } = this.props;
        return (
            <div>
                <div id = {id} style = {{ width: "100%", height: "307px" }} />
            </div>
        );
    }
}

RealTimeTrend.defaultProps = defaultProps;
RealTimeTrend.propTypes = propTypes;

export default RealTimeTrend;