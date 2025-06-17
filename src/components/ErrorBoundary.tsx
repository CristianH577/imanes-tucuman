import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full flex justify-center items-center">
            <span className="rounded-lg p-4 border-2 border-red-700 text-red-700 bg-red-50 my-4 uppercase font-bold">
              ERROR de renderizado
            </span>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
