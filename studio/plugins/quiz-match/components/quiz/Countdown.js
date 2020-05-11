import React from 'react'
import {findCurrentQuestion} from '../../utils'
import styles from '../styles/Countdown.css'

import * as config from '../../../../quizConfig'
const {defaultTimeLimit} = config.default.schema

class Countdown extends React.Component {
  state = {
    seconds: 0
   }

  handleCountdownDone = () => {
    this.props.onCountdownDone()
  }

  componentDidMount() {
    const {match} = this.props
    const currentQuestion = findCurrentQuestion(match)
    this.setState({seconds: currentQuestion.timeLimit || defaultTimeLimit})
    if (this.currentQuestion.youtube && this.currentQuestion.youtubeDuration) {
      setTimeout(() => {
        this.myInterval = setInterval(() => {
          const {seconds} = this.state
          const timeLimit = currentQuestion.timeLimit
          const halfTime = timeLimit / 2
          if (seconds <= halfTime + 1) {
            this.setState({
              mouth: 'default'
            })
          }
    
          if (seconds <= 11) {
            this.setState({
              mouth: 'line'
            })
          }
    
          if (seconds <= 6) {
            this.setState({
              mouth: 'sad'
            })
          }
    
          if (seconds > 0) {
            this.setState(({seconds}) => ({
              seconds: seconds - 1
            }))
          }
          if (seconds === 0) {
            this.handleCountdownDone()
            clearInterval(this.myInterval)
          }
        }, 1000)    
      }, this.currentQuestion.youtubeDuration)
    } else {
      this.myInterval = setInterval(() => {
        const {seconds} = this.state
        const timeLimit = currentQuestion.timeLimit
        const halfTime = timeLimit / 2
        if (seconds <= halfTime + 1) {
          this.setState({
            mouth: 'default'
          })
        }
  
        if (seconds <= 11) {
          this.setState({
            mouth: 'line'
          })
        }
  
        if (seconds <= 6) {
          this.setState({
            mouth: 'sad'
          })
        }
  
        if (seconds > 0) {
          this.setState(({seconds}) => ({
            seconds: seconds - 1
          }))
        }
        if (seconds === 0) {
          this.handleCountdownDone()
          clearInterval(this.myInterval)
        }
      }, 1000)  
    }
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
