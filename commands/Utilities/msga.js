const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  message.delete()
 
  if(!args[0]) return message.reply("❌|**Entrez une question ! **");

  let replies = ["Oui","Non","Peut-être","Je sais pas","sans doute","Bien-sûre","exactement","Bah oui", "Normalement", "Il me semble", "Bah non", "Possiblement", "Chocolatine", "Cherche ma bite est un volcan sur YouTube", "Aaron la brosse a chiotte", "Aaron resemble a son cleps", "Morgan ressemble a un berger tervuren", "Morgan = Mega trou (je vous laisse chercher)"];
  let question = args.slice(0).join(" ");
  let res = Math.floor((Math.random() * replies.length));

  let msgaEmbed = new MessageEmbed()
      .setAuthor(message.author.tag)
      .setColor('RANDOM')
      .addField("Question : ", question)
      .addField("Réponse : " ,replies[res])

      message.channel.send(msgaEmbed)
    }

    exports.help = {
      name: "msga",
      aliases: ['msga']
  }
  
  exports.requirements = {
      botOwner: false,
      botPerms: [],
      userPerms: []
  }
  