export const yyyymmdd = (date_ob: Date) => {
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  return year + "-" + month + "-" + date;
};
