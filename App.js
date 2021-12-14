const Discord = require('discord.js')
const Settings = require('./Settings')
const chalk = require('chalk')
const client = new Discord.Client({
    disableEveryone: true,
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ],
    presence: {
        activity: {
            name: 'the chat!',
            type: 'WATCHING'
        },
        status: 'online'
    }
})

client.on('ready', async() => {
    console.log(chalk.magenta(`[INFO] `) + chalk.blue(`Bot is online! Made by: Severingcastle8#8743`))
    console.log(chalk.magenta(`[INFO] `) + chalk.blue(`You can invite the bot with the following link:`))
    console.log(chalk.magenta(`[INFO] `) + chalk.blue(`https://discord.com/oauth2/authorize?client_id=${Settings.botId}&scope=bot&permissions=274877975552`))
})

client.on('messageCreate', async (message) => {
    if(message.author.bot) return
    let check = await checkMessageMentions(message.mentions.users)

    if(check) {
        // EDIT Information here like the text showing in the embed when someone is mentioned!
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${Settings.name} • Support`, Settings.logo)
            .setTitle('Please avoid pining our staff team.')
            .setDescription(`While we do have a Discord server, it isn't our official way to get support. \n**If you need official support, we recommmend creating a ticket through the client area on our site (make sure you are logged in).** \n\n*Want community support? Send a message in <#919045425162485853>*`)
            .setColor(Settings.color)
            .setFooter(`Directed towards ${message.author.username}`, message.author.avatarURL({ dynamic: true, size: 512, format: 'webp' }))
            .setTimestamp()
        message.channel.send({embeds: [embed]})
    }
})

async function checkMessageMentions(mentionedUsers) {
    return new Promise((resolve, reject) => {
        Settings.users.forEach(user => { if(mentionedUsers.has(user)) resolve(true) })
        resolve(false)
    })
}

client.login(Settings.token)
