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
        "w-full",
        "z-50",
        fixed && "fixed top-6 left-0 right-0",
        className
      )}
    >
      <div className="flex justify-center px-6">
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-full shadow-md px-5 py-2.5 gap-x-8" style={{ minWidth: '600px' }}>
          {/* Logo */}
          <div className="flex items-center space-x-1.5">
            <div className="w-6 h-6 bg-gray-900 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="text-[11px] font-semibold text-gray-900 tracking-wider">
              FRAMIX
            </span>
          </div>

          {/* 主导航 */}
          <nav className="flex items-center space-x-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-[11px] font-medium transition-colors duration-200 tracking-wider",
                  item.active
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 右侧按钮组 */}
          <div className="flex items-center space-x-2">
            {/* 邮箱联系 */}
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900 transition-colors px-2">
              <Mail className="w-3 h-3" />
              <span className="text-[11px] tracking-wider">EMAIL</span>
            </button>

            {/* 联系按钮 */}
            <button className="bg-gray-900 hover:bg-black text-white px-4 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-colors">
              CONTACT
            </button>
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