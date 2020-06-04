import React, { Component } from 'react';
import { post } from '../../services';
import FormatNum from './FormatNum';

import styles from './index.less';

const defaultProps = {
    title: '大药房',
    timeInterval: 5000,
    pvData: 0
}

class TotalCard extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.getData();
        this.initInterVal();
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    initInterVal = () => {
        const { timeInterval } = this.props;
        this.interval = setInterval(() => {
            this.getData();
        }, timeInterval);
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
        } else {
            clearInterval(this.timeInterval);
            if(this && this.initInterval) {
                this.initInterval();
            }
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
                <div className = {styles['total-card-pv']}>当日累计PV</div>
                <FormatNum
                    data = {pvData}
                    numFormat = {[ 0, '', ', ']}
                    className = {styles['total-card-pv-num']}
                />
                <span className = {styles['total-card-order']}>当日累计支付单量</span>
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