import React, { Component } from "react";
import { connect } from "dva";
import classnames from "classnames";
import SecTotal from "../SecTotal";
import TrendContainer from "../TrendContainer";

import styles from "./index.less";

const PREFIX = "container";

const defaultProps = {
    hasDataAuth: true,
};

@connect(({ home }) => ({
    ...home,
}))
class SecContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContainerCls = () => {
        const { className } = this.props;
        return classnames(styles[PREFIX], className);
    };

    render() {
        const { pvObj, hasDataAuth } = this.props;
        return (
            <div className = {this.getContainerCls()}>
                <div className = {styles[`${PREFIX}-card`]}>
                    <SecTotal pvObj = {pvObj} hasDataAuth = {hasDataAuth} />
                </div>
                <TrendContainer hasDataAuth = {hasDataAuth} />
            </div>
        );
    }
}

SecContainer.defaultProps = defaultProps;

export default SecContainer;
