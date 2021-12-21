module.exports.run = async (bot, message, args) => {

    var number = Math.ceil( Math.random() * 6);

    return message.channel.send(`🎲 Je hebt **${number}** gegooit.`);

}

module.exports.help = {
    name: "dobbel"
}