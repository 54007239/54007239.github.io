/* 《问道长生》成就系统 —— 跨周目累积，持久化于 localStorage */
(function () {
  if (typeof GAME_DATA === "undefined") return;

  const ACH_KEY = "wendao_achievements_v1";

  // 成就定义：id、名称、描述、图标
  // 结局类成就：达成某结局时解锁
  const ENDING_ACHIEVEMENTS = [
    // 飞升终局成就（11 个 + 默认）
    { id: "end_yongheng", name: "永恒牢笼", desc: "助纣为虐，永锁天门，却把自己锁进了更大的牢笼。", icon: "🏚️" },
    { id: "end_mingyou", name: "幽冥魔帝", desc: "以杀证道，以魔成仙，踏入幽冥称帝。", icon: "👹" },
    { id: "end_zhongxian", name: "众仙之祖", desc: "破天之战万军相随，成为下界飞升者心中永远的天门。", icon: "🌟" },
    { id: "end_kaitian", name: "开天圣人", desc: "率万万修士斩开绝天阵，名讳刻于天门之上。", icon: "⚔️" },
    { id: "end_biyi", name: "比翼成仙", desc: "与道侣并肩破天，同证大道，共入仙界。", icon: "💞" },
    { id: "end_nitian", name: "逆天者", desc: "以一人之力逆天斩开天门，上界仙人见你皆绕道。", icon: "☄️" },
    { id: "end_potian", name: "破天仙人", desc: "以一己之力为下界众生争得一线生机。", icon: "🗡️" },
    { id: "end_shoumu", name: "天门守墓人", desc: "交出信物换来仙位，却成了天门永恒的守墓人。", icon: "🪦" },
    { id: "end_zhiren", name: "至仁仙尊", desc: "以仁心直面每一段过错，教化众生成仙。", icon: "🌿" },
    { id: "end_wangqing", name: "太上忘情", desc: "斩尽情丝因果，成为仙界最冷漠也最强大的存在。", icon: "❄️" },
    { id: "end_anfen", name: "安分仙人", desc: "顺从天命安稳飞升，却总想起那些仰望天门的眼睛。", icon: "🌙" },
    { id: "end_wendao", name: "问道长生", desc: "踏过天门飞升上界，成为玄黄界最古老的传说。", icon: "☯️" },

    // 失败结局
    { id: "end_daoxiao", name: "道消身陨", desc: "仙路戛然而止，但玄黄界会记得你的名字。", icon: "🥀" },

    // 章节代表结局（有故事性的关键结局）
    { id: "ch1_zunshi", name: "尊师明道", desc: "第一章筑基前夜叩别恩师，以师之道证己之道。", icon: "📿" },
    { id: "ch1_qingluo", name: "青萝相伴", desc: "第一章后山看星，与师姐沈青萝结下情愫。", icon: "🌸" },
    { id: "ch2_huxian", name: "狐仙眷侣", desc: "第二章与苏漓十指相扣，携手问长生。", icon: "🦊" },
    { id: "ch3_biyi", name: "比翼飞升", desc: "第三章与道侣许下宏愿，同生共死。", icon: "🕊️" },
    { id: "ch3_zhengdao", name: "正道丰碑", desc: "第三章卧底魔门，一朝覆灭血刀门。", icon: "🏅" },
    { id: "ch5_dumo", name: "渡化心魔", desc: "第五章选择渡化心魔而非诛杀，道心圆满。", icon: "🪷" }
  ];

  // 条件成就：基于特殊 flag 或属性达成
  const CONDITION_ACHIEVEMENTS = [
    { id: "cond_dumo", name: "渡魔成圣", desc: "渡化不死不休的仇敌赵乾。", flag: "渡魔", icon: "🕯️" },
    { id: "cond_jilv", name: "仙路有伴", desc: "与苏漓结为仙侣。", flag: "仙侣", icon: "💑" },
    { id: "cond_shifu", name: "师徒情深", desc: "筑基前夜向师父玄尘子叩别。", flag: "师徒情深", icon: "👨‍🏫" },
    { id: "cond_shijie", name: "青萝之约", desc: "与师姐沈青萝许下桃花之约。", flag: "青萝情愫", icon: "💮" },
    { id: "cond_wojin", name: "孤胆英雄", desc: "卧底魔门，双面传递情报。", flag: "双面谍", icon: "🎭" },
    { id: "cond_kazong", name: "开宗立派", desc: "自立门户，开宗立派。", flag: "开宗立派", icon: "🏯" }
  ];

  const ALL_ACHIEVEMENTS = ENDING_ACHIEVEMENTS.concat(CONDITION_ACHIEVEMENTS);
  const ACH_MAP = {};
  ALL_ACHIEVEMENTS.forEach((a) => (ACH_MAP[a.id] = a));

  // 结局名称 → 成就 id 映射
  const ENDING_TO_ACH = {};
  ENDING_ACHIEVEMENTS.forEach((a) => (ENDING_TO_ACH[a.name] = a.id));

  // 读取已解锁成就
  function getUnlocked() {
    try {
      const raw = localStorage.getItem(ACH_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUnlocked(list) {
    try { localStorage.setItem(ACH_KEY, JSON.stringify(list)); } catch (e) {}
  }

  // 解锁单个成就（返回是否新解锁）
  function unlock(id) {
    const list = getUnlocked();
    if (list.includes(id)) return false;
    list.push(id);
    saveUnlocked(list);
    return true;
  }

  // 根据结局名称解锁对应成就
  function unlockByEnding(endingName) {
    const achId = ENDING_TO_ACH[endingName];
    if (!achId) return null;
    if (unlock(achId)) {
      return ACH_MAP[achId];
    }
    return null;
  }

  // 根据当前 state 检查条件成就（在结局时调用）
  function unlockByCondition(state) {
    if (!state || !state.flags) return [];
    const newly = [];
    for (const a of CONDITION_ACHIEVEMENTS) {
      if (a.flag && state.flags.includes(a.flag)) {
        if (unlock(a.id)) newly.push(a);
      }
    }
    return newly;
  }

  // 统计
  function stats() {
    const list = getUnlocked();
    return { unlocked: list.length, total: ALL_ACHIEVEMENTS.length };
  }

  // 弹出结局成就卡片（结局时调用）
  function showEndingCard(endingName, endingDesc, isFail) {
    const s = stats();
    const newly = unlockByEnding(endingName);

    // 弹层
    let overlay = document.getElementById("ending-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "ending-overlay";
      overlay.className = "ending-overlay";
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = "";

    const card = document.createElement("div");
    card.className = "ending-card " + (isFail ? "fail" : "success");
    card.innerHTML =
      '<div class="ending-card-tag">' + (isFail ? "此世终局" : "飞升终局") + "</div>" +
      '<div class="ending-card-name">' + endingName + "</div>" +
      (endingDesc ? '<div class="ending-card-desc">' + endingDesc + "</div>" : "") +
      (newly
        ? '<div class="ending-card-ach">🏆 解锁成就「' + newly.name + '」</div>'
        : '<div class="ending-card-ach muted">此结局成就已解锁</div>') +
      '<div class="ending-card-progress">成就进度 ' + s.unlocked + " / " + s.total + "</div>" +
      '<button class="ending-card-btn" id="ending-close">继续</button>';
    overlay.appendChild(card);
    overlay.style.display = "flex";

    card.querySelector("#ending-close").onclick = () => {
      overlay.style.display = "none";
    };
  }

  // 打开成就面板
  function openPanel() {
    const list = getUnlocked();
    let overlay = document.getElementById("ach-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "ach-overlay";
      overlay.className = "ach-overlay";
      const panel = document.createElement("div");
      panel.className = "ach-panel";
      panel.innerHTML =
        '<div class="ach-header">' +
        '<span class="ach-title">✦ 成就图鉴</span>' +
        '<button class="ach-close" id="ach-close">×</button>' +
        "</div>" +
        '<div class="ach-body" id="ach-body"></div>' +
        '<div class="ach-footer">成就跨周目累积，永远记录你的问道之路。</div>';
      overlay.appendChild(panel);
      document.body.appendChild(overlay);
      panel.querySelector("#ach-close").onclick = () => (overlay.style.display = "none");
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.style.display = "none";
      });
    }
    overlay.style.display = "flex";

    const body = document.getElementById("ach-body");
    const s = stats();
    body.innerHTML = '<div class="ach-progress">已解锁 ' + s.unlocked + " / " + s.total + "</div>";

    ALL_ACHIEVEMENTS.forEach((a) => {
      const isUnlocked = list.includes(a.id);
      const item = document.createElement("div");
      item.className = "ach-item " + (isUnlocked ? "unlocked" : "locked");
      item.innerHTML =
        '<span class="ach-icon">' + (isUnlocked ? a.icon : "🔒") + "</span>" +
        '<span class="ach-info">' +
        '<span class="ach-name">' + a.name + "</span>" +
        '<span class="ach-desc">' + a.desc + "</span>" +
        "</span>";
      body.appendChild(item);
    });
  }

  window.ACHIEVEMENTS = {
    unlockByEnding,
    unlockByCondition,
    showEndingCard,
    open: openPanel,
    stats
  };
})();
