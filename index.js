// Discord
const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");

// İNTENTS
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });

const PARTIALS = Object.values(Partials);
const Discord = require("discord.js");
const config = require("./config.json");
// Database
const db = require("croxydb")

global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: false,
        type: 1
    });

    console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

// Bir Hata Oluştu
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
})

process.on("unhandledRejection", async (error) => {
    return console.log("Bir hata oluştu! " + error)
})
//
//
//

client.on("guildMemberAdd", async member => {
    if (member.user.bot) return;
    member.guild.members.cache.get(member.id).roles.add(config.REGİSTER_ROLE).catch(e => { })
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.values[0] === "s_1") {
        db.add(`toplam_${interaction.guild.id}`, 1)
        db.add(`s1_${interaction.guild.id}`, 1)
        await interaction.member.roles.remove(config.REGİSTER_ROLE).catch(e => { console.log(e)})
        interaction.member.roles.add(config.REGİSTERED_ROLE).catch(e => { })
    }

    if (interaction.values[0] === "s_2") {
        db.add(`toplam_${interaction.guild.id}`, 1)
        db.add(`s2_${interaction.guild.id}`, 1)
        interaction.member.roles.remove(config.REGİSTER_ROLE).catch(e => { })
        interaction.member.roles.add(config.REGİSTERED_ROLE).catch(e => { })
    }

    if (interaction.values[0] === "s_3") {
        db.add(`toplam_${interaction.guild.id}`, 1)
        db.add(`s3_${interaction.guild.id}`, 1)
        interaction.member.roles.remove(config.REGİSTER_ROLE).catch(e => { })
        interaction.member.roles.add(config.REGİSTERED_ROLE).catch(e => { })
    }

    if (interaction.values[0] === "s_4") {
        db.add(`toplam_${interaction.guild.id}`, 1)
        db.add(`s4_${interaction.guild.id}`, 1)
        interaction.member.roles.remove(config.REGİSTER_ROLE).catch(e => { })
        interaction.member.roles.add(config.REGİSTERED_ROLE).catch(e => { })
    }
})

