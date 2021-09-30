const path = require("path");

module.exports = {
  // webpack.config.js 필수 사항 (entry, output)
  entry: "./src/client/js/main.js",
  // 현재 개발중인지 완성품인지 mode를 적어줌
  mode: "development",
  output: {
    filename: "main.js",
    // output path는 절대경로로 적어야함
    path: path.resolve(__dirname, "assets", "js"),
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
