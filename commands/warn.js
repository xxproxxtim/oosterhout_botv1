const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen mod!");

    if (!args[0]) return message.reply("Gelieve een gebruiker mee te geven.");
    if (!args[1]) return message.reply("Gelieve een reden mee te geven.");

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Kan de gebruiker niet vinden.");

    if (!warnUser.permissions.has("KICK_MEMBERS")) return message.reply("Je kan geen staff warnen.");

    const warns = JSON.parse(fs.readFileSync("./Warnings.json", "utf-8"));

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++;

    message.channel.send(`${warnUser.user.username} (${warnUser.id}) heeft succesvol een warning gekregen.`)

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setTitle("Warning")
        .setDescription(`**Gewarnd:** ${warnUser.user.username} (${warnUser.id})
            **Warning door:** ${message.author}
            **Redenen: ** ${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns.toString());

    const channel = message.member.guild.channels.cache.get("866735722991714345");
    warnUser.send({ embeds: [embed] });

    if(warns[warnUser.id].warns == 4) {
        const forwarnchannel = message.member.guild.channels.cache.get("875011500627095562");
        forwarnchannel.send(`${warnUser.user.username} heeft al 4 warns!`);

    }else if (warns[warnUser.id].warns == 5) {
        const forwarnchannel = message.member.guild.channels.cache.get("875011500627095562");

        var mes = new discord.MessageEmbed()
            .setTitle("Warnins")
            .setColor("#ff0000")
            .addField("Bericht", `${warnUser.user.username} (${warnUser.user.id}) heeft 5 warns! Persoon is gekickt.`)
            .addField("Reden", "Te veel warnings.") 
        forwarnchannel.send({ embeds: [mes] })
        warnUser.send({ embeds: [mes] });

        message.guild.members.kick(warnUser, { reason: "Te veel warnings." });
    }

    channel.send({ embeds: [embed] });



    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "warn",
    category: "staff",
    discription: "Warnt een persoon."
}