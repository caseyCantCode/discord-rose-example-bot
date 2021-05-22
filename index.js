const { Master } = require(`discord-rose`)
const path = require(`path`)
require(`dotenv`).config()

const master = new Master(path.resolve(__dirname, './worker.js'), {
    token: process.env.token,
    cache: {
        guilds: true,
        channels: true,
        messages: true,
        members: true
    },
})
master.start()
