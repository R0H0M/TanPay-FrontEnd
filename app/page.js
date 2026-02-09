import Link from "next/link";
import Header from "./component/headerFile/Header"


export default function HomePage() {
  console.log(process.env.API_URL);
  return (
    <>
    <Header />  
    <main dir="rtl" className="bg-black text-white font-iransans">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.25),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            اعتبار هوشمند برای
            <span className="text-fuchsia-400"> کارکنان هوشمند</span>
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-lg mb-10 leading-relaxed">
            ما به شرکت‌ها کمک می‌کنیم تا بدون فشار مالی،
            اعتبار خرید منعطف به کارکنان خود بدهند —
            قابل استفاده در فروشگاه‌های معتبر طرف قرارداد.
          </p>

          <div className="flex justify-center gap-4">
            <Link href='/company/register'>
            <button className="px-8 py-4 bg-fuchsia-500 text-black rounded-xl font-semibold
                               hover:bg-fuchsia-400 transition
                               shadow-[0_0_25px_rgba(217,70,239,0.6)]">
              شروع همکاری
            </button>
            </Link>

            <button className="px-8 py-4 border border-fuchsia-500/40 rounded-xl
                               text-fuchsia-400 hover:bg-fuchsia-500/10 transition">
              ویژه شرکت‌ها
            </button>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          چگونه کار می‌کند؟
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: 'اختصاص اعتبار توسط شرکت',
              text: 'شرکت شما اعتبار ماهانه یا سالانه برای کارکنان تعیین می‌کند.'
            },
            {
              title: 'خرید آزاد کارکنان',
              text: 'کارکنان از فروشگاه‌های طرف قرارداد بدون دردسر خرید می‌کنند.'
            },
            {
              title: 'تسویه خودکار',
              text: 'پرداخت‌ها به‌صورت خودکار بین شرکت و فروشگاه‌ها تسویه می‌شود.'
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-fuchsia-500/20 rounded-2xl p-8
                         hover:shadow-[0_0_30px_rgba(217,70,239,0.35)] transition"
            >
              <div className="text-fuchsia-400 text-5xl font-bold mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-zinc-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            چرا شرکت‌ها ما را انتخاب می‌کنند؟
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <ul className="space-y-6 text-zinc-300 text-lg">
              <li>✔ افزایش رضایت و وفاداری کارکنان</li>
              <li>✔ بدون پرداخت نقدی یا مساعده حقوق</li>
              <li>✔ کنترل کامل سقف اعتبار</li>
              <li>✔ گزارش‌گیری شفاف و دقیق</li>
            </ul>

            <div className="bg-zinc-900 rounded-2xl p-10 border border-fuchsia-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-fuchsia-400">
                طراحی‌شده برای مقیاس‌پذیری
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                چه ۲۰ کارمند داشته باشید چه ۲۰ هزار نفر،
                پلتفرم ما بدون افت عملکرد همراه شما رشد می‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARTNER STORES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          فروشگاه‌های طرف قرارداد
        </h2>

        <p className="text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
          کارکنان می‌توانند از فروشگاه‌های منتخب در حوزه‌های
          لوازم دیجیتال، سوپرمارکت، سبک زندگی و بیشتر خرید کنند.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
          {['دیجی‌استور', 'هایپرمارکت', 'فروشگاه پوشاک', 'کالای دیجیتال'].map(store => (
            <div
              key={store}
              className="bg-zinc-900 rounded-xl py-8 border border-zinc-800"
            >
              {store}
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      {/* <section className="py-24 text-center bg-linear-to-t from-black to-zinc-950">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          آماده توانمندسازی کارکنان خود هستید؟
        </h2>
        <p className="text-zinc-400 mb-10">
          به جمع شرکت‌هایی بپیوندید که هوشمندانه در نیروی انسانی سرمایه‌گذاری می‌کنند.
        </p>

        <button className="px-10 py-4 bg-fuchsia-500 text-black rounded-xl font-semibold
                           hover:bg-fuchsia-400 transition
                           shadow-[0_0_30px_rgba(217,70,239,0.6)]">
          درخواست دمو
        </button>
      </section> */}

    </main>

    </>
      )
}
