const PROXY_CONFIG = [
  {
    context: ['/php'],
    target: 'http://www.poatransporte.com.br/',
    secure: false,
    logLevel: 'debug',
    // pathRewrite: {'~/api':''}
  }
]

module.exports = PROXY_CONFIG;