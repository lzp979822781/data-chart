import React, { Component } from 'react';
import authArr from '@/utils/auth';
import { post } from '../../services';
import FormatNum from './FormatNum';

import styles from './index.less';

const defaultProps = {
    title: '大药房',
    interval: 5000,
    pvData: 0,
    pvTitle: '今日累积PV'
}

class TotalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderSumMoney: 0
        };
    }

    componentDidMount() {
        this.getData();
        this.getAuth();
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
        const { orderCount, orderSumMoney = 0 } = data;
        this.setState({
            orderCount,
            orderSumMoney: orderSumMoney || 0
        })
    }

    getAuth = async () => {
        const { success, data: { pin, hasAuth } = {} } = await post({ url: 'Auth', data: {} });
        if(success) {
            this.pin = pin;
            this.hasAuth = hasAuth;
        }
    }

    handleMoney = data => {
        if(Object.prototype.toString.call(data) === "[object Number]" && data > 9999) {
            return `${parseFloat(data / 10000).toFixed(2)}万`
        }

        return 0;
    }

    renderAmount = () => {
        const { orderSumMoney } = this.state;
        const { location: { query: { money } = {} } = {} } = this.props;
        if(!money || !this.hasAuth) return '';
        const showVal = this.handleMoney(orderSumMoney);
        if(showVal === 0) return '';

        return (
            <div className = {styles['total-card-money']}>
                { `￥${showVal}`}
            </div>
        );
    }

    render() {
        const { title, pvData, pvTitle } = this.props;
        const { orderCount } = this.state;

        return (
            <div className = {styles['total-card']}>
                <span className = {styles['total-card-title']}>{title}</span>
                <div className = {styles['total-card-pv']}>{pvTitle}</div>
                <FormatNum
                    data = {pvData}
                    numFormat = {[ 0, '', ', ']}
                    className = {styles['total-card-pv-num']}
                />
                <span className = {styles['total-card-order']}>今日累计下单量</span>
                <FormatNum
                    data = {orderCount}
                    numFormat = {[ 0, '', ', ']}
                    className = {styles['total-card-order-num']}
                />
                { this.renderAmount()}
            </div>
        );
    }
}

TotalCard.defaultProps = defaultProps;

export default TotalCard;