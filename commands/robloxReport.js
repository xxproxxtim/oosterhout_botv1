const discord = require('discord.js');
const noblox = require("noblox.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const categoryID2deX51 = "866736873648291910";

    if (message.channel == categoryID2deX51) {

        var reportUser = args[0];

        if (!reportUser) return message.reply("Gelieve een Roblox user op te geven.");
        if (!args[1]) return message.reply("Gelieve een reden/bewijs mee te geven.");

        var reportUserid = await noblox.getIdFromUsername(reportUser);

        var reason = args.slice(1).join(" ");

        const reports = JSON.parse(fs.readFileSync("./Data/robloxReports.json", "utf-8"));

        if (!reports[reportUserid]) reports[reportUserid] = {
            reportCount: 0
        }

        reports[reportUserid].reportCount++;

        var embedie = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`Report status`)
            .setDescription(`**Gereport:** ${reportUser} (${reportUserid})
            **Gereport door:** ${message.author}
            **Redenen: ** ${reason}`);

        message.author.send({ embeds: [embedie] });

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`Roblox Report #${reports[reportUserid].reportCount}`)
            .setDescription(`**Gereport:** ${reportUser} (${reportUserid})
            **Gereport door:** ${message.author}
            **Redenen: ** ${reason}`)
            .addField("Reports", reports[reportUserid].reportCount.toString());

        const channel = message.member.guild.channels.cache.get("867835721720397874");
        channel.send({ embeds: [embed] });

        fs.writeFile("./Data/robloxReports.json", JSON.stringify(reports), (err) => {
            if (err) console.log(err)
        });

    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "robloxReport",
    category: "general",
    discription: "Maakt een report aan tegen een gebruiker op roblox."
}