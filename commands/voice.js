const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (args[0] == null) {
        var embedParent = new discord.MessageEmbed()
            .setTitle("Commands")
            .setDescription(`!voice-Create - Maakt een voice channel aan.
            !voice-setUserlimit - Maakt een maximum voor uw voice channel aan.
            !voice-Lock - Zet je voice channel op lock.
            !voice-lock - Zet het kanaal op slot.
            !voice-unlock - Zet het kanaal uit lock.
            Later meer.`)
            .setFooter(`${message.author.username}`)
            .setTimestamp()
            .setColor('ORANGE')
        message.reply({ embeds: [embedParent] });
    }

}

module.exports.help = {
    name: "voice",
    category: "serverBooster",
    discription: "Geeft commands voor voice channels."
}