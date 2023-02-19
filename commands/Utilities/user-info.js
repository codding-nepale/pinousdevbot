const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')

exports.run = async (client, message, args) => {
    const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    let inline = true
    let resence = true
    const status = {
        online: "En ligne",
        idle: "Inactif",
        dnd: " Ne pas dérenger",
        offline: " Hors-Ligne/Invisble"
    }
 
    if (member.user.bot === true) {
        bot = "Oui";
    } else {
        bot = "Non";
    }

    console.log(member)

    const embed = new MessageEmbed()
      .setColor("2600E4")
      .setAuthor(`Info du membre ${user.username}`, user.displayAvatarURL())
      .addFields(
        {
          name: 'Tag du membre :',
          value: user.tag,
        },
        {
          name: 'et t\'il un bot ?',
          value: bot,
        },
        {
          name: 'Pseudo :',
          value: member.nickname || 'Aucun Pseudo',
        },
        {
          name: 'A rejoint le Serveur le :',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: 'A crée son compte Discord le :',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: 'Roles :',
          value: member.roles.cache.size - 1,
        },
        {
            name: 'Joue a :',
            value: `${user.presence.activities[0]}`
        },
        {
            name: 'Status :',
            value: (`${status[member.user.presence.status]}`)
        }
      )

    channel.send(embed)
  }

  exports.help = {
    name: "user-info",
    aliases: ['pong']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
