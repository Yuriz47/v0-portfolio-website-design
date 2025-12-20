"use client"

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#10121A] via-[#0A0A0F] to-[#10121A]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card-strong rounded-2xl p-12 md:p-20 space-y-10">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] font-light" style={{ color: "rgb(100, 180, 255)" }}>
                关于我
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                你好，我是一名
                <br />
                UI/UX 设计师
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg font-light text-gray-400 leading-loose tracking-wide">
              <p>
                我是一名充满激情的UI/UX设计师，痴迷于在功能与温度的交汇点打磨设计，深耕 UI
                设计、工业设计领域，同时对无障碍设计的人文关怀与思辨设计的批判性价值抱有强烈探索欲。
              </p>
              <p>
                我的设计理念是"少即是多"——通过精心打磨的细节和深思熟虑的交互，
                为用户创造流畅自然的体验。每一个像素都经过仔细考量。
              </p>
              <p>
                我相信，好的设计从来不是孤芳自赏的艺术，而是解决真实问题、传递人文温度的工具。在课堂学习与实践项目中，我习惯从用户的隐性需求切入
                —— 无论是为视障人群优化的 APP 交互逻辑，还是用思辨视角重构的未来社区服务产品，都在尝试让设计跳出 "好看"
                的表层，触达 "好用""有意义" 的内核。
              </p>
              <p>
                目前的我，正带着对设计的热忱与好奇心，在理论与实践的缝隙中不断试错、迭代。我期待用多元的设计思维，连接创意与现实；更渴望在未来的实习与合作中，碰撞出更多有深度、有社会价值的设计方案。如果你也认同设计的力量，欢迎和我交流！
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              {["UI设计", "UX研究", "无障碍设计", "思辨设计", "工业设计", "Figma"].map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(100, 180, 255, 0.1)",
                    border: "1px solid rgba(100, 180, 255, 0.3)",
                    color: "rgb(100, 180, 255)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
