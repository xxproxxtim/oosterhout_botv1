module.exports.run = async (bot, message, args) => {

    var values = ["Kop", "Munt"];

    var result = values[Math.floor( Math.random() * values.length)];

    return message.channel.send(`🥇 Je hebt **${result}** gegooit.`);

}

module.exports.help = {
    name: "KoM"
}