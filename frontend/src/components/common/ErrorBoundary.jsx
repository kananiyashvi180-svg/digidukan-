import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Something went wrong
            </h1>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium">
              An unexpected error occurred. We've been notified and are working on a fix.
            </p>
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                style={{ backgroundColor: '#111827' }}
              >
                <RefreshCw size={20} />
                <span>Reload Page</span>
              </button>
              <Link 
                to="/"
                onClick={() => this.setState({ hasError: false })}
                className="w-full py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all"
              >
                <Home size={20} />
                <span>Go Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
