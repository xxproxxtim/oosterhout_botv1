const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const options = [
        {
            label: "Mededeling ping",
            value: "867837878112485446",
            emoji: "🔊"
        },
        {
            label: "Event ping",
            value: "867838013748281376",
            emoji: "🎉"
        },
        {
            label: "sneakpeak ping",
            value: "869900992198627368",
            emoji: "👀"
        },
        {
            label: "Pol ping",
            value: "918521307455430686",
            emoji: "🤖"
        },
        {
            label: "Training ping",
            value: "867840949434318888",
            emoji: "⚽"
        },
        {
            label: "Bot-Update ping",
            value: "868072266322296902",
            emoji: "⏰"
        }
        
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("roles")
                .setMinValues(0)
                .setMaxValues(6)
                .setPlaceholder("Kies uw ping(s).")
                .addOptions(options)
        );
    return message.channel.send({content: "Kies uw rol.", components: [row]});

}

module.exports.help = {
    name: "dropdown"
}