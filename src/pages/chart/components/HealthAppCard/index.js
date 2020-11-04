/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { connect } from "dva";
import classnames from "classnames";
import { formatMoney } from "@/utils/utils";
import eyeSrc from "@/assets/image/eye.png";
import eyeCloseSrc from "@/assets/image/eye-close.png";
import { post } from "../../services";
import { isShowIcon, comIconClick, getShowState, isSuperAdmin, callComModel } from "../../Home/templateData";

import styles from "./index.less";

const defaultProps = {
    interval: 5000,
    numFormat: [0, "", ","],
    pvData: 0,
    hasDataAuth: true,
};

@connect(({ home }) => ({
    ...home,
}))
class HealthAppCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.clearAllTimeout([this.timeout, this.tabTimeout]);
    }

    clearAllTimeout = data => {
        data.forEach(item => {
            if (item) {
                clearTimeout(item);
            }
        });
    };

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
        const { orderCount, dataAuthCode } = data;
        this.setState({
            orderCount,
        });
        this.handleAuthCode(dataAuthCode);
    };

    handleAuthCode = nextCode => {
        const { dataAuthCode: currentCode } = this.state;
        const close = getShowState(this);
        if (close && isSuperAdmin(nextCode)) {
            callComModel(this, { close: false });
        }
        if (nextCode !== currentCode) {
            if (!close && !isSuperAdmin(nextCode)) {
                callComModel(this, { close: true });
            }
        }

        this.setState({ dataAuthCode: nextCode });
    };

    formatData = data => {
        const { numFormat } = this.props;
        return formatMoney(data, ...numFormat);
    };

    isNum = val => {
        const parseFloatVal = parseFloat(val);
        // eslint-disable-next-line no-restricted-globals
        return !isNaN(parseFloatVal) && typeof parseFloatVal === "number";
    };

    renderEye = () => {
        const { dataAuthCode } = this.state;
        const close = getShowState(this);
        if (!isShowIcon(dataAuthCode)) return null;
        const iconSrc = close ? eyeCloseSrc : eyeSrc;

        return (
            <div className = {styles["health-app-pv-title-content"]}>
                <img className = {styles["health-app-pv-title-content-image"]} src = {iconSrc} alt = "" onClick = {this.onIconClick} />
            </div>
        );
    };

    renderPV = () => {
        const { pvData, pvTitle } = this.props;
        const data = this.formatData(pvData);
        return (
            <div className = {styles["health-app-pv"]}>
                <div className = {styles["health-app-pv-title"]}>
                    {pvTitle}
                    {this.renderEye()}
                </div>
                <div className = {styles["health-app-pv-container"]}>
                    {`${data}`.split("").map((item, index) => {
                        const isNumber = this.isNum(item);
                        const cls = classnames({
                            [styles["health-app-pv-num"]]: isNumber,
                            [styles["health-app-pv-sign"]]: !isNumber,
                        });
                        return (
                            <span className = {cls} key = {index}>
                                {item}
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    };

    renderOrder = () => {
        const { orderCount } = this.state;
        const data = this.formatData(orderCount);
        const { hasDataAuth } = this.props;

        return (
            <div className = {styles["health-app-order"]}>
                <div className = {styles["health-app-order-title"]}>今日累计下单量</div>
                <div className = {styles["health-app-order-container"]}>
                    {`${data}`.split("").map((item, index) => {
                        const isNumber = this.isNum(item);
                        const cls = classnames({
                            [styles["health-app-order-num"]]: isNumber,
                            [styles["health-app-order-sign"]]: !isNumber,
                        });
                        return (
                            <span className = {cls} key = {index}>
                                {hasDataAuth ? item : "*"}
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    };

    onTabClick = tabIndex => () => {
        const { onClick } = this.props;
        this.setState({ tabIndex }, () => {
            this.clearAllTimeout([this.tabTimeout]);
            if (onClick) {
                onClick(tabIndex);
                // this.callTabTimeout();
            }
        });
    };

    getAppCls = () => {
        const { tabIndex } = this.state;
        return classnames(styles["health-app-title-text"], {
            [styles["health-app-title-app"]]: tabIndex === 1,
        });
    };

    getProgCls = () => {
        const { tabIndex } = this.state;
        return classnames(styles["health-app-title-text"], {
            [styles["health-app-title-program"]]: tabIndex === 0,
        });
    };

    renderTitleText = () => {
        const {
            title: [appTitle, progTitle],
        } = this.props;
        const appCls = this.getAppCls();
        const progCls = this.getProgCls();

        return (
            <div className = {styles["health-app-title-container"]}>
                <div className = {appCls} onClick = {this.onTabClick(0)}>
                    {appTitle}
                </div>
                <div className = {progCls} onClick = {this.onTabClick(1)}>
                    {progTitle}
                </div>
            </div>
        );
    };

    renderTitle = () => (
        <div className = {styles["health-app-title"]}>
            {/* { this.renderTitleText()} */}
            <div className = {styles["health-app-content"]}>
                {this.renderPV()}
                {this.renderOrder()}
            </div>
        </div>
    );

    onIconClick = () => {
        comIconClick(this);
    };

    callModel = (type, data, callback) => {
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch({
                type: `home/${type}`,
                payload: data,
                callback,
            });
        }
    };

    render() {
        const { className } = this.props;
        const cls = classnames(styles["health-app"], className);

        return <div className = {cls}>{this.renderTitle()}</div>;
    }
}

HealthAppCard.defaultProps = defaultProps;

export default HealthAppCard;
