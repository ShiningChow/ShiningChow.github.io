const TAU = Math.PI * 2;

const modules = [
  {
    id: "formation",
    index: "01",
    unit: "第 1 课时",
    title: "波的形成与传播",
    focus: "介质质点振动，波形和能量向前传播",
    subtitle:
      "用一根绳波展示机械波的本质：每个质点只在平衡位置附近振动，扰动形式沿介质传播。",
    caption: "绳波传播与质点振动",
    formulas: [
      "y = A sin 2π(x/λ - ft)",
      "T = 1/f",
      "波传播的是振动形式和能量，不传播介质本身",
    ],
    questions: [
      "暂停画面后，追踪同一个彩色质点，它是否随波峰一起向右移动？",
      "增大振幅时，波速是否必然改变？",
      "同一时刻相邻两个波峰之间的距离代表什么物理量？",
    ],
    script: [
      "先打开质点标记，让学生观察质点的局部振动。",
      "逐步增大频率，比较波峰通过同一点的快慢。",
      "切换相位标记，说明同相点和波长的关系。",
    ],
    controls: [
      {
        type: "range",
        key: "amplitude",
        label: "振幅 A",
        min: 12,
        max: 90,
        step: 1,
        value: 46,
        unit: "px",
        hint: "振幅决定质点离开平衡位置的最大距离。",
      },
      {
        type: "range",
        key: "frequency",
        label: "频率 f",
        min: 0.35,
        max: 2.4,
        step: 0.05,
        value: 0.9,
        unit: "Hz",
        hint: "固定波长时，频率越高，波形通过得越快。",
      },
      {
        type: "range",
        key: "wavelength",
        label: "波长 λ",
        min: 100,
        max: 300,
        step: 5,
        value: 190,
        unit: "px",
        hint: "画布中相邻两个同相点的水平距离。",
      },
      {
        type: "toggle",
        key: "showParticles",
        label: "显示质点",
        value: true,
      },
      {
        type: "toggle",
        key: "showPhase",
        label: "显示同相标记",
        value: true,
      },
    ],
  },
  {
    id: "transverseLongitudinal",
    index: "02",
    unit: "第 2 课时",
    title: "横波与纵波",
    focus: "比较质点振动方向与波传播方向",
    subtitle:
      "横波的质点振动方向垂直于传播方向，纵波的质点振动方向平行于传播方向。两者都不意味着质点随波远距离迁移。",
    caption: "横波、纵波与传播方向",
    formulas: [
      "横波：质点振动方向 ⟂ 波传播方向",
      "纵波：质点振动方向 ∥ 波传播方向",
      "纵波中的密部和疏部对应介质密度的周期性变化",
    ],
    questions: [
      "声波为什么通常归为纵波？",
      "横波图像上的“高低”是否表示介质整体真的向上或向下流动？",
      "纵波中密部向前移动时，单个质点在做什么运动？",
    ],
    script: [
      "先选择“对照”，让学生同时看两种模型。",
      "关闭箭头后让学生只凭质点运动判断波的类型。",
      "把波长调大，讨论密部、疏部之间距离的变化。",
    ],
    controls: [
      {
        type: "segmented",
        key: "mode",
        label: "演示模式",
        value: "compare",
        options: [
          { label: "对照", value: "compare" },
          { label: "横波", value: "transverse" },
          { label: "纵波", value: "longitudinal" },
        ],
      },
      {
        type: "range",
        key: "amplitude",
        label: "质点振幅",
        min: 10,
        max: 58,
        step: 1,
        value: 32,
        unit: "px",
      },
      {
        type: "range",
        key: "frequency",
        label: "频率 f",
        min: 0.3,
        max: 2.2,
        step: 0.05,
        value: 0.75,
        unit: "Hz",
      },
      {
        type: "range",
        key: "wavelength",
        label: "波长 λ",
        min: 90,
        max: 280,
        step: 5,
        value: 170,
        unit: "px",
      },
      {
        type: "toggle",
        key: "showArrows",
        label: "显示振动方向箭头",
        value: true,
      },
    ],
  },
  {
    id: "waveGraph",
    index: "03",
    unit: "第 3 课时",
    title: "波的图像与振动图像",
    focus: "区分 y-x 图像与 y-t 图像",
    subtitle:
      "同一列波可以同时从空间截面和时间记录两个角度观察。一个看“此刻各点在哪里”，一个看“某一点随时间怎样振动”。",
    caption: "空间图像与时间图像同步观察",
    formulas: [
      "波的图像：固定 t，观察 y 随 x 变化",
      "振动图像：固定 x，观察 y 随 t 变化",
      "从 y-x 图读 λ，从 y-t 图读 T",
    ],
    questions: [
      "左侧波形向右传播时，探针处的质点下一瞬间向上还是向下？",
      "为什么 y-x 图像和 y-t 图像都可能是正弦曲线，但含义完全不同？",
      "若只给一张波形图，能否直接判断传播方向？还需要什么信息？",
    ],
    script: [
      "拖动探针位置，观察右侧时间图的相位变化。",
      "暂停后比较同一时刻的空间图像与历史时间图像。",
      "让学生先预测探针的运动方向，再继续播放验证。",
    ],
    controls: [
      {
        type: "range",
        key: "probe",
        label: "探针位置 x",
        min: 0.12,
        max: 0.88,
        step: 0.01,
        value: 0.42,
        unit: "L",
      },
      {
        type: "range",
        key: "amplitude",
        label: "振幅 A",
        min: 18,
        max: 74,
        step: 1,
        value: 44,
        unit: "px",
      },
      {
        type: "range",
        key: "frequency",
        label: "频率 f",
        min: 0.35,
        max: 2.2,
        step: 0.05,
        value: 0.8,
        unit: "Hz",
      },
      {
        type: "range",
        key: "wavelength",
        label: "波长 λ",
        min: 100,
        max: 280,
        step: 5,
        value: 180,
        unit: "px",
      },
      {
        type: "toggle",
        key: "showSlope",
        label: "显示传播方向判断",
        value: true,
      },
    ],
  },
  {
    id: "relation",
    index: "04",
    unit: "第 4 课时",
    title: "波速、频率与波长",
    focus: "用 v = λf 建立定量关系",
    subtitle:
      "把同一介质和自由探索两种情境放在同一面板里，帮助学生区分“改变波源频率”和“改变介质波速”的不同影响。",
    caption: "v = λf 动态测量",
    formulas: [
      "v = λf",
      "同一介质中，波速主要由介质性质决定",
      "波源频率改变时，同一介质中的波长会随之改变",
    ],
    questions: [
      "同一介质中把频率加倍，波长怎样变化？",
      "若频率不变，换到波速更大的介质，波长会怎样？",
      "图像中的 λ 和 T 分别应该从哪一种图像中读取？",
    ],
    script: [
      "先选择“同一介质”，只调频率，观察 λ 自动变化。",
      "再选择“自由探索”，让学生检查 v = λf 的乘积关系。",
      "用画布中的双箭头测量一段完整波长。",
    ],
    controls: [
      {
        type: "segmented",
        key: "relationMode",
        label: "变量情境",
        value: "fixed",
        options: [
          { label: "同一介质", value: "fixed" },
          { label: "自由探索", value: "free" },
        ],
      },
      {
        type: "range",
        key: "mediumSpeed",
        label: "波速 v",
        min: 1.2,
        max: 7.2,
        step: 0.1,
        value: 3.6,
        unit: "m/s",
      },
      {
        type: "range",
        key: "frequency",
        label: "频率 f",
        min: 0.45,
        max: 3.2,
        step: 0.05,
        value: 1.2,
        unit: "Hz",
      },
      {
        type: "range",
        key: "wavelength",
        label: "波长 λ",
        min: 0.7,
        max: 5.4,
        step: 0.05,
        value: 3,
        unit: "m",
        disabledWhen: (values) => values.relationMode === "fixed",
        dynamicText: (values) => `${(values.mediumSpeed / values.frequency).toFixed(2)} m`,
      },
      {
        type: "toggle",
        key: "showMeasure",
        label: "显示波长测量",
        value: true,
      },
    ],
  },
  {
    id: "interference",
    index: "05",
    unit: "第 5 课时",
    title: "波的叠加与干涉",
    focus: "相长、相消与路径差条件",
    subtitle:
      "两列相干波在空间相遇后满足叠加原理。画布用水面等效模型显示相长区、相消区和相位差的影响。",
    caption: "双波源干涉图样",
    formulas: [
      "y = y₁ + y₂",
      "相长：Δr = kλ（同相波源）",
      "相消：Δr = (k + 1/2)λ（同相波源）",
    ],
    questions: [
      "为什么两列波相遇后还能继续保持原来的传播状态？",
      "把相位差改为 π 后，原来的相长区会发生什么变化？",
      "波长变大时，干涉条纹的间距怎样变化？",
    ],
    script: [
      "先保持同相，调节两波源距离，观察条纹疏密。",
      "打开节点/腹线标记，说明路径差条件。",
      "把相位差切换到 π，对比相长区和相消区互换。",
    ],
    controls: [
      {
        type: "range",
        key: "sourceDistance",
        label: "波源间距",
        min: 80,
        max: 260,
        step: 5,
        value: 150,
        unit: "px",
      },
      {
        type: "range",
        key: "wavelength",
        label: "波长 λ",
        min: 34,
        max: 110,
        step: 2,
        value: 68,
        unit: "px",
      },
      {
        type: "range",
        key: "damping",
        label: "衰减程度",
        min: 0.001,
        max: 0.011,
        step: 0.001,
        value: 0.004,
        unit: "",
      },
      {
        type: "segmented",
        key: "phase",
        label: "初相差",
        value: "0",
        options: [
          { label: "0", value: "0" },
          { label: "π/2", value: "halfPi" },
          { label: "π", value: "pi" },
        ],
      },
      {
        type: "toggle",
        key: "showEnvelope",
        label: "标记相长/相消区",
        value: true,
      },
    ],
  },
  {
    id: "standing",
    index: "06",
    unit: "第 6 课时",
    title: "驻波",
    focus: "节点、腹点与固有频率",
    subtitle:
      "两列频率相同、振幅相同、传播方向相反的波叠加，可以形成空间位置不随时间移动的驻波。",
    caption: "固定两端弦上的驻波",
    formulas: [
      "y = 2A sin(kx) cos(ωt)",
      "固定两端：L = nλ/2",
      "fₙ = nv/(2L), n = 1, 2, 3 ...",
    ],
    questions: [
      "节点和腹点的位置是否随时间移动？",
      "从一倍频到三倍频，弦长中出现了几个半波长？",
      "驻波中是否有能量沿弦单向传播？",
    ],
    script: [
      "从 n = 1 开始，逐级增加谐波阶数。",
      "打开包络线，让学生找出节点和腹点。",
      "调节波速，联系弦的张力或线密度对固有频率的影响。",
    ],
    controls: [
      {
        type: "range",
        key: "harmonic",
        label: "谐波阶数 n",
        min: 1,
        max: 6,
        step: 1,
        value: 2,
        unit: "",
      },
      {
        type: "range",
        key: "amplitude",
        label: "入射波振幅 A",
        min: 14,
        max: 58,
        step: 1,
        value: 34,
        unit: "px",
      },
      {
        type: "range",
        key: "waveSpeed",
        label: "弦上传播速度 v",
        min: 1.5,
        max: 8,
        step: 0.1,
        value: 4,
        unit: "m/s",
      },
      {
        type: "toggle",
        key: "showEnvelope",
        label: "显示包络线",
        value: true,
      },
      {
        type: "toggle",
        key: "showNodes",
        label: "标记节点和腹点",
        value: true,
      },
    ],
  },
  {
    id: "reflection",
    index: "07",
    unit: "第 7 课时",
    title: "波的反射",
    focus: "固定端反相、自由端同相",
    subtitle:
      "波遇到边界会发生反射。固定端反射时相位反转，自由端反射时相位不反转，叠加后会呈现不同的边界行为。",
    caption: "端点反射与相位变化",
    formulas: [
      "固定端：反射波相位改变 π",
      "自由端：反射波相位不改变",
      "边界处位移或斜率条件决定反射形式",
    ],
    questions: [
      "为什么固定端处的合位移必须为零？",
      "自由端反射时，端点附近的振幅为什么会变大？",
      "反射波与入射波叠加后，什么时候会形成稳定驻波？",
    ],
    script: [
      "先选固定端，观察端点处始终不动。",
      "打开分波显示，比较入射波和反射波的相位。",
      "切换自由端，观察端点位移和曲线斜率的变化。",
    ],
    controls: [
      {
        type: "segmented",
        key: "endType",
        label: "边界类型",
        value: "fixed",
        options: [
          { label: "固定端", value: "fixed" },
          { label: "自由端", value: "free" },
        ],
      },
      {
        type: "range",
        key: "amplitude",
        label: "振幅 A",
        min: 12,
        max: 54,
        step: 1,
        value: 30,
        unit: "px",
      },
      {
        type: "range",
        key: "wavelength",
        label: "波长 λ",
        min: 110,
        max: 300,
        step: 5,
        value: 190,
        unit: "px",
      },
      {
        type: "range",
        key: "frequency",
        label: "频率 f",
        min: 0.35,
        max: 2.1,
        step: 0.05,
        value: 0.75,
        unit: "Hz",
      },
      {
        type: "toggle",
        key: "showComponents",
        label: "显示入射波/反射波",
        value: true,
      },
    ],
  },
];

const canvas = document.querySelector("#waveCanvas");
const ctx = canvas.getContext("2d");
const lessonNav = document.querySelector("#lessonNav");
const lessonUnit = document.querySelector("#lessonUnit");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonSubtitle = document.querySelector("#lessonSubtitle");
const stageCaption = document.querySelector("#stageCaption");
const quickStats = document.querySelector("#quickStats");
const controlGroups = document.querySelector("#controlGroups");
const readout = document.querySelector("#readout");
const questionList = document.querySelector("#questionList");
const formulaBox = document.querySelector("#formulaBox");
const scriptList = document.querySelector("#scriptList");
const playToggle = document.querySelector("#playToggle");
const resetTime = document.querySelector("#resetTime");
const speedRange = document.querySelector("#speedRange");

const valuesByModule = Object.fromEntries(
  modules.map((module) => [
    module.id,
    Object.fromEntries(module.controls.map((control) => [control.key, control.value])),
  ]),
);

const state = {
  activeId: modules[0].id,
  playing: true,
  time: 0,
  lastFrame: performance.now(),
  speed: Number(speedRange.value),
  width: 0,
  height: 0,
};

function getActiveModule() {
  return modules.find((module) => module.id === state.activeId) || modules[0];
}

function getValues() {
  return valuesByModule[state.activeId];
}

function formatValue(control, values = getValues()) {
  if (control.dynamicText) {
    return control.dynamicText(values);
  }
  const value = values[control.key];
  if (typeof value === "boolean") {
    return value ? "开" : "关";
  }
  if (typeof value === "string") {
    const option = control.options?.find((item) => item.value === value);
    return option?.label || value;
  }
  const numeric =
    Math.abs(value) >= 10 || Number.isInteger(value) ? String(Number(value.toFixed(2))) : value.toFixed(2);
  return `${numeric}${control.unit ? ` ${control.unit}` : ""}`;
}

function renderNav() {
  lessonNav.innerHTML = modules
    .map(
      (module) => `
        <button class="lesson-button ${module.id === state.activeId ? "active" : ""}" type="button" data-lesson="${module.id}">
          <span class="lesson-index">${module.index}</span>
          <span>
            <span class="lesson-name">${module.title}</span>
            <span class="lesson-focus">${module.focus}</span>
          </span>
        </button>
      `,
    )
    .join("");
}

function renderLessonMeta() {
  const module = getActiveModule();
  lessonUnit.textContent = module.unit;
  lessonTitle.textContent = module.title;
  lessonSubtitle.textContent = module.subtitle;
  stageCaption.textContent = module.caption;
  questionList.innerHTML = module.questions.map((question) => `<li>${question}</li>`).join("");
  formulaBox.innerHTML = module.formulas.map((formula) => `<div class="formula-line">${formula}</div>`).join("");
  scriptList.innerHTML = module.script.map((step) => `<li>${step}</li>`).join("");
  updateQuickStats();
}

function renderControls() {
  const values = getValues();
  controlGroups.innerHTML = getActiveModule()
    .controls.map((control) => {
      if (control.type === "range") {
        const disabled = control.disabledWhen?.(values) ? "disabled" : "";
        return `
          <div class="control-item">
            <label class="control-label" for="${control.key}">
              <span>${control.label}</span>
              <span class="control-output" data-output-for="${control.key}">${formatValue(control, values)}</span>
            </label>
            <input
              id="${control.key}"
              type="range"
              min="${control.min}"
              max="${control.max}"
              step="${control.step}"
              value="${values[control.key]}"
              data-control="${control.key}"
              ${disabled}
            />
            ${control.hint ? `<p class="hint-text">${control.hint}</p>` : ""}
          </div>
        `;
      }

      if (control.type === "segmented") {
        return `
          <div class="control-item">
            <div class="control-label">
              <span>${control.label}</span>
              <span class="control-output" data-output-for="${control.key}">${formatValue(control, values)}</span>
            </div>
            <div class="segmented" role="group" aria-label="${control.label}">
              ${control.options
                .map(
                  (option) => `
                    <button
                      class="segment-button ${values[control.key] === option.value ? "active" : ""}"
                      type="button"
                      data-segment="${control.key}"
                      data-value="${option.value}"
                    >${option.label}</button>
                  `,
                )
                .join("")}
            </div>
          </div>
        `;
      }

      if (control.type === "toggle") {
        return `
          <div class="control-item">
            <label class="toggle-row">
              <span>${control.label}</span>
              <input type="checkbox" data-toggle="${control.key}" ${values[control.key] ? "checked" : ""} />
            </label>
          </div>
        `;
      }

      return "";
    })
    .join("");
}

function refreshControlOutputs() {
  const module = getActiveModule();
  const values = getValues();
  module.controls.forEach((control) => {
    const output = document.querySelector(`[data-output-for="${control.key}"]`);
    if (output) {
      output.textContent = formatValue(control, values);
    }
  });
  updateQuickStats();
}

function updateQuickStats() {
  const stats = getStats();
  quickStats.innerHTML = stats.map((stat) => `<span>${stat}</span>`).join("");
}

function getStats() {
  const values = getValues();
  switch (state.activeId) {
    case "formation":
      return [
        `A = ${values.amplitude}px`,
        `λ = ${values.wavelength}px`,
        `f = ${values.frequency.toFixed(2)}Hz`,
      ];
    case "transverseLongitudinal":
      return [`λ = ${values.wavelength}px`, `f = ${values.frequency.toFixed(2)}Hz`, values.mode === "compare" ? "横纵对照" : formatMode(values.mode)];
    case "waveGraph":
      return [`x = ${(values.probe * 100).toFixed(0)}%L`, `λ = ${values.wavelength}px`, `f = ${values.frequency.toFixed(2)}Hz`];
    case "relation": {
      const relation = getRelation(values);
      return [`v = ${relation.speed.toFixed(2)}m/s`, `λ = ${relation.lambda.toFixed(2)}m`, `f = ${relation.frequency.toFixed(2)}Hz`];
    }
    case "interference":
      return [`d = ${values.sourceDistance}px`, `λ = ${values.wavelength}px`, `Δφ = ${formatPhase(values.phase)}`];
    case "standing": {
      const harmonic = Math.round(values.harmonic);
      return [`n = ${harmonic}`, `节点 ${harmonic + 1} 个`, `腹点 ${harmonic} 个`];
    }
    case "reflection":
      return [`${values.endType === "fixed" ? "固定端" : "自由端"}`, `λ = ${values.wavelength}px`, `f = ${values.frequency.toFixed(2)}Hz`];
    default:
      return [];
  }
}

function formatMode(mode) {
  if (mode === "transverse") return "横波";
  if (mode === "longitudinal") return "纵波";
  return "对照";
}

function formatPhase(phase) {
  if (phase === "pi") return "π";
  if (phase === "halfPi") return "π/2";
  return "0";
}

function getPhaseRadians(phase) {
  if (phase === "pi") return Math.PI;
  if (phase === "halfPi") return Math.PI / 2;
  return 0;
}

function getRelation(values) {
  const frequency = values.frequency;
  const speed = values.relationMode === "fixed" ? values.mediumSpeed : values.wavelength * values.frequency;
  const lambda = values.relationMode === "fixed" ? values.mediumSpeed / values.frequency : values.wavelength;
  return { speed, lambda, frequency };
}

function setCanvasSize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const nextWidth = Math.max(320, Math.floor(rect.width));
  const nextHeight = Math.max(300, Math.floor(rect.height));

  if (canvas.width !== Math.floor(nextWidth * dpr) || canvas.height !== Math.floor(nextHeight * dpr)) {
    canvas.width = Math.floor(nextWidth * dpr);
    canvas.height = Math.floor(nextHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.width = nextWidth;
    state.height = nextHeight;
  }
}

function clearCanvas() {
  const { width: w, height: h } = state;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  drawGrid(0, 0, w, h, 28);
}

function drawGrid(x, y, w, h, gap = 28) {
  ctx.save();
  ctx.strokeStyle = "#e8eef3";
  ctx.lineWidth = 1;
  for (let gx = x; gx <= x + w; gx += gap) {
    ctx.beginPath();
    ctx.moveTo(gx, y);
    ctx.lineTo(gx, y + h);
    ctx.stroke();
  }
  for (let gy = y; gy <= y + h; gy += gap) {
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();
  }
  ctx.restore();
}

function drawAxis(x1, y1, x2, y2, label) {
  ctx.save();
  ctx.strokeStyle = "#7b8a9a";
  ctx.fillStyle = "#556575";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  drawArrowHead(x1, y1, x2, y2, "#7b8a9a");
  if (label) {
    ctx.font = "700 12px system-ui";
    ctx.fillText(label, x2 - 12, y2 - 8);
  }
  ctx.restore();
}

function drawArrowHead(x1, y1, x2, y2, color = "#17202a") {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(angle - Math.PI / 6), y2 - size * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - size * Math.cos(angle + Math.PI / 6), y2 - size * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLabel(text, x, y, color = "#25313d", align = "left") {
  ctx.save();
  ctx.font = "800 13px system-ui, sans-serif";
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function strokeRoundedRect(x, y, w, h, radius, stroke, fill) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  ctx.restore();
}

function drawWavePath({ x0, x1, mid, amplitude, wavelength, frequency, time, color, lineWidth = 3, phase = 0 }) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (let x = x0; x <= x1; x += 2) {
    const y = mid + amplitude * Math.sin(TAU * ((x - x0) / wavelength - frequency * time) + phase);
    if (x === x0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function waveY(x, x0, mid, amplitude, wavelength, frequency, time, phase = 0) {
  return mid + amplitude * Math.sin(TAU * ((x - x0) / wavelength - frequency * time) + phase);
}

function drawFormation(values) {
  const { width: w, height: h } = state;
  clearCanvas();
  const x0 = 54;
  const x1 = w - 38;
  const mid = h * 0.52;
  const time = state.time;

  ctx.save();
  ctx.strokeStyle = "#bfccd8";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(x0, mid);
  ctx.lineTo(x1, mid);
  ctx.stroke();
  ctx.restore();

  drawWavePath({
    x0,
    x1,
    mid,
    amplitude: values.amplitude,
    wavelength: values.wavelength,
    frequency: values.frequency,
    time,
    color: "#3066be",
    lineWidth: 4,
  });

  drawAxis(x0, h - 50, x1 - 10, h - 50, "传播方向");

  const driverY = waveY(x0, x0, mid, values.amplitude, values.wavelength, values.frequency, time);
  ctx.save();
  ctx.fillStyle = "#f2b705";
  ctx.strokeStyle = "#17202a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x0, driverY, 11, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  drawLabel("波源", x0 + 18, driverY - 18, "#17202a");

  if (values.showParticles) {
    for (let i = 0; i <= 18; i += 1) {
      const x = x0 + ((x1 - x0) * i) / 18;
      const y = waveY(x, x0, mid, values.amplitude, values.wavelength, values.frequency, time);
      const hueColor = i % 4 === 0 ? "#e85d4f" : i % 4 === 1 ? "#0f8b8d" : i % 4 === 2 ? "#4f9d69" : "#f2b705";
      ctx.save();
      ctx.strokeStyle = "rgba(23, 32, 42, 0.16)";
      ctx.beginPath();
      ctx.moveTo(x, mid - values.amplitude - 18);
      ctx.lineTo(x, mid + values.amplitude + 18);
      ctx.stroke();
      ctx.fillStyle = hueColor;
      ctx.strokeStyle = "#17202a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, TAU);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  if (values.showPhase) {
    const phaseOffset = ((values.frequency * time) % 1) * values.wavelength;
    for (let crest = x0 + phaseOffset + values.wavelength / 4; crest < x1; crest += values.wavelength) {
      ctx.save();
      ctx.strokeStyle = "rgba(232, 93, 79, 0.72)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 7]);
      ctx.beginPath();
      ctx.moveTo(crest, 42);
      ctx.lineTo(crest, h - 72);
      ctx.stroke();
      ctx.restore();
    }
    drawLabel("同相波峰标记", w - 170, 42, "#e85d4f");
  }

  const speed = values.wavelength * values.frequency;
  readout.innerHTML = `质点在竖直方向往复振动，波形向右传播。当前画布波速约为 <strong>${speed.toFixed(
    0,
  )} px/s</strong>，说明在此模型中 v = λf。`;
}

function drawTransverseLongitudinal(values) {
  const { width: w, height: h } = state;
  clearCanvas();
  const showCompare = values.mode === "compare";
  const topBand = showCompare ? { y: h * 0.3, label: "横波" } : { y: h * 0.5, label: formatMode(values.mode) };
  const bottomBand = { y: h * 0.7, label: "纵波" };

  if (values.mode !== "longitudinal") {
    drawTransverseBand(54, w - 46, topBand.y, values, topBand.label);
  }
  if (values.mode !== "transverse") {
    drawLongitudinalBand(62, w - 50, showCompare ? bottomBand.y : h * 0.5, values, bottomBand.label);
  }

  drawAxis(60, h - 44, w - 48, h - 44, "波传播方向");
  readout.innerHTML =
    values.mode === "compare"
      ? "横波和纵波的关键区别是质点振动方向与传播方向的关系；波本身都向右传播。"
      : `${formatMode(values.mode)}演示中，彩色质点只在平衡位置附近周期性运动。`;
}

function drawTransverseBand(x0, x1, mid, values, label) {
  ctx.save();
  ctx.strokeStyle = "#bfccd8";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(x0, mid);
  ctx.lineTo(x1, mid);
  ctx.stroke();
  ctx.restore();

  drawLabel(label, x0, mid - values.amplitude - 34, "#3066be");
  drawWavePath({
    x0,
    x1,
    mid,
    amplitude: values.amplitude,
    wavelength: values.wavelength,
    frequency: values.frequency,
    time: state.time,
    color: "#3066be",
    lineWidth: 3,
  });

  for (let i = 0; i < 17; i += 1) {
    const x = x0 + ((x1 - x0) * i) / 16;
    const y = waveY(x, x0, mid, values.amplitude, values.wavelength, values.frequency, state.time);
    ctx.save();
    ctx.fillStyle = i % 2 ? "#0f8b8d" : "#f2b705";
    ctx.strokeStyle = "#17202a";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, 5.5, 0, TAU);
    ctx.fill();
    ctx.stroke();
    if (values.showArrows && i % 4 === 0) {
      ctx.strokeStyle = "#e85d4f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, mid + 32);
      ctx.lineTo(x, mid - 32);
      ctx.stroke();
      drawArrowHead(x, mid + 32, x, mid - 32, "#e85d4f");
    }
    ctx.restore();
  }
}

function drawLongitudinalBand(x0, x1, mid, values, label) {
  const particleCount = 34;
  drawLabel(label, x0, mid - 72, "#0f8b8d");

  ctx.save();
  ctx.strokeStyle = "#bfccd8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x0, mid);
  ctx.lineTo(x1, mid);
  ctx.stroke();
  ctx.restore();

  for (let i = 0; i < particleCount; i += 1) {
    const baseX = x0 + ((x1 - x0) * i) / (particleCount - 1);
    const displacement =
      values.amplitude * Math.sin(TAU * ((baseX - x0) / values.wavelength - values.frequency * state.time));
    const x = baseX + displacement;
    const density = Math.cos(TAU * ((baseX - x0) / values.wavelength - values.frequency * state.time));
    const radius = 5 + Math.max(0, density) * 2.4;
    ctx.save();
    ctx.fillStyle = density > 0 ? "#0f8b8d" : "#82b6c9";
    ctx.strokeStyle = "#17202a";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.arc(x, mid, radius, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    if (i > 0) {
      const prevBase = x0 + ((x1 - x0) * (i - 1)) / (particleCount - 1);
      const prevDisp =
        values.amplitude * Math.sin(TAU * ((prevBase - x0) / values.wavelength - values.frequency * state.time));
      ctx.save();
      ctx.strokeStyle = "rgba(15, 139, 141, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(prevBase + prevDisp, mid);
      ctx.lineTo(x, mid);
      ctx.stroke();
      ctx.restore();
    }
  }

  for (let x = x0; x < x1; x += values.wavelength / 2) {
    const density = Math.cos(TAU * ((x - x0) / values.wavelength - values.frequency * state.time));
    if (density > 0.84) {
      ctx.save();
      ctx.fillStyle = "rgba(242, 183, 5, 0.18)";
      ctx.fillRect(x - 16, mid - 38, 32, 76);
      ctx.restore();
    }
  }

  if (values.showArrows) {
    ctx.save();
    ctx.strokeStyle = "#e85d4f";
    ctx.lineWidth = 2;
    const arrowY = mid + 48;
    for (let i = 0; i < 5; i += 1) {
      const x = x0 + 40 + i * 72;
      ctx.beginPath();
      ctx.moveTo(x - 18, arrowY);
      ctx.lineTo(x + 18, arrowY);
      ctx.stroke();
      drawArrowHead(x - 18, arrowY, x + 18, arrowY, "#e85d4f");
    }
    ctx.restore();
    drawLabel("质点振动方向", x0 + 16, mid + 76, "#e85d4f");
  }
}

function drawWaveGraph(values) {
  const { width: w, height: h } = state;
  clearCanvas();
  const margin = 46;
  const gap = 28;
  const topH = h * 0.46;
  const bottomY = topH + gap;
  const graphW = w - margin * 2;
  const x0 = margin;
  const x1 = w - margin;
  const midTop = topH * 0.54;
  const midBottom = bottomY + (h - bottomY - 44) * 0.5;
  const probeX = x0 + graphW * values.probe;
  const probeY = waveY(probeX, x0, midTop, values.amplitude, values.wavelength, values.frequency, state.time);

  drawSubplotFrame(x0, 34, graphW, topH - 50, "波的图像 y-x：固定当前时刻 t");
  drawWavePath({
    x0,
    x1,
    mid: midTop,
    amplitude: values.amplitude,
    wavelength: values.wavelength,
    frequency: values.frequency,
    time: state.time,
    color: "#3066be",
    lineWidth: 3,
  });

  ctx.save();
  ctx.strokeStyle = "#e85d4f";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(probeX, 44);
  ctx.lineTo(probeX, topH - 18);
  ctx.stroke();
  ctx.fillStyle = "#e85d4f";
  ctx.beginPath();
  ctx.arc(probeX, probeY, 7, 0, TAU);
  ctx.fill();
  ctx.restore();
  drawLabel("探针", probeX + 10, probeY - 20, "#e85d4f");

  if (values.showSlope) {
    const slope =
      (waveY(probeX + 2, x0, midTop, values.amplitude, values.wavelength, values.frequency, state.time) -
        waveY(probeX - 2, x0, midTop, values.amplitude, values.wavelength, values.frequency, state.time)) /
      4;
    const direction = slope > 0 ? "向下振动" : "向上振动";
    strokeRoundedRect(w - 198, 48, 148, 38, 8, "#d8e0e7", "#ffffff");
    drawLabel(`右行波此点将${direction}`, w - 186, 67, "#25313d");
  }

  drawSubplotFrame(x0, bottomY, graphW, h - bottomY - 44, "振动图像 y-t：固定探针位置 x");
  drawTimeTrace(x0, x1, midBottom, values, probeX, graphW);

  readout.innerHTML =
    "上图是同一时刻沿传播方向的空间分布，可读出 λ；下图是探针位置的历史记录，可读出 T。";
}

function drawSubplotFrame(x, y, w, h, title) {
  strokeRoundedRect(x, y, w, h, 8, "#d8e0e7", "rgba(255,255,255,0.72)");
  drawLabel(title, x + 14, y + 20, "#25313d");
  ctx.save();
  ctx.strokeStyle = "#bfccd8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 16, y + h / 2);
  ctx.lineTo(x + w - 16, y + h / 2);
  ctx.stroke();
  ctx.restore();
}

function drawTimeTrace(x0, x1, mid, values, probeX, graphW) {
  const traceWidth = x1 - x0 - 32;
  const startX = x0 + 16;
  const endX = startX + traceWidth;
  const samples = 180;
  const timeWindow = 3 / values.frequency;
  ctx.save();
  ctx.strokeStyle = "#0f8b8d";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= samples; i += 1) {
    const ratio = i / samples;
    const sampleTime = state.time - timeWindow * (1 - ratio);
    const y =
      mid +
      values.amplitude * Math.sin(TAU * ((probeX - x0) / values.wavelength - values.frequency * sampleTime));
    const x = startX + traceWidth * ratio;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = "#e85d4f";
  const currentY = waveY(probeX, x0, mid, values.amplitude, values.wavelength, values.frequency, state.time);
  ctx.beginPath();
  ctx.arc(endX, currentY, 7, 0, TAU);
  ctx.fill();
  ctx.restore();
  drawLabel("现在", endX - 34, currentY - 20, "#e85d4f");
  drawLabel("过去", startX, mid + values.amplitude + 26, "#607080");
  drawLabel("时间 t", endX - 40, mid + values.amplitude + 26, "#607080");
  drawLabel(`T = ${(1 / values.frequency).toFixed(2)} s`, x0 + graphW - 140, mid - values.amplitude - 22, "#0f8b8d");
}

function drawRelation(values) {
  const { width: w, height: h } = state;
  clearCanvas();
  const relation = getRelation(values);
  const x0 = 62;
  const x1 = w - 62;
  const mid = h * 0.48;
  const amplitude = 42;
  const pixelsPerMeter = Math.min(135, Math.max(44, (x1 - x0) / Math.max(3.5, relation.lambda * 2.15)));
  const lambdaPx = relation.lambda * pixelsPerMeter;

  ctx.save();
  ctx.strokeStyle = "#bfccd8";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(x0, mid);
  ctx.lineTo(x1, mid);
  ctx.stroke();
  ctx.restore();

  drawWavePath({
    x0,
    x1,
    mid,
    amplitude,
    wavelength: lambdaPx,
    frequency: relation.frequency,
    time: state.time,
    color: "#3066be",
    lineWidth: 4,
  });

  if (values.showMeasure) {
    const start = x0 + 80;
    const end = start + lambdaPx;
    drawBracket(start, mid + amplitude + 36, end, mid + amplitude + 36, `λ = ${relation.lambda.toFixed(2)} m`);
  }

  const cardW = Math.min(300, w - 90);
  strokeRoundedRect(w - cardW - 36, 36, cardW, 116, 8, "#d8e0e7", "rgba(255,255,255,0.94)");
  drawLabel("关系式", w - cardW - 18, 60, "#607080");
  ctx.save();
  ctx.font = "900 30px system-ui";
  ctx.fillStyle = "#17202a";
  ctx.fillText("v = λf", w - cardW - 18, 100);
  ctx.font = "800 14px system-ui";
  ctx.fillStyle = "#0f8b8d";
  ctx.fillText(`${relation.speed.toFixed(2)} = ${relation.lambda.toFixed(2)} × ${relation.frequency.toFixed(2)}`, w - cardW - 18, 130);
  ctx.restore();

  drawAxis(x0, h - 50, x1 - 12, h - 50, "传播方向");
  readout.innerHTML =
    values.relationMode === "fixed"
      ? `同一介质模式：v 固定为 <strong>${relation.speed.toFixed(2)} m/s</strong>，因此频率变化时 λ = v/f 会自动调整。`
      : `自由探索模式：当前乘积 λf = <strong>${relation.speed.toFixed(2)} m/s</strong>，可用来检验 v = λf。`;
}

function drawBracket(x1, y1, x2, y2, label) {
  ctx.save();
  ctx.strokeStyle = "#e85d4f";
  ctx.fillStyle = "#e85d4f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1 - 12);
  ctx.lineTo(x1, y1 + 12);
  ctx.moveTo(x2, y2 - 12);
  ctx.lineTo(x2, y2 + 12);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.font = "800 13px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(label, (x1 + x2) / 2, y1 + 24);
  ctx.restore();
}

function drawInterference(values) {
  const { width: w, height: h } = state;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#f9fbfd";
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.38;
  const cy = h * 0.5;
  const s1 = { x: cx, y: cy - values.sourceDistance / 2 };
  const s2 = { x: cx, y: cy + values.sourceDistance / 2 };
  const phase = getPhaseRadians(values.phase);
  const cell = Math.max(4, Math.floor(w / 190));
  const omega = TAU * 0.9;
  const k = TAU / values.wavelength;

  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const r1 = Math.hypot(x - s1.x, y - s1.y);
      const r2 = Math.hypot(x - s2.x, y - s2.y);
      const a1 = Math.exp(-values.damping * r1);
      const a2 = Math.exp(-values.damping * r2);
      const value =
        a1 * Math.sin(k * r1 - omega * state.time) + a2 * Math.sin(k * r2 - omega * state.time + phase);
      ctx.fillStyle = interferenceColor(value);
      ctx.fillRect(x, y, cell + 0.5, cell + 0.5);
    }
  }

  ctx.save();
  ctx.strokeStyle = "rgba(23, 32, 42, 0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 34) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();

  if (values.showEnvelope) {
    drawInterferenceEnvelope(s1, s2, values, phase);
  }

  drawSource(s1.x, s1.y, "S1");
  drawSource(s2.x, s2.y, "S2");
  drawAxis(w * 0.12, h - 42, w * 0.88, h - 42, "波向四周传播");

  readout.innerHTML = `当前初相差 Δφ = <strong>${formatPhase(values.phase)}</strong>。亮红/亮蓝表示瞬时位移较大，浅色带附近可用来讨论相消或节点区域。`;
}

function interferenceColor(value) {
  const normalized = Math.max(-1, Math.min(1, value / 1.8));
  const intensity = Math.abs(normalized);
  if (normalized > 0) {
    return `rgba(232, 93, 79, ${0.08 + intensity * 0.62})`;
  }
  return `rgba(48, 102, 190, ${0.08 + intensity * 0.62})`;
}

function drawInterferenceEnvelope(s1, s2, values, phase) {
  const { width: w, height: h } = state;
  const step = 12;
  ctx.save();
  for (let y = step; y < h - step; y += step) {
    for (let x = step; x < w - step; x += step) {
      const r1 = Math.hypot(x - s1.x, y - s1.y);
      const r2 = Math.hypot(x - s2.x, y - s2.y);
      const envelope = Math.abs(Math.cos((Math.PI * (r1 - r2)) / values.wavelength - phase / 2));
      if (envelope > 0.982) {
        ctx.fillStyle = "rgba(242, 183, 5, 0.88)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, TAU);
        ctx.fill();
      } else if (envelope < 0.035) {
        ctx.fillStyle = "rgba(23, 32, 42, 0.58)";
        ctx.fillRect(x - 1.4, y - 1.4, 2.8, 2.8);
      }
    }
  }
  ctx.restore();
  drawLabel("黄点：相长  深点：相消", 26, 30, "#25313d");
}

function drawSource(x, y, label) {
  ctx.save();
  ctx.fillStyle = "#f2b705";
  ctx.strokeStyle = "#17202a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.font = "900 13px system-ui";
  ctx.fillStyle = "#17202a";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
  ctx.restore();
}

function drawStanding(values) {
  const { width: w, height: h } = state;
  clearCanvas();
  const x0 = 62;
  const x1 = w - 62;
  const mid = h * 0.5;
  const length = x1 - x0;
  const n = Math.round(values.harmonic);
  const omega = TAU * (0.35 + n * 0.16);

  ctx.save();
  ctx.strokeStyle = "#17202a";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x0, mid - 82);
  ctx.lineTo(x0, mid + 82);
  ctx.moveTo(x1, mid - 82);
  ctx.lineTo(x1, mid + 82);
  ctx.stroke();
  ctx.restore();

  if (values.showEnvelope) {
    ctx.save();
    ctx.strokeStyle = "rgba(232, 93, 79, 0.45)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    drawStandingEnvelope(x0, x1, mid, values.amplitude * 2, n, 1);
    drawStandingEnvelope(x0, x1, mid, values.amplitude * 2, n, -1);
    ctx.restore();
  }

  ctx.save();
  ctx.strokeStyle = "#3066be";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = 0; i <= length; i += 2) {
    const x = x0 + i;
    const y = mid + 2 * values.amplitude * Math.sin((n * Math.PI * i) / length) * Math.cos(omega * state.time);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  if (values.showNodes) {
    for (let i = 0; i <= n; i += 1) {
      const x = x0 + (length * i) / n;
      drawNodeMarker(x, mid, "节点");
    }
    for (let i = 0; i < n; i += 1) {
      const x = x0 + (length * (i + 0.5)) / n;
      drawAntinodeMarker(x, mid, "腹点");
    }
  }

  const lambda = 2 / n;
  const f = (n * values.waveSpeed) / 2;
  drawLabel(`L = ${n} × λ/2`, x0 + 12, 42, "#25313d");
  drawLabel(`λ = ${(lambda).toFixed(2)}L,  fₙ = ${f.toFixed(2)} Hz`, x0 + 12, 66, "#0f8b8d");
  readout.innerHTML = `固定两端时，第 ${n} 谐波包含 <strong>${n}</strong> 个半波长，节点数为 <strong>${n + 1}</strong>，腹点数为 <strong>${n}</strong>。`;
}

function drawStandingEnvelope(x0, x1, mid, amplitude, n, sign) {
  const length = x1 - x0;
  ctx.beginPath();
  for (let i = 0; i <= length; i += 2) {
    const x = x0 + i;
    const y = mid + sign * amplitude * Math.abs(Math.sin((n * Math.PI * i) / length));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawNodeMarker(x, y, label) {
  ctx.save();
  ctx.fillStyle = "#17202a";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(23,32,42,0.2)";
  ctx.beginPath();
  ctx.moveTo(x, y - 78);
  ctx.lineTo(x, y + 78);
  ctx.stroke();
  ctx.restore();
  if (x < state.width - 90) drawLabel(label, x + 8, y + 72, "#17202a");
}

function drawAntinodeMarker(x, y, label) {
  ctx.save();
  ctx.fillStyle = "#f2b705";
  ctx.strokeStyle = "#17202a";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(x, y, 5.5, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  if (x < state.width - 90) drawLabel(label, x + 8, y - 72, "#a97700");
}

function drawReflection(values) {
  const { width: w, height: h } = state;
  clearCanvas();
  const x0 = 58;
  const x1 = w - 70;
  const mid = h * 0.5;
  const length = x1 - x0;
  const sign = values.endType === "fixed" ? -1 : 1;

  ctx.save();
  ctx.strokeStyle = "#17202a";
  ctx.lineWidth = 5;
  ctx.beginPath();
  if (values.endType === "fixed") {
    ctx.moveTo(x1, mid - 110);
    ctx.lineTo(x1, mid + 110);
  } else {
    ctx.moveTo(x1, mid - 86);
    ctx.lineTo(x1, mid + 86);
    ctx.moveTo(x1 - 22, mid - 86);
    ctx.lineTo(x1 + 22, mid - 86);
    ctx.moveTo(x1 - 22, mid + 86);
    ctx.lineTo(x1 + 22, mid + 86);
  }
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "#bfccd8";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(x0, mid);
  ctx.lineTo(x1, mid);
  ctx.stroke();
  ctx.restore();

  if (values.showComponents) {
    drawIncidentReflected(x0, x1, mid, values, sign);
  }

  ctx.save();
  ctx.strokeStyle = "#3066be";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = 0; i <= length; i += 2) {
    const x = x0 + i;
    const incident = values.amplitude * Math.sin(TAU * (i / values.wavelength - values.frequency * state.time));
    const reflected =
      sign *
      values.amplitude *
      Math.sin(TAU * ((2 * length - i) / values.wavelength - values.frequency * state.time));
    const y = mid + incident + reflected;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  drawAxis(x0, h - 44, x1 - 16, h - 44, "入射方向");
  drawLabel(values.endType === "fixed" ? "固定端：反相反射" : "自由端：同相反射", x1 - 170, 44, "#e85d4f");
  readout.innerHTML =
    values.endType === "fixed"
      ? "固定端要求边界处合位移为零，因此反射波相对入射波发生 π 的相位反转。"
      : "自由端边界处可发生位移，反射波不反相，端点附近可能出现更大的合振幅。";
}

function drawIncidentReflected(x0, x1, mid, values, sign) {
  const length = x1 - x0;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.setLineDash([7, 7]);
  ctx.strokeStyle = "rgba(15, 139, 141, 0.8)";
  ctx.beginPath();
  for (let i = 0; i <= length; i += 2) {
    const x = x0 + i;
    const y = mid + values.amplitude * Math.sin(TAU * (i / values.wavelength - values.frequency * state.time));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(232, 93, 79, 0.8)";
  ctx.beginPath();
  for (let i = 0; i <= length; i += 2) {
    const x = x0 + i;
    const y =
      mid +
      sign *
        values.amplitude *
        Math.sin(TAU * ((2 * length - i) / values.wavelength - values.frequency * state.time));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
  drawLabel("虚线绿：入射波", x0 + 12, 46, "#0f8b8d");
  drawLabel("虚线红：反射波", x0 + 12, 70, "#e85d4f");
}

function drawFrame() {
  setCanvasSize();
  switch (state.activeId) {
    case "formation":
      drawFormation(getValues());
      break;
    case "transverseLongitudinal":
      drawTransverseLongitudinal(getValues());
      break;
    case "waveGraph":
      drawWaveGraph(getValues());
      break;
    case "relation":
      drawRelation(getValues());
      break;
    case "interference":
      drawInterference(getValues());
      break;
    case "standing":
      drawStanding(getValues());
      break;
    case "reflection":
      drawReflection(getValues());
      break;
    default:
      drawFormation(getValues());
  }
}

function tick(now) {
  const delta = Math.min(0.05, (now - state.lastFrame) / 1000);
  state.lastFrame = now;
  if (state.playing) {
    state.time += delta * state.speed;
  }
  drawFrame();
  requestAnimationFrame(tick);
}

lessonNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lesson]");
  if (!button) return;
  state.activeId = button.dataset.lesson;
  state.time = 0;
  renderNav();
  renderLessonMeta();
  renderControls();
  drawFrame();
});

controlGroups.addEventListener("input", (event) => {
  const target = event.target;
  const key = target.dataset.control;
  if (!key) return;
  getValues()[key] = Number(target.value);
  refreshControlOutputs();
});

controlGroups.addEventListener("click", (event) => {
  const segment = event.target.closest("[data-segment]");
  if (segment) {
    const key = segment.dataset.segment;
    getValues()[key] = segment.dataset.value;
    renderControls();
    updateQuickStats();
    return;
  }
});

controlGroups.addEventListener("change", (event) => {
  const target = event.target;
  const key = target.dataset.toggle;
  if (!key) return;
  getValues()[key] = target.checked;
  refreshControlOutputs();
});

playToggle.addEventListener("click", () => {
  state.playing = !state.playing;
  playToggle.textContent = state.playing ? "暂停" : "播放";
});

resetTime.addEventListener("click", () => {
  state.time = 0;
  drawFrame();
});

speedRange.addEventListener("input", () => {
  state.speed = Number(speedRange.value);
});

window.addEventListener("resize", () => {
  setCanvasSize();
  drawFrame();
});

renderNav();
renderLessonMeta();
renderControls();
setCanvasSize();
requestAnimationFrame(tick);
