export class SpeechSynthesizer {
  constructor(lang, name) {
    this.synthesizer = window.speechSynthesis
    this.getVoice(lang, name).then(voice => (this.voice = voice))
  }

  getVoice(lang, name) {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        const voices = this.synthesizer.getVoices()
        if (voices.length !== 0) {
          clearInterval(intervalId)

          let voice = voices.find(voice => voice.lang === lang && voice.name === name)
          // fallback to given lang
          if (!voice) {
            voice = voices.find(voice => voice.lang === lang)

            // fallback to browser default
            if (!voice) {
              voice = voices.find(voice => voice.default === true)
            }
          }

          resolve(voice)
        }
      }, 10)
    })
  }

  speak(text) {
    if (this.voice) {
      const ssu = new SpeechSynthesisUtterance(text)
      ssu.voice = this.voice

      setTimeout(() => {
        this.synthesizer.speak(ssu)
      }, 500)
    } else {
      setTimeout(() => {
        this.speak(text)
      }, 100)
    }
  }
}
