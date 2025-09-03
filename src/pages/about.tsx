/**
 * About 页面 - 遵循 Framix 设计系统规范
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { TopNavigation } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

/**
 * About 页面主组件
 */
export default function AboutPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const animationRef = React.useRef<number | null>(null);
  const lastUpdateTime = React.useRef<number>(0);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const floatingRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const titleRefs = React.useRef<Record<string, HTMLHeadingElement | null>>({});

  // Smooth y transform for the floating preview (use transform instead of top)
  const yMV = useMotionValue(0);
  const ySpring = useSpring(yMV, { stiffness: 260, damping: 28, mass: 0.7 });
  const rightMV = useMotionValue(0);
  const rightSpring = useSpring(rightMV, { stiffness: 300, damping: 30, mass: 0.8 });

  // Slightly varied tilt per hover for elegance
  const [tiltFrom, setTiltFrom] = useState<number>(-4.8);
  const [tiltTo, setTiltTo] = useState<number>(-4.2);

  // Compute elegant random tilts within readable bounds
  const computeTilts = React.useCallback(() => {
    // Start anywhere in [-5.6°, +5.6°]
    const start = (Math.random() * 11.2) - 5.6;
    // Slightly larger motion: ±1.0°..±1.8°
    const sign = Math.random() < 0.5 ? -1 : 1;
    const delta = (1.0 + Math.random() * 0.8) * sign; // ±1.0..±1.8
    let target = start + delta;
    // Clamp to readable bounds
    target = Math.max(-5.6, Math.min(5.6, target));
    // Guarantee minimal perceptible motion (≥0.6°)
    if (Math.abs(target - start) < 0.6) {
      target = start + 0.6 * (delta >= 0 ? 1 : -1);
      target = Math.max(-5.6, Math.min(5.6, target));
    }
    return { start, target };
  }, []);

  React.useEffect(() => {
    // 使用 requestAnimationFrame 实现超流畅动画
    const updateActiveService = () => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateTime.current;
      
      // 防抖处理，避免过于频繁的更新
      if (timeSinceLastUpdate > 50) {
        if (hoveredService !== activeService) {
          setActiveService(hoveredService);
          lastUpdateTime.current = now;
        }
      }
    };

    if (hoveredService !== activeService) {
      animationRef.current = requestAnimationFrame(updateActiveService);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredService, activeService]);

  // Recalculate floating preview position precisely
  // - Vertical: overlay center aligns to the title's center Y
  // - Horizontal: overlay center aligns to (rowRight - inset)
  React.useLayoutEffect(() => {
    if (!activeService || !listRef.current) return;
    const containerRect = listRef.current.getBoundingClientRect();
    const el = itemRefs.current[activeService];
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const titleEl = titleRefs.current[activeService];
    const titleRect = titleEl?.getBoundingClientRect();
    const fallbackH = 340; // match visual size below
    const overlayH = overlayRef.current?.getBoundingClientRect().height ?? fallbackH;
    // Prefer title center Y; fallback to row center
    const refCenterY = titleRect
      ? (titleRect.top + titleRect.height / 2)
      : (rect.top + rect.height / 2);
    const targetY = refCenterY - containerRect.top - overlayH / 2; // center-align
    yMV.set(targetY);

    // Horizontal alignment using overlay center anchoring at 5/6 of row width
    const ratio = 5 / 6; // 5/6 from the left
    const margin = 24; // container safe margin
    requestAnimationFrame(() => {
      const targetNode = floatingRef.current ?? overlayRef.current;
      if (!targetNode) return;
      const overlayRect = targetNode.getBoundingClientRect();
      const overlayW = overlayRect.width || 560;
      const rowLeftInContainer = rect.left - containerRect.left;
      const rowWidth = rect.width;
      const containerW = containerRect.width;
      // Overlay center X should be at rowLeft + rowWidth * ratio
      const anchorX = rowLeftInContainer + rowWidth * ratio;
      let desiredRight = containerW - anchorX - overlayW / 2; // right offset from container's right
      // Clamp so left >= margin and right >= margin
      const maxRight = containerW - overlayW - margin; // ensure left >= margin
      if (desiredRight > maxRight) desiredRight = maxRight;
      if (desiredRight < margin) desiredRight = margin;
      rightMV.set(desiredRight);
    });
  }, [activeService, yMV]);

  // Update position on resize/scroll to keep alignment perfect
  React.useEffect(() => {
    const handler = () => {
      if (!activeService) return;
      const containerRect = listRef.current?.getBoundingClientRect();
      const el = activeService ? itemRefs.current[activeService] : null;
      if (!containerRect || !el) return;
      const rect = el.getBoundingClientRect();
      const fallbackH = 340;
      const overlayH = overlayRef.current?.getBoundingClientRect().height ?? fallbackH;
      const centerY = rect.top + rect.height / 2 - containerRect.top;
      yMV.set(centerY - overlayH / 2);

      // Horizontal: recompute right so overlay center ≈ rowLeft + rowWidth * (5/6)
      const targetNode = floatingRef.current ?? overlayRef.current;
      if (targetNode) {
        const overlayRect = targetNode.getBoundingClientRect();
        const overlayW = overlayRect.width || 560;
        const margin = 24;
        const rowLeftInContainer = rect.left - containerRect.left;
        const rowWidth = rect.width;
        const containerW = containerRect.width;
        const ratio = 5 / 6;
        const anchorX = rowLeftInContainer + rowWidth * ratio;
        let desiredRight = containerW - anchorX - overlayW / 2;
        const maxRight = containerW - overlayW - margin;
        if (desiredRight > maxRight) desiredRight = maxRight;
        if (desiredRight < margin) desiredRight = margin;
        rightMV.set(desiredRight);
      }
    };
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, { passive: true } as any);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler);
    };
  }, [activeService, yMV]);

  // Re-pick tilt when active item changes
  React.useEffect(() => {
    if (!activeService) return;
    const { start, target } = computeTilts();
    setTiltFrom(start);
    setTiltTo(target);
  }, [activeService, computeTilts]);

  // remove duplicate tilt picker to avoid overriding computeTilts()

  const services = [
    {
      id: '01',
      title: 'Branding',
      description: 'Lorem ipsum dolor sit amet consectetur. Vitae vulputate massa tincidunt in vel mollis nisl. Vitae venenatis auctor euismod.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      largeImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=1200&h=800&fit=crop'
    },
    {
      id: '02',
      title: 'Web Design',
      description: 'Mattis quisque leo at blandit at sed sagittis consectetur. Massa morbi nec tortor lacinia nulla lacinia urna. Eros viverra gravida.',
      largeImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop'
    },
    {
      id: '03',
      title: 'Development',
      description: 'Sagittis velit at ipsum arcu ut feugiat et. Consectetur sed cursus ante at a molestie sit sed eget. Quam dui eget at tincidunt imperdiet sapien.',
      largeImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop'
    },
    {
      id: '04',
      title: 'Marketing',
      description: 'Commodo cum egestas eu nec id risus malesuada et eget. Orci nulla elit sed massa lectus. Id enim neque donec leo massa. Turpis pellentesque.',
      largeImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop'
    },
    {
      id: '05',
      title: 'App',
      description: 'Faucibus aenean ac nunc amet tempor elit facilisis. Arcu tincidunt velit faucibus mauris at consequat.',
      largeImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop'
    }
  ];

  const awards = [
    { year: '2025', title: 'Visionary Design Awards' },
    { year: '2025', title: 'The Visual Vanguard' },
    { year: '2025', title: 'Visual Storyteller' },
    { year: '2024', title: 'Dynamic Design Honors' },
    { year: '2024', title: 'Design Luminary' }
  ];

  const clients = [
    'Blog', 'OBSIDIAN', 'spectrum', 'CAMELIA', 'Eurydice'
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* 导航栏 */}
      <TopNavigation />

      {/* 主内容区域 */}
      <main className="px-8 lg:px-12 xl:px-16 pt-32 pb-24">
        {/* 页面标题 - 按照设计系统 6xl (160px) */}
        <motion.h1
          className="text-[10rem] font-extrabold leading-[1.1] mb-20"
          style={{ 
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: 'var(--color-text-primary)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT
        </motion.h1>

        {/* Hero 图片区域 */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="w-full overflow-hidden"
            style={{
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--elev-card)'
            }}
          >
            <div 
              className="w-full h-[500px] relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&h=500&fit=crop"
                alt="About Hero"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </div>
          </div>
        </motion.div>

        {/* ABOUT 标签 + 公司描述 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-2">
              <span 
                className="inline-block px-4 py-1 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: 'var(--color-text-primary)',
                  color: 'var(--color-badge-fg)',
                  letterSpacing: '1px'
                }}
              >
                • ABOUT
              </span>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
                Design team for startups that value speed and results.
                <span className="opacity-30"> We deliver design solutions at startup speed, adapting quickly to your needs.</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* 客户Logo */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 mb-32 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {clients.map((client, index) => (
            <span 
              key={client}
              className="text-2xl font-semibold opacity-30 hover:opacity-60 transition-opacity"
              style={{ 
                letterSpacing: index === 0 ? '0' : '0.5px',
                fontStyle: index === 0 ? 'italic' : 'normal'
              }}
            >
              {client}
            </span>
          ))}
        </motion.div>

        {/* 团队图片 */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div 
            className="overflow-hidden"
            style={{
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--elev-card)',
              aspectRatio: '4/3'
            }}
          >
            <div 
              className="w-full h-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Team 1"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </div>
          </div>
          <div 
            className="overflow-hidden"
            style={{
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--elev-card)',
              aspectRatio: '4/3'
            }}
          >
            <div 
              className="w-full h-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #A8E6CF 0%, #FF8B94 100%)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team 2"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </div>
          </div>
        </motion.div>

        {/* INTRO 部分 */}
        <motion.div 
          className="max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-2">
              <span 
                className="inline-block text-xs font-medium"
                style={{ 
                  color: 'var(--color-text-primary)',
                  letterSpacing: '1px'
                }}
              >
                • INTRO
              </span>
            </div>
            <div className="lg:col-span-9">
              <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--color-text-secondary)' }}>
                Ut scelerisque odio elit nibh. Et bibendum at sit ullamcorper sem condimentum gravida. Elit elit pharetra ridiculus molestie sed pellentesque. Pretium porttitor faucibus vitae massa leo. Sem et mi sit facilisi neque. Pharetra quis tincidunt ante malesuada congue faucibus tincidunt. Vitae viverra.
              </p>

              <h3 className="text-3xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                Pharetra venenatis integer
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Condimentum enim ut nunc, sed magna scelerisque quam nec. Ullamcorper ullamcorper sed erat enim. Pellentesque sit nibh faucibus nunc amet hendrerit rhoncus, phasellus eros. Tincidunt blandit sed sagittis, lectus massa ipsum cras vestibulum. Ac aliquet et, venenatis massa in.
              </p>

              <blockquote 
                className="pl-8 border-l-4 italic text-lg mb-8"
                style={{ 
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)'
                }}
              >
                Integer fermentum in tristique justo vel pharetra. Bibendum elit maecenas maecenas tellus dolor commodo dui. Aliquam faucibus tristique et sit. Euismod pellentesque.
              </blockquote>

              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                At consectetur ullamcorper in integer quam viverra. Pharetra venenatis integer in dignissim aenean vivamus non id. Ultrices pharetra tellus id sed aliquam faucibus. Tincidunt laoreet amet sodales etiam. Convallis tincidunt id nam auctor. Sit velit, molestie nunc.
              </p>
            </div>
          </div>
        </motion.div>

        {/* AWARDS 部分 */}
        <motion.div 
          className="max-w-5xl mx-auto mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-2">
              <span 
                className="inline-block text-xs font-medium"
                style={{ 
                  color: 'var(--color-text-primary)',
                  letterSpacing: '1px'
                }}
              >
                • AWARDS
              </span>
            </div>
            <div className="lg:col-span-9">
              <div className="space-y-8">
                {awards.map((award, index) => (
                  <motion.div 
                    key={index}
                    className={index === 3 ? 'pt-8 border-t' : ''}
                    style={{ borderColor: index === 3 ? 'var(--color-border)' : undefined }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    {index === 3 && (
                      <p className="text-sm font-medium mb-4" 
                         style={{ color: 'var(--color-text-muted)' }}>
                        {award.year}
                      </p>
                    )}
                    {index === 0 && (
                      <p className="text-sm font-medium mb-4" 
                         style={{ color: 'var(--color-text-muted)' }}>
                        {award.year}
                      </p>
                    )}
                    <h4 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {award.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* SERVICES 部分 */}
        <motion.div 
          className="mb-32 relative full-bleed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* 标题部分 - 左侧标签 + 居中大标题 */}
          <div className="mb-16 services-inner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-2">
                <span 
                  className="inline-block text-xs font-medium"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '1px' }}
                >
                  • SERVICES
                </span>
              </div>
              <div className="lg:col-span-10">
                <h2 className="w-full text-center" style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '72px', lineHeight: 1.1, letterSpacing: '-0.2px' }}>
                  What we do
                </h2>
              </div>
            </div>
          </div>

        {/* 服务列表容器 - 相对定位，左贴边 */}
        <div className="relative services-container services-inner"
             ref={listRef}
             onMouseLeave={() => setHoveredService(null)}>
            
            {/* 悬浮图片覆盖层 - 绝对定位，在卡片之外 */}
            <AnimatePresence mode="popLayout">
              {activeService && services.find(s => s.id === activeService)?.largeImage && (
                <motion.div
                  className="absolute pointer-events-none hidden lg:block"
                  key={activeService}
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    x: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.96,
                    x: 24
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                    opacity: { 
                      type: "tween",
                      duration: 0.18,
                      ease: "easeOut" 
                    }
                  }}
                  style={{
                    top: 0,
                    right: rightSpring as unknown as number,
                    width: 'clamp(600px, 46vw, 960px)',
                    zIndex: 100,
                    willChange: 'transform, opacity, right'
                  }}
                  ref={floatingRef}
                >
                  <motion.div
                    ref={overlayRef}
                    style={{ y: ySpring, width: '100%', aspectRatio: '16 / 9' }}
                  >
                    <motion.div 
                      className="w-full h-full"
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: '18px',
                        boxShadow: 'var(--service-preview-shadow)',
                        transformStyle: 'preserve-3d',
                        transformPerspective: 1600
                      }}
                      initial={{ rotateZ: tiltFrom, rotateY: 0.8, rotateX: 0.22, scale: 1.004 }}
                      animate={{ 
                        rotateZ: tiltTo,
                        rotateY: 1,
                        rotateX: 0.2,
                        scale: 1,
                        boxShadow: '0 32px 90px rgba(0,0,0,0.16), 0 12px 28px rgba(0,0,0,0.09)'
                      }}
                      transition={{
                        rotateZ: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                        rotateX: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                        rotateY: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                        scale:   { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                        boxShadow:{ duration: 0.4, ease: 'easeOut' }
                      }}
                    >
                      <div 
                        className="w-full h-full overflow-hidden"
                        style={{ 
                          borderRadius: '16px',
                          backgroundColor: '#F7F7F7',
                          border: 'var(--service-preview-border) solid rgba(255,255,255,0.98)'
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={activeService}
                            src={services.find(s => s.id === activeService)?.largeImage}
                            alt={services.find(s => s.id === activeService)?.title}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                          />
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 服务卡片列表 - 每个都有独立容器 */}
            <div className="space-y-4">
              {services.map((service, index) => {
                const isActive = activeService === service.id;
                
                return (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + index * 0.12,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <motion.div 
                      className={`relative cursor-pointer group service-row service-row-divider ${isActive ? 'service-row-active' : ''}`}
                      ref={(el) => { itemRefs.current[service.id] = el; }}
                      onMouseEnter={() => setHoveredService(service.id)}
                      animate={{
                        y: isActive ? -2 : 0,
                        scale: isActive ? 1.002 : 1
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 32,
                        mass: 0.7
                      }}
                      style={{
                        zIndex: isActive ? 20 : 1,
                        transformOrigin: 'center center',
                        willChange: 'transform, box-shadow'
                      }}
                    >
                      <div className="px-8 py-6 lg:px-10 lg:py-7">
                        <div className="grid grid-cols-12 gap-6 items-center">
                          {/* 编号 */}
                          <div className="col-span-1">
                            <motion.span 
                              className="text-xs lg:text-[12px] font-semibold tracking-[0.5px] block" 
                              style={{ color: 'rgba(0,0,0,0.45)' }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                              }}
                            >
                              {service.id}
                            </motion.span>
                          </div>

                          {/* 标题 */}
                          <div className="col-span-5 lg:col-span-3 xl:col-span-2">
                            <motion.h3 
                              className="text-2xl lg:text-3xl font-semibold tracking-tight" 
                              ref={(el) => { titleRefs.current[service.id] = el; }}
                              animate={{
                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                x: isActive ? 2 : 0
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                              }}
                            >
                              {service.title}
                            </motion.h3>
                          </div>

                          {/* 描述文本 - Always visible */}
                          <div className="col-span-6 lg:col-span-8 xl:col-span-9">
                            <div
                              style={{ maxWidth: 'clamp(360px, 34vw, 520px)' }}
                            >
                              <p 
                                className="text-[15.5px] lg:text-[16px] leading-[1.55] tracking-[0.01em]"
                                style={{ 
                                  color: 'var(--color-text-tertiary)',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2 as any,
                                  WebkitBoxOrient: 'vertical' as any,
                                  overflow: 'hidden'
                                }}
                              >
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
