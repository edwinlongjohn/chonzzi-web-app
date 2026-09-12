import { useDispatch } from 'react-redux';
import { setError, clearError, setSuccessMessage } from '../store/slices/uiSlice';

interface UseApiReturn {
  handleError: (error: any, customMessage?: string) => string;
  handleSuccess: (message: string) => void;
  clearMessages: () => void;
  wrapApiCall: <T>(
    apiCall: () => Promise<T>,
    options?: {
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: (data: T) => void;
      onError?: (error: any) => void;
    }
  ) => Promise<{ success: boolean; data?: T; error?: string }>;
}

export const useApi = (): UseApiReturn => {
  const dispatch = useDispatch();

  const handleError = (error: any, customMessage?: string): string => {
    const message = error?.data?.message || error?.message || customMessage || 'An error occurred';
    dispatch(setError(message));
    return message;
  };

  const handleSuccess = (message: string): void => {
    dispatch(setSuccessMessage(message));
  };

  const clearMessages = (): void => {
    dispatch(clearError());
    dispatch(setSuccessMessage(''));
  };

  const wrapApiCall = async <T>(
    apiCall: () => Promise<T>,
    options: {
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: (data: T) => void;
      onError?: (error: any) => void;
    } = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> => {
    const { successMessage, errorMessage, onSuccess, onError } = options;

    try {
      const result = await apiCall();

      if (successMessage) {
        handleSuccess(successMessage);
      }

      if (onSuccess) {
        onSuccess(result);
      }

      return { success: true, data: result };
    } catch (error: any) {
      const message = handleError(error, errorMessage);

      if (onError) {
        onError(error);
      }

      return { success: false, error: message };
    }
  };

  return {
    handleError,
    handleSuccess,
    clearMessages,
    wrapApiCall,
  };
};

export default useApi;