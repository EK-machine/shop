import { AppStateType } from '../../interfaces/intefaces';

const getErrors = (state: AppStateType) => state.errors.errors;
export default getErrors;
