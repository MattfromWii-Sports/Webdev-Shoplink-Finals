class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      console.error(`Form with ID ${formId} not found, disregard error if in different page.`);
      return;
    }

    this.errors = {};
    this.initValidation();
  }

  static patterns = {
    name: /^[A-Z][a-z]{2,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^((\+63)|0)9\d{9}$/,
    required: /\S+/,
  };

  initValidation() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.validateForm();
    });
  }

  validateForm() {
    this.clearErrors();
    let isValid = true;

    this.form.querySelectorAll("input, select, textarea").forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    console.log("Validation Results:", this.errors);
    if (isValid) {
      this.submitForm();
      console.log("Form submitted successfully.");
    } else {
      console.log("Please check your inputs.");
    }

    return isValid;
  }

  validateField(field) {
    const isRequired = field.hasAttribute("required");
    const fieldValue = field.value.trim();

    if (isRequired && !FormValidator.patterns.required.test(fieldValue)) {
      this.addError(field, "This field is required");
      return false;
    }

    switch (this.form.id) {
      case "contactForm":
        return this.validateContactForm(field, fieldValue);
      case "quotationForm":
        return this.validateQuotationForm(field, fieldValue);
      default:
        return this.defaultValidation(field, fieldValue);
    }
  }

  validateContactForm(field, value) {
    switch (field.id) {
      case "firstName":
      case "lastName":
        if (!FormValidator.patterns.name.test(value)) {
          this.addError(field, "Please enter a valid name (starts with capital, min 3 letters)");
          return false;
        }
        break;
      case "emailContact":
        if (!FormValidator.patterns.email.test(value)) {
          this.addError(field, "Please enter a valid email address");
          return false;
        }
        break;
      case "phoneNumber":
        if (!FormValidator.patterns.phone.test(value)) {
          this.addError(field, "Please enter a valid phone number");
          return false;
        }
        break;
      case "inquiryType":
        if (value === "") {
          this.addError(field, "Please select an inquiry type");
          return false;
        }
        break;
    }
    return true;
  }

  defaultValidation(field, value) {
    switch (field.type) {
      case "email":
        if (!FormValidator.patterns.email.test(value)) {
          this.addError(field, "Please enter a valid email address");
          return false;
        }
        break;
      case "tel":
        if (!FormValidator.patterns.phone.test(value)) {
          this.addError(field, "Please enter a valid phone number");
          return false;
        }
        break;
    }
    return true;
  }

  addError(field, message) {
    this.errors[field.id] = message;
    this.displayFieldError(field, message);
  }

  clearErrors() {
    this.errors = {};
    this.form.querySelectorAll(".form-error").forEach((error) => error.remove());
    this.form.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
  }

  displayFieldError(field, message) {
    const errorElement = document.createElement("div");
    errorElement.className = "form-error";
    errorElement.textContent = message;
    errorElement.style.color = "red";
    errorElement.style.fontSize = "0.8rem";
    errorElement.style.marginTop = "0px";

    let parentElement = field.parentNode;
    if (parentElement.classList.contains("number-input")) {
      parentElement = parentElement.parentNode;
    }

    parentElement.insertBefore(errorElement, field);
    field.classList.add("invalid");
  }

  submitForm() {
    // backend
    this.form.reset();

    const successMessage = document.createElement("div");
    successMessage.textContent = "Form submitted successfully!";
    successMessage.style.color = "green";
    successMessage.style.marginTop = "10px";
    successMessage.style.textAlign = "center";
    successMessage.style.width = "100%";
    this.form.parentNode.insertBefore(successMessage, this.form.nextSibling);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FormValidator("contactForm");
  new FormValidator("quotationForm");
});