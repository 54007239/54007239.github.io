/* 《问道长生》故事线树状图 —— 独立渲染模块 */
(function () {
  if (typeof GAME_DATA === "undefined") return;

  // 章节顺序与显示名
  const CHAPTERS = [
    { key: "第一章", label: "凡尘问道" },
    { key: "第二章 · 风起云涌", label: "风起云涌" },
    { key: "第三章 · 金丹问道", label: "金丹问道" },
    { key: "第四章 · 元婴纵横", label: "元婴纵横" },
    { key: "第五章 · 化神问道", label: "化神问道" },
    { key: "第六章 · 渡劫飞升", label: "渡劫飞升" },
    { key: "第七章 · 飞升终章", label: "飞升终章" }
  ];

  const SPECIAL = ["__SETTLE_", "__ENDING__", "__FAIL__"];

  // 特殊跳转 → 实际事件 映射
  const SETTLE_TO_START = {
    "__SETTLE_CH1__": "ch2_start",
    "__SETTLE_CH2__": "ch3_start",
    "__SETTLE_CH3__": "ch4_start",
    "__SETTLE_CH4__": "ch5_start",
    "__SETTLE_CH5__": "ch6_start"
  };

  function isSpecial(id) {
    return SPECIAL.some((s) => id.indexOf(s) === 0);
  }

  // 获取事件所属章节 key
  function chapterOf(id) {
    const ev = GAME_DATA.events[id];
    if (!ev) return null;
    if (ev.chapter) return ev.chapter;
    // 根据事件名推断章节
    if (id === "start" || /^(sect_|rogue_|demon_|steal_path|fox_event|market_conflict|secret_realm|final_prep|chapter_end|blood_test)/.test(id)) {
      return "第一章";
    }
    return "第一章";
  }

  // 收集事件的所有 next 目标（解析条件分支，特殊跳转映射为实际事件）
  function nextTargets(id) {
    const ev = GAME_DATA.events[id];
    if (!ev || !ev.options) return [];
    const targets = [];
    for (const o of ev.options) {
      if (Array.isArray(o.next)) {
        for (const b of o.next) targets.push(b.go);
      } else if (o.next) {
        targets.push(o.next);
      }
    }
    // 映射特殊跳转
    const mapped = targets.map((t) => SETTLE_TO_START[t] || t);
    // 过滤掉 __ENDING__/__FAIL__（这些是终端，不在 events 中）
    return [...new Set(mapped.filter((t) => GAME_DATA.events[t]))];
  }

  // 构建层级（分章节独立拓扑分层，避免全局层级累加导致图过宽）
  function computeLayers() {
    const layers = {};
    const events = GAME_DATA.events;
    const ids = Object.keys(events);

    // 按章节分组
    const chapterIds = {};
    ids.forEach((id) => {
      const ch = chapterOf(id) || "第一章";
      if (!chapterIds[ch]) chapterIds[ch] = [];
      chapterIds[ch].push(id);
    });

    // 每章内部独立计算层级（初始为 0）
    for (const ch in chapterIds) {
      const chIds = chapterIds[ch];
      chIds.forEach((id) => (layers[id] = 0));
      let changed = true;
      let guard = 0;
      while (changed && guard++ < 500) {
        changed = false;
        for (const id of chIds) {
          const targets = nextTargets(id).filter((t) => chapterIds[ch].includes(t));
          for (const t of targets) {
            const want = layers[id] + 1;
            if (layers[t] < want) {
              layers[t] = want;
              changed = true;
            }
          }
        }
      }
    }
    return layers;
  }

  // 按章节+层分组
  function groupByChapter() {
    const layers = computeLayers();
    const ids = Object.keys(GAME_DATA.events);
    const chapters = {};
    for (const id of ids) {
      const ch = chapterOf(id) || "第一章";
      if (!chapters[ch]) chapters[ch] = [];
      chapters[ch].push({ id, layer: layers[id] });
    }
    // 每章内按 layer 排序
    for (const ch in chapters) {
      chapters[ch].sort((a, b) => a.layer - b.layer || a.id.localeCompare(b.id));
    }
    return chapters;
  }

  // 布局参数
  const NODE_W = 150;
  const NODE_H = 40;
  const GAP_X = 190; // 层间横向间距
  const GAP_Y = 56; // 节点纵向间距

  // 渲染树状图到容器
  function renderTree(container, state) {
    if (!container) return;
    const unlocked = (state && state.unlocked) || {};
    const chapters = groupByChapter();

    // 计算总尺寸
    let totalH = 40;
    const chapterMeta = [];
    for (const ch of CHAPTERS) {
      const nodes = chapters[ch.key] || [];
      const layers = nodes.length ? Math.max(...nodes.map((n) => n.layer)) + 1 : 0;
      const h = nodes.length ? Math.max(nodes.length * GAP_Y, 60) : 60;
      chapterMeta.push({ key: ch.key, label: ch.label, nodes, layerCount: layers, height: h });
      totalH += h + 70;
    }
    const maxLayers = Math.max(...chapterMeta.map((c) => c.layerCount), 1);
    const totalW = maxLayers * GAP_X + 120;

    container.innerHTML = "";

    // 外层滚动容器
    const scroll = document.createElement("div");
    scroll.className = "tree-scroll";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 " + totalW + " " + totalH);
    svg.setAttribute("class", "tree-svg");
    scroll.appendChild(svg);

    // 记录每个节点的坐标
    const pos = {}; // id -> {x, y}

    let cursorY = 40;
    for (const cm of chapterMeta) {
      // 章节标题
      const labelY = cursorY;
      const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
      title.setAttribute("x", 20);
      title.setAttribute("y", labelY);
      title.setAttribute("class", "tree-chapter-title");
      title.textContent = "【" + cm.label + "】";
      svg.appendChild(title);
      cursorY += 30;

      // 绘制节点
      cm.nodes.forEach((node, idx) => {
        const layer = node.layer;
        const x = 40 + layer * GAP_X;
        const y = cursorY + idx * GAP_Y;
        pos[node.id] = { x, y };
      });

      // 绘制该章的边
      cm.nodes.forEach((node) => {
        const targets = nextTargets(node.id);
        for (const t of targets) {
          if (!pos[t]) continue; // 目标在其它章节（用跨章虚线另行处理）
          const from = pos[node.id];
          const to = pos[t];
          const edge = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const midX = (from.x + to.x) / 2;
          const d = "M " + from.x + " " + from.y + " C " + midX + " " + from.y + ", " + midX + " " + to.y + ", " + to.x + " " + to.y;
          edge.setAttribute("d", d);
          edge.setAttribute("class", unlocked[node.id] && unlocked[t] ? "tree-edge unlocked" : "tree-edge");
          edge.setAttribute("fill", "none");
          svg.appendChild(edge);
        }
      });

      // 绘制该章的节点
      cm.nodes.forEach((node) => {
        const p = pos[node.id];
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("transform", "translate(" + p.x + "," + p.y + ")");
        const isUnlocked = !!unlocked[node.id];
        const isCurrent = state && state.current === node.id;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", -NODE_W / 2);
        rect.setAttribute("y", -NODE_H / 2);
        rect.setAttribute("width", NODE_W);
        rect.setAttribute("height", NODE_H);
        rect.setAttribute("rx", 8);
        let cls = "tree-node";
        if (isCurrent) cls += " current";
        else if (isUnlocked) cls += " unlocked";
        else cls += " locked";
        rect.setAttribute("class", cls);
        g.appendChild(rect);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 0);
        text.setAttribute("y", 4);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("class", "tree-node-text");
        const title = GAME_DATA.events[node.id] ? GAME_DATA.events[node.id].title : node.id;
        text.textContent = title.length > 8 ? title.slice(0, 8) + "…" : title;
        g.appendChild(text);

        // 已解锁节点可点击
        if (isUnlocked) {
          g.style.cursor = "pointer";
          g.addEventListener("click", () => {
            if (window.GAME && window.GAME.jumpTo) {
              if (window.GAME.jumpTo(node.id)) {
                closeTree();
              }
            }
          });
          g.addEventListener("mouseenter", () => {
            rect.setAttribute("class", cls + " hover");
          });
          g.addEventListener("mouseleave", () => {
            rect.setAttribute("class", cls);
          });
        } else {
          // 锁定节点显示锁标记
          const lock = document.createElementNS("http://www.w3.org/2000/svg", "text");
          lock.setAttribute("x", NODE_W / 2 - 14);
          lock.setAttribute("y", -NODE_H / 2 + 14);
          lock.setAttribute("class", "tree-lock");
          lock.textContent = "🔒";
          g.appendChild(lock);
        }

        svg.appendChild(g);
      });

      cursorY += cm.height + 20;
    }

    // 跨章节的边（章节之间的跳转）
    // 遍历所有事件，如果 next 目标在另一章，画虚线箭头
    for (const id of Object.keys(GAME_DATA.events)) {
      const targets = nextTargets(id);
      for (const t of targets) {
        if (!pos[id] || !pos[t]) continue;
        if (chapterOf(id) !== chapterOf(t)) {
          const from = pos[id];
          const to = pos[t];
          const edge = document.createElementNS("http://www.w3.org/2000/svg", "path");
          edge.setAttribute("d", "M " + from.x + " " + from.y + " C " + from.x + " " + (from.y + 60) + ", " + to.x + " " + (to.y - 60) + ", " + to.x + " " + to.y);
          edge.setAttribute("class", unlocked[id] && unlocked[t] ? "tree-edge cross unlocked" : "tree-edge cross");
          edge.setAttribute("fill", "none");
          edge.setAttribute("stroke-dasharray", "4,4");
          svg.appendChild(edge);
        }
      }
    }

    container.appendChild(scroll);
  }

  // 打开树状图弹层
  function openTree(state) {
    let overlay = document.getElementById("tree-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "tree-overlay";
      overlay.className = "tree-overlay";
      const panel = document.createElement("div");
      panel.className = "tree-panel";
      panel.innerHTML =
        '<div class="tree-header">' +
        '<span class="tree-title">故事线 · 因果图</span>' +
        '<button class="tree-close" id="tree-close">×</button>' +
        "</div>" +
        '<div class="tree-body" id="tree-body"></div>' +
        '<div class="tree-footer">点击已解锁的节点可跳转到该处重新选择（未解锁节点需先经历）。</div>';
      overlay.appendChild(panel);
      document.body.appendChild(overlay);
      panel.querySelector("#tree-close").onclick = closeTree;
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeTree();
      });
    }
    overlay.style.display = "flex";
    renderTree(document.getElementById("tree-body"), state);
  }

  function closeTree() {
    const overlay = document.getElementById("tree-overlay");
    if (overlay) overlay.style.display = "none";
  }

  window.TREE = { open: openTree, close: closeTree };
})();
