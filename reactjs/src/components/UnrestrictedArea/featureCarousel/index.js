import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

import { Col } from 'reactstrap';
import styles from './styles.module.css';

const items = [
  {
    heading: 'Sentimental Analysis',
    image: '/svg_css/NaturalLanguageProcessing.svg',
    body:
      'We analyze the tonality of articles pertaining to your investments using powerful Natural Language tools.',
    extra: true
  },
  {
    heading: 'Real-Time Stock Data',
    image: '/svg_css/Stock.svg',
    body:
      'We display live stock data alongside relevant breaking news to better contextualize breaking news.',
    extra: ''
  },
  {
    heading: 'Trading Journal',
    image: '/svg_css/Data.svg',
    body:
      'We offer a place for you to log your trade history and relevant news sources that may have influenced your trading decisions.',
    extra: ''
  },
  {
    heading: 'Company Overview',
    image: '/svg_css/Business.svg',
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

  incrementCount = count => () => {
    if (count < items.length - 1) {
      this.setState({
        count: count + 1
      });
    } else {
      this.setState({
        count: 0
      });
    }
  };

  decrementCount = count => () => {
    if (count > 0) {
      this.setState({
        count: count - 1
      });
    } else {
      this.setState({
        count: items.length - 1
      });
    }
  };

  render() {
    const { count } = this.state;
    return (
      <Col className={styles.carousel}>
        <h3 className={styles.header}>{items[count].heading}</h3>
        <img
          src={items[count].image}
          alt={`${items[count].heading}`}
          className={styles.mainImg}
        />
        <p className={styles.body}>{items[count].body}</p>
        {items[count].extra ? (
          <img
            src="svg_css/scale-0.svg"
            alt="empty gauge"
            className={styles.supportImg}
          />
        ) : (
          ''
        )}
        <div className={styles.buttons}>
          <button
            className={styles.back}
            type="button"
            onClick={this.decrementCount(count)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="md" color="#878a86" />{' '}
            <span>Back</span>
          </button>
          <button
            className={styles.back}
            type="button"
            onClick={this.incrementCount(count)}
          >
            <span>Next</span>{' '}
            <FontAwesomeIcon icon={faChevronRight} size="md" color="#878a86" />
          </button>
        </div>
      </Col>
    );
  }
}

export default FeatureCarousel;
