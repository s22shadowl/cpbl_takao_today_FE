// components/ui/Tabs.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  // 使用 subcomponents 來告訴 Storybook 這個元件包含哪些子元件
  subcomponents: { TabsList, TabsTrigger, TabsContent },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

// 預設的 Tabs 展示
export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="account" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="account">帳號</TabsTrigger>
        <TabsTrigger value="password">密碼</TabsTrigger>
        <TabsTrigger value="notifications">通知</TabsTrigger>
      </TabsList>
      <TabsContent value="account">這裡是「帳號」設定的相關內容。</TabsContent>
      <TabsContent value="password">這裡是「密碼」設定的相關內容。</TabsContent>
      <TabsContent value="notifications">這裡是「通知」設定的相關內容。</TabsContent>
    </Tabs>
  ),
}
