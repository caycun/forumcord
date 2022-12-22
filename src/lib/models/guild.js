import { Schema, model } from 'mongoose'

const schema = new Schema({
  guildId: String,
  forumChannels: Array,
  logChannel: String
})

export default  model('guilds', schema)
