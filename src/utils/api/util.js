export const filterToQuery = object => {
  var parameters = [];
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      if (Array.isArray(object[property]) && object[property].length > 0) {
        parameters.push(encodeURI(property + '=' + object[property].join()));
      } else {
        if (object[property]) {
          parameters.push(encodeURI(property + '=' + object[property]));
        }
      }
    }
  }

  return parameters.join('&');
};