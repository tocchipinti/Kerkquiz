import React from 'react'
import client from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import styles from '../styles/Question.css'
import Icons from '../Icons'
import Countdown from './Countdown'
import {findCurrentQuestion} from '../../utils'
import YouTube from 'react-youtube';

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

class Question extends React.Component {

  handleCloseQuestion = () => {
    this.props.onCloseQuestion()
  }

  renderChoices = () => {
    const {match} = this.props
    const currentQuestion = findCurrentQuestion(match)

    return currentQuestion.choices.map((choice, index) => {
      const Symbol = Icons[index]
      return (
        <div key={choice._key} className={styles.choiceCard} data-choice={index}>
          <div className={styles.inner}>
            <div className={styles.symbol}>
              <Symbol />
            </div>
            <div className={styles.choiceTitle}>{choice.title}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    const {match} = this.props
    const currentQuestion = findCurrentQuestion(match)
    const title = currentQuestion.title
    const group = currentQuestion.group
    const titleLength = title.split('').length
    const questionImageUrl = urlFor(currentQuestion.image)
      .width(300)
      .url()
    const youtubeId = currentQuestion.youtube;
    const opts = {
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        width: 1908,
        height: 690,
        rel: 0,
        end: currentQuestion.youtubeEndTime,
        start: currentQuestion.youtubeStartTime
      },
    };
    return (
      <div className={styles.root}>
        <Countdown match={match} onCountdownDone={this.handleCloseQuestion} />
        <div className={styles.questionWrapper}>
          <div className={styles.title}>
            <div className={styles.questionImage}>
              {questionImageUrl && <img className={styles.imageSrc} src={questionImageUrl} />}
            </div>
            <div className={styles.questionVideo}>
              {youtubeId && <YouTube className={styles.youtubeHeader} videoId={youtubeId} opts={opts} onEnd={this._onEnd} onReady={this._onReady} />}
            </div>
            <h1 className={styles.questionTitle}>{group}</h1>
            <h1
              className={`
                ${styles.questionTitle}
                ${questionImageUrl ? styles.titleWithImage : ''}
                ${titleLength >= 60 ? styles.titleLong : ''}
                ${titleLength <= 20 ? styles.titleShort : ''}`}
            >
              {title}
            </h1>
          </div>
          <div className={styles.choices} data-grid={currentQuestion.choices.length}>
            {this.renderChoices()}
          </div>
        </div>
      </div>
    )
  }

  _onReady(event) {
    event.target.setVolume(100);
    event.target.playVideo();
  }
  _onEnd(event) {
    event.target.seekTo(1);
    event.target.pauseVideo();
  }
}

export default Question
