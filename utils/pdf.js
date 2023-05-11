const PDFDocument = require('pdfkit');
const fs = require('fs');


const createFooter = (doc) => {
    const range = doc.bufferedPageRange();
    doc.fontSize(10);
    doc.font('Times-Roman');
    const footerText = '(c)2023 Editiel98 - G.Crégut'
    for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
        doc.switchToPage(i);
        doc.fillColor('black').text(footerText, 10, 800);
        if(i!==0){
            doc.text(`Page ${i + 1} / ${range.count}`, 10, 800, { with: 450, align: 'right' });
        }
        doc.image(`./utils/logo-mini.png`, 10, 820);
    }
}

const createPDF = (response, pathTemp) => {
    try {
        const today=new Date();
        const doc = new PDFDocument({
            size: 'A4', margins: {
                top: 30, bottom: 20, left: 72, right: 72
            }, bufferPages: true
        });
        doc.pipe(fs.createWriteStream(`${pathTemp}/stats.pdf`));
        //doc.pipe(response);
        //Première page
        doc.image(`./utils/logo2.png`, 10, 10, {
            width: 180
        });
        doc.font('fonts/Pacifico-Regular.ttf');
        doc.fontSize(48);
        doc.fillColor('#912C51');
        doc.text('Models Kit Database', 240, 20);
        doc.fontSize(60);
        doc.font('Times-Roman');
        doc.fillColor('black');
        doc.text('Statistiques du stock',10,350,{width:580,align:'center'});
        doc.fontSize(48);
        doc.text(`En date du ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,{width:580,align:'center'});
        //Page 2
        doc.addPage();
        doc.save()
            .moveTo(5, 5)
            .lineTo(5, 840)
            .lineTo(200, 840)
            .lineTo(200, 5)
            .fill('#ccccff')
            .restore();
       const widthSom=doc.page.width-210;
        doc.text('Sommaire',210,30,{width:widthSom,align:'center'});
        doc.addPage();
        doc.text('Répartition par marques');
        doc.text('Répartition par fournisseurs');
        doc.text('Répartition par échelles');
        doc.addPage();
        doc.text('Répartition par périodes');
        doc.text('Répartition par catégories');
        doc.text('Répartition par états');
        createFooter(doc);
        doc.end();
    }
    catch (err) {
        console.log(err)
        return response.sendStatus(500);
    }
}

module.exports = {
    createPDF,
}