import FcCommand from '#structs/FcCommand.js'
import { SlashCommandBuilder } from '@discordjs/builders'

class PingCommand extends FcCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Ping! Pong!'
    })
  }

  async chatInputRun(interaction) {
    await interaction.reply('Pong!')
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)

    registry.registerChatInputCommand(command, {
      guildIds: this.vars.guildIds
    })
  }
}

export default PingCommand
