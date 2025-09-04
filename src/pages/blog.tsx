/**
 * Blog 页面 - 遵循 Framix 设计系统规范
 * 版式接近 Work 页，但以超大卡片为主，配元数据条
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TopNavigation } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Post = {
  id: string;
  title: string;
  date: string;
  image: string;
};

const posts: Post[] = [
  {
    id: 'post-1',
    title: 'Blog Post 1',
    date: 'Aug 16, 2025',
    image:
      'https://images.unsplash.com/photo-1606925797300-0c568c61c35f?w=1600&h=1200&fit=crop',
  },
  {
    id: 'post-2',
    title: 'Blog Post 2',
    date: 'Aug 16, 2025',
    image:
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1600&h=1200&fit=crop',
  },
  {
    id: 'post-3',
    title: 'Blog Post 3',
    date: 'Aug 16, 2025',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=1200&fit=crop',
  },
  {
    id: 'post-4',
    title: 'Blog Post 4',
    date: 'Aug 16, 2025',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&h=1200&fit=crop',
  },
];

function BlogCard({ post, index }: { post: Post; index: number }) {
  // 复用 Work 页的卡片形态：大图卡片 + 底部信息（同一容器内部）
  const navigate = useNavigate();
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div
        className="transition-all duration-250"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--elev-card)',
          overflow: 'hidden',
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
        {/* 图片区域（与 Work 相同） */}
        <div className="p-3 relative">
          <div
            className="overflow-hidden relative"
            style={{ borderRadius: 'var(--radius-md)', aspectRatio: '4/3' }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
            {/* 与 Work 一致的角标（可保留） */}
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
              >
                <ArrowUpRight className="w-7 h-7" style={{ color: '#000' }} />
              </div>
            </div>
          </div>
        </div>
        {/* 信息区（用 Work 的信息区，但换成博客标题+日期） */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {post.title}
            </h3>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {post.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <TopNavigation />
      <main className="px-8 lg:px-12 xl:px-16 pt-32 pb-24">
        {/* 巨型标题 BLOG（靠左但与导航对齐） */}
        <motion.h1
          className="text-[10rem] font-extrabold leading-[1.05] mb-16"
          style={{ letterSpacing: '-0.5px', color: 'var(--color-text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          BLOG
        </motion.h1>

        {/* 两列超大网格卡片 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {posts.map((p, i) => (
            <BlogCard key={p.id} post={p} index={i} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
