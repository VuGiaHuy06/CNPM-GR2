
import { LayoutDashboard, ShoppingCart, Utensils } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h1 className="text-xl font-bold text-blue-600 mb-6">Restaurant SaaS</h1>
      <ul className="space-y-2">
        <li className="flex gap-2 items-center p-2 rounded hover:bg-gray-100">
          <LayoutDashboard size={18}/> Dashboard
        </li>
        <li className="flex gap-2 items-center p-2 rounded hover:bg-gray-100">
          <ShoppingCart size={18}/> Orders
        </li>
        <li className="flex gap-2 items-center p-2 rounded hover:bg-gray-100">
          <Utensils size={18}/> Menu
        </li>
      </ul>
    </aside>
  )
}
