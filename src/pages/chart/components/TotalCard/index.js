import React, { Component } from "react";
// import authArr from '@/utils/auth';
import { connect } from "dva";
import classnames from "classnames";
import eyeSrc from "@/assets/image/eye.png";
import eyeCloseSrc from "@/assets/image/eye-close.png";
import { post } from "../../services";
import FormatNum from "../FormatNum";
// import { hasDataAuth } from "../../Home/templateData";

import styles from "./index.less";

const defaultProps = {
    title: "大药房",
    interval: 5000,
    pvData: 0,
    pvTitle: "今日累积PV",
    hasDataAuth: true,
};

let dispatch;

@connect(({ home }) => ({
    ...home,
}))
class TotalCard extends Component {
    constructor(props) {
        super(props);
        ({ dispatch } = props);
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

    callModel = (type, data, callback) => {
        if (dispatch) {
            dispatch({
                type: `home/${type}`,
                payload: data,
                callback,
            });
        }
    };

    getData = async () => {
        const { success, data, code } = await post(this.getReqParam());
        if (success) {
            this.handleData(data, code);
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
        const { orderCount, orderSumMoney = 0, code } = data;
        this.setState({
            orderCount,
            orderSumMoney: orderSumMoney || 0,
            code,
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

        return <div className = {styles["total-card-money"]}>{`￥${showVal}`}</div>;
    };

    renderEye = () => {
        const { showIcon, close } = this.props;
        if (!showIcon) return null;

        return (
            <div className = {styles["total-card-title-content"]}>
                <img className = {styles["total-card-title-content-image"]} src = {close ? eyeCloseSrc : eyeSrc} alt = "" />
            </div>
        );
    };

    render() {
        const { title, pvData, pvTitle, className, hasDataAuth } = this.props;
        const { orderCount, code } = this.state;

        const containerCls = classnames(styles["total-card"], className);

        return (
            <div className = {containerCls}>
                <div className = {styles["total-card-title"]}>
                    {title}
                    {this.renderEye()}
                </div>
                <div className = {styles["total-card-pv"]}>{pvTitle}</div>
                <FormatNum data = {pvData} numFormat = {[0, "", ", "]} className = {styles["total-card-pv-num"]} />
                <span className = {styles["total-card-order"]}>今日累计下单量</span>
                <FormatNum className = {styles["total-card-order-num"]} data = {orderCount} numFormat = {[0, "", ", "]} hasAuth = {hasDataAuth} />
                {this.renderAmount(code)}
            </div>
        );
    }
}

TotalCard.defaultProps = defaultProps;

export default TotalCard;
