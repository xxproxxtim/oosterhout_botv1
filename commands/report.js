const discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const categoryID2deX51 = "866736873648291910";

    if (message.channel == categoryID2deX51) {

        var reportUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

        if (!reportUser) return message.reply("Gelieve een user op te geven.");
        if (!args[1]) return message.reply("Gelieve een reden/bewijs mee te geven.");

        var reason = args.slice(1).join(" ");

        const reports = JSON.parse(fs.readFileSync("./Data/reports.json", "utf-8"));

        if (!reports[reportUser.id]) reports[reportUser.id] = {
            reportCount: 0
        }

        reports[reportUser.id].reportCount++;

        var embedie = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`Report status`)
            .setDescription(`**Gereport:** ${reportUser.user.username} (${reportUser.id})
            **Gereport door:** ${message.author}
            **Redenen: ** ${reason}`);

        message.author.send({ embeds: [embedie] });

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`Report #${reports[reportUser.id].reportCount}`)
            .setDescription(`**Gereport:** ${reportUser.user.username} (${reportUser.id})
            **Gereport door:** ${message.author}
            **Redenen: ** ${reason}`)
            .addField("Reports warns", reports[reportUser.id].reportCount.toString());

        const channel = message.member.guild.channels.cache.get("867835721720397874");
        channel.send({ embeds: [embed] });

        fs.writeFile("./Data/reports.json", JSON.stringify(reports), (err) => {
            if (err) console.log(err)
        });

    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "report",
    category: "general",
    discription: "Maakt een report aan tegen een gebruiker."
}