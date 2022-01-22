const fs = require('fs');
const path = require('path');

const dir = "src/environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts";

const content = `${process.env.ENVIRONMENT_VARIABLES}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    if(err) {
        console.log(`src doesn't exist, creating it now ${process.cwd()}`);
        fs.mkdir(dir, {recursive: true}, (err) => {
            if (err) {
                console.log("This is where I failed")
                throw err;
            }
        });
    }

    try {
        fs.writeFileSync(`${dir}/${file}`, content);
        fs.writeFileSync(`${dir}/${prodFile}`, content);
        console.log(`Created successfully in ${process.cwd()}`);

        if(fs.existsSync(`${dir}/${file}`)) {
            console.log(`File is created ${path.resolve(`${dir}/${file}`)}`);
            const str = fs.readFileSync(dir + "/" + file).toString();
            console.log(str)
        }

        if(fs.existsSync(`${dir}/${prodFile}`)) {
            console.log(`ProdFile is created ${path.resolve(`${dir}/${prodFile}`)}`);
            const str = fs.readFileSync(dir + "/" + prodFile).toString();
            console.log(str)
        }

    } catch (err) {
        console.error(err), "HEre I am";
        process.exit(1);
    }
})
