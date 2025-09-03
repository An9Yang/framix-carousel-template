# Build a clean, standalone design system document in Markdown.

from datetime import datetime
doc = f"""# Framix 视觉设计系统 v1.0

> 面向“极简灰阶 + 巨型编辑部标题 + 柔和圆角卡片 + 胶囊按钮”的统一样式基线。**仅包含设计系统必要内容**。

更新时间：{datetime.now().strftime('%Y-%m-%d %H:%M')}

---

## 0. 名称与基础

- **体系名**：Framix-Style
- **容器宽度**：`1280px`（内容区可用 `1080px`）
- **栅格**：12 栏；列间距（gutter）`24–32px`；行间距 `32–40px`
- **基线单位**：8px 系（含扩展大间距）
- **圆角基调**：柔和（主要 16–20px）
- **阴影基调**：范围大、透明度低（雾面纸感）

---

## 1. 颜色（Color Tokens）

| Token                    | 值                 | 用途             |
| ------------------------ | ------------------ | ---------------- |
| `--color-bg`             | `#F0F0F0`          | 页面浅灰背景     |
| `--color-surface`        | `#FFFFFF`          | 卡片/内容面      |
| `--color-text-primary`   | `#101010`          | 主文本/标题      |
| `--color-text-secondary` | `#404040`          | 次级文本         |
| `--color-text-muted`     | `#606060`          | 说明/帮助        |
| `--color-border`         | `#E5E5E5`          | 分隔线/描边      |
| `--color-shadow`         | `rgba(0,0,0,0.06)` | 通用阴影色       |
| `--color-accent-blue`    | `#0070F0`          | 轻量点缀（慎用） |
| `--color-cta-black`      | `#0A0A0A`          | CTA 按钮底       |
| `--color-badge-fg`       | `#FFFFFF`          | 徽章/按钮文字    |

> 规则：UI 以灰阶为主；彩色由**图片**承担。`--color-accent-blue` 仅作小面积强调。

---

## 2. 字体（Typography Tokens）

**字体族**

- Display：`Satoshi Variable, Space Grotesk, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`
- UI/正文：`Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`

**字重**

- Display：`800`
- Headline：`700`
- Semibold：`600`
- Regular：`400`

**行高**

- Display：`1.05–1.15`
- 正文：`1.5`

**字距**

- Display：`-0.5px`
- 正文：`0`
- 全大写小标签：`+0.5px`

**字号层级**
| 名称 | px | 典型用途 |
|---|---:|---|
| `6xl` | 160 | 首页/分区超巨标题（FRAMIX / WORK / ABOUT） |
| `5xl` | 120 | 次巨标题 |
| `4xl` | 72 | 分节大标题 |
| `3xl` | 48 | 模块标题/详情页标题 |
| `2xl` | 32 | 小标题 |
| `xl` | 24 | 引导文/摘要 |
| `lg` | 20 | 正文（大） |
| `md` | 18 | 正文（常规） |
| `base` | 16 | 次正文/注释 |
| `sm` | 14 | 导航/小标签 |
| `xs` | 12 | 最小辅助 |

---

## 3. 间距（Spacing Tokens）

| 名称         |    值 |
| ------------ | ----: |
| `--space-1`  |   4px |
| `--space-2`  |   8px |
| `--space-3`  |  12px |
| `--space-4`  |  16px |
| `--space-5`  |  20px |
| `--space-6`  |  24px |
| `--space-8`  |  32px |
| `--space-10` |  40px |
| `--space-12` |  48px |
| `--space-16` |  64px |
| `--space-20` |  80px |
| `--space-24` |  96px |
| `--space-28` | 112px |
| `--space-32` | 128px |

**建议**

- 分区上下边距 ≥ `96px`
- 卡片内边距 `24–32px`
- 分区与分区：`112–160px` 留白

---

## 4. 圆角（Radii Tokens）

| 名称            |    值 | 用途          |
| --------------- | ----: | ------------- |
| `--radius-sm`   |  10px | 输入框/小标签 |
| `--radius-md`   |  16px | 卡片常用      |
| `--radius-lg`   |  20px | 大图卡片      |
| `--radius-full` | 999px | 胶囊/圆形     |

---

## 5. 阴影（Elevation Tokens）

| 名称           | 值                                                        | 场景       |
| -------------- | --------------------------------------------------------- | ---------- |
| `--elev-card`  | `0 12px 40px rgba(0,0,0,.12), 0 4px 10px rgba(0,0,0,.06)` | 卡片默认   |
| `--elev-hover` | `0 20px 60px rgba(0,0,0,.16), 0 6px 14px rgba(0,0,0,.08)` | Hover 提升 |
| `--elev-nav`   | `0 2px 6px rgba(0,0,0,.08)`                               | 顶部导航   |

---

## 6. 动效（Motion Tokens）

- 时长：`150ms / 250ms / 400ms`
- 缓动：
  - 强调：`cubic-bezier(0.2, 0.8, 0.2, 1)`
  - 标准：`cubic-bezier(0.4, 0, 0.2, 1)`
- 交互模式：
  - Scroll Reveal：`opacity 0→1` + `translateY 16–24px→0`，`250ms`
  - 卡片 Hover：提升 `2–4px` + 阴影由 `--elev-card`→`--elev-hover`
  - 叠放图片：初始 1–2° 倾斜，Hover 微旋转 `0.5°` 并上移 `4px`

---

## 7. 布局（Layout）

- 容器：最大宽 `1280px`；内容区 `1080px`
- 栅格：12 栏；列间距 `24–32px`
- 文图详情页：左窄（文本列宽 28–36ch） + 右宽图

---

## 8. 组件（Components）

### 8.1 Button（胶囊按钮）

- 形态：
  - **Primary**（黑底白字）：`background: var(--color-cta-black)`
  - **Secondary**（白底描边）：`background: #FFF; border: 1px solid var(--color-border)`
- 规格：`padding: 10px 18px; border-radius: var(--radius-full); box-shadow: var(--elev-nav)`
- 字体：`16–18px / 600`
- 状态：
  - Hover：`transform: translateY(-2px); box-shadow: var(--elev-hover)`
  - Focus：`outline: 2px solid var(--color-accent-blue); outline-offset: 2px`

### 8.2 NavBar（顶部导航）

- 结构：左 `Logo F.`；中部**浅灰 pill** 导航项（`14px`，圆角 `999px`）；右侧两枚按钮（Email/Contact）。
- 行高/间距：容器左右 `32px`；导航项间距 `16px`；粘性吸顶 + `--elev-nav`。

### 8.3 Card（通用卡片）

- 背景：`var(--color-surface)`；圆角：`var(--radius-md)` 或 `--radius-lg`
- 阴影：`--elev-card`；内边距：`24–32px`
- Hover：`--elev-hover` + 上移 `2–4px`

### 8.4 ImageFrame（图片框/叠放）

- 圆角：`16–20px`；白边（可选 `1px` #FFF 内描边）；外阴影 `--elev-card`
- 叠放时每张图 `rotate(±1–2deg)`，层级错位 `8–16px`

### 8.5 ProjectGrid（作品网格）

- 布局：2 列（≥1200px）/ 移动端 1 列
- 卡片：上部大图（`ImageFrame`），下部信息条（标题 `20px/600`；副标题 `16px/400/#606060`）
- 间距：列间 `32–40px`；行间 `32–40px`

### 8.6 ProjectDetail（作品详情）

- 左侧 Info 卡：白底圆角 `16px`，字段 **Year / Direction / Summary**，行距 `20–24px`
- 右侧主图：大图 `ImageFrame`
- 标题（如 `ALARM CLOCK`）：`120–160px`

### 8.7 ServicesRow（服务条目）

- 整行白底圆角 `16px`；左右内边距 `24–32px`
- 左：两位数序号（`01…05`）；中：标题 `24–32px/600` + 正文 `16–18px`；右：小图 `ImageFrame`

### 8.8 CTAStack（叠放图片 CTA）

- 三张小图叠放（`ImageFrame`）；中间文案一行（`20–24px`，关键字加粗）；主按钮使用 **Primary**

### 8.9 Tag/Pill（小标签）

- 背景：`#FFF` 或 `#F7F7F7`；描边：`1px var(--color-border)`；圆角：`999px`；文字 `14px` + 字距 `+0.5px`

---

## 9. 可访问性（A11y）

- 对比度：正文 `#101010` on `#F0F0F0` 通过 WCAG AA
- 焦点态：所有可交互元素提供 `outline`（参考 Button）
- 装饰性“幽灵字/水印字”：设置 `aria-hidden="true"`

---

## 10. CSS 变量（实现基线）

```css
:root {
  /* colors */
  --color-bg: #f0f0f0;
  --color-surface: #ffffff;
  --color-text-primary: #101010;
  --color-text-secondary: #404040;
  --color-text-muted: #606060;
  --color-border: #e5e5e5;
  --color-shadow: rgba(0, 0, 0, 0.06);
  --color-accent-blue: #0070f0;
  --color-cta-black: #0a0a0a;
  --color-badge-fg: #ffffff;

  /* radii */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-full: 999px;

  /* spacing (excerpt) */
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* elevations */
  --elev-card: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.06);
  --elev-hover: 0 20px 60px rgba(0, 0, 0, 0.16), 0 6px 14px rgba(0, 0, 0, 0.08);
  --elev-nav: 0 2px 6px rgba(0, 0, 0, 0.08);
}
```
