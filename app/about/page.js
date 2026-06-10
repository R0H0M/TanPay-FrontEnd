// app/about/page.js
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white px-6 py-16 relative overflow-hidden font-iransans">
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-fuchsia-600/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-900/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs font-bold border border-fuchsia-500/20 mb-3 tracking-widest uppercase">
            WE ARE TANPAY
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            درباره پلتفرم هوشمند <span className="text-fuchsia-500 text-glow">تن پی</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            آینده مدیریت رفاهی و تسهیلات اعتباری کارمندان؛ پلی هوشمند میان سازمان‌ها و شبکه‌های بزرگ فروشگاهی کشور.
          </p>
        </div>

        {/* Our Story & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 flex flex-col justify-center hover:border-fuchsia-500/20 transition-all duration-300">
            <h2 className="text-2xl font-black text-fuchsia-400 mb-4">داستان تن پی چیست؟</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              در دنیای پویای امروز، انگیزه و رفاه کارمندان بزرگترین دارایی هر سازمان است. تن پی با هدف حذف فرآیندهای سنتی و ناکارآمد توزیع بن‌های خرید فیزیکی متولد شد. 
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              ما یک پلتفرم اعتبارسنجی دیجیتال و یکپارچه خلق کرده‌ایم که در آن، مدیران شرکت‌ها می‌توانند به سادگی چند کلیک، کیف پول اعتباری کارمندان خود را به صورت کاملاً اختصاصی شارژ کرده و امکان خریدی بدون واسطه، آنی و لذت‌بخش را برای آن‌ها فراهم کنند.
            </p>
          </div>

          <div className="relative rounded-3xl bg-linear-to-br from-zinc-900 via-black to-zinc-950 p-8 border border-fuchsia-500/20 shadow-[0_0_40px_rgba(217,70,239,0.08)] flex flex-col justify-between">
            <div className="absolute top-[-20%] right-[-10%] w-[120px] h-[120px] bg-fuchsia-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div>
              <h2 className="text-2xl font-black text-white mb-4">مأموریت بزرگ ما</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                توسعه اقتصادی و افزایش قدرت خرید کارمندان از طریق متصل کردن هوشمند کارت‌های اعتباری رفاهی به شبکه‌های فروشگاهی معتبر در سرتاسر ایران.
              </p>
            </div>
            
            <div className="border-t border-white/5 pt-4 mt-4 flex justify-between items-center text-xs text-zinc-500">
              <span>سیستم مدیریت اعتبارات سازمان‌ها</span>
              <span className="text-fuchsia-400 font-bold">TANPAY © 2026</span>
            </div>
          </div>

        </div>

        {/* Core Values Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white text-center mb-10">ارزش‌های محوری پلتفرم</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Value 1 */}
            <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-fuchsia-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-xl mb-4 text-fuchsia-400">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">سرعت و سهولت</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">تخصیص اعتبار، فعال‌سازی کیف پول دیجیتال و فرآیند خرید، همگی به صورت آنی و بدون کوچکترین معطلی انجام می‌شود.</p>
            </div>

            {/* Value 2 */}
            <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-fuchsia-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-xl mb-4 text-fuchsia-400">🛡️</div>
              <h3 className="text-lg font-bold text-white mb-2">امنیت بی‌نقص</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">استفاده از پروتکل‌های امنیتی روز دنیا برای محافظت از کیف پول دیجیتال کارمندان و تضمین تراکنش‌های فروشگاهی.</p>
            </div>

            {/* Value 3 */}
            <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-fuchsia-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-xl mb-4 text-fuchsia-400">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">شفافیت کامل مالی</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">گزارش‌گیری دقیق و بلادرنگ برای صاحبان شرکت‌ها از نحوه تخصیص، مصرف اعتبارات و جزئیات تراکنش‌ها.</p>
            </div>

          </div>
        </div>

        {/* CTA (Call To Action) */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 text-center hover:border-fuchsia-500/30 transition-all duration-300">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">می‌خواهید رفاه سازمان خود را متحول کنید؟</h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-8">
            به جمع شرکت‌های همکار TanPay بپیوندید و مزایای رفاهی مدرن‌تری را برای سرمایه‌های انسانی خود به ارمغان آورید.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/company/register">
              <button className="px-8 py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-bold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_40px_rgba(217,70,239,0.45)]">
                شروع همکاری با سازمان شما
              </button>
            </Link>
            <Link href="/login" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold">
              ورود کارمندان و مدیران →
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}