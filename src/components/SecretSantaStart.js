import React from 'react';
import Link from 'next/link';
import api from '../api';
import secretSantaValidator from '../validators/secretSanta';
import Input from './Input';

class SecretSantaStart extends React.PureComponent {
  state = {
    data: {
      name: '',
      friends: [
        { name: '' },
        { name: '' },
      ],
    },
    secretSantaGroupId: '',
    errors: {},
  };

  onChange = this.onChange.bind(this);
  onFriendNameChange = this.onFriendNameChange.bind(this);
  addNewFriendInput = this.addNewFriendInput.bind(this);
  submit = this.submit.bind(this);

  onChange(e) {
    e.preventDefault();
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: undefined },
    });
  }

  onFriendNameChange(e, index) {
    e.preventDefault();
    const { data } = this.state;

    const friends = data.friends.map((friend, i) => {
      if (index === i) return { ...friend, name: e.target.value };
      return friend;
    });

    const newFriendsErrors = this.state.errors.friends
      ? this.state.errors.friends.map((error, i) => {
        if (index === i) return '';
        return error;
      })
      : undefined;

    this.setState({
      data: { ...this.state.data, friends },
      errors: { ...this.state.errors, friends: newFriendsErrors },
    });
  }

  getFriendsInputs() {
    const { data, errors } = this.state;

    return data.friends.map((friend, i) =>
      (
        <Input
          key={i}
          name={`friend-${i}`}
          label={i === 0 ? 'Your name' : 'Friend\'s name'}
          onChange={e => this.onFriendNameChange(e, i)}
          value={data.friends[i].name}
          autoComplete={false}
          error={errors.friends && errors.friends[i]}
        />
      ));
  }

  addNewFriendInput() {
    this.setState({ data: { ...this.state.data, friends: [...this.state.data.friends, { name: '' }] } });
  }

  isValid() {
    const { errors, isValid } = secretSantaValidator.create(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  async submit(e) {
    e.preventDefault();

    if (!this.isValid()) return;

    const { data } = this.state;

    const localData = {
      ...data,
      friends: data.friends.filter(friend => friend.name),
    };

    try {
      const secretSantaGroup = await api.postSecretSanta(localData);
      this.setState({ secretSantaGroupId: secretSantaGroup._id });
    } catch (err) {
      console.log('ERROR: ', err);
    }
  }

  render() {
    const { secretSantaGroupId, data, errors } = this.state;

    return (
      <div className="secretSantaStart">
        {secretSantaGroupId
          ? <>
            <span className="secretSantaSuccess__text">Now visit the Secret Santa link and share it with your friends!</span>
            <a className="secretSantaSuccess__link">{`${window.location.protocol}//${window.location.host}/ss/${secretSantaGroupId}`}</a>
            <div className="secretSantaForm__buttonsGroup">
              <Link as={`/ss/${secretSantaGroupId}`} href={`/secret-santa?secretSantaGroupId=${secretSantaGroupId}`}>
                <button className="secretSantaForm__button">Let&apos;s go there!</button>
              </Link>
            </div>
          </>
          : <>
            <span className="secretSantaStart__description">Start your secret santa gift exchange!</span>

            <div className="secretSantaForm">
              <Input
                name="name"
                label="Group Name"
                onChange={this.onChange}
                value={data.name}
                autoComplete={false}
                error={errors.name}
              />

              <div className="secretSantaForm__friendsInputs">
                {this.getFriendsInputs()}
              </div>

              <div className="secretSantaForm__buttonsGroup">
                <button
                  className="secretSantaForm__button secretSantaForm__button--secondary secretSantaForm__button--addMore"
                  onClick={this.addNewFriendInput}
                >Add Friend</button>

                <button className="secretSantaForm__button" onClick={this.submit}>Make it happen!</button>
              </div>
            </div>
          </>
        }

        <style jsx global>{`
          .secretSantaStart__description {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            text-align: center;
            font-family: 'Grand Hotel', cursive;
            font-size: 30px;
          }

          .secretSantaForm {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            max-width: 640px;
            margin: 0 auto;
          }

          .secretSantaForm__friendsInputs {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 30px;
            width: 100%;
          }

          .secretSantaForm__buttonsGroup {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }

          .secretSantaForm__button {
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

            &:hover {
              background: darken(#FFB62E, 5%);
            }
          }

          .secretSantaForm__button--secondary {
            border: 1px solid #FFF;
            background: none;

            &:hover {
              background: rgba(255, 255, 255, 0.1);
            }
          }

          .secretSantaSuccess__text {
            display: block;
            text-align: center;
            font-family: 'Grand Hotel', cursive;
            font-size: 30px;
            margin-bottom: 100px;
          }

          .secretSantaSuccess__link {
            display: block;
            font-size: 18px;
            text-align: center;
            padding-bottom: 5px;
            margin-bottom: 35px;
            border-bottom: 1px dashed #FFF;

            + .secretSantaForm__buttonsGroup {
              justify-content: center;
            }
          }
        `}</style>
      </div>
    );
  }
};

export default SecretSantaStart;
