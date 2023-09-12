import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Typewriter from 'typewriter-effect';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

import Social from './Social';

const styles = {
  introTextContainer: {
    margin: 20,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function About() {
  // function About(props)
  // const {header} = props;
  const header = 'Prashant Kumar Jha';
  const [data, setData] = useState(null);
  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      {/* <div className="header-about">
        <Header title={header} />
      </div> */}
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    <div style={{ flexDirection: 'row' }}>
                      <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
                      <Typewriter
                        options={{
                          loop: true,
                          autoStart: true,
                          strings: data?.roles,
                        }}
                      />
                    </div>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img src={data?.imageSource} alt="profile" width="400" height="400" />
                  </Col>
                </Row>
                <Fade>
                  <div style={styles.mainContainer}>
                    <Social />
                  </div>
                </Fade>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

// About.propTypes = {
//   header: PropTypes.string.isRequired,
// };

export default About;
