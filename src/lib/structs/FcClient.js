import { SapphireClient } from '@sapphire/framework'
import { connect } from 'mongoose'

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
  mongooseConnect() {
    connect(process.env.MONGO_URI, (err) => {
      if(err) return console.log('Did not connect to MONGODB')

      console.log('Connected to MONGODB')
    })
  }
  async login() {
    this.mongooseConnect()
    await super.login(process.env.BOT_TOKEN)
  }
}

export default FcClient
