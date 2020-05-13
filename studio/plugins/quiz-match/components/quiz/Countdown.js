import React from 'react'
import {findCurrentQuestion} from '../../utils'
import styles from '../styles/Countdown.css'

import * as config from '../../../../quizConfig'
const {defaultTimeLimit} = config.default.schema

class Countdown extends React.Component {
  state = {
    seconds: 0,
    youtubeDuration: 0
   }

  handleCountdownDone = () => {
    this.props.onCountdownDone()
  }

  componentDidMount() {
    const {match} = this.props
    const currentQuestion = findCurrentQuestion(match)
    this.setState({seconds: currentQuestion.timeLimit || defaultTimeLimit})
    this.setState({youtubeDuration: currentQuestion.youtubeDuration || 0})

    this.myInterval = setInterval(() => {
      const {seconds} = this.state
      const {youtubeDuration} = this.state

      if (seconds > 0 && youtubeDuration === 0) {
        this.setState(({seconds}) => ({
          seconds: seconds - 1
        }))
      }
      if (youtubeDuration > 0 && seconds !== 0) {
        this.setState(({youtubeDuration}) => ({
          youtubeDuration: youtubeDuration - 1
        }))
      }
      if (seconds === 0 && youtubeDuration === 0) {
        this.handleCountdownDone()
        clearInterval(this.myInterval)
      }
    }, 1000)
  }

  render() {
    const {seconds} = this.state
    const {match} = this.props
    const {currentQuestion} = match
    const answerCount = match.answers
      ? match.answers.filter(answer => answer.questionKey === match.currentQuestionKey).length
      : 0
    return (
      <div className={styles.root}>
        <div className={styles.countdownWrapper}>
          <div>
            <h2 className={`${styles.seconds} ${seconds <= 5 ? styles.red : ''}`}>{seconds}</h2>
            <p className={styles.label}>Seconden over</p>
          </div>
          <div>
            <h2 className={styles.answers}>{answerCount}</h2>
            <p className={styles.label}>antwoorden</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Countdown
