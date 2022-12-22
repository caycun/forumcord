import { Listener } from '@sapphire/framework'

class ReadyListener extends Listener {
  constructor(context) {
    super(context, {
      once: true
    })
  }

  run() {
    this.container.logger.info(`Logged in as ${this.container.client.user.tag}.`)
  }
}

export default ReadyListener
