// ============================================================
// SCRIPT GOOGLE APPS SCRIPT — RSVP → Google Sheets
// ============================================================
// ⚠️  IMPORTANT : ce script doit être ouvert depuis votre Google Sheet
//
// ÉTAPES (à refaire depuis le début) :
// 1. Ouvrez votre Google Sheet (ou créez-en un nouveau)
// 2. Copiez l'ID du Sheet depuis l'URL :
//    https://docs.google.com/spreadsheets/d/  ►CECI EST L'ID◄  /edit
// 3. Collez cet ID dans la variable SHEET_ID ci-dessous
// 4. Menu : Extensions → Apps Script
// 5. Effacez tout le code existant → collez CE code → Enregistrer (💾)
// 6. Déployer → Nouveau déploiement
//    - Type : Application Web
//    - Exécuter en tant que : Moi
//    - Qui a accès : Tout le monde
// 7. Autoriser les permissions Google quand demandé
// 8. Copiez l'URL générée → collez dans wedding.config.js
// ============================================================

// ↓↓↓ COLLEZ ICI L'ID DE VOTRE GOOGLE SHEET ↓↓↓
var SHEET_ID = "VOTRE_ID_ICI";
// Exemple : "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

function doPost(e) {
  try {
    var ss;
    try {
      // Méthode 1 : Script lié au Sheet (depuis Extensions → Apps Script)
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (err) {
      // Méthode 2 : Script standalone avec ID
      ss = SpreadsheetApp.openById(SHEET_ID);
    }

    var sheet = ss.getSheetByName('RSVP');
    if (!sheet) {
      sheet = ss.insertSheet('RSVP');
    }

    var data = JSON.parse(e.postData.contents);

    // En-têtes automatiques si la feuille est vide
    if (sheet.getLastRow() === 0) {
      var headers = [
        'Date & Heure', 'Nom complet',
        'Mairie', 'Nb — Mairie',
        'Houpa', 'Nb — Houpa',
        'Shabbat Hatan', 'Nb — Shabbat',
        'Message'
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#C9A96E');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toLocaleString('fr-FR'),
      data.nom        || '',
      data.mairie     || '',
      data.mairie_nb  || '—',
      data.houpa      || '',
      data.houpa_nb   || '—',
      data.shabbat    || '',
      data.shabbat_nb || '—',
      data.message    || ''
    ]);

    sheet.autoResizeColumns(1, 9);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('✓ Script RSVP Gabriel & Mia actif')
    .setMimeType(ContentService.MimeType.TEXT);
}
