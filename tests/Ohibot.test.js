import { Ohibot } from '../src/lib/Ohibot'
import { default as personality } from '../src/assets/personalities/samplebot/samplebot'

const introduction = require('./introduction.json')
const logics = require('./logics.json')

test('instantiation', () => {
  const ohibot = new Ohibot(personality)

  expect(ohibot.introduction).toEqual(introduction)
  expect(ohibot.logics).toEqual(logics)
  expect(ohibot.writingSpeed).toBe(5)
})

test('introduce', () => {
  const ohibot = new Ohibot(personality)

  return ohibot.introduce().then(response => expect(response).toEqual({ answer: introduction }))
})

test('process fallback', () => {
  const ohibot = new Ohibot(personality)
  const fallback = {
    answer: [{ type: 'text', content: 'Mi sa che non ho capito' }]
  }

  return ohibot.process().then(response => expect(response).toEqual(fallback))
})

test('process', () => {
  const ohibot = new Ohibot(personality)
  const request = 'aiuto'
  const trigger = logics.find(({ triggers }) => triggers.includes([request]))

  return ohibot.process(request).then(response => expect(response).toEqual(trigger))
})
