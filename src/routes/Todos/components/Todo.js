import React from 'react';
import PropTypes from 'prop-types';
import { Card, Checkbox } from 'antd';
import { Row } from 'react-flexbox-grid/lib';
import styles from './Todo.module.scss';

export function Todo(props) {
  const {
 name, completed, id, toggle, created,
} = props;

  const toggleTodo = () => toggle(id);

  return (
    <Card className={styles.card}>
      <Row>
        <div>
          <b className={styles.text}>{name}</b>
          <br />
          {created}
        </div>
        <Checkbox checked={completed} onChange={toggleTodo} />
      </Row>
    </Card>
  );
}

Todo.propTypes = {
  name: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.number,
  toggle: PropTypes.func,
  created: PropTypes.string,
};
