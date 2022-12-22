import { SapphireClient } from '@sapphire/framework'

class FcClient extends SapphireClient {
  constructor() {
    super({
      intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS'
      ]
    })
  }

  async login() {
    await super.login(process.env.BOT_TOKEN)
  }
}

export default FcClient
