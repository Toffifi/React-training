import React, { ErrorInfo } from 'react';

import { errorBoundaryState } from '@/interfaces';

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
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
