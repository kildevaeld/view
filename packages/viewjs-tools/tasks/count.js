const
    fs = require('mz/fs'),
    Path = require('path');


async function count() {
    const path = Path.join(__dirname, "../..");
    const models = await fs.readdir(path);

    let lines = 0;
    for (let model of models) {
        const p = Path.join(path, model, `dist/${model.replace("-", '.')}.es6`);
        if (await fs.exists(p)) {
            let buffer = await fs.readFile(p, 'utf8');
            lines += (buffer.match(/\r?\n/g) || '').length + 1
        }
    }

    console.log('lines', lines);

}

count()