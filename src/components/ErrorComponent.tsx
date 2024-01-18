import React from 'react';

interface ErrorComponentProps {
  message: string;
  onRetry: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, onRetry }) => {
  return (
    <div data-testid='error-component' style={{ textAlign: 'center', padding: '20px' }}>
      <h3>An error occurred: {message}</h3>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorComponent;
