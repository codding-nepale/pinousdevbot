const { Message, Client, MessageAttachment} = require('discord.js')
const fs = require('fs')

exports.run = async (client, message) => {
        /**
     * @param {Client} client
     * @param {Message} message
     */
         if(message.channel.parentID !== '846478384930226246') return message.channel.send('Vous ne pouvez utiliser cette commande que dans un ticket!');
         const transcriptChannel = message.guild.channels.cache.get('846435254885548103')
         message.channel.send('Suppression du ticket dans 5 secondes.....')
         setTimeout(() => {
             message.channel.delete().then(async ch => {
                 client.ticketTranscript.findOne({ Channel : ch.id }, async(err, data) => {
                     if(err) throw err;
                     if(data) {
                         fs.writeFileSync(`logs-ticket/${ch.id}.txt`, data.Content.join("\n\n"))
                         await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`logs-ticket/${ch.id}.txt`)));
                         client.ticketTranscript.findOneAndDelete({ Channel : ch.id })
                     }
                 })
             })
         }, 5000)
    }
  
    exports.help = {
      name: "closet",
      aliases: ['closet']
  }
  
  exports.requirements = {
      botOwner: false,
      botPerms: [],
      userPerms: []
  }