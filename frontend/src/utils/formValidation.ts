import type { UserCreate } from '../types/User';

export const validateUserForm = (formData: UserCreate) => {
  const errors: Partial<UserCreate> = {};
  
  if (!formData.name.trim()) errors.name = 'Name is required';
  if (!formData.surname.trim()) errors.surname = 'Surname is required';
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!formData.company.trim()) errors.company = 'Company is required';
  if (!formData.jobTitle.trim()) errors.jobTitle = 'Job Title is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};