#!/usr/bin/env node

const fs = require('fs'),
    Path = require('path'),


    if (process.argv.length < 3) {
        console.error(`usage: ${process.argv[1]} <name>`);
        process.exit(1);
    }

const name = process.argv.slice[2],
    packageBasePath = Path.join(process.cwd(), 'packages'),
    packagePath = Path.join(packageBasePath, 'viewjs-' + name);