// Cole este código em: Planilha Google > Extensões > Apps Script
// Depois: Implantar > Gerenciar implantações > lápis > Versão: Nova versão > Implantar
// (assim a URL continua a mesma)
// Para testar no navegador: abra a URL /exec?nome=Teste&cidade=Garanhuns

var PLANILHA_ID = ''; // só preencha se o script NÃO foi criado pela própria planilha

function planilha_() {
  var ss = PLANILHA_ID ? SpreadsheetApp.openById(PLANILHA_ID) : SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Leads') || ss.insertSheet('Leads');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Data', 'Nome', 'WhatsApp', 'Cidade', 'Queixa', 'Página', 'utm_source', 'utm_campaign', 'utm_content', 'fbclid']);
  }
  return sh;
}

function salvar_(e) {
  var p = (e && e.parameter) || {};
  if (e && e.postData && e.postData.contents && !p.nome) {
    e.postData.contents.split('&').forEach(function (par) {
      var kv = par.split('=');
      p[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
    });
  }
  planilha_().appendRow([new Date(), p.nome, p.whatsapp, p.cidade, p.queixa, p.pagina, p.utm_source, p.utm_campaign, p.utm_content, p.fbclid]);
  return ContentService.createTextOutput('ok');
}

function doPost(e) { return salvar_(e); }
function doGet(e) { return salvar_(e); }
