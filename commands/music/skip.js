exports.run = async (client, message, args) => {
       if (!message.member.voice.channel) return message.channel.send(`Vous devez être dans un canal vocal de ${message.guild.name} pour utiliser cette commande.`);

    let queue = await client.distube.getQueue(message);

    if(queue) {
        client.distube.skip(message)

        message.channel.send('Ok je passe au prochain song!')
    } else if (!queue) {
        return
    };
}

exports.help = {
    name: "skip",
    aliases: ["s"]
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}