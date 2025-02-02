import { AxiosError } from 'axios';

export class ApiException extends Error {
  code: string;
  field?: string;

  constructor(code: string, message: string, field?: string) {
    super(message);
    this.code = code;
    this.field = field;
    this.name = 'ApiException';
  }
}

export const handleAxiosError = (error: unknown): ApiException => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    
    // Handle Django REST framework error formats
    if (data?.non_field_errors) {
      return new ApiException(
        'VALIDATION_ERROR',
        data.non_field_errors[0],
        'non_field'
      );
    }

    // Handle field-specific errors
    if (data && typeof data === 'object') {
      const firstError = Object.entries(data)[0];
      if (firstError) {
        const [field, messages] = firstError;
        const message = Array.isArray(messages) ? messages[0] : messages;
        return new ApiException('VALIDATION_ERROR', message as string, field);
      }
    }

    // Handle generic errors
    return new ApiException(
      error.response?.status?.toString() || 'UNKNOWN_ERROR',
      error.response?.data?.message || error.message,
    );
  }

  return new ApiException(
    'UNKNOWN_ERROR',
    error instanceof Error ? error.message : 'An unexpected error occurred'
  );
};