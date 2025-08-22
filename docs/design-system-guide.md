# Aira 디자인 시스템 가이드라인 📐

> **미니멀 화이트&블랙 전문가급 디자인 시스템**  
> 재사용 가능한 컴포넌트와 스타일 가이드

## 🎯 디자인 철학

**"Less is More"** - 불필요한 요소를 제거하고 핵심 기능에 집중  
**"Function over Form"** - 기능성을 우선으로 하되 아름다움을 놓치지 않음  
**"Consistency is Key"** - 일관된 패턴으로 직관적인 사용자 경험 제공

---

## 🎨 컬러 팔레트

### Primary Colors

```css
/* 메인 배경 */
--bg-primary: #ffffff; /* 순백색 배경 */
--bg-secondary: #f9fafb; /* 아주 연한 그레이 (gray-50) */

/* 텍스트 */
--text-primary: #000000; /* 순흑색 주 텍스트 */
--text-secondary: #6b7280; /* 중간 그레이 (gray-500) */
--text-tertiary: #9ca3af; /* 연한 그레이 (gray-400) */
```

### Border & Divider

```css
--border-light: #e5e7eb; /* gray-200 - 연한 보더 */
--border-medium: #d1d5db; /* gray-300 - 중간 보더 */
```

### Status Colors

```css
--status-active: #10b981; /* green-500 - 활성 상태 */
--status-inactive: #6b7280; /* gray-500 - 비활성 상태 */
--status-danger: #ef4444; /* red-500 - 위험/정지 상태 */
```

---

## 📏 레이아웃 시스템

### Container Widths

```css
/* 반응형 컨테이너 최대 너비 */
--container-sm: 640px; /* sm */
--container-md: 768px; /* md */
--container-lg: 1024px; /* lg */
--container-xl: 1280px; /* xl */
--container-2xl: 1536px; /* 2xl */

/* Aira 전용 컨테이너 */
--container-stats: 1024px; /* 통계 패널용 (max-w-4xl) */
--container-main: 1280px; /* 메인 컨텐츠용 (max-w-5xl) */
--container-full: 1536px; /* 전체 레이아웃용 (max-w-7xl) */
```

### Spacing Scale

```css
/* Aira 표준 여백 */
--space-xs: 0.25rem; /* 4px */
--space-sm: 0.5rem; /* 8px */
--space-md: 1rem; /* 16px */
--space-lg: 1.5rem; /* 24px */
--space-xl: 2rem; /* 32px */
--space-2xl: 3rem; /* 48px */

/* 레이아웃 전용 여백 */
--padding-section: 2rem; /* 섹션 패딩 (px-8) */
--padding-container: 1.5rem; /* 컨테이너 패딩 (py-6) */
--gap-grid: 1.5rem; /* 그리드 간격 (gap-6) */
```

---

## 🔤 타이포그래피

### Font Families

```css
/* 메인 폰트 스택 */
--font-primary: ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas,
  monospace;
```

### Font Scales

```css
/* 헤딩 스케일 */
--text-3xl: 1.875rem; /* 30px - 메인 제목 (AIRA) */
--text-2xl: 1.5rem; /* 24px - 섹션 제목 */
--text-xl: 1.25rem; /* 20px - 서브 제목 */

/* 본문 스케일 */
--text-base: 1rem; /* 16px - 기본 텍스트 */
--text-sm: 0.875rem; /* 14px - 작은 텍스트 */
--text-xs: 0.75rem; /* 12px - 라벨/캡션 */
```

### Typography Components

```typescript
// 메인 타이틀
<h1 className="text-3xl font-bold tracking-wider">AIRA</h1>

// 섹션 타이틀
<h2 className="text-2xl font-bold mb-4">Section Title</h2>

// 통계 숫자 (모노스페이스)
<div className="text-2xl font-bold font-mono">{count.toString().padStart(4, '0')}</div>

// 라벨 텍스트
<div className="text-xs text-gray-400 mb-2">LABEL</div>

// 설명 텍스트
<p className="text-sm text-gray-500 mt-1">Description text</p>
```

---

## 🧩 컴포넌트 라이브러리

### 1. 통계 카드 (Stats Card)

```typescript
interface StatsCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const StatsCard = ({ label, value, className = "" }: StatsCardProps) => (
  <div className={`border border-gray-200 p-6 bg-gray-50 ${className}`}>
    <div className="text-xs text-gray-400 mb-2">{label}</div>
    <div className="text-2xl font-bold font-mono">{value}</div>
  </div>
);
```

### 2. 액션 버튼 (Action Button)

```typescript
interface ActionButtonProps {
  variant: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton = ({
  variant,
  children,
  onClick,
  disabled = false,
}: ActionButtonProps) => {
  const baseClasses =
    "px-8 py-3 border-2 font-mono text-sm tracking-wider transition-all duration-200";

  const variants = {
    primary: "border-green-300 bg-green-50 text-green-700 hover:bg-green-100",
    danger: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100",
    secondary: "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${
        disabled ? "opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### 3. 상태 인디케이터 (Status Indicator)

```typescript
interface StatusIndicatorProps {
  isActive: boolean;
  activeText: string;
  inactiveText: string;
}

const StatusIndicator = ({
  isActive,
  activeText,
  inactiveText,
}: StatusIndicatorProps) => (
  <div className="flex items-center gap-4">
    <div className="text-right">
      <div className="text-xs text-gray-400">STATUS</div>
      <div
        className={`text-sm font-bold ${
          isActive ? "text-green-600" : "text-gray-400"
        }`}
      >
        {isActive ? activeText : inactiveText}
      </div>
    </div>
    <div className="w-3 h-3 rounded-full border-2 border-gray-300">
      <div
        className={`w-full h-full rounded-full transition-colors duration-300 ${
          isActive ? "bg-green-500" : "bg-gray-200"
        }`}
      />
    </div>
  </div>
);
```

---

## 🏗️ 레이아웃 패턴

### 1. 헤더 레이아웃

```typescript
const Header = () => (
  <header className="border-b border-gray-200 px-8 py-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-wider">AIRA</h1>
        <p className="text-sm text-gray-500 mt-1">Subtitle Description</p>
      </div>
      <StatusIndicator />
    </div>
  </header>
);
```

### 2. 그리드 레이아웃 (통계)

```typescript
const StatsGrid = ({
  stats,
}: {
  stats: Array<{ label: string; value: string }>;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {stats.map((stat, index) => (
      <StatsCard key={index} label={stat.label} value={stat.value} />
    ))}
  </div>
);
```

### 3. 중앙 정렬 액션 섹션

```typescript
const ActionSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center gap-4 mb-8">{children}</div>
);
```

### 4. 푸터 레이아웃

```typescript
const Footer = () => (
  <footer className="border-t border-gray-200 px-8 py-4 bg-gray-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-500">
      <div>App Name v1.0.0 - Description</div>
      <div className="flex gap-6">
        <span>Info 1</span>
        <span>Info 2</span>
        <span>Info 3</span>
      </div>
    </div>
  </footer>
);
```

---

## 📱 반응형 디자인

### Breakpoints

```css
/* Mobile First 접근법 */
sm: 640px   /* 태블릿 세로 */
md: 768px   /* 태블릿 가로 */
lg: 1024px  /* 데스크탑 */
xl: 1280px  /* 큰 데스크탑 */
2xl: 1536px /* 초대형 화면 */
```

### 반응형 패턴

```typescript
// 그리드 반응형
className = "grid grid-cols-1 md:grid-cols-4 gap-6";

// 플렉스 반응형
className = "flex flex-col sm:flex-row gap-4";

// 텍스트 반응형
className = "text-sm sm:text-base";

// 패딩 반응형
className = "px-4 sm:px-8";
```

---

## 🎭 애니메이션 & 트랜지션

### 표준 트랜지션

```css
/* 기본 트랜지션 */
transition-colors duration-200  /* 색상 변화 */
transition-all duration-300     /* 전체 속성 변화 */

/* 호버 효과 */
hover:bg-gray-100              /* 배경색 변화 */
hover:border-gray-400          /* 보더 변화 */
```

### 3D 시각화 스타일

```typescript
// 3D 컨테이너
<div className="w-full h-[700px] bg-black border border-gray-800 rounded-lg overflow-hidden">

// 그라디언트 배경
style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}
```

---

## 🔧 개발자 가이드

### CSS 클래스 명명 규칙

```typescript
// 컴포넌트 기반 클래스명
<div className="stats-card">           // 컴포넌트명
<div className="stats-card__header">   // 컴포넌트__요소명
<div className="stats-card--active">   // 컴포넌트--수정자명
```

### Tailwind 유틸리티 조합 패턴

```typescript
// 기본 패턴: [레이아웃] [간격] [색상] [타이포그래피] [기타]
className="flex items-center gap-4 text-sm text-gray-500 font-mono tracking-wider"

// 상태별 조건부 클래스
className={`text-sm font-bold ${isActive ? 'text-green-600' : 'text-gray-400'}`}
```

### 재사용 가능한 스타일 상수

```typescript
// styles/constants.ts
export const STYLES = {
  containers: {
    main: "max-w-7xl mx-auto",
    stats: "max-w-4xl mx-auto",
    content: "max-w-6xl mx-auto",
  },
  spacing: {
    section: "px-8 py-8",
    header: "px-8 py-6",
    card: "p-6",
  },
  borders: {
    light: "border border-gray-200",
    medium: "border-2 border-gray-300",
  },
} as const;
```

---

## 📋 체크리스트

### 디자인 구현 시 확인사항

- [ ] 컬러 팔레트 준수 (화이트&블랙&그레이만 사용)
- [ ] 타이포그래피 스케일 일관성
- [ ] 간격 시스템 (8px 기준) 준수
- [ ] 모노스페이스 폰트 (숫자/통계)
- [ ] 반응형 동작 확인
- [ ] 접근성 고려 (명도 대비 4.5:1 이상)
- [ ] 트랜지션 일관성

### 성능 최적화

- [ ] Tailwind CSS 클래스 중복 제거
- [ ] 컴포넌트 재사용성 극대화
- [ ] 불필요한 리렌더링 방지
- [ ] 애니메이션 GPU 가속 활용

---

**🎨 이 디자인 시스템을 사용하면 Aira와 같은 전문적이고 세련된 미니멀 인터페이스를 쉽게 구현할 수 있습니다!**
