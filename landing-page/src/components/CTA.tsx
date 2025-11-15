export default function CTA() {
  return (
    <section id="cta" className="py-24 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            지금 시작해보세요
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            대화하면 생각이 정리되고, 글이 써집니다.
            <br />
            Vibe Writing과 함께 글쓰기의 새로운 경험을 시작하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/silverJen/vibe"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <span className="flex items-center gap-2">
                GitHub에서 보기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="https://github.com/silverJen/vibe/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              기여하기
            </a>
          </div>
          
          {/* 추가 정보 */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm">
              오픈소스 프로젝트입니다. 기여와 피드백을 환영합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
