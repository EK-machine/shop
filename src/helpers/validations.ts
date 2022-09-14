/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { regexp, specCharacters, errorMessages } from '../data/data';
import endpoints from '../api/endpoints';
import { RegExps, ValidateLoginData, ValidateRegisterData, UserType } from '../interfaces/intefaces';

const x = (isValid: boolean, err: string, id: string): Promise<{ isValid: boolean; err: string; id: string }> =>
  new Promise((resolve) => {
    resolve({ isValid, err, id });
  });

export const validateRegisterInput = async (
  value: string,
  id: string,
  addValue?: string,
  cb?: React.Dispatch<React.SetStateAction<string>>,
): Promise<{ isValid: boolean; err: string; id: string } | undefined> => {
  const validate = (valueVal: string, idVal: string): boolean => {
    if (valueVal === '') {
      return false;
    }
    if (!regexp[idVal as keyof RegExps].test(String(valueVal).toLocaleLowerCase())) {
      return false;
    }
    return true;
  };
  if (id === 'password') {
    const inputValid = validate(value as string, id);
    if (value === '') {
      const res = await x(false, errorMessages[id][1], id);
      return res;
    }
    if ((value as string).length > 0 && (value as string).length < 5) {
      const res = await x(false, errorMessages[id][2], id);
      return res;
    }
    if ((value as string).length > 16) {
      const res = await x(false, errorMessages[id][3], id);
      return res;
    }
    if (specCharacters.some((ch: string) => (value as string).includes(ch))) {
      const res = await x(false, errorMessages[id][4], id);
      return res;
    }
    if (value !== '' && inputValid) {
      const res = await x(true, errorMessages[id][0], id);
      return res;
    }
  } else if (id === 'repeatpassword') {
    const inputValid = validate(value as string, id);
    if (value === '') {
      const res = await x(false, errorMessages[id][1], id);
      return res;
    }
    if ((value as string).length > 0 && (value as string).length < 5) {
      const res = await x(false, errorMessages[id][2], id);
      return res;
    }
    if ((value as string).length > 16) {
      const res = await x(false, errorMessages[id][3], id);
      return res;
    }
    if (specCharacters.some((ch: string) => (value as string).includes(ch))) {
      const res = await x(false, errorMessages[id][4], id);
      return res;
    }
    if (value !== '' && inputValid) {
      if (addValue) {
        if (addValue === value) {
          const res = await x(true, errorMessages[id][0], id);
          return res;
        }
        cb && cb('');
        const res = await x(false, errorMessages[id][5], id);
        return res;
      }
      const res = await x(true, errorMessages[id][0], id);
      return res;
    }
  } else if (id === 'login') {
    const inputValid = validate(value as string, id);
    if (value === '') {
      const res = await x(false, errorMessages[id][1], id);
      return res;
    }
    if (!inputValid) {
      const res = await x(false, errorMessages[id][2], id);
      return res;
    }
    if (value !== '' && inputValid) {
      try {
        const data = await fetch(endpoints.getUsers)
          .then((resp) => resp.json())
          .then((userData: UserType[]) => {
            const user = userData.find((person) => person.login === value);
            return user;
          });
        if (data) {
          const res = await x(false, errorMessages[id][3], id);
          return res;
        }
        const res = await x(true, errorMessages[id][0], id);
        return res;
      } catch (e) {
        console.error(e);
      }
    }
  }
};

export const validateLoginInput = async (
  value: string,
  id: string,
): Promise<{ isValid: boolean; err: string; id: string } | undefined> => {
  const validate = (valueVal: string, idVal: string): boolean => {
    if (valueVal === '') {
      return false;
    }
    if (!regexp[idVal as keyof RegExps].test(String(valueVal).toLocaleLowerCase())) {
      return false;
    }
    return true;
  };
  if (id === 'password') {
    const inputValid = validate(value as string, id);
    if (value === '') {
      const res = await x(false, errorMessages[id][1], id);
      return res;
    }
    if ((value as string).length > 0 && (value as string).length < 5) {
      const res = await x(false, errorMessages[id][2], id);
      return res;
    }
    if ((value as string).length > 16) {
      const res = await x(false, errorMessages[id][3], id);
      return res;
    }
    if (specCharacters.some((ch: string) => (value as string).includes(ch))) {
      const res = await x(false, errorMessages[id][4], id);
      return res;
    }
    if (value !== '' && inputValid) {
      const res = await x(true, errorMessages[id][0], id);
      return res;
    }
  } else if (id === 'login') {
    const inputValid = validate(value as string, id);
    if (value === '') {
      const res = await x(false, errorMessages[id][1], id);
      return res;
    }
    if (!inputValid) {
      const res = await x(false, errorMessages[id][2], id);
      return res;
    }
    if (value !== '' && inputValid) {
      const res = await x(true, errorMessages[id][0], id);
      return res;
    }
  }
};

export const validateLoginRegister = async (object: ValidateLoginData | ValidateRegisterData, modalContent: string) => {
  const validPromises = await Promise.all(
    Object.entries(object).map((mapItem) => {
      const data =
        modalContent === 'register'
          ? validateRegisterInput(mapItem[1], mapItem[0])
          : validateLoginInput(mapItem[1], mapItem[0]);
      return data;
    }),
  );

  const toValidate = validPromises
    .filter((filterItem) => filterItem && filterItem.err !== '')
    .map((shortedItem) => {
      if (shortedItem) {
        return { id: shortedItem.id, err: shortedItem.err };
      }
    });

  const validations = toValidate.reduce(
    (acc, cur) => ({ ...acc, [(cur as { id: string; err: string }).id]: (cur as { id: string; err: string }).err }),
    {},
  );
  const isValid =
    toValidate.map((finalItem) => {
      const values = Object.values(finalItem as { id: string; err: string });
      const obj = values.reduce((o) => ({ ...o, [values[0]]: values[1] }), {});
      return obj;
    }).length === 0;
  if (isValid) {
    return true;
  }
  return validations;
};
