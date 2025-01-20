import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-error/10 rounded-lg">
          <h2 className="text-error font-bold">Something went wrong</h2>
          <p className="text-error/80">Please try again later</p>
        </div>
      );
    }

    return this.props.children;
  }
}