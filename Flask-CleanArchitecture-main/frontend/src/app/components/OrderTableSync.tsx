import { useEffect } from 'react';
import { useOrders } from '../contexts/OrderContext';
import { useTables } from '../contexts/TableContext';

/**
 * Component để đồng bộ trạng thái giữa Orders và Tables
 * Tự động cập nhật trạng thái bàn khi đơn hàng thay đổi
 */
export function OrderTableSync() {
  const { orders } = useOrders();
  const { releaseTable } = useTables();

  useEffect(() => {
    // Khi đơn hàng được hoàn thành hoặc hủy, giải phóng bàn
    orders.forEach(order => {
      if (order.status === 'completed' || order.status === 'cancelled') {
        releaseTable(order.tableNumber);
      }
    });
  }, [orders, releaseTable]);

  return null; // Component này không render gì
}
