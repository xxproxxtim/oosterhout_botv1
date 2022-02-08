const fs = require("fs");

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has("BAN_MEMERS")) return message.reply("Je bent geen Administrator!");

    if(!args[0]) return message.reply("Gelieve een vloekwoord op te geven!");

    var word = args[0].toLowerCase();

    var swearWordsJson = fs.readFileSync("./Data/SwearWords.json", "utf-8");
    var swearWords = JSON.parse(swearWordsJson);

    const categoryID = "923593819348430909";

    if (message.channel == categoryID) {

        swearWords.push(word);

        swearWordsJson = JSON.stringify(swearWords);
        fs.writeFileSync("./Data/SwearWords.json", swearWordsJson, "utf-8");

        return message.channel.send(`Het vloekwoord **${word}** is toegevoegt.`)
    
    }else{
        return message.channel.send("Gelieve dit command in <#923593819348430909> te doen.")
    }

}

module.exports.help = {
    name: "addSwearWord",
    category: "staff",
    discription: "Maakt een extra scheldwoord aan."
}