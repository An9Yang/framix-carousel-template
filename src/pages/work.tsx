/**
 * Work 页面 - 展示项目作品集
 * 遵循 Framix 设计系统规范
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TopNavigation } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ArrowUpRight } from 'lucide-react';

/**
 * 项目数据
 */
const projects = [
  {
    id: 'alarm-clock',
    title: 'Alarm clock',
    subtitle: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1633432716606-90f86c8354ca?w=800&h=600&fit=crop',
    bgColor: '#E8E8EA',
  },
  {
    id: 'tracker',
    title: 'Tracker',
    subtitle: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=600&fit=crop',
    bgColor: '#0070F0',
  },
  {
    id: 'speaker',
    title: 'Speaker',
    subtitle: 'Product Design',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop',
    bgColor: '#2D2D2D',
  },
  {
    id: 'headphones',
    title: 'Headphones',
    subtitle: 'Industrial Design',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    bgColor: '#F5E6D3',
  },
];

/**
 * 项目卡片组件
 */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const navigate = useNavigate();
  
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* 整个卡片容器 - 白色背景，圆角，阴影 */}
      <div
        className="transition-all duration-250"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--elev-card)',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = 'var(--elev-hover)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'var(--elev-card)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* 图片容器 - 带内边距形成包边效果 */}
        <div className="p-3 relative">
          <div 
            className="overflow-hidden relative"
            style={{ 
              borderRadius: 'var(--radius-md)',
              backgroundColor: project.bgColor,
              aspectRatio: '4/3'
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
            
            {/* 悬浮时显示的跳转图标 */}
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <ArrowUpRight className="w-7 h-7" style={{ color: '#000' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 项目信息 - 在容器内部 */}
        <div className="px-6 pb-6">
          <h3 
            className="text-xl font-semibold mb-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {project.title}
          </h3>
          <p 
            className="text-base"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {project.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Work 页面主组件
 */
export default function WorkPage() {
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
          WORK
        </motion.h1>

        {/* 项目网格 - 按照设计系统 8.5 ProjectGrid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}