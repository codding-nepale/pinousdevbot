exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply(`Vous devez être dans un canal vocal de ${message.guild.name} pour utiliser cette commande.`);
    
    const music = args.join(" ");

    client.distube.play(message, music)
}

exports.help = {
    name: "play",
    aliases: ['p']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}