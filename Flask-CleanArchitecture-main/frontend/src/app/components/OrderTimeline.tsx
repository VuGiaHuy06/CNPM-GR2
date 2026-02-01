import { Clock, CheckCircle2, ChefHat, Package, XCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface TimelineStep {
  status: string;
  label: string;
  time?: Date;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
}

interface OrderTimelineProps {
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  createdAt: Date;
  estimatedTime?: Date;
  completedAt?: Date;
}

export function OrderTimeline({ status, createdAt, estimatedTime, completedAt }: OrderTimelineProps) {
  const steps: TimelineStep[] = [
    {
      status: 'pending',
      label: 'Chờ xác nhận',
      time: createdAt,
      icon: <Package className="w-5 h-5" />,
      completed: true,
      active: status === 'pending',
    },
    {
      status: 'preparing',
      label: 'Đang nấu',
      time: status === 'preparing' || status === 'ready' || status === 'served' || status === 'completed' ? new Date(createdAt.getTime() + 2 * 60000) : undefined,
      icon: <ChefHat className="w-5 h-5" />,
      completed: status === 'preparing' || status === 'ready' || status === 'served' || status === 'completed',
      active: status === 'preparing',
    },
    {
      status: 'ready',
      label: 'Sẵn sàng',
      time: status === 'ready' || status === 'served' || status === 'completed' ? estimatedTime || new Date(createdAt.getTime() + 15 * 60000) : undefined,
      icon: <CheckCircle2 className="w-5 h-5" />,
      completed: status === 'ready' || status === 'served' || status === 'completed',
      active: status === 'ready',
    },
    {
      status: 'served',
      label: 'Đã phục vụ',
      time: status === 'served' || status === 'completed' ? completedAt : undefined,
      icon: <CheckCircle2 className="w-5 h-5" />,
      completed: status === 'served' || status === 'completed',
      active: status === 'served',
    },
  ];

  if (status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-3 text-red-700">
          <XCircle className="w-6 h-6" />
          <div>
            <p className="font-medium">Đơn hàng đã bị hủy</p>
            <p className="text-sm text-red-600">Hủy lúc: {createdAt.toLocaleTimeString('vi-VN')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {steps.map((step, index) => (
        <div key={step.status} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                step.completed
                  ? 'bg-green-500 text-white'
                  : step.active
                  ? 'bg-blue-500 text-white animate-pulse'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-12 ${
                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
          <div className="flex-1 pt-2">
            <div className="flex items-center justify-between">
              <p
                className={`font-medium ${
                  step.completed
                    ? 'text-gray-900'
                    : step.active
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
              {step.active && status !== 'completed' && (
                <Badge className="bg-blue-100 text-blue-700">Đang xử lý</Badge>
              )}
            </div>
            {step.time && (
              <p className="text-sm text-gray-500 mt-1">
                {step.time.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
            {step.active && !step.time && estimatedTime && status !== 'completed' && (
              <p className="text-sm text-blue-600 mt-1">
                Dự kiến: {estimatedTime.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}