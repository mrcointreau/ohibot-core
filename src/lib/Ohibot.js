import { OhibotInterface } from './OhibotInterface'
import Utils from '../helpers/Utils'

export class Ohibot extends OhibotInterface {
  constructor({ introduction, logics }, writingSpeed = 5) {
    super()

    this.introduction = introduction

    this.logics = logics.map(logic => ({
      ...logic,
      action: Utils.getAction(logic, logics),
      triggers: Utils.getTriggers(logic)
    }))

    this.writingSpeed = writingSpeed
  }

  introduce() {
    return new Promise(resolve => {
      const response = { answer: this.introduction }

      setTimeout(() => resolve(response), 0)
    })
  }

  process(request) {
    return new Promise(resolve => {
      const response = this.logics.find(logic => new RegExp(logic.triggers, 'i').exec(request)) || {
        answer: [{ type: 'text', content: 'Mi sa che non ho capito' }]
      }
      const responseLength = response.answer.reduce((length, { content }) => length + (content.length || 0), 0)

      setTimeout(() => resolve(response), responseLength * this.writingSpeed)
    })
  }
}
