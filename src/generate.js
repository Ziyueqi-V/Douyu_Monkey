const sass = require('sass');
const fs = require('fs');

const header = fs.readFileSync('./src/header.js');
const body = fs.readFileSync('./src/body.js', "utf8");

// 编译SCSS为CSS
const cssResult = sass.compile("./src/index.scss");

// 将CSS转换为字符串
const cssString = cssResult.css;

// 将CSS字符串注入到JavaScript文件中
const newBody = body.replace('/* CSS_PLACEHOLDER */', cssString);

const newFile = header + "\n" + newBody;

fs.writeFileSync('./Douyu_Monkey.user.js', newFile);

console.log('user.js generated');

// // 读取package.json文件
// fs.readFile('package.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   try {
//     const packageData = JSON.parse(data);
//     const packageName = packageData.name;

//     // 按下划线分隔并将每个词的首字母大写
//     const words = packageName.split('_');
//     const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

//     const formattedName = capitalizedWords.join('');

//     console.log(`Formatted package name: ${formattedName}`);
//   } catch (error) {
//     console.error('Error parsing package.json:', error);
//   }
// });
