const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen moderator.");

    await message.channel.send("Herstarten van bot...");

    process.exit();

}

module.exports.help = {
    name: "restart",
    category: "staff",
    discription: "Restart de bot."
}