import React, { Component } from 'react';
import moment from 'moment';
import classnames from 'classnames';
// import { UUID } from '@/utils/utils';

import styles from './index.less';


const formatDate = `YYYY 年 MM 月 DD 日`
const formatWeek = 'dddd';
const formatTime = 'HH : mm : ss'

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [],
            week: '',
            time: []
        };
    }

    componentDidMount() {
        this.formatTime();
        this.initInterval();
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    initInterval = () => {
        this.interval = setInterval(() => {
            this.formatTime();
        }, 100);
    }

    formatTime = () => {
        const currDate = moment();
        /* const year = moment.year();
        const months = moment.months();
        const day = moment.date();
        const hour = moment.hour(); */
        // const dateStr = moment().format(format);
        this.setState({
            date: currDate.format(formatDate).split(" "),
            week: currDate.format(formatWeek),
            time: currDate.format(formatTime).split(" ")
        })
    }

    isNum = val => {
        const parseFloatVal = parseFloat(val);
        // eslint-disable-next-line no-restricted-globals
        return !isNaN(parseFloatVal) && typeof parseFloatVal === 'number'
    }

    renderDate = () => {
        const { date } = this.state;
        return date.map((item, index) => {
            const isNumber = this.isNum(item);
            const cls = classnames({
                [styles['current-date']]: isNumber,
                [styles['current-desc']]: !isNumber
            })
            // eslint-disable-next-line react/no-array-index-key
            return <span key = {index} className = {cls}>{item}</span>
        })
    }

    renderTime = () => {
        const { time } = this.state;
        if(Array.isArray(time)) {
            return time.map((item, index) => {
                const isNumber = this.isNum(item);
                const cls = classnames({
                    [styles['current-time']]: isNumber,
                    [styles['current-time-sign']]: !isNumber
                })
                // eslint-disable-next-line react/no-array-index-key
                return <span key = {index} className = {cls}>{item}</span>
            })
        }
        return time;
    }

    render() {
        const { week } = this.state;
        const { className } = this.props;
        const cls = classnames(styles.current, className)
        return (
            <div className = {cls}>
                { this.renderDate()}
                <span className = {styles['current-week']}>{week}</span>
                { this.renderTime() }
            </div>
        );
    }
}

export default Time;