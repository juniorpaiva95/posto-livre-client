import moment from "moment";

export default (value) => {
  if (value) {
    let data = moment(value.date);
    return data.format('D/M/Y HH:mm:ss');
  }

}