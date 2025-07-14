const ctx = document.getElementById('storeChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Space', 'Occupied', 'Available'],
        datasets: [{
          label: 'quantities',
          data: [5000, 3800, 1200],
          backgroundColor: ['#0ea5e9', '#38BDF8', '#86efac'],
          borderRadius: 6
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    const openAdd = document.getElementById('openAddProduct');
    const addModal = document.getElementById('addProductModal');
    const overlay = document.getElementById('modalOverlay');
    const closeAddModal = document.getElementById('closeAddModal');
    const addProductBtn = document.getElementById('addProductBtn');
    const productGrid = document.getElementById('productGrid');

    openAdd.onclick = () => {
      addModal.style.display = 'block';
      overlay.style.display = 'block';
    };

    closeAddModal.onclick = () => {
      addModal.style.display = 'none';
      overlay.style.display = 'none';
    };

    addProductBtn.onclick = () => {
      const name = document.getElementById('newName').value;
      const stock = document.getElementById('newStock').value;
      const img = document.getElementById('newImage').value;

      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-name', name);
      card.innerHTML = `
        <img src="${img}" alt="${name}">
        <h2>${name}</h2>
        <p>In Stock: ${stock}</p>
        <button class="btn">Edit</button>
      `;
      productGrid.appendChild(card);

      addModal.style.display = 'none';
      overlay.style.display = 'none';
    };

    const openUpdate = document.getElementById('openUpdate');
    const updateModal = document.getElementById('updateProductModal');
    const closeUpdateModal = document.getElementById('closeUpdateModal');
    const applyUpdate = document.getElementById('applyUpdate');

    openUpdate.onclick = () => {
      updateModal.style.display = 'block';
      overlay.style.display = 'block';
    };

    closeUpdateModal.onclick = () => {
      updateModal.style.display = 'none';
      overlay.style.display = 'none';
    };

    applyUpdate.onclick = () => {
      const searchName = document.getElementById('searchName').value;
      const newName = document.getElementById('editName').value;
      const newStock = document.getElementById('editStock').value;

      const cards = document.querySelectorAll('.card');
      let found = false;
      cards.forEach(card => {
        if (card.getAttribute('data-name').toLowerCase() === searchName.toLowerCase()) {
          if (newName) card.querySelector('h2').textContent = newName;
          if (newStock) card.querySelector('p').textContent = `In Stock: ${newStock}`;
          card.setAttribute('data-name', newName || searchName);
          found = true;
        }
      });

      if (!found) alert('Product not found!');

      updateModal.style.display = 'none';
      overlay.style.display = 'none';
    };

    window.addEventListener('click', e => {
      if (e.target === overlay) {
        addModal.style.display = 'none';
        updateModal.style.display = 'none';
        overlay.style.display = 'none';
      }
    });