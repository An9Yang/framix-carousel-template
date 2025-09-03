/**
 * 独立的导航栏、Logo和操作按钮组件
 * 
 * 三个独立部分：
 * 1. Logo - 左上角
 * 2. 导航浮岛 - 顶部中间
 * 3. 操作按钮 - 右上角
 */

import React from 'react';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Logo组件 - 按照设计系统规范
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="w-9 h-9 rounded flex items-center justify-center"
           style={{ backgroundColor: 'var(--color-cta-black)' }}>
        <span className="font-bold text-base" style={{ color: 'var(--color-badge-fg)' }}>F</span>
      </div>
      <span className="text-sm font-bold tracking-wider"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '0.5px' }}>
        FRAMIX
      </span>
    </div>
  );
}

/**
 * 导航栏 - 按照设计系统规范（浅灰 pill 背景）
 */
export function NavBar({ className }: { className?: string }) {
  const navItems = [
    { label: 'HOME', href: '/', active: window.location.pathname === '/' },
    { label: 'WORK', href: '/work', active: window.location.pathname === '/work' },
    { label: 'ABOUT', href: '/about', active: window.location.pathname === '/about' },
    { label: 'BLOG', href: '/blog', active: window.location.pathname === '/blog' },
  ];

  return (
    <nav className={cn("px-4 py-2 rounded-full", className)}
         style={{ 
           backgroundColor: '#F7F7F7',
           boxShadow: 'var(--elev-nav)'
         }}>
      <div className="flex items-center space-x-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-sm font-medium transition-colors duration-200 px-3 py-1"
            style={{ 
              color: item.active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              letterSpacing: '0.5px'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/**
 * 操作按钮组 - 按照设计系统规范
 */
export function ActionButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      {/* 邮箱联系 - Secondary Button */}
      <button className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full border-2 transition-all duration-250 hover:-translate-y-0.5"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-text-muted)',
                color: 'var(--color-text-muted)',
                boxShadow: 'var(--elev-nav)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--elev-hover)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--elev-nav)';
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}>
        <Mail className="w-4 h-4" />
        <span className="text-sm font-semibold" style={{ letterSpacing: '0.5px' }}>EMAIL</span>
      </button>

      {/* 联系按钮 - Primary Button (稍微缩小以平衡视觉效果) */}
      <button className="px-5 py-[9px] rounded-full transition-all duration-250 hover:-translate-y-0.5"
              style={{ 
                backgroundColor: 'var(--color-cta-black)',
                color: 'var(--color-badge-fg)',
                boxShadow: 'var(--elev-nav)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--elev-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--elev-nav)'}>
        <span className="text-sm font-semibold" style={{ letterSpacing: '0.5px' }}>CONTACT</span>
      </button>
    </div>
  );
}

/**
 * 组合的顶部导航组件 - Logo和导航在左侧，操作按钮在右侧
 */
export function TopNavigation() {
  return (
    <header className="fixed top-8 left-0 right-0 z-50 px-8 lg:px-12 xl:px-16">
      <div className="flex items-center justify-between">
        {/* 左侧：Logo + 导航栏作为一个整体 */}
        <div className="flex items-center space-x-12">
          <Logo />
          <NavBar />
        </div>
        
        {/* 右侧：操作按钮 */}
        <ActionButtons />
      </div>
    </header>
  );
}