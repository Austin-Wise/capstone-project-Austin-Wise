import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import styles from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

const items = [
  {
    heading: 'Sentimental Analysis',
    image: 'svg_css/NaturalLanguageProcessing.svg',
    body:
      'We analyze the tonality of articles pertaining to your investments using powerful Natural Language tools.',
    extra: true
  },
  {
    heading: 'Real-Time Stock Data',
    image: 'svg_css/Stock.svg',
    body:
      'We display live stock data alongside relevant breaking news to better contextualize breaking news.',
    extra: ''
  },
  {
    heading: 'Trading Journal',
    image: 'svg_css/Data.svg',
    body:
      'We offer a place for you to log your trade history and relevant news sources that may have influenced your trading decisions.',
    extra: ''
  },
  {
    heading: 'Company Overview',
    image: 'svg_css/Business.svg',
    body:
      'We display detailed company descriptions to allow deeper understanding of the community behind your next hot stock.',
    extra: ''
  }
];

class FeatureCarousel extends Component {
  constructor(props) {
    super(props);
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
    this.state = {
      count: 0
    };
  }
  incrementCount() {
    if (this.state.count < items.length - 1) {
      this.setState({
        count: this.state.count + 1
      });
    } else {
      this.setState({
        count: 0
      });
    }
  }

  decrementCount() {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      });
    } else {
      this.setState({
        count: items.length - 1
      });
    }
  }

  render() {
    return (
      <section className={styles.carousel}>
        <h3 className={styles.header}>{items[this.state.count].heading}</h3>
        <img
          src={items[this.state.count].image}
          alt={`${items[this.state.count].heading} Image`}
          className={styles.mainImg}
        />
        <p className={styles.body}>{items[this.state.count].body}</p>
        {items[this.state.count].extra ? (
          <img src="svg_css/scale-0.svg" className={styles.supportImg} />
        ) : (
          ''
        )}
        <div className={styles.buttons}>
          <button className={styles.back} onClick={this.decrementCount}>
            <FontAwesomeIcon icon={faChevronLeft} size="md" color="#878a86" />{' '}
            <span>Back</span>
          </button>
          <button className={styles.back} onClick={this.incrementCount}>
            <span>Next</span>{' '}
            <FontAwesomeIcon icon={faChevronRight} size="md" color="#878a86" />
          </button>
        </div>
      </section>
    );
  }
}

export default FeatureCarousel;
