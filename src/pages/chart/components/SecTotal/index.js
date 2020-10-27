import React, { Component } from "react";
import classnames from "classnames";
import TotalCard from "../TotalCard";
import HealthMagCard from "../HealthMagCard";
import FeijiaYunCard from "../FeijiaYunCard";
import styles from "./index.less";

const clsPrefix = "sec-total";

const comConfig = {
    healthManage: {
        title: "健管平台",
        pvTitle: "今日累计发放权益量",
        url: "HealthMagTotal",
    },
    yjc: {
        title: "药京采",
        pvTitle: "今日累计加购请求量",
        url: "YjcTotal",
    },
    feiJiaYun: {
        title: "菲加云",
        pvTitle: "今日累计下单量",
        url: "FeijiaYunTotal",
    },
    medicineErp: {
        title: "药店管家",
        pvTitle: "今日累计促销计算量",
        url: "SelfErpTotal",
    },
};

class SecTotal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContainerCls = () => {
        const { className } = this.props;
        return classnames(styles[clsPrefix], className);
    };

    getProps = field => {
        const {
            pvObj: { [field]: pvData = 0 },
            location,
        } = this.props;
        const res = {
            ...comConfig[field],
            pvData,
            location,
        };

        return res;
    };

    render() {
        return (
            <div className = {this.getContainerCls()}>
                <HealthMagCard {...this.getProps("healthManage")} className = {styles[`${clsPrefix}-card`]} />
                <TotalCard {...this.getProps("yjc")} className = {styles[`${clsPrefix}-card`]} />
                <FeijiaYunCard {...this.getProps("feiJiaYun")} className = {styles[`${clsPrefix}-card`]} />
                <TotalCard {...this.getProps("medicineErp")} className = {styles[`${clsPrefix}-card`]} />
            </div>
        );
    }
}

export default SecTotal;