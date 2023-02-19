const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    message.delete();

        const embed = new MessageEmbed()
        .setAuthor(`Help`, client.user.avatarURL())
        .setColor("4D0348")
        .setDescription(`Nombre de commande : \`7\``)
        .addField("Liste :", "`-pping`, `-pserver-info`, `-puser-info` `-pinvite`, `-pmsga`, `-pafk`")
        .addField("Description :", "`-pping : Savoir la latence du bot Pinous'Dev et de l'API Discord`, `-pserver-info : Savoir les infos du serveur`, `-pinvite : Savoir le nombre d'invitation pour chaque jouur`, `-psuggest : suggestion`, ``-pmsga : réponse aléatoire a la question que vous posez`, `-pafk : status afk`")
        .setFooter('Pinous\'Dev Bot ©️ Help', client.user.avatarURL())
    message.channel.send(embed)

    }

    exports.help = {
        name: "help",
        aliases: ['help']
    }
    
    exports.requirements = {
        botOwner: false,
        botPerms: [],
        userPerms: []
    }
    