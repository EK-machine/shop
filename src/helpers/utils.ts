/* eslint-disable consistent-return */
export const getModalTitle = (val: string) => {
  if (val === 'login') {
    return 'LOG IN';
  }
  if (val === 'register') {
    return 'CREATE NEW ACCOUNT';
  }
  if (val === 'product') {
    return 'PRODUCT DESCRIPTION:';
  }
};

export const getDate = (val: string) => {
  const current = new Date().getTime();
  const date = new Date(val);
  const dateTime = date.getTime();
  const deliv = current > dateTime;
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const strDate = `${dateMonth}/${dateDate}/${dateYear}`;
  return { strDate, deliv };
};
