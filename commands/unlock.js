const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen moderater.");

    await message.channel.permissionOverwrites.set([

        {
            id: message.guild.roles.cache.find(r => r.name === "@everyone","@vip","@burger").id,
            allow: ["SEND_MESSAGES"]
        }

    ]);

    return message.channel.send("Kanaal staat is geunlockt.")

}

module.exports.help = {
    name: "unlock",
    category: "staff",
    discription: "Haalt een kanaal uit lockdown."
}