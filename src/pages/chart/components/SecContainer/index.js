import React, { Component } from "react";
import classnames from "classnames";
import SecTotal from "../SecTotal";
import TrendContainer from "../TrendContainer";

import styles from "./index.less";

const PREFIX = "container";

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
        const { pvObj } = this.props;
        return (
            <div className = {this.getContainerCls()}>
                <div className = {styles[`${PREFIX}-card`]}>
                    <SecTotal pvObj = {pvObj} />
                </div>
                <TrendContainer />
            </div>
        );
    }
}

export default SecContainer;
