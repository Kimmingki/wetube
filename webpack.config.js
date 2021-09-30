const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  // webpack.config.js 필수 사항 (entry, output)
  entry: "./src/client/js/main.js",
  // JS 코드에서 CSS를 분리하기 위해서
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  // 현재 개발중인지 완성품인지 mode를 적어줌
  mode: "development",
  output: {
    filename: "js/main.js",
    // output path는 절대경로로 적어야함
    path: path.resolve(__dirname, "assets"),
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
