/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { formatMoney, UUID } from "@/utils/utils";

import styles from "./index.less";

const defaultProps = {
    data: 0,
    numFormat: [0, "", ", "],
    hasAuth: true,
};

const propTypes = {
    data: PropTypes.number,
    numFormat: PropTypes.array,
    hasAuth: PropTypes.bool,
};

class FormatNum extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleData = () => {
        const { data, numFormat } = this.props;
        return formatMoney(data, ...numFormat);
    };

    isNum = val => {
        const parseFloatVal = parseFloat(val);
        // eslint-disable-next-line no-restricted-globals
        return !isNaN(parseFloatVal) && typeof parseFloatVal === "number";
    };

    renderNum = () => {
        const { hasAuth } = this.props;
        const data = this.handleData();
        // const data = 0;
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
            <div className = {styles["format-num-text-list"]}>
                {`${data}`.split("").map(item => {
                    const isNumber = this.isNum(item);
                    const cls = classnames({
                        [styles["format-num-num"]]: isNumber,
                    });

                    return (
                        <span className = {cls} key = {UUID()}>
                            {hasAuth ? item : "*"}
                        </span>
                    );
                })}
            </div>
        );
    };

    render() {
        const { className } = this.props;
        const cls = classnames(className, styles["format-num"]);
        return <div className = {cls}>{this.renderNum()}</div>;
    }
}

FormatNum.defaultProps = defaultProps;
FormatNum.propTypes = propTypes;

export default FormatNum;
