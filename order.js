  let selectedRow = null;

  function filterOrders(status) {
    const rows = document.querySelectorAll('#orderTable tbody tr');
    rows.forEach(row => {
      const orderStatus = row.cells[3].innerText;
      row.style.display = (status === 'all' || orderStatus === status) ? '' : 'none';
    });
  }

  document.getElementById('searchBox').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll('#orderTable tbody tr');
    rows.forEach(row => {
      const id = row.cells[0].innerText.toLowerCase();
      const customer = row.cells[4].innerText.toLowerCase();
      row.style.display = id.includes(query) || customer.includes(query) ? '' : 'none';
    });
  });

  function showPopup(orderId, product, qty, status) {
    // Set selectedRow to the clicked row
    const rows = document.querySelectorAll('#orderTable tbody tr');
    rows.forEach(row => {
      if (row.cells[0].innerText === `#${orderId}`) {
        selectedRow = row;
      }
    });

    document.getElementById('modalTitle').innerText = `${product} - Order #${orderId}`;
    document.getElementById('modalQuantity').innerText = qty;
    document.getElementById('modalStatus').innerText = status;
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('orderModal').style.display = 'block';
  }

  function closeModal(newStatus) {
    if (selectedRow) {
      selectedRow.cells[3].innerText = newStatus; // Update the status cell
    }
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('orderModal').style.display = 'none';
    selectedRow = null; // Reset after close
  }

  // Optional: allow closing modal when clicking on the overlay
  document.getElementById('modalOverlay').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('orderModal').style.display = 'none';
    selectedRow = null;
  });