const PDFDocument = require('pdfkit');
const fs = require('fs');


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

const createPDF = (response,pathTemp) => {
    try {
        const doc = new PDFDocument({
            size: 'A4', margins: {
                top: 30, bottom: 20, left: 72, right: 72
            }, bufferPages: true
        });
        doc.pipe(fs.createWriteStream(`${pathTemp}/stats.pdf`));
        doc.pipe(response);
        doc.text('Some text with an standard font')
        doc.image(`${pathTemp}/category.png`, {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
        });
        doc.addPage();
        doc.save()
            .moveTo(10, 10)
            .lineTo(10, 250)
            .lineTo(150, 250)
            .lineTo(150, 10)
            .fill('#FF0000')
            .restore();
        doc.text('Hello page 2')
            .fillColor('blue')
            .text("Ici c'est un lien", 100, 100)
            .underline(100, 100, 160, 27, { color: '#0000FF' })
            .link(100, 100, 160, 27, 'http://localhost');

        createFooter(doc);
        doc.end();
    }
    catch (err) {
       return response.sendStatus(500);
    }
}

module.exports={
    createPDF,
}