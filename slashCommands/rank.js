const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Geeft je rank.'),
    async execute(client, interaction) {

        var levelFile = JSON.parse(fs.readFileSync("./Data/levels.json"));

        var userId = interaction.user.id;

        try {

            var nextLevelXp = levelFile[userId].level * 300;

            if (nextLevelXp == 0) nextLevelXp == 100;

            const rank = new canvacord.Rank()
                .setAvatar(interaction.user.displayAvatarURL({ dynamic: false, format: "png" }))
                .setCurrentXP(levelFile[userId].xp)
                .setLevel(levelFile[userId].level)
                .setRequiredXP(nextLevelXp)
                .setProgressBar("#ff0000", "COLOR")
                .setUsername(interaction.user.username)
                .setDiscriminator(interaction.user.discriminator);

            rank.build().then(data => {
                const Attachment = new MessageAttachment(data, "rankCard.png");
                interaction.reply({ files: [Attachment], ephemeral: true});
            })

        } catch (err) {
            interaction.reply({ content: "Geen gegevens gevonden.", ephemeral: true });
        }

        console.log(levelFile[userId].xp);



    }

}

