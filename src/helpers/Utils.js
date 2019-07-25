const getAction = ({ action }, logics) => {
  return action
    ? {
        items: logics
          .filter(({ groups }) => groups && groups.filter(({ name }) => name === action.name).length > 0)
          .map(({ groups, question }) => ({
            label: groups.find(({ name }) => name === action.name).label,
            question: question
          })),
        filterable: action.filterable || false
      }
    : undefined
}

const getSpeechSynthesizerText = answer => {
  let text = answer.pronunciation
  if (!text) {
    switch (answer.type) {
      case 'html':
        {
          const el = document.createElement('div')
          el.innerHTML = answer.content
          text = el.innerText
        }

        break
      case 'image':
        if (answer.content.hasOwnProperty('alt')) {
          text = answer.content.alt
        }
        break
      case 'text':
        text = answer.content
        break
    }
  }

  return text
}

const getTriggers = ({ triggers }) => {
  return triggers
    .map(trigger =>
      trigger.reduce(
        (triggerRegExpString, keyword, index, array) =>
          triggerRegExpString.concat(`${keyword}\\b${index < array.length - 1 ? '.*\\b' : ''}`),
        '\\b'
      )
    )
    .reduce(
      (regexpString, triggerRegExpString, index, array) =>
        regexpString.concat(`${triggerRegExpString}${index < array.length - 1 ? '|' : ''}`),
      ''
    )
}

export default {
  getAction,
  getSpeechSynthesizerText,
  getTriggers
}
