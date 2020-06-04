/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import classnames from 'classnames';
import { formatMoney } from '@/utils/utils';
import { post } from '../../services';

import styles from './index.less';

const defaultProps = {
    timeInterval: 5000,
    numFormat: [0, '', ','],
    pvData: 0
}

class HealthAppCard extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    callTimeout = () => {
        const { interval } = this.props;
        this.timeout = setTimeout(() => {
            this.getData();
        }, interval)
    }

    getReqParam = () => {
        const { url } = this.props;
        const data = {
            url,
            data: { }
        };
        return data;
    }

    getData = async () => {
        const { success, data } = await post(this.getReqParam());
        if(success) {
            this.handleData(data);
        }

        if(this && this.callTimeout) {
            this.callTimeout();
        }
    }

    /**
     * 数字千分位处理
     * @param {*} data
     */
    handleData = data => {
        const { orderCount } = data;
        this.setState({
            orderCount,
        })
    }

    formatData = data => {
        const { numFormat } = this.props;
        return formatMoney(data, ...numFormat);
    }

    isNum = val => {
        const parseFloatVal = parseFloat(val);
        // eslint-disable-next-line no-restricted-globals
        return !isNaN(parseFloatVal) && typeof parseFloatVal === 'number';
    }

    renderPV = () => {
        const { pvData } = this.props;
        const data = this.formatData(pvData);
        return (
            <div className = {styles['health-app-pv']}>
                <div className = {styles['health-app-pv-title']}>当日累积PV</div>
                <div className = {styles['health-app-pv-container']}>
                    {
                        `${data}`.split("").map((item, index) => {
                            const isNumber = this.isNum(item);
                            const cls = classnames({
                                [styles['health-app-pv-num']]: isNumber,
                                [styles['health-app-pv-sign']]: !isNumber,
                            })
                            return <span className = {cls} key = {index}>{item}</span>
                        })
                    }
                </div>
            </div>
        );
    }

    renderOrder = () => {
        const { orderCount } = this.state;
        const data = this.formatData(orderCount);
        return (
            <div className = {styles['health-app-order']}>
                <div className = {styles['health-app-order-title']}>当日累积支付单量</div>
                <div className = {styles['health-app-order-container']}>
                    {
                        `${data}`.split("").map((item, index) => {
                            const isNumber = this.isNum(item);
                            const cls = classnames({
                                [styles['health-app-order-num']]: isNumber,
                                [styles['health-app-order-sign']]: !isNumber,
                            })
                            return <span className = {cls} key = {index}>{item}</span>
                        })
                    }
                </div>
            </div>
        );
    }

    renderTitle = () => {
        const { title } = this.props;
        return (
            <div className = {styles['health-app-title']}>
                <div className = {styles['health-app-title-text']}>{title}</div>
                { this.renderPV()}
                { this.renderOrder()}
            </div>
        );
    }

    render() {
        const { className } = this.props;
        const cls = classnames(styles['health-app'], className);

        return (
            <div className = {cls}>
                { this.renderTitle()}
            </div>
        );
    }
}

HealthAppCard.defaultProps = defaultProps;

export default HealthAppCard;