const { Worker } = require("discord-rose");
const worker = new Worker();
let fs = require("fs");

worker.commands.prefix(",,");
let commands = fs.readdirSync("./commands/");
for (let command of commands) {
    let currentFolder = fs.readdirSync(`./commands/${command}`);
    for (let folder of currentFolder) {
        let currentCommand = require(`./commands/${command}/${folder}`);
        worker.commands.add({
            command: currentCommand.config.name,
            aliases: currentCommand.config.aliases,
            exec: currentCommand.exec
        });
    }
}
