import React from 'react'
import PropTypes from 'prop-types'
import {get} from 'lodash'
import MatchQrCode from './MatchQrCode'
import PlayerList from './PlayerList'
import {assembleMatchUrl} from '../../utils'

import styles from '../styles/BeforeMatch.css'

class BeforeStart extends React.Component {
  static propTypes = {
    onStart: PropTypes.func,
    onKickPlayer: PropTypes.func,
    match: PropTypes.shape({
      slug: PropTypes.shape({
        current: PropTypes.string
      }),
      players: PropTypes.array,
      quiz: PropTypes.shape({
        title: PropTypes.string,
        questions: PropTypes.array,
        description: PropTypes.string
      })
    })
  }

  handleStart = () => this.props.onStart()

  handleKickPlayer = playerId => this.props.onKickPlayer(playerId)

  render() {
    const {match} = this.props
    const {players = [], quiz} = match
    const hasQuestions = quiz.questions && get(quiz, 'vragen', []).length > 0
    const matchClientUrl = assembleMatchUrl(match)

    return (
      <div className={styles.container}>
        <div className={styles.qrCodeMobile}>
          <p>
            <strong>{matchClientUrl}</strong>
          </p>
          <MatchQrCode match={match} />
          <p className={styles.instructions}>
            Scan the QR code om mee te spelen!
            <br />
            <small></small>
          </p>
          <p></p>
        </div>

        <section className={`${styles.section} ${styles.matchInfo}`}>
          <div>
            <h1 className={styles.quizName}>{quiz.title}</h1>
            <p className={styles.description}>{quiz.description}</p>
            <div className={styles.squizzy}>
              <img src="../../../../../src/assets/kompas.jpeg"/>
              <img src="../../../../../src/assets/lichtzijde.jpeg"/>
            </div>
            <div className={styles.matchDetails}>
              <div>
                <div className={styles.number}>{quiz.questions.length}</div>
                <div className={styles.infoLabel}>Vragen</div>
              </div>
              <div>
                <div className={styles.number}>{players.length}</div>
                <div className={styles.infoLabel}>Spelers</div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.matchPlayers}`}>
          <div className={styles.playerList}>
            <h2>Spelers</h2>
            <PlayerList match={match} onKickPlayer={this.handleKickPlayer} />
          </div>
          <div className={styles.qrCodeDesktop}>
            <p>
              <strong>{matchClientUrl}</strong>
            </p>
            <MatchQrCode match={match} />
            <p className={styles.instructions}>Scan de QR code om mee te spelen!</p>
          </div>
        </section>
      </div>
    )
  }
}

export default BeforeStart
