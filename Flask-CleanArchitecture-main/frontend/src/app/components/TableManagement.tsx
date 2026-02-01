import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Users, Clock, DollarSign, Circle, Receipt, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useTables } from '../contexts/TableContext';
import { useOrders } from '../contexts/OrderContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from './ui/dialog';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface TableManagementProps {
  selectedBranch: string;
}

const statusColors = {
  available: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100 text-green-800' },
  occupied: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
  reserved: { bg: 'bg-yellow-50', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-800' },
};

const statusLabels = {
  available: 'Trống',
  occupied: 'Đang dùng',
  reserved: 'Đã đặt',
};

export function TableManagement({ selectedBranch }: TableManagementProps) {
  const { tables, releaseTable, updateTableStatus } = useTables();
  const { orders } = useOrders();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [statusChangeTable, setStatusChangeTable] = useState<string | null>(null);

  // Get order for a specific table
  const getTableOrder = (tableNumber: string) => {
    const table = tables.find(t => t.number === tableNumber);
    if (!table?.currentOrderId) return null;
    return orders.find(o => o.id === table.currentOrderId);
  };

  const handleReleaseTable = (tableNumber: string) => {
    const table = tables.find(t => t.number === tableNumber);
    if (!table) return;

    if (table.status === 'occupied') {
      const tableOrder = getTableOrder(tableNumber);
      if (tableOrder && tableOrder.status !== 'completed') {
        toast.error('Không thể giải phóng bàn khi đơn hàng chưa hoàn thành');
        return;
      }
    }

    releaseTable(tableNumber);
    toast.success(`Đã giải phóng bàn ${tableNumber}`);
    setShowStatusDialog(false);
  };

  const handleStatusChange = (tableNumber: string, newStatus: 'available' | 'occupied' | 'reserved') => {
    const table = tables.find(t => t.number === tableNumber);
    if (!table) return;

    // If changing from occupied to available, check if order is completed
    if (table.status === 'occupied' && newStatus === 'available') {
      handleReleaseTable(tableNumber);
      return;
    }

    // Update status
    updateTableStatus(tableNumber, newStatus);
    toast.success(`Đã chuyển bàn ${tableNumber} sang trạng thái "${statusLabels[newStatus]}"`);
    setShowStatusDialog(false);
  };

  const availableCount = tables.filter(t => t.status === 'available').length;
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;
  const reservedCount = tables.filter(t => t.status === 'reserved').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Quản Lý Bàn Ăn</h2>
        <p className="text-gray-500 mt-1">Theo dõi và quản lý trạng thái bàn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bàn Trống</p>
                <p className="text-3xl font-bold text-green-600">{availableCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Circle className="w-6 h-6 text-green-600 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang Sử Dụng</p>
                <p className="text-3xl font-bold text-red-600">{occupiedCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Circle className="w-6 h-6 text-red-600 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã Đặt Trước</p>
                <p className="text-3xl font-bold text-yellow-600">{reservedCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Circle className="w-6 h-6 text-yellow-600 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tables.map((table) => {
          const colors = statusColors[table.status];
          const tableOrder = getTableOrder(table.number);
          
          return (
            <Card
              key={table.id}
              className={`hover:shadow-lg transition-shadow ${colors.bg}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{table.number}</CardTitle>
                  <Badge className={colors.badge}>
                    {statusLabels[table.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    {table.currentGuests || 0}/{table.capacity} chỗ
                  </span>
                </div>
                
                {/* Admin Status Control */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <Dialog open={showStatusDialog && statusChangeTable === table.number} onOpenChange={(open) => {
                    setShowStatusDialog(open);
                    if (!open) setStatusChangeTable(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mb-2"
                        onClick={() => {
                          setStatusChangeTable(table.number);
                          setShowStatusDialog(true);
                        }}
                      >
                        {table.status === 'occupied' ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Giải phóng bàn
                          </>
                        ) : table.status === 'available' ? (
                          <>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Đổi trạng thái
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Đổi trạng thái
                          </>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Quản lý trạng thái bàn {table.number}</DialogTitle>
                        <DialogDescription>
                          Chọn trạng thái mới cho bàn này
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Trạng thái hiện tại</label>
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[table.status].badge}>
                              {statusLabels[table.status]}
                            </Badge>
                            {table.currentGuests && (
                              <span className="text-sm text-gray-600">
                                ({table.currentGuests} khách)
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {table.status === 'occupied' && tableOrder && (
                          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-center gap-2 text-orange-800 mb-2">
                              <Receipt className="w-4 h-4" />
                              <span className="font-medium text-sm">Đơn hàng đang hoạt động</span>
                            </div>
                            <div className="text-sm text-orange-700">
                              <div>Mã đơn: #{tableOrder.id.slice(-6)}</div>
                              <div>Tổng: {tableOrder.total.toLocaleString('vi-VN')}đ</div>
                              <div>Trạng thái: {tableOrder.status === 'pending' ? 'Chờ xử lý' : tableOrder.status === 'preparing' ? 'Đang chuẩn bị' : tableOrder.status === 'ready' ? 'Sẵn sàng' : 'Hoàn thành'}</div>
                            </div>
                            {tableOrder.status !== 'completed' && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                                ⚠️ Đơn hàng chưa hoàn thành. Hãy hoàn thành đơn trước khi giải phóng bàn.
                              </div>
                            )}
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Chọn trạng thái mới</label>
                          <div className="grid grid-cols-3 gap-2">
                            <Button
                              variant={table.status === 'available' ? 'default' : 'outline'}
                              className={table.status === 'available' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-700 hover:bg-green-50'}
                              onClick={() => handleStatusChange(table.number, 'available')}
                              disabled={table.status === 'available'}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Trống
                            </Button>
                            <Button
                              variant={table.status === 'occupied' ? 'default' : 'outline'}
                              className={table.status === 'occupied' ? 'bg-red-600 hover:bg-red-700' : 'border-red-600 text-red-700 hover:bg-red-50'}
                              onClick={() => handleStatusChange(table.number, 'occupied')}
                              disabled={table.status === 'occupied'}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Đang dùng
                            </Button>
                            <Button
                              variant={table.status === 'reserved' ? 'default' : 'outline'}
                              className={table.status === 'reserved' ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-yellow-600 text-yellow-700 hover:bg-yellow-50'}
                              onClick={() => handleStatusChange(table.number, 'reserved')}
                              disabled={table.status === 'reserved'}
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              Đã đặt
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
                          Đóng
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {tableOrder && (
                  <>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                        <Receipt className="w-3 h-3" />
                        <span>Đơn #{tableOrder.id.slice(-6)}</span>
                      </div>
                      <p className="text-sm font-semibold text-orange-600">
                        {tableOrder.total.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTable(table.number);
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Xem đơn
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chi tiết đơn hàng - {table.number}</DialogTitle>
                          <DialogDescription>
                            Thông tin chi tiết về đơn hàng hiện tại của bàn
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Mã đơn:</span>
                            <span className="font-medium">#{tableOrder.id}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Thời gian:</span>
                            <span className="font-medium">{tableOrder.timestamp.toLocaleString('vi-VN')}</span>
                          </div>
                          <div className="border-t pt-4">
                            <p className="font-medium mb-3">Món đã đặt:</p>
                            <div className="space-y-2">
                              {tableOrder.items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <span>{item.name} x{item.quantity}</span>
                                  <span className="font-medium">
                                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="border-t pt-4 flex justify-between items-center">
                            <span className="font-bold">Tổng cộng:</span>
                            <span className="text-xl font-bold text-orange-600">
                              {tableOrder.total.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}