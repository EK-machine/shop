import React, { ErrorInfo } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppStateType, ErrorBoundaryProps, ErrorBoundaryState } from 'Interfaces/intefaces';
import { setErrors } from 'ReduxSlices/errorSlice';
import { apiGetError, apiPatchError } from 'Apis/apis';
import styles from './style.module.css';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.userId) {
      this.getAllErrors(this.props.userId.toString());
    } else {
      this.getAllErrors('0');
    }
  }

  shouldComponentUpdate(nextProps: ErrorBoundaryProps) {
    if (nextProps.thrownError === this.props.thrownError) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const prevLength = prevProps.previousErrors.length;
    const currentLength = this.props.previousErrors.length;
    if (this.props.thrownError !== prevProps.thrownError && prevLength < currentLength) {
      if (this.props.userId) {
        const errorsToPost = [...this.props.previousErrors, this.props.thrownError];
        const body = { errors: errorsToPost };
        this.postErrors(this.props.userId.toString(), body);
      } else {
        const errorsToPost = [...this.props.previousErrors, this.props.thrownError];
        const body = { errors: errorsToPost };
        this.postErrors('0', body);
      }
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorData = `Error name: ${error.name}, error info: ${errorInfo.componentStack}, error message: ${error.message}`;
    this.setState({
      error: true,
    });
    if (error) {
      if (this.props.userId) {
        const errorsToPost = [...this.props.previousErrors, errorData];
        const body = { errors: errorsToPost };
        this.postErrors(this.props.userId.toString(), body);
      } else {
        const errorsToPost = [...this.props.previousErrors, errorData];
        const body = { errors: errorsToPost };
        this.postErrors('0', body);
      }
    }
  }

  getAllErrors = async (val: string) => {
    const allErrors = await apiGetError(val);
    if (allErrors) {
      this.props.setTheErros(allErrors.errors);
    }
  };

  postErrors = async (val: string, body: { errors: string[] }) => {
    if (val && body) {
      const posted = await apiPatchError(val, body);
      if (posted) {
        this.getAllErrors(val);
      }
    }
  };

  handleClick = () => {
    window.location.reload();
    this.setState({
      error: false,
    });
  };

  render(): React.ReactNode {
    if (this.state.error) {
      return (
        <div className={styles.container}>
          <h1 className={styles.heading} style={{ fontSize: '60px', zIndex: '100px' }}>
            Oups! there is an Error!
          </h1>
          <button onClick={this.handleClick} className={styles.button}>
            Return to products page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheErros: (data: string[]) => {
    dispatch({ type: setErrors.type, payload: data });
  },
});

const mapStateToProps = (state: AppStateType) => {
  const userLogged = state.common.logged;
  const userId = userLogged && state.user.user.id;
  const thrownError = state.errors.error;
  const previousErrors = state.errors.errors;
  return {
    userId,
    thrownError,
    previousErrors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
