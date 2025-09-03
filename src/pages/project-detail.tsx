/**
 * 项目详情页面 - 遵循 Framix 设计系统规范
 * 
 * 布局结构：
 * - 左侧：项目信息卡片
 * - 右侧：大图展示
 * - 顶部：超大项目标题
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TopNavigation } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ArrowLeft } from 'lucide-react';

/**
 * 项目数据库
 */
const projectsData: Record<string, any> = {
  'alarm-clock': {
    title: 'ALARM CLOCK',
    year: '2025',
    direction: 'Creative Direction',
    summary: 'In ultrices accumsan volutpat malesuada gravida at. Elementum nunc ut in lorem tristique ipsum erat.',
    details: `Orci diam tempor placerat eu risus gravida. Pretium duis fringilla varius ullamcorper accumsan quis maecenas. Orci lobortis elit hendrerit diam mi. Nulla cursus volutpat ut faucibus ac blandit.

Vitae scelerisque ut adipiscing nisl. Suspendisse sit libero dictum a tristique erat facilisis. Porta a tortor massa nec id turpis. Egestas consectetur sed massa sed blandit. Gravida nunc vel tortor proin. Nisl lorem.`,
    images: [
      'https://images.unsplash.com/photo-1633432716606-90f86c8354ca?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=1200&h=900&fit=crop'
    ],
    bgColor: '#E8E8EA'
  },
  'tracker': {
    title: 'TRACKER',
    year: '2025',
    direction: 'Creative Direction',
    summary: 'In ultrices accumsan volutpat malesuada gravida at. Elementum nunc ut in lorem tristique ipsum erat.',
    details: `Orci diam tempor placerat eu risus gravida. Pretium duis fringilla varius ullamcorper accumsan quis maecenas. Orci lobortis elit hendrerit diam mi. Nulla cursus volutpat ut faucibus ac blandit.

Vitae scelerisque ut adipiscing nisl. Suspendisse sit libero dictum a tristique erat facilisis. Porta a tortor massa nec id turpis. Egestas consectetur sed massa sed blandit. Gravida nunc vel tortor proin. Nisl lorem.`,
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&h=900&fit=crop'
    ],
    bgColor: '#0070F0'
  },
  'speaker': {
    title: 'SPEAKER',
    year: '2025',
    direction: 'Product Design',
    summary: 'In ultrices accumsan volutpat malesuada gravida at. Elementum nunc ut in lorem tristique ipsum erat.',
    details: `Orci diam tempor placerat eu risus gravida. Pretium duis fringilla varius ullamcorper accumsan quis maecenas. Orci lobortis elit hendrerit diam mi. Nulla cursus volutpat ut faucibus ac blandit.

Vitae scelerisque ut adipiscing nisl. Suspendisse sit libero dictum a tristique erat facilisis. Porta a tortor massa nec id turpis. Egestas consectetur sed massa sed blandit. Gravida nunc vel tortor proin. Nisl lorem.`,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&h=900&fit=crop'
    ],
    bgColor: '#2D2D2D'
  },
  'headphones': {
    title: 'HEADPHONES',
    year: '2025',
    direction: 'Industrial Design',
    summary: 'In ultrices accumsan volutpat malesuada gravida at. Elementum nunc ut in lorem tristique ipsum erat.',
    details: `Orci diam tempor placerat eu risus gravida. Pretium duis fringilla varius ullamcorper accumsan quis maecenas. Orci lobortis elit hendrerit diam mi. Nulla cursus volutpat ut faucibus ac blandit.

Vitae scelerisque ut adipiscing nisl. Suspendisse sit libero dictum a tristique erat facilisis. Porta a tortor massa nec id turpis. Egestas consectetur sed massa sed blandit. Gravida nunc vel tortor proin. Nisl lorem.`,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=900&fit=crop'
    ],
    bgColor: '#F5E6D3'
  }
};

/**
 * 项目详情页面组件
 */
export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projectsData[projectId || ''];

  if (!project) {
    navigate('/work');
    return null;
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* 导航栏 */}
      <TopNavigation />

      {/* 返回按钮 */}
      <button
        onClick={() => navigate('/work')}
        className="fixed top-32 left-8 lg:left-12 xl:left-16 z-40 flex items-center space-x-2 text-sm font-medium transition-colors hover:opacity-70"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Work</span>
      </button>

      {/* 主内容区域 */}
      <main className="px-8 lg:px-12 xl:px-16 pt-48 pb-24">
        {/* 超大项目标题 - 按照设计系统 5xl-6xl (120-160px) */}
        <motion.h1
          className="text-[8.5rem] lg:text-[10rem] font-extrabold leading-[1.1] mb-16"
          style={{ 
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: 'var(--color-text-primary)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.title}
        </motion.h1>

        {/* 内容网格：左侧信息卡片 + 右侧大图 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 左侧信息卡片 - 占4列 */}
          <div className="lg:col-span-4 space-y-8">
            {/* 第一个卡片：Year, Direction, Summary */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="p-8"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--elev-card)'
                }}
              >
                {/* Year */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2" 
                     style={{ color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
                    Year
                  </p>
                  <p className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {project.year}
                  </p>
                </div>

                {/* Direction */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2" 
                     style={{ color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
                    Direction
                  </p>
                  <p className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {project.direction}
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <p className="text-sm font-medium mb-2" 
                     style={{ color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
                    Summary
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                    {project.summary}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 第二个卡片：Details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div 
                className="p-8"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--elev-card)'
                }}
              >
                <div>
                  <p className="text-sm font-medium mb-2" 
                     style={{ color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
                    Details
                  </p>
                  <p className="text-base leading-relaxed whitespace-pre-line" 
                     style={{ color: 'var(--color-text-secondary)' }}>
                    {project.details}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 右侧大图展示 - 占8列 */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* 主图片 - 带白色包边 */}
            <div 
              className="mb-8 p-3"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--elev-card)'
              }}
            >
              <div 
                className="overflow-hidden"
                style={{
                  backgroundColor: project.bgColor,
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
            </div>

            {/* 副图片（如果有）- 带白色包边 */}
            {project.images[1] && (
              <motion.div 
                className="p-3"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--elev-card)'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div 
                  className="overflow-hidden"
                  style={{
                    backgroundColor: project.bgColor,
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <img
                    src={project.images[1]}
                    alt={`${project.title} 2`}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}