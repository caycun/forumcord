import FcCommand from '#structs/FcCommand.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import Schema from '#models/guild.js'

class WatchCommand extends FcCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Watch a forum channel; When someone creates a post, it will be logged in the configured log channel'
    })
  }

  async chatInputRun(interaction) {
    const channel = interaction.options.getChannel('channel')
    if(channel.type !== 15) return interaction.reply('Channel type must be a forum.')
        
    const data = await Schema.findOne({guildId: interaction.guild.id})
    console.log(data)
    if(!data) {
      Schema.create({
        guildId: interaction.guild.id,
        forumChannels: [channel.id]
      }).then((e) => e.save())

      return interaction.reply(`I am now watching <#${channel.id}> but there is no log channel! use \`/log\` command to set one.`)
    } else {
      if(data.forumChannels.includes(channel.id)) return interaction.reply('I\'m already watching this channel.')

      data.forumChannels.push(channel.id)
      data.save()
      if(!data.logChannel || !interaction.guild.channels.cache.get(data.logChannel)) {
        return interaction.reply(`I am now watching <#${channel.id}> but there is no log channel! use \`/log\` command to set one.`)
      } else {
        return interaction.reply(`I am now watching <#${channel.id}>.`)
      }

    }
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addChannelOption((builder) => 
        builder
          .setName('channel')
          .setDescription('The forum channel you want to watch.')
          .setRequired(true)
      )

    registry.registerChatInputCommand(command, {
      guildIds: this.vars.guildIds
    })
  }
}

export default WatchCommand
