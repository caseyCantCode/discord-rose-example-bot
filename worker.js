const { Worker } = require("discord-rose");
const worker = new Worker();
let fs = require("fs");
const permissionsMiddleware = require('@discord-rose/permissions-middleware')
const { blueBright, greenBright } = require(`chalk`)

worker.commands.prefix(",,");
let commands = fs.readdirSync("./commands/");
for (let command of commands) {
    let currentFolder = fs.readdirSync(`./commands/${command}`);
    for (let folder of currentFolder) {
        let currentCommand = require(`./commands/${command}/${folder}`);
        console.log(blueBright(`[Commands]: Commands "${currentCommand.config.name}" has loaded.`))
        worker.commands.add({
            command: currentCommand.config.name,
            aliases: currentCommand.config.aliases,
            exec: currentCommand.exec,
            myPerms: currentCommand.config.myPerms || "",
            userPerms: currentCommand.config.userPerms || ""
        })
            .middleware(permissionsMiddleware({
                user: (ctx, perms) => `You don't have the required permissions you need: ${ctx.command.userPerms.map(p => permissionsMiddleware.humanReadable[p])}`,
                my: (ctx, perms) => `You don't have the required permissions you need: ${ctx.command.myPerms.map(p => permissionsMiddleware.humanReadable[p])}`
            }))
    }
}
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(greenBright(`[Events]: Event "${file}" has loaded.`));
    const event = require(`./events/${file}`);
    worker.on(file.split(".")[0], event.bind(null, worker));
};
