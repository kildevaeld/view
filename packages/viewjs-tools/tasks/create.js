const mkdirp = require('mkdirp'),
    fs = require('mz/fs'),
    os = require('os'),
    Path = require('path'),
    inquirer = require('inquirer'),
    template = require('lodash.template')

const packageBasePath = Path.join(__dirname, '../..');


const mkdir = (path) => new Promise((res, rej) => {
    mkdirp(path, (err) => {
        if (err) return rej(err)
        res();
    })
})

async function createPackage() {

    let name;

    if (process.argv.length < 3) {
        const ans = await inquirer.prompt([{
            name: 'name',
        }]);

        name = ans.name
    } else {
        name = process.argv[2];

    }

    packagePath = Path.join(packageBasePath, 'viewjs-' + name);

    if (await fs.exists(packagePath)) {
        throw Error(`package with name ${name} already exists`);
    }

    await mkdirp(packagePath);
    await mkdirp(Path.join(packagePath, 'src'));

    const out = await Promise.all([
        'gulpfile.js',
        'package.json',
        'rollup.config.js',
        'tsconfig.json'
    ].map(m => fs
        .readFile(Path.join(__dirname, `../fixtures/${m}`), 'utf-8')
        .then(buf => fs.writeFile(Path.join(packagePath, m), template(buf)({
            name: name
        })))
    ));

    await Promise.all([
        fs.writeFile(Path.join(packagePath, 'src/index.ts'), ''),
        fs.link(Path.join(__dirname, '../../../scripts/task'), Path.join(packagePath, 'task')),
        fs.link(Path.join(__dirname, '../babel-config.json'), Path.join(packagePath, '.babelrc'))
    ]);

}


createPackage().catch(e => console.error('Error: ', e))