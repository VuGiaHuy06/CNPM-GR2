import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, CheckCircle, XCircle, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { useOrders } from '../contexts/OrderContext';

interface OrderManagementProps {
  selectedBranch: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  served: 'bg-gray-100 text-gray-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Chờ xử lý',
  preparing: 'Đang nấu',
  ready: 'Sẵn sàng',
  served: 'Đã phục vụ',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export function OrderManagement({ selectedBranch }: OrderManagementProps) {
  const { orders, updateOrderStatus, cancelOrder } = useOrders();
  const [previousOrderCount, setPreviousOrderCount] = useState(orders.length);

  // Detect new orders and show notification
  useEffect(() => {
    if (orders.length > previousOrderCount) {
      const newOrdersCount = orders.length - previousOrderCount;
      toast.success(`🔔 Có ${newOrdersCount} đơn hàng mới!`, {
        duration: 5000,
      });
      
      // Play notification sound (optional)
      // new Audio('/notification.mp3').play().catch(() => {});
    }
    setPreviousOrderCount(orders.length);
  }, [orders.length]);

  const handleUpdateStatus = (orderId: string, newStatus: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled') => {
    updateOrderStatus(orderId, newStatus);
    
    // Show appropriate notification based on new status
    const notifications = {
      preparing: `Đơn hàng ${orderId.slice(-8)} đang được nấu`,
      ready: `Đơn hàng ${orderId.slice(-8)} đã sẵn sàng phục vụ`,
      served: `Đơn hàng ${orderId.slice(-8)} đã được phục vụ`,
      completed: `Đơn hàng ${orderId.slice(-8)} đã hoàn thành`,
      cancelled: `Đơn hàng ${orderId.slice(-8)} đã bị hủy`,
      pending: `Đơn hàng ${orderId.slice(-8)} đang chờ xử lý`,
    };
    
    toast.success(notifications[newStatus] || `Đơn hàng đã cập nhật sang ${statusLabels[newStatus]}`);
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
    toast.error('Đã hủy đơn hàng');
  };

  const getTimeElapsed = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes < 1) return 'Vừa xong';
    return `${minutes} phút trước`;
  };

  const getNextStatus = (currentStatus: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled'): 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled' | null => {
    const statusFlow: { [key: string]: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled' } = {
      pending: 'preparing',
      preparing: 'ready',
      ready: 'served',
    };
    return statusFlow[currentStatus] || null;
  };

  const getNextStatusLabel = (nextStatus: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled'): string => {
    const labels = {
      preparing: 'Đang nấu',
      ready: 'Sẵn sàng',
      served: 'Đã phục vụ',
      completed: 'Hoàn thành',
      pending: 'Chờ xử lý',
      cancelled: 'Đã hủy',
    };
    return labels[nextStatus] || '';
  };

  // Filter active orders (not served, completed, or cancelled) and sort by status priority
  const activeOrders = orders
    .filter(order => 
      order.status !== 'served' && order.status !== 'completed' && order.status !== 'cancelled'
    )
    .sort((a, b) => {
      // Sort by status priority: pending -> preparing -> ready
      const statusPriority = { pending: 0, preparing: 1, ready: 2 };
      const priorityA = statusPriority[a.status as keyof typeof statusPriority] ?? 999;
      const priorityB = statusPriority[b.status as keyof typeof statusPriority] ?? 999;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same status, sort by timestamp (oldest first)
      return a.timestamp.getTime() - b.timestamp.getTime();
    });

  const completedOrders = orders.filter(order => 
    order.status === 'served' || order.status === 'completed'
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Quản Lý Đơn Hàng</h2>
            <p className="text-gray-500 mt-1">Theo dõi và quản lý đơn hàng của khách</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Đơn đang xử lý</p>
                  <p className="text-2xl font-bold text-orange-600">{activeOrders.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeOrders.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold mb-4">Đơn hàng đang xử lý</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activeOrders.map((order) => {
              const nextStatus = getNextStatus(order.status);
              return (
                <Card key={order.id} className="relative border-l-4 border-orange-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Bàn {order.tableNumber}</CardTitle>
                      <Badge className={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{getTimeElapsed(order.timestamp)}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      #{order.id.slice(-8)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{item.quantity}x {item.name}</p>
                            {item.notes && (
                              <p className="text-sm text-gray-500 italic">{item.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tổng cộng</span>
                        <span className="text-lg font-bold text-orange-600">{order.total.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {nextStatus && (
                        <Button
                          onClick={() => handleUpdateStatus(order.id, nextStatus)}
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {getNextStatusLabel(nextStatus)}
                        </Button>
                      )}
                      {order.status !== 'served' && (
                        <Button
                          onClick={() => handleCancelOrder(order.id)}
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center py-12 text-gray-500">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">Không có đơn hàng đang xử lý</p>
              <p className="text-sm mt-2">Đơn hàng mới sẽ xuất hiện tại đây</p>
            </div>
          </CardContent>
        </Card>
      )}

      {completedOrders.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4 text-gray-600">Đơn hàng đã hoàn thành</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedOrders.slice(0, 6).map((order) => (
              <Card key={order.id} className="opacity-60">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Bàn {order.tableNumber}</CardTitle>
                    <Badge className={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeElapsed(order.timestamp)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="text-sm">
                        <p>{item.quantity}x {item.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Tổng cộng</span>
                      <span className="font-bold">{order.total.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}