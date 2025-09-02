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
    <section
      className={cn(
        "fixed inset-0 flex flex-col justify-center",
        "px-6 md:px-12 lg:px-16",
        "pointer-events-none", // 允许点击穿透到轮播
        className
      )}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 左侧主标题区域 */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 主标题 */}
            <div className="space-y-0">
              <motion.h1
                className={cn(
                  "text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]",
                  "font-black tracking-tighter",
                  "text-gray-800 leading-[0.85]",
                  "select-none"
                )}
                style={{ fontWeight: 900 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                FRAMIX
              </motion.h1>
              
              <motion.h1
                className={cn(
                  "text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]",
                  "font-black tracking-tighter",
                  "text-gray-800 leading-[0.85]",
                  "select-none"
                )}
                style={{ fontWeight: 900 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                TEMPLATE
              </motion.h1>
            </div>

            {/* 副标题和描述区域 */}
            <motion.div
              className="space-y-1 max-w-lg mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-xl md:text-2xl font-medium text-gray-700 leading-tight">
                Framix - Portfolio & Agency
              </h2>
              
              <p className="text-lg text-gray-500 leading-tight">
                Website Template
              </p>
            </motion.div>

            {/* 滚动提示 */}
            <motion.div
              className="flex items-center space-x-3 pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center">
                <ChevronDown className="w-4 h-4 text-gray-600 animate-bounce" />
              </div>
              <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                SCROLL DOWN
              </span>
            </motion.div>
          </motion.div>

          {/* 右侧为轮播预留空间 */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
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