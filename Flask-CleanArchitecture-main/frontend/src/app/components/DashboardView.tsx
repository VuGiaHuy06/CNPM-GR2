import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  selectedBranch: string;
}

const revenueData = [
  { name: 'T2', revenue: 2400 },
  { name: 'T3', revenue: 1398 },
  { name: 'T4', revenue: 9800 },
  { name: 'T5', revenue: 3908 },
  { name: 'T6', revenue: 4800 },
  { name: 'T7', revenue: 3800 },
  { name: 'CN', revenue: 4300 },
];

const stats = [
  { label: 'Tổng Doanh Thu', value: '312.500.000đ', change: '+12.5%', icon: DollarSign, color: 'text-green-600' },
  { label: 'Tổng Đơn Hàng', value: '245', change: '+8.2%', icon: ShoppingBag, color: 'text-blue-600' },
  { label: 'Bàn Đang Dùng', value: '18/32', change: '56%', icon: Users, color: 'text-orange-600' },
  { label: 'Giá Trị TB/Đơn', value: '1.275.000đ', change: '+2.1%', icon: TrendingUp, color: 'text-purple-600' },
];

export function DashboardView({ selectedBranch }: DashboardViewProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Bảng Điều Khiển</h2>
        <p className="text-gray-500 mt-1">Tổng quan hiệu suất nhà hàng của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-600">{stat.change}</span> từ tuần trước
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tổng Quan Doanh Thu</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#f97316" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}