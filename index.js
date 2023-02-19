//pas toucher
const discord = require ("discord.js");
const Discord = require("discord.js");
const fs = require('fs');
const moment = require('moment');
const client = new discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
});
const DisTube = require('distube')

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `🎶Je joue le son **${song.name}**\nDemandé par ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `🎶Le song **${song.name}** a été ajouter a la liste avec succès✅ \nPar ${song.user}`
    ))
const database = require('quick.db');
const colours = require("./colours.json");
const prefix = "-p";
const enmap = require("enmap");
//const LOWDB//
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

//LOWDB//
const dbdb = new FileSync("Pinous'Devclientdb.json");
const db = low(dbdb);

db.defaults({infos_membres: []}).write()

//event and utils//
const memberCount = require("./commands/events/member-counter");
const inviteTracker = require("./commands/events/inviteTracker");
const welcome = require("./commands/events/welcome")

//login mongoosedb and const bdd and token and recup token twitch//

const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:Sapinet123@astraliabdd.sko8n.mongodb.net/Data', {
    useUnifiedTopology : true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo db succenfull!'))

client.login(config.TOKEN);

const fetch = require('node-fetch');

fetch("https://id.twitch.tv/oauth2/token?client_id=xo3qr0djoc3mls7lfany5b9th2vnhr&client_secret=k7wrne143yun8lfwfxpuaslvssrvgh&grant_type=client_credentials", {
    method: "POST"
}).then(res => {
    res.json()
})

const bdd = require("./bdd.json");

//schema//
 
client.ticketTranscript = mongoose.model('transcripts', 
    new mongoose.Schema({
        Channel : String,
        Content : Array
    })
)
// -------------------------------------------------

client.on('message', async(message) => {
    if(message.channel.parentID !== '846478384930226246') return;
    client.ticketTranscript.findOne({ Channel : message.channel.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
           console.log('there is data')
           data.Content.push(`${message.author.tag} : ${message.content}`) 
        } else {
            console.log('there is no data')
            data = new client.ticketTranscript({ Channel : message.channel.id, Content: `${message.author.tag} : ${message.content}`})
        }
        await data.save()
            .catch(err =>  console.log(err))
        console.log('data is saved ')
    })

})

//XP//

client.on("message", async message => {
    let msgauthorid = message.author.id

    if(message.author.client) return
    if(!db.get("infos_membres").find({id: msgauthorid}).value()){
        db.get("infos_membres").push({id: msgauthorid, xp: 1, niveau: 1, xp_p_niveau: 50}).write()
        console.log("XP en marche")
    }else {
        let userxpdb = db.get("infos_membres").filter({id: msgauthorid}).find("xp").value()
        let userxp = Object.values(userxpdb)
        let userniveaudb = db.get("infos_membres").filter({id: msgauthorid}).find("niveau").value()
        let userniveau = Object.values(userniveaudb)
        let userpniveaudb = db.get("infos_membres").filter({id: msgauthorid}).find("xp_p_niveau").value()
        let userpniveau = Object.values(userpniveaudb)

        let chiffre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let index = Math.floor(Math.random() * (chiffre.length - 1) + 1)

        db.get("infos_membres").find({id: msgauthorid}).assign({id: msgauthorid, xp: userxp[1] += chiffre[index]}).write()

        if(userxp[1] >= userpniveau[3]){
            db.get("infos_membres").find({id: msgauthorid}).assign({id: msgauthorid, xp: userxp[1] = 1}).write()
            db.get("infos_membres").find({id: msgauthorid}).assign({id: msgauthorid, niveau: userniveau[2] += 1}).write()
            db.get("infos_membres").find({id: msgauthorid}).assign({id: msgauthorid, xp_p_niveau: userpniveau[3] += 10}).write()
            message.channel.send(`GG ${message.author} vous vennez de passer niveau ${userniveau[2]}, il vous faut maintenant ${userpniveau[3]} point d'XP pour passer au niveau suivant`)
        }
    }
})

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});

//Commands
 
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const loadCommands = require("./functions/commands.js");

const load = async () => {
    await loadCommands.run(client);
    await loadEvents.run(client);
}

client.color = require("./Storage/color.json");
client.functions = require("./functions/functions.js");

load();

 
client.on('message', message => {

    const args = message.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.aliases.get(command);
   
    if(!message.content.toLowerCase().startsWith("-p") || !message.guild || message.author.bot || !cmd) return;
    cmd.run(client, message, args).catch(e => {return console.log(e)});
   
});
   

client.on("message", async (message, user) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm"){
        return client.channels.cache.get("726750095743123497").send(message.content + "\n\nMessage de: @" + message.author.username + "#" + message.author.discriminator)
    }
});

//filtre lien discord

client.on("message", async message => {
    if(message.content.includes("https://discord.gg/") || message.content.includes("http://discord.gg/") || message.content.includes("www.discord.gg/")){
        let channelPub = client.guilds.cache.get("726569618013028413").channels.cache.get("799951713783513088")

        if(message.member.roles.cache.has("832323105597947904") || message.member.roles.cache.has("832323106382807050") || message.member.roles.cache.has("832322266963902485") || message.member.roles.cache.has("832323110036308112")){
            return
        }else if(channelPub == message.channel){
            return
        }else{
            message.delete()
            const embedlien = new MessageEmbed()
            .setColor("E53939")
            .setTitle("Avertissement Automatique")
            .setDescription(`*Les liens dans les channels* **ne sont pas autorisés** *sur notre serveur comme tout autre promotion de contenu.*\n\n**Infraction**\n\n*Vous avez commis une infraction au règlement sur le serveur* **${message.guild.name}**\n**Prochaine sanction**\n*Si vous* **refusez de respecter** *nos règles ou que vous les* **contestez** *vous serez automatiquement* **expulsé du serveur.**`)

        message.author.send(embedlien);
        }
    }
})

//ghostping

client.on('messageDelete', async (message, user, bot) => {
    if(message.content && message.content.includes("<@")){
        if(user.bot) return;
        const embedGhostPing = new MessageEmbed()
        .setColor("2600E4")
        .setAuthor("GHOSTPING", message.author.displayAvatarURL({dynamic: true}))
        .addField("Contenue du ghostping", message.content.length < 1024 ? message.content : "Contenue trop long")
        .addField("Membre ayant ghostping", message.author.username)
        message.channel.send(embedGhostPing)
    }
})

client.on('messageUpdate', async (oldMessage, newMessage, user, bot) => {
    if(oldMessage.content && oldMessage.content.includes("<@")){
        if(user.bot) return;
        const embedGhostPing = new MessageEmbed()
        .setColor("2600E4")
        .setAuthor("GHOSTPING", oldMessage.author.displayAvatarURL({dynamic: true}))
        .addField("Contenue du ghostping", oldMessage.content.length < 1024 ? oldMessage.content : "Contenue trop long")
        .addField("Membre ayant ghostping", oldMessage.author.username)
    oldMessage.channel.send(embedGhostPing)
    }
})

//logs

client.on('inviteCreate', async invite => {
    const embedLogsinviteCreate = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor(invite.inviter.username, invite.inviter.displayAvatarURL({dynamic: true}))
        .addField('**Lien d\'invitation crée**', `https://discord.gg/${invite.code}`)

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsinviteCreate)
})

client.on('inviteDelete', async invite => {
    const embedLogsinviteDelete = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor('Suppresion d\'une invitation', invite.guild.iconURL({dynamic: true}))
        .addField('**Lien d\'invitation supprimé**', `https://discord.gg/${invite.code}`)

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsinviteDelete)
})

client.on('roleCreate', async role => {
    const embedLogsRoleCreate = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor('Role Create')
        .addField('**Role crée**', role.name)

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsRoleCreate)
})

client.on('roleDelete', async role => {
    const embedLogsRoleDelete = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor('Role Delete')
        .addField('**Role supprimé**', role.name)

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsRoleDelete)
})

client.on('roleUpdate', async (oldRole, newRole) => {
    const embedLogsRoleUpdate = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor('Role Update')
        .addField('**Role mis à jour**', oldRole.name)

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsRoleUpdate)
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
        const embedLogsMessageUpdate = new MessageEmbed()
        .setColor("2600E4")
        .setAuthor("Message Update", newMessage.author.displayAvatarURL({dynamic: true}))
        .addField("**Message modifié**", newMessage.content)
        .addField('**Channel ou le message a été modifié**', newMessage.channel)

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsMessageUpdate)
})

client.on('messageDelete', async message => {
    const embedLogsMessageDelete = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor("Message Suprimé", message.author.displayAvatarURL({dynamic: true}))
        .addField('**Message supprimé**', message.content)
        .addField('**Channel ou le message a été supprimé**', message.channel)

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsMessageDelete)
})

client.on('channelCreate', async (channel, message) => {
    const embedLogsChannelCreate = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor(message.username, message.author.displayAvatarURL({dynamic: true}), "Creation d'un channel")
        .addField('**Channel crée**', channel.name)
        .setTimestamp()

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsChannelCreate)
})

client.on('channelDelete', async (channel, message) => {
    const embedLogsChannelDelete = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor("Suppression d'un channel")
        .addField('**Channel Supprimé**', channel.name)
        .setTimestamp()
        .setFooter(message.username, message.author.displayAvatarURL({dynamic: true}))

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogsChannelDelete)
})

client.on('webhookUpdate', async (channel, message) => {
    const embedLogswebhookUpdate = new MessageEmbed()
        .setColor('2600E4')
        .setAuthor("Update d'un webhook")
        .addField('**Channel du webhook**', channel.name)
        .setTimestamp()
        .setFooter('Pinous\'Dev Logs ©️ Logs Webhook')

    client.guilds.cache.get('726569618013028413').channels.cache.get('726750095743123497').send(embedLogswebhookUpdate)
})

//console démarage bot and notif ect

      client.on("ready", async () => {
      console.log(`${client.user.tag} est connecter sur Discord`);
      console.log("Collecte d'informations en cours... ");
      memberCount(client);
      welcome(client);
      console.log("Collecte d'informations terminer ");
      console.log(`${client.user.tag} est très bien connecter a Discord est il est opérationnel`);
      });
    
    client.on('ready', () => {
        const statuses = [
            () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`,
            () => `son developpement `
        ]
        let i = 0
        setInterval(() => {
            client.user.setActivity(statuses[i](), {type: 'WATCHING'})
            i = ++i % statuses.length
        }, 1e4)
    });
//delete channel
const channelName = "726569618013028413"
client.on('ready', async () => {
    // Récupérez le serveur auquel le bot est connecté
    const guild = client.guilds.cache.first();
    
    // Récupérez tous les salons du serveur qui ont le nom spécifié
    const channels = guild.channels.cache.filter(c => c.name === channelName);
    
    // Comptez le nombre de salons trouvés
    const count = channels.size;
    
    // Si aucun salon n'a été trouvé, affichez un message d'erreur
    if (count === 0) {
      console.error(`Aucun salon n'a été trouvé avec le nom "${channelName}" !`);
      return;
    }
    
    // Pour chaque salon trouvé, supprimez-le
    for (const channel of channels.values()) {
      await channel.delete();
    }
    
    // Affichez un message de confirmation de suppression dans la console
    console.log(`${count} salons ont été supprimés !`);
  });

//ticket

client.on('messageReactionAdd', async(reaction, user) => {
    const message = reaction.message
    const member = message.guild.members.cache.get(user.id)

    if(user.bot) return;

    if(
        ['🐇', '💻','🚧'].includes(reaction.emoji.name)
    ) {
        switch(reaction.emoji.name) {

            case '🐇':
                if(reaction.message.channel.name !== "📌•𝘛𝘪𝘤𝘬𝘦𝘵-𝘚𝘶𝘱𝘱𝘰𝘳𝘵") return console.log('L\'emoji à été utiliser dans un autre salon')

                reaction.users.remove(user);

                let channellogserr = message.guild.channels.cache.find(c => c.name == "logs-erreur-bot")
                let username = user.username;
                let TicketCategoryID = "846478384930226246";
                let channel = await message.guild.channels.create(`ticket-${username}`, {type: 'text', parent: message.guild.channels.cache.get(TicketCategoryID)})
                .catch(err => {
                    channellogserr.send('<@601156813022298112>')
                    channellogserr.edit(new MessageEmbed()
                        .setColor('f94343')
                        .setTitle("Erreur dans le [messageReactionAdd] du code du ticket voici l'erreur :" + err)
                        .setFooter(`Pinous'Dev Logs Error ©️ Logs Error`, client.user.displayAvatarURL())
                    )
                })

                channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
                channel.updateOverwrite(member, {
                    'VIEW_CHANNEL': true,
                    'SEND_MESSAGES': true,
                    'ADD_REACTIONS': true
                })
                channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == '• Support Discord' || role.name == '• Helpeur' || role.name == '• Support' || role.name == '• Staff' || role.name == '• Support Confirmé' || role.name == '• Modérateur YTB'), {'VIEW_CHANNEL': true});

                var embedticket = new MessageEmbed()
                    .setColor("#4D0348")
                    .setDescription(`**Bonjour,Bonsoir,**\n\n*Merci de spécifier la raison de votre ouverture de ticket en cliquant sur la réaction qui y convient*\n\n:computer: • Question ou Demande Partenariat\n\n:construction: • Pour une demande d'assistance\n\n__Cordialement.__\n\n<@741605317451710537>`)
                    .setFooter(`Pinous'Dev Ticket Welcome ©️ Ticket Welcome`, client.user.displayAvatarURL())

                    const everyonemsg = await channel.send(`${message.guild.roles.everyone}`)
                    await everyonemsg.delete()
                    const msgticket = await channel.send(embedticket)
                    await Promise.all(['💻','🚧'].map(r => msgticket.react(r)));
                    let logchannel = message.guild.channels.cache.find(c => c.name == 'logs-ticket')
                    if(!logchannel) return;
                    logchannel.send(new MessageEmbed()
                        .setColor("#4D0348")
                        .setTitle(`Ticket Ouvert`)
                        .setDescription(`Le membre ${member} a créer un ticket\n\nVoici le channel : ${channel}(${channel.name})`)
                        .setFooter(`Pinous'Dev Ticket Logs ©️ Ticket Ouvert`, client.user.displayAvatarURL())
                        )
                break;
                case '💻':
                    message.guild.channels.cache.get(message.channel.id).setName(`ticket-partenaire-${user.username}`)
                    message.edit(embedticket = new MessageEmbed()
                    .setColor("#4D0348")
                    .setDescription(`**Merci d'avoir spécifié la raison de votre ouverture de ticket , Une personnes de nos équipe vont vous répondre. En attendant ecriver votre requête**\n\n__Cordialement.__`)
                    .setFooter(`Pinous'Dev Ticket Welcome ©️ Ticket Welcome`, client.user.displayAvatarURL())
                    )
                    message.reactions.removeAll();
                    await Promise.all(['❌'].map(r => r.react(r)));
                break;
                case '🚧':
                    message.guild.channels.cache.get(message.channel.id).setName(`ticket-aide-${user.username}`)
                    message.edit(embedticket = new MessageEmbed()
                    .setColor("#4D0348")
                    .setDescription(`**Merci d'avoir spécifié la raison de votre ouverture de ticket , Une personnes de nos équipe vont vous répondre. En attendant ecriver votre requête**\n\n__Cordialement.__`)
                    .setFooter(`Pinous'Dev Ticket Welcome ©️ Ticket Welcome`, client.user.displayAvatarURL())
                    )
                    message.reactions.removeAll();
                    await Promise.all(['❌'].map(r => r.react(r)));
                    break;
            }
    }
})

client.on("message", async message => {
    if(message.content.startsWith(`-pcloset`)) {
            const member = message.author.name;
            let TicketOpenCategoryID = '846478384930226246';
            let channel = await message.guild.channels.create(`ticket-${username}`, {type: 'text', parent: message.guild.channels.cache.get(TicketOpenCategoryID)})
            let logchannel = message.guild.channels.cache.find(c => c.name == 'logs-ticket')
            if(!logchannel) return;
            logchannel.send(new MessageEmbed()
                    .setColor("#4D0348")
                    .setTitle(`Ticket Fermé`)
                    .setDescription(`Le membre ${member} a fermer son ticket\n\nVoici le channel : ${ch.name}\n\nEt voici les logs de celui-ci disponible ci-joint :`)
                    .setFooter(`Pinous'Dev Ticket Logs ©️ Ticket Fermé`, client.user.displayAvatarURL())
            )
    }
})

// ban kick
 
client.on("message", message => {
    if(message.author.client) return;
    if(message.channel.type == "dm") return;
 
    if(message.member.hasPermission('MANAGE_MESSAGES')){
        if(message.content.startsWith("-pban")){
            let mention = message.mentions.members.first();
 
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni de 🗽• Pinous'Dev RolePlay.")
                }
     
                else {
                    message.reply("Imposible de bannir ce membre car celui-ci est le fondateur de se serveur discord ou il a des permissions trop éleve.");
                }
            }
        }
        else if(message.content.startsWith("-pkick")){
            let mention = message.mentions.members.first();
 
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick de 🗽• Pinous'Dev RolePlay.");
                }
                else {
                    message.reply("Imposible de bannir ce membre car celui-ci est le fondateur de se serveur discord ou il a des permissions trop éleve.");
                }
            }
        }
        else if(message.content.startsWith("-pmute")){
            let mention = message.mentions.members.first();
 
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                mention.roles.add("800021589193523200");
                message.reply(mention.displayName + " a bien été mute")
            }
        }
        else if(message.content.startsWith("-punmute")){
            let mention = message.mentions.members.first();
 
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                mention.roles.remove("800021589193523200");
                message.channel.send(mention.displayName + " a bien été unmute");
            }
        }
        else if(message.content.startsWith("-ptempmute")){
            let mention = message.mentions.members.first();
 
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                let args = message.content.split(" ");
 
                mention.roles.add("800021589193523200");
                setTimeout(function() {
                    mention.roles.remove("800021589193523200");
                    message.channel.send("<@" + mention.id + "> tu peux désormais reparler");
                }, args[2] * 1800)
            }
        }
    }
})
 
//CMD MESSAGE

client.on('message', (message) => {
    if (message.content === '-psoon') {
        message.channel.send('*Mention:* ||@everyone||\n\n```Soon```\n\n**La Fonction seras disponible Prochainement**\n\n __Toute L\'équipe du staff__.')
    }
});

//dm

const { DMChannel, MessageEmbed } = require("discord.js");
const { url } = require("inspector");
const { type } = require("os");
const { time } = require("console");

client.on("message", async message => {
    if(message.content.startsWith("-pdm")) {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            async (client, message, args) => {
                const member = message.guild.members.cache.get(args[0]);
                member.user.send(
                    new MessageEmbed()
                    .setDescription(args.slice(1).join(' '))
                    .setFooter(`Pinous'Dev Serveur ©️ DM`)
                    .setColor('2600E4')
                    .setTimestamp()
                ).then(() => message.channel.send('le DM a été envoyer avec succès'))
            }
        }
    }
})

client.on("message", async message => {
    if(message.content.startsWith("-pdc")) {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            async (client, message, args) => {
                const fetchedChannel = message.guild.channels.find(r => r.name === '726569618013028413');
                fetchedChannel.delete();
                m
            }
        }
    }
})

//clear

client.on("message", async (message, user) => {
      if(message.content.startsWith("-pclear")){
          if(message.member.hasPermission("MANAGE_MESSAGES")){
            let dl = message.content.split(" ").slice(1)
            if(!dl || isNaN(dl) || dl > 100 | dl < 1) return message.reply("Veuillez choisir un nombre compris entre 1 et 99")
            let dlf = Number(dl)

            message.delete()

            message.channel.bulkDelete(dlf+1, true).then(message.channel.send("Vous venez de supprimer "+dlf+ " message(s).")).catch(console.error)
            setTimeout(() => {
                message.delete(user.bot)
            }, 500)
          }
      }
})

//bienvenue

client.on('message', message => {
    if (message.content === `-pjoin`) {
        client.emit(`guildMemberAdd`, message.member);
    }
});

//twitch notif



//sug

client.on("message", async message => {
    if(message.content.startsWith("-psug")){
        message.delete()
        let msg = message.content.slice(4)
        if(!msg) return message.reply("Votre suggestion")

        let embedsug = new Discord.MessageEmbed()
        .addField("Nouvelle suggestion de "+message.author.username, msg)
        .setColor("4c8bf5")
        client.guilds.cache.get('726569618013028413').channels.cache.get('833685719565598790').send(embedsug);
        message.reply("Votre suggestion a été envoyer")
    }
})