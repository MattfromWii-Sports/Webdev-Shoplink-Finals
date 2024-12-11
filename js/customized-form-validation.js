document.getElementById("quotationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const regexPatterns = {
    fname: /^[A-Z][a-z]{2,}$/,
    lname: /^[A-Z][a-z]{2,}$/,
    contactNum: /^((\+63)|0)9\d{9}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  const errors = [];

  const fieldsToValidate = [
    { id: "fname", name: "First Name", pattern: regexPatterns.fname },
    { id: "lname", name: "Last Name", pattern: regexPatterns.lname },
    { id: "contactNum", name: "Contact Number", pattern: regexPatterns.contactNum },
    { id: "email", name: "Email Address", pattern: regexPatterns.email },
    { id: "box-printing", name: "Box Printing" },
    { id: "size-unit", name: "Size Unit" },
    { id: "quantity", name: "Quantity" },
    { id: "length", name: "Length" },
    { id: "width", name: "Width" },
    { id: "height", name: "Height" },
  ];

  fieldsToValidate.forEach((field) => {
    const element = document.getElementById(field.id);
    const value = element.value.trim();

    if (!value) {
      errors.push(`${field.name} is required.`);
    } else if (field.pattern && !field.pattern.test(value)) {
      errors.push(`Invalid ${field.name}.`);
    }
  });

  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalHeader = document.querySelector("#exampleModalCenter .modal-header");

  modalHeader.className = "modal-header";
  if (errors.length === 0) {
    modalTitle.textContent = "Success!";
    modalBody.innerHTML = "Your request has been submitted successfully.";
    modalHeader.classList.add("bg-success", "text-white");
  } else {
    modalTitle.textContent = "Error!";
    modalBody.innerHTML = `<ul>${errors.map((err) => `<li>${err}</li>`).join("")}</ul>`;
    modalHeader.classList.add("bg-danger", "text-white");
  }

  const modal = new bootstrap.Modal(document.getElementById("exampleModalCenter"));
  modal.show();
});
