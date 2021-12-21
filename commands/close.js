const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "866957228081414144";

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij kan jij niet doen.");

    if (message.channel.parentId == categoryID) {

        message.channel.delete();

        var ticketEmbed = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("Deze ticket is gemarkeerd als **compleet**")
            .setTimestamp()
        var ticketLogs = message.member.guild.channels.cache.find(channel => channel.name === "❗logs-ticket");
        if(!ticketLogs) return message.reply("Kanaal bestaat niet.");

        return ticketLogs.send({embeds: [ticketEmbed]});

    } else {
       return message.channel.send("Gelieve dit command in een ticket te doen.")
    }

}

module.exports.help = {
    name: "close"
}