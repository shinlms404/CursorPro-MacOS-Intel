#!/usr/bin/env node

const fs = require('fs');

// 用于存储已生成名字的文件
const HISTORY_FILE = 'generated-names.json';

const NAMES_DATASET = 'names-dataset.txt';

// 读取已生成的名字记录
function readGeneratedNames() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("读取历史记录失败:", err);
  }
  return [];
}

// 保存新生成的名字到历史记录
function saveGeneratedName(fullName) {
  const history = readGeneratedNames();
  history.push(fullName);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  console.log(`已保存到历史记录，共有 ${history.length} 个记录`);
}

// 读取文件中的名字
fs.readFile(NAMES_DATASET, 'utf8', (err, data) => {
  if (err) {
    console.error("读取文件失败:", err);
    return;
  }

  // 将文件内容按行分割成数组并首字母大写
  const names = data.split('\n')
    .map(name => name.trim())
    .filter(Boolean)
    .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

  // 读取历史记录
  const generatedHistory = readGeneratedNames();

  // 生成一个未使用过的名字
  let fullName;
  let attempts = 0;
  const MAX_ATTEMPTS = 500;

  do {
    // 随机选择名字
    const randomFirstName = names[Math.floor(Math.random() * names.length)];
    const randomLastName = names[Math.floor(Math.random() * names.length)];

    fullName = `${randomFirstName} ${randomLastName}`;
    attempts++;

    // 如果尝试次数过多，可能所有组合都已使用
    if (attempts >= MAX_ATTEMPTS) {
      console.log("警告: 大多数可能的名字组合已被使用");
      break;
    }
  } while (generatedHistory.includes(fullName));

  // 输出随机生成的全名
  console.log(`随机生成的全名是: ${fullName}`);

  // 如果是新名字，保存到历史记录
  if (!generatedHistory.includes(fullName)) {
    saveGeneratedName(fullName);
  } else {
    console.log("注意: 这个名字之前已经生成过，但无法找到新的组合");
  }
});
