//pas toucher
const discord = require ("discord.js");
const Discord = require("discord.js");
const client = new discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
});

const { promisify } = require('util');

const wait = promisify(setTimeout);

let invites;

const id = '726569618013028413';

client.on('ready', async() => {
    await wait(2000);

    client.guilds.cache.get(id).fetchInvites().then(inv => {
        invites = inv;
    })
})

client.on('guildMemberAdd', async(member) => {
    if(member.guild.id !== id) return;

    member.guild.fetchInvites().then(gInvites => {
        const invite = gInvites.find((inv) => invites.get(inv.code).uses < inv.uses);

        const channel = member.guild.channels.cache.get('846463733894348870');

        channel.send(`<@${member}> a était inviter par <@${invite.inviter.id}> avec le code https://discord.gg/${invite.code}\n<@${invite.inviter.id}> compte ${member.guild.fetchInvites()} invitation sur ce serveur`);
    })
})