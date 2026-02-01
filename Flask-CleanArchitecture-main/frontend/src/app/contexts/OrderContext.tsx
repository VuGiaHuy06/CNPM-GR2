import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface OrderItemStatus {
  itemId: string;
  status: 'pending' | 'preparing' | 'cooking' | 'ready';
  estimatedTime?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  total: number;
  timestamp: Date;
  customerName?: string;
  itemStatuses?: OrderItemStatus[];
  estimatedCompletionTime?: Date;
  completedAt?: Date;
  rating?: number;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'timestamp'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
  getCustomerOrders: (customerName: string) => Order[];
  rateOrder: (orderId: string, rating: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Mock initial orders for admin demo
const initialOrders: Order[] = [
  {
    id: 'ORD-1',
    tableNumber: 'B05',
    items: [
      { id: '1', name: 'Cá Hồi Nướng', quantity: 2, price: 249000 },
      { id: '2', name: 'Salad Caesar', quantity: 1, price: 129000, notes: 'Không bánh mì' },
    ],
    status: 'pending',
    total: 627000,
    timestamp: new Date(Date.now() - 5 * 60000),
    customerName: 'demo-customer',
  },
  {
    id: 'ORD-2',
    tableNumber: 'B12',
    items: [
      { id: '3', name: 'Pizza Margherita', quantity: 1, price: 189000 },
      { id: '4', name: 'Tiramisu', quantity: 2, price: 89000 },
    ],
    status: 'preparing',
    total: 367000,
    timestamp: new Date(Date.now() - 15 * 60000),
    customerName: 'demo-customer',
  },
  {
    id: 'ORD-3',
    tableNumber: 'B08',
    items: [
      { id: '5', name: 'Bò Bít Tết', quantity: 1, price: 349000 },
    ],
    status: 'ready',
    total: 349000,
    timestamp: new Date(Date.now() - 25 * 60000),
    customerName: 'demo-customer',
  },
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = (orderData: Omit<Order, 'id' | 'timestamp'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      timestamp: new Date(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // Không tự động chuyển trạng thái - admin sẽ quản lý thủ công
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  };

  const getCustomerOrders = (customerName: string) => {
    return orders.filter(order => order.customerName === customerName);
  };

  const rateOrder = (orderId: string, rating: number) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, rating } : order
    ));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        cancelOrder,
        getCustomerOrders,
        rateOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}