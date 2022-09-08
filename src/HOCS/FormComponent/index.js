import React from 'react';
import { Row, Col } from 'react-flexbox-grid/lib';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import styles from './FormComponent.module.scss';

const FormComponent = (WrappedComponent, mapInputToProps) => {
  const FormClass = (props) => {
    const {
      input,
      meta,
      label,
      required,
      hintText,
      border = true,
      onWarn,
      formLayout = {},
      rightExtra,
      loading = false,
    } = props;
    const {
 touched, error, invalid, warning,
} = meta || {};
    const {
      labelSize = 2,
      betweenSize = 14,
      inputSize = 4,
      marginBottom = 14,
      marginTop = 0,
      marginLeft = 0,
      marginRight = 0,
      stackedMargin = 0,
      stacked,
      justifyLabel = { end: 'xs', middle: 'xs' },
      justify = { start: 'xs', middle: 'xs' },
      justifyInput = { start: 'xs' },
    } = formLayout;

    let classNameInput = styles.input;
    let classNameLabel = styles.label;
    let classNameMsg = styles.msgHint;
    let msg = hintText;
    if (invalid && (touched || error.forceShowError) && !loading) {
      if (border) {
        classNameInput += ` ${styles.inputError}`;
      }
      classNameLabel += ` ${styles.labelError}`;
      classNameMsg = styles.msgError;
      msg = error.value || error;
    }

    if (warning && touched) {
      if (onWarn) {
        onWarn(warning);
      }
    }

    let rightExtraDisplay;
    if (rightExtra) {
      rightExtraDisplay = (
        <Col>
          {rightExtra(input, meta)}
        </Col>
      );
    }
    const requiredDiplsay = required ? <span className={styles.required}>* </span> : undefined;
    const mappedInput = mapInputToProps ? mapInputToProps(input, props) : input;
    const componentProps = omit({ ...props, ...mappedInput }, [
      'formLayout',
      'input',
      'meta',
      'label',
      'required',
      'border',
      'hintText',
      'onWarn',
    ]);
    const style = { margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px` };

    const labelComponent = (
      <Col xs={labelSize}>
        <Row {...justifyLabel}>
          {requiredDiplsay}
          <span className={classNameLabel}>
            {label}
          </span>
        </Row>
      </Col>
    );

    const inputComponent = (
      <Col xs={inputSize}>
        <Row {...justifyInput}>
          <Col xs={12}>
            <WrappedComponent
              {...componentProps}
              className={`${componentProps.className}  ${classNameInput}`}
            />
            <div className={classNameMsg}>
              {msg}
            </div>
          </Col>
        </Row>
      </Col>
    );

    if (stacked) {
      return (
        <div style={style}>
          <Row {...justify} style={{ marginBottom: stackedMargin }}>
            {labelComponent}
          </Row>
          <Row {...justify}>
            {inputComponent}
          </Row>
        </div>
      );
    }

    const seperator = (
      <Col>
        {betweenSize > 0 && <div style={{ width: betweenSize }} />}
      </Col>
    );

    return (
      <div style={style}>
        <Row {...justify}>
          {labelComponent}
          {seperator}
          {inputComponent}
          {rightExtraDisplay}
        </Row>
      </div>
    );
  };

  FormClass.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    required: PropTypes.bool,
    border: PropTypes.bool,
    formLayout: PropTypes.object,
    hintText: PropTypes.string,
    onWarn: PropTypes.func,
    loading: PropTypes.bool,
    rightExtra: PropTypes.func,
  };

  return FormClass;
};

export default FormComponent;
