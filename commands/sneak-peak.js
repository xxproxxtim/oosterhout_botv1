const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID2deX51 = "866736873648291910";

    if (message.channel == categoryID2deX51) {

        var embedParent = new discord.MessageEmbed()
            .setTitle("Sneak-Peaks")
            .setDescription("Dit zijn de nieuwste sneak-peaks. 22-01-22")
            .setFooter(`${message.author.username}`)
            .setTimestamp()
            .setColor('ORANGE')
        message.channel.send({ embeds: [embedParent], files: ['./Fotos/unknown.png','./Fotos/nogiets','./Fotos/iets'] });



    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "sneak-peak",
    category: "general",
    discription: "Laat alle sneak-peaks zien."
}