import { useState, ChangeEvent } from 'react';

export interface BaseFormValues {
  email: string;
  [key: string]: string;
}

export interface LoginFormValues extends BaseFormValues {
  password: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ForgotPasswordFormValues extends BaseFormValues {
  email: string;
}

export interface SignupFormValues extends BaseFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type FormValues = LoginFormValues | ContactFormValues | ForgotPasswordFormValues | SignupFormValues;

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface UseFormValidationProps<T extends FormValues> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T) => void | Promise<void>;
}

export const useFormValidation = <T extends FormValues>({
  initialValues,
  validate,
  onSubmit
}: UseFormValidationProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  };
}; 