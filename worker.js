const { Worker } = require("discord-rose");
const worker = new Worker();
let fs = require('fs')

worker.commands.prefix(",,");
let commands = fs.readdirSync("./commands/")
for (let command of commands) {
    let currentCommand = require(`./commands/${command}`)
    worker.commands.add({
        command: currentCommand.config.name,
        aliases: currentCommand.config.aliases,
        exec: currentCommand.exec
    })
}
