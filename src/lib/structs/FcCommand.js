import { Command } from '@sapphire/framework'
import vars from '#vars'

class FcCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options
    })

    this.vars = vars
  }
}

export default FcCommand
