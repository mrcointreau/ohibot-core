import { OhibotDecorator } from './OhibotDecorator'
import { SpeechSynthesizer } from '../helpers/SpeechSynthesizer'
import Utils from '../helpers/Utils'

export class SpeechSynthesisOhibot extends OhibotDecorator {
  constructor(ohibot, options = { speechSynthesis: { lang: navigator.language || navigator.userLanguage } }) {
    super(ohibot)

    this.synthesizer = new SpeechSynthesizer(options.speechSynthesis.lang, options.speechSynthesis.name)
  }

  pronounce(response) {
    const text = response.answer.map(answer => Utils.getSpeechSynthesizerText(answer))
    this.synthesizer.speak(text)

    return response
  }

  introduce() {
    return super.introduce().then(response => this.pronounce(response))
  }

  process(request) {
    return super.process(request).then(response => this.pronounce(response))
  }
}
