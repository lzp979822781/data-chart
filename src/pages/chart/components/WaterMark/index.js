import React, { Component } from "react";
import { loadScripts } from "@/utils/utils";
import { get } from "../../services";
import styles from "./index.less";

class WaterMark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPin: "",
        };
    }

    async componentDidMount() {
        const {
            data: { pin },
            success,
        } = await get({ url: "Auth" });
        if (success) {
            this.setState({ userPin: pin }, () => {
                this.setWaterMark();
            });
        }
    }

    getContainerSize = () => {
        const { offsetWidth = 300, offsetHeight = 100 } = this.waterRef || {};
        return { width: offsetWidth, height: offsetHeight };
    };

    setWaterMark = () => {
        const { userPin } = this.state;
        const { width, height } = this.getContainerSize();
        setTimeout(() => {
            loadScripts(["//static.360buyimg.com/yao_static/lib/man/js/water-mark.js"], () => {
                if (!document.getElementById("wm_div_id")) {
                    window.watermark.init({
                        watermark_txt: userPin,
                        watermark_color: "#999",
                        watermark_fontsize: "20px",
                        watermark_angle: 45,
                        watermark_x_space: 20, // 水印x轴间隔
                        watermark_y_space: 0,
                        watermark_x: 0, // 水印起始位置x轴坐标
                        watermark_y: 0,
                        watermark_width: width,
                        watermark_height: height,
                        watermark_alpha: 0.25,
                        monitor: true,
                    });
                }
            });
        }, 0);
    };

    setRef = el => {
        this.waterRef = el;
    };

    render() {
        const { userPin } = this.state;

        return (
            <div>
                <div className = {styles["water-mark-container"]} ref = {this.setRef}>
                    {userPin}
                </div>
            </div>
        );
    }
}

export default WaterMark;
