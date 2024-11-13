document.querySelector("form").addEventListener("submit", function (e) {
  let valid = true;

  // Function to set an error message
  function setError(element, message) {
    element.classList.add("error-field");
    let errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    errorElement.textContent = message;
    errorElement.classList.add("active");
    valid = false;
  }

  // Function to clear error messages
  function clearError(element) {
    element.classList.remove("error-field");
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.classList.remove("active");
    }
  }

  // Validation for "First Name" and "Last Name" fields
  const nameFields = document.querySelectorAll('input[type="text"]');
  nameFields.forEach((field) => {
    clearError(field);
    if (!field.value.match(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/)) {
      setError(
        field,
        "Pole " + field.placeholder + " może zawierać tylko litery."
      );
    }
  });

  // Email validation
  const emailField = document.querySelector('input[type="email"]');
  clearError(emailField);
  if (!emailField.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
    setError(emailField, "Proszę wprowadzić poprawny adres e-mail.");
  }

  // Validation for "Subject" field
  const subjectField = document.querySelector("select");
  clearError(subjectField);
  if (subjectField.value === "") {
    setError(subjectField, "Proszę wybrać temat zapytania.");
  }

  // Validation for "Message" field
  const messageField = document.querySelector("textarea");
  clearError(messageField);
  if (messageField.value.length < 10) {
    setError(messageField, "Wiadomość musi zawierać co najmniej 10 znaków.");
  }

  // If any validation failed, prevent form submission
  if (!valid) {
    e.preventDefault();
  } else {
    // If all fields are valid, show a success alert
    alert("Wiadomość została wysłana. Dziękujemy za kontakt.");
  }
});
