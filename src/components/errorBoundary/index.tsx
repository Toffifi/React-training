import { errorBoundaryState } from '@/interfaces';
import React, { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component {
  state: errorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): errorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
