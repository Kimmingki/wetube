const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

// 경로를 줄여 쓰기 위해서
const BASE_JS = "./src/client/js/";

module.exports = {
  // webpack.config.js 필수 사항 (entry, output)
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
  },
  // JS 코드에서 CSS를 분리하기 위해서
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    // output path는 절대경로로 적어야함
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        // js 파일들을 babel을 통해서 변환하기
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
