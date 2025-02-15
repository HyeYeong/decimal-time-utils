/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/decimal-time-utils", // 리포지토리 이름을 basePath로 설정
  assetPrefix: "/decimal-time-utils/", // 정적 파일 경로 설정
  trailingSlash: true, // 슬래시 추가로 GitHub Pages 호환성 향상
  images: {
    unoptimized: true, // GitHub Pages에서는 이미지 최적화 기능을 사용할 수 없으므로 비활성화
  },
};

module.exports = nextConfig;
