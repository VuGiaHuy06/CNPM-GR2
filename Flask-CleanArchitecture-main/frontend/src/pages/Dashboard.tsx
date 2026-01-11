
export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Doanh thu</p>
        <p className="text-2xl font-bold">12.500.000 ₫</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Đơn hàng</p>
        <p className="text-2xl font-bold">128</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Bàn đang dùng</p>
        <p className="text-2xl font-bold">8</p>
      </div>
    </div>
  )
}
