module.exports = {
  plugins: {
    autoprefixer: {
      "postcss-px-to-viewport" :{
        viewportWidth:375, //视口宽度，对应的是我们设计稿的宽度
        viewportHeight: 667,//视口高度对应的是我们设计稿的高度
        unitPrecision: 5,//保留五位小数
        viewportUnit: 'vw',//指定需要转换成的视口单位，建议使用vw
        selectorBlackList:['ignore','tab-bar','tab-bar-item'],
        minPixelValue: 1,//小于或等于1px不转换为视窗单位
        mediaQuery: false//允许在媒体查询中转换'px'
      }
    }
  }
}
