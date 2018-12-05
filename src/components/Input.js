import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Input extends React.PureComponent {
  state = { active: false };

  onFocus = this.onFocus.bind(this);
  onBlur = this.onBlur.bind(this);

  onFocus() {
    this.setState({ active: true });
  }

  onBlur() {
    if (!this.props.value) this.setState({ active: false });
  }

  render() {
    const { name, label, onChange, value, autoComplete, error } = this.props;

    return (
      <div className="formGroup">
        {label && <label className={classnames('formGroup__label', {
          'formGroup__label--active': value || this.state.active,
        })} htmlFor={name}>{label}</label>}

        <input
          name={name}
          id={name}
          className="formGroup__input"
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={value}
          autoComplete={autoComplete ? 'on' : 'off'}
        />

        {error && <span className="formGroup__error">{error}</span>}

        <style jsx>{`
          .formGroup {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-end;
            margin: 12px 0;
            width: 100%;
            height: 46px;
          }

          .formGroup__label {
            position: absolute;
            top: 22px;
            left: 0;
            color: #FFF;
            font-size: 16px;
            transition: all 0.2s ease;
            cursor: text;

            &.formGroup__label--active {
              top: 0;
              color: #BDE3DC;
              font-size: 12px;
            }
          }

          .formGroup__input {
            border: none;
            border-bottom: 1px solid #BDE3DC;
            background: transparent;
            color: #FFF;
            padding: 0 0 6px;
            font-size: 16px;
            width: 100%;
          }

          .formGroup__error {
            position: absolute;
            right: 0;
            bottom: -18px;
            color: #FFB62E;
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  autoComplete: PropTypes.bool,
  error: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  autoComplete: true,
  error: '',
};

export default Input;
