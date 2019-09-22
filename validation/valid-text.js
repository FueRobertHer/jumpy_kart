const validText = str => {
  return typeof str === 'string' && str.trim().length > 0;
}

export default validText;