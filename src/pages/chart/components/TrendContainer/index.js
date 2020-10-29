import React, { Component } from "react";
import classnames from "classnames";
import RealTimeTrend from "../RealTimeTrend";
import OrderQuantityTrend from "../OrderQuantityTrend";
import {
    comTitle,
    comLegend,
    comGrid,
    barLegend,
    drugLabelConfig,
    drugQuantityGrid,
    drugQuantityBar,
    healthMagLabelConfig,
    genLegendIcon,
    genQuatityBar,
    genRealLineStyle,
    genAreaStyle,
} from "../../Home/templateData";

import styles from "./index.less";

const PREFIX = "trend-container";

class TrendContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContainerCls = () => {
        const { className } = this.props;
        const res = classnames(styles[`${PREFIX}`], className);
        return res;
    };

    /**
     * 健管平台
     */
    renderHealthMagTrend = () => (
        <div className = {styles[`${PREFIX}-content`]}>
            <RealTimeTrend
                id = "healthMagTrend"
                title = "健管平台实时权益量下单量趋势"
                legend = {["今日", "618"]}
                url = "HealthMagRealTimeTrend"
                titleConfig = {comTitle}
                legendConfig = {{ ...comLegend, ...genLegendIcon("appSingle") }}
                lineStyle = {genRealLineStyle("appSingle")}
                areaStyle = {genAreaStyle("appSingle")}
                gridConfig = {comGrid}
                labelConfig = {healthMagLabelConfig}
                dataField = "rightCount"
            />
            <OrderQuantityTrend
                title = "健管平台大促期间权益量趋势"
                legend = {["健管平台下单量"]}
                id = "healthMagQuantityTrend"
                url = "HealthMagQuantityTrend"
                titleConfig = {comTitle}
                legendConfig = {barLegend}
                gridConfig = {drugQuantityGrid}
                itemStyle = {genQuatityBar("appSingle")}
                className = {styles[`${PREFIX}-content-bar`]}
                labelConfig = {drugLabelConfig}
                dataField = "rightCount"
            />
        </div>
    );

    /**
     * 药京采实时趋势图
     */
    renderYjc = () => (
        <div className = {styles[`${PREFIX}-content`]}>
            <RealTimeTrend
                id = "yjcTrend"
                title = "药京采下单量实时趋势"
                legend = {["今日", "618"]}
                url = "YjcStoreRealTimeTrend"
                titleConfig = {comTitle}
                legendConfig = {{ ...comLegend, ...genLegendIcon("yjcSingle") }}
                lineStyle = {genRealLineStyle("drugSingle")}
                areaStyle = {genAreaStyle("drugSingle")}
                gridConfig = {comGrid}
                labelConfig = {healthMagLabelConfig}
            />
            <OrderQuantityTrend
                title = "药京采大促期间下单量趋势"
                legend = {["药京采下单量"]}
                id = "yjcQuantityTrend"
                url = "YjcQuantityTrend"
                titleConfig = {comTitle}
                legendConfig = {barLegend}
                gridConfig = {drugQuantityGrid}
                itemStyle = {drugQuantityBar}
                className = {styles[`${PREFIX}-content-bar`]}
                labelConfig = {drugLabelConfig}
            />
        </div>
    );

    /**
     * 菲加云
     * @returns
     */
    renderCloud = () => (
        <div className = {styles[`${PREFIX}-content`]}>
            <RealTimeTrend
                id = "cloudTrend"
                title = "菲加云下单量实时趋势"
                legend = {["今日", "618"]}
                url = "FeiJiaYunRealTimeTrend"
                titleConfig = {comTitle}
                legendConfig = {{ ...comLegend, ...genLegendIcon("hospitalSingle") }}
                lineStyle = {genRealLineStyle("hospitalSingle")}
                areaStyle = {genAreaStyle("hospitalSingle")}
                gridConfig = {comGrid}
            />
            <OrderQuantityTrend
                title = "菲加云大促期间下单量趋势"
                legend = {["菲加云下单量"]}
                id = "cloudQuantityTrend"
                url = "FeijiaYunQuantityTrend"
                titleConfig = {comTitle}
                legendConfig = {barLegend}
                gridConfig = {drugQuantityGrid}
                itemStyle = {genQuatityBar("hospitalSingle")}
                className = {styles[`${PREFIX}-content-bar`]}
                labelConfig = {drugLabelConfig}
                interval = {15000}
            />
        </div>
    );

    /**
     * 药店管家
     * @returns
     */
    renderErp = () => (
        <div className = {styles[`${PREFIX}-content`]}>
            <RealTimeTrend
                id = "erpTrend"
                title = "药店管家下单量实时趋势"
                legend = {["今日", "618"]}
                url = "SelfErpRealTimeTrend"
                titleConfig = {comTitle}
                legendConfig = {{ ...comLegend, ...genLegendIcon("ergentSingle") }}
                lineStyle = {genRealLineStyle("ergentSingle")}
                areaStyle = {genAreaStyle("ergentSingle")}
                gridConfig = {comGrid}
            />
            <OrderQuantityTrend
                title = "药店管家大促期间下单量趋势"
                legend = {["药店管家下单量"]}
                id = "erpQuantityTrend"
                url = "SelfErpQuantityTrend"
                titleConfig = {comTitle}
                legendConfig = {barLegend}
                gridConfig = {drugQuantityGrid}
                itemStyle = {genQuatityBar("ergentSingle")}
                className = {styles[`${PREFIX}-content-bar`]}
                labelConfig = {drugLabelConfig}
            />
        </div>
    );

    render() {
        return (
            <div className = {this.getContainerCls()}>
                {this.renderHealthMagTrend()}
                {this.renderYjc()}
                {this.renderCloud()}
                {this.renderErp()}
            </div>
        );
    }
}

export default TrendContainer;
