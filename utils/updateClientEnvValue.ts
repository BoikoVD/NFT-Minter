import os from "os";
import fs from "fs";

export default function updateClientEnvValue(key: string, value: string) {
    const ENV_VARS = fs.readFileSync("./client/.env", "utf8").split(os.EOL);

    const str = ENV_VARS.find((line) => line.match(new RegExp(key)));

    const target = str ? ENV_VARS.indexOf(str) : ENV_VARS.length + 1;

    ENV_VARS.splice(target, 1, `${key}=${value}`);

    fs.writeFileSync("./client/.env", ENV_VARS.join(os.EOL));

    console.log(`The ${key} env variable was updated`);
}