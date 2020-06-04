import React, { Component } from 'react';
import { post } from '../../services';
import FormatNum from './FormatNum';

import styles from './index.less';

const defaultProps = {
    title: '大药房',
    interval: 5000,
    pvData: 0
}

class TotalCard extends Component {
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

    render() {
        const { title, pvData } = this.props;
        const { orderCount } = this.state;

        return (
            <div className = {styles['total-card']}>
                <span className = {styles['total-card-title']}>{title}</span>
                <div className = {styles['total-card-pv']}>今日累计PV</div>
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
            </div>
        );
    }
}

TotalCard.defaultProps = defaultProps;

export default TotalCard;