const transformIntoAvatarText = (name) => {
  if (!name) {
    return null;
  }
  const splitted = name.split(' ');
  if (splitted.length <= 1) {
    return splitted[0][0].toUpperCase();
  }
  return `${splitted[0][0].toUpperCase()}${splitted[1][0].toUpperCase()}`;
};

export default transformIntoAvatarText;
