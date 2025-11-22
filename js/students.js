document.getElementById('report-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();

  const fileInput = document.getElementById('imageInput');
  let base64Image = "";

  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    base64Image = await toBase64(file);
  }

  const report = {
    id: Date.now(),
    name: document.getElementById('facilityName').value,
    description: document.getElementById('description').value,
    status: document.getElementById('status').value,
    image: base64Image,
    date: new Date().toLocaleDateString()
  };

  const reports = JSON.parse(localStorage.getItem('reports')) || [];
  reports.push(report);
  localStorage.setItem('reports', JSON.stringify(reports));
  alert('The report has been successfully saved!');
  window.location.href = 'index.html#reports';
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
