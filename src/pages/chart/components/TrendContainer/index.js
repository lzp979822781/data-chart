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
    healthMagLineStyle,
    healthMagAreaStyle,
    healthMagLabelConfig,
    appQuatityBar,
    genLegendIcon,
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

    renderHealthMagTrend = () => (
        <div className = {styles[`${PREFIX}-content`]}>
            <RealTimeTrend
                id = "healthMagTrend"
                title = "健管平台实时权益量下单量趋势"
                legend = {["今日", "618"]}
                url = "HealthMagRealTimeTrend"
                titleConfig = {comTitle}
                legendConfig = {{ ...comLegend, ...genLegendIcon("drugSingle") }}
                lineStyle = {healthMagLineStyle}
                areaStyle = {healthMagAreaStyle}
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
                itemStyle = {appQuatityBar}
                className = {styles[`${PREFIX}-content-bar`]}
                labelConfig = {drugLabelConfig}
                dataField = "rightCount"
            />
        </div>
    );

    render() {
        return <div className = {this.getContainerCls()}>{this.renderHealthMagTrend()}</div>;
    }
}

export default TrendContainer;
