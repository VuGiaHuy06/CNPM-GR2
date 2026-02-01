import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useOrders, Order } from '../contexts/OrderContext';
import { useTables } from '../contexts/TableContext';
import { ShoppingCart, Search, Star, Clock, MapPin, LogOut, User, Receipt, QrCode, CreditCard, ChefHat, CheckCircle2, XCircle, Package, ThumbsUp, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatbot } from './AIChatbot';
import { OrderTimeline } from './OrderTimeline';
import { TableSelectorDialog } from './TableSelectorDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import QRCode from 'react-qr-code';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  prepTime: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// Remove local Order interface and OrderItemStatus since we're using the ones from OrderContext

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Cá Hồi Nướng',
    description: 'Cá hồi Đại Tây Dương tươi với thảo mộc',
    price: 249000,
    category: 'Món Chính',
    image: 'salmon',
    rating: 4.8,
    prepTime: '20-25 phút',
  },
  {
    id: '2',
    name: 'Salad Caesar',
    description: 'Caesar truyền thống với bánh mì nướng giòn',
    price: 129000,
    category: 'Khai Vị',
    image: 'salad',
    rating: 4.5,
    prepTime: '10-15 phút',
  },
  {
    id: '3',
    name: 'Pizza Margherita',
    description: 'Pizza Ý truyền thống với phô mai Mozzarella',
    price: 189000,
    category: 'Món Chính',
    image: 'pizza',
    rating: 4.7,
    prepTime: '15-20 phút',
  },
  {
    id: '4',
    name: 'Tiramisu',
    description: 'Món tráng miệng Ý cổ điển',
    price: 89000,
    category: 'Tráng Miệng',
    image: 'dessert',
    rating: 4.9,
    prepTime: '5 phút',
  },
  {
    id: '5',
    name: 'Bò Bít Tết',
    description: 'Thịt bò Úc thượng hạng nướng vừa chín',
    price: 349000,
    category: 'Món Chính',
    image: 'steak',
    rating: 4.9,
    prepTime: '25-30 phút',
  },
  {
    id: '6',
    name: 'Mì Ý Carbonara',
    description: 'Mì Ý với sốt kem, thịt xông khói',
    price: 159000,
    category: 'Món Chính',
    image: 'pasta',
    rating: 4.6,
    prepTime: '15-20 phút',
  },
];

const CATEGORIES = ['Tất cả', 'Khai Vị', 'Món Chính', 'Tráng Miệng', 'Đồ Uống'];

export function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { addOrder, getCustomerOrders, rateOrder } = useOrders();
  const { tables, getTable, isTableAvailable, occupyTable } = useTables();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState<'menu' | 'orders'>('menu');
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [qrType, setQRType] = useState<'table' | 'payment'>('table');
  const [currentTableNumber, setCurrentTableNumber] = useState<string>('');
  const [showTableSelector, setShowTableSelector] = useState(false);

  // Try to get table number from URL params (e.g., ?table=B01)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    if (tableParam) {
      setCurrentTableNumber(tableParam.toUpperCase());
    }
  }, []);

  // Get current table info
  const currentTable = currentTableNumber ? getTable(currentTableNumber) : undefined;

  // Get customer orders from context
  const orders = getCustomerOrders(user?.email || 'guest');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success(`Đã thêm ${item.name} vào giỏ hàng`);
  };

  const addToCartFromAI = (item: { id: string; name: string; price: number; description: string }) => {
    // Convert AI menu item to full MenuItem
    const fullItem: MenuItem = {
      ...item,
      category: 'Món Chính',
      image: 'dish',
      rating: 4.8,
      prepTime: '20-25 phút',
    };
    addToCart(fullItem);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    // Check if table is selected
    if (!currentTableNumber) {
      toast.error('Vui lòng chọn bàn trước khi đặt món');
      setShowTableSelector(true);
      return;
    }

    // Check if table is available
    if (!isTableAvailable(currentTableNumber)) {
      toast.error(`Bàn ${currentTableNumber} đang được sử dụng hoặc đã đặt trước`);
      setShowTableSelector(true);
      return;
    }
    
    // Create order ID first
    const orderId = `ORD-${Date.now()}`;
    
    // Try to occupy the table
    const success = occupyTable(currentTableNumber, orderId, totalItems);
    
    if (!success) {
      return; // Table occupation failed, error already shown
    }
    
    // Create new order using OrderContext
    addOrder({
      tableNumber: currentTableNumber,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: totalPrice,
      status: 'pending',
      customerName: user?.email || 'guest',
    });
    
    toast.success(`Đơn hàng đã được gửi đến bếp! Bàn ${currentTableNumber}`);
    setCart([]);
    setShowCart(false);
  };
  
  const getStatusBadge = (status: Order['status']) => {
    const statusMap = {
      pending: { label: 'Chờ xác nhận', className: 'bg-yellow-100 text-yellow-700' },
      preparing: { label: 'Đang nấu', className: 'bg-blue-100 text-blue-700' },
      ready: { label: 'Sẵn sàng', className: 'bg-green-100 text-green-700' },
      served: { label: 'Đã phục vụ', className: 'bg-purple-100 text-purple-700' },
      completed: { label: 'Hoàn thành', className: 'bg-gray-100 text-gray-700' },
      cancelled: { label: 'Đã hủy', className: 'bg-red-100 text-red-700' },
    };
    const statusInfo = statusMap[status] || { label: 'Không xác định', className: 'bg-gray-100 text-gray-700' };
    return <Badge className={statusInfo.className}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">S2O Menu</h1>
                <p className="text-xs text-gray-500">Chi Nhánh Chính</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Khách hàng</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentView('menu')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                currentView === 'menu'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="font-medium">Thực Đơn</span>
              </div>
            </button>
            <button
              onClick={() => setCurrentView('orders')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                currentView === 'orders'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                <span className="font-medium">Đơn Hàng Của Tôi</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'menu' ? (
          <>
            {/* Table Selection Banner */}
            {currentTableNumber && currentTable ? (
              <Card className="mb-6 border-2 border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <UtensilsCrossed className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-orange-900">Bàn {currentTableNumber}</p>
                        <p className="text-sm text-orange-700">
                          Sức chứa: {currentTable.capacity} người • 
                          {currentTable.status === 'available' ? ' Sẵn sàng đặt món' : ' Đang sử dụng'}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTableSelector(true)}
                      className="border-orange-500 text-orange-700 hover:bg-orange-100"
                    >
                      Đổi bàn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6 border-2 border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <UtensilsCrossed className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-yellow-900">Chưa chọn bàn</p>
                        <p className="text-sm text-yellow-700">Vui lòng chọn bàn trước khi đặt món</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setShowTableSelector(true)}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      Chọn Bàn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Restaurant Info */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Nhà Hàng S2O</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>4.8 (250+ đánh giá)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>20-30 phút</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Đang mở cửa</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm món ăn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <span className="text-4xl">🍽️</span>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{item.prepTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">
                        {item.price.toLocaleString('vi-VN')}đ
                      </span>
                      <Button
                        onClick={() => addToCart(item)}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Thêm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Orders View */
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Đơn Hàng Của Tôi</h2>
              <div className="flex gap-2">
                <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setQRType('table')}
                      className="border-orange-500 text-orange-600 hover:bg-orange-50"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Bàn
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        {qrType === 'table' ? 'Mã QR Bàn' : 'Mã QR Thanh Toán'}
                      </DialogTitle>
                      <DialogDescription>
                        {qrType === 'table' ? 'Quét mã để truy cập thực đơn' : 'Quét mã để thanh toán'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <QRCode
                          value={qrType === 'table' 
                            ? `https://s2o.vn/table/${currentTableNumber || 'select'}?user=${user?.email}` 
                            : `https://s2o.vn/payment/${orders[0]?.id || 'demo'}`}
                          size={200}
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">
                          {qrType === 'table' 
                            ? (currentTableNumber ? `Bàn ${currentTableNumber}` : 'Chưa chọn bàn') 
                            : 'Thanh toán đơn hàng'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {qrType === 'table' 
                            ? 'Quét mã để truy cập thực đơn' 
                            : 'Quét mã để thanh toán'}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setQRType('payment');
                    setShowQRDialog(true);
                  }}
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  QR Thanh toán
                </Button>
              </div>
            </div>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg">Đơn hàng #{order.id.slice(-8)}</CardTitle>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>📅 {order.timestamp.toLocaleString('vi-VN')}</span>
                            <span>🪑 {order.tableNumber}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">
                            {order.total.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="items" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="items">Món đã đặt</TabsTrigger>
                          <TabsTrigger value="timeline">Trạng thái</TabsTrigger>
                        </TabsList>
                        <TabsContent value="items" className="mt-4">
                          <div className="space-y-3">
                            {order.items.map(item => (
                              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">🍽️</span>
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-medium text-orange-600">
                                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Tổng cộng</span>
                              <span className="text-xl font-bold text-orange-600">
                                {order.total.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="timeline" className="mt-4">
                          <OrderTimeline 
                            status={order.status}
                            createdAt={order.timestamp}
                            estimatedTime={order.estimatedCompletionTime}
                            completedAt={order.completedAt}
                          />
                          {order.status === 'ready' && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center gap-2 text-green-700">
                                <CheckCircle2 className="w-5 h-5" />
                                <p className="font-medium">Đơn hàng của bạn đã sẵn sàng!</p>
                              </div>
                              <p className="text-sm text-green-600 mt-1">
                                Vui lòng đến quầy để nhận món
                              </p>
                            </div>
                          )}
                          {order.status === 'served' && !order.rating && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="font-medium text-blue-900 mb-2">Đánh giá đơn hàng</p>
                              <p className="text-sm text-blue-700 mb-3">Bạn có hài lòng với đơn hàng không?</p>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    onClick={() => {
                                      rateOrder(order.id, rating);
                                      toast.success(`Cảm ơn bạn đã đánh giá ${rating} sao!`);
                                    }}
                                    className="text-2xl hover:scale-110 transition-transform"
                                  >
                                    ⭐
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {order.rating && (
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                              <div className="flex items-center gap-2">
                                <ThumbsUp className="w-5 h-5 text-green-600" />
                                <p className="font-medium">Cảm ơn bạn đã đánh giá!</p>
                              </div>
                              <div className="flex gap-1 mt-2">
                                {[...Array(order.rating)].map((_, i) => (
                                  <span key={i} className="text-yellow-500">⭐</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12 text-gray-500">
                    <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p>Bạn chưa có đơn hàng nào</p>
                    <Button
                      onClick={() => setCurrentView('menu')}
                      className="mt-4 bg-orange-600 hover:bg-orange-700"
                    >
                      Xem Thực Đơn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Giỏ Hàng</h2>
                  <Button variant="ghost" onClick={() => setShowCart(false)}>
                    ✕
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p>Giỏ hàng trống</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🍽️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-orange-600 font-bold mt-1">
                            {item.price.toLocaleString('vi-VN')}đ
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              +
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-600 hover:text-red-700"
                            >
                              Xóa
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tạm tính</span>
                      <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phí dịch vụ</span>
                      <span>0đ</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Tổng cộng</span>
                      <span className="text-orange-600">{totalPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 hover:bg-orange-700 h-12"
                  >
                    Đặt Món ({totalItems} món)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <AIChatbot onAddToCart={addToCartFromAI} />

      {/* Table Selector Dialog */}
      <TableSelectorDialog
        open={showTableSelector}
        onOpenChange={setShowTableSelector}
        tables={tables}
        currentTableNumber={currentTableNumber}
        onSelectTable={setCurrentTableNumber}
      />
    </div>
  );
}