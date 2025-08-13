import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import { NextConfig } from 'next'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  // 你可以在這裡加入其他 Next.js 的設定
}

export default withVanillaExtract(nextConfig)
