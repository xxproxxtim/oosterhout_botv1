const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "866736873648291910";

    if (message.channel == categoryID) {



        var infoEmbed = new discord.MessageEmbed()
            .setTitle("Groepen")
            .setColor('#df9202')
            .setFooter(`${message.author.username}`)
            .setTimestamp()
            .addField("Gemente groep", "https://www.roblox.com/groups/13640352/OosterhoutRP-Gemeente#!/about")
            .addField("Politie groep", "https://www.roblox.com/groups/13649394/OosterhoutRP-Politie#!/about")

        return message.channel.send({ embeds: [infoEmbed] });

    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "groepen",
    category: "info",
    discription: "Laat alle groepen zien."
}