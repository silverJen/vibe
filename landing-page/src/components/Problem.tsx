export default function Problem() {
  const problems = [
    {
      title: "글은 쓰고 싶은데 혼자 앉으면 막막하다",
      description: "할 말은 많은데 막상 글을 쓰려고 하면 어디서부터 시작해야 할지 모르겠다. 빈 화면을 보며 시간만 흘러간다.",
      icon: "😰",
    },
    {
      title: "ChatGPT 글은 잘 쓰였지만 내 글 같지 않다",
      description: "AI가 생성한 글은 문법적으로 완벽하지만, 내 톤과 스타일이 아니다. 결국 처음부터 다시 써야 한다.",
      icon: "🤖",
    },
    {
      title: "말하면 생각은 정리되지만, 그 대화가 글로 이어지지 않는다",
      description: "대화로는 생각이 명확해지는데, 그 내용을 글로 옮기려니 또 막힌다. 전사만으로는 부족하다.",
      icon: "💬",
    },
  ];

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-medium text-primary-700">문제점</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              글쓰기의 3가지 고민
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              많은 사람들이 겪는 글쓰기의 어려움
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* 번호 배지 */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                
                {/* 아이콘 */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {problem.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                    {problem.title}
                  </h3>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-center">
                  {problem.description}
                </p>
                
                {/* 호버 시 장식 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
