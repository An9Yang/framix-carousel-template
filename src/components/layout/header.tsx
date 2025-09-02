/**
 * 网站头部导航组件
 * 
 * 该组件提供固定在页面顶部的导航栏，包含:
 * 1. Logo和品牌标识
 * 2. 主导航菜单
 * 3. 联系方式和行动按钮
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  /** 自定义类名 */
  className?: string;
  /** 是否为固定定位 */
  fixed?: boolean;
}

/**
 * 网站头部导航组件
 */
export function Header({ className, fixed = true }: HeaderProps) {
  const navItems = [
    { label: 'HOME', href: '#', active: true },
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'BLOG', href: '#blog' },
  ];

  return (
    <header
      className={cn(
        "w-full bg-transparent backdrop-blur-sm",
        "border-b border-gray-200/20",
        "z-50",
        fixed && "fixed top-0",
        className
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-sm font-medium text-gray-900 hidden sm:block">
              FRAMIX
            </span>
          </div>

          {/* 主导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  item.active
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 右侧按钮组 */}
          <div className="flex items-center space-x-4">
            {/* 邮箱联系 */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">EMAIL</span>
            </Button>

            {/* 联系按钮 */}
            <Button
              size="sm"
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-medium"
            >
              CONTACT
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * 简化版头部组件（移动端）
 */
export function MobileHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "w-full bg-white/95 backdrop-blur-sm",
        "border-b border-gray-200/50",
        "fixed top-0 z-50",
        className
      )}
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              FRAMIX
            </span>
          </div>

          {/* 菜单按钮 */}
          <Button variant="ghost" size="sm" className="p-2">
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600" />
              <div className="w-full h-0.5 bg-gray-600" />
              <div className="w-full h-0.5 bg-gray-600" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}