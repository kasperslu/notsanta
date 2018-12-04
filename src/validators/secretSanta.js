import validator from 'validator';

export default {
  create: (data) => {
    const errors = {};

    if (!validator.isLength(data.name, { min: 0, max: 25 })) {
      errors.name = 'Name can be maximum 25 characters long.';
    }

    errors.friends = [];
    let friendsErrorsNumber = 0;

    data.friends.forEach((friend, index) => {
      if (!validator.isLength(friend.name, { min: 0, max: 25 })) {
        errors.friends.push('Friends name can be maximum 25 characters long.');
        friendsErrorsNumber += 1;
      } else {
        errors.friends.push('');
      }
    });

    if (friendsErrorsNumber === 0) delete errors.friends;

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  },
};
