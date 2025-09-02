# Framix 3D 视差轮播 - 项目架构概览

## 核心文件结构

### 页面组件
- `src/pages/home.tsx`: 主页面，包含完整的3D视差轮播效果

### 布局组件（待创建）
- `src/components/layout/header.tsx`: 顶部导航栏
- `src/components/layout/hero-section.tsx`: 主标题区域
- `src/components/layout/carousel-section.tsx`: 3D轮播盘区域

### 3D轮播组件（待创建）
- `src/components/carousel/parallax-carousel.tsx`: 主轮播容器
- `src/components/carousel/carousel-card.tsx`: 单个卡片组件
- `src/components/carousel/carousel-math.ts`: 3D数学计算工具

### 工具函数（待创建）
- `src/hooks/use-scroll-parallax.ts`: 滚动视差效果Hook
- `src/utils/carousel-calculations.ts`: 轮播数学计算

## 技术栈
- React + TypeScript
- Tailwind CSS (3D Transform)
- Framer Motion (动画)
- 自定义滚动监听
- CSS 3D Transforms

## 设计系统
- 极简现代风格
- 黑白灰配色方案
- 专业排版
- 3D视觉效果