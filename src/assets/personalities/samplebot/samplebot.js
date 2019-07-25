export default {
  introduction: [
    { type: 'text', content: 'Ciao!' },
    {
      type: 'text',
      content: `Per maggiori indicazioni digita 'aiuto'`
    }
  ],
  logics: [
    {
      question: 'Aiuto',
      triggers: [['aiuto']],
      answer: [{ type: 'text', content: 'Ecco i tipi di azioni che puoi utilizzare per interagire con me' }],
      action: { name: 'aiuto' }
    },
    {
      question: `Potresti comporre un semplice testo per me?`,
      triggers: [['testo']],
      answer: [{ type: 'text', content: 'No' }],
      groups: [{ name: 'aiuto', label: 'Testo' }, { name: 'filtrabile', label: 'Testo' }]
    },
    {
      question: `Mi mandi una GIF?`,
      triggers: [['gif']],
      answer: [
        { type: 'text', content: `Ecco la tua GIF` },
        { type: 'image', content: { downloadable: true, src: './zombie.gif', type: 'gif' } }
      ],
      groups: [{ name: 'aiuto', label: 'GIF' }, { name: 'filtrabile', label: 'GIF' }]
    },
    {
      question: `Mi mandi un video di YouTube?`,
      triggers: [['youtube']],
      answer: [
        { type: 'text', content: 'Adoro i Dire Straits' },
        { type: 'youtube', content: { src: 'https://www.youtube.com/watch?v=8Pa9x9fZBtY', autoplay: true } }
      ],
      groups: [{ name: 'aiuto', label: 'Youtube' }, { name: 'filtrabile', label: 'Youtube' }]
    },
    {
      question: 'Mi mandi un link utile?',
      triggers: [['link']],
      answer: [
        { type: 'text', content: 'Big G' },
        { type: 'link', content: { href: 'http://www.google.com', label: 'Clicca qui', target: '_blank' } }
      ],
      groups: [{ name: 'aiuto', label: 'Link' }, { name: 'filtrabile', label: 'Link' }]
    },
    {
      question: 'Mi fai filtrare qualcosa?',
      triggers: [['filtrare']],
      answer: [{ type: 'text', content: `A te` }],
      action: { name: 'filtrabile', filterable: true },
      groups: [{ name: 'aiuto', label: 'Filtrabile' }, { name: 'filtrabile', label: 'Filtrabile' }]
    },
    {
      question: 'test',
      triggers: [['test']],
      answer: [
        { type: 'text', content: 'test' },
        { type: 'image', content: { downloadable: true, src: './zombie.gif', type: 'gif' } },
        { type: 'youtube', content: { src: 'https://www.youtube.com/watch?v=8Pa9x9fZBtY', autoplay: true } },
        { type: 'link', content: { href: 'http://www.google.com', label: 'Clicca qui', target: '_blank' } }
      ]
    }
  ]
}
