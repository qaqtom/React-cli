module.exports = {
    // plugins: [
    //   "@babel/plugin-transform-block-scoping",
    //   "@babel/plugin-transform-arrow-functions"
    // ]
    presets: [
        ["@babel/preset-env", {
            // targets: ">1%"
            useBuiltIns: "entry",
            corejs: 3
        }],
        ["@babel/preset-react"],
        ["@babel/preset-typescript"]
    ]
}