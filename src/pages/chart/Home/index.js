import React, { Component } from 'react';
import titleDecorate from '@/assets/titleDecorate.svg'
import echarts from "echarts";
import { RealTimeTrend, OrderQuantityTrend, Time, TotalCard, HealthAppCard } from '../components';
import {
    appQuatityBar, appQuatitylegend,
    comTitle, comLegend, comGrid, barLegend,
    drugRealLineStyle, drugAreaStyle, drugQuantityGrid, drugQuantityBar,
    hospitalRealLineStyle, hospitalAreaStyle, hospitalQuantityBar,
    urgentRealLineStyle, urgentAreaStyle, urgentQuantityBar,
    fullScreen, exitScreen
} from './templateData';
import styles from './index.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullScreen: false
        };
        this.ref = React.createRef();
    }

    componentDidMount() {
    }

    dbclickFullScreen = e => {
        e.preventDefault();
        const { isFullScreen } = this.state;
        this.setState({ isFullScreen: !isFullScreen }, () => {
            if(isFullScreen) {
                exitScreen();
            } else {
                fullScreen();
            }
        })

    }

    renderTotalCard = () => (
        <div className = {styles['home-chart-right-total']}>
            <TotalCard
                title = '大药房'
                url = 'DrugStoreTotal'
            />
            <TotalCard
                title = '互联网医院'
                url = 'DrugStoreTotal'
            />
            <TotalCard
                title = '药急送'
                url = 'DrugStoreTotal'
            />
            <TotalCard
                title = '药京采'
                url = 'DrugStoreTotal'
            />
        </div>
    );

    /**
     * 右下角图片容器
     */
    renderNotAppChart = () => (
        <div className = {styles['home-chart-right-chart']}>
            { this.renderBigDrugStore()}
            { this.renderInterHospital()}
            { this.renderDrugUrgent()}
        </div>
    )

    /**
     * 右下角大药房图表容器组件
     * @returns
     */
    renderBigDrugStore = () => (
        <div className = {styles['home-chart-right-drugStore']}>
            <RealTimeTrend
                id = "drugStoreRealTimeTrend"
                title = '大药房下单量趋势'
                legend = {['大药房下单量']}
                url = 'DrugStoreRealTimeTrend'
                titleConfig = {comTitle}
                legendConfig = {comLegend}
                lineStyle = {drugRealLineStyle}
                areaStyle = {drugAreaStyle}
                gridConfig = {comGrid}
            />
            <OrderQuantityTrend
                title = '大药房大促期间支付单量趋势'
                legend = {['大药房下单量']}
                id = 'drugStoreQuantityTrend'
                url = 'DrugStoreQuantityTrend'
                titleConfig = {comTitle}
                legendConfig = {barLegend}
                gridConfig = {drugQuantityGrid}
                itemStyle = {drugQuantityBar}
                className = {styles['home-chart-right-drugStore-bar']}
            />
        </div>
    )

    /**
     * 互联网医院
     */
    renderInterHospital = () => (
        <div className = {styles['home-chart-right-hospital']}>
            <RealTimeTrend
                id = "hospitalRealTimeTrend"
                title = '互联网问诊下单量实时趋势'
                legend = {['互联网医院问诊下单量']}
                url = 'InterRealTimeTrend'
                titleConfig = {comTitle}
                legendConfig = {comLegend}
                lineStyle = {hospitalRealLineStyle}
                areaStyle = {hospitalAreaStyle}
                gridConfig = {comGrid}
            />
            <OrderQuantityTrend
                title = '互联网大促期间问诊下单量趋势'
                legend = {['互联网医院问诊下单量']}
                id = 'hospitalQuantityTrend'
                url = 'InterQuantityTrend'
                titleConfig = {comTitle}
                legendConfig = {barLegend}
                gridConfig = {drugQuantityGrid}
                itemStyle = {hospitalQuantityBar}
                className = {styles['home-chart-right-drugStore-bar']}
            />
        </div>
    )

    /**
     * 药急送
     */
    renderDrugUrgent = () => (
        <div className = {styles['home-chart-right-urgent']}>
            <RealTimeTrend
                id = "urgentRealTimeTrend"
                title = '药急送下单量实时趋势'
                legend = {['药急送下单量']}
                url = 'UrgentRealTimeTrend'
                titleConfig = {comTitle}
                legendConfig = {comLegend}
                lineStyle = {urgentRealLineStyle}
                areaStyle = {urgentAreaStyle}
                gridConfig = {comGrid}
            />
            <OrderQuantityTrend
                title = '药急送大促期间单量趋势'
                legend = {['药急送下单量']}
                id = 'urgentQuantityTrend'
                url = 'UrgentQuantityTrend'
                titleConfig = {comTitle}
                legendConfig = {barLegend}
                gridConfig = {drugQuantityGrid}
                itemStyle = {urgentQuantityBar}
                className = {styles['home-chart-right-drugStore-bar']}
            />
        </div>
    )

    renderTitle = () => (
        <div className = {styles['home-title']}>
            <div className = {styles['home-title-left']}>
                <div className = {styles['home-title-left-main']}>京东健康产研实时监控大屏</div>
                <Time className = {styles['home-title-time']} />
            </div>
            <div className = {styles['home-title-left-sub']}>Real-time Monitor-control Platform of Product R&D Department</div>
        </div>
    )

    /**
     * 左侧app容器包含总数统计、实时趋势
     * @returns
     */
    renderApp = () => {
        const titleConfig = {
            textStyle: {
                color: '#fff',
                fontSize: 22,
                fontFamily: 'PingFangSC-Regular',
                lineHeight: 22,
            }
        };

        const legendConfig = {
            top: 0,
            left: 'auto',
            right: 0,
            textStyle: {
                color: '#fff',
                fontSize: 14,
                lineHeight: 22,
            },
            itemWidth: 32,
            itemHeight: 14,
            // icon: 'image://../../../../assets/image/appLegend.png'
        };

        const lineStyle = {
            color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    { offset: 0, color: '#52FFEA' },
                    { offset: 1, color: '#28AFDF' }
                ]
            )
        };

        const areaStyle = {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: 'rgba(40, 213, 223, 1)' },
                        { offset: 1, color: 'rgba(40,213,223, .19)' }
                    ]
                )
            }

        };
        return (
            <div className = {styles['home-chart-left']}>
                <img className = {styles['home-chart-left-img']} src = {titleDecorate} width = {10} height = {28} alt = "" />
                <div>
                    <HealthAppCard
                        title = '京东健康app'
                        url = 'DrugStoreTotal'
                    />
                    <div className = {styles['home-chart-app-container']}>
                        <RealTimeTrend
                            id = "appRealTrend"
                            title = '实时支付单量趋势'
                            legend = {['京东健康APP支付单量']}
                            url = 'AppRealTimeTrend'
                            titleConfig = {titleConfig}
                            legendConfig = {legendConfig}
                            lineStyle = {lineStyle}
                            areaStyle = {areaStyle}
                        />
                        <OrderQuantityTrend
                            title = '大促期间支付单量趋势'
                            legend = {['京东健康APP支付单量']}
                            id = 'appQuantityTrend'
                            url = 'AppQuantityTrend'
                            titleConfig = {titleConfig}
                            lineStyle = {lineStyle}
                            itemStyle = {appQuatityBar}
                            legendConfig = {appQuatitylegend}
                        />
                    </div>

                </div>
            </div>
        )
    }


    render() {
        return (
            <div className = {styles.home} ref = {this.ref}>
                { this.renderTitle()}
                <div className = {styles['home-chart-container']}>
                    { this.renderApp()}
                    <div className = {styles['home-chart-right']}>
                        { this.renderTotalCard()}
                        { this.renderNotAppChart()}
                        {/* <RealTimeTrend
                        id = "intHospitalRealTimeTrend"
                        title = '互联网医院问诊下单量实时趋势'
                        legend = {['互联网医院问诊下单量']}
                        url = 'DrugStoreRealTimeTrend'
                    /> */}
                        {/* <OrderQuantityTrend
                            title = '大药房大促期间单量趋势'
                            legend = {['大药房下单量']}
                            id = 'drugStoreQuantityTrend'
                            url = 'DrugStoreQuantityTrend'
                        /> */}
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;