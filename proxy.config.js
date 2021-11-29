// {
//   "/api": {
//     "target": "http://www.poatransporte.com.br/",
//     "secure": false,
//     "logLevel":"debug",
//     "pathRewrite": {
//       "~/api":""
//     }
//   }
// }

const proxy = [
  {
    context: '/api',
    target: 'http://www.poatransporte.com.br',
    changeOrigin: true,
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;