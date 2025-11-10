const container = document.getElementById('report-list');
const reports = JSON.parse(localStorage.getItem('reports')) || [];


function renderReports() {
  container.innerHTML = '';
  if (reports.length === 0) {
    container.innerHTML = '<p class="text-muted">No reports yet.</p>';
    return;
  }


 reports.forEach(r => {
  container.innerHTML += `
    <div class="col-md-4">
      <div class="card shadow-sm">
        ${r.image ? `<img src="${r.image}" class="card-img-top" alt="Facility Photo">` : ''}
        <div class="card-body">
          <h5 class="card-title">${r.name}</h5>
          <p class="card-text text-truncate">${r.description}</p>
          <span class="badge bg-${r.status === 'Finished' ? 'success' : r.status === 'Processing' ? 'warning' : 'secondary'}">
            ${r.status}
          </span>
          <div class="mt-3 d-flex justify-content-between">
            <a href="report-detail.html?id=${r.id}" class="btn btn-sm btn-primary">Detail</a>
            <button class="btn btn-sm btn-danger" onclick="deleteReport(${r.id})">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `;
});
}


function deleteReport(id) {
  const confirmDelete = confirm('Are you sure you want to delete this report?');
  if (confirmDelete) {
    const index = reports.findIndex(r => r.id === id);
    if (index !== -1) {
      reports.splice(index, 1);
      localStorage.setItem('reports', JSON.stringify(reports));
      renderReports();
    }
  }
}


renderReports();


