import React, { Component } from "react";
// import authArr from '@/utils/auth';
import classnames from "classnames";
import { post } from "../../services";
import FormatNum from "../FormatNum";

import styles from "./index.less";

const PREFIX = "health-mag";

const defaultProps = {
    title: "大药房",
    interval: 5000,
    pvData: 0,
    pvTitle: "今日累积PV",
};

class HealthMagCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderSumMoney: 0,
        };
    }

    componentDidMount() {
        this.getData();
        this.getAuth();
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    callTimeout = () => {
        const { interval } = this.props;
        this.timeout = setTimeout(() => {
            this.getData();
        }, interval);
    };

    getReqParam = () => {
        const { url } = this.props;
        const data = {
            url,
            data: {},
        };
        return data;
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

    /**
     * 数字千分位处理
     * @param {*} data
     */
    handleData = data => {
        const { orderCount, rightCount, orderSumMoney = 0 } = data;
        this.setState({
            orderCount,
            orderSumMoney: orderSumMoney || 0,
            rightCount,
        });
    };

    getAuth = async () => {
        const { success, data: { pin, hasAuth } = {} } = await post({ url: "Auth", data: {} });
        if (success) {
            this.pin = pin;
            this.hasAuth = hasAuth;
        }
    };

    handleMoney = data => {
        if (Object.prototype.toString.call(data) === "[object Number]" && (data >= 10000 && data < 100000000)) {
            return `${parseFloat(data / 10000).toFixed(2)}万`;
        }

        if (Object.prototype.toString.call(data) === "[object Number]" && data >= 100000000) {
            return `${parseFloat(data / 100000000).toFixed(4)}亿`;
        }

        return 0;
    };

    renderAmount = () => {
        const { orderSumMoney } = this.state;
        const { location: { query: { money } = {} } = {} } = this.props;
        if (!money || !this.hasAuth) return "";
        const showVal = this.handleMoney(orderSumMoney);
        if (showVal === 0) return "";

        return <div className = {styles[`${PREFIX}-money`]}>{`￥${showVal}`}</div>;
    };

    render() {
        const { title, pvTitle, className } = this.props;
        const { orderCount, rightCount } = this.state;

        const containerCls = classnames(styles[`${PREFIX}`], className);

        return (
            <div className = {containerCls}>
                <span className = {styles[`${PREFIX}-title`]}>{title}</span>
                <div className = {styles[`${PREFIX}-pv`]}>{pvTitle}</div>
                <FormatNum data = {rightCount} numFormat = {[0, "", ", "]} className = {styles[`${PREFIX}-pv-num`]} />
                <span className = {styles[`${PREFIX}-order`]}>今日累计下单量</span>
                <FormatNum data = {orderCount} numFormat = {[0, "", ", "]} className = {styles[`${PREFIX}-order-num`]} />
                {this.renderAmount()}
            </div>
        );
    }
}

HealthMagCard.defaultProps = defaultProps;

export default HealthMagCard;
