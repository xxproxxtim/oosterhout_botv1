const discord = require('discord.js');
const noblox = require("noblox.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const categoryID2deX51 = "866736873648291910";

    if (message.channel == categoryID2deX51) {

        var reportUser = args[0];

        if (!reportUser) return message.reply("Gelieve een Roblox user op te geven.");

        var reportUserid = await noblox.getIdFromUsername(reportUser);

        var information = await noblox.getPlayerInfo({userId: reportUserid})

        var InfoEmbed = new discord.MessageEmbed()
            .setTitle("User info")
            .setDescription(`**Info:** \n ${information}`)
            .setFooter(`${message.author.username}`)
            .setTimestamp()

    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "userInfo",
    category: "general",
    discription: "Maakt een report aan tegen een gebruiker op roblox."
}