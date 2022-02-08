const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var infoEmbed = new discord.MessageEmbed()
        .setTitle("Serverinfo")
        .setColor('#df9202')
        .setFooter(`${message.author.username}`)
        .setTimestamp()
        .addFields(
            { name: '**__Server__**\n\n', value: "Serverinfo"},
            { name: 'Owner', value: `<@!880133261769199616> (880133261769199616)`, inline: true},
            { name: 'Naam server', value: `${client.user.username} (866733770693541918)`, inline: true},
            { name: 'Aangemaakt op', value: `${message.guild.createdAt.toString()}`, inline: true},
            { name: '**__Kanalen aantal__**\n\n', value: "Aantal kanalen"},
            { name: 'Nieuws', value: message.guild.channels.cache.filter(ch => ch.type === 'GUILD_NEWS').size.toString(), inline: true},
            { name: 'Chat channels', value: message.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT').size.toString(), inline: true},
            { name: 'Voice channels', value: message.guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size.toString(), inline: true},
            { name: 'Categorys', value: message.guild.channels.cache.filter(ch => ch.type === 'GUILD_CATEGORY').size.toString(), inline: true},
            { name: 'Totaal', value: message.guild.channels.cache.size.toString(), inline: true},
            { name: 'Rollen', value: message.guild.roles.cache.size.toString(), inline: true},
            { name: '**__Boosts__**\n\n', value: "Boost info"},
            { name: 'Boosts', value: message.guild.premiumSubscriptionCount.toString(), inline: true},
            { name: 'Boost lvl', value: message.guild.premiumTier.toString(), inline: true},
            { name: '-', value: message.guild.premiumTier.toString(), inline: true},
            { name: '**__User info__**\n\n', value: "User info"},
            { name: 'User', value: `${message.author} (${message.author.id})`, inline: true},
            { name: 'Roles', value: message.member.roles.cache.size.toString(), inline: true},
            { name: 'Binnen gekomen op', value: message.member.joinedAt.toString(), inline: true}
        );
    
    return message.channel.send({embeds: [infoEmbed] });

}

module.exports.help = {
    name: "info",
    category: "info",
    discription: "Geeft info over de server."
}