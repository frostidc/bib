import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  // Handle Mouse Movement for Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sequence Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  // Generate binary code rain particles
  const [particles] = useState(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 5}s`,
      delay: `${Math.random() * -5}s`,
      opacity: Math.random() * 0.3 + 0.1,
      char: Math.random() > 0.5 ? '1' : '0'
    }))
  );

  const handleCopy = () => {
    const code = `javascript:(function() {
    const old = document.getElementById('frost-extreme');
    if (old) old.remove();

    // 1. CSS Geliştirmeleri (Shadow DOM veya Direct Inject kullanarak engelleri aşma denemesi)
    const style = document.createElement('style');
    style.innerHTML = \`
        @keyframes rain { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(1000%); opacity: 0; } }
        @keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }
        
        #frost-loader {
            position: fixed; inset: 0; background: #050505; z-index: 2147483647;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: 'Courier New', monospace; color: #00D4FF; overflow: hidden;
        }
        .matrix-rain { position: absolute; top: 0; font-size: 10px; animation: rain 2s linear infinite; pointer-events: none; }
        
        #frost-extreme {
            position: fixed; top: 50px; left: 50px; width: 280px;
            background: rgba(5, 5, 10, 0.98); border: 2px solid #00f2ff;
            border-radius: 4px; z-index: 2147483646; color: white; display: none;
            padding: 0; font-family: 'Courier New', monospace; box-shadow: 0 0 30px #00f2ff66;
        }
        #frost-header { padding: 12px; background: #00f2ff; color: black; font-weight: bold; cursor: move; display: flex; justify-content: space-between; border-bottom: 2px solid #00c2cc; }
        .f-body { padding: 15px; position: relative; overflow: hidden; }
        .f-body::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: rgba(0,242,255,0.2); animation: scanline 4s linear infinite; pointer-events: none; }
        
        .f-btn { width: 100%; padding: 12px; margin-top: 10px; border: 1px solid #00f2ff; background: transparent; color: #00f2ff; font-weight: bold; cursor: pointer; transition: 0.3s; text-transform: uppercase; }
        .f-btn:hover { background: #00f2ff; color: black; }
        
        .toggle-container { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 12px; color: #00f2ff; }
        .switch { position: relative; display: inline-block; width: 44px; height: 20px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; inset: 0; background-color: #111; border: 1px solid #00f2ff; transition: .4s; border-radius: 20px; }
        .slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 3px; background-color: #00f2ff; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: rgba(0, 242, 255, 0.4); }
        input:checked + .slider:before { transform: translateX(22px); }

        .f-log { font-size: 10px; color: #00D4FF; margin-top: 15px; height: 60px; border-top: 1px solid #333; padding-top: 8px; overflow-y: auto; scrollbar-width: none; }
    \`;
    document.head.appendChild(style);

    // 2. Loading Screen
    const loader = document.createElement('div');
    loader.id = 'frost-loader';
    let rainDrops = '';
    for(let i=0; i<60; i++) {
        rainDrops += \`<div class="matrix-rain" style="left:\${Math.random()*100}%; animation-delay:\${Math.random()*2}s">\${Math.random()>0.5?'1':'0'}</div>\`;
    }
    loader.innerHTML = \`\${rainDrops}<div style="z-index:10;text-align:center;"><h1 style="letter-spacing:8px;">FROST_V3</h1><p id="l-status">CONNECTING...</p></div>\`;
    document.body.appendChild(loader);

    // 3. Panel
    const panel = document.createElement('div');
    panel.id = 'frost-extreme';
    panel.innerHTML = \`
        <div id="frost-header"><span>> PHANTOM_HUD</span><span style="cursor:pointer" onclick="this.parentElement.parentElement.remove()">✕</span></div>
        <div class="f-body">
            <button id="f-run" class="f-btn">RUN EXPLOIT</button>
            <div class="toggle-container">
                <span>AUTO-FARM MODE</span>
                <label class="switch">
                    <input type="checkbox" id="f-auto">
                    <span class="slider"></span>
                </label>
            </div>
            <div id="f-status" class="f-log">SYS: AWAITING_CMD...</div>
        </div>
    \`;
    document.body.appendChild(panel);

    // 4. Animasyon & Geçiş
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        document.getElementById('l-status').innerText = progress < 100 ? \`BYPASSING... \${progress}%\` : "READY!";
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => { 
                loader.remove(); 
                panel.style.display = 'block'; 
            }, 500);
        }
    }, 150);

    // 5. Sürükleme
    let isDragging = false, offset = { x: 0, y: 0 };
    panel.querySelector('#frost-header').onmousedown = (e) => {
        isDragging = true;
        offset = { x: e.clientX - panel.offsetLeft, y: e.clientY - panel.offsetTop };
    };
    document.onmousemove = (e) => {
        if (isDragging) {
            panel.style.left = (e.clientX - offset.x) + "px";
            panel.style.top = (e.clientY - offset.y) + "px";
        }
    };
    document.onmouseup = () => isDragging = false;

    // 6. Solver Mantığı
    async function sequence() {
        const logger = document.getElementById('f-status');
        const autoMode = document.getElementById('f-auto').checked;
        const inputs = document.querySelectorAll('input.sc-if72bi-1, input[data-qa-input-enabled="true"]');
        const submitBtn = document.querySelector('div[data-qa-id="math-level-button"], button[type="submit"]');

        if (inputs.length === 0) { logger.innerHTML += "<br>> ERR: NO_INPUTS"; return; }

        logger.innerHTML += "<br>> INJECTING...";
        inputs.forEach(input => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            setter.call(input, "0"); 
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });

        if (submitBtn) submitBtn.click();
        await new Promise(r => setTimeout(r, 1500));

        let found = false;
        inputs.forEach(input => {
            const parent = input.closest('[correctvalue]');
            if (parent) {
                const val = parent.getAttribute('correctvalue');
                const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                setter.call(input, val);
                input.dispatchEvent(new Event('input', { bubbles: true }));
                found = true;
            }
        });

        if (found) {
            logger.innerHTML += "<br>> SUCCESS: DATA_FIXED";
            setTimeout(() => { if (submitBtn) submitBtn.click(); }, 500);
            
            if (autoMode) {
                logger.innerHTML += "<br>> AUTO: NEXT_IN_3S";
                setTimeout(() => {
                    const next = document.querySelector('button[aria-label="Next"], .next-btn'); // Sitenin next butonuna göre güncelle
                    if (next) {
                        next.click();
                        setTimeout(sequence, 3000);
                    }
                }, 3000);
            }
        }
    }
    document.getElementById('f-run').onclick = sequence;
})();`;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#050505] overflow-hidden selection:bg-[#00D4FF] selection:text-black font-mono">
      
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fill-in {
          to { fill-opacity: 0.1; }
        }
        @keyframes glitch-anim {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 2px #00D4FF); opacity: 0.8; }
          50% { filter: drop-shadow(0 0 10px #00D4FF); opacity: 1; }
        }
        @keyframes rain {
          0% { transform: translateY(-10vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        
        .animate-draw { animation: draw 3s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .animate-fill { animation: fill-in 2s ease-out 2s forwards; }
        .animate-glitch { animation: glitch-anim 0.3s infinite linear alternate-reverse; }
        .animate-pulse-glow { animation: pulse-glow 3s infinite ease-in-out; }
        
        .scanlines {
          background: linear-gradient(to bottom, rgba(0, 212, 255, 0.03) 50%, rgba(0,0,0,0) 50%);
          background-size: 100% 3px;
        }
        
        .fade-up-enter { opacity: 0; transform: translateY(20px); transition: opacity 1s ease-out, transform 1s ease-out; }
        .fade-up-active { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* --- BACKGROUND LAYER --- */}
      
      {/* Code Rain / Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 font-mono text-[10px] text-[#00D4FF]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: p.left,
              opacity: p.opacity,
              animation: `rain ${p.animationDuration} linear infinite`,
              animationDelay: p.delay,
            }}
          >
            {p.char}
          </div>
        ))}
      </div>

      {/* Vignette & Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-20 scanlines pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]"></div>

      {/* --- CONTENT LAYER --- */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center space-y-12 p-4 perspective-1000"
        style={{
          transform: `
            translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)
            rotateX(${mousePos.y * 1}deg)
            rotateY(${mousePos.x * 1}deg)
          `,
          transition: 'transform 0.1s ease-out'
        }}
      >
        
        {/* HEADER TEXT */}
        <div className={`text-center space-y-2 ${animationComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-500`}>
             <h3 className="text-[#00D4FF] tracking-[0.5em] text-xs font-bold uppercase">Private Build</h3>
        </div>

        {/* LOGO CONTAINER */}
        <div className="relative w-full max-w-4xl px-4 drop-shadow-2xl group">
          
          {/* Glitch Shadow Layer */}
          <div className={`absolute inset-0 opacity-0 ${animationComplete ? 'group-hover:opacity-40 animate-glitch' : ''} transition-opacity duration-200 mix-blend-screen pointer-events-none`}>
            <svg viewBox="0 0 550 130" fill="none" className="w-full h-auto stroke-red-500/50">
               <path d="M13.192 25.352V125H26.296V79.64H62.872V68.84H26.296V36.152H67.192V25.352H13.192Z" strokeWidth="2"/>
               <path d="M136.733 125L112.829 83.96H96.989V125H83.885V24.632H116.285C123.869 24.632 130.253 25.928 135.437 28.52C140.717 31.112 144.653 34.616 147.245 39.032C149.837 43.448 151.133 48.488 151.133 54.152C151.133 61.064 149.117 67.16 145.085 72.44C141.149 77.72 135.197 81.224 127.229 82.952L152.429 125H136.733Z" strokeWidth="2"/>
               <path d="M215 25C187.386 25 165 47.3858 165 75C165 102.614 187.386 125 215 125C242.614 125 265 102.614 265 75C265 47.3858 242.614 25 215 25Z" strokeWidth="2"/>
               <path d="M335 45C335 35 328 25 310 25C292 25 285 35 285 45C285 65 335 65 335 95C335 115 320 125 310 125C290 125 285 110 285 105" strokeWidth="2"/>
               <path d="M410 25V35H382V125H369V35H341V25H410Z" strokeWidth="2"/>
            </svg>
          </div>

          {/* Main Logo */}
          <svg
            viewBox="0 0 550 130"
            className="w-full h-auto overflow-visible relative z-10"
            fill="none"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <g className="animate-fill" fill="#eaeaea" fillOpacity="0">
                {/* F */}
                <path 
                d="M13.192 25.352V125H26.296V79.64H62.872V68.84H26.296V36.152H67.192V25.352H13.192Z" 
                stroke="#eaeaea" 
                strokeWidth="2" 
                className="animate-draw" 
                strokeDasharray="1000" 
                strokeDashoffset="1000"
                />
                
                {/* R */}
                <path 
                d="M136.733 125L112.829 83.96H96.989V125H83.885V24.632H116.285C123.869 24.632 130.253 25.928 135.437 28.52C140.717 31.112 144.653 34.616 147.245 39.032C149.837 43.448 151.133 48.488 151.133 54.152C151.133 61.064 149.117 67.16 145.085 72.44C141.149 77.72 135.197 81.224 127.229 82.952L152.429 125H136.733ZM96.989 73.448H116.285C123.389 73.448 128.717 71.72 132.269 68.264C135.821 64.712 137.597 60.008 137.597 54.152C137.597 48.2 135.821 43.592 132.269 40.328C128.813 37.064 123.485 35.432 116.285 35.432H96.989V73.448Z" 
                stroke="#eaeaea" 
                strokeWidth="2" 
                className="animate-draw" 
                strokeDasharray="1000" 
                strokeDashoffset="1000"
                />
                
                {/* O */}
                <path 
                d="M215 25C187.386 25 165 47.3858 165 75C165 102.614 187.386 125 215 125C242.614 125 265 102.614 265 75C265 47.3858 242.614 25 215 25ZM215 36C236.539 36 254 53.4609 254 75C254 96.5391 236.539 114 215 114C193.461 114 176 96.5391 176 75C176 53.4609 193.461 36 215 36Z" 
                stroke="#eaeaea" 
                strokeWidth="2" 
                className="animate-draw" 
                strokeDasharray="1000" 
                strokeDashoffset="1000"
                />
                
                {/* S */}
                <path 
                d="M335 45C335 35 328 25 310 25C292 25 285 35 285 45C285 65 335 65 335 95C335 115 320 125 310 125C290 125 285 110 285 105" 
                stroke="#eaeaea" 
                strokeWidth="8" 
                strokeLinecap="round" 
                fill="none" 
                className="animate-draw" 
                strokeDasharray="1000" 
                strokeDashoffset="1000"
                />
                
                {/* T */}
                <path 
                d="M410 25V35H382V125H369V35H341V25H410Z" 
                stroke="#eaeaea" 
                strokeWidth="2" 
                className="animate-draw" 
                strokeDasharray="1000" 
                strokeDashoffset="1000"
                />
            </g>

            {/* Shard Icon */}
            <g className={animationComplete ? 'animate-pulse-glow' : ''}>
              <path 
                d="M488.661 120.503C493.958 123.501 499.817 125 506.24 125C512.728 125 518.621 123.501 523.918 120.503C529.215 117.439 533.386 113.208 536.432 107.812C539.477 102.416 541 96.2872 541 89.4254C541 82.5637 539.477 76.4347 536.432 71.0386C533.386 65.6424 521.215 57.4454 515.918 54.4476L436.5 0L475.048 101.812C478 112 483.364 117.439 488.661 120.503Z" 
                stroke="#00D4FF" 
                strokeWidth="3" 
                fill="rgba(0, 212, 255, 0.2)"
                className="animate-draw"
                strokeDasharray="1500" 
                strokeDashoffset="1500"
              />
            </g>
          </svg>
        </div>

        {/* VERSION TAG */}
        <div className={`flex items-center gap-3 px-4 py-1 border-l-2 border-[#00D4FF] bg-[#00D4FF]/5 ${animationComplete ? 'fade-up-active' : 'fade-up-enter'}`} style={{transitionDelay: '200ms'}}>
             <span className="text-gray-400 text-xs">site:</span>
             <span className="text-[#00D4FF] font-bold tracking-widest">https://learn.algoritmika.az/</span>
        </div>

        {/* BUTTON */}
        <div className={`h-24 flex flex-col items-center justify-center gap-2 ${animationComplete ? 'fade-up-active' : 'fade-up-enter'}`} style={{transitionDelay: '400ms'}}>
          <button
            onClick={handleCopy}
            className={`
              group relative px-16 py-6 
              bg-black/50 backdrop-blur-sm
              border border-[#00D4FF]/30 
              text-white font-bold tracking-[0.2em] uppercase text-sm
              transition-all duration-300 ease-out
              overflow-hidden
              hover:border-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]
              ${animationComplete ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none opacity-0'}
            `}
          >
            {/* Loading Bar Effect */}
            <span className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#00D4FF] transform transition-transform duration-500 ease-out origin-left ${copied ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            
            <span className="relative z-10 flex items-center gap-4">
               <span className={`w-2 h-2 rounded-full ${copied ? 'bg-green-500' : 'bg-[#00D4FF] animate-pulse'}`}></span>
               <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY JAVASCRIPT'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 w-full px-10 flex justify-between items-end text-[#444] text-[10px] tracking-widest font-mono uppercase z-20 pointer-events-none">
        <div className="flex flex-col space-y-1">
          <span className="flex items-center gap-2">
            Status: 
            {animationComplete ? <span className="text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]">UNDETECTED</span> : <span className="text-yellow-600">CHECKING...</span>}
          </span>
          <span className="flex items-center gap-2">Modules: <span className="text-white">ESP, FullBright, Sprint</span></span>
        </div>
        <div className="text-right opacity-50">
          <p>Frost_Client_v1.0</p>
          <p>Comp: Java 21 / MC 1.21.11</p>
        </div>
      </div>

    </div>
  );
};

export default App;