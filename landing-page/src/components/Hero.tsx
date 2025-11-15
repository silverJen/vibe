export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-primary-50/30">
      {/* 배경 그라데이션 메시 */}
      <div className="absolute inset-0 gradient-mesh"></div>
      
      {/* 애니메이션 배경 원들 - 봄 브라이트 톤 */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-200 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">인터뷰 기반 글쓰기 도구</span>
          </div>
          
          {/* 태그라인 */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            대화하면 생각이 정리되고,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 animate-gradient">
              글이 써진다
            </span>
          </h1>
          
          {/* 서브헤드라인 */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            AI와 대화(음성/텍스트)하며 생각을 정리하면
            <br />
            그 대화를 기반으로{" "}
            <span className="font-bold text-gray-800 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              내가 한 말이 70~80%를 차지하는 초고
            </span>
            를 자동 생성합니다
          </p>
          
          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://github.com/silverJen/vibe"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-primary-400 to-secondary-400 text-white rounded-xl font-semibold text-lg hover:from-primary-500 hover:to-secondary-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <span className="flex items-center gap-2">
                GitHub에서 보기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-gray-900 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:border-primary-400 hover:text-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              기능 알아보기
            </a>
          </div>
          
          {/* 통계 또는 특징 미리보기 */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">70~80%</div>
              <div className="text-sm text-gray-600">내 말 기반</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">음성/텍스트</div>
              <div className="text-sm text-gray-600">자유로운 대화</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">자동</div>
              <div className="text-sm text-gray-600">초고 생성</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
