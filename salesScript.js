document.addEventListener('DOMContentLoaded', function() {
    fetchMedicines().then(populateMedicineDropdown);
});

document.getElementById('medicineSelect').addEventListener('change', function() {
    const selectedMedicine = this.value;
    fetchMedicineDetails(selectedMedicine)
        .then(({ price }) => {
            document.getElementById('price').value = `$${price.toFixed(2)}`;
        })
        .catch(error => console.error('Error fetching medicine details:', error));
});

async function fetchMedicines() {
    const response = await fetch('https://your-backend.com/medicines');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function populateMedicineDropdown(medicines) {
    const select = document.getElementById('medicineSelect');
    medicines.forEach(medicine => {
        const option = document.createElement('option');
        option.value = medicine.id; 
        option.textContent = medicine.name; 
        select.appendChild(option);
    });
}

async function fetchMedicineDetails(medicineId) {
    const response = await fetch(`https://your-backend.com/medicines/details/${medicineId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Include other necessary functions such as generateInvoice() here
