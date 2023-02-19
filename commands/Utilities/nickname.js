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

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Veuilliez spécifier un pseudo!");
    
    try {
      member.setNickname(arguments);
      return message.reply("Membre bien renomée")
    } catch (err) {
      console.log(err);
      message.reply(
        "Je n'ai pas l'autorisation de changer le pseudo de " + member.toString() + " !"
      );
    }
  }


  exports.help = {
    name: "nickname",
    aliases: ['nickname']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
