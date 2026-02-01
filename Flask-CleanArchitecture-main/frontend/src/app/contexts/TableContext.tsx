import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Table {
  id: string;
  number: string; // B01, B02, etc.
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentGuests?: number;
  currentOrderId?: string; // Link to active order
}

interface TableContextType {
  tables: Table[];
  getTable: (tableNumber: string) => Table | undefined;
  updateTableStatus: (tableNumber: string, status: Table['status'], orderId?: string) => void;
  isTableAvailable: (tableNumber: string) => boolean;
  occupyTable: (tableNumber: string, orderId: string, guests?: number) => boolean;
  releaseTable: (tableNumber: string) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

// Initialize tables B01 to B12
const initialTables: Table[] = [
  { id: '1', number: 'B01', capacity: 2, status: 'available' },
  { id: '2', number: 'B02', capacity: 4, status: 'available' },
  { id: '3', number: 'B03', capacity: 4, status: 'available' },
  { id: '4', number: 'B04', capacity: 6, status: 'available' },
  { id: '5', number: 'B05', capacity: 2, status: 'occupied', currentGuests: 2, currentOrderId: 'ORD-1' },
  { id: '6', number: 'B06', capacity: 4, status: 'available' },
  { id: '7', number: 'B07', capacity: 2, status: 'available' },
  { id: '8', number: 'B08', capacity: 6, status: 'occupied', currentGuests: 5, currentOrderId: 'ORD-3' },
  { id: '9', number: 'B09', capacity: 4, status: 'available' },
  { id: '10', number: 'B10', capacity: 2, status: 'reserved' },
  { id: '11', number: 'B11', capacity: 8, status: 'available' },
  { id: '12', number: 'B12', capacity: 4, status: 'occupied', currentGuests: 4, currentOrderId: 'ORD-2' },
];

export function TableProvider({ children }: { children: ReactNode }) {
  const [tables, setTables] = useState<Table[]>(initialTables);

  const getTable = (tableNumber: string): Table | undefined => {
    return tables.find(table => table.number === tableNumber);
  };

  const updateTableStatus = (tableNumber: string, status: Table['status'], orderId?: string) => {
    setTables(prev => prev.map(table => 
      table.number === tableNumber 
        ? { 
            ...table, 
            status,
            currentOrderId: status === 'occupied' ? orderId : undefined,
            currentGuests: status === 'available' ? undefined : table.currentGuests
          }
        : table
    ));
  };

  const isTableAvailable = (tableNumber: string): boolean => {
    const table = getTable(tableNumber);
    return table?.status === 'available';
  };

  const occupyTable = (tableNumber: string, orderId: string, guests?: number): boolean => {
    const table = getTable(tableNumber);
    
    if (!table) {
      toast.error(`Bàn ${tableNumber} không tồn tại`);
      return false;
    }

    if (table.status === 'occupied') {
      toast.error(`Bàn ${tableNumber} đang được sử dụng`);
      return false;
    }

    if (table.status === 'reserved') {
      toast.warning(`Bàn ${tableNumber} đã được đặt trước`);
      return false;
    }

    setTables(prev => prev.map(t => 
      t.number === tableNumber 
        ? { 
            ...t, 
            status: 'occupied',
            currentOrderId: orderId,
            currentGuests: guests || t.capacity
          }
        : t
    ));

    return true;
  };

  const releaseTable = (tableNumber: string) => {
    setTables(prev => prev.map(table => 
      table.number === tableNumber 
        ? { 
            ...table, 
            status: 'available',
            currentOrderId: undefined,
            currentGuests: undefined
          }
        : table
    ));
  };

  return (
    <TableContext.Provider
      value={{
        tables,
        getTable,
        updateTableStatus,
        isTableAvailable,
        occupyTable,
        releaseTable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTables() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTables must be used within a TableProvider');
  }
  return context;
}
