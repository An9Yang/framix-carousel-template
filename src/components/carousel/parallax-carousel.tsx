/**
 * 垂直视差轮播组件
 * 
 * 重新设计为鸟瞰视角的垂直排列轮播系统：
 * 1. 卡片垂直排列，不是圆形3D旋转
 * 2. 监听滚动事件，切换激活的中心卡片
 * 3. 上下相邻卡片虚化处理
 */

import React, { useMemo } from 'react';
import { useScrollParallax } from '@/hooks/use-scroll-parallax';
import { calculateCardPosition, getScrollProgress, calculateCircularTrackConfig, type CarouselConfig } from '@/utils/carousel-calculations';
import { CarouselCard } from './carousel-card';
import { cn } from '@/lib/utils';

export interface CarouselItem {
  /** 卡片唯一标识 */
  id: string;
  /** 卡片标题 */
  title: string;
  /** 卡片副标题 */
  subtitle: string;
  /** 卡片描述 */
  description: string;
  /** 卡片图片URL */
  imageUrl?: string;
  /** 卡片链接 */
  href?: string;
}

export interface ParallaxCarouselProps {
  /** 轮播项目数据 */
  items: CarouselItem[];
  /** 自定义类名 */
  className?: string;
  /** 卡片间距（已废弃，现使用圆形轨迹） */
  cardSpacing?: number;
  /** 滚动触发开始位置 */
  startOffset?: number;
  /** 滚动触发结束位置 */
  endOffset?: number;
}

/**
 * 垂直视差轮播组件
 */
export function ParallaxCarousel({
  items,
  className,
  startOffset = 100,
  endOffset = 2000
}: ParallaxCarouselProps) {
  // 监听滚动状态
  const { scrollY, progress } = useScrollParallax({
    startOffset,
    endOffset,
    throttle: true,
    throttleDelay: 8
  });

  // 添加滚动状态检测和方向检测
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down');
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 检测滚动方向
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
      setIsScrolling(true);
      
      // 清除之前的timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // 设置新的timeout，300ms后认为滚动停止（增加缓冲时间）
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // 计算轮播进度
  const carouselProgress = useMemo(() => {
    return getScrollProgress(scrollY, startOffset, endOffset);
  }, [scrollY, startOffset, endOffset]);

  // 轮播配置 - 使用相对比例的圆形轨迹
  const config: CarouselConfig = useMemo(() => {
    // 获取容器尺寸（使用窗口尺寸作为近似值）
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const isMobile = containerWidth < 768;
    
    const circularConfig = calculateCircularTrackConfig(containerWidth, containerHeight, isMobile);
    
    return {
      totalCards: items.length,
      containerWidth,
      containerHeight,
      ...circularConfig
    };
  }, [items.length]);

  // 计算所有卡片位置
  const cardPositions = useMemo(() => {
    return items.map((_, index) => 
      calculateCardPosition(index, carouselProgress, config)
    );
  }, [items, carouselProgress, config]);

  // 当前激活的卡片索引
  const activeIndex = Math.round(carouselProgress * (items.length - 1));

  return (
    <div 
      className={cn(
        "relative w-full h-full overflow-hidden",
        "flex items-center justify-center",
        className
      )}
    >
      {/* 轮播容器 */}
      <div className="relative w-full h-full">
        {items.map((item, index) => {
          const position = cardPositions[index];
          const isActive = index === activeIndex;
          
          return (
            <CarouselCard
              key={item.id}
              item={item}
              position={position}
              index={index}
              isActive={isActive}
              isScrolling={isScrolling}
              scrollDirection={scrollDirection}
            />
          );
        })}
      </div>

      {/* 调试信息 (开发时可见) */}
    </div>
  );
}

/**
 * 获取默认的轮播项目数据
 */
export function getDefaultCarouselItems(): CarouselItem[] {
  return [
    {
      id: 'framix-studio-1',
      title: 'FRAMIX',
      subtitle: 'STUDIO',
      description: 'Creating brands and websites that stand out and grow',
      imageUrl: '/api/placeholder/400/300',
      href: '#project-1'
    },
    {
      id: 'framix-studio-2', 
      title: 'FRAMIX',
      subtitle: 'STUDIO',
      description: 'Home 2 - Portfolio showcase with modern design',
      imageUrl: '/api/placeholder/400/300',
      href: '#project-2'
    },
    {
      id: 'framix-studio-3',
      title: 'FRAMIX', 
      subtitle: 'STUDIO',
      description: 'Creative solutions for digital experiences',
      imageUrl: '/api/placeholder/400/300',
      href: '#project-3'
    },
    {
      id: 'framix-studio-4',
      title: 'FRAMIX',
      subtitle: 'STUDIO', 
      description: 'Innovative web development and branding',
      imageUrl: '/api/placeholder/400/300',
      href: '#project-4'
    },
    {
      id: 'framix-studio-5',
      title: 'FRAMIX',
      subtitle: 'STUDIO',
      description: 'Professional design services and consulting',
      imageUrl: '/api/placeholder/400/300', 
      href: '#project-5'
    }
  ];
}