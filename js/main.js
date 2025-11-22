// main.js - unified and fixed IDs

const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const applyFilterBtn = document.getElementById('applyFilter');
const clearBtn = document.getElementById('clearFilter');

const container = document.getElementById('reportList');

let reports = JSON.parse(localStorage.getItem('reports')) || [];

function loadReports() {
  reports = JSON.parse(localStorage.getItem('reports')) || [];
  renderReports(reports);
  // also update dashboard counts after loading
  updateDashboardCounts();
}

function renderReports(list) {
  container.innerHTML = '';
  if (!list || list.length === 0) {
    container.innerHTML = '<p class="text-muted">No reports yet.</p>';
    return;
  }

  list.forEach(r => {
    const badgeClass = (r.status === 'Finished') ? 'success'
      : (r.status === 'Processing' || r.status === 'Processed') ? 'warning'
      : 'secondary';

    container.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          ${r.image ? `<img src="${r.image}" class="card-img-top" alt="Facility Photo">` : ''}
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${r.name}</h5>
            <p class="card-text text-truncate">${r.description}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="badge bg-${badgeClass}">${r.status}</span>
              <div>
                <a href="report-detail.html?id=${r.id}" class="btn btn-sm btn-primary">Detail</a>
                <button class="btn btn-sm btn-danger" onclick="deleteReport(${r.id})">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function applyFilter() {
  const searchValue = (searchInput.value || '').toLowerCase();
  const filterValue = filterStatus.value;

  const filtered = reports.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchValue) || r.description.toLowerCase().includes(searchValue);
    const matchesFilter = !filterValue || r.status === filterValue;
    return matchesSearch && matchesFilter;
  });

  document.getElementById("filterStatusInfo").innerText = `Filter applied: ${filtered.length} Reports Found`;
  renderReports(filtered);
}

applyFilterBtn && applyFilterBtn.addEventListener("click", applyFilter);

clearBtn && clearBtn.addEventListener('click', () => {
  if (searchInput) searchInput.value = '';
  if (filterStatus) filterStatus.value = '';
  loadReports();
  document.getElementById("filterStatusInfo").innerText = '';
});

function deleteReport(id) {
  if (!confirm("Are you sure you want to delete this report?")) return;
  reports = reports.filter(report => report.id !== id);
  localStorage.setItem('reports', JSON.stringify(reports));
  alert(`The report has been successfully deleted!`);
  loadReports();
}

function updateDashboardCounts() {
  const all = reports || [];
  const total = all.length;
  const New = all.filter(r => r.status === "New").length;
  const processing = all.filter(r => r.status === "Processing" || r.status === "Processed").length;
  const finished = all.filter(r => r.status === "Finished").length;

  const elTotal = document.getElementById('totalReports');
  const elNew = document.getElementById('newReports');
  const elProcess = document.getElementById('processReports');
  const elDone = document.getElementById('doneReports');

  if (elTotal) elTotal.innerText = total;
  if (elNew) elNew.innerText = New;
  if (elProcess) elProcess.innerText = processing;
  if (elDone) elDone.innerText = finished;
}

window.deleteReport = deleteReport; // make available in inline onclicks

// initial load
loadReports();
