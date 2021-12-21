const { Client, Intents, Collection } = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");

const tempMute = JSON.parse(fs.readFileSync("./tempMutes.json", "utf8"));

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`)

    client.commands.set(command.help.name, command)

    console.log(`${command.help.name}.js is geladen.`);

}

client.once("ready", () => {

    console.log(`Oosterhout_bot is online.`);
    const statusOptions = [
        `Oosterhout!`,
        "niks"
    ]

    let counter = 0;

    let time = 60 * 1000;

    const updateStatus = () => {

        client.user.setPresence({

            status: "online",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]

        });

        if (++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);

    }

    updateStatus();

    const checkTempMute = async () => {

        // Omdat we over object propertys gaan moeten we dit anders doen dan een array.
        // We gaan hier over iedere key in het object gaan in het tempMutes.json bestand.
        for (const result of Object.keys(tempMute)) {
            // We halen het ID er uit.
            const idMember = result;
            // We halen de tijd op vanuit het hele bestand bij die key (ID) en dan de tijd.
            const time = tempMute[result].time;

            // Tijd van nu ophalen.
            let date = new Date();
            let dateMilli = date.getTime();
            // Tijd bij gebruiker omvormen naar leesbare tijd.
            let dateReset = new Date(time);

            // Als de tijd van het muten kleiner is als de tijd van nu en de tijd staat niet op 0
            // dan mag deze persoon verlost worden van het zwijgen.
            if (dateReset < dateMilli && time != 0) {

                try {
                    // We halen de server op.
                    let guild = await client.guilds.fetch("866733770693541918");
                    // We gaan de persoon gegevens ophalen aan de hand van de idMember waar we de tekens < @ ! > weghalen.
                    const tempMuteUser = guild.members.cache.find(member => member.id === idMember.replace(/[<@!>]/g, ''));
                    // We halen de rol op.
                    let muteRole = guild.roles.cache.get('872146717217267742');
                    // We kijken na als de rol bestaat.
                    if (!tempMuteUser) return console.log("De rol muted bestaat niet.");
                    // We verwijderen de rol van de persoon.
                    await (tempMuteUser.roles.remove(muteRole.id));
                    // We zetten de tijd op 0.
                    tempMute[tempMuteUser].time = 0;
                    // We slaan dit mee op in het document.
                    fs.writeFile("./tempMutes.json", JSON.stringify(tempMute), (err) => {
                        if (err) console.log(err);
                    });
                }
                catch (err) {
                    console.log(err + " Persoon kon niet geunmute worden wegens deze persoon niet meer op de server is");
                }
            }
        }
        setTimeout(checkTempMute, 1000 * 60); // We zetten een timeout van 1 minuut.
    }
    checkTempMute();

});

client.on("interactionCreate", async interaction => {

    if (!interaction.isSelectMenu()) {
        return;
    }

    const { customId, values, member } = interaction;

    if (customId === 'roles') {

        const component = interaction.component;

        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        });

        for (var id of removed) {
            member.roles.remove(id.value)
        }

        for (var id of values) {
            member.roles.add(id)
        }

        interaction.reply({
            content: "Rol(en) zijn geupdate.",
            ephemeral: true
        });

    }

});

client.on("guildMemberAdd", async member => {

    var rol = member.guild.roles.cache.get('866743097324470293');

    if (!rol) return;

    member.roles.add(rol);

    var channel = member.guild.channels.cache.get("866736790119776267");

    if (!channel) return;

    channel.send(`${member} welkom in Oosterhout!`)

    for (const result of Object.keys(tempMute)) {
        // Voor meer uitleg zie vorig stuk.
        const idMember = result;
        const time = tempMute[result].time;

        // We kijken na als het de persoon is die op de server is gekomen.
        if (idMember.replace(/[<@!>]/g, '') == member.id) {

            let date = new Date();
            let dateMilli = date.getTime();
            let dateReset = new Date(time);

            let muteRole = member.guild.roles.cache.get('872146717217267742');

            if (!muteRole) return message.channel.send("De rol muted bestaat niet");

            try {
                // Als de tijd van de mute nog groter is dan de tijd van nu moet die de rol terug krijgen.
                if (dateReset > dateMilli) {
                    await (member.roles.add(muteRole.id));
                } else if (time != 0) {
                    // Anders mag de rol weg maar omdat deze opnieuw aanmeld is deze al weg en gaan we enkel
                    // de tijd op nul zetten zodat we niet nog eens moeten opslaan.
                    let guild = await client.guilds.fetch("866733770693541918");
                    const mutePerson = guild.members.cache.find(member => member.id === idMember.replace(/[<@!>]/g, ''));
                    tempMute[mutePerson].time = 0;

                    fs.writeFile("./tempMutes.json", JSON.stringify(tempMute), (err) => {
                        if (err) console.log(err);
                    });
                }
            } catch (err) {
                console.log(err + " Iets liep mis met de rollen toevoegen/verwijderen.");
            }
        }
    }

});

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {
        await commandData.run(client, message, arguments);
    } catch (error) {
        console.log(error);
        await message.reply("Er is een probleem opgetreden.");
    }

});

client.login(process.env.token);