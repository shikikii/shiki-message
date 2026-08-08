(function () {
    "use strict";

    // 随机图片尺寸
    const WIDTH = 1280;
    const HEIGHT = 720;

    // 生成随机像素图片
    function generateRandomPixelImage() {

        const canvas = document.createElement("canvas");

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error("无法创建 Canvas。");
            return null;
        }

        const imageData = ctx.createImageData(WIDTH, HEIGHT);
        const data = imageData.data;

        // 每 4 个数据 = 一个像素
        // R = 红
        // G = 绿
        // B = 蓝
        // A = 透明度

        for (let i = 0; i < data.length; i += 4) {

            data[i] = Math.floor(Math.random() * 256);
            data[i + 1] = Math.floor(Math.random() * 256);
            data[i + 2] = Math.floor(Math.random() * 256);
            data[i + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);

        return canvas;
    }


    // 保存 PNG 图片
    function saveRandomImage(canvas) {

        if (!canvas) {
            console.error("没有可保存的图片。");
            return;
        }

        const imageURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");

        link.href = imageURL;

        const now = new Date();

        const filename =
            "random-pixel-" +
            now.getFullYear() +
            String(now.getMonth() + 1).padStart(2, "0") +
            String(now.getDate()).padStart(2, "0") +
            "-" +
            String(now.getHours()).padStart(2, "0") +
            String(now.getMinutes()).padStart(2, "0") +
            String(now.getSeconds()).padStart(2, "0") +
            ".png";

        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    // 暴露给网页使用
    window.RandomPixelImage = {
        generate: generateRandomPixelImage,
        save: saveRandomImage,
        width: WIDTH,
        height: HEIGHT
    };


    // 测试信息
    console.log(
        "图片生成器已加载：" +
        WIDTH +
        " × " +
        HEIGHT
    );

})();
