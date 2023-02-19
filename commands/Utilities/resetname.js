const { Client, Message, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas les permissions");
    const member = message.mentions.members.first();

    if (!member) return message.reply("Veuilliez spécifier un membre!");

    try {
      member.setNickname(null);
      return message.reply("Membre bien renomée")
    } catch (err) {
      message.reply(
        "Je n'ai pas l'autorisation de réinitialiser le pseudo de " + member.toString() + " !"
      );
    }
  }

  exports.help = {
    name: "resetname",
    aliases: ['resetname']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
