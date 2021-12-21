const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var infoEmbed = new discord.MessageEmbed()
        .setTitle("Serverinfo")
        .setColor('#df9202')
        .setTimestamp()
        .addFields(
            { name: 'Owner', value: `<@!858670352502489099>`},
            { name: 'Naam server', value: client.user.username},
            { name: 'Server gejoint op', value: message.member.joinedAt.toString()},
            { name: 'Members', value: message.guild.memberCount.toString()}
        );
    
    return message.channel.send({embeds: [infoEmbed] });

}

module.exports.help = {
    name: "info"
}