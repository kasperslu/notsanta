import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import api from '../api';

class SecretSantaDraw extends React.PureComponent {
  state = { assigned: '' };

  submit = this.submit.bind(this);

  getFriendsButtons() {
    return this.props.secretSantaGroup.friends.map((friend, i) => (
      <div key={i}>
        <button
          className={classnames('secretSantaDraw__button', {
            'secretSantaDraw__button--disabled': !friend.active,
          })}
          disabled={!friend.active}
          onClick={(e) => this.submit(e, friend.name)}
        >
          {friend.name}
        </button>
        <style jsx>{`
          .secretSantaDraw__button {
            height: 40px;
            width: 158px;
            padding: 0 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #FFB62E;
            color: #FFF;
            font-size: 16px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            transition: background 0.2s ease;
          }

          .secretSantaDraw__button:hover {
            background: darken(#FFB62E, 5%);
          }

          .secretSantaDraw__button--disabled,
          .secretSantaDraw__button--disabled:hover {
            background: #ADB155;
            color: #ADDCD2;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    ));
  }

  async submit(e, name) {
    e.preventDefault();
    const { secretSantaGroup } = this.props;

    try {
      const assigned = await api.putSecretSanta(secretSantaGroup._id, name);
      this.setState({ assigned });
    } catch (err) {
      console.log('ERROR: ', err);
    }
  }

  render() {
    const { assigned } = this.state;

    if (assigned) {
      return (
        <div className="secretSantaDraw">
          <span className="secretSantaDraw__text">Hooray! You are a Secret Santa to</span>
          <span className="secretSantaDraw__assigned">{assigned}</span>
          <style jsx>{`
            .secretSantaDraw__text {
              display: block;
              text-align: center;
              font-family: 'Grand Hotel', cursive;
              font-size: 30px;
              margin-bottom: 60px;
            }

            .secretSantaDraw__assigned {
              display: block;
              font-family: 'Grand Hotel', cursive;
              text-shadow: 0 2px 4px rgba(0,0,0,0.50);
              font-size: 70px;
              text-align: center;
              color: #FFB62E;
              margin-bottom: 80px;
              border-bottom: 1px dashed #FFF;
            }
          `}</style>
        </div>
      );
    }

    return (
      <div className="secretSantaDraw">
        <span className="secretSantaDraw__text">Choose only your name:</span>
        <div className="secretSantaDraw__friendsButtonsContainer">
          {this.getFriendsButtons()}
        </div>
        <style jsx>{`
          .secretSantaDraw__text {
            display: block;
            text-align: center;
            font-family: 'Grand Hotel', cursive;
            font-size: 30px;
            margin-bottom: 30px;
          }

          .secretSantaDraw__friendsButtonsContainer {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
          }
        `}</style>
      </div>
    );
  }
};

SecretSantaDraw.propTypes = {
  secretSantaGroup: PropTypes.shape().isRequired,
};

export default SecretSantaDraw;
