import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const AntFooter = Layout.Footer;

export function Footer(props) {
  /* eslint-disable react/jsx-props-no-spreading */
  const { children, ...rest } = props;
  return (
    <AntFooter {...rest}>{children}</AntFooter>
  );
}

Footer.propTypes = {
  children: PropTypes.element,
};
