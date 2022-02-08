const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const suggestie = args.join(" ");

    if(!suggestie) return message.reply("Gelieve een suggestie mee te geven.");

    var embed = new discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Suggestie")
        .setDescription(`Suggestie aangemaakt door ${message.author}.`)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .addField("Suggestie", suggestie);
    
    const suggestieChannel = message.member.guild.channels.cache.get("866737291333206046");

    suggestieChannel.send({ embeds: [embed] }).then(async msg => {

        let time = 30;
        let reactions = ["✔", "✖"];

        time *= 1000;

        for (const reaction of reactions) {
            await msg.react(reaction);
        }
    });

    return message.reply("Suggestie succesvol aangemaakt.");

}

module.exports.help = {
    name: "suggestion",
    category: "general",
    discription: "Maakt een suggestie aan."
}