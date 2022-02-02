const fs = require('fs');
const path = require('path');

const dir = "src/environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts";

const content = `${process.env.ENVIRONMENT_VARIABLES}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    if(err) {
        }`);
        fs.mkdir(dir, {recursive: true}, (err) => {
            if (err) {
                
                throw err;
            }
        });
    }

    try {
        fs.writeFileSync(`${dir}/${file}`, content);
        }`);
        fs.writeFileSync(`${dir}/${prodFile}`, content);
        }`);

        if(fs.existsSync(`${dir}/${file}`)) {
            }`);
            const str = fs.readFileSync(dir + "/" + file).toString();
            
        }

        if(fs.existsSync(`${dir}/${prodFile}`)) {
            }`);
            const str = fs.readFileSync(dir + "/" + prodFile).toString();
            
        }

    } catch (err) {
        console.error(err), "HEre I am";
        process.exit(1);
    }
})
