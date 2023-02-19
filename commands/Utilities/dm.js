const Discord = require('discord.js');
 
const client = new Discord.Client();

exports.run = async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.channel.send("Vous n'avez pas la permission!");
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `Vous n'avez pas mentionné l'utilisateur au quelle vous voulez envoyer un DM ou vous n'avez pas spécifié l'ID de la personne.`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Vous n'avez pas spécifié le message que vous voulez envoyer à l'utilisateur mentionné");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("Cet utilisateur n'a pas pu être DM!"))
        .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
    }  

    exports.help = {
      name: "dm",
      aliases: ['dm']
  }
  
  exports.requirements = {
      botOwner: false,
      botPerms: [],
      userPerms: []
  }
  