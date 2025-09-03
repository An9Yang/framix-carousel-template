/**
 * Footer 组件 - 遵循 Framix 设计系统规范
 * 全屏装饰性 Footer with 无限滚动背景文字
 */

import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden">
      {/* 背景滚动文字 - 上方向左滚动 */}
      <div className="absolute top-[15%] left-0 right-0 pointer-events-none">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
        >
          <span className="text-[15vw] font-black opacity-[0.02] select-none mr-20">
            LET'S GO CREATE
          </span>
          <span className="text-[15vw] font-black opacity-[0.02] select-none mr-20">
            LET'S GO CREATE
          </span>
          <span className="text-[15vw] font-black opacity-[0.02] select-none mr-20">
            LET'S GO CREATE
          </span>
        </motion.div>
      </div>

      {/* 背景滚动文字 - 下方向右滚动 */}
      <div className="absolute bottom-[15%] left-0 right-0 pointer-events-none">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["-50%", 0] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
        >
          <span className="text-[15vw] font-black opacity-[0.02] select-none mr-20">
            DIVERSE CRAFT
          </span>
          <span className="text-[15vw] font-black opacity-[0.02] select-none mr-20">
            DIVERSE CRAFT
          </span>
          <span className="text-[15vw] font-black opacity-[0.02] select-none mr-20">
            DIVERSE CRAFT
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 px-8 lg:px-12 xl:px-16">
        {/* 装饰性卡片组 - 居中显示 */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="relative w-[400px] h-[240px] lg:w-[500px] lg:h-[300px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* 悬浮动画容器 */}
            <motion.div
              className="relative w-full h-full"
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* 第一层卡片 - 蓝紫渐变 */}
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  borderRadius: '16px',
                  transform: 'rotate(-12deg) translateX(-60px) translateY(10px)',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.2)'
                }}
                animate={{ 
                  rotate: [-12, -10, -12],
                  translateX: [-60, -55, -60]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* 第二层卡片 - 深色 */}
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: '#1a1a1a',
                  borderRadius: '16px',
                  transform: 'rotate(-6deg) translateX(-30px)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
                }}
                animate={{ 
                  rotate: [-6, -4, -6],
                  translateX: [-30, -25, -30]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              {/* 主卡片 - 带内容 */}
              <motion.div 
                className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center"
                style={{
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                }}
                animate={{ 
                  rotate: [0, 2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                {/* 卡片内的抽象图形 */}
                <div className="relative w-full h-full">
                  {/* 模糊的圆形背景 */}
                  <div 
                    className="absolute top-[20%] left-[15%] w-[120px] h-[120px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(129, 230, 217, 0.4) 0%, transparent 70%)',
                      filter: 'blur(40px)'
                    }}
                  />
                  {/* 几何形状 */}
                  <div 
                    className="absolute bottom-[25%] right-[20%] w-[80px] h-[80px]"
                    style={{
                      background: 'linear-gradient(135deg, #FFDAB9 0%, #FFB6C1 100%)',
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      opacity: 0.8
                    }}
                  />
                  <div 
                    className="absolute top-[40%] left-[40%] w-[60px] h-[60px]"
                    style={{
                      background: 'linear-gradient(45deg, #FF6B6B 0%, #FFE66D 100%)',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      opacity: 0.7
                    }}
                  />
                </div>
              </motion.div>

              {/* 第四层卡片 - 蓝色渐变 */}
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
                  borderRadius: '16px',
                  transform: 'rotate(8deg) translateX(40px) translateY(5px)',
                  zIndex: -1,
                  boxShadow: '0 10px 40px rgba(0, 147, 233, 0.2)'
                }}
                animate={{ 
                  rotate: [8, 10, 8],
                  translateX: [40, 45, 40]
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 主文案 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl lg:text-3xl font-semibold mb-3">
            Diverse in <em className="font-serif italic">craft</em>, steadfast in <em className="font-serif italic">creativity</em>.
          </h3>
          <p className="text-lg lg:text-xl" style={{ color: 'var(--color-text-muted)' }}>
            Let's bring the unexpected to life.
          </p>
        </motion.div>

        {/* CTA按钮 */}
        <motion.div 
          className="flex justify-center mb-24"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            className="px-10 py-4 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ 
              backgroundColor: '#000',
              letterSpacing: '1px'
            }}
          >
            GET STARTED
          </button>
        </motion.div>

        {/* 底部链接 - 精确还原间距 */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 lg:gap-x-12 gap-y-4 text-xs font-medium">
          <a href="#" className="hover:opacity-60 transition-opacity" 
             style={{ color: 'var(--color-text-primary)', letterSpacing: '0.8px' }}>
            POWERED BY WEBFLOW
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity" 
             style={{ color: 'var(--color-text-primary)', letterSpacing: '0.8px' }}>
            MADE BY MAXIM W.
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity" 
             style={{ color: 'var(--color-text-primary)', letterSpacing: '0.8px' }}>
            LICENSING
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity" 
             style={{ color: 'var(--color-text-primary)', letterSpacing: '0.8px' }}>
            STYLE GUIDE
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity" 
             style={{ color: 'var(--color-text-primary)', letterSpacing: '0.8px' }}>
            CHANGELOG
          </a>
        </div>
      </div>
    </footer>
  );
}