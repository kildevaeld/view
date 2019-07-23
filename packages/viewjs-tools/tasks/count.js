const fs = require('mz/fs'), Path = require('path');


async function count() {
  const path = Path.join(__dirname, '../..');
  const models = await fs.readdir(path);

  let totalLines = 0;
  for (let model of models) {
    const p = Path.join(path, model, `dist/${model.replace('-', '.')}.es6`);
    if (await fs.exists(p)) {
      let buffer = await fs.readFile(p, 'utf8');
      let lines = (buffer.match(/\r?\n/g) || '').length + 1;
      console.log(`${model}\t\t${lines}`);
      totalLines += lines;
    }
  }

  console.log('Total', totalLines);
}

count()