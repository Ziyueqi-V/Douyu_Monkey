const fs = require('fs')

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const content = fs.readFileSync('./src/header.js', 'utf8')
const newContent = content.replace(/\/\/ @version\s+.*$/m, `// @version      ${version}`)
fs.writeFileSync('./src/header.js', newContent, 'utf8')
