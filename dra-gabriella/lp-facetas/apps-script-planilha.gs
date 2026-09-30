// Cole este código em: Planilha Google > Extensões > Apps Script
// Depois: Implantar > Nova implantação > Tipo: App da Web
// Executar como: Eu | Quem pode acessar: Qualquer pessoa
// Copie a URL gerada e cole em PLANILHA_URL no código da página.

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Leads') || ss.insertSheet('Leads');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Data', 'Nome', 'WhatsApp', 'Cidade', 'Queixa', 'Página', 'utm_source', 'utm_campaign', 'utm_content', 'fbclid']);
  }
  var p = e.parameter;
  sh.appendRow([new Date(), p.nome, p.whatsapp, p.cidade, p.queixa, p.pagina, p.utm_source, p.utm_campaign, p.utm_content, p.fbclid]);
  return ContentService.createTextOutput('ok');
}
