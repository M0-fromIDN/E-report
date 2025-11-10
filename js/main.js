const searchInput = document.getElementById(`searchInput`);
const filterStatus = document.getElementById(`filterInput`);
const applyFilterBtn = document.getElementById(`applyFilter`);
const clearBtn = document.getElementById(`clearFilter`);


const container = document.getElementById('reportList');
let reports = JSON.parse(localStorage.getItem('reports')) || [];

function loadReports() {
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    renderReports(reports);
  }


function renderReports(reports) {
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

function applyFilter() {
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = filterStatus.value;


  const filtered = reports.filter(r =>
    (r.name.toLowerCase().includes(searchValue)) &&
    (filterValue === "" || r.status === filterValue)
  );


  document.getElementById("filterStatusInfo").innerText =
    `Filter applied: ${filtered.length} Reports Found`;


  renderReports(filtered);
}

applyFilterBtn.addEventListener("click", applyFilter);

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterStatus.value = '';
    loadReports();
  });




function deleteReport(id) {
 if (!confirm("Are you sure you want to delete this report?")) return;


 reports = reports.filter(report => report.id !== id);
  localStorage.setItem('reports', JSON.stringify(reports));

  alert(`The report has been successfully deleted!`);
  loadReports();

}


loadReports();





