const { greenBright } = require(`chalk`)

module.exports = worker => {
    console.log(greenBright(`[Discord]: ${worker.user.username} is online in ${worker.guilds.size} guilds.`))
}