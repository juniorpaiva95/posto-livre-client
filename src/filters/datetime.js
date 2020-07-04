import moment from "moment";

moment.locale('pt-br');

export default (value) => {
  if (value) {
    return moment(value).format("DD/MM/YYYY HH:mm");
  }

}