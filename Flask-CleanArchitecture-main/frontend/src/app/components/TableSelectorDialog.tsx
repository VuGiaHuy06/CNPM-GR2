import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { toast } from 'sonner';
import { Table } from '../contexts/TableContext';

interface TableSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tables: Table[];
  currentTableNumber: string;
  onSelectTable: (tableNumber: string) => void;
}

export function TableSelectorDialog({
  open,
  onOpenChange,
  tables,
  currentTableNumber,
  onSelectTable
}: TableSelectorDialogProps) {
  const handleTableSelect = (table: Table) => {
    if (table.status === 'available') {
      onSelectTable(table.number);
      onOpenChange(false);
      toast.success(`Đã chọn ${table.number}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chọn Bàn Ăn</DialogTitle>
          <DialogDescription>
            Chọn bàn trống để đặt món. Bàn màu xanh đang trống, bàn màu xám đang có khách.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-4">
          {tables.map((table) => {
            const isAvailable = table.status === 'available';
            const isCurrent = table.number === currentTableNumber;
            return (
              <button
                key={table.id}
                onClick={() => handleTableSelect(table)}
                disabled={!isAvailable && !isCurrent}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? 'border-orange-500 bg-orange-50'
                    : isAvailable
                    ? 'border-green-200 bg-green-50 hover:border-green-400 hover:shadow-md'
                    : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-center">
                  <p className={`font-bold text-lg ${
                    isCurrent
                      ? 'text-orange-700'
                      : isAvailable
                      ? 'text-green-700'
                      : 'text-gray-400'
                  }`}>
                    {table.number}
                  </p>
                  <p className="text-xs mt-1 text-gray-600">
                    {table.capacity} chỗ
                  </p>
                  {isCurrent && (
                    <p className="text-xs mt-1 text-orange-600 font-medium">Đang chọn</p>
                  )}
                  {!isAvailable && !isCurrent && (
                    <p className="text-xs mt-1 text-red-600">Đang dùng</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}