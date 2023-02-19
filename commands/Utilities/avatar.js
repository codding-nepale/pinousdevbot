const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({size: 1024, dynamic: true})


    const embed = new Discord.MessageEmbed()
    .setTitle(`${member.username} avatar`)
    .setImage(avatar)
    .setColor("RANDOM")

    message.channel.send(embed);
}
  
    exports.help = {
      name: "avatar",
      aliases: ['avatar']
  }
  
  exports.requirements = {
      botOwner: false,
      botPerms: [],
      userPerms: []
  }
  