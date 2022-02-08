const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const suggestie = args.join(" ");

    if(!suggestie) return message.reply("Gelieve een bug mee te geven.");

    var embed = new discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Bug")
        .setDescription(`Bug aangemaakt door ${message.author}.`)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .addField("Suggestie", suggestie);
    
    const suggestieChannel = message.member.guild.channels.cache.get("866737248246693960");

    suggestieChannel.send({ embeds: [embed] }).then(async msg => {

        let time = 30;
        let reactions = ["✔", "✖"];

        time *= 1000;

        for (const reaction of reactions) {
            await msg.react(reaction);
        }
    });

    return message.reply("Bug succesvol aangemaakt.");

}

module.exports.help = {
    name: "bug",
    category: "general",
    discription: "Maakt een bug aan."
}