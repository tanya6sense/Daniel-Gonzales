import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Navbar } from 'containers';
import moment from 'moment';
import styles from './App.module.scss';

const { Footer } = Layout;

export function App(props) {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      {
        !props.children
        && (<div className={styles.center}>Brand New App !</div>)
      }
      <div className={styles.appBody}>
        {props.children}
      </div>
      <Footer className={styles.footer}>
        <a href="https://support.6sense.com" target="_blank" rel="noopener noreferrer">
          Support
        </a>
        &nbsp;&nbsp;&#183;&nbsp;&nbsp;
        <a href="https://6sense.com/terms-of-service/" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>
        &nbsp;&nbsp;&#183;&nbsp;&nbsp;6sense&nbsp;&copy;&nbsp;
        {moment().format('YYYY')}
      </Footer>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
};
