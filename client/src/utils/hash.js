import bcrypt from 'bcryptjs';

/**
 * a utility function for hashing the password before posting it to the backend
 * @param {*} password
 */
export default function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
}
