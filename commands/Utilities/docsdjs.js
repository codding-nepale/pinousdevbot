const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
exports.run = async (client, message, args) => {
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    const query = args.join(" ");
    if (!query) return message.reply("Veuilliez spécifier une recherche!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embed: data });
      }
    });
  }

  exports.help = {
    name: "docsdjs",
    aliases: ['docsdjs']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
