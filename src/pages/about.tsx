/**
 * About 页面 - 遵循 Framix 设计系统规范
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopNavigation } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

/**
 * About 页面主组件
 */
export default function AboutPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const animationRef = React.useRef<number>();
  const lastUpdateTime = React.useRef<number>(0);

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
          className="mb-32 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* 标题部分 */}
          <div className="max-w-7xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-2">
                <span 
                  className="inline-block text-xs font-medium"
                  style={{ 
                    color: 'var(--color-text-primary)',
                    letterSpacing: '1px'
                  }}
                >
                  • SERVICES
                </span>
              </div>
              <div className="lg:col-span-10">
                <h2 className="text-5xl lg:text-6xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  What we do
                </h2>
              </div>
            </div>
          </div>

          {/* 服务列表容器 - 相对定位 */}
          <div className="max-w-7xl mx-auto relative"
               onMouseLeave={() => setHoveredService(null)}>
            
            {/* 悬浮图片覆盖层 - 绝对定位，在卡片之外 */}
            <AnimatePresence mode="popLayout">
              {activeService && services.find(s => s.id === activeService)?.largeImage && (
                <motion.div
                  className="absolute pointer-events-none"
                  key={activeService}
                  initial={{ opacity: 0, scale: 0.85, x: 60, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    y: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.9, 
                    x: 40,
                    y: -5
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                    mass: 0.8,
                    opacity: { 
                      type: "tween",
                      duration: 0.15,
                      ease: "easeOut" 
                    }
                  }}
                  style={{
                    top: `${services.findIndex(s => s.id === activeService) * 106}px`, // 根据卡片位置调整
                    right: '20px', // 在右侧显示
                    width: '520px',
                    height: '340px',
                    zIndex: 100,
                    willChange: 'transform, opacity'
                  }}
                >
                  <div 
                    className="w-full h-full p-3"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: '0 40px 120px rgba(0,0,0,0.18), 0 20px 40px rgba(0,0,0,0.1)',
                      transform: 'perspective(1000px) rotateY(1deg) rotateX(-0.5deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div 
                      className="w-full h-full overflow-hidden"
                      style={{ 
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: '#FAFAFA'
                      }}
                    >
                      <motion.img 
                        src={services.find(s => s.id === activeService)?.largeImage}
                        alt={services.find(s => s.id === activeService)?.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: 0.8, 
                          ease: [0.33, 1, 0.68, 1] 
                        }}
                      />
                    </div>
                  </div>
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
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredService(service.id)}
                      animate={{
                        y: isActive ? -4 : 0,
                        scale: isActive ? 1.005 : 1
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                        mass: 0.7
                      }}
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: isActive ? '0 25px 70px rgba(0,0,0,0.12), 0 10px 25px rgba(0,0,0,0.06)' : 'var(--elev-card)',
                        zIndex: isActive ? 20 : 1,
                        transformOrigin: 'center center',
                        willChange: 'transform, box-shadow'
                      }}
                    >
                      <div className="p-8 lg:p-10">
                        <div className="grid grid-cols-12 gap-8 items-center">
                          {/* 编号 */}
                          <div className="col-span-1">
                            <motion.span 
                              className="text-xl font-bold block" 
                              animate={{
                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                scale: isActive ? 1.1 : 1
                              }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                              }}
                            >
                              {service.id}
                            </motion.span>
                          </div>

                          {/* 标题 */}
                          <div className="col-span-6">
                            <motion.h3 
                              className="text-2xl lg:text-3xl font-semibold" 
                              animate={{
                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                x: isActive ? 4 : 0
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

                          {/* 描述文本 - 仅在hover时显示 */}
                          <div className="col-span-5">
                            <motion.div
                              animate={{
                                opacity: isActive ? 1 : 0,
                                x: isActive ? 0 : -15
                              }}
                              transition={{
                                opacity: { 
                                  duration: 0.2,
                                  ease: "easeOut"
                                },
                                x: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25
                                }
                              }}
                              style={{ 
                                maxWidth: '300px'
                              }}
                            >
                              <p 
                                className="text-base leading-relaxed"
                                style={{ 
                                  color: 'var(--color-text-muted)'
                                }}
                              >
                                {service.description.substring(0, 80)}...
                              </p>
                            </motion.div>
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