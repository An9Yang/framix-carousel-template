/**
 * 向左凸出弧形轨迹轮播的数学计算工具
 * 
 * 核心设计原则：
 * 1. 圆心位于屏幕右侧外部，创建向左凸出的优雅弧线
 * 2. 卡片从右上角平滑过渡到右下角，弧线向左凸出
 * 3. 视觉效果完全基于卡片的屏幕位置，而非索引距离
 * 4. 卡片在屏幕垂直中心时最清晰，偏离中心时渐进模糊
 * 5. 手势交互：向下滑动逆时针，向上滑动顺时针
 */

export interface CarouselCardPosition {
  /** 卡片的X坐标位置（相对于容器的百分比） */
  x: number;
  /** 卡片的Y坐标位置（相对于容器的百分比） */
  y: number;
  /** 卡片的Z坐标位置（景深） */
  z: number;
  /** 透明度 */
  opacity: number;
  /** 缩放比例 */
  scale: number;
  /** 模糊程度 */
  blur: number;
  /** 是否为激活状态 */
  isActive: boolean;
  /** 旋转角度（用于卡片自身旋转） */
  rotation: number;
}

export interface CarouselConfig {
  /** 卡片总数 */
  totalCards: number;
  /** 弧形轨迹半径（相对于容器对角线的比例） */
  radiusRatio: number;
  /** 圆心X坐标（相对于容器宽度的比例，可以为负数） */
  centerXRatio: number;
  /** 圆心Y坐标（相对于容器高度的比例） */
  centerYRatio: number;
  /** 容器宽度 */
  containerWidth: number;
  /** 容器高度 */
  containerHeight: number;
}

/**
 * 计算向左凸出弧形轨迹中单个卡片的位置和状态
 * 
 * @param cardIndex - 卡片索引（0开始）
 * @param scrollProgress - 滚动进度（影响当前激活的卡片）
 * @param config - 轮播配置
 * @returns 卡片的位置和视觉状态信息
 */
export function calculateCardPosition(cardIndex: number, scrollProgress: number, config: CarouselConfig): CarouselCardPosition {
  const { totalCards, radiusRatio, centerXRatio, centerYRatio, containerWidth, containerHeight } = config;
  
  // 计算对角线长度作为半径基础
  const diagonalLength = Math.sqrt(containerWidth * containerWidth + containerHeight * containerHeight);
  const radius = diagonalLength * radiusRatio;
  
  // 圆心位置（在屏幕右侧外部）
  const centerX = containerWidth * centerXRatio;
  const centerY = containerHeight * centerYRatio;
  
  // 向左凸出弧形轨迹计算
  // 从右上角（135度）到右下角（225度），形成优雅的垂直对称弧线
  const totalArcAngle = Math.PI * 0.7; // 再增大弧度，让卡片间距更大
  
  // 修复：计算卡片间的角度间隔
  // 关键修复：对于 5 张卡片，我们需要 4 个间隔，但要确保所有卡片都能完整地移动到轨迹的每个位置
  const angleStep = totalArcAngle / Math.max(1, totalCards - 1);
  
  // 起始角度：从左上方开始（135度）
  const startAngle = Math.PI * 0.75; // 135度
  
  // ================================
  // 核心修复：重新设计滚动到角度的映射逻辑
  // ================================
  
  // 滚动进度0时，第一张卡片应该位于屏幕中心（180度 = π）
  // 滚动进度1时，最后一张卡片应该位于屏幕中心
  
  // 计算中心角度（180度，即弧线最凸出的点）
  const centerAngle = Math.PI; // 180度
  
  // 核心修复：重新设计卡片位置计算逻辑
  // 关键修复：确保滚动进度能完整地将焦点从第一张卡片移动到最后一张卡片
  // scrollProgress = 0 时，卡片 0 应该位于中心
  // scrollProgress = 1 时，卡片 (totalCards-1) 应该位于中心
  const currentCenterCardIndex = scrollProgress * (totalCards - 1);
  // 修复滚动方向：反转减法顺序，实现直观的向下滑动→轮播向下（逆时针）运动
  const cardAngleOffset = (currentCenterCardIndex - cardIndex) * angleStep;
  
  // 最终角度：中心角度 + 相对偏移
  const finalAngle = centerAngle + cardAngleOffset;
  
  // 计算卡片在圆形轨迹上的位置
  const x = centerX + radius * Math.cos(finalAngle);
  const y = centerY + radius * Math.sin(finalAngle);
  
  // 转换为百分比坐标，并将卡片向左移动10px
  const xPercent = ((x - 10) / containerWidth) * 100;
  const yPercent = (y / containerHeight) * 100;
  
  // ================================
  // 核心修复：基于屏幕位置的视觉效果计算
  // ================================
  
  // 计算卡片距离屏幕垂直中心的偏移量
  const screenCenterY = 50; // 屏幕垂直中心为50%
  const distanceFromScreenCenter = Math.abs(yPercent - screenCenterY);
  
  // 定义焦点区域：距离中心15%以内为完全清晰区域（更大的清晰区域）
  const focusZone = 15; // 百分比
  // 定义衰减区域：距离中心30%以外为完全模糊区域（更集中的效果）
  const falloffZone = 30; // 百分比
  
  // 计算归一化的距离（0 = 完全在中心，1 = 完全超出衰减区域）
  const normalizedDistance = Math.min(1, Math.max(0, 
    (distanceFromScreenCenter - focusZone) / (falloffZone - focusZone)
  ));
  
  // 是否为激活状态：最接近屏幕中心的卡片
  const isActive = distanceFromScreenCenter < focusZone;
  
  // ================================
  // 优化的视觉效果计算
  // ================================
  
  // 透明度：只有中心卡片完全不透明，其他快速衰减
  // 使用平滑的二次曲线衰减
  const opacity = isActive ? 1 : Math.max(0.3, 0.8 - normalizedDistance * 0.5);
  
  // 缩放：保持较大的尺寸差异，突出焦点
  // 使用轻微的线性衰减
  const scale = isActive ? 1 : Math.max(0.75, 0.9 - normalizedDistance * 0.15);
  
  // 模糊：非焦点卡片快速模糊
  // 使用二次曲线以获得更明显的衰减效果
  const blur = isActive ? 0 : normalizedDistance * normalizedDistance * 8;
  
  // 卡片旋转跟随弧线切线方向，创建自然的倾斜效果
  // 在180度（最凸出点）时旋转为0，向两端逐渐倾斜
  const angleFromCenter = finalAngle - Math.PI; // 相对于180度（最凸出点）的角度偏移
  const rotation = angleFromCenter * (180 / Math.PI) * 0.25; // 适度的旋转幅度
  
  return {
    x: xPercent,
    y: yPercent,
    z: isActive ? 10 : Math.max(0, 5 - normalizedDistance * 5),
    opacity,
    scale,
    blur,
    isActive,
    rotation
  };
}

/**
 * 将滚动位置转换为轮播进度
 * 
 * 核心修复：正确的滚动进度映射
 * - 向下滑动（scrollY增加）→ 进度从0增加到1
 * - 滚动到顶部时进度为0（第一张卡片居中）
 * - 滚动到底部时进度为1（最后一张卡片居中）
 * 
 * @param scrollY - 当前滚动位置
 * @param startOffset - 开始触发的滚动位置
 * @param endOffset - 结束触发的滚动位置
 * @returns 归一化的滚动进度（0-1）
 */
export function getScrollProgress(scrollY: number, startOffset: number, endOffset: number): number {
  // 关键修复：确保边界条件正确
  if (scrollY <= startOffset) return 0; // 起始位置：第一张卡片居中
  if (scrollY >= endOffset) return 1;   // 结束位置：最后一张卡片居中
  
  // 计算线性进度：从0到1
  const progress = (scrollY - startOffset) / (endOffset - startOffset);
  
  // 确保进度在有效范围内
  return Math.max(0, Math.min(1, progress));
}

/**
 * 生成CSS变换字符串
 * 
 * @param position - 卡片位置信息
 * @returns CSS transform 字符串
 */
export function generateTransform(position: CarouselCardPosition): string {
  // 简单的缩放和Z轴位移，3D倾斜效果由组件控制
  return `scale(${position.scale}) translateZ(${position.z}px)`;
}

/**
 * 生成CSS滤镜字符串
 * 
 * @param position - 卡片位置信息
 * @returns CSS filter 字符串
 */
export function generateFilter(position: CarouselCardPosition): string {
  return `blur(${position.blur}px)`;
}

/**
 * 计算向左凸出弧形轨迹的配置（精确匹配原图设计）
 * 
 * @param containerWidth - 容器宽度
 * @param containerHeight - 容器高度
 * @param isMobile - 是否为移动端
 * @returns 向左凸出弧形轨迹配置
 */
export function calculateCircularTrackConfig(
  containerWidth: number,
  containerHeight: number,
  isMobile: boolean = false
): Omit<CarouselConfig, 'totalCards'> {
  // 重要：圆心在屏幕右侧外部，创建向左凸出的弧线
  // 卡片从右上角平滑过渡到右下角，弧线向左凸出
  
  // 半径比例：适中的半径让卡片分布合理
  const radiusRatio = isMobile ? 0.45 : 0.5;
  
  // 圆心位置：在屏幕右侧，让卡片偏右但不要太极端
  const centerXRatio = isMobile ? 1.15 : 1.2; // 圆心稍微在屏幕右侧外，卡片偏右显示
  const centerYRatio = 0.5; // 垂直居中
  
  return {
    radiusRatio,
    centerXRatio,
    centerYRatio,
    containerWidth,
    containerHeight
  };
}