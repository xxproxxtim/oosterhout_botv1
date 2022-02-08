const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var infoEmbed = new discord.MessageEmbed()
        .setTitle("Serverinfo")
        .setColor('#df9202')
        .setFooter(`${message.author.username}`)
        .setTimestamp()
        .addField("E-mail", "`oosterhoutroleplay@gmail.com`")
        .addField("Ticket", "Gebruik de command: '`,new`' om een ticket aan te maken.")
        .addField("Unban", "https://forms.gle/W8zwyubcDPbfvqGEA")
        .addField("Web-Site", "https://sites.google.com/view/oosterhoutcommunity")
    
    return message.channel.send({embeds: [infoEmbed] });

}

module.exports.help = {
    name: "support",
    category: "info",
    discription: "Geeft support tips."
}