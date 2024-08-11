import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function GenerateTicketPDF(user: any, train_name: string, from: any, to: any, seat_name: string, seat_numbers: number[], date: string, departure: any, reach: any, price: number) {
    const generatePDF = async () => {
        const doc = new jsPDF();

        // Add title in the middle with golden color
        doc.setFontSize(20);
        doc.setTextColor(255, 215, 0); // Golden color
        doc.text('Bangladesh Railway', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });

        // Measure the height of the title text
        let previousY = 10 + doc.getTextDimensions('Bangladesh Railway').h + 10;

        // Add Ticket Details in green color
        doc.setFontSize(16);
        doc.setTextColor(34, 197, 94); 
        doc.text('Online Ticket', doc.internal.pageSize.getWidth() / 2, previousY, { align: 'center' });

        // Measure the height of the 'Online Ticket' text
        previousY += doc.getTextDimensions('Online Ticket').h + 10;

        doc.setFontSize(8);
        doc.setTextColor(30, 31, 59);
        const tableX = 15;
        doc.text(`Dear ${user.name},`, tableX, previousY);
        
        
        previousY += doc.getTextDimensions(`Dear ${user.name},`).h + 1;

        doc.text('Your Request to book the following ticket has been confirmed. You can travel on the train mentioned in the ticket subject by showing the online or offline copy of this ticket', tableX, previousY, { align: 'left', maxWidth: doc.internal.pageSize.getWidth() - 40 });

        // Measure the height of the long text
        previousY += doc.getTextDimensions('Your Request to book the following ticket has been confirmed. You can travel on the train mentioned in the ticket subject by showing the online or offline copy of this ticket').h + 10;

        // Custom draw function for header rows
        const drawHeaderRow = (data: any) => {
            doc.setFillColor(0, 200, 83); // Green color
            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
            doc.setTextColor(255, 255, 255); // White color
            doc.text(data.cell.text, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center', baseline: 'middle' });
        };


        // Draw the first table (Ticket Details)
        autoTable(doc, {
            startY: previousY + 10,
            headStyles: { fillColor: [255, 215, 0] }, // Golden color for header
            body: [
                [{ content: 'Ticket Details', colSpan: 2, styles: { halign: 'center', fillColor: [0, 200, 83], textColor: [255, 255, 255] } }],
                ['Train', train_name],
                ['Seat Types', seat_name],
                ['Seat Numbers', seat_numbers.join(', ')],
                ['From', from],
                ['To', to],
                ['Journey Date', date],
                ['Departure Time', departure],
                ['Reach Time', reach],
                ['Price', `${price} Tk`]
            ],
            theme: 'grid',
            styles: {
                lineColor: [30, 41, 59], // Slate-800 color for border
                lineWidth: 0.5,
                fontSize: 9 // Decrease font size to 8
            },
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 'auto' }
            },
            didDrawCell: (data) => {
                if (data.row.index === 0) {
                    drawHeaderRow(data);
                }
            }
        });

        previousY = (doc as any).autoTable.previous.finalY + 20; 
        // Draw the second table (Passenger Details)
        autoTable(doc, {
            startY: previousY,
            headStyles: { fillColor: [255, 215, 0] }, // Golden color for header
            body: [
                [{ content: 'Passenger Details', colSpan: 2, styles: { halign: 'center', fillColor: [0, 200, 83], textColor: [255, 255, 255] } }],
                ['Name', user.name],
                ['Email', user.email],
                ['NID No.', user.nid],
                ['Phone', user.phone],
                ['Address', user.location]
            ],
            theme: 'grid',
            styles: {
                lineColor: [30, 41, 59], // Slate-800 color for border
                lineWidth: 0.5,
                fontSize: 9 // Decrease font size to 8
            },
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 'auto' }
            },
            didDrawCell: (data) => {
                if (data.row.index === 0) {
                    drawHeaderRow(data);
                }
            }
        });

        doc.save('ticket.pdf');
    };

    generatePDF();
}
