const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen moderator.");

    var seperator = "|";

    if (args[0] == null) {
        var embedParent = new discord.MessageEmbed()
            .setTitle("Gebruik")
            .setDescription(`Maak een anouncement door gebruik te maken van: \n !anouncement <Tite> ${seperator} <Bericht> ${seperator} <Kleur> ${seperator} <Kanaal>`)
            .setFooter(`${message.author.username}`)
            .setTimestamp()
            .setColor('ORANGE')
        message.reply({ embeds: [embedParent] });
    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#ff0000";
    if (argsList[3] === undefined) argsList[3] = "chat";

    var options = {

        Titel: argsList[0],
        Bericht: argsList[1] || "Geen info.",
        Kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()

    }

    var embedParent1 = new discord.MessageEmbed()
        .setTitle(`${options.Titel}`)
        .setDescription(`${options.Bericht}`)
        .setFooter(`${message.author.username}`)
        .setTimestamp()
        .setColor(`${options.Kleur}`)
    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply("Kanaal bestaat niet.");
    channel.send({ embeds: [embedParent1] });
    return message.reply("Anouncement succesvol aangemaakt.");

}

module.exports.help = {
    name: "anouncement",
    category: "staff",
    discription: "Laat een embed in beeld zien."
}