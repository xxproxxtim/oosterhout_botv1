const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen moderater.");

    await message.channel.permissionOverwrites.set([

        {
            id: message.guild.roles.cache.find(r => r.name === "@everyone").id,
            deny: ["SEND_MESSAGES"]
        }

    ]);

    return message.channel.send("Kanaal staat op lock.")

}

module.exports.help = {
    name: "lock",
    category: "staff",
    discription: "Zet een kanaal in lockdown."
}