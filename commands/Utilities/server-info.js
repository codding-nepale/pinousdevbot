const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  const guild = message.guild;
  const Emojis = guild.emojis.cache.size || "No Emoji!";
  const Roles = guild.roles.cache.size || "No Roles!";
  const Members = guild.memberCount;
  const Humans = guild.members.cache.filter(member => !member.user.bot).size;
  const Bots = guild.members.cache.filter(member => member.user.bot).size;

  const embed = new MessageEmbed()
    .setTitle(guild.name + " Information!")
    .setColor("2600E4")
    .setThumbnail(guild.iconURL())
    .addField(`Nom`, guild.name, true)
    .addField(`ID`, `${guild.id}`, true)
    .addField(`Owner`, `${guild.owner.user.tag}\nle gendarme ytb#9073`, true)
    .addField(`Site Web`, `https://astralia-roleplay.fr/`)
    .addField(`Rôle le plus élevé`, `${guild.roles.highest || "Aucun Role!"}`, true)
    .addField(`Nombre De Roles`, Roles, true)
    .addField(`Nombre D'Emojis `, Emojis, true)
    .addField(`Nombre De Membres`, Members, true)
    .addField(`Nombre D'Humain`, Humans, true)
    .addField(`Nombre De Bots`, Bots, true)
    .addField(`Serveur Créer Le `, guild.createdAt.toDateString())
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp();

  message.channel.send(embed);
      }

      exports.help = {
        name: "server-info",
        aliases: ['server-info']
    }
    
    exports.requirements = {
        botOwner: false,
        botPerms: [],
        userPerms: []
    }
    