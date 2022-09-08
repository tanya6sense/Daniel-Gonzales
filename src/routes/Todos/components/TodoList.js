import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid/lib';
import { Spin } from 'antd';
import { Todo } from './Todo';

function TodoList(props) {
  const { todos, toggle, loading } = props;

  if (todos.length === 0) {
    return <div>There is nothing here</div>;
  }

  if (loading) {
    return (<Spin size="default" />);
  }

  console.log('Rendering todos list');

  const renderTodos = todos.map((todo) => {
    const {
      name, completed, id, created,
    } = todo;
    return (
      <Todo
        key={created}
        name={name}
        toggle={toggle}
        id={id}
        completed={completed}
        created={created}
      />
    );
  });

  return (
    <Col xs={12}>
      <Row center="xs">
        {renderTodos}
      </Row>
    </Col>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func,
  loading: PropTypes.bool,
};

export default React.memo(TodoList);
