exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`Vous devez être dans un canal vocal de ${guild.name} pour utiliser cette commande.`);

    let queue = await client.distube.getQueue(message);

    if(queue) {
        client.distube.stop(message)

        message.channel.send('Ok je stop tous les songs!')
    } else if (!queue) {
        return
    };
}

exports.help = {
    name: "stop",
    aliases: ["stp"]
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}