import React, { Component, ReactNode } from 'react';
import { Custom500 } from '@/screens';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Custom500 />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
