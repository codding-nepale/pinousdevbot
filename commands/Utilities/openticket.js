const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    message.delete()
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    let OpenTicket = new Discord.MessageEmbed()
    .setTitle("Pinous'Dev Ticket")
    .setDescription("**Bonjour,Bonsoir,**\n\n*Voici les critères pour ouvrir un ticket*\n\n- Besoin D'aide\n\n- Question Achat Script\n\n- Question Partenariat \n\n- Passer Commande\n\n\n*Pour Fermer Un ticket c'est très simple, vous avez juste a écrire le message suivant*\n\n```-pcloset```\n\n\n__Cordialement.__")
    .setFooter(`Pinous'Dev Ticket`, client.user.displayAvatarURL())
    .setColor("#4D0348")

    let myGuild = client.guilds.cache.get('726569618013028413')
    let SendChannel = myGuild.channels.cache.get('726730792545419265')
    SendChannel.send(OpenTicket)
    .then(msg => msg.react('🐇'))
}
  
    exports.help = {
      name: "openticket",
      aliases: ['opent']
  }
  
  exports.requirements = {
      botOwner: false,
      botPerms: [],
      userPerms: []
  }
  