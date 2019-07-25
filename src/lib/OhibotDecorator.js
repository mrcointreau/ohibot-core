import { OhibotInterface } from './OhibotInterface'

export class OhibotDecorator extends OhibotInterface {
  constructor(ohibot) {
    super()

    this.ohibot = ohibot
  }

  introduce() {
    return this.ohibot.introduce()
  }

  process(request) {
    return this.ohibot.process(request)
  }
}
