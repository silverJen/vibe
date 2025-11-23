# Vibe Writing Design Guidelines

## Design Approach
**Hybrid Reference + Custom Aesthetic**
- Primary Reference: **Toss** for simplicity, intuitive interactions, and clean information hierarchy
- Color Philosophy: Spring bright tone with pastel blue/mint palette
- All UI text in Korean language
- Focus: Conversational warmth meets productivity efficiency

## Core Design Principles
1. **Gentle Clarity**: Information should be immediately understandable without visual noise
2. **Conversational Comfort**: Interface feels like a supportive companion, not a tool
3. **Progressive Disclosure**: Reveal complexity only when needed
4. **Tactile Feedback**: Interactions feel responsive and satisfying

## Typography
**Font Stack**: Pretendard (via CDN) as primary Korean font
- Headings: 24px-32px, weight 700
- Body text: 15px-16px, weight 500
- Small text/labels: 13px-14px, weight 400
- Chat messages: 15px, weight 500, line-height 1.6 for readability
- Button text: 15px, weight 600

## Layout System
**Spacing Units**: Tailwind primitives - 2, 3, 4, 6, 8, 12, 16 units
- Card padding: p-6 to p-8
- Section spacing: space-y-6 to space-y-8
- Button padding: px-6 py-3
- Container max-width: max-w-4xl for main content, max-w-6xl for session list

**Grid & Columns**:
- Session list: Single column on mobile, 2 columns (md:grid-cols-2) on tablet+
- Chat interface: Full-width single column with centered messages (max-w-3xl)
- Draft blocks: Single column for focused editing experience

## Component Library

### Navigation & Header
- Fixed top header with logo "vibe writing" (left)
- Height: h-16
- Background: White with subtle shadow
- Logo: Medium weight, pastel blue accent

### Session Cards
- Rounded corners (rounded-2xl)
- White background with soft shadow (shadow-sm hover:shadow-md transition)
- Border: 1px solid with very light blue tint
- Padding: p-6
- Display: Session title (font-semibold), date (text-sm text-gray-500), status badge
- Status badges: Pill-shaped with pastel backgrounds ("인터뷰 중": mint, "초고 생성됨": light blue)

### Chat Interface
- Message bubbles with distinct alignment:
  - User (left): Pastel blue background (bg-blue-50), rounded-2xl rounded-bl-sm
  - AI (right): White background with light gray border, rounded-2xl rounded-br-sm
- Bubble padding: px-4 py-3
- Max width per bubble: max-w-md to max-w-lg
- Spacing between messages: space-y-4
- Timestamp: Small gray text below bubbles

### Input Components
- Text input field:
  - Border: 2px solid light gray, focus:border-blue-300
  - Rounded: rounded-xl
  - Padding: px-4 py-3
  - Placeholder in soft gray
- Voice button:
  - Circular with microphone icon
  - Pastel mint background
  - Size: w-12 h-12
  - Recording state: Pulsing animation with darker mint

### Buttons
**Primary CTA**: 
- Pastel blue background (hover: slightly darker)
- White text, font-semibold
- Rounded: rounded-xl
- Padding: px-6 py-3
- Shadow: shadow-sm hover:shadow transition

**Secondary**:
- White background with pastel blue border
- Blue text
- Same rounding and padding

**Icon buttons**: 
- Minimal style with pastel background on hover
- Size: w-10 h-10, rounded-lg

### Draft Blocks
- Card-based layout with left border indicator:
  - User source: 4px left border in pastel blue, bg-blue-50/30
  - AI source: 4px left border in gray-300, bg-gray-50/30
- Rounded: rounded-xl
- Padding: p-5
- Content editable area with minimal styling
- Action buttons (문단 다듬기, 삭제) appear on hover, small size at bottom-right
- Space between blocks: space-y-4

### Modals & Overlays
- Backdrop: Semi-transparent dark overlay
- Modal content: White, rounded-2xl, max-w-lg, p-8
- Close button: Top-right, subtle gray

### Loading States
- Korean text: "대화를 불러오는 중입니다...", "초고를 생성하는 중이에요..."
- Spinner: Simple circular with pastel blue color
- Centered with adequate spacing

### Toast Notifications
- Bottom-center positioning
- Rounded: rounded-xl
- Background: White with shadow-lg
- Success: Left border in mint green
- Error: Left border in soft coral
- Padding: px-5 py-4, flex with icon + text

## Visual Details

**Shadows**: 
- Subtle throughout (shadow-sm, shadow-md)
- Never harsh or dark

**Borders**:
- 1px standard, 2px for inputs
- Colors: gray-200 to blue-100 range

**Transitions**:
- Duration: 200ms for most interactions
- Ease-out timing for natural feel

**Icons**:
- Heroicons library (outline style primarily)
- Size: w-5 h-5 standard, w-6 h-6 for prominent actions

## Page-Specific Layouts

### Session List (/)
- Welcome message at top: "오늘은 어떤 이야기를 기록해볼까요?" (text-2xl, font-bold, center-aligned)
- Primary CTA button prominently placed below welcome message
- Session cards grid with generous spacing
- Empty state: Centered message with illustration placeholder

### New Session Modal
- Simple vertical form layout
- Fields clearly labeled in Korean
- Topic tag selector: Horizontal pill buttons (커리어, 제품, 삶, 기타)
- Language selector: Two-option toggle (한국어 selected by default)
- Submit button: "인터뷰 시작" full-width at bottom

### Interview Chat (/sessions/[id])
- Session info card at top (title, tag, language)
- Helpful message: "편하게 말해보세요..." below session info
- Scrollable chat area in center (flex-1)
- Fixed bottom input area with text field + voice button side-by-side
- "초고 만들기" button in top-right when conditions met (floating or header-aligned)

### Draft Editing (/sessions/[id]/draft)
- Title selection at top (radio buttons or simple dropdown)
- Draft blocks rendered in order with clear visual hierarchy
- "전체 초고 복사하기" button at bottom, prominent
- Each block independently editable with action buttons revealed on hover

## Animations
**Minimal & Purposeful**:
- Button hover: Subtle scale (scale-105) or shadow increase
- Modal entrance: Fade + slight slide up (100ms)
- Voice recording: Gentle pulse on microphone button
- Loading spinners: Smooth rotation
- Toast: Slide up from bottom (200ms)

No complex scroll-triggered or decorative animations.

## Images
No large hero images required. This is a utility-focused tool where content and functionality take precedence. Small illustrative icons or empty state graphics acceptable but not essential.