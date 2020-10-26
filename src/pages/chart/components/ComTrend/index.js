import React, { Component } from "react";
import classnames from "classnames";
import propTypes from "prop-types";
import RealTimeTrend from "../RealTimeTrend";
import OrderQuantityTrend from "../OrderQuantityTrend";

import styles from "./index.less";

class ComTrend extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { className } = this.props;
        const containerCls = classnames(styles["com-trend"], className);

        return <div className = {containerCls} />;
    }
}

ComTrend.propTypes = propTypes;

export default ComTrend;
