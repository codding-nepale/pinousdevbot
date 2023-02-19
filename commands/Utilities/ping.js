exports.run = async (client, message, args) => {

    message.channel.send(`Calcule en cour...`).then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp

      resultMessage.edit(`Ma latence est de ${ping} ms, et celle de l'API Discord est de ${client.ws.ping} ms`)
    })
  }

  exports.help = {
    name: "ping",
    aliases: ['pong']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
