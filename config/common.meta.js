const pj = require('../package.json')
module.exports = {
  name: pj.name,
  namespace: pj.homepage,
  version: pj.version,
  description: pj.description,
  author: pj.author,
  copyright: pj.author,
  license: pj.license,
  match: ['https://cybozudev.kf5.com/hc/kb/article/*'],
  require: [
    'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js',
    'https://cdn.jsdelivr.net/npm/clipboard@2.0.10/dist/clipboard.min.js',
  ],
  'run-at': 'document-end',
  supportURL: pj.bugs.url,
  homepage: pj.homepage,
  grant: [],
  icon: 'https://img.icons8.com/ios/50/000000/happy-eyes.png',
}
