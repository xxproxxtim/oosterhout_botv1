module.exports.run = async (bot, message, args) => {

    var values = ["Kop", "Munt"];

    var result = values[Math.floor( Math.random() * values.length)];

    const categoryID = "920756970779205702";

    if (message.channel == categoryID) {

        return message.channel.send(`🥇 Je hebt **${result}** gegooit.`);
    
    }else{
        return message.channel.send("Gelieve dit command in <#920756970779205702> te doen.")
    }

}

module.exports.help = {
    name: "KoM",
    category: "general",
    discription: "Speelt kop of munt."
}