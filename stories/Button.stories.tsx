import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, ButtonProps } from './Button' // 直接從 Button.tsx 引入 ButtonProps

// Storybook 的元數據，現在完全對應你的 ButtonProps
const meta: Meta<ButtonProps> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  // argTypes 現在對應 primary, backgroundColor, size, label
  argTypes: {
    primary: {
      control: 'boolean',
      description: '是否為主要按鈕',
    },
    backgroundColor: {
      control: 'color',
      description: '按鈕的背景顏色',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '按鈕的尺寸',
    },
    label: {
      control: 'text',
      description: '按鈕內顯示的文字',
    },
    onClick: {
      action: 'clicked', // 在 Storybook 的 Actions 面板中記錄點擊事件
      description: '點擊事件處理器',
    },
  },
}

export default meta
type Story = StoryObj<ButtonProps>

// 主要按鈕的 Story
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
}

// 次要按鈕的 Story
export const Secondary: Story = {
  args: {
    // primary 預設為 false，所以可以不寫
    primary: false,
    label: 'Secondary Button',
  },
}

// 大尺寸按鈕的 Story
export const Large: Story = {
  args: {
    primary: true,
    size: 'large',
    label: 'Large Button',
  },
}

// 小尺寸按鈕的 Story
export const Small: Story = {
  args: {
    primary: true,
    size: 'small',
    label: 'Small Button',
  },
}

// 帶有自訂背景顏色的 Story
export const CustomBackgroundColor: Story = {
  args: {
    primary: false,
    label: 'Custom Color',
    backgroundColor: '#ffc0cb', // 範例顏色：粉紅色
  },
}
