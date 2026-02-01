import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, Sparkles, ChefHat, ShoppingCart, Clock, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
  menuItems?: MenuItem[]; // Add menu items to display
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface AIChatbotProps {
  onAddToCart?: (item: MenuItem) => void;
}

export function AIChatbot({ onAddToCart }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là trợ lý AI của S2O. Tôi có thể giúp bạn:\n\n• Tư vấn món ăn phù hợp\n• Nhận order nhanh chóng\n• Trả lời câu hỏi về thực đơn\n\nBạn cần tôi giúp gì hôm nay?',
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        'Gợi ý món ăn cho tôi',
        'Món gì đang hot nhất?',
        'Thời gian chuẩn bị món là bao lâu?',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock menu items for AI to recommend
  const MENU_ITEMS: MenuItem[] = [
    { id: '1', name: 'Cá Hồi Nướng', price: 249000, description: 'Cá hồi Đại Tây Dương tươi với thảo mộc' },
    { id: '2', name: 'Bò Bít Tết', price: 349000, description: 'Thịt bò Úc thượng hạng nướng vừa chín' },
    { id: '3', name: 'Pizza Margherita', price: 189000, description: 'Pizza Ý truyền thống với phô mai Mozzarella' },
    { id: '4', name: 'Mì Ý Carbonara', price: 159000, description: 'Mì Ý với sốt kem, thịt xông khói' },
    { id: '5', name: 'Tiramisu', price: 89000, description: 'Món tráng miệng Ý cổ điển' },
    { id: '6', name: 'Salad Caesar', price: 129000, description: 'Caesar truyền thống với bánh mì nướng giòn' },
  ];

  const generateAIResponse = (userMessage: string): { text: string; suggestions?: string[]; menuItems?: MenuItem[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // Greeting responses
    if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        text: 'Xin chào! Rất vui được phục vụ bạn. Bạn muốn tôi giúp gì hôm nay?',
        suggestions: ['Gợi ý món ăn', 'Xem menu', 'Giá cả như thế nào?'],
      };
    }

    // Menu recommendation
    if (lowerMessage.includes('gợi ý') || lowerMessage.includes('nên ăn') || lowerMessage.includes('món gì')) {
      const recommended = [MENU_ITEMS[0], MENU_ITEMS[1], MENU_ITEMS[2]];
      return {
        text: `Dựa trên sở thích của nhiều khách hàng, tôi xin gợi ý:\n\n${recommended.map((item, idx) => 
          `${idx + 1}. ${item.name} - ${item.price.toLocaleString('vi-VN')}đ\n   ${item.description}`
        ).join('\n\n')}\n\nBạn muốn đặt món nào không?`,
        suggestions: ['Đặt Cá Hồi Nướng', 'Đặt Bò Bít Tết', 'Xem thêm món khác'],
        menuItems: recommended,
      };
    }

    // Hot/Popular dishes
    if (lowerMessage.includes('hot') || lowerMessage.includes('phổ biến') || lowerMessage.includes('bán chạy')) {
      return {
        text: `Top 3 món đang HOT nhất tuần này:\n\n1. 🔥 Bò Bít Tết - 349,000đ\n   (Đánh giá: 4.9⭐)\n\n2. 🔥 Cá Hồi Nướng - 249,000đ\n   (Đánh giá: 4.8⭐)\n\n3. 🔥 Pizza Margherita - 189,000đ\n   (Đánh giá: 4.7⭐)\n\nCác món này đều được khách hàng yêu thích!`,
        suggestions: ['Đặt ngay', 'Xem chi tiết', 'Gợi ý món khác'],
      };
    }

    // Vegetarian/healthy options
    if (lowerMessage.includes('chay') || lowerMessage.includes('healthy') || lowerMessage.includes('giảm cân')) {
      return {
        text: 'Tôi gợi ý những món ăn nhẹ và healthy:\n\n1. Salad Caesar - 129,000đ\n   Rau tươi, ít calo, giàu dinh dưỡng\n\n2. Pizza Margherita (Chay) - 189,000đ\n   Rau củ và phô mai tươi\n\nBạn có muốn đặt món nào không?',
        suggestions: ['Đặt Salad Caesar', 'Tìm món chay khác', 'Xem calories'],
      };
    }

    // Price inquiries
    if (lowerMessage.includes('giá') || lowerMessage.includes('bao nhiêu') || lowerMessage.includes('tiền')) {
      return {
        text: 'Giá các món ăn của chúng tôi:\n\n📍 Khai vị: 89,000đ - 129,000đ\n📍 Món chính: 159,000đ - 349,000đ\n📍 Tráng miệng: 89,000đ - 129,000đ\n\nTất cả món đều được chuẩn bị tươi mới với nguyên liệu cao cấp!',
        suggestions: ['Gợi ý món giá tốt', 'Xem combo tiết kiệm', 'Đặt món ngay'],
      };
    }

    // Preparation time
    if (lowerMessage.includes('thời gian') || lowerMessage.includes('bao lâu') || lowerMessage.includes('chờ')) {
      return {
        text: '⏱️ Thời gian chuẩn bị:\n\n• Khai vị: 10-15 phút\n• Món chính: 20-30 phút\n• Tráng miệng: 5-10 phút\n\nChúng tôi luôn cố gắng phục vụ nhanh nhất có thể mà vẫn đảm bảo chất lượng!',
        suggestions: ['Đặt món nhanh', 'Món gì nhanh nhất?', 'Xem menu'],
      };
    }

    // Order placement
    if (lowerMessage.includes('đặt')) {
      const dishName = lowerMessage.match(/(cá hồi|bò|pizza|mì|tiramisu|salad)/i)?.[0] || '';
      if (dishName) {
        const item = MENU_ITEMS.find(item => 
          item.name.toLowerCase().includes(dishName.toLowerCase())
        );
        if (item) {
          return {
            text: `✅ Tuyệt vời! Tôi sẽ thêm "${item.name}" vào giỏ hàng cho bạn.\n\nGiá: ${item.price.toLocaleString('vi-VN')}đ\nMô tả: ${item.description}\n\nBạn có muốn đặt thêm gì không?`,
            suggestions: ['Đặt thêm món khác', 'Xem giỏ hàng', 'Thanh toán'],
          };
        }
      }
      return {
        text: 'Bạn muốn đặt món gì? Hãy cho tôi biết tên món hoặc tôi có thể gợi ý cho bạn!',
        suggestions: ['Gợi ý món ăn', 'Xem menu', 'Món hot nhất'],
      };
    }

    // Allergen/ingredient questions
    if (lowerMessage.includes('dị ứng') || lowerMessage.includes('thành phần') || lowerMessage.includes('nguyên liệu')) {
      return {
        text: 'Tôi hiểu mối quan tâm của bạn về thành phần món ăn. Tất cả món của chúng tôi đều:\n\n✓ Sử dụng nguyên liệu tươi, không chất bảo quản\n✓ Có thể tùy chỉnh theo yêu cầu đặc biệt\n\nBạn có dị ứng với thành phần nào không? Tôi sẽ gợi ý món phù hợp!',
        suggestions: ['Tôi dị ứng hải sản', 'Tôi dị ứng sữa', 'Xem danh sách nguyên liệu'],
      };
    }

    // Spicy food
    if (lowerMessage.includes('cay') || lowerMessage.includes('spicy')) {
      return {
        text: 'Về độ cay, tất cả món của chúng tôi có thể điều chỉnh:\n\n🌶️ Không cay\n🌶️🌶️ Cay vừa\n🌶️🌶️🌶️ Cay nhiều\n\nBạn thích mức độ cay nào?',
        suggestions: ['Không cay', 'Cay vừa', 'Cay nhiều'],
      };
    }

    // Drinks
    if (lowerMessage.includes('đồ uống') || lowerMessage.includes('nước') || lowerMessage.includes('drink')) {
      return {
        text: '🥤 Đồ uống của chúng tôi:\n\n• Nước ép trái cây tươi\n• Trà thảo mộc\n• Cà phê Ý\n• Cocktail không cồn\n• Nước ngọt các loại\n\nGiá: 29,000đ - 89,000đ\n\nBạn muốn gọi gì?',
        suggestions: ['Nước ép cam', 'Cà phê', 'Trà đào'],
      };
    }

    // Promotions/discounts
    if (lowerMessage.includes('khuyến mãi') || lowerMessage.includes('giảm giá') || lowerMessage.includes('combo')) {
      return {
        text: '🎉 Ưu đãi đặc biệt hôm nay:\n\n• Giảm 20% cho đơn hàng trên 500,000đ\n• Combo 2 người: 450,000đ (tiết kiệm 100,000đ)\n• Miễn phí tráng miệng cho khách lần đầu\n\nÁp dụng đến hết tuần này!',
        suggestions: ['Đặt combo 2 người', 'Xem chi tiết ưu đãi', 'Đặt món ngay'],
      };
    }

    // Thank you
    if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thank')) {
      return {
        text: 'Rất vui được hỗ trợ bạn! Nếu cần thêm giúp đỡ, đừng ngần ngại hỏi tôi nhé! 😊',
        suggestions: ['Đặt món', 'Xem menu', 'Liên hệ nhân viên'],
      };
    }

    // Default response
    return {
      text: 'Tôi có thể giúp bạn với:\n\n• Gợi ý món ăn phù hợp với khẩu vị\n• Thông tin về giá cả và thời gian\n• Đặt món nhanh chóng\n• Trả lời câu hỏi về thực đơn\n\nBạn muốn hỏi gì cụ thể hơn không?',
      suggestions: ['Gợi ý món ăn', 'Xem giá', 'Thời gian phục vụ'],
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
        menuItems: aiResponse.menuItems,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Mở AI Chatbot"
      >
        <div className="relative">
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-ping opacity-75"></div>
          
          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
            AI
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              Trợ lý AI S2O
              <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45 -mt-1"></div>
            </div>
          </div>
        </div>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]">
          <Card className="flex flex-col h-full shadow-2xl overflow-hidden">
            {/* Header - Fixed */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Trợ Lý AI S2O</h3>
                    <p className="text-xs text-white/90">Luôn sẵn sàng hỗ trợ bạn</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0 flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Feature badges */}
              <div className="flex gap-2 mt-3 flex-wrap">
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  <ChefHat className="w-3 h-3 mr-1" />
                  Tư vấn món
                </Badge>
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Đặt món
                </Badge>
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  24/7
                </Badge>
              </div>
            </div>

            {/* Messages - Scrollable */}
            <ScrollArea className="flex-1 p-4 bg-gray-50 overflow-y-auto">
              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message.id}>
                    <div
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Quick suggestions */}
                    {message.suggestions && message.sender === 'ai' && (
                      <div className="flex flex-wrap gap-2 mt-2 ml-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-white border border-orange-200 text-orange-600 px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Menu items */}
                    {message.menuItems && message.sender === 'ai' && (
                      <div className="mt-3 ml-2 space-y-2">
                        {message.menuItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white border border-orange-200 rounded-xl p-3 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                <p className="text-orange-600 font-bold text-sm mt-1">
                                  {item.price.toLocaleString('vi-VN')}đ
                                </p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => onAddToCart?.(item)}
                                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white h-8 w-8 p-0 rounded-full flex-shrink-0"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Được hỗ trợ bởi AI - Câu trả lời có thể không chính xác 100%
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}