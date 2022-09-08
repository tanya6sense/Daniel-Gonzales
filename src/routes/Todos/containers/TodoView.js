import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'react-flexbox-grid/lib';
import { compose } from 'redux';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import { decorators, errors } from 'utils/validators';
import FormComponent from 'HOCS/FormComponent';
import { TODO_MANAGE } from '../constants';
import { actions } from '../modules';
import styles from './TodoView.module.scss';
import TodoList from '../components/TodoList';
import {
  completedTodosSelector,
  contextSelector,
  incompleteTodosSelector,
} from '../selectors';

const mapInputToProps = (input) => ({
  ...input,
  onBlur: (proxy, event) => {
    proxy.persist();
    if (proxy.target.value !== '') {
      input.onBlur(proxy, event);
    }
  },
});
const FormInput = FormComponent(Input, mapInputToProps);

const TodoViewComponent = ({
  completedTodos,
  incompleteTodos,
  toggleTodo,
  load,
  loading,
  addTodo,
  handleSubmit,
  reset,
}) => {

  React.useEffect(() => {
    load();
  }, []);

  return (
    <Col xs={12}>
      <Row center="xs">
        <h2>
          <b>
            Completed
          </b>
        </h2>
      </Row>
      <Row center="xs">
        <TodoList
          className={styles.stateContent}
          todos={completedTodos}
          toggle={toggleTodo}
          loading={loading}
        />
      </Row>
      <Row center="xs">
        <h2>
          <b>
            Incomplete
          </b>
        </h2>
      </Row>
      <Row center="xs">
        <TodoList
          className={styles.stateContent}
          todos={incompleteTodos}
          toggle={toggleTodo}
          loading={loading}
        />
      </Row>
      <Row center="xs">
        <form
          onSubmit={handleSubmit((values) => {
            addTodo(values.newTodoName);
            return reset();
          })}
        >
          <div className={styles.inputBlock}>
            <Row>
              <Col xs={7}>
                <Field
                  name="newTodoName"
                  type="input"
                  component={FormInput}
                  disabled={loading}
                  autoComplete="off"
                  formLayout={{
                    labelSize: 0,
                    inputSize: 12,
                  }}
                  placeholder="Enter to Add Todo (hint try 1 char)"
                  validate={[
                    errors.notIn(completedTodos.map((t) => t.name)),
                    errors.isRequired,
                    errors.alphanumerical,
                    errors.minLength(2),
                    decorators.forceError(errors.maxLength(30)),
                  ]}
                />
              </Col>
              <Col xs={5}>
                <Button type="primary" disabled={loading} htmlType="submit">Add Todo</Button>
              </Col>
            </Row>
          </div>
        </form>
      </Row>
    </Col>
  );
};

TodoViewComponent.propTypes = {
  completedTodos: PropTypes.arrayOf(PropTypes.object),
  incompleteTodos: PropTypes.arrayOf(PropTypes.object),
  toggleTodo: PropTypes.func,
  load: PropTypes.func,
  loading: PropTypes.bool,
  addTodo: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
};

const mapStateToProps = (state) => ({
  completedTodos: [...completedTodosSelector(state)],
  incompleteTodos: [...incompleteTodosSelector(state)],
  ...contextSelector(state),
});
const dispatchToProps = {
  load: actions.load,
  addTodo: actions.addTodo,
  toggleTodo: actions.toggleTodo,
};
export const TodoView = compose(
  reduxForm({ form: TODO_MANAGE }),
  connect(mapStateToProps, dispatchToProps),
)(TodoViewComponent);
