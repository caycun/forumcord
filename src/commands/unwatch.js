
import FcCommand from '#structs/FcCommand.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import Schema from '#models/guild.js'
import removeItem from '#utils/index.js'

class UnwatchCommand extends FcCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Unwatch a forum channel; I\'ll remove the given channel in the database.'
    })
  }

  async chatInputRun(interaction) {
    const channel = interaction.options.getChannel('channel')
    if(channel.type !== 15) return interaction.reply('Channel type must be a forum.')
        
    const data = await Schema.findOne({guildId: interaction.guild.id})
    if(!data) {

      Schema.create({
        guildId: interaction.guild.id
      }).then((e) => e.save())

      return interaction.reply('This guild has no data.')

    } else {

      if(!data.forumChannels.includes(channel.id)) return interaction.reply('I\'m not watching this channel so I cannot unwatch.')
        
      data.forumChannels = removeItem(data.forumChannels, channel.id)
      data.save()

      return interaction.reply(`I am now unwatching <#${channel.id}>.`)

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

export default UnwatchCommand
