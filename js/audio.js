/* 《问道长生》古风音效引擎 —— 基于 Web Audio API 合成，零外部依赖 */
(function () {
  let ctx = null;
  let enabled = true;
  let master = null;

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  /* 基础音色：单音拨弦 */
  function pluck(freq, time, dur, type, vol, decay) {
    const c = ensureCtx();
    if (!c || !enabled) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(vol || 0.3, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + (dur || 0.4));
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + (dur || 0.4) + 0.05);
  }

  /* 上行/下行音阶（五声音阶：宫商角徵羽） */
  function pentatonic(base, steps, time, stepDur, type, vol) {
    const scale = [1, 1.125, 1.25, 1.5, 1.667, 2]; // 宫商角徵羽 + 高八度宫
    for (let i = 0; i < steps; i++) {
      const idx = i % scale.length;
      const oct = Math.floor(i / scale.length);
      const f = base * scale[idx] * Math.pow(2, oct);
      pluck(f, time + i * (stepDur || 0.08), 0.35, type || "triangle", vol || 0.25);
    }
  }

  /* 钟磬声 */
  function bell(freq, time, vol) {
    const c = ensureCtx();
    if (!c || !enabled) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(vol || 0.4, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 1.7);
    // 泛音
    const osc2 = c.createOscillator();
    const gain2 = c.createGain();
    osc2.type = "sine";
    osc2.frequency.value = freq * 2.01;
    gain2.gain.setValueAtTime(0.0001, time);
    gain2.gain.exponentialRampToValueAtTime((vol || 0.4) * 0.3, time + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);
    osc2.connect(gain2);
    gain2.connect(master);
    osc2.start(time);
    osc2.stop(time + 0.7);
  }

  /* 雷声（噪声脉冲 + 低频轰鸣） */
  function thunder(time) {
    const c = ensureCtx();
    if (!c || !enabled) return;
    const dur = 1.2;
    const bufferSize = c.sampleRate * dur;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.5);
    }
    const src = c.createBufferSource();
    src.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;
    const gain = c.createGain();
    gain.gain.value = 0.5;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(time);

    // 低频轰鸣
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.8);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(0.25, time + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 1.0);
    osc.connect(g);
    g.connect(master);
    osc.start(time);
    osc.stop(time + 1.1);
  }

  /* 心魔/阴森音（低频颤音） */
  function demon(time) {
    const c = ensureCtx();
    if (!c || !enabled) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    const lfo = c.createOscillator();
    const lfoGain = c.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(60, time + 1.2);
    lfo.type = "sine";
    lfo.frequency.value = 6;
    lfoGain.gain.value = 20;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.3, time + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.4);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 1.5);
    lfo.start(time);
    lfo.stop(time + 1.5);
  }

  /* 对外接口 */
  const SFX = {
    /* 点击选项 */
    select() {
      pluck(523, ensureCtx() ? ensureCtx().currentTime : 0, 0.25, "triangle", 0.22);
    },
    /* 属性上升 */
    up() {
      const t = ensureCtx() ? ensureCtx().currentTime : 0;
      pentatonic(440, 3, t, 0.07, "triangle", 0.2);
    },
    /* 属性下降 */
    down() {
      const t = ensureCtx() ? ensureCtx().currentTime : 0;
      pluck(330, t, 0.3, "sine", 0.2);
      pluck(294, t + 0.1, 0.3, "sine", 0.18);
    },
    /* 境界突破 */
    breakthrough() {
      const t = ensureCtx() ? ensureCtx().currentTime : 0;
      bell(392, t, 0.45);
      bell(523, t + 0.15, 0.4);
      bell(659, t + 0.3, 0.42);
      pentatonic(523, 5, t + 0.45, 0.09, "triangle", 0.25);
    },
    /* 心魔/魔道 */
    demon() {
      demon(ensureCtx() ? ensureCtx().currentTime : 0);
    },
    /* 雷劫 */
    thunder() {
      thunder(ensureCtx() ? ensureCtx().currentTime : 0);
    },
    /* 终局飞升 */
    ending() {
      const t = ensureCtx() ? ensureCtx().currentTime : 0;
      bell(523, t, 0.5);
      pentatonic(523, 8, t + 0.2, 0.12, "triangle", 0.26);
      bell(1046, t + 1.2, 0.5);
    },
    /* 失败身陨 */
    fail() {
      const t = ensureCtx() ? ensureCtx().currentTime : 0;
      pentatonic(392, 4, t, 0.25, "sine", 0.2).toString();
      // 下行悲凉
      const freqs = [392, 330, 262, 196];
      freqs.forEach((f, i) => pluck(f, t + i * 0.22, 0.6, "sine", 0.2));
    },
    /* 开关音效 */
    setEnabled(v) { enabled = !!v; },
    isEnabled() { return enabled; }
  };

  window.SFX = SFX;
})();
