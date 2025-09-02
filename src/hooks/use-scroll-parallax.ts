/**
 * 视差滚动效果的自定义Hook
 * 
 * 该Hook监听滚动事件，并提供滚动位置和进度信息，
 * 用于驱动垂直轮播的动画效果。
 */

import { useState, useEffect, useCallback } from 'react';

export interface ScrollParallaxState {
  /** 当前滚动位置 */
  scrollY: number;
  /** 滚动进度（0-1） */
  progress: number;
  /** 滚动方向：1为向下，-1为向上 */
  direction: number;
  /** 滚动速度 */
  velocity: number;
}

export interface UseScrollParallaxOptions {
  /** 开始触发效果的滚动位置 */
  startOffset?: number;
  /** 结束效果的滚动位置 */
  endOffset?: number;
  /** 是否启用滚动节流 */
  throttle?: boolean;
  /** 节流间隔（毫秒） */
  throttleDelay?: number;
}

/**
 * 使用视差滚动效果
 * 
 * @param options - 配置选项
 * @returns 滚动状态信息
 */
export function useScrollParallax(
  options: UseScrollParallaxOptions = {}
): ScrollParallaxState {
  const {
    startOffset = 0,
    endOffset = 2000,
    throttle = true,
    throttleDelay = 16, // ~60fps
  } = options;

  const [scrollState, setScrollState] = useState<ScrollParallaxState>({
    scrollY: 0,
    progress: 0,
    direction: 1,
    velocity: 0,
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  const updateScrollState = useCallback(
    (currentScrollY: number) => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      const deltaY = currentScrollY - lastScrollY;
      
      // 计算滚动方向和速度
      const direction = deltaY > 0 ? 1 : deltaY < 0 ? -1 : scrollState.direction;
      const velocity = deltaTime > 0 ? Math.abs(deltaY) / deltaTime : 0;
      
      // 计算进度（0-1之间）- 恢复直观的手势映射
      const scrollRange = endOffset - startOffset;
      const adjustedScrollY = Math.max(0, currentScrollY - startOffset);
      
      // 🎯 核心修改：恢复直观映射关系
      // 现在：向下滑动手势 → 页面向下滚动 → 轮播向下移动
      // 现在：向上滑动手势 → 页面向上滚动 → 轮播向上移动
      const progress = Math.min(1, Math.max(0, adjustedScrollY / scrollRange));
      
      setScrollState({
        scrollY: currentScrollY,
        progress,
        direction,
        velocity,
      });
      
      setLastScrollY(currentScrollY);
      setLastTime(now);
    },
    [lastScrollY, lastTime, startOffset, endOffset, scrollState.direction]
  );

  useEffect(() => {
    let timeoutId: number | null = null;
    let isThrottled = false;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

      if (throttle) {
        if (!isThrottled) {
          updateScrollState(currentScrollY);
          isThrottled = true;
          
          timeoutId = window.setTimeout(() => {
            isThrottled = false;
          }, throttleDelay);
        }
      } else {
        updateScrollState(currentScrollY);
      }
    };

    // 初始化滚动位置
    handleScroll();

    // 添加滚动监听器
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 也监听页面尺寸变化
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateScrollState, throttle, throttleDelay]);

  return scrollState;
}

/**
 * 将数值映射到指定范围
 * 
 * @param value - 输入值
 * @param inputMin - 输入最小值
 * @param inputMax - 输入最大值
 * @param outputMin - 输出最小值
 * @param outputMax - 输出最大值
 * @returns 映射后的值
 */
export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number {
  return (
    ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) +
    outputMin
  );
}

/**
 * 平滑插值函数
 * 
 * @param start - 起始值
 * @param end - 结束值
 * @param factor - 插值因子（0-1）
 * @returns 插值结果
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * 缓动函数：ease-out
 * 
 * @param t - 时间进度（0-1）
 * @returns 缓动后的值
 */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * 缓动函数：ease-in-out
 * 
 * @param t - 时间进度（0-1）
 * @returns 缓动后的值
 */
export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}