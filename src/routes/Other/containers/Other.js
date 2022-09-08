import React from 'react';
import PropTypes from 'prop-types';
import json from './episodes.json';

export function Other(props) {
  const { data } = props;

  console.log({ data });
  return (
    <div>
      This is the other route.
    </div>
  );
}

Other.propTypes = { data: PropTypes.array };
Other.defaultProps = { data: json.data };
