import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueAnalyticsProps {
  selectedBranch: string;
}

const dailyRevenue = [
  { date: '01/01', revenue: 2400, orders: 45 },
  { date: '01/02', revenue: 1398, orders: 32 },
  { date: '01/03', revenue: 9800, orders: 89 },
  { date: '01/04', revenue: 3908, orders: 55 },
  { date: '01/05', revenue: 4800, orders: 67 },
  { date: '01/06', revenue: 3800, orders: 58 },
  { date: '01/07', revenue: 4300, orders: 61 },
];

const categoryRevenue = [
  { name: 'Món Chính', value: 45, revenue: 12400 },
  { name: 'Khai Vị', value: 25, revenue: 6850 },
  { name: 'Tráng Miệng', value: 15, revenue: 4100 },
  { name: 'Đồ Uống', value: 15, revenue: 4100 },
];

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b'];

export function RevenueAnalytics({ selectedBranch }: RevenueAnalyticsProps) {
  const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = dailyRevenue.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Phân Tích Doanh Thu</h2>
        <p className="text-gray-500 mt-1">Phân tích chi tiết về doanh thu và bán hàng</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Tổng Doanh Thu (7 ngày)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{(totalRevenue * 25000).toLocaleString('vi-VN')}đ</p>
            <p className="text-sm text-gray-500 mt-1">+18.2% so với tuần trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Tổng Đơn Hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
            <p className="text-sm text-gray-500 mt-1">+12.5% so với tuần trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Giá Trị TB/Đơn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{(avgOrderValue * 25000).toLocaleString('vi-VN')}đ</p>
            <p className="text-sm text-gray-500 mt-1">+5.1% so với tuần trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Xu Hướng Doanh Thu Hàng Ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} name="Doanh Thu (x1000đ)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh Thu Theo Danh Mục</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đơn Hàng vs Doanh Thu</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#f97316" name="Doanh Thu (x1000đ)" />
              <Bar yAxisId="right" dataKey="orders" fill="#3b82f6" name="Đơn Hàng" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}