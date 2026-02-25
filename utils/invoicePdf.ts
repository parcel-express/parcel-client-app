import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export type InvoicePdfData = {
  invoiceNumber: string;
  date: string;
  items: { label: string; value: string }[];
  total: string;
};

export const generateInvoiceHtml = (invoice: InvoicePdfData): string => {
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: sans-serif; padding: 20px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .logo { font-size: 22px; font-weight: bold; color: #FF6B00; }
          .invoice-number { color: #666; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .table td { border: 1px solid #ddd; padding: 10px; }
          .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Parcel Express</div>
          <div class="invoice-number">${invoice.invoiceNumber}</div>
        </div>
        <p><strong>Date:</strong> ${invoice.date}</p>

        <table class="table">
          ${invoice.items
            .map(
              item => `
                <tr>
                  <td>${item.label}</td>
                  <td>${item.value}</td>
                </tr>
              `
            )
            .join('')}
        </table>

        <div class="total">Total: ${invoice.total}</div>
      </body>
    </html>
  `;
};

export const shareInvoice = async (invoice: InvoicePdfData) => {
  const html = generateInvoiceHtml(invoice);
  const { uri } = await Print.printToFileAsync({ html });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: `Invoice ${invoice.invoiceNumber}`,
    });
  }
};
