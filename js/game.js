/* 《问道长生》游戏引擎 */
(function () {
  const SAVE_KEY = "wendao_save_v1";

  let state = null;

  function newState() {
    return {
      attrs: { ...GAME_DATA.initialAttrs },
      flags: [],
      current: GAME_DATA.startEvent,
      history: []
    };
  }

  /* ---------- 条件判定 ---------- */
  function checkCond(cond) {
    if (!cond) return true;
    if (cond.attr) {
      for (const k in cond.attr) {
        if ((state.attrs[k] || 0) < cond.attr[k]) return false;
      }
    }
    if (cond.flags) {
      for (const f of cond.flags) {
        if (!state.flags.includes(f)) return false;
      }
    }
    if (cond.notFlags) {
      for (const f of cond.notFlags) {
        if (state.flags.includes(f)) return false;
      }
    }
    return true;
  }

  function resolveNext(next) {
    if (typeof next === "string") return next;
    for (const branch of next) {
      if (!branch.if || checkCond(branch.if)) return branch.go;
    }
    return next[next.length - 1].go;
  }

  /* ---------- 选择执行 ---------- */
  function choose(optIdx) {
    const ev = GAME_DATA.events[state.current];
    const opt = ev.options[optIdx];
    if (!checkCond(opt.cond)) return;

    // 应用属性变化
    const changes = [];
    if (opt.effects && opt.effects.attr) {
      for (const k in opt.effects.attr) {
        const v = opt.effects.attr[k];
        state.attrs[k] = (state.attrs[k] || 0) + v;
        if (state.attrs[k] < 0) state.attrs[k] = 0;
        changes.push({ attr: k, delta: v });
      }
    }
    if (opt.effects && opt.effects.flags) {
      for (const f of opt.effects.flags) {
        if (!state.flags.includes(f)) state.flags.push(f);
      }
    }

    state.history.push({ event: state.current, choice: opt.text });
    const nextId = resolveNext(opt.next);
    save();

    // 音效：点击 + 属性变化
    if (window.SFX) {
      window.SFX.select();
      if (changes.length) {
        const anyUp = changes.some((c) => c.delta > 0);
        const anyDown = changes.some((c) => c.delta < 0);
        setTimeout(() => { if (anyUp) window.SFX.up(); if (anyDown) window.SFX.down(); }, 80);
      }
    }

    if (nextId === "__ENDING__") {
      if (window.SFX) window.SFX.ending();
      renderEnding();
    } else if (nextId === "__FAIL__") {
      if (window.SFX) window.SFX.fail();
      renderFail();
    } else if (nextId.indexOf("__SETTLE_") === 0) {
      if (window.SFX) window.SFX.breakthrough();
      renderSettle(nextId);
    } else {
      state.current = nextId;
      save();
      render();
      showEffects(changes);
    }
  }

  /* ---------- 渲染 ---------- */
  const $ = (id) => document.getElementById(id);

  /* ---------- 场景 → 水墨立绘映射 ---------- */
  const SCENE_ART_MAP = [
    { art: "mind", match: ["识海", "心魔", "元神出窍", "濒临崩溃", "万劫不复", "黑风坳"] },
    { art: "thunder", match: ["雷", "渡劫", "天劫", "雷云"] },
    { art: "gate", match: ["天门", "南天门", "仙云", "飞升", "太庙", "皇朝", "仙人", "仙光", "云端", "上界"] },
    { art: "abyss", match: ["幽冥", "九幽", "深渊", "玄黄", "极寒", "北海", "裂缝", "战场", "地脉"] },
    { art: "blood", match: ["血刀门", "血池", "总坛", "分舵"] },
    { art: "realm", match: ["秘境", "遗迹", "天门残碑", "蓬莱", "苍澜"] },
    { art: "cave", match: ["洞府", "丹房", "藏书楼", "闭关", "炉火", "禁卷", "门前"] },
    { art: "moon", match: ["月夜", "月圆", "青丘", "狐族", "云海之巅"] },
    { art: "peak", match: ["山巅", "九天", "崩山", "俯瞰", "天地变色", "星垂", "九霄", "残阳"] },
    { art: "sect", match: ["青云宗", "青云山", "山门前", "演武场", "执法堂", "群贤毕至", "旧地", "外门"] },
    { art: "market", match: ["坊市", "街口", "破庙", "火海", "赌石"] },
    { art: "wilderness", match: ["乱葬岗", "荒野", "官道", "夜路", "伏击", "杀机"] },
    { art: "village", match: ["小山村", "清河县"] }
  ];

  function resolveArt(scene) {
    if (!scene) return "village";
    for (const item of SCENE_ART_MAP) {
      for (const kw of item.match) {
        if (scene.indexOf(kw) !== -1) return item.art;
      }
    }
    return "village";
  }

  function setSceneArt(scene) {
    const art = resolveArt(scene);
    const img = $("scene-art");
    if (!img) return;
    const src = "assets/art/" + art + ".jpg";
    if (img.dataset.art === art && img.src.indexOf(src) !== -1) return;

    const show = () => { img.style.opacity = "1"; };

    img.style.opacity = "0";
    img.dataset.art = art;

    // 先绑定 onload（并处理已缓存图片的 complete 情况），再设置 src，避免竞态
    img.onload = show;
    img.onerror = () => {
      // 图片加载失败时也恢复透明度，避免整块空白
      img.style.opacity = "1";
    };
    img.src = src;

    // 若图片已从缓存加载完成（complete），直接显示，避免 load 事件丢失
    if (img.complete) show();
  }

  function render() {
    const ev = GAME_DATA.events[state.current];
    $("scene").textContent = ev.scene || "";
    setSceneArt(ev.scene);
    $("event-title").textContent = ev.title;
    $("event-text").textContent = ev.text;
    $("chapter-label").textContent = ev.chapter || GAME_DATA.meta.chapter;
    if (ev.realm) $("realm").textContent = ev.realm;

    // 场景氛围音效（雷劫 / 心魔）
    if (window.SFX) {
      const s = ev.scene || "";
      if (s.indexOf("雷") !== -1 || s.indexOf("劫") !== -1) window.SFX.thunder();
      else if (s.indexOf("心魔") !== -1 || s.indexOf("识海") !== -1) window.SFX.demon();
    }

    const box = $("options");
    box.innerHTML = "";
    ev.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      const ok = checkCond(opt.cond);
      if (!ok) {
        btn.classList.add("locked");
        btn.innerHTML = '<span class="opt-text">' + opt.text + '</span><span class="opt-lock">【条件不足】' + condHint(opt.cond) + "</span>";
      } else {
        btn.innerHTML = '<span class="opt-text">' + opt.text + "</span>";
        btn.onclick = () => choose(i);
      }
      box.appendChild(btn);
    });

    renderAttrs();
  }

  function condHint(cond) {
    const parts = [];
    if (cond.attr) for (const k in cond.attr) parts.push(k + "≥" + cond.attr[k]);
    if (cond.flags) for (const f of cond.flags) parts.push("需经历「" + f + "」");
    if (cond.notFlags) for (const f of cond.notFlags) parts.push("未经历「" + f + "」");
    return parts.join("，");
  }

  const ATTR_ORDER = ["修为", "心性", "声望", "机缘", "杀戮", "情缘"];
  const ATTR_MAX = 100;

  function renderAttrs() {
    const panel = $("attr-list");
    panel.innerHTML = "";
    ATTR_ORDER.forEach((k) => {
      const v = state.attrs[k] || 0;
      const row = document.createElement("div");
      row.className = "attr-row";
      row.innerHTML =
        '<span class="attr-name">' + k + "</span>" +
        '<div class="attr-bar"><div class="attr-fill attr-' + k + '" style="width:' + Math.min(100, (v / ATTR_MAX) * 100) + '%"></div></div>' +
        '<span class="attr-val">' + v + "</span>";
      panel.appendChild(row);
    });
  }

  function showEffects(changes) {
    if (!changes.length) return;
    const box = $("toast-area");
    changes.forEach((c, idx) => {
      setTimeout(() => {
        const t = document.createElement("div");
        t.className = "toast " + (c.delta >= 0 ? "up" : "down");
        t.textContent = c.attr + " " + (c.delta >= 0 ? "+" : "") + c.delta;
        box.appendChild(t);
        setTimeout(() => t.remove(), 2200);
      }, idx * 350);
    });
  }

  /* ---------- 结局 ---------- */
  function evaluateEnding() {
    for (const e of GAME_DATA.endings) {
      if (checkCond(e)) return e;
    }
    return GAME_DATA.defaultEnding;
  }

  function evaluateFinalEnding() {
    for (const e of GAME_DATA.finalEndings) {
      if (checkCond(e)) return e;
    }
    return GAME_DATA.defaultFinalEnding;
  }

  function evaluateUltimateEnding() {
    for (const e of GAME_DATA.ultimateEndings) {
      if (checkCond(e)) return e;
    }
    return GAME_DATA.defaultUltimateEnding;
  }

  function evaluateCh3Ending() {
    for (const e of GAME_DATA.ch3Endings) {
      if (checkCond(e)) return e;
    }
    return GAME_DATA.defaultCh3Ending;
  }

  function evaluateCh4Ending() {
    for (const e of GAME_DATA.ch4Endings) {
      if (checkCond(e)) return e;
    }
    return GAME_DATA.defaultCh4Ending;
  }

  function evaluateCh5Ending() {
    for (const e of GAME_DATA.ch5Endings) {
      if (checkCond(e)) return e;
    }
    return GAME_DATA.defaultCh5Ending;
  }

  /* ---------- 章节结算配置 ---------- */
  const SETTLE_CONFIG = {
    "__SETTLE_CH1__": {
      scene: "第一章 · 终",
      titlePrefix: "筑基天成 · ",
      chapterLabel: "第一章 · 凡尘问道",
      evaluate: () => evaluateEnding(),
      epilogues: () => GAME_DATA.flagEpilogues,
      nextEvent: "ch2_start",
      nextLabel: "进入第二章 · 风起云涌（筑基期）",
      breakthrough: { 修为: 5 }
    },
    "__SETTLE_CH2__": {
      scene: "第二章 · 终",
      titlePrefix: "金丹大成 · ",
      chapterLabel: "第二章 · 风起云涌",
      evaluate: () => evaluateFinalEnding(),
      epilogues: () => GAME_DATA.flagEpiloguesFinal,
      nextEvent: "ch3_start",
      nextLabel: "进入第三章 · 金丹问道（金丹期）",
      breakthrough: { 修为: 8 }
    },
    "__SETTLE_CH3__": {
      scene: "第三章 · 终",
      titlePrefix: "元婴天成 · ",
      chapterLabel: "第三章 · 金丹问道",
      evaluate: () => evaluateCh3Ending(),
      epilogues: () => GAME_DATA.flagEpiloguesUltimate,
      nextEvent: "ch4_start",
      nextLabel: "进入第四章 · 元婴纵横（元婴期）",
      breakthrough: { 修为: 10 }
    },
    "__SETTLE_CH4__": {
      scene: "第四章 · 终",
      titlePrefix: "化神大成 · ",
      chapterLabel: "第四章 · 元婴纵横",
      evaluate: () => evaluateCh4Ending(),
      epilogues: () => GAME_DATA.flagEpiloguesCh4,
      nextEvent: "ch5_start",
      nextLabel: "进入第五章 · 化神问道（化神期）",
      breakthrough: { 修为: 12 }
    },
    "__SETTLE_CH5__": {
      scene: "第五章 · 终",
      titlePrefix: "渡劫在望 · ",
      chapterLabel: "第五章 · 化神问道",
      evaluate: () => evaluateCh5Ending(),
      epilogues: () => GAME_DATA.flagEpiloguesCh5,
      nextEvent: "ch6_start",
      nextLabel: "进入第六章 · 渡劫飞升（渡劫期）",
      breakthrough: { 修为: 12 }
    }
  };

  /* ---------- 章节结算 ---------- */
  function renderSettle(key) {
    const cfg = SETTLE_CONFIG[key];
    const ending = cfg.evaluate();
    $("scene").textContent = cfg.scene;
    setSceneArt(cfg.scene);
    $("event-title").textContent = cfg.titlePrefix + ending.name;
    $("chapter-label").textContent = cfg.chapterLabel;
    let text = ending.desc;
    const epi = cfg.epilogues();
    for (const f of state.flags) {
      if (epi[f]) text += "\n\n" + epi[f];
    }
    $("event-text").textContent = text;

    const box = $("options");
    box.innerHTML = "";
    const next = document.createElement("button");
    next.className = "opt-btn restart";
    next.innerHTML = '<span class="opt-text">' + cfg.nextLabel + '</span>';
    next.onclick = () => {
      // 境界突破跃迁加成
      if (cfg.breakthrough) {
        for (const k in cfg.breakthrough) {
          state.attrs[k] = (state.attrs[k] || 0) + cfg.breakthrough[k];
        }
      }
      state.current = cfg.nextEvent; save(); render();
    };
    box.appendChild(next);

    const review = document.createElement("button");
    review.className = "opt-btn";
    review.innerHTML = '<span class="opt-text">回顾本章抉择（' + state.history.length + ' 次）</span>';
    review.onclick = showHistory;
    box.appendChild(review);

    renderAttrs();
  }

  /* ---------- 终局结局 ---------- */
  function renderEnding() {
    const ending = evaluateUltimateEnding();
    $("scene").textContent = "终章 · 飞升";
    setSceneArt("天门 · 仙光接引");
    $("event-title").textContent = "飞升 · " + ending.name;
    let text = ending.desc;
    for (const f of state.flags) {
      if (GAME_DATA.flagEpiloguesEnding[f]) text += "\n\n" + GAME_DATA.flagEpiloguesEnding[f];
    }
    $("event-text").textContent = text;

    const box = $("options");
    box.innerHTML = "";
    const again = document.createElement("button");
    again.className = "opt-btn restart";
    again.innerHTML = '<span class="opt-text">再入轮回（重新开始）</span>';
    again.onclick = () => { clearSave(); start(); };
    box.appendChild(again);

    const review = document.createElement("button");
    review.className = "opt-btn";
    review.innerHTML = '<span class="opt-text">回顾本世抉择（' + state.history.length + ' 次）</span>';
    review.onclick = showHistory;
    box.appendChild(review);

    renderAttrs();
  }

  /* ---------- 失败结算（道消身陨） ---------- */
  function renderFail() {
    const ending = GAME_DATA.failEnding;
    $("scene").textContent = "道消 · 身陨";
    setSceneArt("玄黄界 · 最终战场");
    $("event-title").textContent = "结局 · " + ending.name;
    let text = ending.desc;
    $("event-text").textContent = text;

    const box = $("options");
    box.innerHTML = "";
    const again = document.createElement("button");
    again.className = "opt-btn restart";
    again.innerHTML = '<span class="opt-text">再入轮回（重新开始）</span>';
    again.onclick = () => { clearSave(); start(); };
    box.appendChild(again);

    const review = document.createElement("button");
    review.className = "opt-btn";
    review.innerHTML = '<span class="opt-text">回顾本世抉择（' + state.history.length + ' 次）</span>';
    review.onclick = showHistory;
    box.appendChild(review);

    renderAttrs();
  }

  function showHistory() {
    const ev = GAME_DATA.events[state.current];
    $("event-title").textContent = "本世抉择录";
    $("event-text").textContent = state.history
      .map((h, i) => "【" + (i + 1) + "】" + (GAME_DATA.events[h.event] ? GAME_DATA.events[h.event].title : h.event) + " → " + h.choice)
      .join("\n");
  }

  /* ---------- 存档 ---------- */
  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (s && GAME_DATA.events[s.current]) return s;
    } catch (e) {}
    return null;
  }
  function clearSave() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  }

  /* ---------- 启动 ---------- */
  function start() {
    state = newState();
    save();
    $("realm").textContent = "炼气期";
    render();
  }

  window.addEventListener("DOMContentLoaded", () => {
    const s = load();
    if (s && s.history.length > 0) {
      state = s;
      render();
    } else {
      start();
    }
    $("btn-restart").onclick = () => {
      if (confirm("确定要重新入轮回吗？本世进度将清空。")) { clearSave(); start(); }
    };

    // 音效开关
    const soundBtn = $("btn-sound");
    if (soundBtn && window.SFX) {
      const updateSound = () => {
        soundBtn.textContent = window.SFX.isEnabled() ? "♪ 音效" : "♪ 已静音";
        soundBtn.style.opacity = window.SFX.isEnabled() ? "1" : "0.55";
      };
      soundBtn.onclick = () => {
        window.SFX.setEnabled(!window.SFX.isEnabled());
        updateSound();
      };
      updateSound();
    }
  });
})();
