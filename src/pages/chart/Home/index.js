import React, { Component } from "react";
import classnames from "classnames";
import titleDecorate from "@/assets/titleDecorate.svg";
import rightTitleIcon from "@/assets/svg/rightTitleIcon.svg";
import { RealTimeTrend, OrderQuantityTrend, Time, TotalCard, HealthAppCard, SecContainer, WaterMark } from "../components";
import {
    appQuatitylegend,
    comTitle,
    comLegend,
    comGrid,
    barLegend,
    drugRealLineStyle,
    drugQuantityGrid,
    drugQuantityBar,
    labelConfig,
    titleConfig,
    legendConfig,
    genLegendIcon,
    genQuatityBar,
    genAreaStyle,
    genRealLineStyle,
} from "./templateData";
import { post } from "../services";
import styles from "./index.less";

const leftImg = "https://img12.360buyimg.com/imagetools/jfs/t1/155282/21/3631/56164/5f97d5f2Ece4c71d2/bb0145e0aa66fe6e.png";
const rightImg = "https://img10.360buyimg.com/imagetools/jfs/t1/145936/32/12023/55985/5f97d5e7Ecf2c68e1/5de70e901202a506.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pvObj: {},
            tabIndex: 0,
            pageIndex: 0,
            hasAuth: true,
        };
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.getPvData();
        this.onTabClick(0)(); // 自动切换
        this.getAuth();
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.clearAllTimeout([this.timeout, this.tabTimeout]);
    }

    getAuth = async () => {
        const { data: { authCode } = {} } = await post({ url: "Auth", data: {} });
        this.setState({ hasAuth: authCode !== "9002" });
    };

    callTimeout = () => {
        this.timeout = setTimeout(() => {
            this.getPvData();
        }, 5000);
    };

    getPvData = async () => {
        const reqParm = {
            url: "TodayPv",
            data: {},
        };
        const { data = {}, success } = await post(reqParm);
        if (success) {
            this.setState({ pvObj: data });
        }

        if (this && this.callTimeout) {
            this.callTimeout();
        }
    };

    renderTotalCard = () => {
        const {
            pvObj: { pharmacy, hospital, urgentSend },
            hasAuth,
        } = this.state;
        const { location } = this.props;
        return (
            <div className = {styles["home-chart-right-total"]}>
                <TotalCard title = "大药房-处方药" url = "DrugStoreTotal" pvData = {pharmacy} pvTitle = "今日累计结算页请求量" location = {location} hasDataAuth = {hasAuth} />
                <TotalCard title = "互联网医院" url = "InterTotal" pvData = {hospital} pvTitle = "今日累计预问诊请求量" location = {location} hasDataAuth = {hasAuth} />
                <TotalCard title = "药急送" url = "UrgentTotal" pvData = {urgentSend} pvTitle = "今日累计首页请求量" location = {location} hasDataAuth = {hasAuth} />
                {/* <TotalCard title = "药京采" url = "YjcTotal" pvData = {yjc} pvTitle = "今日累计加购请求量" location = {location} /> */}
            </div>
        );
    };

    /**
     * 右下角图片容器
     */
    renderNotAppChart = () => (
        <div className = {styles["home-chart-right-chart"]}>
            {this.renderBigDrugStore()}
            {this.renderInterHospital()}
            {this.renderDrugUrgent()}
        </div>
    );

    /**
     * 右下角大药房图表容器组件
     * @returns
     */
    renderBigDrugStore = () => {
        const { hasAuth } = this.state;
        return (
            <div className = {styles["home-chart-right-drugStore"]}>
                <RealTimeTrend
                    id = "drugStoreRealTimeTrend"
                    title = "大药房下单量趋势"
                    legend = {["今日", "618"]}
                    url = "DrugStoreRealTimeTrend"
                    titleConfig = {comTitle}
                    legendConfig = {{ ...comLegend, ...genLegendIcon("drugSingle") }}
                    lineStyle = {drugRealLineStyle}
                    areaStyle = {genAreaStyle("drugSingle")}
                    gridConfig = {comGrid}
                    labelConfig = {labelConfig}
                    hasDataAuth = {hasAuth}
                />
                <OrderQuantityTrend
                    title = "大药房大促期间下单量趋势"
                    legend = {["大药房下单量"]}
                    id = "drugStoreQuantityTrend"
                    url = "DrugStoreQuantityTrend"
                    titleConfig = {comTitle}
                    legendConfig = {barLegend}
                    gridConfig = {drugQuantityGrid}
                    itemStyle = {drugQuantityBar}
                    className = {styles["home-chart-right-drugStore-bar"]}
                    labelConfig = {labelConfig}
                    hasDataAuth = {hasAuth}
                />
            </div>
        );
    };

    /**
     * 互联网医院
     */
    renderInterHospital = () => {
        const { hasAuth } = this.state;
        return (
            <div className = {styles["home-chart-right-hospital"]}>
                <RealTimeTrend
                    id = "hospitalRealTimeTrend"
                    title = "互联网问诊下单量实时趋势"
                    legend = {["今日", "618"]}
                    url = "InterRealTimeTrend"
                    titleConfig = {comTitle}
                    legendConfig = {{ ...comLegend, ...genLegendIcon("hospitalSingle") }}
                    lineStyle = {genRealLineStyle("hospitalSingle")}
                    areaStyle = {genAreaStyle("hospitalSingle")}
                    gridConfig = {comGrid}
                    hasDataAuth = {hasAuth}
                />
                <OrderQuantityTrend
                    title = "互联网大促期间问诊下单量趋势"
                    legend = {["互联网医院问诊下单量"]}
                    id = "hospitalQuantityTrend"
                    url = "InterQuantityTrend"
                    titleConfig = {comTitle}
                    legendConfig = {barLegend}
                    gridConfig = {drugQuantityGrid}
                    itemStyle = {genQuatityBar("hospitalSingle")}
                    className = {styles["home-chart-right-drugStore-bar"]}
                    labelConfig = {labelConfig}
                    hasDataAuth = {hasAuth}
                />
            </div>
        );
    };

    /**
     * 药急送
     */
    renderDrugUrgent = () => {
        const { hasAuth } = this.state;
        return (
            <div className = {styles["home-chart-right-urgent"]}>
                <RealTimeTrend
                    id = "urgentRealTimeTrend"
                    title = "药急送下单量实时趋势"
                    legend = {["今日", "618"]}
                    url = "UrgentRealTimeTrend"
                    titleConfig = {comTitle}
                    legendConfig = {{ ...comLegend, ...genLegendIcon("ergentSingle") }}
                    lineStyle = {genRealLineStyle("ergentSingle")}
                    areaStyle = {genAreaStyle("ergentSingle")}
                    gridConfig = {comGrid}
                    hasDataAuth = {hasAuth}
                />
                <OrderQuantityTrend
                    title = "药急送大促期间下单量趋势"
                    legend = {["药急送下单量"]}
                    id = "urgentQuantityTrend"
                    url = "UrgentQuantityTrend"
                    titleConfig = {comTitle}
                    legendConfig = {barLegend}
                    gridConfig = {drugQuantityGrid}
                    itemStyle = {genQuatityBar("ergentSingle")}
                    className = {styles["home-chart-right-drugStore-bar"]}
                    labelConfig = {labelConfig}
                    hasDataAuth = {hasAuth}
                />
            </div>
        );
    };

    renderTitle = () => (
        <div className = {styles["home-title"]}>
            <div className = {styles["home-title-left"]}>
                <div className = {styles["home-title-left-main"]}>京东健康产研实时监控大屏</div>
                <Time className = {styles["home-title-time"]} />
            </div>
            <div className = {styles["home-title-left-sub"]}>Real-time Monitor-control Platform of Product R&D Department</div>
        </div>
    );

    getAppCls = () => {
        const { tabIndex } = this.state;
        return classnames(styles["home-chart-left-text"], {
            [styles["home-chart-left-not-active"]]: tabIndex === 0,
        });
    };

    getProgCls = () => {
        const { tabIndex } = this.state;
        return classnames(styles["home-chart-left-text"], {
            [styles["home-chart-left-not-active"]]: tabIndex === 1,
        });
    };

    clearAllTimeout = data => {
        data.forEach(item => {
            if (item) {
                clearTimeout(item);
            }
        });
    };

    onTabClick = tabIndex => () => {
        this.clearAllTimeout([this.tabTimeout]);
        const { location: { query: { change, interval = 60000 } = {} } = {} } = this.props;
        this.setState({ tabIndex }, () => {
            if (change) {
                this.tabTimeout = setTimeout(() => {
                    this.switchTab(tabIndex);
                }, parseInt(interval, 10));
            } else {
                this.clearAllTimeout([this.tabTimeout]);
            }
        });
    };

    switchTab = tabIndex => {
        this.onTabClick(tabIndex === 0 ? 1 : 0)();
    };

    callTabTimeout = () => {
        this.tabTimeout = setTimeout(() => {
            this.switchTab();
        }, 60000);
    };

    renderAppTitleText = () => {
        const { tabIndex } = this.state;
        const appCls = this.getAppCls();
        const progCls = this.getProgCls();
        const appContentCls = classnames(styles["home-chart-left-container"], {
            [styles["home-chart-left-right-bg"]]: tabIndex === 0,
            [styles["home-chart-left-left-bg"]]: tabIndex === 1,
        });

        return (
            <div className = {appContentCls}>
                {/* <div className = {appCls} onClick = {this.onTabClick(0)}>京东健康APP</div>
                <div className = {progCls} onClick = {this.onTabClick(1)}>京东健康小程序</div> */}
                <div className = {progCls} onClick = {this.onTabClick(0)}>
                    京东健康小程序
                </div>
                <div className = {appCls} onClick = {this.onTabClick(1)}>
                    京东健康APP
                </div>
            </div>
        );
    };

    renderHealthApp = () => {
        const {
            pvObj: { healthApp },
            hasAuth,
        } = this.state;

        const cls = classnames(styles["home-chart-left-content"]);

        return (
            <div className = {cls}>
                <HealthAppCard
                    title = {["京东健康APP", "京东健康小程序"]}
                    url = "AppTotal"
                    pvData = {healthApp}
                    onClick = {this.onChangeTab}
                    className = {styles["home-chart-app-card"]}
                    pvTitle = "今日累计首页请求量"
                    hasDataAuth = {hasAuth}
                />
                <div className = {styles["home-chart-app-container"]}>
                    <RealTimeTrend
                        id = "appRealTrend"
                        title = "实时下单量趋势"
                        legend = {["今日", "618"]}
                        url = "AppRealTimeTrend"
                        titleConfig = {titleConfig}
                        legendConfig = {legendConfig}
                        lineStyle = {genRealLineStyle("appSingle")}
                        areaStyle = {genAreaStyle("appSingle")}
                        style = {{ height: "280px" }}
                        hasDataAuth = {hasAuth}
                    />
                    <OrderQuantityTrend
                        title = "大促期间下单量趋势"
                        legend = {["京东健康APP下单量"]}
                        id = "appQuantityTrend"
                        url = "AppQuantityTrend"
                        titleConfig = {titleConfig}
                        lineStyle = {genRealLineStyle("appSingle")}
                        itemStyle = {genQuatityBar("appSingle")}
                        legendConfig = {appQuatitylegend}
                        style = {{ height: "318px", marginTop: "8px" }}
                        hasDataAuth = {hasAuth}
                    />
                </div>
            </div>
        );
    };

    renderMiniPrograme = () => {
        const {
            pvObj: { healthAppLets },
            hasAuth,
        } = this.state;

        const cls = classnames(styles["home-chart-left-content"]);

        return (
            <div className = {cls}>
                <HealthAppCard
                    title = {["京东健康APP", "京东健康小程序"]}
                    url = "MiniProgTotal"
                    pvData = {healthAppLets}
                    onClick = {this.onChangeTab}
                    className = {styles["home-chart-app-card"]}
                    pvTitle = "今日累计商详请求量"
                    hasDataAuth = {hasAuth}
                />
                <div className = {styles["home-chart-app-container"]}>
                    <RealTimeTrend
                        id = "miniRealTrend"
                        title = "实时下单量趋势"
                        legend = {["今日", "618"]}
                        url = "MiniProgRealTimeTrend"
                        titleConfig = {titleConfig}
                        legendConfig = {legendConfig}
                        lineStyle = {genRealLineStyle("appSingle")}
                        areaStyle = {genAreaStyle("appSingle")}
                        style = {{ height: "280px" }}
                        hasDataAuth = {hasAuth}
                    />
                    <OrderQuantityTrend
                        title = "大促期间下单量趋势"
                        legend = {["京东健康小程序下单量"]}
                        id = "miniQuantityTrend"
                        url = "MiniProgQuantityTrend"
                        titleConfig = {titleConfig}
                        lineStyle = {genRealLineStyle("appSingle")}
                        itemStyle = {genQuatityBar("appSingle")}
                        legendConfig = {appQuatitylegend}
                        style = {{ marginTop: "8px" }}
                        hasDataAuth = {hasAuth}
                    />
                </div>
            </div>
        );
    };

    /**
     * 左侧app容器包含总数统计、实时趋势
     * @returns
     */
    renderApp = () => {
        const { tabIndex } = this.state;
        const icon = this.getAppIcon();
        const iconCls = this.getIconCls();

        return (
            <div className = {styles["home-chart-left"]}>
                <div className = {styles["home-chart-left-grid"]}>
                    <img className = {iconCls} src = {icon} width = {10} height = {28} alt = "" />
                    {this.renderAppTitleText()}

                    {/* { tabIndex === 0 && this.renderHealthApp() }
                    { tabIndex === 1 && this.renderMiniPrograme()} */}
                    {tabIndex === 0 && this.renderMiniPrograme()}
                    {tabIndex === 1 && this.renderHealthApp()}
                </div>
            </div>
        );
    };

    /**
     * 切换Tab是修改对应的url以加载不同的程序
     * @param {*} index 0表示app 1表示mini program
     */
    onChangeTab = tabIndex => {
        this.setState({
            tabIndex,
        });
    };

    getAppIcon = () => {
        const { tabIndex } = this.state;
        return tabIndex === 0 ? titleDecorate : rightTitleIcon;
    };

    getIconCls = () => {
        const { tabIndex } = this.state;
        return styles[`home-chart-left-${tabIndex === 0 ? "app" : "program"}`];
    };

    renderSecScreen = () => {
        const { pvObj, pageIndex, hasAuth } = this.state;
        const containerCls = classnames({
            // [styles.hide]: pageIndex === 1,
            [styles["home-page-common"]]: true,
            [styles["home-page-show"]]: pageIndex === 1,
        });

        return <SecContainer pvObj = {pvObj} className = {containerCls} hasDataAuth = {hasAuth} />;
    };

    onIconClick = () => {
        const { pageIndex } = this.state;
        this.setState({ pageIndex: pageIndex === 0 ? 1 : 0 });
    };

    renderScreenIcon = () => {
        const leftCls = classnames(styles["home-icon-com"], styles["home-icon-left"]);
        const rightCls = classnames(styles["home-icon-com"], styles["home-icon-right"]);

        return (
            <>
                <img className = {leftCls} src = {leftImg} alt = "" onClick = {this.onIconClick} />
                <img className = {rightCls} src = {rightImg} alt = "" onClick = {this.onIconClick} />
            </>
        );
    };

    render() {
        const { pageIndex } = this.state;
        const firstPage = classnames(styles["home-chart-container"], {
            // [styles.hide]: pageIndex === 1,
            [styles["home-page-common"]]: true,
            [styles["home-page-show"]]: pageIndex === 0,
        });

        return (
            <div className = {styles.home} ref = {this.ref}>
                <WaterMark />
                {this.renderTitle()}
                <div className = {firstPage}>
                    {this.renderApp()}
                    <div className = {styles["home-chart-right"]}>
                        {this.renderTotalCard()}
                        {this.renderNotAppChart()}
                    </div>
                </div>
                {this.renderSecScreen()}
                {this.renderScreenIcon()}
            </div>
        );
    }
}

export default Home;
