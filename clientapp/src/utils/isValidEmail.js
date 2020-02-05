/**
 * a utility function, using regex, for checking whether a email string is a valid
 * email or not
 * @param {*} email
 */
export default function(email) {
  /* eslint-disable */
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  return re.test(String(email).toLowerCase());
}
