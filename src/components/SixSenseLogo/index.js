import React from 'react';
import PropTypes from 'prop-types';
import lightLogo from 'images/6siLogoLight.png';
import styles from './SixSenseLogo.module.scss';

export function SixSenseLogo(props) {
  const { className } = props;
  return (
    <img
      alt=""
      className={className ? `${className} ${styles.logo}` : styles.logo}
      src={lightLogo}
    />
  );
}

SixSenseLogo.propTypes = {
  className: PropTypes.string,
};

export default SixSenseLogo;
