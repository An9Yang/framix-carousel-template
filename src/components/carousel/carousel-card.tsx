/**
 * 轮播卡片组件 - 迷你网站样式
 * 
 * 重新设计为参考图中的"迷你网站"样式：
 * 1. 更大的卡片尺寸，增强视觉冲击
 * 2. 顶部迷你导航栏
 * 3. 中心大型"FRAMIX STUDIO"艺术字
 * 4. 底部描述文字和滚动提示
 * 5. 精致的边框和阴影效果
 */

import React from 'react';
import { motion } from 'framer-motion';
import { generateTransform, generateFilter, type CarouselCardPosition } from '@/utils/carousel-calculations';
import type { CarouselItem } from './parallax-carousel';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Mail, ChevronDown } from 'lucide-react';

export interface CarouselCardProps {
  /** 卡片数据 */
  item: CarouselItem;
  /** 位置信息 */
  position: CarouselCardPosition;
  /** 卡片索引 */
  index: number;
  /** 是否为活跃状态 */
  isActive: boolean;
  /** 是否正在滚动 */
  isScrolling?: boolean;
  /** 滚动方向 */
  scrollDirection?: 'up' | 'down';
  /** 点击回调 */
  onClick?: (item: CarouselItem) => void;
}

/**
 * 迷你网站导航栏组件
 */
function MiniNavbar() {
  const navItems = ['HOME', 'WORK', 'ABOUT', 'BLOG'];
  
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      {/* 左侧 Logo */}
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
          <span className="text-white font-bold text-[8px]">F</span>
        </div>
        <span className="text-[10px] font-medium text-gray-900">FRAMIX</span>
      </div>
      
      {/* 中间导航 */}
      <div className="hidden md:flex items-center space-x-3">
        {navItems.map((item, index) => (
          <span 
            key={item}
            className={cn(
              "text-[9px] font-medium",
              index === 0 ? "text-gray-900" : "text-gray-500"
            )}
          >
            {item}
          </span>
        ))}
      </div>
      
      {/* 右侧按钮 */}
      <div className="flex items-center space-x-1">
        <div className="hidden sm:flex items-center space-x-1">
          <Mail className="w-2 h-2 text-gray-600" />
          <span className="text-[8px] text-gray-600">EMAIL</span>
        </div>
        <div className="w-8 h-3 bg-black rounded-sm flex items-center justify-center">
          <span className="text-white text-[7px] font-medium">CONTACT</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 轮播卡片组件
 */
export function CarouselCard({
  item,
  position,
  index,
  isActive,
  isScrolling = false,
  scrollDirection = 'down',
  onClick
}: CarouselCardProps) {
  // 添加鼠标悬停状态
  const [isHovered, setIsHovered] = React.useState(false);
  // 使用状态来平滑过渡倾斜角度
  const [currentTiltX, setCurrentTiltX] = React.useState(0);
  const [currentTiltY, setCurrentTiltY] = React.useState(0);
  
  React.useEffect(() => {
    if (isScrolling) {
      // 滚动时的倾斜角度（更微妙的效果）
      const targetTiltY = isActive ? -8 : -12; // 减小Y轴旋转
      const targetTiltX = scrollDirection === 'down' 
        ? (isActive ? -3 : -5)  // 向前倾斜（更微妙）
        : (isActive ? 3 : 5);    // 向后倾斜（更微妙）
      
      setCurrentTiltY(targetTiltY);
      setCurrentTiltX(targetTiltX);
    } else {
      // 静止时缓慢恢复到0
      setCurrentTiltY(0);
      setCurrentTiltX(0);
    }
  }, [isScrolling, scrollDirection, isActive]);
  
  // 根据当前倾斜状态生成3D变换
  const generate3DTransform = () => {
    return `perspective(1500px) rotateY(${currentTiltY}deg) rotateX(${currentTiltX}deg) scale(${position.scale}) translateZ(${position.z}px)`;
  };

  // 悬停时的缩放（更微妙）
  const hoverScale = isHovered ? 1.03 : 1;

  return (
    <motion.div
      className={cn(
        "absolute",
        "w-[44vw] h-[44vh]", // 整体缩小到44vw x 44vh
        "pointer-events-auto cursor-pointer",
        "transform-gpu",
        "will-change-transform"
      )}
      style={{
        filter: generateFilter(position),
        zIndex: isActive ? 20 : Math.max(1, 10 - Math.abs(position.x / 100)),
      }}
      initial={false}
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        opacity: position.opacity,
        transform: `translate(-50%, -50%) ${generate3DTransform()} scale(${hoverScale})`,
      }}
      transition={{
        left: {
          duration: 0.6,
          ease: [0.25, 0.25, 0.25, 1],
        },
        top: {
          duration: 0.6,
          ease: [0.25, 0.25, 0.25, 1],
        },
        opacity: {
          duration: 0.3,
          ease: "easeInOut",
        },
        transform: {
          type: "spring",
          stiffness: isScrolling ? 300 : 100,  // 滚动时快速响应，停止时缓慢
          damping: isScrolling ? 30 : 20,      // 增加阻尼使动画更平滑
          mass: 1,
        },
      }}
      onClick={() => onClick?.(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={cn(
          "relative w-full h-full overflow-hidden",
          "bg-white border border-gray-200",
          isActive 
            ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-gray-300" 
            : "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]",
          "transition-all duration-300",
          "rounded-lg"
        )}
      >
        <CardContent className="relative p-0 h-full flex flex-col">
          {/* 顶部迷你导航栏 */}
          <MiniNavbar />
          
          {/* 主内容区域 */}
          <div className="flex-1 flex flex-col justify-center items-center px-12 py-8 relative overflow-hidden">
            {/* 背景图片 */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url('/api/placeholder/600/400')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%)'
              }}
            />
            {/* 渐变叠加 */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/95 to-white/95" />
            {/* 中心大标题 */}
            <div className="text-center space-y-1 mb-8 relative z-10">
              <motion.h2
                className={cn(
                  "font-black tracking-tighter transition-all duration-300",
                  isActive ? "text-4xl text-gray-900" : "text-3xl text-gray-700"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                FRAMIX
              </motion.h2>
              <motion.h3
                className={cn(
                  "font-black tracking-tighter transition-all duration-300",
                  isActive ? "text-4xl text-gray-900" : "text-3xl text-gray-700"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                STUDIO
              </motion.h3>
            </div>
            
            {/* 描述文字 */}
            <motion.div
              className="text-center space-y-2 mb-6 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive ? "text-gray-700" : "text-gray-600"
              )}>
                Creating <span className="font-semibold">brands</span> and <span className="font-semibold">websites</span>
              </p>
              <p className={cn(
                "text-xs transition-all duration-300",
                isActive ? "text-gray-600" : "text-gray-500"
              )}>
                that stand out and grow
              </p>
            </motion.div>
            
            {/* 底部滚动提示 */}
            <motion.div
              className="flex flex-col items-center space-y-1 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ChevronDown className={cn(
                "w-3 h-3 transition-all duration-300",
                isActive ? "text-gray-600" : "text-gray-400"
              )} />
              <span className={cn(
                "text-[9px] font-medium uppercase tracking-wide transition-all duration-300",
                isActive ? "text-gray-500" : "text-gray-400"
              )}>
                SCROLL DOWN
              </span>
            </motion.div>
          </div>
          
          {/* 装饰元素 */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-30"></div>
          <div className="absolute bottom-6 left-4 w-1 h-1 bg-purple-500 rounded-full opacity-40"></div>
          <div className="absolute bottom-4 right-6 w-1.5 h-1.5 bg-green-500 rounded-full opacity-35"></div>
          
          {/* 背景网格 */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="w-full h-full bg-grid-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * 简化版卡片组件（用于性能优化）
 */
export function SimpleCarouselCard({
  item,
  position,
  index,
  isActive
}: Omit<CarouselCardProps, 'onClick'>) {
  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        "w-[44vw] h-[44vh]",
        "pointer-events-none"
      )}
      style={{
        transform: generateTransform(position),
        opacity: position.opacity,
        filter: generateFilter(position),
        zIndex: isActive ? 20 : 10,
      }}
    >
      <div className={cn(
        "w-full h-full rounded-lg border bg-white",
        "flex items-center justify-center",
        "shadow-lg"
      )}>
        <div className="text-center">
          <h3 className="text-3xl font-black text-gray-900">
            FRAMIX
          </h3>
          <h4 className="text-3xl font-black text-gray-900">
            STUDIO
          </h4>
        </div>
      </div>
    </div>
  );
}