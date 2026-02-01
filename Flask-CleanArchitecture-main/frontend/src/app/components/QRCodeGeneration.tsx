import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import QRCode from 'react-qr-code';
import { Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGenerationProps {
  selectedBranch: string;
}

interface TableQR {
  id: string;
  tableNumber: string;
  qrUrl: string;
}

const generateTableQRs = (branch: string): TableQR[] => {
  const tables = [];
  for (let i = 1; i <= 12; i++) {
    const tableNum = `B${i.toString().padStart(2, '0')}`;
    tables.push({
      id: `${branch}-${tableNum}`,
      tableNumber: tableNum,
      qrUrl: `https://s2o.app/${branch}/${tableNum}`,
    });
  }
  return tables;
};

export function QRCodeGeneration({ selectedBranch }: QRCodeGenerationProps) {
  const [tables] = useState<TableQR[]>(() => generateTableQRs(selectedBranch));

  const downloadQR = (tableNumber: string) => {
    const svg = document.getElementById(`qr-${tableNumber}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-${tableNumber}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success(`Đã tải mã QR cho ${tableNumber}`);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const printQR = (tableNumber: string) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    const svg = document.getElementById(`qr-${tableNumber}`);
    if (!svg) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Mã QR - ${tableNumber}</title>
          <style>
            body { 
              display: flex; 
              flex-direction: column;
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0;
              font-family: Arial, sans-serif;
            }
            h1 { margin-bottom: 20px; }
            .qr-container { 
              padding: 40px; 
              border: 2px solid #000;
              background: white;
            }
          </style>
        </head>
        <body>
          <h1>Bàn ${tableNumber}</h1>
          <div class="qr-container">
            ${svg.outerHTML}
          </div>
          <p>Quét mã để xem thực đơn và đặt món</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    
    toast.success(`Đang in mã QR cho ${tableNumber}`);
  };

  const downloadAll = () => {
    tables.forEach((table, index) => {
      setTimeout(() => downloadQR(table.tableNumber), index * 500);
    });
    toast.success('Đang tải tất cả mã QR');
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tạo Mã QR</h2>
          <p className="text-gray-500 mt-1">Tạo và tải mã QR cho các bàn</p>
        </div>
        <Button onClick={downloadAll} className="bg-orange-600 hover:bg-orange-700">
          <Download className="w-4 h-4 mr-2" />
          Tải Tất Cả
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardHeader>
              <CardTitle className="text-lg text-center">Bàn {table.tableNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <QRCode
                    id={`qr-${table.tableNumber}`}
                    value={table.qrUrl}
                    size={180}
                    level="H"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center break-all">
                  {table.qrUrl}
                </p>
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={() => downloadQR(table.tableNumber)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                  <Button
                    onClick={() => printQR(table.tableNumber)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    In
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
