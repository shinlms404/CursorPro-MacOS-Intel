#!/usr/bin/env node

const fs = require('fs');

// 读取文件中的名字
fs.readFile('names-dataset.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("读取文件失败:", err);
    return;
  }

  // 将文件内容按行分割成数组并首字母大写
  const names = data.split('\n')
    .map(name => name.trim())
    .filter(Boolean)
    .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

  // 随机选择名字
  const randomFirstName = names[Math.floor(Math.random() * names.length)];
  const randomLastName = names[Math.floor(Math.random() * names.length)];

  // 输出随机生成的全名
  console.log(`随机生成的全名是: ${randomFirstName} ${randomLastName}`);
});
