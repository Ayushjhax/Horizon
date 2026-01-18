"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth animation curve (ease-in-out cubic)
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const scrollProgress = Math.min(scrollY / 300, 1); // Complete animation in 300px
  const easedProgress = easeInOutCubic(scrollProgress);

  // Logo and button should converge to become adjacent in a blurred container
  // Logo moves from left toward center, button moves from right toward center
  // Both converge to become adjacent (with small gap between them)
  // Adjusted convergence distance to prevent overlap while staying adjacent
  const logoTranslateX = easedProgress * 520; // Move right toward center (adjusted to prevent overlap)
  const buttonTranslateX = -easedProgress * 520; // Move left toward center (adjusted to prevent overlap)
  
  // Background container opacity increases as they converge
  const containerOpacity = easedProgress * 0.9;
  
  // Nav should move down slightly when scrolling to add gap above
  const navTranslateY = Math.min(scrollY * 0.3, 40); // Move down up to 40px for gap

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation Bar - Always visible, logo and button converge into blurred container */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 px-4 md:px-8 pointer-events-none"
        style={{
          transform: `translateY(${navTranslateY}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          {/* Blurred Background Container - Appears as elements converge */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full px-5 py-2.5 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: containerOpacity,
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(17, 24, 39, 0.6)', // gray-900 with transparency
              border: '1px solid rgba(75, 85, 99, 0.5)', // gray-600 border
              transform: `translateX(-50%)`,
              minWidth: '320px',
            }}
          >
            {/* Invisible spacer to maintain container size when visible */}
            <div className="w-[300px] h-12 md:h-14" />
          </div>

          {/* Logo - Starts at left, converges to center, becomes adjacent to button */}
          <div
            className="absolute left-4 md:left-6 pointer-events-auto z-10"
            style={{
              transform: `translateX(${logoTranslateX}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="relative w-20 h-14 md:w-28 md:h-18 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Horizon Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Join Waitlist Button - Starts at right, converges to center, becomes adjacent to logo */}
          <div
            className="absolute right-4 md:right-6 pointer-events-auto z-10"
            style={{
              transform: `translateX(${buttonTranslateX}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <a
              href="https://forms.gle/k7uLeN46X1zUJWrCA"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-4 py-2 md:px-5 md:py-2.5 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full text-white font-medium text-sm hover:bg-gray-800/90 hover:border-gray-600 transition-all duration-300 flex items-center gap-2 h-11 md:h-12 whitespace-nowrap"
            >
              <span>Join Waitlist</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-end px-6 md:px-8 pb-12 md:pb-16">
        <div className="w-full">
          <div className="max-w-3xl">
            <h1 className="font-great-vibes text-5xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-blue-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent leading-[1] tracking-wider">
              Horizon
            </h1>
            <p className="font-playfair text-2xl md:text-3xl lg:text-4xl font-medium italic mb-4 text-white/90 leading-tight tracking-wide">
            Built for the next era of trading. 
            </p>
            <p className="font-playfair text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl leading-relaxed font-light italic tracking-normal mb-8">
              AI-powered forecasting and hedging of everyday uncertainties via Kalshi markets.
            </p>
            
            {/* Join Waitlist Button - Below Hero Text */}
            <a
              href="https://forms.gle/k7uLeN46X1zUJWrCA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full text-white font-medium text-base md:text-lg hover:bg-gray-800/90 hover:border-gray-600 transition-all duration-300 group"
            >
              <span>Join Waitlist</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="relative z-10 bg-black/95 backdrop-blur-sm">
        {/* About Section */}
        <section className="px-6 md:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-8 text-center">
              Horizon
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed text-center font-inter">
              Horizon harnesses AI and on-chain prediction markets to help you hedge everyday costs and global risks. Our system uses advanced NLP, time-series, and computer-vision models to scan news, economic data, and even weather patterns to forecast threats to your budget or portfolio. Horizon then automatically trades on Kalshi's regulated event markets (now tokenized on Solana via DFlow and Jupiter). Each prediction contract (e.g. "Will inflation exceed 4%?") is tokenized on Solana, so trades settle instantly and transparently on-chain. In short: Horizon brings institutional-grade hedging to both everyday users and advanced investors, by turning real-world events into automated, fully-auditable trades.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-8 py-16 md:py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-12 text-center">
              Features
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Everyday Users */}
              <div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold mb-6 text-blue-400">
                  For Everyday Users
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Hedge Daily Expenses</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      Protect your budget by automatically locking in prices for groceries, gas, rent, etc. using simple event contracts (e.g. inflation rates, fuel prices, crop weather).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Hands-off AI Predictions</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      Horizon's AI continuously monitors news, social media, and global data for signals (like central bank announcements or weather alerts) and adjusts hedges in real time. You don't need to watch the markets – we do it for you.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Easy & Secure</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      No trading or crypto expertise is needed. Horizon's interface speaks plain language, and behind the scenes all trades use Kalshi's CFTC-regulated markets for compliance. Your funds move through on-chain contracts (non-custodial and transparent) so you always see where your money is.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Peace of Mind</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      Know that you're protected against big surprises. Horizon turns "what-if" fears (What if winter fuel prices spike?) into automatic hedges, giving you confidence in the face of uncertainty.
                    </p>
                  </div>
                </div>
              </div>

              {/* Advanced Traders */}
              <div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold mb-6 text-orange-400">
                  For Advanced Traders / Portfolio Builders
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Event-Driven Trading</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      Directly trade on macro events and geopolitical outcomes. Take positions on CPI prints, Fed rate changes, elections, weather disasters, commodity prices and more. This lets you hedge or speculate with precision.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Automated Strategy Execution</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      Program your own rules and let our AI act as your trading assistant. Horizon links signals from machine learning models to auto-execution on Solana, using a high-speed "hybrid RFQ" system via DFlow/Jupiter. The result is fast, atomic trades that keep you ahead of moving markets.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Deep Liquidity & Speed</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      By tapping Solana's ecosystem and Kalshi's new tokenized markets, Horizon offers tight spreads and instant settlement. You get the "deepest prediction market liquidity layer in the world" with millisecond finality, so even large hedge orders fill instantly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 font-inter">Composable Portfolio Tools</h4>
                    <p className="text-white/70 leading-relaxed font-inter">
                      Treat event contracts like any other asset. Integrate hedges into your DeFi vaults or portfolios – for example, use them to offset stock risk or create leveraged baskets combining equities, futures, and event bets. Horizon also supports arbitrage and spread strategies between on-chain and off-chain prices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-8 py-16 md:py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">
                Still wondering how it works?
              </h2>
              <h3 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-12">
                FAQ
              </h3>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <FAQItem
                question="How does this work?"
                answer={`Horizon's AI scans news and data (economic reports, social media, satellite weather feeds, etc.) to gauge risks like inflation jumps or storms. When a risk rises, it automatically buys or sells "Yes/No" shares on a prediction market corresponding to that event. For example, if groceries are going to get expensive, Horizon might buy a "Yes" share in an event like "CPI inflation > 4%" to offset your cost increase. All trading happens on Kalshi's markets, which are now tokenized on Solana via DFlow and Jupiter. In practice this means trades are executed on-chain in a single step (a hybrid RFQ system), giving you instant, transparent hedges against the predicted outcome.`}
              />
              <FAQItem
                question="Is it safe?"
                answer={`Yes. Horizon uses Kalshi – the first CFTC-regulated prediction market – so every contract and payout is overseen by regulators. Trades settle on Solana's blockchain, which is public and non-custodial (no one can run away with your funds). In fact, Kalshi's tokenized markets are "non-custodial, instant, and crypto native", meaning each trade is governed by smart contracts you can audit. That said, prediction markets are speculative by nature, so we always advise setting sensible limits and understanding that hedges can reduce losses but not eliminate risk entirely.`}
              />
              <FAQItem
                question="Do I need crypto?"
                answer="You will use crypto indirectly. Horizon routes all trades through Solana's ecosystem, so you'll connect a Solana-compatible wallet (e.g. Phantom) to trade using a stablecoin like USDC. However, you don't need to be a blockchain expert. Horizon provides a simple interface and on-ramps: for example, you can fund your account with a bank card, and we convert it to the required token. The platform shows exactly how much crypto is needed for each hedge. In short: you don't need prior crypto experience, but all transactions happen on-chain for speed and transparency."
              />
              <FAQItem
                question="What are prediction markets?"
                answer={`A prediction market is like a stock exchange for future events. Instead of trading company shares, you trade contracts whose price reflects the probability of an event (e.g. "Will it rain tomorrow?" or "Will inflation exceed 4%?"). Each share costs between $0 and $1. If you buy a share on the outcome you believe will happen (say "Yes" for inflation >4%), and that outcome occurs, each winning share pays out $1. If the outcome doesn't occur, your shares expire worth nothing. The current price of the share (say $0.60) effectively signals a 60% chance of that event. In other words, you earn money if you buy low and the outcome happens. This lets anyone hedge or speculate on real-world risks.`}
              />
              <FAQItem
                question="Can I trust the AI?"
                answer="We build Horizon's AI with strong safeguards. The models are regularly tested on historical data and overseen by financial experts. In fact, many financial firms rely on predictive analytics: surveys show 77% of wealth managers say AI-driven forecasts improve their decisions. Still, Horizon's AI is just a tool. We recommend users monitor and adjust settings as needed. All trades remain your choice – the AI suggests probabilities and automates execution, but you can review every move. We also continually refine the algorithms, and you can disable or stop any automation at any time. In practice, our hybrid approach (AI plus oversight) has proven reliable for identifying trends like weather or inflation impacts."
              />
              <FAQItem
                question="Can I make money using this?"
                answer="Prediction markets can be profitable, but they carry risk – just like stock trading or poker. Success often comes from finding mispriced opportunities or hedging existing exposures. For example, if you own stocks that might drop when rates rise, a winning bet on a Fed hike can offset that loss. Horizon provides advanced tools to seek these edges, but we never promise gains. Users should treat Horizon primarily as a risk management tool: it can protect or improve your financial outcome if events unfold in your favor, but losses are always possible. Always start small, understand the odds (prices), and only invest what you're comfortable risking."
              />
              <FAQItem
                question="Is it free? What are the fees?"
                answer="Horizon itself has no subscription fee – you only pay the standard transaction fees of the markets and blockchain. Kalshi charges a small commission on your winning trades (a percentage of the profit, visible before you trade). There are no hidden costs, and you pay only when your trade succeeds. You will also pay Solana network fees (typically just a few cents per transaction) when trades execute. The app always displays the fee upfront, so there are no surprises."
              />
              <FAQItem
                question="Who is this built for?"
                answer="Horizon is built for everyone who cares about real-world financial risks. That includes the everyday consumer – say, a young family worried about rising grocery bills or oil prices – as well as professional traders and portfolio managers seeking to automate event-driven strategies. If you pay rent, buy gas, or invest in markets, Horizon can help protect you. Its friendly interface makes sophisticated hedging accessible to non-experts, while its programmable features offer power users a way to integrate macro event trading into a larger portfolio."
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-8 py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/60 font-inter">
              © {new Date().getFullYear()} Horizon. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 group"
      >
        <span className="font-semibold text-lg md:text-xl font-inter">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-white/70 leading-relaxed font-inter">{answer}</p>
        </div>
      )}
    </div>
  );
}
