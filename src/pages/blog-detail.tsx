/**
 * Blog Detail 页面 - 遵循 Framix 设计系统规范
 * 路由：/post/:postId
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TopNavigation } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

type Detail = {
  id: string;
  title: string;
  date: string;
  hero: string;
  body: Array<{ type: 'p' | 'h2' | 'img' | 'quote'; content?: string; src?: string }>;
};

const details: Detail[] = [
  {
    id: 'post-1',
    title: 'BLOG POST 1',
    date: 'Aug 16, 2025',
    hero: 'https://images.unsplash.com/photo-1606925797300-0c568c61c35f?w=2000&h=1200&fit=crop',
    body: [
      { type: 'p', content: 'Nulla sed faucibus sit enim diam etiam porttitor augue vestibulum. Fermentum mi diam vulputate massa ipsum elit interdum. Amet morbi in in eu nullam. A eget augue est integer morbi scelerisque a sed porttitor.' },
      { type: 'p', content: 'Pellentesque justo fringilla nisl accumsan ut at amet cursus. Risus et aenean arcu ultrices sed ornare feugiat. Fusce nisl sed egestas in euismod pharetra at.' },
      { type: 'h2', content: 'Erat placerat pellentesque' },
      { type: 'p', content: 'Ut scelerisque odio elit nibh. Et bibendum at sit ullamcorper sem condimentum gravida. Elit elit pharetra ridiculus molestie sed pellentesque. Pretium porttitor faucibus vitae massa leo.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1618389132475-8cc0c6b2d81d?w=1600&h=1000&fit=crop' },
      { type: 'quote', content: 'Integer fermentum in tristique justo vel pharetra. Bibendum elit maecenas tellus dolor commodo dui.' },
      { type: 'p', content: 'At consectetur ullamcorper in integer quam viverra. Pharetra venenatis integer in dignissim aenean vivamus non id. Ultrices pharetra tellus id sed aliquam faucibus.' },
      { type: 'p', content: 'Tincidunt laoreet amet sodales etiam. Convallis tincidunt id nam auctor. Sit velit, molestie nunc. Turpis pellentesque vel sed, bibendum arcu dictum sit.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1520975922215-230f87ec87b2?w=1600&h=1000&fit=crop' },
    ],
  },
  {
    id: 'post-2',
    title: 'BLOG POST 2',
    date: 'Aug 16, 2025',
    hero: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=2000&h=1200&fit=crop',
    body: [
      { type: 'p', content: 'Auctor eu volutpat lacinia diam. Sit tempor id non consectetur lacus. Quam semper sed sit tempus elit.' },
      { type: 'h2', content: 'Pharetra venenatis integer' },
      { type: 'p', content: 'Condimentum enim ut nunc, sed magna scelerisque quam nec. Pellentesque at hendrerit rhoncus, phasellus eros.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&h=1000&fit=crop' },
      { type: 'p', content: 'Convallis tincidunt id nam auctor. Sit velit, molestie nunc.' },
      { type: 'p', content: 'Faucibus aenean ac nunc amet at feugiat. Consectetur sed cursus ante a molestie. Quam dui eget at tincidunt imperdiet sapien.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1600&h=1000&fit=crop' },
    ],
  },
  {
    id: 'post-3',
    title: 'BLOG POST 3',
    date: 'Aug 16, 2025',
    hero: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&h=1200&fit=crop',
    body: [
      { type: 'p', content: 'Libero nec, dictum aliquam lacinia nunc id. Velit fringilla at in non commodo.' },
      { type: 'h2', content: 'Tellus habitasse integer' },
      { type: 'p', content: 'Enim vitae sed sed tellus amet a. Id sit urna id euismod.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=1000&fit=crop' },
      { type: 'quote', content: 'Aenean facilisis, sed sagittis lectus massa ipsum cras vestibulum.' },
      { type: 'p', content: 'Dignissim etiam vivamus non id ultrices. Tincidunt id sed aliquam faucibus. Nam auctor ultricies placerat.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1616628182501-e2f7836f13cf?w=1600&h=1000&fit=crop' },
    ],
  },
  {
    id: 'post-4',
    title: 'BLOG POST 4',
    date: 'Aug 16, 2025',
    hero: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=2000&h=1200&fit=crop',
    body: [
      { type: 'p', content: 'Ultrices bibendum risus aliquet facilisis et tortor. Et varius et pellentesque proin tincidunt cursus.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&h=1000&fit=crop' },
      { type: 'p', content: 'Sagittis orci velit sed gravida porta fermentum. Massa id et massa lectus. Id enim neque donec leo massa.' },
      { type: 'h2', content: 'Lacus porttitor laoreet' },
      { type: 'p', content: 'Viverra massa leo sem et integer. Consequat fermentum. Euismod pellentesque risus egestas.' },
      { type: 'img', src: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c86?w=1600&h=1000&fit=crop' },
    ],
  },
];

export default function BlogDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = details.find((d) => d.id === postId) ?? details[0];
  const placeholder =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
         <defs>
           <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
             <stop offset="0%" stop-color="#eee"/>
             <stop offset="100%" stop-color="#ddd"/>
           </linearGradient>
         </defs>
         <rect width="1200" height="675" fill="url(#g)"/>
         <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#aaa" font-size="40" font-family="Inter, Arial, sans-serif">image</text>
       </svg>`
    );
  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== placeholder) img.src = placeholder;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <TopNavigation />
      <main className="px-8 lg:px-12 xl:px-16 pt-32 pb-24">
        {/* Hero 大图 */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div
            className="w-full overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface)', borderRadius: '20px', boxShadow: 'var(--service-shadow)' }}
          >
            <div className="p-3">
              <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-md)', aspectRatio: '16/9' }}>
                <img src={post.hero} alt={post.title} className="w-full h-full object-cover" onError={onImgError} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 文字内容容器（白面卡片，内含标题+日期+正文；正文中的图片无边框） */}
        <section className="mt-24 mb-24">
          <div
            className="w-full overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface)', borderRadius: '20px', boxShadow: 'var(--service-shadow)' }}
          >
            <div className="max-w-[980px] mx-auto px-12 py-16 md:px-16 md:py-20 lg:px-20 lg:py-24">
              {/* 日期 + 标题（字体严格遵循设计系统） */}
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {post.date}
              </p>
              <h1
                className="font-extrabold tracking-tight mb-12"
                style={{ color: 'var(--color-text-primary)', fontSize: '84px', lineHeight: 1.08, letterSpacing: '-0.3px' }}
              >
                {post.title}
              </h1>

              {/* 正文内容（段落 18px/1.5；插图无边框，仅圆角） */}
              <article className="space-y-10">
                {post.body.map((b, i) => {
                  if (b.type === 'p') {
                    return (
                      <p key={i} className="text-[20px] leading-[1.7] tracking-[0.005em]" style={{ color: 'var(--color-text-secondary)' }}>
                        {b.content}
                      </p>
                    );
                  }
                  if (b.type === 'h2') {
                    return (
                      <h2 key={i} className="font-semibold mt-10 mb-2" style={{ color: 'var(--color-text-primary)', fontSize: '48px', lineHeight: 1.2 }}>
                        {b.content}
                      </h2>
                    );
                  }
                  if (b.type === 'img') {
                    return (
                      <div key={i} className="w-full overflow-hidden mt-2 mb-2" style={{ borderRadius: 'var(--radius-md)' }}>
                        <img src={b.src} alt="Post media" className="w-full h-auto object-cover" onError={onImgError} />
                      </div>
                    );
                  }
                  if (b.type === 'quote') {
                    return (
                      <blockquote key={i} className="pl-6 border-l-4 italic py-2" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}>
                        {b.content}
                      </blockquote>
                    );
                  }
                  return null;
                })}
              </article>
            </div>
          </div>
        </section>

        {/* 返回或导航（可选） */}
        <div className="max-w-5xl mx-auto mt-16">
          <button
            className="px-5 py-2 rounded-full border"
            onClick={() => navigate('/blog')}
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            ← Back to Blog
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
