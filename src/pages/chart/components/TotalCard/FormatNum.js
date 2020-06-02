/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatMoney } from '@/utils/utils';

import styles from './index.less';

const defaultProps = {
    data: 0,
    numFormat: [2, '']
}

const propTypes = {
    data: PropTypes.number,
    numFormat: PropTypes.array
}

class FormatNum extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    handleData = () => {
        const { data, numFormat } = this.props;
        return formatMoney(data, ...numFormat);
    }

    isNum = val => {
        const parseFloatVal = parseFloat(val);
        // eslint-disable-next-line no-restricted-globals
        return !isNaN(parseFloatVal) && typeof parseFloatVal === 'number'
    }

    renderNum = () => {
        const data = this.handleData();
        // console.log("decimal data", data);
        // return data;
        /* return `${data}`.split('').map( (item, index) => {
            const isNumber = this.isNum(item);
            const cls = classnames({
                [styles['format-num-num']]: isNumber
            })
            // eslint-disable-next-line react/no-array-index-key
            return <span key = {index} className = {cls}>{item}</span>;
        }); */

        return (
            <TransitionGroup className = {styles['format-num-text-list']}>
                {
                    `${data}`.split('').map( (item, index) => {
                        const isNumber = this.isNum(item);
                        const cls = classnames({
                            [styles['format-num-num']]: isNumber
                        })

                        return (
                            <CSSTransition
                                key = {index}
                                timeout = {1000}
                                onEnter = {e => {
                                    e.style.backgroundPositionY = `0`
                                }}
                                onEntering = {e => {
                                    e.style.backgroundPositionY = `${-3 * ( isNumber ? item : 0) - 30}rem`
                                    e.style.transitionProperty = "background-position-y"
                                    e.style.transitionDuration = `${(index + 1) * 100}ms`
                                    e.style.transitionTimingFunction = "ease-out"
                                }}
                            >
                                <span className = {cls}>{item}</span>
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
        )
    }

    render() {
        const { className } = this.props;
        const cls = classnames(className, styles['format-num'])
        return (
            <div className = {cls}>
                { this.renderNum()}
            </div>
        );
    }
}

FormatNum.defaultProps = defaultProps;
FormatNum.propTypes = propTypes;

export default FormatNum;