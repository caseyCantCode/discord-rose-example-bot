module.exports = {
    config: {
        name: "hello",
        aliases: ["hi"]
    },
    exec: ctx => {
        ctx.reply(`Well hi there!`);
    }
};