const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const categoryID2deX51 = "866736873648291910";

    if (message.channel == categoryID2deX51) {

        var levelFile = JSON.parse(fs.readFileSync("./Data/levels.json"));

        var userId = message.author.id;

        try {

            var nextLevelXp = levelFile[userId].level * 300;

            if (nextLevelXp == 0) nextLevelXp == 100;

            const rank = new canvacord.Rank()
                .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: "png" }))
                .setCurrentXP(levelFile[userId].xp)
                .setLevel(levelFile[userId].level)
                .setRequiredXP(nextLevelXp)
                .setProgressBar("#ff0000", "COLOR")
                .setUsername(message.author.username)
                .setDiscriminator(message.author.discriminator);

            rank.build().then(data => {
                const Attachment = new MessageAttachment(data, "rankCard.png");
                message.reply({ files: [Attachment] });
            })

        } catch (err) {
            message.channel.send("Geen gegevens gevonden.");
        }

    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "rank",
    category: "general",
    discription: "Laat je rank zien. (Kan bugged zijn.)"
}