// Get the current date and time
var currentDateTime = new Date();

// Format the date and time as desired (e.g., "April 26, 2023 10:30 AM")
var formattedDateTime =
  currentDateTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }) +
  " " +
  currentDateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

// Set the formatted date and time to the element with id "currentDateTime"
document.getElementById("currentDateTime").textContent = formattedDateTime;

// for table

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addRow").addEventListener("click", addInvoiceRow);
  calculateTotals();
});

function addInvoiceRow() {
  const tbody = document.getElementById("invoiceBody");
  const row = tbody.insertRow(-1); // Inserts a row at the end of the table
  row.innerHTML = `
        <td class="border-b py-3 pl-3">1.</td>
        <td class="border-b py-3 pl-2"><input type="text" class="product-detail" /></td>
        <td class="border-b py-3 pl-2 text-right"><input type="number" class="price" step="0.01" /></td>
        <td class="border-b py-3 pl-2 text-center"><input type="number" class="quantity" min="1" value="1" /></td>
        <td class="border-b py-3 pl-2 text-center">20%</td>
        <td class="border-b py-3 pl-2 text-right subtotal">$0.00</td>
        <td class="border-b py-3 pl-2 pr-3 text-right"><button class="removeRow">Remove</button></td>
    `;
  updateRowIndices();
  addEventListeners();
}

function removeInvoiceRow(event) {
  const row = event.target.closest("tr");
  row.remove();
  updateRowIndices();
  calculateTotals();
}

function calculateTotals() {
  let totalPrice = 0;
  document.querySelectorAll("#invoiceBody tr").forEach((row) => {
    const price = parseFloat(row.querySelector(".price").value || 0);
    const quantity = parseInt(row.querySelector(".quantity").value || 0);
    const subtotal = price * quantity;
    row.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
    totalPrice += subtotal;
  });
  // Update total somewhere on your page
  // document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
}

function updateRowIndices() {
  document.querySelectorAll("#invoiceBody tr").forEach((row, index) => {
    row.cells[0].textContent = `${index + 1}.`;
  });
}

function addEventListeners() {
  document.querySelectorAll(".removeRow").forEach((button) => {
    button.removeEventListener("click", removeInvoiceRow); // Prevent multiple bindings
    button.addEventListener("click", removeInvoiceRow);
  });
  document.querySelectorAll(".price, .quantity").forEach((input) => {
    input.removeEventListener("input", calculateTotals); // Prevent multiple bindings
    input.addEventListener("input", calculateTotals);
  });
}

addInvoiceRow(); // Add initial row

// payment details

document
  .getElementById("paymentMethodSelect")
  .addEventListener("change", function () {
    var paymentMethod = this.value;
    // Here, you can handle the change. For example, show additional form fields for card information
    console.log("Selected payment method: " + paymentMethod);
    // Optionally, you can display additional inputs or information based on the selection
    if (paymentMethod === "card") {
      // Display card payment fields or instructions
      alert("Please proceed with the card payment terminal.");
    } else {
      // Handle cash payment
      alert("Please collect cash from the customer.");
    }
  });

// inovice genration

function generateRandomInvoiceNumber() {
  const prefix = "PHZ-";
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit number
  return prefix + randomNumber;
}

// Set the generated invoice number to the element with id "invoiceNumber"
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("invoiceNumber").textContent =
    generateRandomInvoiceNumber();
});

// generate inovice


html2canvas(document.body, { scale: 2 }).then(function (canvas) {
  // rest of your code
});
document
  .getElementById("generateInvoice")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission and page refresh

    html2canvas(document.body).then(function (canvas) {
      // Initialize jsPDF
      var imgData = canvas.toDataURL("image/png");
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jspdf.jsPDF("p", "mm");
      var position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      doc.save("invoice.pdf");
    });
  });
var pdfWidth = doc.internal.pageSize.getWidth();
var pdfHeight = (canvas.height * pdfWidth) / canvas.width;
doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

doc.html(document.body, {
  callback: function (doc) {
    doc.save("invoice.pdf");
  },
  x: 10,
  y: 10,
});
