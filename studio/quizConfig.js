export default {
  localWebHost: 'http://localhost:3000', // default Vue port
  localApiHost: 'http://localhost:3000', // default Now API port
  remoteWebHost: 'https://kerkquiz.now.sh',
  match: {
    correctAnswerScore: 100,
    firstAnswerScore: 50
  },
  schema: {
    maxAnswerLength: 100,
    maxQuestionLength: 100,
    maxNumberOfChoices: 4,
    minNumberOfChoices: 2,
    defaultTimeLimit: 30
  }
}
