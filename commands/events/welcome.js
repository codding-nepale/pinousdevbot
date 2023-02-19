module.exports = async (client, member) => {

    const channelId = '726722463953715202';
    const targetChannelId = '726722521763676242';
  
    client.on('guildMemberAdd', async (member) => {
      const message = `Bienvenue __<@${
        member.id
      }>__ sur **🐇 • Pinous Développement**  …🐇\nNous te souhaitons la Bienvenue !! Hésiter pas a faire un ticket si tu as besoin , Mes aussi a aider les autres utilisateurs du <:emoji_1:809485816384454666> serveur si ils ont un problème et que tu sais le régler ... Mais avant il te reste une étape rend-toi dans le channel **${member.guild.channels.cache
        .get(targetChannelId)
        .toString()}** pour avoir ton rôle`;
  
      const channel = member.guild.channels.cache.get(channelId);
      channel.send(message);
    })
  }
