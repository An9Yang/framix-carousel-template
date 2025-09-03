/**
 * Framix 垂直视差轮播主页
 *
 * 重新设计为完全固定的单页面应用，但保留滚动驱动能力。
 * 主要特色：固定的主标题 + 右侧垂直视差轮播效果。
 */
import React from 'react';
import { TopNavigation } from '@/components/layout/navbar';
import { HeroSection, MobileHeroSection } from '@/components/layout/hero-section';
import { CarouselSection, CarouselBackground } from '@/components/layout/carousel-section';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

/**
 * 主页组件
 */
export default function Home() {
  const isMobile = useIsMobile();
  
  // 修复：精确计算页面滚动高度，确保与轮播endOffset完全同步
  const totalCards = 5; // getDefaultCarouselItems().length
  const startOffset = 50;
  // 精确匹配carousel-section.tsx中的endOffset计算
  const baseScrollRange = window.innerHeight * 0.8;
  const cardScrollDistance = 400;
  const additionalRange = (totalCards - 1) * cardScrollDistance; // 修复：使用(totalCards-1)确保精确映射
  const endOffset = baseScrollRange + additionalRange;
  
  // 关键修复：页面总高度 = endOffset + 屏幕高度，确保可以滚动到endOffset
  const totalScrollHeight = endOffset + window.innerHeight;
  
  // 转换为vh单位以便CSS使用
  const scrollHeightVh = Math.ceil(totalScrollHeight / window.innerHeight * 100);

  return (
    <div className="relative min-h-screen bg-background">
      {/* 固定的主内容 */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* 页面背景装饰 */}
        <CarouselBackground />
        
        {/* 三段式顶部导航 */}
        <div className="pointer-events-auto">
          <TopNavigation />
        </div>
        
        {/* 主内容区域 - 完全固定，不滚动 */}
        <main className="relative w-full h-full">
          {/* 英雄区域 - 固定定位的主标题 */}
          <div className="pointer-events-auto">
            {isMobile ? (
              <MobileHeroSection />
            ) : (
              <HeroSection />
            )}
          </div>
          
          {/* 垂直轮播区域 - 固定在右侧 */}
          <div className="pointer-events-auto">
            <CarouselSection />
          </div>
        </main>
      </div>
      
      {/* 可滚动的驱动区域 - 动态计算高度 */}
      <div 
        className="relative z-0"
        style={{ height: `${scrollHeightVh}vh` }}
      >
        {/* 透明内容，用于创建可滚动区域 */}
        <div className="w-full h-full opacity-0 pointer-events-none">
          {/* 动态生成分段内容 */}
          {Array.from({ length: Math.ceil(scrollHeightVh / 100) }, (_, i) => (
            <div key={i} className="h-screen"></div>
          ))}
        </div>
      </div>
    </div>
  );
}