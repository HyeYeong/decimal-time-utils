/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/decimal-time-utils", // 리포지토리 이름을 basePath로 설정
  images: {
    unoptimized: true, // GitHub Pages에서는 이미지 최적화 기능을 사용할 수 없으므로 비활성화
  },
};

module.exports = nextConfig;
