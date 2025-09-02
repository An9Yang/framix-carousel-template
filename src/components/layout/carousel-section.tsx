/**
 * 轮播区域布局组件
 *
 * 该组件负责管理垂直视差轮播的容器和布局，包括：
 * 1. 轮播容器的定位和尺寸
 * 2. 响应式布局适配
 * 3. 与其他页面元素的协调
 */
import React from 'react';
import { ParallaxCarousel, getDefaultCarouselItems } from '@/components/carousel/parallax-carousel';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export interface CarouselSectionProps {
  /** 自定义类名 */
  className?: string;
}

/**
 * 轮播区域布局组件
 */
export function CarouselSection({ className }: CarouselSectionProps) {
  const isMobile = useIsMobile();
  const carouselItems = getDefaultCarouselItems();
  
  // 修复：精确计算滚动范围，确保最后一个卡片能够完全居中
  const totalCards = carouselItems.length;
  const baseScrollRange = window.innerHeight * 0.8;
  // 关键修复：基于实际需要的角度变化计算滚动距离
  // 对于5张卡片，需要4个间隔的滚动距离让最后一张完全居中
  const cardScrollDistance = 400;
  const additionalRange = (totalCards - 1) * cardScrollDistance; // 修复：使用(totalCards-1)确保精确映射
  const endOffset = baseScrollRange + additionalRange;

  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full h-full",
        "flex items-center justify-end",
        "pointer-events-none", // 基础容器不拦截事件
        className
      )}
    >
      {/* 轮播容器 */}
      <div className={cn(
        "relative",
        "pointer-events-auto", // 轮播本身可以交互
        // 响应式尺寸 - 调整为占据屏幕右侧70%
        isMobile
          ? "w-full h-full"
          : "w-[70vw] h-full"
      )}>
        <ParallaxCarousel
          items={carouselItems}
          startOffset={50}
          endOffset={endOffset}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

/**
 * 轮播背景装饰组件
 */
export function CarouselBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-30" />
      
      {/* 渐变叠加 */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
      
      {/* 装饰性几何形状 */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl" />
      <div className="absolute bottom-1/3 right-1/6 w-24 h-24 bg-purple-500/5 rounded-full blur-lg" />
      <div className="absolute top-2/3 right-1/3 w-16 h-16 bg-green-500/5 rounded-full blur-md" />
    </div>
  );
}

/**
 * 轮播进度指示器
 */
export function CarouselProgressIndicator({
  progress,
  className
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div className={cn(
      "fixed right-8 top-1/2 transform -translate-y-1/2",
      "w-1 h-32 bg-gray-200 rounded-full overflow-hidden",
      "pointer-events-none",
      className
    )}>
      <div
        className="w-full bg-gray-900 transition-all duration-300 ease-out"
        style={{
          height: `${progress * 100}%`,
          transform: 'translateY(0)'
        }}
      />
    </div>
  );
}