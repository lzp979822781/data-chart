import React from "react";
import { notification, Button, message } from "antd";
import { formatMessage } from "umi/locale";

// Notify user if offline now
window.addEventListener("sw.offline", () => {
    message.warning(formatMessage({ id: "app.pwa.offline" }));
});

// Pop up a prompt on the page asking the user if they want to use the latest version
window.addEventListener("sw.updated", e => {
    const reloadSW = async () => {
        // Check if there is sw whose state is waiting in ServiceWorkerRegistration
        // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
        const worker = e.detail && e.detail.waiting;
        if (!worker) {
            return Promise.resolve();
        }
        // Send skip-waiting event to waiting SW with MessageChannel
        await new Promise((resolve, reject) => {
            const channel = new MessageChannel();
            channel.port1.onmessage = event => {
                if (event.data.error) {
                    reject(event.data.error);
                } else {
                    resolve(event.data);
                }
            };
            worker.postMessage({ type: "skip-waiting" }, [channel.port2]);
        });
        // Refresh current page to use the updated HTML and other assets after SW has skiped waiting
        window.location.reload(true);
        return true;
    };
    const key = `open${Date.now()}`;
    const btn = (
        <Button
            type = "primary"
            onClick = {() => {
                notification.close(key);
                reloadSW();
            }}
        >
            {formatMessage({ id: "app.pwa.serviceworker.updated.ok" })}
        </Button>
    );
    notification.open({
        message: formatMessage({ id: "app.pwa.serviceworker.updated" }),
        description: formatMessage({ id: "app.pwa.serviceworker.updated.hint" }),
        btn,
        key,
        onClose: async () => {},
    });
});

const loadScripts = (urls, callbackFn) => {
    const callback = callbackFn || (() => {});
    // 添加script属性，并添加到head中
    const loader = (src, handler) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        // 重点！！！！script加载成功
        script.onload = () => {
            script.onload = null;
            script.onerror = null;
            handler();
        };
        script.onerror = () => {
            script.onload = null;
            script.onerror = null;
            callback({
                message: `${src}依赖未加载成功！`,
            });
        };
        const head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild(script);
    };
    // 自执行函数，用于循环loader
    const run = () => {
        if (urls.length > 0) {
            loader(urls.shift(), run);
        } else {
            callback();
        }
    };
    run();
};
(() => {
    // 添加水印
    // let $u = this.$refs.userDom;
    loadScripts(["//static.360buyimg.com/yao_static/lib/man/js/water-mark.js"], () => {
        if (!document.getElementById("wm_div_id")) {
            window.watermark.init({
                watermark_txt: "yanhaowei",
                watermark_color: "#999",
                watermark_fontsize: "20px",
                watermark_angle: 45,
                watermark_x_space: 20, // 水印x轴间隔
                watermark_y_space: 0,
                watermark_x: 0, // 水印起始位置x轴坐标
                watermark_y: 0,
                watermark_width: 300,
                watermark_height: 100,
                watermark_alpha: 0.25,
                monitor: true,
            });
        }
    });
})();
