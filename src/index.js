import 'dotenv/config.js'

import FcClient from './lib/structs/FcClient.js'

const client = new FcClient()
await client.login()
