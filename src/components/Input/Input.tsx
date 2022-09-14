import React, { FocusEventHandler, SetStateAction } from 'react';
import { InputProps, FormErrors } from '../../interfaces/intefaces';
import styles from './style.module.css';
import { validateRegisterInput, validateLoginInput } from '../../helpers/validations';
import { disablePastDates } from '../../helpers/utils';

const Input: React.FC<InputProps> = (props) => {
  const blurFormHandler: FocusEventHandler<HTMLInputElement> = async () => {
    if (props.modalContent && props.modalContent === 'register') {
      if (props.setError && props.required) {
        const validObj: { isValid: boolean; err: string; id: string } | undefined = await validateRegisterInput(
          props.value as string,
          props.forId,
          props.addData && props.addData,
          props.addSetData && props.addSetData,
        );
        validObj && props.setError({ ...props.error, [props.forId]: validObj.err });
      }
    }
    if (props.modalContent && props.modalContent === 'login') {
      if (props.setError && props.required) {
        const validObj: { isValid: boolean; err: string; id: string } | undefined = await validateLoginInput(
          props.value as string,
          props.forId,
        );
        validObj && props.setError({ ...props.error, [props.forId]: validObj.err });
      }
    }
  };

  const onFocusFormHandler: FocusEventHandler<HTMLInputElement> = () => {
    if (props.required && props.setError) {
      props.setError && props.setError({ ...props.error, [props.forId]: '' });
    }
  };

  return (
    <div
      className={`${styles.inputcontainer}
      ${props.type === 'date' ? styles.dateContainer : ''}
      ${
        props.error &&
        props.error[props.forId as keyof FormErrors] !== '' &&
        props.error &&
        props.error[props.forId as keyof FormErrors] !== undefined
          ? styles.smallmargin
          : ''
      }`}
    >
      {props.type === 'text' && (
        <>
          <label htmlFor={props.forId} className={styles.label}>
            {props.title}
            {props.required && <span className={styles.labelunset}>*</span>}
          </label>
          <input
            name={props.forId}
            id={props.forId}
            type={props.type}
            value={props.value as string}
            onBlur={blurFormHandler}
            onFocus={onFocusFormHandler}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setValue && props.setValue(e.target?.value as SetStateAction<string>)
            }
            autoComplete="off"
            className={styles.input}
            disabled={props.forId === 'repeatpassword' && props.addData === ''}
          />
          {props.error && props.error[props.forId as keyof FormErrors] && (
            <p className={styles.inputerror}>{props.error[props.forId as keyof FormErrors]}</p>
          )}
        </>
      )}
      {props.type === 'date' && (
        <div className={styles.dateWrapper}>
          <label htmlFor={props.forId} className={styles.dateLabel}>
            {props.title}
            {props.required && <span className={styles.dateLabelunset}>*</span>}
          </label>
          <input
            name={props.forId}
            min={disablePastDates()}
            id={props.forId}
            type={props.type}
            value={props.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setValue && props.setValue(e.target?.value as SetStateAction<string>)
            }
            autoComplete="off"
            className={styles.dateInput}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
