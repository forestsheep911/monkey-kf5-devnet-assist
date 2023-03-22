const pj = require('../package.json')
module.exports = {
  name: `pj.name`,
  namespace: pj.homepage,
  version: '0.0.1',
  description: pj.description,
  author: pj.author,
  copyright: pj.author,
  license: pj.license,
  match: ['https://*'],
  require: [],
  'run-at': 'document-end',
  supportURL: pj.bugs.url,
  homepage: pj.homepage,
  grant: [],
  icon: 'https://img.icons8.com/ios/50/000000/happy-eyes.png',
}
