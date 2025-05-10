/**
 * Form validation utility functions
 */

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailRegex.test(email)
}

// Validate phone number (basic validation)
export const isValidPhone = (phone) => {
  // Allow numbers, spaces, dashes, and parentheses
  const phoneRegex = /^[0-9()+\-\s]{10,15}$/
  return phoneRegex.test(phone)
}

// Validate zip code (basic validation for multiple countries)
export const isValidZipCode = (zipCode) => {
  // Simple format check for basic zip validation
  return zipCode === '' || /^[0-9\s-]{5,10}$/.test(zipCode)
}

// Check if the string is empty or just whitespace
export const isEmpty = (str) => {
  return !str || str.trim() === ''
}
export const containsNumbers = (str)=> {
  return /\d/.test(str);
}

// Validate user input fields
export const validateUserForm = (values) => {
  const errors = {}

  // First name validation
  if (isEmpty(values.first_name)) {
    errors.first_name = 'First name is required'
  } else if (values.first_name.length > 50) {
    errors.first_name = 'First name must be less than 50 characters'
  }else if(containsNumbers(values.first_name)){
    errors.first_name='First name cannot contain numbers'
  }

  // Last name validation
  if (isEmpty(values.last_name)) {
    errors.last_name = 'Last name is required'
  } else if (values.last_name.length > 50) {
    errors.last_name = 'Last name must be less than 50 characters'
  }
  else if(containsNumbers(values.last_name)){
    errors.last_name='Last name cannot contain numbers'
  }

  // Email validation
  if (isEmpty(values.email)) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email format'
  }

  // Phone validation (if provided)
  if (values.phone && !isValidPhone(values.phone)) {
    errors.phone = 'Invalid phone number format'
  }

  // Zip code validation (if provided)
  if (values.zip_code && !isValidZipCode(values.zip_code)) {
    errors.zip_code = 'Invalid zip code format'
  }

  //City validation
  if(containsNumbers(values.city)){
    errors.city='City name cannot contain numbers'
  }

  // State validation
  if(containsNumbers(values.state)){
    errors.state='State name cannot contain numbers'
  }

  // Country validation
  if(containsNumbers(values.country)){
    errors.country='Country name cannot contain numbers'
  }


  return errors
}