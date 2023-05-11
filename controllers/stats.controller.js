const modelModel = require('../models/model.model');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {createPie}=require('../utils/generatePie');

const createFolder = async (thePath) => {
    if (!fs.existsSync(thePath)) {
        await fsPromises.mkdir(thePath,{ recursive: true });
    }
}

const createFooter = (doc) => {
    const range = doc.bufferedPageRange();
    doc.fillColor('black');
    const footerText = '(c)2023 Editiel98 - G.Crégut'
    for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
        doc.switchToPage(i);
        doc.text(footerText, 10, 780);
        doc.text(`Page ${i + 1} / ${range.count}`, 10, 780, { with: 450, align: 'right' });
    }
}

const doStats = async (req, res) => {
    const pathTemp=path.join(__dirname, '..', 'temp','generator');
    //Créer le répertoire si ce n'est pas fait
    createFolder(pathTemp);
    //Générer les différents graphes

    //Générer le PDF

    //Envoyer et stocker le PDF
    res.sendStatus(418);
}

module.exports = {
    doStats,
}