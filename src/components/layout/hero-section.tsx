/**
 * 主英雄区域组件
 * 
 * 该组件负责渲染页面的主标题区域，包括：
 * 1. 大标题文字（FRAMIX TEMPLATE）
 * 2. 副标题和描述
 * 3. 滚动提示
 * 4. 固定定位效果（不随滚动移动）
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  /** 自定义类名 */
  className?: string;
}

/**
 * 主英雄区域组件
 */
export function HeroSection({ className }: HeroSectionProps) {
  return (
    <>
      {/* 主标题区域 - 左上角定位 */}
      <section
        className={cn(
          "fixed top-32 left-8 lg:left-12 xl:left-16",
          "pointer-events-none", // 允许点击穿透到轮播
          className
        )}
      >
        {/* 主标题 - 按照设计系统 6xl (160px) */}
        <motion.div className="space-y-4">
          <motion.h1
            className={cn(
              "text-[10rem]", // 160px = 10rem
              "font-extrabold",
              "leading-[1.1]",
              "select-none"
            )}
            style={{ 
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: 'var(--color-text-primary)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            FRAMIX
          </motion.h1>
          
          <motion.h1
            className={cn(
              "text-[10rem]", // 160px = 10rem
              "font-extrabold",
              "leading-[1.1]",
              "select-none"
            )}
            style={{ 
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: 'var(--color-text-primary)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            TEMPLATE
          </motion.h1>
        </motion.div>
      </section>

      {/* 副标题和滚动提示 - 固定在左下角 */}
      <div className="fixed bottom-16 left-8 lg:left-12 xl:left-16 z-40 pointer-events-none">
        {/* 副标题和描述区域 */}
        <motion.div
          className="space-y-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Framix - Portfolio & Agency
          </h2>
          
          <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
            Website Template
          </p>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center" 
               style={{ borderColor: 'var(--color-border)' }}>
            <ChevronDown className="w-6 h-6 animate-bounce" style={{ color: 'var(--color-text-muted)' }} />
          </div>
          <span className="text-sm font-medium uppercase" 
                style={{ color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
            SCROLL DOWN
          </span>
        </motion.div>
      </div>
    </>
  );
}

/**
 * 移动端英雄区域组件
 */
export function MobileHeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "min-h-screen flex flex-col justify-center",
        "px-4 py-16",
        "pointer-events-none",
        className
      )}
    >
      <div className="text-center space-y-8">
        {/* 主标题 */}
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 leading-[0.9]">
            FRAMIX
          </h1>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 leading-[0.9]">
            TEMPLATE
          </h1>
        </motion.div>

        {/* 副标题 */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-base font-semibold text-gray-800">
            Framix - Portfolio & Agency
          </h2>
          <p className="text-sm text-gray-600">
            Website Template
          </p>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          className="flex flex-col items-center space-y-2 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce" />
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            SCROLL TO EXPLORE
          </span>
        </motion.div>
      </div>
    </section>
  );
}