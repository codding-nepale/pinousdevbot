const Discord = require('discord.js');
 
const client = new Discord.Client();

exports.run = async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.channel.send("Vous n'avez pas la permission!");
      message.delete();
      const { guild } = message
      const channel = guild.channels.cache
      .filter((channel) => {
        return channel.name === '726569618013028413'
      })
      .first()

    if (!channel) {
      message.reply('That channel does not exist.')
      return
    }
    
    if (channel != null || undefined || NaN) {
      channel.delete()
    }

    message.reply('Channel deleted!')
    }  

    exports.help = {
      name: "test",
      aliases: ['test']
  }
  
  exports.requirements = {
      botOwner: false,
      botPerms: [],
      userPerms: []
  }
  
