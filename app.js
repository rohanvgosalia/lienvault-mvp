alert('🔎 app.js is loaded!');

// statute deadlines in days
const statutes = {
  ON: { notice: 45, final: 60 },       // Ontario
  ID: { notice: 90, final: 730 }      // Idaho
};

document.getElementById('calcBtn').onclick = () => {
  const pdVal = document.getElementById('projectDate').value;
  if (!pdVal) return alert('Please pick a project date.');
  const pd = new Date(pdVal);

  const jur = document.getElementById('jurisdiction').value;
  const rule = statutes[jur];
  const noticeDate = dateFns.addDays(pd, rule.notice);
  const finalDate  = dateFns.addDays(pd, rule.final);

  document.getElementById('deadlines').innerHTML =
    `<p>📌 <strong>Notice Deadline</strong> (${jur}): ${dateFns.format(noticeDate, 'MMMM d, yyyy')}</p>
     <p>📌 <strong>Final Filing</strong> (${jur}): ${dateFns.format(finalDate,  'MMMM d, yyyy')}</p>`;
};

// PDF generation stub
document.getElementById('downloadPdf').onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pdVal = document.getElementById('projectDate').value;
  const jur   = document.getElementById('jurisdiction').value;
  doc.setFontSize(14);
  doc.text(`Notice of Lien - ${jur}`, 20, 20);
  doc.setFontSize(12);
  doc.text(`Project Date: ${pdVal}`, 20, 30);
  const deadlinesText = document.getElementById('deadlines').innerText;
  doc.text(deadlinesText, 20, 40);
  doc.save(`Notice_of_Lien_${jur}_${pdVal}.pdf`);
};
