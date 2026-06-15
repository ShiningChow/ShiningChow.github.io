const TAU = Math.PI * 2;
const G = 9.8;

const palette = {
  ink: "#17202a",
  muted: "#607080",
  line: "#d8e0e7",
  grid: "#e8eef3",
  blue: "#3066be",
  teal: "#0f8b8d",
  coral: "#e85d4f",
  amber: "#d92d20",
  green: "#4f9d69",
  purple: "#7653c7",
};

const chapters = [
  {
    id: "motion-description",
    title: "第一章 运动的描述",
    sections: [
      {
        id: "particle-frame",
        number: "1-1",
        unit: "第一章 运动的描述",
        title: "质点 参考系",
        focus: "把复杂物体抽象为质点，理解运动描述依赖参考系",
        subtitle:
          "用并排行驶的小车说明：同一物体在不同参考系中的速度和轨迹可以不同，质点模型服务于具体研究问题。",
        caption: "参考系切换与相对运动",
        sim: "frames",
        formulas: ["质点：忽略大小和形状的理想模型", "位置 x 依赖所选参考系", "相对速度：v相 = v物 - v参考系"],
        questions: [
          "在地面参考系中红车是否运动？在蓝车参考系中呢？",
          "什么时候可以把火车看成质点？什么时候不可以？",
          "若两车同速同向，彼此看到的相对运动是什么？",
        ],
        script: [
          "先选择地面参考系，观察红车和蓝车的位置变化。",
          "切换到蓝车参考系，强调坐标原点随参考系运动。",
          "把两车速度调成相同，引出相对静止。",
        ],
        controls: [
          range("objectSpeed", "红车速度", -4, 8, 0.2, 4, "m/s"),
          range("observerSpeed", "蓝车速度", -4, 8, 0.2, 1.8, "m/s"),
          segmented("frame", "观察参考系", "ground", [
            ["地面", "ground"],
            ["蓝车", "car"],
          ]),
          toggle("showTrail", "显示轨迹", true),
        ],
        stats: (v) => [`v红 = ${v.objectSpeed.toFixed(1)}m/s`, `v蓝 = ${v.observerSpeed.toFixed(1)}m/s`, `v相 = ${(v.objectSpeed - (v.frame === "car" ? v.observerSpeed : 0)).toFixed(1)}m/s`],
      },
      {
        id: "time-displacement",
        number: "1-2",
        unit: "第一章 运动的描述",
        title: "时间 位移",
        focus: "区分时刻、时间间隔、路程和位移",
        subtitle:
          "用一段弯曲路线演示：路程是路径长度，位移是从初位置指向末位置的有向线段，二者通常不同。",
        caption: "路程与位移的几何差异",
        sim: "displacement",
        formulas: ["Δx = x₂ - x₁", "位移是矢量，路程是标量", "时间间隔 Δt = t₂ - t₁"],
        questions: [
          "只知道路程，能否确定物体的末位置？",
          "往返运动一周时，路程和位移分别是多少？",
          "位移为负是否意味着物体没有运动？",
        ],
        script: [
          "拖动起点和终点，比较直线位移与曲线路程。",
          "增大路径弯曲程度，让学生估计路程如何变化。",
          "点重来一次后观察不同瞬间，区分“时刻”和“经历的时间”。",
        ],
        controls: [
          range("startX", "起点位置 x₁", -5, 3, 0.5, -3, "m"),
          range("endX", "终点位置 x₂", -3, 7, 0.5, 5, "m"),
          range("curvature", "路径弯曲程度", 0, 1, 0.05, 0.55, ""),
          toggle("showPath", "显示运动路径", true),
        ],
        stats: (v) => [`x₁ = ${v.startX.toFixed(1)}m`, `x₂ = ${v.endX.toFixed(1)}m`, `Δx = ${(v.endX - v.startX).toFixed(1)}m`],
      },
      {
        id: "velocity",
        number: "1-3",
        unit: "第一章 运动的描述",
        title: "位置变化快慢的描述——速度",
        focus: "用位移与时间的比值、x-t 图像斜率理解速度",
        subtitle:
          "在运动轨迹和 x-t 图像之间建立联系：平均速度看割线斜率，瞬时速度看切线斜率。",
        caption: "速度与 x-t 图像斜率",
        sim: "velocity",
        formulas: ["平均速度：v = Δx/Δt", "瞬时速度：某一时刻运动快慢和方向", "x-t 图像斜率表示速度"],
        questions: [
          "x-t 图像越陡说明什么？",
          "速度为负时，物体一定在减速吗？",
          "曲线图像上某点的瞬时速度该怎样读取？",
        ],
        script: [
          "先选匀速运动，说明 x-t 图像为直线。",
          "切换变速运动，观察斜率随时间改变。",
          "把初速度调为负值，讨论速度方向。",
        ],
        controls: [
          segmented("motionMode", "运动类型", "changing", [
            ["变速", "changing"],
            ["匀速", "uniform"],
          ]),
          range("initialVelocity", "初速度 v₀", -4, 8, 0.2, 2, "m/s"),
          range("acceleration", "加速度 a", -2.5, 3.5, 0.1, 0.8, "m/s²"),
          toggle("showTangent", "显示瞬时斜率", true),
        ],
        stats: (v) => [`v₀ = ${v.initialVelocity.toFixed(1)}m/s`, `a = ${(v.motionMode === "uniform" ? 0 : v.acceleration).toFixed(1)}m/s²`, v.motionMode === "uniform" ? "x-t 直线" : "x-t 曲线"],
      },
      {
        id: "acceleration",
        number: "1-4",
        unit: "第一章 运动的描述",
        title: "速度变化快慢的描述——加速度",
        focus: "用速度变化量和时间的比值理解加速度",
        subtitle:
          "把速度矢量、速度变化量和 v-t 图像放在同一画布中，帮助学生区分速度大小、速度方向和速度变化快慢。",
        caption: "加速度与 v-t 图像斜率",
        sim: "acceleration",
        formulas: ["a = Δv/Δt", "v-t 图像斜率表示加速度", "加速度方向与速度变化量方向相同"],
        questions: [
          "加速度为负，物体一定在变慢吗？",
          "速度为零时，加速度能否不为零？",
          "同样的 Δv，用时越短意味着什么？",
        ],
        script: [
          "调节 a 的正负，观察 v-t 直线斜率变化。",
          "让学生比较 v、Δv、a 三个箭头。",
          "把 v₀ 调为负值，讨论加速度与运动方向的关系。",
        ],
        controls: [
          range("v0", "初速度 v₀", -6, 8, 0.2, 1.5, "m/s"),
          range("a", "加速度 a", -4, 4, 0.1, 1.2, "m/s²"),
          range("deltaT", "观察时间 Δt", 1, 5, 0.2, 3, "s"),
          toggle("showDelta", "显示 Δv", true),
        ],
        stats: (v) => [`v₀ = ${v.v0.toFixed(1)}m/s`, `a = ${v.a.toFixed(1)}m/s²`, `Δv = ${(v.a * v.deltaT).toFixed(1)}m/s`],
      },
    ],
  },
  {
    id: "uniform-acceleration",
    title: "第二章 匀变速直线运动的研究",
    sections: [
      {
        id: "ticker",
        number: "2-1",
        unit: "第二章 匀变速直线运动的研究",
        title: "实验：探究小车速度随时间变化的规律",
        focus: "用纸带点迹估算速度并寻找 v-t 线性关系",
        subtitle:
          "用打点计时器纸带模拟实验数据，点距逐渐增大时，分段速度也随时间近似线性变化。",
        caption: "纸带点迹与 v-t 拟合",
        sim: "ticker",
        formulas: ["相邻计数点时间间隔相等", "中间时刻速度可用邻近位移估算", "若 v-t 图像近似直线，则 a 近似恒定"],
        questions: [
          "点迹间距越来越大说明小车怎样运动？",
          "为什么常用一段位移除以对应时间估算中间时刻速度？",
          "数据点不完全在直线上时，应如何处理实验误差？",
        ],
        script: [
          "先降低加速度，观察纸带点距较均匀。",
          "增大加速度，让学生读出相邻点距变化。",
          "打开速度估算，连接 v-t 数据点判断规律。",
        ],
        controls: [
          range("v0", "初速度 v₀", 0, 2.5, 0.1, 0.4, "m/s"),
          range("a", "小车加速度 a", 0.2, 3.5, 0.1, 1.4, "m/s²"),
          range("interval", "打点间隔", 0.04, 0.12, 0.01, 0.08, "s"),
          toggle("showFit", "显示 v-t 拟合", true),
        ],
        stats: (v) => [`T = ${v.interval.toFixed(2)}s`, `a ≈ ${v.a.toFixed(1)}m/s²`, `v₀ = ${v.v0.toFixed(1)}m/s`],
      },
      {
        id: "vt-relation",
        number: "2-2",
        unit: "第二章 匀变速直线运动的研究",
        title: "匀变速直线运动的速度与时间的关系",
        focus: "从 v-t 图像读出 v = v₀ + at",
        subtitle:
          "调节初速度和加速度，观察 v-t 图像的截距与斜率，并同步查看小车运动状态。",
        caption: "v = v₀ + at 动态图像",
        sim: "vtRelation",
        formulas: ["v = v₀ + at", "v-t 图像斜率为 a", "v-t 图像纵截距为 v₀"],
        questions: [
          "图像与纵轴交点代表什么？",
          "斜率为负时，速度一定一直为负吗？",
          "什么时候物体会先减速到零再反向运动？",
        ],
        script: [
          "设置 a = 0，对比匀速运动的 v-t 图像。",
          "逐步增大 a，观察斜率变化。",
          "设置 v₀ 为负或 a 为负，讨论方向。",
        ],
        controls: [
          range("v0", "初速度 v₀", -5, 8, 0.2, 1.5, "m/s"),
          range("a", "加速度 a", -3, 4, 0.1, 1.1, "m/s²"),
          range("duration", "观察时长", 3, 8, 0.5, 6, "s"),
          toggle("showArea", "显示位移面积", true),
        ],
        stats: (v) => [`v₀ = ${v.v0.toFixed(1)}m/s`, `a = ${v.a.toFixed(1)}m/s²`, `t = ${v.duration.toFixed(1)}s`],
      },
      {
        id: "st-relation",
        number: "2-3",
        unit: "第二章 匀变速直线运动的研究",
        title: "匀变速直线运动的位移与时间的关系",
        focus: "理解 x = v₀t + 1/2 at² 与 v-t 面积",
        subtitle:
          "同一组参数同时显示 s-t 曲线和 v-t 面积，让学生看见二次函数来源于速度随时间线性变化。",
        caption: "位移公式与图像面积",
        sim: "stRelation",
        formulas: ["x = v₀t + 1/2 at²", "v-t 图像与时间轴围成面积表示位移", "平均速度法：x = (v₀ + v)t/2"],
        questions: [
          "为什么 s-t 图像通常是抛物线？",
          "v-t 图像下方的面积为什么表示位移？",
          "初速度为零时，位移与时间平方有什么关系？",
        ],
        script: [
          "把 v₀ 调为 0，观察 x 与 t² 的关系。",
          "显示 v-t 面积，拆成矩形和三角形。",
          "改变 a 的符号，讨论位移可能变小或反向。",
        ],
        controls: [
          range("v0", "初速度 v₀", -2, 6, 0.2, 1, "m/s"),
          range("a", "加速度 a", -1.5, 3, 0.1, 0.9, "m/s²"),
          range("duration", "观察时长", 3, 8, 0.5, 6, "s"),
          toggle("showArea", "显示 v-t 面积", true),
        ],
        stats: (v) => [`x = v₀t + 1/2at²`, `v₀ = ${v.v0.toFixed(1)}`, `a = ${v.a.toFixed(1)}`],
      },
      {
        id: "free-fall",
        number: "2-4",
        unit: "第二章 匀变速直线运动的研究",
        title: "自由落体运动",
        focus: "只受重力时的匀加速直线运动",
        subtitle:
          "用频闪小球和高度尺演示自由落体，点距随时间增大，忽略空气阻力时加速度近似为 g。",
        caption: "自由落体与频闪轨迹",
        sim: "freeFall",
        formulas: ["v = gt", "h = 1/2 gt²", "v² = 2gh"],
        questions: [
          "相邻频闪点间距为什么越来越大？",
          "同一地点不同质量的小球，理想情况下谁先落地？",
          "空气阻力会怎样改变频闪点间距？",
        ],
        script: [
          "先关闭空气阻力，观察标准自由落体。",
          "调节 g 的大小，比较落地时间。",
          "打开空气阻力，说明真实情境与理想模型的差异。",
        ],
        controls: [
          range("height", "释放高度 h", 2, 20, 0.5, 12, "m"),
          range("g", "重力加速度 g", 1.6, 12, 0.1, 9.8, "m/s²"),
          toggle("airResistance", "加入空气阻力", false),
          toggle("showStrobe", "显示频闪点", true),
        ],
        stats: (v) => [`h = ${v.height.toFixed(1)}m`, `g = ${v.g.toFixed(1)}m/s²`, `t落 ≈ ${Math.sqrt((2 * v.height) / v.g).toFixed(2)}s`],
      },
    ],
  },
  {
    id: "interaction-force",
    title: "第三章 相互作用——力",
    sections: [
      {
        id: "gravity-elastic",
        number: "3-1",
        unit: "第三章 相互作用——力",
        title: "重力与弹力",
        focus: "重力方向、弹力产生条件与胡克定律",
        subtitle:
          "用悬挂弹簧和物块演示：物体受到重力，弹簧因形变产生弹力，静止时两力大小相等方向相反。",
        caption: "弹簧形变、重力和弹力",
        sim: "gravityElastic",
        formulas: ["G = mg", "F弹 = kx", "弹力产生条件：接触并发生形变"],
        questions: [
          "弹簧伸长量与物体质量有什么关系？",
          "物体静止时，重力和弹力为什么不是作用力与反作用力？",
          "支持力、压力和拉力都属于哪类力？",
        ],
        script: [
          "逐步增大质量，观察弹簧伸长量。",
          "改变劲度系数 k，比较软弹簧和硬弹簧。",
          "显示力箭头，强调重力竖直向下、弹力沿形变恢复方向。",
        ],
        controls: [
          segmented("elasticScene", "演示场景", "hang", [
            ["悬挂平衡", "hang"],
            ["水平形变", "horizontal"],
            ["测力计", "meter"],
          ]),
          range("mass", "物体质量 m", 0.2, 5, 0.1, 1.5, "kg"),
          range("k", "弹簧劲度系数 k", 10, 120, 2, 50, "N/m"),
          range("g", "重力加速度 g", 1.6, 12, 0.1, 9.8, "m/s²"),
          toggle("showForces", "显示力箭头", true),
        ],
        stats: (v) => [`G = ${(v.mass * v.g).toFixed(1)}N`, `x = ${((v.mass * v.g) / v.k).toFixed(2)}m`, `k = ${v.k.toFixed(0)}N/m`],
      },
      {
        id: "friction",
        number: "3-2",
        unit: "第三章 相互作用——力",
        title: "摩擦力",
        focus: "静摩擦力、滑动摩擦力与最大静摩擦力",
        subtitle:
          "推动木块时，静摩擦力会随外力调整；超过最大静摩擦力后，木块开始滑动并受到滑动摩擦力。",
        caption: "静摩擦与滑动摩擦切换",
        sim: "friction",
        formulas: ["f静 ≤ f静max", "f滑 = μN", "摩擦力方向阻碍相对运动或相对运动趋势"],
        questions: [
          "外力较小时，木块为什么不动？",
          "静摩擦力是否一定等于 μN？",
          "滑动后摩擦力大小主要由哪些因素决定？",
        ],
        script: [
          "从小外力开始，观察静摩擦力随外力同步增大。",
          "越过最大静摩擦力，观察木块开始运动。",
          "改变正压力或摩擦因数，讨论影响因素。",
        ],
        controls: [
          segmented("frictionScene", "演示场景", "horizontal", [
            ["水平推块", "horizontal"],
            ["斜面趋势", "incline"],
            ["叠放物块", "stack"],
          ]),
          range("push", "水平推力 F", 0, 80, 1, 24, "N"),
          range("normal", "正压力 N", 20, 120, 2, 60, "N"),
          range("muStatic", "静摩擦因数 μs", 0.1, 0.9, 0.02, 0.45, ""),
          range("muKinetic", "动摩擦因数 μk", 0.05, 0.8, 0.02, 0.28, ""),
        ],
        stats: (v) => [`F = ${v.push.toFixed(0)}N`, `fmax = ${(v.muStatic * v.normal).toFixed(1)}N`, `μkN = ${(v.muKinetic * v.normal).toFixed(1)}N`],
      },
      {
        id: "third-law",
        number: "3-3",
        unit: "第三章 相互作用——力",
        title: "牛顿第三定律",
        focus: "作用力与反作用力大小相等、方向相反、作用在不同物体上",
        subtitle:
          "两名滑手互推时，彼此受到的力大小相等方向相反，但加速度大小会因质量不同而不同。",
        caption: "作用力与反作用力",
        sim: "actionReaction",
        formulas: ["F_AB = -F_BA", "作用力和反作用力作用在两个物体上", "同一对相互作用力性质相同"],
        questions: [
          "两人受到的力大小相等，为什么速度变化可能不同？",
          "作用力和反作用力能否相互抵消？",
          "桌面对书的支持力与书受的重力是一对作用力与反作用力吗？",
        ],
        script: [
          "先设相同质量，观察两人对称分开。",
          "增大一方质量，比较加速度差异。",
          "强调一对相互作用力作用在不同物体上。",
        ],
        controls: [
          range("force", "相互作用力 F", 20, 160, 5, 80, "N"),
          range("massA", "左侧质量", 30, 100, 5, 60, "kg"),
          range("massB", "右侧质量", 30, 100, 5, 45, "kg"),
          toggle("showAcceleration", "显示加速度", true),
        ],
        stats: (v) => [`F = ${v.force.toFixed(0)}N`, `a左 = ${(v.force / v.massA).toFixed(2)}`, `a右 = ${(v.force / v.massB).toFixed(2)}`],
      },
      {
        id: "force-vector",
        number: "3-4",
        unit: "第三章 相互作用——力",
        title: "力的合成和分解",
        focus: "用平行四边形定则处理力的矢量运算",
        subtitle:
          "把两个共点力合成为一个等效力，或把一个力分解到相互垂直的方向上，直观看见矢量运算规则。",
        caption: "力的平行四边形定则",
        sim: "forceVector",
        formulas: ["合力：F = F₁ + F₂（矢量和）", "分力：F_x = F cosθ, F_y = F sinθ", "力的作用效果等效是合成和分解的依据"],
        questions: [
          "两个力越接近同向，合力怎样变化？",
          "为什么不能把力的大小直接相加？",
          "斜拉物体时，水平分力和竖直分力分别产生什么效果？",
        ],
        script: [
          "先选择合成，改变夹角观察合力大小。",
          "切换分解，说明一个斜向力的两个作用效果。",
          "把夹角调到 90°，联系勾股关系。",
        ],
        controls: [
          segmented("vectorMode", "演示模式", "combine", [
            ["合成", "combine"],
            ["分解", "decompose"],
          ]),
          range("f1", "F₁ / F", 10, 120, 2, 70, "N"),
          range("f2", "F₂", 10, 120, 2, 50, "N"),
          range("angle", "夹角 θ", 0, 180, 2, 58, "°"),
        ],
        stats: (v) => v.vectorMode === "combine"
          ? [`F₁ = ${v.f1.toFixed(0)}N`, `F₂ = ${v.f2.toFixed(0)}N`, `θ = ${v.angle.toFixed(0)}°`]
          : [`F = ${v.f1.toFixed(0)}N`, `Fx = ${(v.f1 * Math.cos(toRad(v.angle))).toFixed(1)}N`, `Fy = ${(v.f1 * Math.sin(toRad(v.angle))).toFixed(1)}N`],
      },
      {
        id: "equilibrium",
        number: "3-5",
        unit: "第三章 相互作用——力",
        title: "共点力的平衡",
        focus: "多个共点力合力为零时物体保持平衡",
        subtitle:
          "用力的闭合多边形展示平衡条件：所有力首尾相接后能闭合，等效合力为零。",
        caption: "共点力平衡与闭合三角形",
        sim: "equilibrium",
        formulas: ["平衡条件：ΣF = 0", "正交分解：ΣF_x = 0, ΣF_y = 0", "三力平衡时，三个力可构成闭合三角形"],
        questions: [
          "物体平衡是否一定静止？",
          "若力多边形不能闭合，物体会怎样运动？",
          "为什么正交分解可以把矢量问题转化为代数问题？",
        ],
        script: [
          "调整 F₁、F₂ 和夹角，观察所需第三个力。",
          "打开分量显示，检查 x、y 方向合力。",
          "让学生预测第三个力的方向后再显示闭合图。",
        ],
        controls: [
          range("f1", "F₁", 20, 140, 2, 80, "N"),
          range("f2", "F₂", 20, 140, 2, 70, "N"),
          range("angle", "F₂ 与 F₁夹角", 30, 160, 2, 110, "°"),
          toggle("showComponents", "显示分量", true),
        ],
        stats: (v) => {
          const r = resultant(v.f1, 0, v.f2, toRad(v.angle));
          return [`|F₃| = ${r.mag.toFixed(1)}N`, `ΣFx = ${r.x.toFixed(1)}N`, `ΣFy = ${r.y.toFixed(1)}N`];
        },
      },
    ],
  },
  {
    id: "force-motion",
    title: "第四章 运动和力的关系",
    sections: [
      {
        id: "inertia",
        number: "4-1",
        unit: "第四章 运动和力的关系",
        title: "牛顿第一定律",
        focus: "惯性与力不是维持运动的原因",
        subtitle:
          "比较不同粗糙程度下小车滑行的距离，抽象到理想光滑水平面：不受外力时物体保持匀速直线运动或静止。",
        caption: "惯性与理想实验",
        sim: "inertia",
        formulas: ["不受外力或合力为零：保持静止或匀速直线运动", "惯性是物体保持原有运动状态的性质", "质量是惯性大小的量度"],
        questions: [
          "为什么粗糙面上小车会慢慢停下？",
          "理想光滑面上，小车是否需要力来维持运动？",
          "质量越大，改变运动状态是否越容易？",
        ],
        script: [
          "先调大摩擦，观察小车很快停下。",
          "逐步减小摩擦，外推滑行距离会变长。",
          "强调力改变运动状态，而不是维持运动。",
        ],
        controls: [
          range("initialSpeed", "初速度 v₀", 1, 8, 0.2, 4, "m/s"),
          range("friction", "阻力强度", 0, 0.7, 0.02, 0.22, ""),
          range("mass", "质量 m", 0.5, 8, 0.2, 2, "kg"),
          toggle("showIdeal", "显示理想光滑对照", true),
        ],
        stats: (v) => [`v₀ = ${v.initialSpeed.toFixed(1)}m/s`, `阻力 = ${v.friction.toFixed(2)}`, `m = ${v.mass.toFixed(1)}kg`],
      },
      {
        id: "fma-experiment",
        number: "4-2",
        unit: "第四章 运动和力的关系",
        title: "实验：探究加速度与力、质量的关系",
        focus: "控制变量探究 a 与 F、m 的关系",
        subtitle:
          "用小车实验面板展示控制变量思想：质量一定时 a 与 F 成正比，拉力一定时 a 与 m 成反比。",
        caption: "a-F 与 a-1/m 实验图像",
        sim: "fmaExperiment",
        formulas: ["质量一定：a ∝ F", "合力一定：a ∝ 1/m", "实验目标：F = ma"],
        questions: [
          "为什么一次只改变一个变量？",
          "a-F 图像过原点意味着什么？",
          "如果摩擦补偿不充分，图像会出现什么偏差？",
        ],
        script: [
          "先选 a-F 模式，改变拉力观察加速度。",
          "切换 a-1/m 模式，保持拉力并改变质量。",
          "让学生用图像斜率解释质量或合力。",
        ],
        controls: [
          segmented("experimentMode", "图像模式", "force", [
            ["a-F", "force"],
            ["a-1/m", "inverseMass"],
          ]),
          range("force", "小车合力 F", 0.5, 8, 0.1, 3.2, "N"),
          range("mass", "小车质量 m", 0.4, 5, 0.1, 1.6, "kg"),
          toggle("showData", "显示实验点", true),
        ],
        stats: (v) => [`F = ${v.force.toFixed(1)}N`, `m = ${v.mass.toFixed(1)}kg`, `a = ${(v.force / v.mass).toFixed(2)}m/s²`],
      },
      {
        id: "newton-second",
        number: "4-3",
        unit: "第四章 运动和力的关系",
        title: "牛顿第二定律",
        focus: "物体加速度由合力和质量共同决定",
        subtitle:
          "左右两个力共同作用于小车，合力决定加速度方向，质量决定同样合力下速度改变的难易。",
        caption: "F合 = ma",
        sim: "newtonSecond",
        formulas: ["F合 = ma", "a 的方向与合力方向相同", "同一合力下，质量越大加速度越小"],
        questions: [
          "左右两个力同时作用时，应先求什么？",
          "合力为零时，小车一定静止吗？",
          "质量加倍而合力不变，加速度怎样变化？",
        ],
        script: [
          "调节左右拉力，先读出合力。",
          "改变质量，观察同一合力下加速度变化。",
          "让学生预测加速度方向后播放验证。",
        ],
        controls: [
          segmented("viewMode", "演示视图", "motion", [
            ["运动响应", "motion"],
            ["受力图", "fbd"],
          ]),
          range("mass", "质量 m", 0.5, 8, 0.1, 2, "kg"),
          range("forceRight", "向右拉力", 0, 80, 2, 42, "N"),
          range("forceLeft", "向左拉力", 0, 80, 2, 18, "N"),
          toggle("showVelocity", "显示速度箭头", true),
        ],
        stats: (v) => [`F合 = ${(v.forceRight - v.forceLeft).toFixed(0)}N`, `m = ${v.mass.toFixed(1)}kg`, `a = ${((v.forceRight - v.forceLeft) / v.mass).toFixed(1)}m/s²`],
      },
      {
        id: "unit-system",
        number: "4-4",
        unit: "第四章 运动和力的关系",
        title: "力学单位制",
        focus: "基本单位、导出单位与牛顿的定义",
        subtitle:
          "用单位积木展示 N、kg、m、s 的关系：1 N 使 1 kg 物体产生 1 m/s² 的加速度。",
        caption: "1 N = 1 kg·m/s²",
        sim: "units",
        formulas: ["基本单位：m、kg、s", "导出单位：N = kg·m/s²", "单位运算必须与物理量关系一致"],
        questions: [
          "为什么力的单位可以由 kg、m、s 导出？",
          "计算前检查单位有什么作用？",
          "若质量用 g、长度用 cm，数值会怎样变化？",
        ],
        script: [
          "调节质量和加速度，观察力的数值如何变化。",
          "强调单位不是装饰，而是物理关系的一部分。",
          "用 1 kg 和 1 m/s² 演示 1 N 的定义。",
        ],
        controls: [
          range("mass", "质量 m", 0.2, 10, 0.1, 1, "kg"),
          range("accel", "加速度 a", 0.2, 10, 0.1, 1, "m/s²"),
          segmented("unitMode", "显示方式", "si", [
            ["国际制", "si"],
            ["常用量级", "scaled"],
          ]),
        ],
        stats: (v) => [`m = ${v.mass.toFixed(1)}kg`, `a = ${v.accel.toFixed(1)}m/s²`, `F = ${(v.mass * v.accel).toFixed(1)}N`],
      },
      {
        id: "applications",
        number: "4-5",
        unit: "第四章 运动和力的关系",
        title: "牛顿运动定律的应用",
        focus: "受力分析、建立坐标系并列方程",
        subtitle:
          "以斜面上物块为例，分解重力、判断摩擦方向、沿斜面列出牛顿第二定律。",
        caption: "斜面模型中的受力分析",
        sim: "applications",
        formulas: ["沿斜面：mg sinθ - f = ma", "垂直斜面：N = mg cosθ", "滑动摩擦：f = μN"],
        questions: [
          "为什么常把坐标轴沿斜面和垂直斜面建立？",
          "摩擦力方向应怎样判断？",
          "角度增大时，沿斜面分力怎样变化？",
        ],
        script: [
          "先关闭摩擦或设小 μ，观察物块加速下滑。",
          "增大 μ，讨论是否还能下滑。",
          "显示分力，把 mg 分解为平行和垂直斜面的分量。",
        ],
        controls: [
          segmented("analysisView", "演示视图", "motion", [
            ["运动实景", "motion"],
            ["受力图", "fbd"],
            ["分力图", "components"],
          ]),
          range("mass", "物块质量 m", 0.5, 8, 0.1, 2.5, "kg"),
          range("angle", "斜面角 θ", 5, 55, 1, 28, "°"),
          range("mu", "摩擦因数 μ", 0, 0.8, 0.02, 0.16, ""),
          toggle("showComponents", "显示重力分量", true),
        ],
        stats: (v) => {
          const a = inclineAcceleration(v);
          return [`θ = ${v.angle.toFixed(0)}°`, `μ = ${v.mu.toFixed(2)}`, `a = ${a.toFixed(2)}m/s²`];
        },
      },
      {
        id: "elevator",
        number: "4-6",
        unit: "第四章 运动和力的关系",
        title: "超重和失重",
        focus: "视重由支持力或拉力决定",
        subtitle:
          "电梯中的体重计读数随加速度变化：向上加速或向下减速时超重，向下加速或向上减速时失重。",
        caption: "电梯加速度与体重计读数",
        sim: "elevator",
        formulas: ["N - mg = ma（向上为正）", "超重：N > mg", "失重：N < mg；完全失重：N = 0"],
        questions: [
          "超重时人的重力是否真的变大？",
          "电梯匀速上升时体重计读数怎样？",
          "自由下落时为什么会完全失重？",
        ],
        script: [
          "从 a = 0 开始，读数等于 mg。",
          "调为正加速度，观察读数增大。",
          "调为接近 -g，讨论完全失重。",
        ],
        controls: [
          range("mass", "人体质量 m", 30, 100, 1, 60, "kg"),
          range("accel", "电梯加速度 a", -9.8, 6, 0.1, 2, "m/s²"),
          toggle("showForces", "显示受力", true),
        ],
        stats: (v) => [`mg = ${(v.mass * G).toFixed(0)}N`, `a = ${v.accel.toFixed(1)}m/s²`, `N = ${Math.max(0, v.mass * (G + v.accel)).toFixed(0)}N`],
      },
    ],
  },
];

const required2Chapters = [
  {
    id: "projectile-motion",
    title: "第五章 抛体运动",
    sections: [
      {
        id: "curved-motion",
        number: "5-1",
        unit: "第五章 抛体运动",
        title: "曲线运动",
        focus: "速度方向沿轨迹切线，合力改变速度方向",
        subtitle:
          "用小球进入横向力场的过程说明：曲线运动中速度方向不断改变，物体所受合力一般指向轨迹凹侧。",
        caption: "速度切线与合力方向",
        sim: "curvedMotion",
        formulas: ["曲线运动速度方向：轨迹切线方向", "物体做曲线运动的条件：合力方向与速度方向不在同一直线上", "合力指向轨迹弯曲的内侧"],
        questions: [
          "曲线运动中速度大小可以不变吗？速度是否仍在变化？",
          "为什么速度方向要画在轨迹切线方向？",
          "如果撤去横向力，小球接下来会怎样运动？",
        ],
        script: [
          "先关闭横向力，观察小球保持直线运动。",
          "逐步增大横向力，让学生观察轨迹弯曲程度。",
          "打开速度和合力箭头，强调二者方向关系。",
        ],
        controls: [
          range("speed", "初速度 v₀", 1, 9, 0.2, 4.5, "m/s"),
          range("sideAccel", "横向加速度", -4, 4, 0.1, 1.4, "m/s²"),
          toggle("showVelocity", "显示速度方向", true),
          toggle("showForce", "显示合力方向", true),
        ],
        stats: (v) => [`v₀ = ${v.speed.toFixed(1)}m/s`, `a侧 = ${v.sideAccel.toFixed(1)}m/s²`, v.sideAccel === 0 ? "直线运动" : "曲线运动"],
      },
      {
        id: "motion-composition",
        number: "5-2",
        unit: "第五章 抛体运动",
        title: "运动的合成与分解",
        focus: "位移、速度和加速度的矢量合成",
        subtitle:
          "用小船过河模型展示：船相对水的运动与水流运动合成，得到船相对岸的实际运动。",
        caption: "小船过河与速度合成",
        sim: "motionComposition",
        formulas: ["v合 = v船对水 + v水对岸", "分运动具有等时性、独立性和等效性", "合运动与分运动满足矢量合成"],
        questions: [
          "水流速度增大时，过河时间一定改变吗？",
          "船头指向正对岸，实际航迹为什么会偏移？",
          "若要垂直到达对岸，船头应如何调整？",
        ],
        script: [
          "先设水流为零，观察船直达对岸。",
          "增大水流速度，观察合速度和漂移距离。",
          "改变船头角度，寻找垂直到达对岸的条件。",
        ],
        controls: [
          range("boatSpeed", "船相对水速度", 1, 8, 0.2, 4, "m/s"),
          range("riverSpeed", "水流速度", -4, 4, 0.2, 1.6, "m/s"),
          range("heading", "船头偏角", -60, 60, 2, 0, "°"),
          toggle("showComponents", "显示分速度", true),
        ],
        stats: (v) => {
          const vx = v.riverSpeed + v.boatSpeed * Math.sin(toRad(v.heading));
          const vy = v.boatSpeed * Math.cos(toRad(v.heading));
          return [`vx = ${vx.toFixed(1)}m/s`, `vy = ${vy.toFixed(1)}m/s`, `|v合| = ${Math.hypot(vx, vy).toFixed(1)}m/s`];
        },
      },
      {
        id: "projectile-experiment",
        number: "5-3",
        unit: "第五章 抛体运动",
        title: "实验：探究平抛运动的特点",
        focus: "水平分运动匀速，竖直分运动自由落体",
        subtitle:
          "同步显示平抛小球、水平匀速小球和竖直自由落体小球，帮助学生看见两个分运动互不影响。",
        caption: "平抛分运动对照实验",
        sim: "projectileExperiment",
        formulas: ["水平：x = v₀t", "竖直：y = 1/2gt²", "平抛运动可分解为水平匀速和竖直自由落体"],
        questions: [
          "平抛小球和自由落体小球是否同时落地？",
          "改变水平初速度会改变落地时间吗？",
          "频闪照片中水平间距和竖直间距分别说明什么？",
        ],
        script: [
          "打开两个对照小球，观察竖直位置同步。",
          "增大 v₀，比较水平射程变化和落地时间。",
          "显示频闪点，读出水平位移等间隔、竖直位移递增。",
        ],
        controls: [
          range("v0", "水平初速度 v₀", 1, 12, 0.2, 5, "m/s"),
          range("height", "抛出高度 h", 2, 20, 0.5, 10, "m"),
          range("g", "重力加速度 g", 1.6, 12, 0.1, 9.8, "m/s²"),
          toggle("showComparison", "显示分运动对照", true),
          toggle("showStrobe", "显示频闪点", true),
        ],
        stats: (v) => [`t落 = ${Math.sqrt((2 * v.height) / v.g).toFixed(2)}s`, `R = ${(v.v0 * Math.sqrt((2 * v.height) / v.g)).toFixed(1)}m`, `v₀ = ${v.v0.toFixed(1)}m/s`],
      },
      {
        id: "projectile-law",
        number: "5-4",
        unit: "第五章 抛体运动",
        title: "抛体运动的规律",
        focus: "用分解法研究斜抛和平抛的轨迹与射程",
        subtitle:
          "调节抛射角和初速度，观察抛体轨迹、最高点、射程以及水平竖直方向的速度变化。",
        caption: "抛体轨迹与射程",
        sim: "projectileLaw",
        formulas: ["x = v₀cosθ · t", "y = v₀sinθ · t - 1/2gt²", "不计空气阻力时，水平方向速度恒定"],
        questions: [
          "同一初速度下，射程随角度怎样变化？",
          "最高点处速度是否为零？",
          "为什么斜抛运动仍可用两个直线分运动研究？",
        ],
        script: [
          "从 0° 平抛开始，逐步增大抛射角。",
          "显示速度分量，观察 vx 不变、vy 线性变化。",
          "寻找 45° 附近射程最大的条件。",
        ],
        controls: [
          range("v0", "初速度 v₀", 4, 24, 0.5, 14, "m/s"),
          range("angle", "抛射角 θ", 0, 80, 1, 35, "°"),
          range("g", "重力加速度 g", 1.6, 12, 0.1, 9.8, "m/s²"),
          toggle("showVectors", "显示速度分量", true),
        ],
        stats: (v) => {
          const rangeValue = (v.v0 * v.v0 * Math.sin(2 * toRad(v.angle))) / v.g;
          return [`θ = ${v.angle.toFixed(0)}°`, `R ≈ ${rangeValue.toFixed(1)}m`, `v₀ = ${v.v0.toFixed(1)}m/s`];
        },
      },
    ],
  },
  {
    id: "circular-motion",
    title: "第六章 圆周运动",
    sections: [
      {
        id: "uniform-circular",
        number: "6-1",
        unit: "第六章 圆周运动",
        title: "圆周运动",
        focus: "线速度、角速度、周期和转速",
        subtitle:
          "同一圆周上的质点做圆周运动，线速度沿切线方向，角速度描述转动快慢。",
        caption: "线速度、角速度与周期",
        sim: "circularMotion",
        formulas: ["v = 2πr/T", "ω = 2π/T", "v = ωr"],
        questions: [
          "同一角速度下，半径越大线速度怎样变化？",
          "线速度方向为什么不断改变？",
          "周期和频率有什么关系？",
        ],
        script: [
          "改变半径，观察同一角速度下线速度变化。",
          "显示切向速度箭头，强调速度方向。",
          "调节周期，联系频率和转速。",
        ],
        controls: [
          range("radius", "半径 r", 60, 190, 5, 120, "px"),
          range("omega", "角速度 ω", 0.4, 3.6, 0.1, 1.4, "rad/s"),
          toggle("showVelocity", "显示线速度", true),
          toggle("showAngle", "显示转过角度", true),
        ],
        stats: (v) => [`ω = ${v.omega.toFixed(1)}rad/s`, `T = ${(TAU / v.omega).toFixed(2)}s`, `v = ${(v.omega * v.radius / 60).toFixed(1)}单位/s`],
      },
      {
        id: "centripetal-force",
        number: "6-2",
        unit: "第六章 圆周运动",
        title: "向心力",
        focus: "向心力是指向圆心的合力效果",
        subtitle:
          "绳拉小球做圆周运动时，指向圆心的拉力提供向心力，若绳断，小球沿切线飞出。",
        caption: "向心力与切线飞出",
        sim: "centripetalForce",
        formulas: ["Fₙ = mv²/r", "Fₙ = mω²r", "向心力不是一种新性质的力，而是合力的向心效果"],
        questions: [
          "向心力方向为什么总指向圆心？",
          "速度增大一倍，所需向心力怎样变化？",
          "绳突然断开后，小球为什么沿切线方向运动？",
        ],
        script: [
          "逐步增大速度，观察向心力数值明显增大。",
          "打开“绳断瞬间”，让学生预测飞出方向。",
          "强调向心力由绳拉力、摩擦力、重力分力等具体力提供。",
        ],
        controls: [
          range("mass", "质量 m", 0.2, 5, 0.1, 1.2, "kg"),
          range("speed", "线速度 v", 1, 12, 0.2, 5, "m/s"),
          range("radius", "半径 r", 0.4, 3, 0.1, 1.4, "m"),
          toggle("stringBreak", "演示绳断瞬间", false),
        ],
        stats: (v) => [`m = ${v.mass.toFixed(1)}kg`, `v = ${v.speed.toFixed(1)}m/s`, `Fₙ = ${(v.mass * v.speed * v.speed / v.radius).toFixed(1)}N`],
      },
      {
        id: "centripetal-acceleration",
        number: "6-3",
        unit: "第六章 圆周运动",
        title: "向心加速度",
        focus: "加速度方向指向圆心，只改变速度方向",
        subtitle:
          "比较不同速度和半径下的向心加速度，理解即使速率不变，速度方向改变也意味着存在加速度。",
        caption: "aₙ = v²/r",
        sim: "centripetalAccel",
        formulas: ["aₙ = v²/r", "aₙ = ω²r", "匀速圆周运动的加速度方向始终指向圆心"],
        questions: [
          "匀速圆周运动为什么仍是变速运动？",
          "半径不变时，速度越大向心加速度怎样变化？",
          "角速度不变时，半径越大向心加速度怎样变化？",
        ],
        script: [
          "显示速度矢量和向心加速度矢量。",
          "改变速度，观察 aₙ 的平方关系。",
          "切换到角速度表达，比较 aₙ = ω²r。",
        ],
        controls: [
          range("speed", "线速度 v", 1, 12, 0.2, 4, "m/s"),
          range("radius", "半径 r", 0.5, 4, 0.1, 1.6, "m"),
          toggle("showAcceleration", "显示向心加速度", true),
          toggle("showVelocity", "显示速度", true),
        ],
        stats: (v) => [`v = ${v.speed.toFixed(1)}m/s`, `r = ${v.radius.toFixed(1)}m`, `aₙ = ${(v.speed * v.speed / v.radius).toFixed(1)}m/s²`],
      },
      {
        id: "circular-life",
        number: "6-4",
        unit: "第六章 圆周运动",
        title: "生活中的圆周运动",
        focus: "转弯、拱桥、竖直圆周中的向心力来源",
        subtitle:
          "以汽车过弯为例，摩擦力提供向心力；速度过大时，所需向心力超过最大静摩擦力就会侧滑。",
        caption: "汽车转弯的安全速度",
        sim: "lifeCircular",
        formulas: ["Fₙ = mv²/r", "最大静摩擦力：fmax = μmg", "安全条件：mv²/r ≤ μmg"],
        questions: [
          "为什么急转弯时速度不能太大？",
          "半径越小，安全速度怎样变化？",
          "路面湿滑时，最大安全速度为什么降低？",
        ],
        script: [
          "调大车速，观察是否超过安全速度。",
          "减小半径，说明急弯更危险。",
          "降低摩擦因数，联系雨雪天气减速。",
        ],
        controls: [
          range("speed", "车速 v", 4, 40, 1, 18, "m/s"),
          range("radius", "弯道半径 r", 10, 120, 2, 50, "m"),
          range("mu", "路面摩擦因数 μ", 0.1, 1.0, 0.02, 0.45, ""),
          toggle("showLimit", "显示安全速度", true),
        ],
        stats: (v) => [`v = ${v.speed.toFixed(0)}m/s`, `v安全 = ${Math.sqrt(v.mu * G * v.radius).toFixed(1)}m/s`, v.speed <= Math.sqrt(v.mu * G * v.radius) ? "安全" : "侧滑风险"],
      },
    ],
  },
  {
    id: "gravitation-spaceflight",
    title: "第七章 万有引力与宇宙航行",
    sections: [
      {
        id: "planet-motion",
        number: "7-1",
        unit: "第七章 万有引力与宇宙航行",
        title: "行星的运动",
        focus: "开普勒三定律与椭圆轨道",
        subtitle:
          "用椭圆轨道展示太阳位于焦点、面积速度近似相等，以及轨道半长轴与周期之间的关系。",
        caption: "开普勒行星运动模型",
        sim: "planetLaws",
        formulas: ["第一定律：行星轨道是椭圆，太阳在焦点上", "第二定律：相等时间扫过相等面积", "第三定律：T²/a³ = 常量"],
        questions: [
          "行星离太阳近时速度更快还是更慢？",
          "太阳在椭圆的中心还是焦点？",
          "不同轨道半长轴对应的周期有什么关系？",
        ],
        script: [
          "调节偏心率，观察椭圆形状变化。",
          "显示扫过面积，说明近日点速度更大。",
          "切换不同半长轴，读出周期变化。",
        ],
        controls: [
          range("semiMajor", "轨道半长轴 a", 90, 220, 5, 150, "px"),
          range("eccentricity", "偏心率 e", 0, 0.75, 0.01, 0.35, ""),
          toggle("showArea", "显示扫过面积", true),
          toggle("showFocus", "显示太阳焦点", true),
        ],
        stats: (v) => [`a = ${v.semiMajor.toFixed(0)}px`, `e = ${v.eccentricity.toFixed(2)}`, `T²/a³ = 常量`],
      },
      {
        id: "gravitation-law",
        number: "7-2",
        unit: "第七章 万有引力与宇宙航行",
        title: "万有引力定律",
        focus: "任意两个物体间存在引力，引力与质量乘积成正比、与距离平方成反比",
        subtitle:
          "用两颗天体间的引力箭头和数值读数，直观看见质量和距离对万有引力的影响。",
        caption: "F = Gm₁m₂/r²",
        sim: "gravitation",
        formulas: ["F = Gm₁m₂/r²", "引力方向沿两物体连线", "距离增大为原来的 n 倍，引力变为原来的 1/n²"],
        questions: [
          "距离加倍时，引力变为多少？",
          "为什么两物体受到的引力大小相等？",
          "万有引力定律和牛顿第三定律如何联系？",
        ],
        script: [
          "先固定距离，改变其中一个质量。",
          "再固定质量，把距离加倍，观察平方反比关系。",
          "显示双向力箭头，强调相互作用。",
        ],
        controls: [
          range("m1", "质量 m₁", 1, 12, 0.5, 5, "单位"),
          range("m2", "质量 m₂", 1, 12, 0.5, 7, "单位"),
          range("distance", "距离 r", 80, 300, 5, 180, "px"),
          toggle("showField", "显示引力场意象", true),
        ],
        stats: (v) => [`m₁m₂ = ${(v.m1 * v.m2).toFixed(1)}`, `r = ${v.distance.toFixed(0)}px`, `F ∝ ${(v.m1 * v.m2 / (v.distance * v.distance) * 10000).toFixed(2)}`],
      },
      {
        id: "gravitation-achievements",
        number: "7-3",
        unit: "第七章 万有引力与宇宙航行",
        title: "万有引力理论的成就",
        focus: "用天体运动反推天体质量、解释发现新天体",
        subtitle:
          "用卫星绕行模型说明：测出轨道半径和周期，可以反推出中心天体质量。",
        caption: "由轨道周期估算中心天体质量",
        sim: "gravityAchievements",
        formulas: ["GMm/r² = m4π²r/T²", "M = 4π²r³/(GT²)", "万有引力理论可解释和预测天体运动"],
        questions: [
          "为什么卫星质量 m 在推导中会约去？",
          "周期越短，说明中心天体质量一定越小吗？",
          "海王星发现体现了理论预测的什么力量？",
        ],
        script: [
          "调节轨道半径和周期，观察估算质量变化。",
          "强调测量可观测量 r、T 后反推不可直接称量的天体质量。",
          "展示偏差箭头，引出理论预言新天体。",
        ],
        controls: [
          range("orbitRadius", "轨道半径 r", 1, 10, 0.2, 4, "×10⁷m"),
          range("period", "周期 T", 2, 20, 0.5, 8, "h"),
          toggle("showFormula", "显示推导关系", true),
        ],
        stats: (v) => [`r = ${v.orbitRadius.toFixed(1)}×10⁷m`, `T = ${v.period.toFixed(1)}h`, `M ∝ r³/T²`],
      },
      {
        id: "spaceflight",
        number: "7-4",
        unit: "第七章 万有引力与宇宙航行",
        title: "宇宙航行",
        focus: "第一宇宙速度、圆轨道速度与逃逸条件",
        subtitle:
          "调节发射速度，观察卫星可能落回地面、进入圆轨道、进入椭圆轨道或逃逸。",
        caption: "发射速度与轨道形态",
        sim: "spaceflight",
        formulas: ["近地圆轨道速度：v₁ = √(gR)", "圆轨道速度：v = √(GM/r)", "逃逸速度：v₂ = √2 v₁"],
        questions: [
          "第一宇宙速度为什么是最小发射速度也是最大环绕速度？",
          "速度继续增大时，轨道形态怎样变化？",
          "逃逸是否意味着不再受地球引力？",
        ],
        script: [
          "从低速开始，观察轨迹落回地面。",
          "调到第一宇宙速度附近，形成近地圆轨道。",
          "继续增大速度，比较椭圆和逃逸轨迹。",
        ],
        controls: [
          range("launchSpeed", "发射速度", 4, 13, 0.1, 7.9, "km/s"),
          range("altitude", "发射高度", 0, 5, 0.2, 0.4, "R"),
          toggle("showThresholds", "显示临界速度", true),
        ],
        stats: (v) => [`v = ${v.launchSpeed.toFixed(1)}km/s`, `v₁ ≈ 7.9km/s`, v.launchSpeed >= 11.2 ? "逃逸" : v.launchSpeed >= 7.9 ? "绕行" : "落回"],
      },
      {
        id: "relativity-limit",
        number: "7-5",
        unit: "第七章 万有引力与宇宙航行",
        title: "相对论时空观与牛顿力学的局限性",
        focus: "高速和强引力情境下，经典力学需要修正",
        subtitle:
          "用速度接近光速时的时间膨胀因子展示：日常低速下牛顿力学足够精确，高速情境下相对论效应显著。",
        caption: "低速近似与相对论修正",
        sim: "relativityLimit",
        formulas: ["低速条件：v ≪ c 时牛顿力学近似适用", "洛伦兹因子：γ = 1/√(1-v²/c²)", "经典时空观在高速、强引力、微观领域有局限"],
        questions: [
          "为什么日常生活中很少感到相对论效应？",
          "当 v 接近 c 时，γ 怎样变化？",
          "牛顿力学失效是否意味着它没有价值？",
        ],
        script: [
          "从 v/c 很小开始，观察 γ 接近 1。",
          "逐步接近光速，观察时间膨胀迅速增强。",
          "强调理论适用范围，而不是互相否定。",
        ],
        controls: [
          range("beta", "速度 v/c", 0, 0.99, 0.01, 0.2, ""),
          toggle("showNewtonZone", "显示牛顿适用区", true),
        ],
        stats: (v) => [`v/c = ${v.beta.toFixed(2)}`, `γ = ${(1 / Math.sqrt(1 - v.beta * v.beta)).toFixed(2)}`, v.beta < 0.1 ? "低速近似" : "相对论效应"],
      },
    ],
  },
  {
    id: "mechanical-energy",
    title: "第八章 机械能守恒定律",
    sections: [
      {
        id: "work-power",
        number: "8-1",
        unit: "第八章 机械能守恒定律",
        title: "功与功率",
        focus: "功取决于力、位移以及二者夹角，功率描述做功快慢",
        subtitle:
          "拖动物块时，改变力的大小和方向，观察有用功、负功和功率的变化。",
        caption: "W = Flcosα 与 P = W/t",
        sim: "workPower",
        formulas: ["W = Flcosα", "P = W/t", "瞬时功率：P = Fvcosα"],
        questions: [
          "力很大但位移为零，是否做功？",
          "夹角大于 90° 时功为什么为负？",
          "同样做 100J 的功，用时越短功率怎样？",
        ],
        script: [
          "先让力与位移同向，观察正功。",
          "增大夹角到 90°，说明不做功。",
          "继续增大夹角，观察负功和能量减少。",
        ],
        controls: [
          range("force", "力 F", 5, 120, 2, 60, "N"),
          range("distance", "位移 l", 0, 12, 0.2, 5, "m"),
          range("angle", "夹角 α", 0, 180, 2, 35, "°"),
          range("time", "用时 t", 0.5, 10, 0.5, 3, "s"),
        ],
        stats: (v) => {
          const work = v.force * v.distance * Math.cos(toRad(v.angle));
          return [`W = ${work.toFixed(1)}J`, `P = ${(work / v.time).toFixed(1)}W`, `α = ${v.angle.toFixed(0)}°`];
        },
      },
      {
        id: "potential-energy",
        number: "8-2",
        unit: "第八章 机械能守恒定律",
        title: "重力势能",
        focus: "重力做功与路径无关，重力势能取决于高度差和零势能面",
        subtitle:
          "提升或降低物体时，重力势能随高度改变；改变零势能面会改变势能数值，但不改变势能变化量。",
        caption: "Ep = mgh 与零势能面",
        sim: "potentialEnergy",
        formulas: ["Ep = mgh", "重力做功：WG = -ΔEp", "势能大小与零势能面的选取有关，势能变化量有确定意义"],
        questions: [
          "改变零势能面后，物体的势能变化量会改变吗？",
          "物体下降时重力做正功还是负功？",
          "为什么说重力做功与路径无关？",
        ],
        script: [
          "调节物体高度，观察重力势能变化。",
          "移动零势能面，说明势能数值相对性。",
          "显示两条路径，强调重力做功只看高度差。",
        ],
        controls: [
          range("mass", "质量 m", 0.5, 8, 0.1, 2, "kg"),
          range("height", "物体高度 h", -2, 12, 0.2, 6, "m"),
          range("zeroLevel", "零势能面", -2, 8, 0.2, 0, "m"),
          toggle("showPaths", "显示不同路径", true),
        ],
        stats: (v) => [`m = ${v.mass.toFixed(1)}kg`, `h相对 = ${(v.height - v.zeroLevel).toFixed(1)}m`, `Ep = ${(v.mass * G * (v.height - v.zeroLevel)).toFixed(1)}J`],
      },
      {
        id: "kinetic-theorem",
        number: "8-3",
        unit: "第八章 机械能守恒定律",
        title: "动能和动能定理",
        focus: "合力做功等于动能变化量",
        subtitle:
          "用小车受合力加速或减速的过程展示：合力做正功动能增加，做负功动能减少。",
        caption: "W合 = ΔEk",
        sim: "kineticTheorem",
        formulas: ["Ek = 1/2mv²", "W合 = ΔEk", "合力做功决定动能变化"],
        questions: [
          "速度加倍，动能变为几倍？",
          "合力做负功时，小车动能怎样变化？",
          "动能定理是否只适用于匀变速运动？",
        ],
        script: [
          "设正合力，观察速度和动能增加。",
          "设负合力，观察动能减少。",
          "比较初末动能差和合力做功读数。",
        ],
        controls: [
          range("mass", "质量 m", 0.5, 8, 0.1, 2, "kg"),
          range("v0", "初速度 v₀", 0, 12, 0.2, 3, "m/s"),
          range("force", "合力 F", -30, 60, 2, 18, "N"),
          range("distance", "位移 l", 0, 12, 0.2, 5, "m"),
        ],
        stats: (v) => {
          const work = v.force * v.distance;
          const ek0 = 0.5 * v.mass * v.v0 * v.v0;
          const ek = Math.max(0, ek0 + work);
          return [`W合 = ${work.toFixed(1)}J`, `ΔEk = ${(ek - ek0).toFixed(1)}J`, `v末 = ${Math.sqrt((2 * ek) / v.mass).toFixed(1)}m/s`];
        },
      },
      {
        id: "energy-conservation",
        number: "8-4",
        unit: "第八章 机械能守恒定律",
        title: "机械能守恒定律",
        focus: "只有重力或弹力做功时，动能和势能相互转化，总机械能守恒",
        subtitle:
          "用滑块从高处下滑模型显示动能、重力势能和机械能柱状图。加入阻力后，总机械能逐渐减少。",
        caption: "动能与势能的相互转化",
        sim: "energyConservation",
        formulas: ["E = Ek + Ep", "只有重力或弹力做功：E守恒", "非保守力做功会改变机械能"],
        questions: [
          "速度最大的位置在哪里？为什么？",
          "加入摩擦后，减少的机械能转化为什么？",
          "机械能守恒是否意味着动能和势能分别不变？",
        ],
        script: [
          "关闭阻力，观察总机械能柱保持不变。",
          "打开阻力，观察机械能逐渐减少。",
          "点重来一次后观察不同高度，比较 Ek 和 Ep 的互相转化。",
        ],
        controls: [
          range("height", "初始高度 h", 2, 20, 0.5, 10, "m"),
          range("mass", "质量 m", 0.5, 8, 0.1, 2, "kg"),
          range("friction", "阻力损耗", 0, 0.45, 0.01, 0, ""),
          toggle("showBars", "显示能量柱", true),
        ],
        stats: (v) => [`E₀ = ${(v.mass * G * v.height).toFixed(0)}J`, `损耗 = ${(v.friction * 100).toFixed(0)}%`, v.friction === 0 ? "机械能守恒" : "机械能减少"],
      },
      {
        id: "energy-experiment",
        number: "8-5",
        unit: "第八章 机械能守恒定律",
        title: "实验：验证机械能守恒定律",
        focus: "用纸带数据比较重力势能减少量和动能增加量",
        subtitle:
          "重物带动纸带下落，利用打点数据计算速度，比较 mgh 与 1/2mv² 的接近程度。",
        caption: "纸带法验证机械能守恒",
        sim: "energyExperiment",
        formulas: ["ΔEp = mgh", "ΔEk = 1/2mv² - 1/2mv₀²", "理想情况下：ΔEp ≈ ΔEk"],
        questions: [
          "为什么实验中 ΔEk 往往略小于 ΔEp？",
          "如何由纸带点迹估算某点速度？",
          "质量 m 在比较两边时是否会影响相对误差？",
        ],
        script: [
          "显示纸带点迹，让学生观察点距增大。",
          "调节空气阻力，观察能量差变大。",
          "比较 ΔEp 和 ΔEk 的百分误差。",
        ],
        controls: [
          range("dropHeight", "下落高度 h", 0.2, 2.5, 0.1, 1.2, "m"),
          range("mass", "重物质量 m", 0.05, 1, 0.05, 0.2, "kg"),
          range("loss", "实验损耗", 0, 0.25, 0.01, 0.06, ""),
          toggle("showTape", "显示纸带点迹", true),
        ],
        stats: (v) => {
          const ep = v.mass * G * v.dropHeight;
          const ek = ep * (1 - v.loss);
          return [`ΔEp = ${ep.toFixed(2)}J`, `ΔEk = ${ek.toFixed(2)}J`, `误差 = ${(v.loss * 100).toFixed(0)}%`];
        },
      },
    ],
  },
];

const required3Chapters = [
  {
    id: "electrostatic-field-use",
    title: "第九章 静电场及其应用",
    sections: [
      {
        id: "electric-charge",
        number: "9-1",
        unit: "第九章 静电场及其应用",
        title: "电荷",
        focus: "电荷种类、电荷守恒和静电感应",
        subtitle:
          "用验电器和带电棒演示起电、接触带电和静电感应，帮助学生理解电荷不是凭空产生，而是在物体间转移或重新分布。",
        caption: "电荷转移与静电感应",
        sim: "electricCharge",
        formulas: ["自然界只有正、负两种电荷", "同种电荷相互排斥，异种电荷相互吸引", "电荷守恒：孤立系统电荷总量不变"],
        questions: [
          "摩擦起电时，是创造了电荷还是转移了电荷？",
          "验电器金属箔张开说明了什么？",
          "静电感应中，物体总电荷量一定改变吗？",
        ],
        script: [
          "先改变带电棒电荷量，观察金属箔张角。",
          "切换接触和感应模式，比较电荷分布。",
          "强调电荷守恒和电子转移的微观解释。",
        ],
        controls: [
          range("charge", "带电棒电荷量", -8, 8, 0.5, 4, "单位"),
          segmented("mode", "起电方式", "induction", [
            ["感应", "induction"],
            ["接触", "contact"],
          ]),
          toggle("showCharges", "显示电荷分布", true),
        ],
        stats: (v) => [`q棒 = ${v.charge.toFixed(1)}`, v.mode === "induction" ? "静电感应" : "接触带电", "电荷守恒"],
      },
      {
        id: "coulomb-law",
        number: "9-2",
        unit: "第九章 静电场及其应用",
        title: "库仑定律",
        focus: "点电荷间静电力与电荷量乘积成正比、与距离平方成反比",
        subtitle:
          "调节两个点电荷的电荷量和距离，观察库仑力大小、方向以及同斥异吸的变化。",
        caption: "点电荷相互作用",
        sim: "coulombLaw",
        formulas: ["F = kq₁q₂/r²", "同种电荷相斥，异种电荷相吸", "库仑定律适用于真空中的静止点电荷"],
        questions: [
          "距离加倍，库仑力变为多少？",
          "两个电荷受到的力大小是否相等？",
          "为什么公式中要强调点电荷模型？",
        ],
        script: [
          "先设置同号电荷，观察排斥。",
          "改变其中一个电荷符号，观察吸引。",
          "把距离加倍，读出平方反比关系。",
        ],
        controls: [
          range("q1", "电荷 q₁", -8, 8, 0.5, 5, "单位"),
          range("q2", "电荷 q₂", -8, 8, 0.5, -4, "单位"),
          range("distance", "距离 r", 90, 310, 5, 190, "px"),
          toggle("showFormula", "显示公式读数", true),
        ],
        stats: (v) => [`q₁q₂ = ${(v.q1 * v.q2).toFixed(1)}`, `r = ${v.distance.toFixed(0)}px`, `F ∝ ${(Math.abs(v.q1 * v.q2) / (v.distance * v.distance) * 10000).toFixed(2)}`],
      },
      {
        id: "electric-field-strength",
        number: "9-3",
        unit: "第九章 静电场及其应用",
        title: "电场 电场强度",
        focus: "用电场强度描述电场对电荷的力的性质",
        subtitle:
          "显示正点电荷和负点电荷周围的电场线，拖动试探电荷时观察受力方向和场强大小变化。",
        caption: "电场线与试探电荷受力",
        sim: "electricField",
        formulas: ["E = F/q", "点电荷场强：E = kQ/r²", "电场线方向为正试探电荷受力方向"],
        questions: [
          "电场线越密代表什么？",
          "负电荷在电场中受力方向与电场方向有什么关系？",
          "试探电荷量改变，电场本身会改变吗？",
        ],
        script: [
          "先选择正源电荷，观察电场线向外。",
          "切换负源电荷，观察电场线向内。",
          "移动试探电荷位置，比较场强大小。",
        ],
        controls: [
          range("sourceCharge", "源电荷 Q", -8, 8, 0.5, 5, "单位"),
          range("testCharge", "试探电荷 q", -4, 4, 0.5, 1, "单位"),
          range("testX", "试探电荷位置", -1, 1, 0.05, 0.48, "L"),
          toggle("showLines", "显示电场线", true),
        ],
        stats: (v) => [`Q = ${v.sourceCharge.toFixed(1)}`, `q = ${v.testCharge.toFixed(1)}`, "E = F/q"],
      },
      {
        id: "electrostatic-prevention-use",
        number: "9-4",
        unit: "第九章 静电场及其应用",
        title: "静电的防止与利用",
        focus: "尖端放电、静电屏蔽和静电除尘",
        subtitle:
          "用带电云层、避雷针和金属屏蔽壳展示静电的危险与利用，理解导体静电平衡和屏蔽作用。",
        caption: "避雷针与静电屏蔽",
        sim: "electrostaticUse",
        formulas: ["导体静电平衡时内部场强为 0", "尖端附近电荷密度大，场强强", "静电可防止，也可用于除尘、喷涂等技术"],
        questions: [
          "为什么避雷针要做得尖？",
          "金属壳内部为什么能屏蔽外电场？",
          "静电除尘利用了电荷的哪种性质？",
        ],
        script: [
          "打开外电场，观察金属壳内部场强被屏蔽。",
          "增加云层电荷，观察避雷针尖端放电更明显。",
          "切换到除尘粒子，说明静电技术应用。",
        ],
        controls: [
          range("cloudCharge", "云层电荷量", 1, 10, 0.5, 6, "单位"),
          segmented("useMode", "演示场景", "lightning", [
            ["避雷", "lightning"],
            ["屏蔽", "shield"],
            ["除尘", "dust"],
          ]),
          toggle("showField", "显示电场", true),
        ],
        stats: (v) => [`场景：${v.useMode === "lightning" ? "避雷" : v.useMode === "shield" ? "屏蔽" : "除尘"}`, `电荷 = ${v.cloudCharge.toFixed(1)}`, "静电应用"],
      },
    ],
  },
  {
    id: "electrostatic-energy",
    title: "第十章 静电场中的能量",
    sections: [
      {
        id: "electric-potential-energy",
        number: "10-1",
        unit: "第十章 静电场中的能量",
        title: "电势能和电势",
        focus: "从静电力做功理解电势能和电势",
        subtitle:
          "把正试探电荷放入匀强电场，观察沿电场方向移动时静电力做功、电势能和电势的变化。",
        caption: "电势能、电势与电场力做功",
        sim: "electricPotential",
        formulas: ["Ep = qφ", "静电力做功：WAB = EpA - EpB", "电势 φ 描述电场的能量性质"],
        questions: [
          "正电荷沿电场方向移动时，电势能怎样变化？",
          "电势是电场本身的性质还是电荷的性质？",
          "负电荷在同一电场中电势能变化方向是否相同？",
        ],
        script: [
          "先使用正电荷，沿电场方向移动。",
          "切换负电荷，比较电势能变化。",
          "显示等势面，说明电势只由位置决定。",
        ],
        controls: [
          range("field", "电场强度 E", 0.5, 6, 0.1, 2.5, "单位"),
          range("charge", "试探电荷 q", -4, 4, 0.5, 1.5, "单位"),
          range("position", "位置 x", 0, 1, 0.02, 0.35, "L"),
          toggle("showEquipotential", "显示等势面", true),
        ],
        stats: (v) => [`E = ${v.field.toFixed(1)}`, `q = ${v.charge.toFixed(1)}`, `Ep ∝ ${(v.charge * v.field * (1 - v.position)).toFixed(1)}`],
      },
      {
        id: "potential-difference",
        number: "10-2",
        unit: "第十章 静电场中的能量",
        title: "电势差",
        focus: "电势差与静电力做功的关系",
        subtitle:
          "选择 A、B 两点，比较电势、电势差和电场力做功，理解 UAB 只与两点位置有关。",
        caption: "UAB = φA - φB",
        sim: "potentialDifference",
        formulas: ["UAB = φA - φB", "WAB = qUAB", "电势差也叫电压"],
        questions: [
          "电势差与零电势面的选择有关吗？",
          "同样 UAB 下，电荷量越大，静电力做功怎样变化？",
          "为什么电势差可以叫电压？",
        ],
        script: [
          "移动 A、B 两点，观察 UAB 改变。",
          "改变试探电荷量，比较 WAB = qUAB。",
          "移动零电势面，说明电势差不变。",
        ],
        controls: [
          range("pointA", "A 点位置", 0, 1, 0.02, 0.25, "L"),
          range("pointB", "B 点位置", 0, 1, 0.02, 0.78, "L"),
          range("charge", "电荷 q", -4, 4, 0.5, 2, "单位"),
          range("zero", "零电势偏移", -3, 3, 0.2, 0, "V"),
        ],
        stats: (v) => {
          const ua = 10 * (1 - v.pointA) + v.zero;
          const ub = 10 * (1 - v.pointB) + v.zero;
          return [`UAB = ${(ua - ub).toFixed(1)}V`, `W = ${(v.charge * (ua - ub)).toFixed(1)}`, "与零点无关"];
        },
      },
      {
        id: "field-potential-relation",
        number: "10-3",
        unit: "第十章 静电场中的能量",
        title: "电势差与电场强度的关系",
        focus: "匀强电场中 U = Ed",
        subtitle:
          "在平行板匀强电场中改变板间距和电场强度，观察两板电势差的线性关系。",
        caption: "匀强电场中的 U = Ed",
        sim: "fieldPotentialRelation",
        formulas: ["U = Ed（d 为沿电场方向距离）", "E = U/d", "等势面与电场线垂直"],
        questions: [
          "为什么 d 要取沿电场方向的距离？",
          "电势降落最快的方向是什么方向？",
          "等势面与电场线为什么互相垂直？",
        ],
        script: [
          "固定 E，改变板间距 d，观察 U 变化。",
          "固定 d，改变 E，观察等势面疏密。",
          "显示电场线和等势线的垂直关系。",
        ],
        controls: [
          range("field", "电场强度 E", 0.5, 8, 0.1, 3, "单位"),
          range("distance", "板间距 d", 80, 260, 5, 160, "px"),
          toggle("showEquipotential", "显示等势面", true),
        ],
        stats: (v) => [`E = ${v.field.toFixed(1)}`, `d = ${v.distance.toFixed(0)}px`, `U ∝ ${(v.field * v.distance / 100).toFixed(1)}`],
      },
      {
        id: "capacitor",
        number: "10-4",
        unit: "第十章 静电场中的能量",
        title: "电容器的电容",
        focus: "电容描述电容器储存电荷的本领",
        subtitle:
          "调节平行板面积、板间距和介电常数，观察电容、带电量和电场能量的变化。",
        caption: "平行板电容器模型",
        sim: "capacitor",
        formulas: ["C = Q/U", "平行板电容器：C ∝ εS/d", "电容器能储存电荷和电场能"],
        questions: [
          "板间距增大时电容怎样变化？",
          "插入电介质后电容为什么增大？",
          "电容大是否意味着电压一定大？",
        ],
        script: [
          "固定电压，改变板间距观察电荷量变化。",
          "增大板面积，说明电容变大。",
          "调节介电常数，联系电介质作用。",
        ],
        controls: [
          range("area", "极板面积 S", 0.5, 3, 0.1, 1.5, "单位"),
          range("distance", "板间距 d", 60, 220, 5, 120, "px"),
          range("dielectric", "介电常数 εr", 1, 6, 0.1, 2, ""),
          range("voltage", "电压 U", 1, 12, 0.5, 6, "V"),
        ],
        stats: (v) => {
          const c = v.dielectric * v.area / (v.distance / 100);
          return [`C ∝ ${c.toFixed(2)}`, `Q ∝ ${(c * v.voltage).toFixed(1)}`, `U = ${v.voltage.toFixed(1)}V`];
        },
      },
      {
        id: "charged-particle-field",
        number: "10-5",
        unit: "第十章 静电场中的能量",
        title: "带电粒子在电场中的运动",
        focus: "带电粒子在电场中受力、加速或偏转",
        subtitle:
          "粒子射入平行板电场后发生偏转，调节电场强度、初速度和电荷量，观察轨迹改变。",
        caption: "电场中的粒子偏转",
        sim: "particleElectricField",
        formulas: ["F = qE", "a = qE/m", "类平抛：x = v₀t, y = 1/2at²"],
        questions: [
          "电荷量符号改变后偏转方向怎样变化？",
          "初速度越大，偏转量怎样变化？",
          "为什么该模型类似平抛运动？",
        ],
        script: [
          "先用正电荷，观察沿电场力方向偏转。",
          "改变电荷符号，对比偏转方向。",
          "增大初速度，观察穿过区域所需时间变短。",
        ],
        controls: [
          range("field", "电场强度 E", -6, 6, 0.2, 2.5, "单位"),
          range("charge", "粒子电荷 q", -4, 4, 0.5, 1, "单位"),
          range("mass", "粒子质量 m", 0.5, 6, 0.1, 2, "单位"),
          range("speed", "初速度 v₀", 2, 12, 0.2, 6, "单位"),
        ],
        stats: (v) => [`qE = ${(v.charge * v.field).toFixed(1)}`, `a = ${(v.charge * v.field / v.mass).toFixed(2)}`, `v₀ = ${v.speed.toFixed(1)}`],
      },
    ],
  },
  {
    id: "circuits-applications",
    title: "第十一章 电路及其应用",
    sections: [
      {
        id: "source-current",
        number: "11-1",
        unit: "第十一章 电路及其应用",
        title: "电源和电流",
        focus: "电源维持电势差，电流是电荷定向移动",
        subtitle:
          "闭合电路中，电源在内部把电荷从低电势移到高电势，从而在外电路形成持续电流。",
        caption: "闭合电路中的电流",
        sim: "sourceCurrent",
        formulas: ["I = q/t", "电源提供非静电力做功", "形成持续电流需要自由电荷和闭合回路"],
        questions: [
          "电路断开时，为什么不能形成持续电流？",
          "电子定向移动方向和规定电流方向有什么关系？",
          "电源在电路中起什么作用？",
        ],
        script: [
          "先断开开关，观察电荷不形成环流。",
          "闭合开关，显示规定电流方向。",
          "调节电压，观察电荷漂移速度变化。",
        ],
        controls: [
          range("voltage", "电源电压", 1, 12, 0.5, 6, "V"),
          range("resistance", "外电阻", 1, 20, 0.5, 6, "Ω"),
          toggle("closed", "闭合开关", true),
          toggle("showElectrons", "显示电子运动", true),
        ],
        stats: (v) => [`U = ${v.voltage.toFixed(1)}V`, `R = ${v.resistance.toFixed(1)}Ω`, `I = ${v.closed ? (v.voltage / v.resistance).toFixed(2) : "0.00"}A`],
      },
      {
        id: "resistance",
        number: "11-2",
        unit: "第十一章 电路及其应用",
        title: "导体的电阻",
        focus: "电阻与材料、长度、横截面积有关",
        subtitle:
          "用导线模型展示：长度增加电阻增大，横截面积增加电阻减小，不同材料电阻率不同。",
        caption: "R = ρl/S",
        sim: "resistance",
        formulas: ["R = ρl/S", "欧姆定律：I = U/R", "电阻是导体本身的性质，与导体材料、长度、横截面积和温度有关"],
        questions: [
          "导线越长电阻为什么越大？",
          "导线越粗电阻为什么越小？",
          "改变电压是否改变欧姆导体的电阻？",
        ],
        script: [
          "固定材料和面积，改变长度。",
          "固定长度，增大横截面积。",
          "切换不同材料，比较电阻率影响。",
        ],
        controls: [
          range("length", "长度 l", 0.5, 8, 0.1, 4, "m"),
          range("area", "横截面积 S", 0.5, 6, 0.1, 2, "单位"),
          segmented("material", "材料", "copper", [
            ["铜", "copper"],
            ["铁", "iron"],
            ["镍铬", "nichrome"],
          ]),
          range("voltage", "电压 U", 1, 12, 0.5, 6, "V"),
        ],
        stats: (v) => {
          const rho = materialRho(v.material);
          const r = rho * v.length / v.area;
          return [`ρ = ${rho.toFixed(1)}`, `R = ${r.toFixed(2)}Ω`, `I = ${(v.voltage / r).toFixed(2)}A`];
        },
      },
      {
        id: "resistivity-experiment",
        number: "11-3",
        unit: "第十一章 电路及其应用",
        title: "实验：导体电阻率的测量",
        focus: "伏安法测电阻并由几何尺寸求电阻率",
        subtitle:
          "调节滑动变阻器得到多组 U-I 数据，拟合斜率求电阻，再结合长度和直径计算电阻率。",
        caption: "伏安法测电阻率",
        sim: "resistivityExperiment",
        formulas: ["R = U/I", "ρ = RS/l", "多组数据拟合可减小偶然误差"],
        questions: [
          "为什么要测多组 U-I 数据？",
          "电流表内接和外接会带来什么系统误差？",
          "测直径时为什么要多处测量取平均？",
        ],
        script: [
          "调节滑动变阻器，生成不同 U-I 点。",
          "显示拟合直线，读出斜率 R。",
          "输入长度和直径，计算电阻率。",
        ],
        controls: [
          range("sampleR", "样品真实电阻", 1, 20, 0.5, 6, "Ω"),
          range("length", "长度 l", 0.2, 2, 0.1, 0.8, "m"),
          range("diameter", "直径 d", 0.2, 2, 0.1, 0.8, "mm"),
          toggle("showFit", "显示 U-I 拟合", true),
        ],
        stats: (v) => {
          const area = Math.PI * (v.diameter / 2) ** 2;
          return [`R ≈ ${v.sampleR.toFixed(1)}Ω`, `S ∝ ${area.toFixed(2)}`, `ρ ∝ ${(v.sampleR * area / v.length).toFixed(2)}`];
        },
      },
      {
        id: "series-parallel",
        number: "11-4",
        unit: "第十一章 电路及其应用",
        title: "串联电路和并联电路",
        focus: "串并联电路中的电流、电压和等效电阻关系",
        subtitle:
          "在串联和并联两种模式之间切换，观察各支路电流、电压分配和等效电阻变化。",
        caption: "串联、并联的等效电阻",
        sim: "seriesParallel",
        formulas: ["串联：R = R₁ + R₂，电流相等", "并联：1/R = 1/R₁ + 1/R₂，电压相等", "分压和分流由电阻关系决定"],
        questions: [
          "串联电路中哪个物理量处处相等？",
          "并联电路中哪个物理量各支路相等？",
          "为什么并联后总电阻小于任一支路电阻？",
        ],
        script: [
          "先选串联，观察同一电流经过两个电阻。",
          "切换并联，比较支路电流。",
          "改变 R1、R2，读出等效电阻。",
        ],
        controls: [
          segmented("circuitMode", "连接方式", "series", [
            ["串联", "series"],
            ["并联", "parallel"],
          ]),
          range("r1", "电阻 R₁", 1, 30, 1, 8, "Ω"),
          range("r2", "电阻 R₂", 1, 30, 1, 12, "Ω"),
          range("voltage", "电压 U", 1, 24, 1, 12, "V"),
        ],
        stats: (v) => {
          const r = v.circuitMode === "series" ? v.r1 + v.r2 : 1 / (1 / v.r1 + 1 / v.r2);
          return [`R等 = ${r.toFixed(2)}Ω`, `I总 = ${(v.voltage / r).toFixed(2)}A`, v.circuitMode === "series" ? "串联" : "并联"];
        },
      },
      {
        id: "multimeter",
        number: "11-5",
        unit: "第十一章 电路及其应用",
        title: "实验：练习使用多用电表",
        focus: "正确选择挡位、读数和连接方式",
        subtitle:
          "模拟多用电表的电压、电流和电阻挡，练习量程选择、表盘读数和红黑表笔连接。",
        caption: "多用电表挡位与读数",
        sim: "multimeter",
        formulas: ["测电压：并联接入", "测电流：串联接入", "测电阻：被测电路需断电"],
        questions: [
          "测电压和测电流时，电表应怎样接入电路？",
          "为什么测电阻前要断开电源？",
          "量程选得太小会有什么风险？",
        ],
        script: [
          "选择电压挡，演示并联读数。",
          "切换电流挡，演示串联接入。",
          "切换电阻挡，强调断电和欧姆调零。",
        ],
        controls: [
          segmented("meterMode", "测量挡位", "voltage", [
            ["电压", "voltage"],
            ["电流", "current"],
            ["电阻", "resistance"],
          ]),
          range("range", "量程倍率", 1, 10, 1, 5, "档"),
          range("trueValue", "被测量真值", 0.5, 12, 0.5, 3, "单位"),
          toggle("properConnection", "正确接法", true),
        ],
        stats: (v) => [`挡位：${meterLabel(v.meterMode)}`, `读数 ≈ ${v.trueValue.toFixed(1)}`, v.properConnection ? "接法正确" : "接法错误"],
      },
    ],
  },
  {
    id: "electric-energy-law",
    title: "第十二章 电能 能量守恒定律",
    sections: [
      {
        id: "circuit-energy",
        number: "12-1",
        unit: "第十二章 电能 能量守恒定律",
        title: "电路中的能量转化",
        focus: "电功、电功率和焦耳定律",
        subtitle:
          "电流通过用电器时，电能转化为内能、光能或机械能；调节电流和电阻观察热功率变化。",
        caption: "电功率与焦耳热",
        sim: "circuitEnergy",
        formulas: ["W = UIt", "P = UI", "焦耳定律：Q = I²Rt"],
        questions: [
          "电热器和电动机中的能量转化有何不同？",
          "电流加倍，焦耳热怎样变化？",
          "为什么输电要尽量减小线路电流？",
        ],
        script: [
          "切换灯泡、电热器、电动机三种负载。",
          "调节电流，观察热功率平方关系。",
          "显示能量流向，说明能量守恒。",
        ],
        controls: [
          range("current", "电流 I", 0.2, 6, 0.1, 2, "A"),
          range("resistance", "电阻 R", 1, 30, 1, 8, "Ω"),
          range("time", "通电时间 t", 1, 20, 1, 8, "s"),
          segmented("load", "用电器", "heater", [
            ["电热器", "heater"],
            ["灯泡", "lamp"],
            ["电动机", "motor"],
          ]),
        ],
        stats: (v) => [`P热 = ${(v.current * v.current * v.resistance).toFixed(1)}W`, `Q = ${(v.current * v.current * v.resistance * v.time).toFixed(0)}J`, loadLabel(v.load)],
      },
      {
        id: "closed-circuit-ohm",
        number: "12-2",
        unit: "第十二章 电能 能量守恒定律",
        title: "闭合电路的欧姆定律",
        focus: "电源电动势、内阻和端电压关系",
        subtitle:
          "改变外电阻时，电路电流、端电压和内阻消耗功率同时变化，理解 U = E - Ir。",
        caption: "E = U外 + U内",
        sim: "closedCircuit",
        formulas: ["I = E/(R + r)", "端电压：U = E - Ir", "电源输出功率：P = UI"],
        questions: [
          "外电阻变小时，电流怎样变化？端电压怎样变化？",
          "短路时为什么危险？",
          "内阻越大，电源输出表现有什么变化？",
        ],
        script: [
          "调节外电阻 R，观察电流和端电压。",
          "增大内阻 r，比较端电压下降。",
          "显示内外电压分配，联系能量守恒。",
        ],
        controls: [
          range("emf", "电动势 E", 1, 24, 0.5, 12, "V"),
          range("externalR", "外电阻 R", 0.5, 40, 0.5, 8, "Ω"),
          range("internalR", "内阻 r", 0, 10, 0.2, 1.5, "Ω"),
          toggle("showPower", "显示功率", true),
        ],
        stats: (v) => {
          const i = v.emf / (v.externalR + v.internalR);
          return [`I = ${i.toFixed(2)}A`, `U端 = ${(v.emf - i * v.internalR).toFixed(2)}V`, `P外 = ${(i * i * v.externalR).toFixed(1)}W`];
        },
      },
      {
        id: "battery-emf-experiment",
        number: "12-3",
        unit: "第十二章 电能 能量守恒定律",
        title: "实验：电池电动势和内阻的测量",
        focus: "由 U-I 图像截距和斜率求 E、r",
        subtitle:
          "调节滑动变阻器得到多组端电压和电流数据，画出 U-I 图像，纵截距为电动势，斜率绝对值为内阻。",
        caption: "U-I 图像测 E 和 r",
        sim: "batteryExperiment",
        formulas: ["U = E - Ir", "U-I 图像纵截距为 E", "图像斜率绝对值为 r"],
        questions: [
          "为什么 U-I 图像是一条下降直线？",
          "纵截距和斜率分别代表什么？",
          "电表内阻会带来怎样的实验误差？",
        ],
        script: [
          "改变外电阻，生成多组 U-I 数据点。",
          "显示拟合直线，读出截距 E。",
          "由斜率绝对值求内阻 r。",
        ],
        controls: [
          range("emf", "电动势 E", 1, 12, 0.2, 6, "V"),
          range("internalR", "内阻 r", 0.1, 5, 0.1, 1, "Ω"),
          toggle("showFit", "显示拟合直线", true),
          toggle("showError", "加入测量散点误差", true),
        ],
        stats: (v) => [`截距 E = ${v.emf.toFixed(1)}V`, `斜率 = -${v.internalR.toFixed(1)}Ω`, "U = E - Ir"],
      },
      {
        id: "energy-sustainability",
        number: "12-4",
        unit: "第十二章 电能 能量守恒定律",
        title: "能源与可持续发展",
        focus: "能量守恒与能量转化方向性",
        subtitle:
          "比较火电、风电、光伏等能源链路的能量转化和损耗，理解节能和可持续发展的物理基础。",
        caption: "能源链路与能量损耗",
        sim: "energySustainability",
        formulas: ["能量守恒：能量不会凭空产生或消失", "能量转化具有方向性", "效率 η = 有用输出能量 / 输入能量"],
        questions: [
          "既然能量守恒，为什么还要节约能源？",
          "能源利用效率低意味着什么？",
          "不同发电方式的能量转化链路有什么差异？",
        ],
        script: [
          "选择不同能源链路，观察输入、输出和损耗。",
          "调节效率，比较有用输出变化。",
          "强调能量守恒不等于能量都可被有效利用。",
        ],
        controls: [
          segmented("source", "能源类型", "solar", [
            ["光伏", "solar"],
            ["风电", "wind"],
            ["火电", "thermal"],
          ]),
          range("inputEnergy", "输入能量", 100, 1000, 50, 500, "单位"),
          range("efficiency", "转化效率", 10, 90, 1, 35, "%"),
          toggle("showLoss", "显示损耗", true),
        ],
        stats: (v) => [`输入 = ${v.inputEnergy.toFixed(0)}`, `输出 = ${(v.inputEnergy * v.efficiency / 100).toFixed(0)}`, `η = ${v.efficiency.toFixed(0)}%`],
      },
    ],
  },
  {
    id: "em-induction-wave",
    title: "第十三章 电磁感应与电磁波初步",
    sections: [
      {
        id: "magnetic-field-lines",
        number: "13-1",
        unit: "第十三章 电磁感应与电磁波初步",
        title: "磁场 磁感线",
        focus: "用磁感线描述磁场方向和强弱",
        subtitle:
          "条形磁体周围磁感线从 N 极出发回到 S 极，磁针 N 极指向磁场方向。",
        caption: "条形磁体与磁感线",
        sim: "magneticFieldLines",
        formulas: ["磁场对放入其中的磁体或电流有力的作用", "磁感线切线方向表示磁场方向", "磁感线疏密表示磁场强弱"],
        questions: [
          "磁感线是真实存在的线吗？",
          "磁针 N 极指向与磁场方向有什么关系？",
          "为什么磁感线不能相交？",
        ],
        script: [
          "显示条形磁体周围磁感线。",
          "移动小磁针，观察指向变化。",
          "改变磁体强度，观察磁感线疏密。",
        ],
        controls: [
          range("strength", "磁体强度", 1, 8, 0.2, 4, "单位"),
          range("probeAngle", "磁针位置角", 0, 360, 5, 45, "°"),
          toggle("showLines", "显示磁感线", true),
        ],
        stats: (v) => [`强度 = ${v.strength.toFixed(1)}`, `磁针角 = ${v.probeAngle.toFixed(0)}°`, "N → S"],
      },
      {
        id: "magnetic-flux",
        number: "13-2",
        unit: "第十三章 电磁感应与电磁波初步",
        title: "磁感应强度 磁通量",
        focus: "磁感应强度描述磁场强弱，磁通量描述穿过面积的磁场多少",
        subtitle:
          "转动线圈或改变面积、磁场强度，观察磁通量 Φ = BS cosθ 的变化。",
        caption: "Φ = BS cosθ",
        sim: "magneticFlux",
        formulas: ["磁感应强度 B 描述磁场强弱和方向", "磁通量：Φ = BS cosθ", "θ 为磁场方向与面积法线的夹角"],
        questions: [
          "线圈平面与磁场平行时磁通量怎样？",
          "面积加倍，磁通量怎样变化？",
          "为什么角度要用面积法线与磁场方向的夹角？",
        ],
        script: [
          "固定线圈面积，转动线圈观察 Φ 变化。",
          "改变 B 和 S，比较比例关系。",
          "标出面积法线，解释 cosθ。",
        ],
        controls: [
          range("B", "磁感应强度 B", 0.5, 6, 0.1, 3, "T"),
          range("area", "线圈面积 S", 0.5, 5, 0.1, 2, "单位"),
          range("angle", "法线夹角 θ", 0, 180, 2, 35, "°"),
          toggle("showNormal", "显示面积法线", true),
        ],
        stats: (v) => [`B = ${v.B.toFixed(1)}`, `S = ${v.area.toFixed(1)}`, `Φ = ${(v.B * v.area * Math.cos(toRad(v.angle))).toFixed(2)}`],
      },
      {
        id: "electromagnetic-induction",
        number: "13-3",
        unit: "第十三章 电磁感应与电磁波初步",
        title: "电磁感应现象及应用",
        focus: "磁通量变化产生感应电流",
        subtitle:
          "磁铁插入或拔出线圈时，穿过线圈的磁通量变化，线圈中出现感应电流，电流方向与磁通变化有关。",
        caption: "磁铁进出线圈与感应电流",
        sim: "emInduction",
        formulas: ["产生感应电流的条件：闭合回路磁通量发生变化", "感应电流方向总是阻碍磁通量的变化", "发电机利用电磁感应把机械能转化为电能"],
        questions: [
          "磁铁静止在线圈中时，是否有感应电流？",
          "磁铁运动越快，电流表偏转怎样？",
          "拔出磁铁和插入磁铁时电流方向有什么不同？",
        ],
        script: [
          "让磁铁缓慢插入线圈，观察电流表偏转。",
          "提高运动速度，比较偏转大小。",
          "改变运动方向，观察电流方向反转。",
        ],
        controls: [
          range("magnetSpeed", "磁铁速度", -5, 5, 0.2, 2, "单位"),
          range("turns", "线圈匝数", 5, 40, 1, 18, "匝"),
          toggle("closed", "闭合回路", true),
          toggle("showFlux", "显示磁通变化", true),
        ],
        stats: (v) => [`速度 = ${v.magnetSpeed.toFixed(1)}`, `N = ${v.turns.toFixed(0)}`, `I感 ∝ ${v.closed ? (v.magnetSpeed * v.turns / 20).toFixed(1) : "0.0"}`],
      },
      {
        id: "electromagnetic-wave",
        number: "13-4",
        unit: "第十三章 电磁感应与电磁波初步",
        title: "电磁波的发现及应用",
        focus: "变化的电场和磁场相互激发形成电磁波",
        subtitle:
          "用相互垂直的电场、磁场和传播方向演示电磁波，调节频率观察波长变化，并联系通信应用。",
        caption: "电磁波传播模型",
        sim: "emWave",
        formulas: ["电磁波在真空中速度 c ≈ 3.0×10⁸ m/s", "c = λf", "电场、磁场和传播方向两两垂直"],
        questions: [
          "频率越高，波长怎样变化？",
          "电磁波传播是否需要介质？",
          "无线电、红外线、可见光、X 射线有什么共同点？",
        ],
        script: [
          "显示 E、B 和传播方向的三维正交关系。",
          "调节频率，观察波长变化。",
          "切换应用频段，联系生活中的电磁波。",
        ],
        controls: [
          range("frequency", "频率 f", 0.5, 6, 0.1, 2, "单位"),
          range("amplitude", "场强振幅", 10, 80, 2, 42, "px"),
          segmented("band", "应用频段", "radio", [
            ["无线电", "radio"],
            ["微波", "microwave"],
            ["可见光", "visible"],
          ]),
          toggle("showVectors", "显示 E/B 方向", true),
        ],
        stats: (v) => [`f = ${v.frequency.toFixed(1)}`, `λ ∝ ${(1 / v.frequency).toFixed(2)}`, waveBandLabel(v.band)],
      },
      {
        id: "energy-quantization",
        number: "13-5",
        unit: "第十三章 电磁感应与电磁波初步",
        title: "能量量子化",
        focus: "能量吸收和发射具有不连续性",
        subtitle:
          "用能级跃迁模型展示：原子只能吸收或发射特定频率的光子，光子能量 E = hν。",
        caption: "能级跃迁与光子能量",
        sim: "quantization",
        formulas: ["光子能量：E = hν", "原子能级是分立的", "跃迁频率满足 hν = ΔE"],
        questions: [
          "为什么原子光谱是线状光谱？",
          "频率越高，单个光子能量怎样变化？",
          "能量量子化与经典连续能量观有什么不同？",
        ],
        script: [
          "选择两个能级，观察跃迁能量差。",
          "改变光频，判断能否被吸收。",
          "显示发射光子，联系线状光谱。",
        ],
        controls: [
          range("levelA", "初始能级", 1, 4, 1, 1, ""),
          range("levelB", "目标能级", 2, 5, 1, 3, ""),
          range("frequency", "入射光频率", 0.5, 6, 0.1, 2, "单位"),
          toggle("showPhoton", "显示光子", true),
        ],
        stats: (v) => {
          const gap = Math.abs(Math.round(v.levelB) - Math.round(v.levelA));
          return [`ΔE = ${gap.toFixed(0)}份`, `hν ∝ ${v.frequency.toFixed(1)}`, Math.abs(v.frequency - gap) < 0.25 ? "可跃迁" : "不匹配"];
        },
      },
    ],
  },
];

const selective1Chapters = [
  {
    id: "momentum-conservation",
    title: "第一章 动量守恒定律",
    sections: [
      {
        id: "momentum-basic",
        number: "1-1",
        unit: "第一章 动量守恒定律",
        title: "动量",
        focus: "动量是描述物体机械运动状态的矢量",
        subtitle: "用两辆小车比较质量、速度和动量的关系，观察动量方向与速度方向一致。",
        caption: "p = mv 的矢量模型",
        sim: "momentumBasic",
        formulas: ["动量：p = mv", "动量是矢量，方向与速度方向相同", "动量变化：Δp = p₂ - p₁"],
        questions: ["质量加倍、速度不变，动量怎样变化？", "速度反向时，动量是否也反向？", "动量大是否一定速度大？"],
        script: ["先固定质量改变速度，读出 p 的变化。", "再固定速度改变质量，比较动量大小。", "把速度调成负值，强调动量方向。"],
        controls: [
          range("mass", "质量 m", 0.2, 8, 0.1, 2, "kg"),
          range("velocity", "速度 v", -8, 8, 0.2, 3.5, "m/s"),
          toggle("showVector", "显示动量箭头", true),
        ],
        stats: (v) => [`m = ${v.mass.toFixed(1)}kg`, `v = ${v.velocity.toFixed(1)}m/s`, `p = ${(v.mass * v.velocity).toFixed(1)}kg·m/s`],
      },
      {
        id: "impulse-theorem",
        number: "1-2",
        unit: "第一章 动量守恒定律",
        title: "动量定理",
        focus: "合力的冲量等于物体动量的变化量",
        subtitle: "用力-时间图像显示冲量面积，比较安全气囊延长作用时间后平均力减小。",
        caption: "冲量与动量变化",
        sim: "impulseTheorem",
        formulas: ["冲量：I = Ft", "动量定理：I = Δp", "同样 Δp，作用时间越长，平均力越小"],
        questions: ["为什么安全气囊能减小乘员受力？", "力-时间图像下面积代表什么？", "动量变化方向和冲量方向有什么关系？"],
        script: ["调节作用时间，观察平均力变化。", "显示 F-t 图像面积，联系冲量。", "改变初末速度，验证 I = Δp。"],
        controls: [
          range("mass", "质量 m", 0.5, 8, 0.1, 2, "kg"),
          range("v0", "初速度 v₀", -8, 8, 0.2, 5, "m/s"),
          range("v1", "末速度 v", -8, 8, 0.2, -1, "m/s"),
          range("time", "作用时间 Δt", 0.05, 2, 0.05, 0.5, "s"),
        ],
        stats: (v) => {
          const impulse = v.mass * (v.v1 - v.v0);
          return [`Δp = ${impulse.toFixed(1)}`, `F均 = ${(impulse / v.time).toFixed(1)}N`, `Δt = ${v.time.toFixed(2)}s`];
        },
      },
      {
        id: "momentum-conservation-law",
        number: "1-3",
        unit: "第一章 动量守恒定律",
        title: "动量守恒定律",
        focus: "系统不受外力或合外力为零时，总动量守恒",
        subtitle: "两辆小车在水平轨道上碰撞，碰前碰后系统总动量保持不变。",
        caption: "两车系统总动量守恒",
        sim: "momentumConservation",
        formulas: ["系统总动量：p = p₁ + p₂", "条件：系统所受合外力为 0", "碰撞前总动量 = 碰撞后总动量"],
        questions: ["动量守恒定律适用于单个物体还是系统？", "内力能否改变系统总动量？", "外力不为零时还能近似守恒吗？"],
        script: ["设置两车质量和初速度，观察碰撞。", "显示碰前碰后总动量条。", "加入外力扰动，讨论守恒条件。"],
        controls: [
          range("m1", "左车质量", 0.5, 6, 0.1, 2, "kg"),
          range("m2", "右车质量", 0.5, 6, 0.1, 3, "kg"),
          range("v1", "左车初速度", -6, 8, 0.2, 4, "m/s"),
          range("v2", "右车初速度", -8, 6, 0.2, -1, "m/s"),
          range("external", "外力扰动", 0, 4, 0.1, 0, "N"),
        ],
        stats: (v) => [`p总 = ${(v.m1 * v.v1 + v.m2 * v.v2).toFixed(1)}`, v.external === 0 ? "近似守恒" : "有外力", `m₁:m₂=${v.m1.toFixed(1)}:${v.m2.toFixed(1)}`],
      },
      {
        id: "momentum-experiment",
        number: "1-4",
        unit: "第一章 动量守恒定律",
        title: "实验：验证动量守恒定律",
        focus: "用碰撞小球或气垫导轨数据比较碰前碰后总动量",
        subtitle: "模拟实验数据采集，比较碰前、碰后总动量的相对误差。",
        caption: "实验数据验证守恒",
        sim: "momentumExperiment",
        formulas: ["m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'", "相对误差 = |p后 - p前|/|p前|", "多次测量可减小偶然误差"],
        questions: ["为什么实验中常有小误差？", "如何减小轨道摩擦带来的影响？", "测速度时为什么要多次测量？"],
        script: ["显示光电门测得的碰前碰后速度。", "调节实验误差，观察相对误差。", "比较 p前 与 p后 是否接近。"],
        controls: [
          range("m1", "质量 m₁", 0.5, 5, 0.1, 1.5, "kg"),
          range("m2", "质量 m₂", 0.5, 5, 0.1, 2, "kg"),
          range("v1", "v₁", 0, 6, 0.1, 3, "m/s"),
          range("error", "实验误差", 0, 12, 1, 4, "%"),
        ],
        stats: (v) => [`p前 ≈ ${(v.m1 * v.v1).toFixed(2)}`, `误差 ${v.error.toFixed(0)}%`, "验证守恒"],
      },
      {
        id: "elastic-inelastic-collision",
        number: "1-5",
        unit: "第一章 动量守恒定律",
        title: "弹性碰撞和非弹性碰撞",
        focus: "比较动量守恒与机械能是否守恒",
        subtitle: "切换弹性、非弹性和完全非弹性碰撞，观察动量、动能和碰后速度的不同。",
        caption: "碰撞类型对比",
        sim: "collisionTypes",
        formulas: ["弹性碰撞：动量和机械能均守恒", "非弹性碰撞：动量守恒，机械能不守恒", "完全非弹性碰撞：碰后共同运动"],
        questions: ["动量守恒是否意味着机械能也守恒？", "完全非弹性碰撞中损失的机械能去了哪里？", "弹性碰撞的碰后速度为什么可能交换？"],
        script: ["先选弹性碰撞，观察动能条不变。", "切换完全非弹性，观察两车粘在一起。", "比较不同碰撞中的能量损失。"],
        controls: [
          segmented("collisionMode", "碰撞类型", "elastic", [
            ["弹性", "elastic"],
            ["非弹性", "inelastic"],
            ["完全非弹性", "sticky"],
          ]),
          range("m1", "m₁", 0.5, 6, 0.1, 2, "kg"),
          range("m2", "m₂", 0.5, 6, 0.1, 2.5, "kg"),
          range("v1", "v₁", -6, 8, 0.2, 4, "m/s"),
          range("v2", "v₂", -8, 6, 0.2, -2, "m/s"),
        ],
        stats: (v) => {
          const loss = v.collisionMode === "elastic" ? "无损失" : v.collisionMode === "sticky" ? "最大损失" : "有损失";
          return [`p总 = ${(v.m1 * v.v1 + v.m2 * v.v2).toFixed(1)}`, loss, v.collisionMode === "elastic" ? "弹性" : v.collisionMode === "sticky" ? "粘连" : "非弹性"];
        },
      },
      {
        id: "recoil-rocket",
        number: "1-6",
        unit: "第一章 动量守恒定律",
        title: "反冲现象 火箭",
        focus: "系统内部分离时由动量守恒产生反冲",
        subtitle: "气体向后喷出，火箭向前加速；喷气速度和喷气率越大，反冲效果越明显。",
        caption: "火箭反冲与动量守恒",
        sim: "recoilRocket",
        formulas: ["喷气前后系统总动量守恒", "反冲速度方向与喷出物方向相反", "火箭推力来自喷出气体的反作用"],
        questions: ["火箭在真空中能否飞行？为什么？", "喷气速度越大，反冲效果怎样？", "火箭质量变小时，加速度怎样变化？"],
        script: ["调节喷气速度，观察火箭加速度。", "调节火箭质量，比较同样喷气下的速度变化。", "强调不是空气推火箭，而是气体与火箭相互作用。"],
        controls: [
          range("rocketMass", "火箭质量", 2, 30, 1, 12, "单位"),
          range("exhaustSpeed", "喷气速度", 1, 12, 0.5, 6, "单位"),
          range("flowRate", "喷气率", 0.2, 4, 0.1, 1.5, "单位"),
          toggle("showGas", "显示喷气粒子", true),
        ],
        stats: (v) => [`推力∝${(v.exhaustSpeed * v.flowRate).toFixed(1)}`, `a∝${(v.exhaustSpeed * v.flowRate / v.rocketMass).toFixed(2)}`, "反冲"],
      },
    ],
  },
  {
    id: "mechanical-vibration",
    title: "第二章 机械振动",
    sections: [
      {
        id: "simple-harmonic-motion",
        number: "2-1",
        unit: "第二章 机械振动",
        title: "简谐运动",
        focus: "位移随时间按正弦规律变化的往复运动",
        subtitle: "弹簧振子在平衡位置附近往复运动，其 x-t 图像为正弦曲线。",
        caption: "弹簧振子与 x-t 图像",
        sim: "simpleHarmonic",
        formulas: ["x = A cos(ωt + φ)", "简谐运动是最基本的周期运动", "平衡位置附近往复运动"],
        questions: ["振子经过平衡位置时速度怎样？", "振幅增大是否改变周期？", "x-t 图像为什么是正弦曲线？"],
        script: ["调节振幅，观察最大位移变化。", "调节角频率，观察周期变化。", "显示 x-t 曲线，同步观察振子位置。"],
        controls: [
          range("amplitude", "振幅 A", 20, 120, 2, 70, "px"),
          range("omega", "角频率 ω", 0.5, 4, 0.1, 1.5, "rad/s"),
          range("phase", "初相 φ", 0, 360, 5, 0, "°"),
          toggle("showGraph", "显示 x-t 图像", true),
        ],
        stats: (v) => [`A=${v.amplitude.toFixed(0)}px`, `T=${(TAU / v.omega).toFixed(2)}s`, `ω=${v.omega.toFixed(1)}`],
      },
      {
        id: "shm-description",
        number: "2-2",
        unit: "第二章 机械振动",
        title: "简谐运动的描述",
        focus: "振幅、周期、频率、相位共同描述振动",
        subtitle: "用旋转矢量投影解释简谐运动，比较相位差对应的振动步调差异。",
        caption: "旋转矢量与相位",
        sim: "shmDescription",
        formulas: ["T = 1/f", "ω = 2πf", "相位：ωt + φ"],
        questions: ["两个振动相差 π 表示什么？", "频率和周期怎样互相转换？", "初相改变会改变振幅或周期吗？"],
        script: ["显示旋转矢量投影到 x 轴。", "调节初相，比较两个振动的步调。", "改变频率，读出周期。"],
        controls: [
          range("frequency", "频率 f", 0.2, 3, 0.05, 0.8, "Hz"),
          range("amplitude", "振幅 A", 30, 120, 2, 80, "px"),
          range("phaseDiff", "相位差 Δφ", 0, 360, 5, 90, "°"),
          toggle("showSecond", "显示第二个振动", true),
        ],
        stats: (v) => [`f=${v.frequency.toFixed(2)}Hz`, `T=${(1 / v.frequency).toFixed(2)}s`, `Δφ=${v.phaseDiff.toFixed(0)}°`],
      },
      {
        id: "shm-force-energy",
        number: "2-3",
        unit: "第二章 机械振动",
        title: "简谐运动的回复力和能量",
        focus: "回复力指向平衡位置，动能和势能周期性转化",
        subtitle: "弹簧振子运动中，回复力 F=-kx，弹性势能和动能相互转化，总机械能保持不变。",
        caption: "回复力与能量转化",
        sim: "shmEnergy",
        formulas: ["F = -kx", "Ep = 1/2kx²", "E = Ek + Ep"],
        questions: ["位移最大处动能和势能分别怎样？", "平衡位置处回复力是否为零？", "回复力为什么总指向平衡位置？"],
        script: ["显示回复力箭头，观察其总指向平衡位置。", "打开能量柱，比较 Ek 和 Ep。", "调节劲度系数，观察回复力大小。"],
        controls: [
          range("amplitude", "振幅 A", 30, 120, 2, 80, "px"),
          range("k", "劲度系数 k", 0.2, 3, 0.1, 1, "单位"),
          range("mass", "质量 m", 0.5, 5, 0.1, 1.5, "单位"),
          toggle("showEnergy", "显示能量柱", true),
        ],
        stats: (v) => [`k=${v.k.toFixed(1)}`, `m=${v.mass.toFixed(1)}`, `E∝${(0.5 * v.k * v.amplitude * v.amplitude / 1000).toFixed(1)}`],
      },
      {
        id: "pendulum",
        number: "2-4",
        unit: "第二章 机械振动",
        title: "单摆",
        focus: "小角度单摆近似做简谐运动",
        subtitle: "单摆周期主要由摆长和重力加速度决定，小角度近似下与振幅和质量无关。",
        caption: "单摆周期",
        sim: "pendulum",
        formulas: ["T = 2π√(l/g)", "小角度条件下近似简谐运动", "周期与摆球质量无关"],
        questions: ["摆长加倍，周期怎样变化？", "摆球质量改变，周期是否改变？", "为什么要求小角度？"],
        script: ["调节摆长，观察周期变化。", "调节最大摆角，说明小角度近似。", "改变 g，联系不同星球上的单摆。"],
        controls: [
          range("length", "摆长 l", 0.2, 3, 0.1, 1.2, "m"),
          range("angle", "最大摆角", 2, 30, 1, 12, "°"),
          range("g", "重力加速度 g", 1.6, 12, 0.1, 9.8, "m/s²"),
          toggle("showForces", "显示受力", true),
        ],
        stats: (v) => [`l=${v.length.toFixed(1)}m`, `T=${(TAU * Math.sqrt(v.length / v.g)).toFixed(2)}s`, `θ=${v.angle.toFixed(0)}°`],
      },
      {
        id: "pendulum-g-experiment",
        number: "2-5",
        unit: "第二章 机械振动",
        title: "实验：用单摆测量重力加速度",
        focus: "由单摆周期和摆长求当地重力加速度",
        subtitle: "通过测量 N 次全振动时间求周期，再由 g=4π²l/T² 计算重力加速度。",
        caption: "单摆测 g",
        sim: "pendulumExperiment",
        formulas: ["T = t/N", "g = 4π²l/T²", "多次测量和小角度可减小误差"],
        questions: ["为什么要测多次全振动的总时间？", "摆长应该测到哪里？", "角度过大为什么会带来误差？"],
        script: ["设置摆长和计时次数。", "显示计时读数和计算结果。", "加入测量误差，观察 g 的偏差。"],
        controls: [
          range("length", "摆长 l", 0.4, 2.5, 0.05, 1, "m"),
          range("cycles", "计时次数 N", 5, 50, 1, 20, "次"),
          range("timeError", "计时误差", -0.3, 0.3, 0.02, 0.04, "s"),
          toggle("showCalc", "显示计算", true),
        ],
        stats: (v) => {
          const trueT = TAU * Math.sqrt(v.length / G);
          const measuredT = trueT + v.timeError / v.cycles;
          return [`T≈${measuredT.toFixed(3)}s`, `g≈${(4 * Math.PI * Math.PI * v.length / (measuredT * measuredT)).toFixed(2)}`, `N=${v.cycles.toFixed(0)}`];
        },
      },
      {
        id: "forced-resonance",
        number: "2-6",
        unit: "第二章 机械振动",
        title: "受迫振动 共振",
        focus: "驱动力频率接近固有频率时振幅显著增大",
        subtitle: "调节驱动力频率，观察受迫振动振幅曲线在固有频率附近出现峰值。",
        caption: "共振曲线",
        sim: "forcedResonance",
        formulas: ["受迫振动频率等于驱动力频率", "共振：驱动力频率接近系统固有频率", "阻尼越小，共振峰越尖锐"],
        questions: ["共振一定有害吗？", "为什么桥梁和建筑要避开某些频率？", "增大阻尼后共振峰怎样变化？"],
        script: ["调节驱动频率穿过固有频率。", "观察振幅峰值。", "改变阻尼，比较峰值宽窄。"],
        controls: [
          range("naturalF", "固有频率 f₀", 0.5, 4, 0.1, 1.6, "Hz"),
          range("driveF", "驱动频率 f", 0.2, 5, 0.1, 1.4, "Hz"),
          range("damping", "阻尼", 0.05, 1, 0.05, 0.25, ""),
          toggle("showCurve", "显示共振曲线", true),
        ],
        stats: (v) => [`f₀=${v.naturalF.toFixed(1)}Hz`, `f=${v.driveF.toFixed(1)}Hz`, `振幅∝${resonanceAmp(v).toFixed(1)}`],
      },
    ],
  },
  {
    id: "mechanical-wave-selective",
    title: "第三章 机械波",
    sections: [
      {
        id: "wave-formation-selective",
        number: "3-1",
        unit: "第三章 机械波",
        title: "波的形成",
        focus: "机械振动在介质中传播形成机械波",
        subtitle: "绳上一点振动带动相邻质点依次振动，振动形式和能量向前传播。",
        caption: "机械波形成过程",
        sim: "waveFormationSelective",
        formulas: ["机械波需要介质", "传播的是振动形式和能量", "质点只在平衡位置附近振动"],
        questions: ["波峰向前传播时，质点是否随波峰迁移？", "没有介质能否形成机械波？", "波传播了什么？"],
        script: ["显示质点队列依次振动。", "打开质点轨迹，观察局部振动。", "调节振幅和频率，比较波形变化。"],
        controls: [
          range("amplitude", "振幅 A", 10, 90, 2, 48, "px"),
          range("frequency", "频率 f", 0.3, 2.5, 0.05, 0.9, "Hz"),
          range("wavelength", "波长 λ", 90, 300, 5, 180, "px"),
          toggle("showParticles", "显示质点", true),
        ],
        stats: (v) => [`A=${v.amplitude.toFixed(0)}px`, `f=${v.frequency.toFixed(2)}Hz`, `λ=${v.wavelength.toFixed(0)}px`],
      },
      {
        id: "wave-description-selective",
        number: "3-2",
        unit: "第三章 机械波",
        title: "波的描述",
        focus: "用波长、频率、波速和波的图像描述机械波",
        subtitle: "同步显示波形图和探针振动图像，区分 y-x 图像和 y-t 图像。",
        caption: "波的图像与振动图像",
        sim: "waveDescriptionSelective",
        formulas: ["v = λf", "波的图像：固定 t 看 y-x", "振动图像：固定 x 看 y-t"],
        questions: ["从哪张图读波长？从哪张图读周期？", "只看波形图能否判断传播方向？", "同相点之间距离是什么？"],
        script: ["移动探针，观察 y-t 图像相位。", "调节频率和波长，验证 v=λf。", "在不同瞬间比较两种图像含义。"],
        controls: [
          range("probe", "探针位置", 0.1, 0.9, 0.02, 0.42, "L"),
          range("frequency", "频率 f", 0.3, 2.5, 0.05, 0.8, "Hz"),
          range("wavelength", "波长 λ", 100, 280, 5, 180, "px"),
          toggle("showProbe", "显示探针", true),
        ],
        stats: (v) => [`f=${v.frequency.toFixed(2)}Hz`, `λ=${v.wavelength.toFixed(0)}px`, `v∝${(v.frequency * v.wavelength).toFixed(0)}`],
      },
      {
        id: "wave-reflection-refraction-diffraction",
        number: "3-3",
        unit: "第三章 机械波",
        title: "波的反射、折射和衍射",
        focus: "波遇到边界、进入新介质或绕过障碍时的传播变化",
        subtitle: "在同一演示台中切换反射、折射和衍射，观察波前方向和波长变化。",
        caption: "边界上的波现象",
        sim: "waveBoundary",
        formulas: ["反射：遇障碍返回原介质", "折射：进入新介质传播方向和波速改变", "衍射：波绕过障碍继续传播"],
        questions: ["折射时频率是否改变？", "孔越小，衍射越明显还是越不明显？", "反射波和入射波在同一介质中波速怎样？"],
        script: ["先切换反射，观察波前返回。", "切换折射，比较两侧波长。", "切换衍射，改变狭缝宽度。"],
        controls: [
          segmented("phenomenon", "波现象", "reflection", [
            ["反射", "reflection"],
            ["折射", "refraction"],
            ["衍射", "diffraction"],
          ]),
          range("wavelength", "波长 λ", 30, 110, 2, 64, "px"),
          range("speedRatio", "介质波速比", 0.4, 1.8, 0.05, 0.75, ""),
          range("slitWidth", "狭缝宽度", 30, 180, 5, 72, "px"),
        ],
        stats: (v) => [`λ=${v.wavelength.toFixed(0)}px`, `v₂/v₁=${v.speedRatio.toFixed(2)}`, v.phenomenon === "reflection" ? "反射" : v.phenomenon === "refraction" ? "折射" : "衍射"],
      },
      {
        id: "wave-interference-selective",
        number: "3-4",
        unit: "第三章 机械波",
        title: "波的干涉",
        focus: "相干波源叠加形成稳定干涉图样",
        subtitle: "两个相干波源在水面上形成相长、相消区域，路径差决定干涉结果。",
        caption: "双波源干涉",
        sim: "waveInterferenceSelective",
        formulas: ["y = y₁ + y₂", "相长：Δr = kλ", "相消：Δr = (k + 1/2)λ"],
        questions: ["相干波源需要满足什么条件？", "波长变大，干涉条纹间距怎样？", "初相差改变后，相长区会怎样变化？"],
        script: ["调节波源间距，观察条纹变化。", "改变波长，比较条纹疏密。", "切换初相差，观察相长相消互换。"],
        controls: [
          range("sourceDistance", "波源间距", 80, 260, 5, 150, "px"),
          range("wavelength", "波长 λ", 34, 110, 2, 68, "px"),
          segmented("phase", "初相差", "0", [
            ["0", "0"],
            ["π", "pi"],
          ]),
          toggle("showNodes", "标记相消区", true),
        ],
        stats: (v) => [`d=${v.sourceDistance.toFixed(0)}px`, `λ=${v.wavelength.toFixed(0)}px`, `Δφ=${v.phase === "pi" ? "π" : "0"}`],
      },
      {
        id: "doppler-effect",
        number: "3-5",
        unit: "第三章 机械波",
        title: "多普勒效应",
        focus: "波源或观察者相对介质运动导致接收频率变化",
        subtitle: "移动声源时，前方波面变密、后方波面变疏，观察者接收频率发生变化。",
        caption: "运动声源的波面",
        sim: "dopplerEffect",
        formulas: ["接近时接收频率升高", "远离时接收频率降低", "多普勒效应源于相对运动改变波面间距"],
        questions: ["救护车接近和远离时音调为什么不同？", "波源不动、观察者动是否也会出现多普勒效应？", "波源速度接近波速时波面有什么变化？"],
        script: ["先让声源静止，观察同心波面。", "增大声源速度，观察前密后疏。", "放置观察者，读出接收频率变化。"],
        controls: [
          range("sourceSpeed", "波源速度", -0.8, 0.8, 0.05, 0.35, "v波"),
          range("frequency", "发射频率", 0.5, 3, 0.1, 1.2, "单位"),
          range("observerX", "观察者位置", 0.1, 0.9, 0.02, 0.78, "L"),
          toggle("showWavefronts", "显示波面", true),
        ],
        stats: (v) => [`u源=${v.sourceSpeed.toFixed(2)}v`, `f=${v.frequency.toFixed(1)}`, "多普勒"],
      },
    ],
  },
  {
    id: "optics-selective",
    title: "第四章 光",
    sections: [
      {
        id: "light-refraction",
        number: "4-1",
        unit: "第四章 光",
        title: "光的折射",
        focus: "光从一种介质进入另一种介质时传播方向改变",
        subtitle: "调节入射角和折射率，观察折射光线并验证 n₁sinθ₁ = n₂sinθ₂。",
        caption: "折射定律",
        sim: "lightRefraction",
        formulas: ["n₁sinθ₁ = n₂sinθ₂", "折射率越大，光速越小", "光路可逆"],
        questions: ["从空气进入玻璃，折射光线偏向法线还是偏离法线？", "入射角增大，折射角怎样变化？", "光路可逆是什么意思？"],
        script: ["调节入射角，观察折射角变化。", "改变第二介质折射率，比较偏折程度。", "显示法线和角度读数。"],
        controls: [
          range("incident", "入射角 θ₁", 0, 80, 1, 35, "°"),
          range("n1", "介质 1 折射率", 1, 2.4, 0.05, 1, ""),
          range("n2", "介质 2 折射率", 1, 2.4, 0.05, 1.5, ""),
          toggle("showNormal", "显示法线", true),
        ],
        stats: (v) => {
          const s = Math.min(1, (v.n1 / v.n2) * Math.sin(toRad(v.incident)));
          return [`θ₁=${v.incident.toFixed(0)}°`, `θ₂=${(Math.asin(s) * 180 / Math.PI).toFixed(1)}°`, `n₂=${v.n2.toFixed(2)}`];
        },
      },
      {
        id: "total-internal-reflection",
        number: "4-2",
        unit: "第四章 光",
        title: "全反射",
        focus: "从光密介质射向光疏介质且入射角大于临界角时发生全反射",
        subtitle: "调节入射角和折射率，观察折射光消失、反射光增强的全过程。",
        caption: "临界角与全反射",
        sim: "totalInternalReflection",
        formulas: ["sinC = n₂/n₁ (n₁ > n₂)", "条件：光密到光疏，θ ≥ C", "光纤利用全反射传输光"],
        questions: ["为什么必须从光密介质射向光疏介质？", "临界角如何由折射率决定？", "光纤通信利用了什么现象？"],
        script: ["从小入射角开始，观察折射和反射并存。", "增大到临界角，折射光贴着界面。", "超过临界角，演示全反射。"],
        controls: [
          range("incident", "入射角 θ", 0, 89, 1, 50, "°"),
          range("nDense", "光密介质 n₁", 1.1, 2.4, 0.05, 1.6, ""),
          range("nRare", "光疏介质 n₂", 1, 1.6, 0.05, 1, ""),
          toggle("showFiber", "显示光纤应用", false),
        ],
        stats: (v) => {
          const c = Math.asin(Math.min(1, v.nRare / v.nDense)) * 180 / Math.PI;
          return [`C=${c.toFixed(1)}°`, `θ=${v.incident.toFixed(0)}°`, v.incident >= c ? "全反射" : "折射"];
        },
      },
      {
        id: "light-interference",
        number: "4-3",
        unit: "第四章 光",
        title: "光的干涉",
        focus: "相干光叠加形成明暗相间的干涉条纹",
        subtitle: "两束相干光在屏上叠加，路径差决定明纹和暗纹的位置。",
        caption: "明暗干涉条纹",
        sim: "lightInterference",
        formulas: ["明纹：Δr = kλ", "暗纹：Δr = (k + 1/2)λ", "干涉说明光具有波动性"],
        questions: ["为什么普通两盏灯不容易形成稳定干涉？", "明纹和暗纹分别对应怎样的路径差？", "波长改变时条纹间距怎样变化？"],
        script: ["调节波长，观察条纹间距。", "改变双缝间距，比较条纹疏密。", "强调相干条件。"],
        controls: [
          range("wavelength", "波长 λ", 420, 700, 10, 560, "nm"),
          range("slitDistance", "双缝间距 d", 0.2, 1.2, 0.05, 0.6, "mm"),
          range("screenDistance", "屏距 l", 0.5, 3, 0.1, 1.5, "m"),
          toggle("showPattern", "显示条纹", true),
        ],
        stats: (v) => [`λ=${v.wavelength.toFixed(0)}nm`, `d=${v.slitDistance.toFixed(2)}mm`, `Δx∝${(v.wavelength * v.screenDistance / v.slitDistance / 1000).toFixed(2)}`],
      },
      {
        id: "double-slit-wavelength",
        number: "4-4",
        unit: "第四章 光",
        title: "实验：用双缝干涉测量光的波长",
        focus: "由条纹间距、双缝间距和屏距求波长",
        subtitle: "读出 n 条明纹间距，计算相邻条纹间距，再由 λ = dΔx/l 求光的波长。",
        caption: "双缝干涉测波长",
        sim: "doubleSlitExperiment",
        formulas: ["Δx = lλ/d", "λ = dΔx/l", "多条纹测量可减小读数误差"],
        questions: ["为什么要测多条纹总宽度？", "双缝间距越小，条纹间距怎样变化？", "屏距测量误差会怎样影响波长？"],
        script: ["显示游标读数和条纹。", "改变测量条纹数，比较误差。", "由公式计算 λ。"],
        controls: [
          range("fringeSpacing", "条纹间距 Δx", 0.3, 3, 0.05, 1.2, "mm"),
          range("slitDistance", "双缝间距 d", 0.1, 1, 0.05, 0.4, "mm"),
          range("screenDistance", "屏距 l", 0.5, 3, 0.1, 1.2, "m"),
          range("fringeCount", "测量条纹数", 2, 12, 1, 6, "条"),
        ],
        stats: (v) => [`λ≈${(v.slitDistance * v.fringeSpacing / v.screenDistance * 1000).toFixed(0)}nm`, `N=${v.fringeCount.toFixed(0)}`, `Δx=${v.fringeSpacing.toFixed(2)}mm`],
      },
      {
        id: "light-diffraction",
        number: "4-5",
        unit: "第四章 光",
        title: "光的衍射",
        focus: "光绕过障碍或通过小孔后偏离直线传播",
        subtitle: "改变狭缝宽度和波长，观察中央亮纹宽度和衍射明显程度。",
        caption: "单缝衍射图样",
        sim: "lightDiffraction",
        formulas: ["狭缝越窄，衍射越明显", "波长越长，衍射越明显", "衍射也是光波动性的表现"],
        questions: ["为什么缝越窄，中央亮纹越宽？", "可见光为什么日常不容易明显绕过宏观障碍？", "衍射和干涉有什么联系？"],
        script: ["逐渐减小狭缝宽度，观察中央亮纹变宽。", "改变波长，比较图样变化。", "联系波动性证据。"],
        controls: [
          range("slitWidth", "狭缝宽度", 0.1, 2, 0.05, 0.6, "单位"),
          range("wavelength", "波长 λ", 420, 700, 10, 560, "nm"),
          toggle("showEnvelope", "显示强度包络", true),
        ],
        stats: (v) => [`a=${v.slitWidth.toFixed(2)}`, `λ=${v.wavelength.toFixed(0)}nm`, `宽度∝${(v.wavelength / v.slitWidth / 1000).toFixed(2)}`],
      },
      {
        id: "polarization-laser",
        number: "4-6",
        unit: "第四章 光",
        title: "光的偏振 激光",
        focus: "偏振证明光是横波，激光具有单色性、相干性和方向性",
        subtitle: "旋转偏振片观察透射强度变化，并切换激光束展示方向性和相干性。",
        caption: "偏振片与激光束",
        sim: "polarizationLaser",
        formulas: ["自然光可分解为各方向振动", "偏振光振动方向有规律", "马吕斯定律：I = I₀cos²θ"],
        questions: ["偏振现象为什么能说明光是横波？", "两片偏振片互相垂直时透射光怎样？", "激光与普通光源有什么区别？"],
        script: ["旋转第二片偏振片，观察透射强度。", "切换激光模式，展示细直光束。", "联系偏振眼镜和液晶显示。"],
        controls: [
          range("angle", "偏振片夹角 θ", 0, 180, 2, 45, "°"),
          segmented("lightMode", "光源", "polarized", [
            ["偏振光", "polarized"],
            ["激光", "laser"],
          ]),
          toggle("showIntensity", "显示强度", true),
        ],
        stats: (v) => [`θ=${v.angle.toFixed(0)}°`, `I/I₀=${(Math.cos(toRad(v.angle)) ** 2).toFixed(2)}`, v.lightMode === "laser" ? "激光" : "偏振"],
      },
    ],
  },
];

const selective2Chapters = [
  {
    id: "ampere-lorentz-force",
    title: "第一章 安培力与洛伦兹力",
    sections: [
      {
        id: "ampere-force-wire",
        number: "1-1",
        unit: "第一章 安培力与洛伦兹力",
        title: "磁场对通电导线的作用力",
        focus: "用左手定则和 F = BILsinθ 描述安培力",
        subtitle: "在匀强磁场中调节电流、磁感应强度、有效长度和夹角，观察通电导线受力大小与方向变化。",
        caption: "通电导线在磁场中的受力",
        sim: "ampereForce",
        formulas: ["F = BILsinθ", "左手定则判断安培力方向", "导线与磁场平行时安培力为 0"],
        questions: [
          "电流方向反向时，安培力方向怎样变化？",
          "导线与磁场平行时为什么不受安培力？",
          "增大 B、I、L 分别会怎样影响力的大小？",
        ],
        script: [
          "先把夹角调到 90°，观察安培力达到最大。",
          "反向电流，强调左手定则中四指指向电流方向。",
          "逐步减小夹角，让学生预测 F 的变化趋势。",
        ],
        controls: [
          range("current", "电流 I", -6, 6, 0.2, 3, "A"),
          range("field", "磁感应强度 B", 0.2, 5, 0.1, 2.2, "T"),
          range("length", "导线有效长度 L", 0.2, 3, 0.1, 1.4, "m"),
          range("angle", "B 与 I 夹角", 0, 180, 1, 90, "°"),
          toggle("showField", "显示磁场方向", true),
        ],
        stats: (v) => {
          const force = v.field * Math.abs(v.current) * v.length * Math.sin(toRad(v.angle));
          return [`B=${v.field.toFixed(1)}T`, `I=${v.current.toFixed(1)}A`, `F=${force.toFixed(2)}N`];
        },
      },
      {
        id: "lorentz-force",
        number: "1-2",
        unit: "第一章 安培力与洛伦兹力",
        title: "磁场对运动电荷的作用力",
        focus: "理解洛伦兹力方向始终垂直于速度和磁场",
        subtitle: "让带电粒子射入磁场，改变电荷正负、速度、磁场强弱和夹角，观察 qvBsinθ 对力的影响。",
        caption: "洛伦兹力与左手定则",
        sim: "lorentzForce",
        formulas: ["F = qvBsinθ", "洛伦兹力不做功，只改变速度方向", "正负电荷受力方向相反"],
        questions: [
          "为什么洛伦兹力不改变粒子速率？",
          "把电荷改成负值后，受力方向怎样改变？",
          "速度与磁场平行时粒子会怎样运动？",
        ],
        script: [
          "先设置正电荷垂直射入磁场，标出 v、B、F 三个方向。",
          "改变电荷符号，比较力的反向。",
          "把夹角调小，引出 sinθ 因子。",
        ],
        controls: [
          range("charge", "电荷 q", -4, 4, 0.5, 1.5, "单位"),
          range("speed", "速度 v", 1, 10, 0.2, 5.5, "单位"),
          range("field", "磁感应强度 B", 0.2, 5, 0.1, 2, "T"),
          range("angle", "v 与 B 夹角", 0, 180, 1, 90, "°"),
          toggle("showForce", "显示力方向", true),
        ],
        stats: (v) => {
          const force = Math.abs(v.charge) * v.speed * v.field * Math.sin(toRad(v.angle));
          return [`q=${v.charge.toFixed(1)}`, `v=${v.speed.toFixed(1)}`, `F=${force.toFixed(2)}`];
        },
      },
      {
        id: "charged-particle-magnetic",
        number: "1-3",
        unit: "第一章 安培力与洛伦兹力",
        title: "带电粒子在匀强磁场中的运动",
        focus: "由 qvB = mv²/r 建立半径、周期与参数关系",
        subtitle: "粒子垂直进入匀强磁场后做匀速圆周运动，可调质量、电荷量、速度和磁场强度来观察轨道半径。",
        caption: "磁场中的圆周运动",
        sim: "chargedParticleMagnetic",
        formulas: ["qvB = mv²/r", "r = mv/(|q|B)", "T = 2πm/(|q|B)"],
        questions: [
          "速度增大时轨道半径为什么增大？",
          "磁场越强，粒子转弯为什么越急？",
          "周期为什么与速度无关？",
        ],
        script: [
          "从 qvB 提供向心力出发，打开轨迹圆。",
          "调节速度和磁场强度，让学生观察 r 的相反变化。",
          "固定 q、B 改变质量，比较周期变化。",
        ],
        controls: [
          range("charge", "电荷 q", -3, 3, 0.5, 1.5, "单位"),
          range("mass", "质量 m", 0.5, 6, 0.1, 2, "单位"),
          range("speed", "速度 v", 1, 10, 0.2, 5, "单位"),
          range("field", "磁感应强度 B", 0.3, 5, 0.1, 2, "T"),
          toggle("showRadius", "显示半径", true),
        ],
        stats: (v) => {
          const q = Math.max(0.1, Math.abs(v.charge));
          return [`r∝${(v.mass * v.speed / (q * v.field)).toFixed(2)}`, `T∝${(v.mass / (q * v.field)).toFixed(2)}`, v.charge >= 0 ? "正电荷" : "负电荷"];
        },
      },
      {
        id: "mass-spectrometer-cyclotron",
        number: "1-4",
        unit: "第一章 安培力与洛伦兹力",
        title: "质谱仪与回旋加速器",
        focus: "把电场加速和磁场偏转组合成粒子分析与加速装置",
        subtitle: "在质谱仪和回旋加速器两种模式间切换，观察速度选择、半径测量和交变电场加速的核心机制。",
        caption: "粒子装置中的电磁组合",
        sim: "acceleratorSpectrometer",
        formulas: ["1/2mv² = qU", "质谱半径：r = mv/(qB)", "回旋周期：T = 2πm/(qB)"],
        questions: [
          "质谱仪为什么能区分不同质量的粒子？",
          "回旋加速器中磁场主要改变什么？",
          "加速电压增大后轨道半径如何改变？",
        ],
        script: [
          "先选质谱仪，观察不同质量粒子的落点差异。",
          "切换回旋加速器，说明电场负责加速、磁场负责转弯。",
          "改变 B 和 U，读取半径或最终能量。",
        ],
        controls: [
          segmented("device", "装置", "mass", [
            ["质谱仪", "mass"],
            ["回旋加速器", "cyclotron"],
          ]),
          range("charge", "电荷 q", 0.5, 4, 0.1, 1.5, "单位"),
          range("mass", "质量 m", 0.5, 8, 0.1, 3, "单位"),
          range("field", "磁感应强度 B", 0.4, 5, 0.1, 2.2, "T"),
          range("voltage", "加速电压 U", 1, 12, 0.5, 6, "kV"),
        ],
        stats: (v) => {
          const speed = Math.sqrt((2 * v.charge * v.voltage) / v.mass);
          return [v.device === "mass" ? "质谱仪" : "回旋加速器", `v∝${speed.toFixed(2)}`, `r∝${(v.mass * speed / (v.charge * v.field)).toFixed(2)}`];
        },
      },
    ],
  },
  {
    id: "electromagnetic-induction-selective2",
    title: "第二章 电磁感应",
    sections: [
      {
        id: "lenz-law",
        number: "2-1",
        unit: "第二章 电磁感应",
        title: "楞次定律",
        focus: "感应电流的磁场总要阻碍磁通量的变化",
        subtitle: "推动磁体靠近或远离线圈，观察感应电流方向如何随磁通量增加或减少而反向。",
        caption: "阻碍磁通量变化的方向判断",
        sim: "lenzLaw",
        formulas: ["感应电流方向遵循楞次定律", "感应磁场阻碍磁通量变化", "能量守恒是方向判断的根基"],
        questions: [
          "靠近线圈和远离线圈时，电流方向为什么相反？",
          "这里的“阻碍”是阻止运动还是阻碍磁通量变化？",
          "若线圈断开，还会有感应电流吗？",
        ],
        script: [
          "让磁体靠近闭合线圈，先判断原磁通量变化。",
          "显示感应磁场方向，再用右手螺旋定则读出电流方向。",
          "断开线圈，说明有感应电动势但无持续电流。",
        ],
        controls: [
          range("magnetSpeed", "磁体速度", -5, 5, 0.2, 2.5, "单位"),
          range("turns", "线圈匝数", 5, 40, 1, 20, "匝"),
          range("distance", "磁体距离", 0.1, 1, 0.02, 0.45, "L"),
          toggle("closed", "闭合线圈", true),
          toggle("showFlux", "显示磁通量变化", true),
        ],
        stats: (v) => [`运动：${v.magnetSpeed >= 0 ? "靠近" : "远离"}`, `N=${v.turns.toFixed(0)}`, v.closed ? "有感应电流" : "无闭合电流"],
      },
      {
        id: "faraday-law",
        number: "2-2",
        unit: "第二章 电磁感应",
        title: "法拉第电磁感应定律",
        focus: "用磁通量变化率定量描述感应电动势",
        subtitle: "调节线圈匝数、磁通量变化量和变化时间，实时比较 ε = NΔΦ/Δt 的大小。",
        caption: "感应电动势与磁通量变化率",
        sim: "faradayLaw",
        formulas: ["ε = N|ΔΦ/Δt|", "磁通量 Φ = BS⊥", "变化越快，感应电动势越大"],
        questions: [
          "匝数加倍时，感应电动势怎样变化？",
          "同样的 ΔΦ，用时越短说明什么？",
          "磁通量不变时，是否一定没有感应电动势？",
        ],
        script: [
          "固定 Δt，逐步增大 ΔΦ，观察电动势条形图。",
          "固定 ΔΦ，缩短时间，突出“变化率”。",
          "调节匝数，联系多匝线圈的放大效果。",
        ],
        controls: [
          range("turns", "线圈匝数 N", 1, 60, 1, 24, "匝"),
          range("fluxChange", "磁通量变化 ΔΦ", -6, 6, 0.2, 3, "Wb"),
          range("deltaT", "变化时间 Δt", 0.2, 5, 0.1, 1.2, "s"),
          toggle("showGraph", "显示 Φ-t 图像", true),
        ],
        stats: (v) => [`N=${v.turns.toFixed(0)}`, `ΔΦ=${v.fluxChange.toFixed(1)}`, `ε=${Math.abs(v.turns * v.fluxChange / v.deltaT).toFixed(1)}V`],
      },
      {
        id: "eddy-current-damping",
        number: "2-3",
        unit: "第二章 电磁感应",
        title: "涡流、电磁阻尼和电磁驱动",
        focus: "导体内部感应电流会产生热效应、阻尼或驱动作用",
        subtitle: "磁体相对导体板运动时形成涡流，涡流磁场阻碍相对运动；切换材料可比较导电性影响。",
        caption: "涡流与电磁阻尼",
        sim: "eddyCurrent",
        formulas: ["涡流是块状导体中的感应电流", "电磁阻尼来源于楞次定律", "涡流可用于制动、加热和驱动"],
        questions: [
          "绝缘板中为什么几乎没有电磁阻尼？",
          "涡流加热和电磁制动分别利用了什么效应？",
          "开槽铁芯为什么能减小涡流损耗？",
        ],
        script: [
          "先选铜板，观察强涡流和明显阻尼。",
          "切换铝板、绝缘板，比较导电性差异。",
          "增大相对速度，说明磁通量变化率更大。",
        ],
        controls: [
          segmented("material", "导体板材料", "copper", [
            ["铜板", "copper"],
            ["铝板", "aluminum"],
            ["绝缘板", "insulator"],
          ]),
          range("magnetSpeed", "磁体速度", 0.5, 8, 0.1, 4, "单位"),
          range("field", "磁场强度", 0.5, 5, 0.1, 2.4, "单位"),
          toggle("showHeat", "显示热效应", true),
        ],
        stats: (v) => {
          const k = v.material === "copper" ? 1 : v.material === "aluminum" ? 0.65 : 0.06;
          return [`材料：${v.material === "copper" ? "铜" : v.material === "aluminum" ? "铝" : "绝缘"}`, `阻尼∝${(k * v.magnetSpeed * v.field).toFixed(1)}`, "楞次定律"];
        },
      },
      {
        id: "mutual-self-inductance",
        number: "2-4",
        unit: "第二章 电磁感应",
        title: "互感和自感",
        focus: "线圈电流变化会在自身或邻近线圈中激发感应电动势",
        subtitle: "在互感和自感模式间切换，观察铁芯、匝数和电流变化率对感应电动势的影响。",
        caption: "线圈中的感应电动势",
        sim: "mutualSelfInductance",
        formulas: ["互感：一个线圈影响另一个线圈", "自感：线圈阻碍自身电流变化", "εL ∝ LΔI/Δt"],
        questions: [
          "为什么开关闭合瞬间灯泡不会立即达到稳定亮度？",
          "铁芯为什么能增强互感或自感现象？",
          "电流稳定后还有自感电动势吗？",
        ],
        script: [
          "选择互感模式，改变原线圈电流变化率观察副线圈响应。",
          "切换自感模式，显示线圈阻碍电流突变。",
          "插入铁芯，比较磁耦合增强。",
        ],
        controls: [
          segmented("mode", "演示模式", "mutual", [
            ["互感", "mutual"],
            ["自感", "self"],
          ]),
          range("currentChange", "电流变化率", -8, 8, 0.2, 4, "A/s"),
          range("turns", "线圈匝数", 5, 60, 1, 28, "匝"),
          segmented("core", "铁芯", "iron", [
            ["铁芯", "iron"],
            ["空气", "air"],
          ]),
        ],
        stats: (v) => {
          const core = v.core === "iron" ? 1.8 : 1;
          return [v.mode === "mutual" ? "互感" : "自感", `N=${v.turns.toFixed(0)}`, `ε∝${(Math.abs(v.currentChange) * v.turns * core / 20).toFixed(1)}`];
        },
      },
    ],
  },
  {
    id: "alternating-current-selective2",
    title: "第三章 交变电流",
    sections: [
      {
        id: "alternating-current",
        number: "3-1",
        unit: "第三章 交变电流",
        title: "交变电流",
        focus: "从线圈在磁场中转动理解正弦式交变电流",
        subtitle: "发电机线圈匀速转动，穿过线圈的磁通量周期变化，感应电动势也随时间按正弦规律变化。",
        caption: "交流发电机与正弦电流",
        sim: "alternatingCurrent",
        formulas: ["e = Emsinωt", "ω = 2πf", "线圈平面与磁场垂直时磁通量最大"],
        questions: [
          "线圈转到什么位置时电动势为零？",
          "频率增大后，一个周期的时间怎样变化？",
          "电动势最大时磁通量本身是否最大？",
        ],
        script: [
          "显示转动线圈，观察磁通量和电动势的相位差。",
          "调节频率，让波形周期缩短或伸长。",
          "调节振幅，联系线圈匝数、面积和磁场强弱。",
        ],
        controls: [
          range("amplitude", "峰值 Em", 1, 12, 0.5, 6, "V"),
          range("frequency", "频率 f", 0.2, 4, 0.1, 1.2, "Hz"),
          range("phase", "初相 φ", 0, 360, 5, 0, "°"),
          toggle("showGenerator", "显示发电机线圈", true),
        ],
        stats: (v) => [`Em=${v.amplitude.toFixed(1)}V`, `f=${v.frequency.toFixed(1)}Hz`, `T=${(1 / v.frequency).toFixed(2)}s`],
      },
      {
        id: "ac-description",
        number: "3-2",
        unit: "第三章 交变电流",
        title: "交变电流的描述",
        focus: "区分峰值、瞬时值、周期、频率和有效值",
        subtitle: "在正弦波形上同时标出峰值、有效值和当前瞬时值，理解有效值与热效应等效有关。",
        caption: "交流量的峰值与有效值",
        sim: "acDescription",
        formulas: ["u = Umsinωt", "U = Um/√2", "I = Im/√2"],
        questions: [
          "220V 家用电压通常指峰值还是有效值？",
          "峰值不变时，频率改变会影响有效值吗？",
          "为什么有效值要从热效应来定义？",
        ],
        script: [
          "先显示峰值线，让学生读出最大瞬时值。",
          "打开有效值线，比较 Um 与 U。",
          "改变频率，指出有效值与振幅关系更直接。",
        ],
        controls: [
          range("peakVoltage", "峰值 Um", 10, 380, 5, 311, "V"),
          range("frequency", "频率 f", 10, 80, 1, 50, "Hz"),
          range("resistance", "电阻 R", 5, 200, 5, 50, "Ω"),
          toggle("showEffective", "显示有效值", true),
        ],
        stats: (v) => {
          const u = v.peakVoltage / Math.sqrt(2);
          return [`Um=${v.peakVoltage.toFixed(0)}V`, `U=${u.toFixed(0)}V`, `P=${(u * u / v.resistance).toFixed(1)}W`];
        },
      },
      {
        id: "transformer",
        number: "3-3",
        unit: "第三章 交变电流",
        title: "变压器",
        focus: "理想变压器中电压与匝数成正比，功率近似守恒",
        subtitle: "调节原副线圈匝数和负载，观察升压、降压时 U、I 的对应变化。",
        caption: "理想变压器模型",
        sim: "transformer",
        formulas: ["U₂/U₁ = N₂/N₁", "I₂/I₁ = N₁/N₂", "理想变压器 P₁ ≈ P₂"],
        questions: [
          "为什么变压器不能直接变换恒定直流电？",
          "升压时副线圈电流为什么会减小？",
          "负载改变会怎样影响原线圈电流？",
        ],
        script: [
          "先设 N2>N1，演示升压变压器。",
          "改变负载电阻，观察副线圈电流和输入功率变化。",
          "设 N2<N1，对比降压场景。",
        ],
        controls: [
          range("n1", "原线圈匝数 N₁", 50, 800, 10, 200, "匝"),
          range("n2", "副线圈匝数 N₂", 50, 1200, 10, 600, "匝"),
          range("u1", "输入电压 U₁", 12, 380, 2, 220, "V"),
          range("load", "负载电阻 R", 5, 500, 5, 120, "Ω"),
        ],
        stats: (v) => {
          const u2 = v.u1 * v.n2 / v.n1;
          return [`U₂=${u2.toFixed(0)}V`, `I₂=${(u2 / v.load).toFixed(2)}A`, v.n2 > v.n1 ? "升压" : "降压"];
        },
      },
      {
        id: "power-transmission",
        number: "3-4",
        unit: "第三章 交变电流",
        title: "电能的输送",
        focus: "高压输电通过减小电流降低线路热损耗",
        subtitle: "同一输送功率下提高输电电压，电流减小，线路损耗 P损 = I²R 显著降低。",
        caption: "高压输电与线路损耗",
        sim: "powerTransmission",
        formulas: ["P = UI", "P损 = I²R线", "高压输电可减小输电电流"],
        questions: [
          "为什么远距离输电要先升压再降压？",
          "输送功率不变时，电压加倍电流怎样变化？",
          "线路电阻越大，损耗会怎样改变？",
        ],
        script: [
          "固定输送功率，先使用低电压观察损耗。",
          "逐步升高输电电压，比较电流和热损耗。",
          "改变线路电阻，联系电线材料和长度。",
        ],
        controls: [
          range("power", "输送功率 P", 10, 500, 10, 120, "kW"),
          range("voltage", "输电电压 U", 1, 220, 1, 35, "kV"),
          range("lineResistance", "线路电阻 R线", 0.5, 20, 0.5, 5, "Ω"),
          toggle("showCompare", "显示低压对比", true),
        ],
        stats: (v) => {
          const current = v.power / v.voltage;
          const loss = current * current * v.lineResistance;
          return [`I=${current.toFixed(2)}A(相对)`, `P损=${loss.toFixed(2)}`, `损耗率=${(loss / v.power * 100).toFixed(1)}%`];
        },
      },
    ],
  },
  {
    id: "em-oscillation-wave",
    title: "第四章 电磁振荡与电磁波",
    sections: [
      {
        id: "lc-oscillation",
        number: "4-1",
        unit: "第四章 电磁振荡与电磁波",
        title: "电磁振荡",
        focus: "LC 回路中电场能和磁场能周期性转化",
        subtitle: "电容器放电后，电流在线圈中建立磁场，能量在电场和磁场之间往复转化并形成振荡。",
        caption: "LC 振荡回路能量交换",
        sim: "lcOscillation",
        formulas: ["T = 2π√(LC)", "电场能与磁场能相互转化", "实际回路因电阻会衰减"],
        questions: [
          "电容器电荷量最大时电流是否最大？",
          "增大电感或电容后振荡周期怎样变化？",
          "电阻为什么会使振荡逐渐衰减？",
        ],
        script: [
          "显示电容器电荷与线圈电流的相位关系。",
          "调节 L、C，观察周期变长或变短。",
          "加入电阻，说明能量转化为内能。",
        ],
        controls: [
          range("capacitance", "电容 C", 0.5, 8, 0.1, 2.5, "单位"),
          range("inductance", "电感 L", 0.5, 8, 0.1, 3, "单位"),
          range("charge", "初始电荷", 0.5, 6, 0.1, 3, "单位"),
          range("resistance", "阻尼电阻", 0, 1.5, 0.05, 0.18, "单位"),
        ],
        stats: (v) => [`T∝${(TAU * Math.sqrt(v.capacitance * v.inductance)).toFixed(1)}`, `C=${v.capacitance.toFixed(1)}`, `L=${v.inductance.toFixed(1)}`],
      },
      {
        id: "em-field-wave",
        number: "4-2",
        unit: "第四章 电磁振荡与电磁波",
        title: "电磁场与电磁波",
        focus: "变化的电场和磁场相互激发并向外传播",
        subtitle: "用互相垂直的 E、B 振动矢量和传播方向展示电磁波的横波特征。",
        caption: "电磁波的 E、B 与传播方向",
        sim: "emFieldWave",
        formulas: ["变化电场产生磁场，变化磁场产生电场", "E、B 与传播方向两两垂直", "电磁波可在真空中传播"],
        questions: [
          "电磁波为什么不需要介质？",
          "E、B 与传播方向之间是什么几何关系？",
          "频率增大时波长怎样变化？",
        ],
        script: [
          "同时显示 E 波和 B 波，标出互相垂直关系。",
          "改变频率，观察空间波长变化。",
          "关闭其中一个矢量，突出两个场相互联系。",
        ],
        controls: [
          range("frequency", "频率", 0.5, 5, 0.1, 1.6, "单位"),
          range("amplitude", "振幅", 20, 90, 2, 52, "px"),
          toggle("showElectric", "显示电场 E", true),
          toggle("showMagnetic", "显示磁场 B", true),
        ],
        stats: (v) => [`f=${v.frequency.toFixed(1)}`, `λ∝${(1 / v.frequency).toFixed(2)}`, "横波"],
      },
      {
        id: "radio-transmit-receive",
        number: "4-3",
        unit: "第四章 电磁振荡与电磁波",
        title: "无线电波的发射和接收",
        focus: "调制、发射、传播、调谐和解调构成无线通信链路",
        subtitle: "低频信息叠加到高频载波上，经发射天线辐射，再由接收天线和调谐电路取出信号。",
        caption: "无线电发射与接收",
        sim: "radioTransmitReceive",
        formulas: ["调制：把信息加载到载波上", "调谐：选择特定频率信号", "解调：从载波中还原信息"],
        questions: [
          "为什么无线通信需要高频载波？",
          "接收机的调谐电路起什么作用？",
          "调幅波的包络为什么能表示声音信息？",
        ],
        script: [
          "显示音频信号、载波和调幅波形。",
          "调节载波频率，观察波形变密。",
          "增大距离，说明接收信号衰减和调谐选择。",
        ],
        controls: [
          range("carrier", "载波频率", 1, 8, 0.2, 4, "单位"),
          range("audio", "信息频率", 0.2, 2, 0.1, 0.7, "单位"),
          range("distance", "传播距离", 0, 1, 0.02, 0.45, "L"),
          toggle("showModulation", "显示调制波", true),
        ],
        stats: (v) => [`fc=${v.carrier.toFixed(1)}`, `fm=${v.audio.toFixed(1)}`, `接收∝${(1 - v.distance * 0.75).toFixed(2)}`],
      },
      {
        id: "spectrum",
        number: "4-4",
        unit: "第四章 电磁振荡与电磁波",
        title: "电磁波谱",
        focus: "按频率或波长认识无线电波、红外线、可见光、紫外线、X 射线等",
        subtitle: "在电磁波谱上移动指针，比较不同波段的波长、频率、能量和典型应用。",
        caption: "电磁波谱与应用",
        sim: "spectrum",
        formulas: ["c = λf", "频率越高，单个光子能量越大", "不同波段有不同产生方式和应用"],
        questions: [
          "可见光只占电磁波谱的哪一小段？",
          "红外线和紫外线在能量上有什么差异？",
          "医学成像为什么常用 X 射线？",
        ],
        script: [
          "从无线电波移动到可见光，比较波长变短。",
          "继续移动到紫外、X 射线，提示能量升高。",
          "打开应用标签，让学生匹配常见技术。",
        ],
        controls: [
          range("position", "谱段位置", 0, 1, 0.01, 0.42, ""),
          segmented("focusBand", "重点波段", "visible", [
            ["无线电", "radio"],
            ["可见光", "visible"],
            ["X 射线", "xray"],
          ]),
          toggle("showApplications", "显示典型应用", true),
        ],
        stats: (v) => {
          const bands = ["无线电波", "微波", "红外线", "可见光", "紫外线", "X 射线", "γ 射线"];
          return [`当前：${bands[Math.min(bands.length - 1, Math.floor(v.position * bands.length))]}`, `f 相对=${(10 ** (v.position * 6)).toFixed(0)}`, "c=λf"];
        },
      },
    ],
  },
  {
    id: "sensors-selective2",
    title: "第五章 传感器",
    sections: [
      {
        id: "sensor-intro",
        number: "5-1",
        unit: "第五章 传感器",
        title: "认识传感器",
        focus: "传感器把非电学量转换成便于测量和控制的电学量",
        subtitle: "把温度、光照或压力输入传感器，观察输出电压如何随输入变化并触发后级电路。",
        caption: "非电学量到电信号",
        sim: "sensorIntro",
        formulas: ["传感器：输入量 → 电信号", "敏感元件 + 转换电路", "阈值可用于自动控制"],
        questions: [
          "传感器为什么常把信息转换成电信号？",
          "同一个传感器是否一定只适合一种应用？",
          "阈值设置过高或过低会带来什么问题？",
        ],
        script: [
          "切换温度、光照、压力三种输入。",
          "缓慢改变输入量，观察输出电压连续变化。",
          "设置阈值，说明传感器如何进入控制系统。",
        ],
        controls: [
          segmented("inputType", "输入量", "temperature", [
            ["温度", "temperature"],
            ["光照", "light"],
            ["压力", "pressure"],
          ]),
          range("inputValue", "输入强度", 0, 100, 1, 58, "%"),
          range("threshold", "触发阈值", 0, 100, 1, 65, "%"),
          toggle("showSignal", "显示信号链", true),
        ],
        stats: (v) => [`输入=${v.inputValue.toFixed(0)}%`, `阈值=${v.threshold.toFixed(0)}%`, v.inputValue >= v.threshold ? "已触发" : "未触发"],
      },
      {
        id: "sensor-principles",
        number: "5-2",
        unit: "第五章 传感器",
        title: "常见传感器的工作原理及应用",
        focus: "热敏电阻、光敏电阻和霍尔元件等把环境变化转成电路变化",
        subtitle: "选择不同传感器类型，观察敏感元件电阻或霍尔电压随输入量改变，并得到输出电压。",
        caption: "常见敏感元件与输出",
        sim: "sensorPrinciples",
        formulas: ["热敏电阻：R 随温度变化", "光敏电阻：光照增强 R 变小", "霍尔电压 UH ∝ IB"],
        questions: [
          "光敏电阻在强光下电阻为什么会减小？",
          "热敏电阻能怎样用于温度报警？",
          "霍尔元件可以测量哪些物理量？",
        ],
        script: [
          "先选光敏电阻，调节光照观察分压输出。",
          "切换热敏电阻，讨论温控应用。",
          "切换霍尔元件，显示磁场到电压的转换。",
        ],
        controls: [
          segmented("sensorType", "传感器类型", "photo", [
            ["光敏", "photo"],
            ["热敏", "thermal"],
            ["霍尔", "hall"],
          ]),
          range("inputValue", "输入量", 0, 100, 1, 50, "%"),
          range("supply", "电源电压", 3, 12, 0.5, 5, "V"),
          toggle("showCurve", "显示特性曲线", true),
        ],
        stats: (v) => [`类型：${v.sensorType === "photo" ? "光敏" : v.sensorType === "thermal" ? "热敏" : "霍尔"}`, `输入=${v.inputValue.toFixed(0)}%`, `Uout≈${(sensorOutput(v) * v.supply).toFixed(2)}V`],
      },
      {
        id: "sensor-control",
        number: "5-3",
        unit: "第五章 传感器",
        title: "利用传感器制作简单的自动控制装置",
        focus: "用传感器、比较器和执行器组成闭环或开环自动控制",
        subtitle: "调节传感器输入与阈值，观察比较器输出如何控制灯、风扇或报警器。",
        caption: "传感器自动控制电路",
        sim: "sensorControl",
        formulas: ["输入信号 > 阈值 → 执行器动作", "比较器用于判断触发条件", "反馈可提高控制稳定性"],
        questions: [
          "为什么自动控制装置需要阈值判断？",
          "执行器由灯换成风扇，控制逻辑是否一定改变？",
          "加入反馈后系统会更稳定还是更灵敏？",
        ],
        script: [
          "把输入量调到阈值以下，观察执行器关闭。",
          "越过阈值，显示比较器翻转并驱动执行器。",
          "开启反馈，说明自动控制会影响被测环境。",
        ],
        controls: [
          range("sensorValue", "传感器信号", 0, 100, 1, 72, "%"),
          range("threshold", "动作阈值", 0, 100, 1, 60, "%"),
          segmented("actuator", "执行器", "fan", [
            ["风扇", "fan"],
            ["灯", "lamp"],
            ["报警器", "alarm"],
          ]),
          toggle("feedback", "显示反馈", true),
        ],
        stats: (v) => [`信号=${v.sensorValue.toFixed(0)}%`, `阈值=${v.threshold.toFixed(0)}%`, v.sensorValue >= v.threshold ? "执行器 ON" : "执行器 OFF"],
      },
    ],
  },
];

const selective3Chapters = [
  {
    id: "molecular-kinetic-theory",
    title: "第一章 分子动理论",
    sections: [
      {
        id: "molecular-theory-basic",
        number: "1-1",
        unit: "第一章 分子动理论",
        title: "分子动理论的基本内容",
        focus: "从分子热运动、分子间作用力和统计观点理解宏观热现象",
        subtitle: "用大量粒子在容器中无规则运动，展示温度越高分子平均动能越大、碰撞越频繁。",
        caption: "微观粒子热运动",
        sim: "molecularTheory",
        formulas: ["物体由大量分子组成", "分子永不停息地做无规则运动", "温度是分子平均动能的标志"],
        questions: [
          "温度升高时，每一个分子速度都一定增大吗？",
          "为什么需要用统计观点描述大量分子？",
          "扩散现象能说明分子的哪些特征？",
        ],
        script: [
          "先降低温度，观察粒子运动较慢。",
          "逐步升温，比较碰撞频率和平均速率。",
          "增加粒子数，说明宏观量来自大量微观粒子的统计结果。",
        ],
        controls: [
          range("temperature", "温度 T", 100, 900, 10, 420, "K"),
          range("particleCount", "分子数", 12, 80, 1, 42, "个"),
          range("volume", "容器体积", 0.55, 1.4, 0.05, 1, "倍"),
          toggle("showCollisions", "显示碰撞", true),
        ],
        stats: (v) => [`T=${v.temperature.toFixed(0)}K`, `N=${v.particleCount.toFixed(0)}`, `平均动能∝${(v.temperature / 300).toFixed(2)}`],
      },
      {
        id: "oil-film-experiment",
        number: "1-2",
        unit: "第一章 分子动理论",
        title: "实验：用油膜法估测油酸分子的大小",
        focus: "把油酸分子看作单分子层，用 d = V/S 估测分子直径",
        subtitle: "改变油酸溶液体积、浓度和油膜面积，实时计算单分子层厚度，理解数量级估算。",
        caption: "油膜法估测分子大小",
        sim: "oilFilmExperiment",
        formulas: ["油酸体积 V = 溶液体积 × 浓度", "单分子层模型：d = V/S", "结果通常为 10⁻¹⁰ m 数量级"],
        questions: [
          "为什么要把油酸铺成单分子层？",
          "浓度估计偏大时，分子直径计算值会怎样偏差？",
          "油膜面积测量误差对结果有什么影响？",
        ],
        script: [
          "先设定溶液体积和浓度，换算纯油酸体积。",
          "扩大油膜面积，观察分子直径估计值减小。",
          "打开计算步骤，强调模型假设和数量级。",
        ],
        controls: [
          range("dropVolume", "一滴溶液体积", 0.002, 0.02, 0.001, 0.008, "mL"),
          range("concentration", "油酸体积分数", 0.05, 1, 0.01, 0.25, "%"),
          range("filmArea", "油膜面积", 80, 800, 10, 360, "cm²"),
          toggle("showCalc", "显示计算步骤", true),
        ],
        stats: (v) => {
          const d = (v.dropVolume * v.concentration / 100) / v.filmArea;
          return [`V=${(v.dropVolume * v.concentration / 100).toExponential(1)}mL`, `S=${v.filmArea.toFixed(0)}cm²`, `d∝${d.toExponential(1)}`];
        },
      },
      {
        id: "speed-distribution",
        number: "1-3",
        unit: "第一章 分子动理论",
        title: "分子运动速率分布规律",
        focus: "用麦克斯韦速率分布理解“多数分子在某一速率附近”",
        subtitle: "改变温度和分子质量，观察速率分布峰值降低、曲线展宽或向高速方向移动。",
        caption: "分子速率分布曲线",
        sim: "speedDistribution",
        formulas: ["速率分布是统计规律", "温度越高，分布越宽，最概然速率越大", "同温下轻分子平均速率更大"],
        questions: [
          "升温后为什么不是所有分子都具有同一速率？",
          "曲线下方面积代表什么？",
          "同温下氢气和氧气哪个分子速率更大？",
        ],
        script: [
          "固定气体种类，升高温度观察曲线变宽右移。",
          "固定温度，改变分子质量比较峰值位置。",
          "打开最概然速率，说明统计曲线的读法。",
        ],
        controls: [
          range("temperature", "温度 T", 100, 1200, 10, 500, "K"),
          range("molecularMass", "分子质量", 2, 80, 1, 28, "相对"),
          toggle("showMostLikely", "显示最概然速率", true),
          toggle("showCompare", "显示低温对比", true),
        ],
        stats: (v) => [`T=${v.temperature.toFixed(0)}K`, `m=${v.molecularMass.toFixed(0)}`, `vp∝${Math.sqrt(v.temperature / v.molecularMass).toFixed(2)}`],
      },
      {
        id: "molecular-energy",
        number: "1-4",
        unit: "第一章 分子动理论",
        title: "分子动能和分子势能",
        focus: "分子平均动能由温度决定，分子势能与分子间距离有关",
        subtitle: "用分子间作用力曲线展示平衡距离附近势能最低，压缩或拉伸都会改变分子势能。",
        caption: "分子动能与势能",
        sim: "molecularEnergy",
        formulas: ["温度越高，分子平均动能越大", "分子势能由分子间相对位置决定", "内能 = 分子动能 + 分子势能"],
        questions: [
          "温度不变时，物体内能是否一定不变？",
          "分子间距离过小为什么表现为斥力？",
          "分子势能最低的位置有什么物理意义？",
        ],
        script: [
          "调节温度，观察动能条形图变化。",
          "改变分子间距离，观察势能曲线上的位置。",
          "打开作用力箭头，讨论引力、斥力和平衡距离。",
        ],
        controls: [
          range("temperature", "温度 T", 100, 900, 10, 360, "K"),
          range("distance", "分子间距离 r/r₀", 0.65, 2.4, 0.05, 1.15, ""),
          toggle("showForce", "显示分子力", true),
          toggle("showPotential", "显示势能曲线", true),
        ],
        stats: (v) => [`Ek∝${(v.temperature / 300).toFixed(2)}`, `r/r₀=${v.distance.toFixed(2)}`, `Ep∝${molecularPotential(v.distance).toFixed(2)}`],
      },
    ],
  },
  {
    id: "gas-solid-liquid",
    title: "第二章 气体、固体和液体",
    sections: [
      {
        id: "temperature-scale",
        number: "2-1",
        unit: "第二章 气体、固体和液体",
        title: "温度和温标",
        focus: "理解热平衡、温度计和摄氏温标与热力学温标的关系",
        subtitle: "把同一温度在摄氏温标、热力学温标和华氏温标之间转换，突出 T = t + 273.15。",
        caption: "温标转换与热平衡",
        sim: "temperatureScale",
        formulas: ["热平衡时温度相同", "T = t + 273.15", "温度计利用物质某些性质随温度变化的规律"],
        questions: [
          "两个物体达到热平衡后，哪些量一定相等？",
          "0℃ 对应多少 K？",
          "为什么热力学温标不能出现负值？",
        ],
        script: [
          "拖动摄氏温度，观察三种温标同步变化。",
          "把温度设为 0℃ 和 100℃，联系水的常用定标点。",
          "接近绝对零度，说明温标下限。",
        ],
        controls: [
          range("celsius", "摄氏温度 t", -120, 260, 1, 25, "℃"),
          segmented("focusScale", "重点温标", "kelvin", [
            ["K", "kelvin"],
            ["℃", "celsius"],
            ["℉", "fahrenheit"],
          ]),
          toggle("showThermometer", "显示温度计", true),
        ],
        stats: (v) => [`t=${v.celsius.toFixed(0)}℃`, `T=${(v.celsius + 273.15).toFixed(1)}K`, `F=${(v.celsius * 9 / 5 + 32).toFixed(0)}℉`],
      },
      {
        id: "isothermal-gas",
        number: "2-2",
        unit: "第二章 气体、固体和液体",
        title: "气体的等温变化",
        focus: "用 pV = C 描述一定质量理想气体的等温变化",
        subtitle: "推动活塞改变体积，在温度不变时观察压强与体积成反比，并生成 p-V 双曲线。",
        caption: "玻意耳定律 pV = C",
        sim: "isothermalGas",
        formulas: ["pV = C", "一定质量气体，温度不变", "p 与 V 成反比"],
        questions: [
          "体积压缩为一半时，压强怎样变化？",
          "为什么实验需要保持温度不变？",
          "p-V 图像为什么是双曲线？",
        ],
        script: [
          "固定温度，慢慢压缩气体。",
          "打开 p-V 曲线，读出若干点的 pV 乘积。",
          "改变温度，比较不同等温线位置。",
        ],
        controls: [
          range("volume", "体积 V", 0.5, 3, 0.05, 1.5, "L"),
          range("temperature", "温度 T", 250, 600, 10, 300, "K"),
          range("amount", "气体量 n", 0.5, 3, 0.1, 1, "单位"),
          toggle("showCurve", "显示 p-V 曲线", true),
        ],
        stats: (v) => {
          const p = v.amount * v.temperature / v.volume;
          return [`V=${v.volume.toFixed(2)}L`, `p∝${p.toFixed(1)}`, `pV∝${(p * v.volume).toFixed(1)}`];
        },
      },
      {
        id: "gas-laws",
        number: "2-3",
        unit: "第二章 气体、固体和液体",
        title: "气体的等压变化和等容变化",
        focus: "在 p 不变或 V 不变条件下建立 V/T、p/T 的正比关系",
        subtitle: "切换等压和等容过程，观察活塞或压力表随热力学温度的线性变化。",
        caption: "盖-吕萨克定律与查理定律",
        sim: "gasLaws",
        formulas: ["等压：V/T = C", "等容：p/T = C", "温度必须使用热力学温标"],
        questions: [
          "为什么不能直接用摄氏温度做正比关系？",
          "等压加热时活塞为什么上移？",
          "等容加热时压强为什么增大？",
        ],
        script: [
          "选择等压模式，升温观察体积线性增大。",
          "切换等容模式，观察压力表读数增大。",
          "把横轴改为热力学温度，强调比例关系。",
        ],
        controls: [
          segmented("mode", "变化过程", "isobaric", [
            ["等压", "isobaric"],
            ["等容", "isochoric"],
          ]),
          range("temperature", "温度 T", 200, 700, 10, 360, "K"),
          range("baseValue", "初始状态", 0.6, 2.5, 0.05, 1, "单位"),
          toggle("showGraph", "显示线性图像", true),
        ],
        stats: (v) => [`过程：${v.mode === "isobaric" ? "等压" : "等容"}`, `T=${v.temperature.toFixed(0)}K`, `比值≈${(v.baseValue / 300).toFixed(3)}`],
      },
      {
        id: "solid-crystal",
        number: "2-4",
        unit: "第二章 气体、固体和液体",
        title: "固体",
        focus: "比较晶体和非晶体，理解各向异性、固定熔点和微观结构",
        subtitle: "在晶格、缺陷和非晶态结构间切换，观察规则排列如何带来宏观性质差异。",
        caption: "晶体结构与固体性质",
        sim: "solidCrystal",
        formulas: ["晶体有规则空间点阵", "单晶体常表现各向异性", "非晶体没有固定熔点"],
        questions: [
          "晶体和非晶体的微观结构有什么差异？",
          "为什么单晶体可能各向异性？",
          "缺陷会怎样影响固体性质？",
        ],
        script: [
          "先显示规则晶格，说明晶体内部结构。",
          "提高缺陷比例，观察点阵被扰动。",
          "切换非晶态，比较是否存在长程有序。",
        ],
        controls: [
          segmented("solidType", "固体类型", "crystal", [
            ["晶体", "crystal"],
            ["非晶体", "amorphous"],
          ]),
          range("temperature", "温度", 0, 1, 0.02, 0.35, "相对"),
          range("defects", "缺陷比例", 0, 0.35, 0.01, 0.08, ""),
          toggle("showUnitCell", "显示晶胞", true),
        ],
        stats: (v) => [v.solidType === "crystal" ? "晶体" : "非晶体", `缺陷=${(v.defects * 100).toFixed(0)}%`, v.solidType === "crystal" ? "长程有序" : "无长程有序"],
      },
      {
        id: "liquid-surface",
        number: "2-5",
        unit: "第二章 气体、固体和液体",
        title: "液体",
        focus: "认识表面张力、浸润和毛细现象",
        subtitle: "调节表面张力、温度和毛细管半径，观察液面弯曲和毛细升降高度变化。",
        caption: "液体表面张力与毛细现象",
        sim: "liquidSurface",
        formulas: ["表面张力使液面趋于收缩", "毛细现象与浸润性和管径有关", "管越细，毛细升降越明显"],
        questions: [
          "为什么小液滴接近球形？",
          "毛细管越细，液面升高为什么越明显？",
          "温度升高通常会怎样影响表面张力？",
        ],
        script: [
          "先观察液滴形状，说明表面张力收缩液面。",
          "减小毛细管半径，观察液面高度变化。",
          "调节浸润性，比较上升和下降。",
        ],
        controls: [
          range("surfaceTension", "表面张力", 0.2, 1.5, 0.05, 0.9, "相对"),
          range("capillaryRadius", "毛细管半径", 0.4, 3, 0.05, 1.2, "相对"),
          segmented("wetting", "浸润性", "wet", [
            ["浸润", "wet"],
            ["不浸润", "nonwet"],
          ]),
          range("temperature", "温度", 0, 1, 0.02, 0.35, "相对"),
        ],
        stats: (v) => {
          const height = (v.wetting === "wet" ? 1 : -1) * v.surfaceTension * (1 - v.temperature * 0.35) / v.capillaryRadius;
          return [`σ相对=${v.surfaceTension.toFixed(2)}`, `r=${v.capillaryRadius.toFixed(2)}`, `h∝${height.toFixed(2)}`];
        },
      },
    ],
  },
  {
    id: "thermodynamics-laws",
    title: "第三章 热力学定律",
    sections: [
      {
        id: "work-heat-internal-energy",
        number: "3-1",
        unit: "第三章 热力学定律",
        title: "功、热和内能的改变",
        focus: "做功和热传递都是改变内能的方式",
        subtitle: "给气缸做功或加热气体，观察内能、温度和体积状态的变化方向。",
        caption: "内能改变的两种方式",
        sim: "workHeatInternal",
        formulas: ["做功可以改变内能", "热传递可以改变内能", "功和热量是过程量"],
        questions: [
          "摩擦生热主要属于哪种改变内能的方式？",
          "只知道初末状态，能否唯一确定热量和功？",
          "为什么功和热量不是状态量？",
        ],
        script: [
          "先关闭热源，只压缩气体观察温度上升。",
          "再固定活塞加热，比较热传递改变内能。",
          "同时调节功和热量，引出热力学第一定律。",
        ],
        controls: [
          range("work", "外界对系统做功 W", -120, 160, 5, 60, "J"),
          range("heat", "吸收热量 Q", -120, 180, 5, 80, "J"),
          range("initialEnergy", "初始内能", 100, 600, 10, 260, "J"),
          toggle("showPath", "显示过程路径", true),
        ],
        stats: (v) => [`W=${v.work.toFixed(0)}J`, `Q=${v.heat.toFixed(0)}J`, `ΔU=${(v.work + v.heat).toFixed(0)}J`],
      },
      {
        id: "first-law-thermo",
        number: "3-2",
        unit: "第三章 热力学定律",
        title: "热力学第一定律",
        focus: "用 ΔU = Q + W 描述热量、做功和内能变化",
        subtitle: "选择等容、等压或绝热过程，观察能量收支如何满足热力学第一定律。",
        caption: "热力学第一定律能量账本",
        sim: "firstLawThermo",
        formulas: ["ΔU = Q + W", "Q>0 表示系统吸热", "W>0 表示外界对系统做功"],
        questions: [
          "绝热压缩时 Q=0，内能如何变化？",
          "等容加热时系统是否对外做功？",
          "符号约定改变会怎样影响公式写法？",
        ],
        script: [
          "先选等容过程，令 W=0，观察 Q 全部改变内能。",
          "切换绝热压缩，令 Q=0，观察做功转化为内能。",
          "选择等压膨胀，比较吸热、对外做功和内能增加。",
        ],
        controls: [
          segmented("process", "过程", "isovolumic", [
            ["等容", "isovolumic"],
            ["等压", "isobaric"],
            ["绝热", "adiabatic"],
          ]),
          range("heat", "热量 Q", -120, 220, 5, 90, "J"),
          range("work", "外界做功 W", -160, 160, 5, -40, "J"),
          toggle("showLedger", "显示能量账本", true),
        ],
        stats: (v) => {
          const q = v.process === "adiabatic" ? 0 : v.heat;
          const w = v.process === "isovolumic" ? 0 : v.work;
          return [`Q=${q.toFixed(0)}J`, `W=${w.toFixed(0)}J`, `ΔU=${(q + w).toFixed(0)}J`];
        },
      },
      {
        id: "energy-conservation-law",
        number: "3-3",
        unit: "第三章 热力学定律",
        title: "能量守恒定律",
        focus: "能量可以转化和转移，总量保持不变",
        subtitle: "把燃料化学能分配为机械功、内能损失和声光等其他形式，观察能量流向但总量不变。",
        caption: "能量转化与转移",
        sim: "thermoEnergyConservation",
        formulas: ["能量既不会凭空产生，也不会凭空消失", "能量守恒贯穿各种转化过程", "效率 = 有用输出/输入能量"],
        questions: [
          "能量守恒是否意味着所有能量都能被有效利用？",
          "机器效率为什么不可能超过 100%？",
          "能量耗散和能量消失是一回事吗？",
        ],
        script: [
          "设定输入能量，拖动效率观察有用输出。",
          "打开损失通道，说明能量仍然存在但品质下降。",
          "联系热力学第二定律，为下一节铺垫。",
        ],
        controls: [
          range("inputEnergy", "输入能量", 100, 1000, 10, 520, "J"),
          range("efficiency", "有用效率", 5, 90, 1, 36, "%"),
          range("thermalLoss", "热损失占比", 5, 80, 1, 42, "%"),
          toggle("showSankey", "显示能流图", true),
        ],
        stats: (v) => [`输入=${v.inputEnergy.toFixed(0)}J`, `有用=${(v.inputEnergy * v.efficiency / 100).toFixed(0)}J`, `总量守恒`],
      },
      {
        id: "second-law-thermo",
        number: "3-4",
        unit: "第三章 热力学定律",
        title: "热力学第二定律",
        focus: "认识自然过程的方向性和热机效率限制",
        subtitle: "在热机和制冷机模式间切换，比较热量流动方向、外界做功和卡诺效率上限。",
        caption: "过程方向性与热机效率",
        sim: "secondLawThermo",
        formulas: ["热量不能自发地从低温物体传到高温物体", "不可能从单一热源吸热全部转化为功", "ηC = 1 - Tc/Th"],
        questions: [
          "为什么热机效率不可能达到 100%？",
          "制冷机为什么需要外界做功？",
          "能量守恒是否能单独决定过程方向？",
        ],
        script: [
          "选择热机，观察热源、冷源和输出功的关系。",
          "调节冷热源温度，读取卡诺效率上限。",
          "切换制冷机，强调逆向传热需要外界做功。",
        ],
        controls: [
          segmented("mode", "装置", "engine", [
            ["热机", "engine"],
            ["制冷机", "refrigerator"],
          ]),
          range("hotTemp", "高温热源 Th", 320, 900, 10, 620, "K"),
          range("coldTemp", "低温热源 Tc", 220, 500, 10, 300, "K"),
          toggle("showEntropy", "显示方向性", true),
        ],
        stats: (v) => [`Th=${v.hotTemp.toFixed(0)}K`, `Tc=${v.coldTemp.toFixed(0)}K`, `ηmax=${(Math.max(0, 1 - v.coldTemp / v.hotTemp) * 100).toFixed(1)}%`],
      },
    ],
  },
  {
    id: "atomic-structure-duality",
    title: "第四章 原子结构和波粒二象性",
    sections: [
      {
        id: "planck-radiation",
        number: "4-1",
        unit: "第四章 原子结构和波粒二象性",
        title: "普朗克黑体辐射理论",
        focus: "黑体辐射能量分布引出能量量子化假设",
        subtitle: "改变黑体温度，观察辐射曲线峰值向短波移动，比较经典理论与量子修正。",
        caption: "黑体辐射与能量量子",
        sim: "planckRadiation",
        formulas: ["E = hν", "温度越高，辐射总强度越大", "λmaxT ≈ 常量"],
        questions: [
          "黑体温度升高时峰值波长怎样变化？",
          "经典理论为什么会遇到紫外灾难？",
          "普朗克假设中的能量子是什么意思？",
        ],
        script: [
          "先显示较低温黑体辐射曲线。",
          "升高温度，观察峰值左移且面积增大。",
          "打开经典预测，说明量子理论的必要性。",
        ],
        controls: [
          range("temperature", "黑体温度", 1000, 8000, 100, 4500, "K"),
          range("wavelength", "观测波长", 100, 2000, 10, 620, "nm"),
          toggle("showClassical", "显示经典预测", true),
        ],
        stats: (v) => [`T=${v.temperature.toFixed(0)}K`, `λmax≈${(2900000 / v.temperature).toFixed(0)}nm`, `E=hν`],
      },
      {
        id: "photoelectric-effect",
        number: "4-2",
        unit: "第四章 原子结构和波粒二象性",
        title: "光电效应",
        focus: "用光子能量解释截止频率、遏止电压和光强影响",
        subtitle: "调节入射光频率、光强和金属逸出功，观察是否发生光电子发射以及最大初动能。",
        caption: "光电效应实验",
        sim: "photoelectricEffectS3",
        formulas: ["hν = W₀ + Ek", "ν < ν₀ 时不发生光电效应", "光强影响光电子数，不决定最大初动能"],
        questions: [
          "只增大光强能否让低频光打出电子？",
          "遏止电压对应光电子的哪个物理量？",
          "光电效应说明光具有什么性质？",
        ],
        script: [
          "先把频率调低于截止频率，观察无电子逸出。",
          "升高频率，显示电子发射和最大初动能。",
          "改变光强，比较电子数和最大初动能。",
        ],
        controls: [
          range("frequency", "入射光频率 ν", 2, 12, 0.1, 7, "相对"),
          range("intensity", "光强", 0, 100, 1, 55, "%"),
          range("workFunction", "逸出功 W₀", 1, 8, 0.1, 4, "相对"),
          range("voltage", "遏止电压", 0, 8, 0.1, 1.5, "V"),
        ],
        stats: (v) => {
          const ek = Math.max(0, v.frequency - v.workFunction);
          return [`ν=${v.frequency.toFixed(1)}`, `W₀=${v.workFunction.toFixed(1)}`, ek > 0 ? `Ek=${ek.toFixed(1)}` : "未逸出"];
        },
      },
      {
        id: "nuclear-atom-model",
        number: "4-3",
        unit: "第四章 原子结构和波粒二象性",
        title: "原子的核式结构模型",
        focus: "用 α 粒子散射实验理解原子中正电荷和质量集中在很小的原子核内",
        subtitle: "改变 α 粒子能量和瞄准距离，观察大角度散射只在接近原子核时发生。",
        caption: "α 粒子散射与核式结构",
        sim: "nuclearAtomModel",
        formulas: ["绝大多数 α 粒子几乎不偏转", "少数发生大角度偏转", "原子核很小且带正电"],
        questions: [
          "为什么大多数 α 粒子能穿过金箔？",
          "少数粒子大角度偏转说明了什么？",
          "汤姆孙模型为什么不能解释该实验？",
        ],
        script: [
          "先用较大瞄准距离，观察粒子几乎直行。",
          "减小瞄准距离，观察偏转角迅速增大。",
          "提高能量，说明高速粒子更不易被偏转。",
        ],
        controls: [
          range("energy", "α 粒子能量", 1, 10, 0.1, 5, "相对"),
          range("impact", "瞄准距离", 0.15, 1.2, 0.01, 0.42, "相对"),
          toggle("showTracks", "显示多条径迹", true),
        ],
        stats: (v) => [`能量=${v.energy.toFixed(1)}`, `b=${v.impact.toFixed(2)}`, `偏转∝${(1 / (v.energy * v.impact)).toFixed(2)}`],
      },
      {
        id: "hydrogen-bohr",
        number: "4-4",
        unit: "第四章 原子结构和波粒二象性",
        title: "氢原子光谱和玻尔的原子模型",
        focus: "定态跃迁解释氢原子分立光谱",
        subtitle: "选择电子从高能级跃迁到低能级，观察发射光子能量和谱线位置。",
        caption: "能级跃迁与氢光谱",
        sim: "hydrogenBohr",
        formulas: ["En = -13.6eV/n²", "hν = Em - En", "原子能级是分立的"],
        questions: [
          "为什么氢原子光谱不是连续谱？",
          "电子从高能级跃迁到低能级时发射还是吸收光子？",
          "能级差越大，发出光子的频率怎样变化？",
        ],
        script: [
          "显示氢原子能级图，选定初末能级。",
          "触发跃迁，显示光子和谱线。",
          "改变能级差，比较光子能量。",
        ],
        controls: [
          range("nHigh", "初始能级 n高", 2, 6, 1, 4, ""),
          range("nLow", "末能级 n低", 1, 5, 1, 2, ""),
          toggle("showSpectrum", "显示谱线", true),
        ],
        stats: (v) => {
          const high = Math.max(v.nHigh, v.nLow + 1);
          const low = Math.min(v.nLow, high - 1);
          const e = 13.6 * (1 / (low * low) - 1 / (high * high));
          return [`${high.toFixed(0)}→${low.toFixed(0)}`, `hν=${e.toFixed(2)}eV`, "分立谱线"];
        },
      },
      {
        id: "matter-wave",
        number: "4-5",
        unit: "第四章 原子结构和波粒二象性",
        title: "粒子的波动性和量子力学的建立",
        focus: "用德布罗意波长 λ = h/p 理解实物粒子的波动性",
        subtitle: "调节粒子质量、速度和狭缝间距，观察物质波波长与衍射可见性的关系。",
        caption: "德布罗意波与粒子衍射",
        sim: "matterWave",
        formulas: ["λ = h/p", "p = mv", "微观粒子具有波粒二象性"],
        questions: [
          "为什么宏观物体很难观察到明显物质波？",
          "速度增大时德布罗意波长怎样变化？",
          "电子衍射说明了什么？",
        ],
        script: [
          "先使用小质量粒子，观察明显衍射条纹。",
          "增大质量或速度，观察波长变短。",
          "改变狭缝间距，比较衍射可见性。",
        ],
        controls: [
          range("mass", "粒子质量", 0.2, 8, 0.1, 1.2, "相对"),
          range("speed", "速度", 0.5, 10, 0.1, 3, "相对"),
          range("slitSpacing", "晶格间距", 0.4, 4, 0.05, 1.4, "相对"),
          toggle("showDiffraction", "显示衍射条纹", true),
        ],
        stats: (v) => [`p∝${(v.mass * v.speed).toFixed(2)}`, `λ∝${(1 / (v.mass * v.speed)).toFixed(2)}`, `λ/d∝${(1 / (v.mass * v.speed * v.slitSpacing)).toFixed(2)}`],
      },
    ],
  },
  {
    id: "atomic-nucleus",
    title: "第五章 原子核",
    sections: [
      {
        id: "nucleus-composition",
        number: "5-1",
        unit: "第五章 原子核",
        title: "原子核的组成",
        focus: "用质子数、中子数和质量数描述原子核",
        subtitle: "调节质子数和中子数，观察核素符号、同位素关系和电荷数、质量数的对应。",
        caption: "质子、中子与核素符号",
        sim: "nucleusComposition",
        formulas: ["A = Z + N", "Z 决定元素种类", "同位素：Z 相同，N 不同"],
        questions: [
          "为什么质子数决定元素种类？",
          "同位素之间相同和不同的量分别是什么？",
          "质量数是否等于原子核真实质量？",
        ],
        script: [
          "先固定质子数，改变中子数，说明同位素。",
          "改变质子数，观察元素种类改变。",
          "打开核素符号，读出 A 和 Z 的位置。",
        ],
        controls: [
          range("protons", "质子数 Z", 1, 20, 1, 6, ""),
          range("neutrons", "中子数 N", 0, 26, 1, 6, ""),
          toggle("showSymbol", "显示核素符号", true),
        ],
        stats: (v) => [`Z=${v.protons.toFixed(0)}`, `N=${v.neutrons.toFixed(0)}`, `A=${(v.protons + v.neutrons).toFixed(0)}`],
      },
      {
        id: "radioactive-decay",
        number: "5-2",
        unit: "第五章 原子核",
        title: "放射性元素的衰变",
        focus: "半衰期描述大量原子核衰变的统计规律",
        subtitle: "改变半衰期、初始核数和经历时间，观察剩余核数指数衰减与随机性。",
        caption: "半衰期与指数衰减",
        sim: "radioactiveDecay",
        formulas: ["N = N₀(1/2)^(t/T)", "半衰期与外界物理化学状态无关", "衰变是统计规律"],
        questions: [
          "半衰期过后是否每个原子核都衰变了一半？",
          "温度升高能明显改变半衰期吗？",
          "为什么少量原子核的衰变具有随机性？",
        ],
        script: [
          "设置初始核数，拖动时间观察剩余比例。",
          "打开曲线，说明指数衰减。",
          "减少核数，观察随机起伏更明显。",
        ],
        controls: [
          range("initialN", "初始核数 N₀", 20, 220, 5, 120, "个"),
          range("halfLife", "半衰期 T", 1, 12, 0.5, 4, "单位"),
          range("elapsed", "经历时间 t", 0, 30, 0.5, 8, "单位"),
          toggle("showGraph", "显示衰变曲线", true),
        ],
        stats: (v) => {
          const left = v.initialN * 2 ** (-v.elapsed / v.halfLife);
          return [`N₀=${v.initialN.toFixed(0)}`, `t/T=${(v.elapsed / v.halfLife).toFixed(2)}`, `N≈${left.toFixed(0)}`];
        },
      },
      {
        id: "binding-energy",
        number: "5-3",
        unit: "第五章 原子核",
        title: "核力与结合能",
        focus: "质量亏损对应结合能，比结合能反映原子核稳定性",
        subtitle: "调节质量数和质子数，观察比结合能曲线在中等质量核附近达到较大值。",
        caption: "结合能与稳定性",
        sim: "bindingEnergy",
        formulas: ["ΔE = Δmc²", "结合能越大，核越稳定", "比结合能用于比较不同原子核稳定性"],
        questions: [
          "为什么原子核质量小于核子质量之和？",
          "比结合能大的原子核更稳定是什么意思？",
          "裂变和聚变为什么都可能释放能量？",
        ],
        script: [
          "显示比结合能随质量数变化的曲线。",
          "移动质量数，比较轻核、中等核和重核稳定性。",
          "联系裂变和聚变向更高比结合能方向转化。",
        ],
        controls: [
          range("massNumber", "质量数 A", 2, 240, 1, 56, ""),
          range("protonNumber", "质子数 Z", 1, 92, 1, 26, ""),
          range("massDefect", "质量亏损", 0.01, 1.8, 0.01, 0.45, "u"),
          toggle("showCurve", "显示比结合能曲线", true),
        ],
        stats: (v) => [`A=${v.massNumber.toFixed(0)}`, `E≈${(v.massDefect * 931.5).toFixed(0)}MeV`, `E/A≈${(v.massDefect * 931.5 / v.massNumber).toFixed(2)}MeV`],
      },
      {
        id: "fission-fusion",
        number: "5-4",
        unit: "第五章 原子核",
        title: "核裂变与核聚变",
        focus: "重核裂变和轻核聚变都可能释放核能",
        subtitle: "在裂变链式反应和聚变反应间切换，观察中子、能量释放和反应条件。",
        caption: "裂变、聚变与核能释放",
        sim: "fissionFusion",
        formulas: ["裂变：重核分裂为中等质量核", "聚变：轻核结合为较重核", "释放能量来自质量亏损"],
        questions: [
          "链式反应为什么需要控制中子数？",
          "聚变为什么需要极高温高压条件？",
          "裂变和聚变释放能量的共同原因是什么？",
        ],
        script: [
          "选择裂变模式，加入中子触发链式反应。",
          "调节中子倍增系数，观察可控与失控差别。",
          "切换聚变模式，说明克服库仑斥力需要高温。",
        ],
        controls: [
          segmented("reaction", "反应类型", "fission", [
            ["裂变", "fission"],
            ["聚变", "fusion"],
          ]),
          range("neutronFactor", "中子倍增/温度", 0.4, 3.2, 0.05, 1.4, "相对"),
          range("massDefect", "质量亏损", 0.01, 0.4, 0.01, 0.08, "u"),
          toggle("showChain", "显示反应链", true),
        ],
        stats: (v) => [`类型：${v.reaction === "fission" ? "裂变" : "聚变"}`, `释放≈${(v.massDefect * 931.5).toFixed(1)}MeV`, v.reaction === "fission" ? `k=${v.neutronFactor.toFixed(2)}` : `T相对=${v.neutronFactor.toFixed(2)}`],
      },
      {
        id: "elementary-particles",
        number: "5-5",
        unit: "第五章 原子核",
        title: "“基本”粒子",
        focus: "认识粒子分类、相互作用和人类对微观结构的持续探索",
        subtitle: "在轻子、夸克和强子分类间切换，用能量尺度展示粒子探测和标准模型的基本图景。",
        caption: "粒子分类与标准模型图景",
        sim: "elementaryParticles",
        formulas: ["粒子可分为轻子、夸克和由夸克组成的强子", "高能碰撞可探测更小尺度结构", "标准模型仍在发展"],
        questions: [
          "为什么“基本”要加引号？",
          "质子和中子是否还是不可分割的基本粒子？",
          "提高碰撞能量为什么能探测更小尺度？",
        ],
        script: [
          "先从电子、质子、中子的传统图像说起。",
          "切换夸克分类，说明质子和中子由夸克组成。",
          "提高能量尺度，联系现代粒子物理实验。",
        ],
        controls: [
          segmented("category", "粒子类别", "quark", [
            ["夸克", "quark"],
            ["轻子", "lepton"],
            ["强子", "hadron"],
          ]),
          range("energy", "探测能量", 1, 100, 1, 35, "GeV"),
          toggle("showForces", "显示相互作用", true),
        ],
        stats: (v) => [`类别：${v.category === "quark" ? "夸克" : v.category === "lepton" ? "轻子" : "强子"}`, `能量=${v.energy.toFixed(0)}GeV`, `尺度∝${(1 / v.energy).toFixed(3)}`],
      },
    ],
  },
];

const mechanicsWorkshopChapters = [
  {
    id: "mechanics-theme-lab",
    title: "专题增强素材库",
    sections: [
      {
        id: "force-composition-studio",
        number: "M-1",
        unit: "专题增强素材库",
        title: "力的合成、分解与平衡专题",
        focus: "把双力合成、正交分解、三力平衡和绳结模型放在同一个专题中切换",
        subtitle: "同一画布中切换四类常用力学模型，帮助教师快速从几何矢量过渡到受力平衡方程。",
        caption: "多模型力矢量工作台",
        sim: "forceCompositionStudio",
        formulas: ["平行四边形法则", "Fx = Fcosθ，Fy = Fsinθ", "平衡条件：ΣF = 0"],
        questions: [
          "合力与两个分力的共同作用效果有什么关系？",
          "正交分解时，坐标轴为什么可以按问题方便来选？",
          "三力平衡时，力三角形为什么必须闭合？",
        ],
        script: [
          "先用双力合成读出合力大小与方向。",
          "切换正交分解，强调分力不是新的力。",
          "切换绳结或三力平衡，让学生先预测第三个力。",
        ],
        controls: [
          segmented("model", "专题模型", "combine", [
            ["双力合成", "combine"],
            ["正交分解", "decompose"],
            ["三力平衡", "balance"],
            ["绳结平衡", "rope"],
          ]),
          range("f1", "F₁ / F", 10, 140, 2, 78, "N"),
          range("f2", "F₂", 10, 140, 2, 56, "N"),
          range("angle", "夹角 θ", 0, 170, 2, 64, "°"),
          range("load", "悬挂重物", 20, 160, 2, 80, "N"),
          toggle("showTriangle", "显示几何辅助", true),
        ],
        stats: (v) => {
          if (v.model === "decompose") return [`F=${v.f1.toFixed(0)}N`, `Fx=${(v.f1 * Math.cos(toRad(v.angle))).toFixed(1)}N`, `Fy=${(v.f1 * Math.sin(toRad(v.angle))).toFixed(1)}N`];
          if (v.model === "rope") {
            const theta = clamp(v.angle, 12, 78);
            return [`G=${v.load.toFixed(0)}N`, `θ=${theta.toFixed(0)}°`, `T≈${(v.load / Math.max(0.2, 2 * Math.sin(toRad(theta)))).toFixed(1)}N`];
          }
          const r = resultant(v.f1, 0, v.f2, -toRad(v.angle));
          return [`|F合|=${r.mag.toFixed(1)}N`, `ΣFx=${r.x.toFixed(1)}N`, `ΣFy=${(-r.y).toFixed(1)}N`];
        },
      },
      {
        id: "momentum-workshop",
        number: "M-2",
        unit: "专题增强素材库",
        title: "动量守恒模型组",
        focus: "在一维碰撞、二维碰撞、爆炸、火箭、人船、弹簧、动飞摆、凹槽和斜面模型间切换",
        subtitle: "把动量守恒的常见题型做成一个模型组，比较系统内力、外力、质心运动、矢量分解和能量损失。",
        caption: "动量守恒多模型实验",
        sim: "momentumWorkshop",
        formulas: ["系统外力为零或可忽略：Σp 守恒", "二维问题：px、py 分别守恒", "质心速度由系统总动量决定"],
        questions: [
          "什么时候可以把两个物体看成一个系统？",
          "动量守恒是否意味着动能也守恒？",
          "火箭模型中的“系统”应怎样选取？",
        ],
        script: [
          "先选一维碰撞，比较碰前和碰后的总动量。",
          "切换爆炸或弹簧小球，强调内力不能改变系统总动量。",
          "打开质心，观察质心匀速运动或保持静止。",
        ],
        controls: [
          segmented("model", "专题模型", "collision", [
            ["一维碰撞", "collision"],
            ["二维碰撞", "collision2d"],
            ["爆炸", "explosion"],
            ["火箭", "rocket"],
            ["人船", "boat"],
            ["弹簧小球", "spring"],
            ["动飞摆", "pendulum"],
            ["小球凹槽", "groove"],
            ["小球斜面", "ballSlope"],
          ]),
          range("m1", "质量 m₁", 0.5, 8, 0.1, 2.5, "kg"),
          range("m2", "质量 m₂", 0.5, 8, 0.1, 3.5, "kg"),
          range("v1", "初速度 v₁", -8, 8, 0.2, 4, "m/s"),
          range("v2", "初速度 v₂", -8, 8, 0.2, -1, "m/s"),
          range("elasticity", "恢复系数 e", 0, 1, 0.02, 0.78, ""),
          range("angle2d", "二维/斜面角 θ", 0, 70, 1, 28, "°"),
          range("fragments", "碎片/轨迹数", 3, 8, 1, 5, "个"),
          toggle("showCenterMass", "显示质心", true),
        ],
        stats: (v) => {
          const p = v.m1 * v.v1 + v.m2 * v.v2;
          return [`p总=${p.toFixed(1)}`, `v质心=${(p / (v.m1 + v.m2)).toFixed(2)}`, `模型：${momentumModelLabel(v.model)}`];
        },
      },
      {
        id: "incline-workshop",
        number: "M-3",
        unit: "专题增强素材库",
        title: "斜面运动专题",
        focus: "同一斜面中切换运动实景、受力分析和能量视角",
        subtitle: "把斜面上物块的运动、受力图和能量转化合并到一个专题，避免学生把三种视角割裂。",
        caption: "斜面运动三视图",
        sim: "inclineWorkshop",
        formulas: ["沿斜面：mg sinθ - f = ma", "N = mg cosθ", "能量视角：mgh → Ek + 内能"],
        questions: [
          "斜面题为什么常把坐标轴沿斜面建立？",
          "同一个过程用能量法和动力学法各有什么优势？",
          "摩擦因数增大后，最终速度和加速度分别怎样变化？",
        ],
        script: [
          "先播放运动实景，读出加速度方向。",
          "切换受力图，从质心画出所有力。",
          "切换能量视角，比较重力势能、动能和摩擦耗散。",
        ],
        controls: [
          segmented("view", "专题视图", "motion", [
            ["运动", "motion"],
            ["受力", "fbd"],
            ["能量", "energy"],
          ]),
          range("mass", "质量 m", 0.5, 8, 0.1, 2.5, "kg"),
          range("angle", "斜面角 θ", 5, 60, 1, 32, "°"),
          range("mu", "摩擦因数 μ", 0, 0.8, 0.02, 0.18, ""),
          range("height", "斜面高度 h", 0.5, 6, 0.1, 2.4, "m"),
          toggle("showComponents", "显示分力", true),
        ],
        stats: (v) => {
          const a = inclineAcceleration(v);
          const loss = v.mass * G * v.height * v.mu / Math.max(0.2, Math.tan(toRad(v.angle)));
          return [`a=${a.toFixed(2)}m/s²`, `Ep=${(v.mass * G * v.height).toFixed(1)}J`, `耗散≈${Math.max(0, loss).toFixed(1)}J`];
        },
      },
      {
        id: "energy-workshop",
        number: "M-4",
        unit: "专题增强素材库",
        title: "机械能守恒与耗散专题",
        focus: "比较过山车、单摆、自由落体和弹簧发射中的能量转化",
        subtitle: "同一套能量条形图配合多种情境，让学生看到守恒与耗散不是公式，而是能量流向。",
        caption: "机械能多情境能流图",
        sim: "energyWorkshop",
        formulas: ["无非保守力做功：机械能守恒", "有阻力：机械能转化为内能", "E = Ek + Ep + E弹"],
        questions: [
          "同一高度释放，不同路径末速是否一定相同？",
          "有摩擦时机械能减少到了哪里？",
          "弹簧势能如何转化为物体动能？",
        ],
        script: [
          "选择过山车，观察高度与速度的对应关系。",
          "加入损耗，比较总机械能和内能。",
          "切换弹簧发射，说明弹性势能进入能量账本。",
        ],
        controls: [
          segmented("scene", "情境", "roller", [
            ["过山车", "roller"],
            ["单摆", "pendulum"],
            ["自由落体", "freefall"],
            ["弹簧发射", "spring"],
          ]),
          range("mass", "质量 m", 0.5, 8, 0.1, 2, "kg"),
          range("height", "初始高度 h", 0.5, 8, 0.1, 3.2, "m"),
          range("springK", "弹簧劲度 k", 20, 180, 2, 70, "N/m"),
          range("loss", "能量损耗", 0, 0.45, 0.01, 0.08, ""),
          toggle("showBars", "显示能量条", true),
        ],
        stats: (v) => {
          const ep = v.mass * G * v.height;
          return [`Ep=${ep.toFixed(1)}J`, `损耗=${(v.loss * 100).toFixed(0)}%`, `可用≈${(ep * (1 - v.loss)).toFixed(1)}J`];
        },
      },
      {
        id: "newton-cradle",
        number: "M-5",
        unit: "专题增强素材库",
        title: "牛顿摆专题",
        focus: "用近似弹性碰撞展示动量和机械能共同约束结果",
        subtitle: "调节撞入球数量、初始角度和耗散，观察为什么常见结果是同样数量的小球弹出。",
        caption: "牛顿摆与弹性碰撞",
        sim: "newtonCradle",
        formulas: ["弹性碰撞近似守恒动量和机械能", "碰撞冲量在小球间传递", "耗散会使摆动逐渐衰减"],
        questions: [
          "为什么一个球撞入时，通常一个球弹出？",
          "只用动量守恒能否唯一确定碰后结果？",
          "耗散增大后，摆动为什么会逐渐停下？",
        ],
        script: [
          "先设置 1 个撞入球，观察右侧 1 个球弹出。",
          "增加撞入球数量，比较输出球数量。",
          "提高耗散，观察振幅衰减。",
        ],
        controls: [
          range("balls", "小球数", 3, 7, 1, 5, "个"),
          range("activeBalls", "撞入小球数", 1, 3, 1, 1, "个"),
          range("angle", "初始角度", 8, 55, 1, 32, "°"),
          range("damping", "耗散", 0, 0.12, 0.01, 0.02, ""),
          toggle("showImpulse", "显示冲量传递", true),
        ],
        stats: (v) => [`球数=${v.balls.toFixed(0)}`, `撞入=${Math.min(v.activeBalls, v.balls - 1).toFixed(0)}`, `耗散=${(v.damping * 100).toFixed(0)}%`],
      },
      {
        id: "orbit-workshop",
        number: "M-6",
        unit: "专题增强素材库",
        title: "万有引力与轨道专题",
        focus: "比较圆轨道、椭圆轨道、逃逸和双星模型",
        subtitle: "调节中心质量、初速度和轨道半径，观察引力提供向心力以及轨道形态变化。",
        caption: "轨道形态与引力能量",
        sim: "orbitWorkshop",
        formulas: ["F = GMm/r²", "圆轨道：v = √(GM/r)", "逃逸速度：vesc = √(2GM/r)"],
        questions: [
          "速度低于圆轨道速度时会发生什么？",
          "为什么逃逸速度比圆轨道速度大 √2 倍？",
          "双星系统绕什么点运动？",
        ],
        script: [
          "先选择圆轨道，调出 v≈√(GM/r)。",
          "提高速度，观察椭圆变大直到逃逸。",
          "切换双星，强调共同质心。",
        ],
        controls: [
          segmented("orbitMode", "轨道模型", "ellipse", [
            ["椭圆/圆", "ellipse"],
            ["逃逸", "escape"],
            ["转移轨道", "transfer"],
            ["双星", "binary"],
          ]),
          range("centralMass", "中心质量 M", 1, 12, 0.2, 5, "相对"),
          range("radius", "初始半径 r", 80, 240, 5, 150, "px"),
          range("speed", "初速度 v", 0.3, 2.2, 0.02, 1, "圆轨道倍数"),
          toggle("showEnergy", "显示能量线", true),
        ],
        stats: (v) => [`v/v圆=${v.speed.toFixed(2)}`, `v逃/v圆=1.41`, v.speed >= Math.SQRT2 ? "可逃逸" : "有界轨道"],
      },
    ],
  },
];

function getWorkshopSection(sectionId, unit, number = "专题") {
  const section = mechanicsWorkshopChapters[0].sections.find((item) => item.id === sectionId);
  return {
    ...section,
    unit,
    number,
    focus: `专题增强：${section.focus}`,
  };
}

function appendWorkshopSection(chapterList, chapterId, sectionId, number = "专题") {
  const chapter = chapterList.find((item) => item.id === chapterId);
  if (!chapter) return;
  chapter.sections.push(getWorkshopSection(sectionId, chapter.title, number));
}

appendWorkshopSection(chapters, "interaction-force", "force-composition-studio", "3-Z1");
appendWorkshopSection(chapters, "force-motion", "incline-workshop", "4-Z1");
appendWorkshopSection(required2Chapters, "gravitation-spaceflight", "orbit-workshop", "7-Z1");
appendWorkshopSection(required2Chapters, "mechanical-energy", "energy-workshop", "8-Z1");
appendWorkshopSection(selective1Chapters, "momentum-conservation", "momentum-workshop", "1-Z1");
appendWorkshopSection(selective1Chapters, "momentum-conservation", "newton-cradle", "1-Z2");

const books = [
  {
    id: "required1",
    title: "必修第一册",
    shortTitle: "必修一",
    meta: "4 章",
    chapters,
  },
  {
    id: "required2",
    title: "必修第二册",
    shortTitle: "必修二",
    meta: "4 章",
    chapters: required2Chapters,
  },
  {
    id: "required3",
    title: "必修第三册",
    shortTitle: "必修三",
    meta: "5 章",
    chapters: required3Chapters,
  },
  {
    id: "selective1",
    title: "选择性必修第一册",
    shortTitle: "选必一",
    meta: "4 章",
    chapters: selective1Chapters,
  },
  {
    id: "selective2",
    title: "选择性必修第二册",
    shortTitle: "选必二",
    meta: "5 章",
    chapters: selective2Chapters,
  },
  {
    id: "selective3",
    title: "选择性必修第三册",
    shortTitle: "选必三",
    meta: "5 章",
    chapters: selective3Chapters,
  },
];

let activeBookId = "required1";
let activeBook = books.find((book) => book.id === activeBookId);
let modules = activeBook.chapters.flatMap((chapter) =>
  chapter.sections.map((section) => ({ ...section, chapterTitle: chapter.title, bookId: activeBook.id })),
);

const canvas = document.querySelector("#waveCanvas");
const ctx = canvas.getContext("2d");
const lessonNav = document.querySelector("#lessonNav");
const brandTitle = document.querySelector(".brand-block h1");
const metaPills = document.querySelectorAll(".chapter-meta span");
const lessonUnit = document.querySelector("#lessonUnit");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonSubtitle = document.querySelector("#lessonSubtitle");
const topicRail = document.querySelector("#topicRail");
const stageCaption = document.querySelector("#stageCaption");
const quickStats = document.querySelector("#quickStats");
const controlGroups = document.querySelector("#controlGroups");
const readout = document.querySelector("#readout");
const questionList = document.querySelector("#questionList");
const formulaBox = document.querySelector("#formulaBox");
const scriptList = document.querySelector("#scriptList");
const restartDemo = document.querySelector("#restartDemo");
const speedRange = document.querySelector("#speedRange");
const playControls = document.querySelector(".play-controls");
const speedControl = document.querySelector(".speed-control");

const playbackSims = new Set([
  "frames",
  "displacement",
  "velocity",
  "acceleration",
  "vtRelation",
  "stRelation",
  "freeFall",
  "friction",
  "actionReaction",
  "inertia",
  "fmaExperiment",
  "newtonSecond",
  "applications",
  "elevator",
  "curvedMotion",
  "motionComposition",
  "circularMotion",
  "centripetalForce",
  "centripetalAccel",
  "lifeCircular",
  "planetLaws",
  "gravityAchievements",
  "workPower",
  "kineticTheorem",
  "energyConservation",
  "energyExperiment",
  "electrostaticUse",
  "particleElectricField",
  "emInduction",
  "emWave",
  "quantization",
  "momentumBasic",
  "momentumConservation",
  "collisionTypes",
  "recoilRocket",
  "simpleHarmonic",
  "shmDescription",
  "shmEnergy",
  "pendulum",
  "forcedResonance",
  "waveInterferenceSelective",
  "dopplerEffect",
  "lorentzForce",
  "chargedParticleMagnetic",
  "acceleratorSpectrometer",
  "eddyCurrent",
  "alternatingCurrent",
  "acDescription",
  "powerTransmission",
  "lcOscillation",
  "emFieldWave",
  "radioTransmitReceive",
  "sensorControl",
  "molecularTheory",
  "isothermalGas",
  "liquidSurface",
  "photoelectricEffectS3",
  "hydrogenBohr",
  "matterWave",
  "elementaryParticles",
  "momentumWorkshop",
  "inclineWorkshop",
  "energyWorkshop",
  "newtonCradle",
  "orbitWorkshop",
]);

const valuesByModule = Object.fromEntries(
  books.flatMap((book) =>
    book.chapters.flatMap((chapter) =>
      chapter.sections.map((module) => [
        module.id,
        Object.fromEntries(module.controls.map((control) => [control.key, control.value])),
      ]),
    ),
  ),
);

const state = {
  activeId: modules[0].id,
  playing: false,
  time: 0,
  lastFrame: performance.now(),
  speed: Number(speedRange.value),
  width: 0,
  height: 0,
};

function range(key, label, min, max, step, value, unit, hint = "") {
  return { type: "range", key, label, min, max, step, value, unit, hint };
}

function toggle(key, label, value) {
  return { type: "toggle", key, label, value };
}

function segmented(key, label, value, options) {
  return { type: "segmented", key, label, value, options: options.map(([labelText, optionValue]) => ({ label: labelText, value: optionValue })) };
}

const bookSwitcher = document.createElement("div");
bookSwitcher.className = "segmented book-switcher";
bookSwitcher.setAttribute("role", "group");
bookSwitcher.setAttribute("aria-label", "教材册选择");
lessonNav.before(bookSwitcher);

function refreshBookModules() {
  activeBook = books.find((book) => book.id === activeBookId) || books[0];
  modules = activeBook.chapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({ ...section, chapterTitle: chapter.title, bookId: activeBook.id })),
  );
  if (!modules.some((module) => module.id === state.activeId)) {
    state.activeId = modules[0].id;
  }
}

function renderBookSwitcher() {
  bookSwitcher.innerHTML = books
    .map(
      (book) => `
        <button class="segment-button ${book.id === activeBookId ? "active" : ""}" type="button" data-book="${book.id}">
          ${book.shortTitle}
        </button>
      `,
    )
    .join("");
}

function getActiveModule() {
  return modules.find((module) => module.id === state.activeId) || modules[0];
}

function getActiveChapter() {
  const active = getActiveModule();
  return activeBook.chapters.find((chapter) => chapter.sections.some((section) => section.id === active.id)) || activeBook.chapters[0];
}

function getValues() {
  return valuesByModule[state.activeId];
}

function isPlaybackRelevant(module = getActiveModule(), values = getValues()) {
  if (!module) return false;
  if (module.sim === "friction") {
    const fMax = values.muStatic * values.normal;
    return values.frictionScene === "horizontal" && values.push > fMax;
  }
  return playbackSims.has(module.sim);
}

function renderNav() {
  brandTitle.textContent = activeBook.title;
  if (metaPills[2]) metaPills[2].textContent = `${activeBook.chapters.length} 章`;
  const activeChapter = getActiveChapter();
  lessonNav.innerHTML = activeBook.chapters
    .map(
      (chapter) => `
        <button class="lesson-button ${chapter.id === activeChapter.id ? "active" : ""}" type="button" data-chapter="${chapter.id}">
          <span class="lesson-index">${chapter.sections.length}</span>
          <span>
            <span class="lesson-name">${chapter.title}</span>
            <span class="lesson-focus">${chapter.sections.length} 个章内演示主题</span>
          </span>
        </button>
      `,
    )
    .join("");
}

function renderLessonMeta() {
  const module = getActiveModule();
  const chapter = getActiveChapter();
  lessonUnit.textContent = activeBook.title;
  lessonTitle.textContent = chapter.title;
  lessonSubtitle.textContent = `当前演示：${module.title}。${module.subtitle}`;
  stageCaption.textContent = module.caption;
  questionList.innerHTML = module.questions.map((question) => `<li>${question}</li>`).join("");
  formulaBox.innerHTML = module.formulas.map((formula) => `<div class="formula-line">${formula}</div>`).join("");
  scriptList.innerHTML = module.script.map((step) => `<li>${step}</li>`).join("");
  renderTopicRail();
  updateQuickStats();
}

function renderTopicRail() {
  const activeChapter = getActiveChapter();
  const module = getActiveModule();
  topicRail.innerHTML = `
    <div class="topic-rail-heading">
      <p class="eyebrow">本章演示主题</p>
      <strong>${module.title}</strong>
    </div>
    <div class="topic-list" role="group" aria-label="本章演示主题">
      ${activeChapter.sections
        .map(
          (section) => `
            <button class="topic-pill ${section.id === module.id ? "active" : ""}" type="button" data-topic="${section.id}">
              <span>${section.title}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderControls() {
  const values = getValues();
  const module = getActiveModule();
  controlGroups.innerHTML = module
    .controls.map((control) => {
      if (control.type === "range") {
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
  syncPlaybackControls();
}

function formatValue(control, values = getValues()) {
  const value = values[control.key];
  if (control.type === "toggle") return value ? "开" : "关";
  if (control.type === "segmented") {
    return control.options.find((option) => option.value === value)?.label || value;
  }
  const numeric = Math.abs(value) >= 10 || Number.isInteger(value) ? String(Number(value.toFixed(2))) : value.toFixed(2);
  return `${numeric}${control.unit ? ` ${control.unit}` : ""}`;
}

function refreshControlOutputs() {
  const values = getValues();
  getActiveModule().controls.forEach((control) => {
    const output = document.querySelector(`[data-output-for="${control.key}"]`);
    if (output) output.textContent = formatValue(control, values);
    const input = document.querySelector(`[data-control="${control.key}"]`);
    if (input) input.value = values[control.key];
  });
  updateQuickStats();
  syncPlaybackControls();
}

function setRangeValueFromCanvas(key, rawValue) {
  const module = getActiveModule();
  const control = module.controls.find((item) => item.type === "range" && item.key === key);
  if (!control) return false;
  const clamped = clamp(rawValue, control.min, control.max);
  const stepped = control.min + Math.round((clamped - control.min) / control.step) * control.step;
  getValues()[key] = Number(stepped.toFixed(4));
  refreshControlOutputs();
  drawFrame();
  return true;
}

function handleCanvasInteraction(event) {
  const rect = canvas.getBoundingClientRect();
  const x = clamp(event.clientX - rect.left, 0, rect.width);
  const y = clamp(event.clientY - rect.top, 0, rect.height);
  const xr = rect.width ? x / rect.width : 0.5;
  const yr = rect.height ? y / rect.height : 0.5;
  const module = getActiveModule();
  const sim = module.sim;

  if (sim === "gravityElastic") {
    setRangeValueFromCanvas("mass", 0.2 + xr * 4.8);
    return;
  }
  if (sim === "friction") {
    setRangeValueFromCanvas("push", xr * 80);
    return;
  }
  if (sim === "actionReaction") {
    setRangeValueFromCanvas("force", 20 + xr * 140);
    return;
  }
  if (sim === "forceVector" || sim === "equilibrium" || sim === "forceCompositionStudio") {
    setRangeValueFromCanvas("angle", 180 - yr * 180);
    return;
  }
  if (sim === "applications" || sim === "inclineWorkshop") {
    setRangeValueFromCanvas("angle", 5 + (1 - yr) * 55);
    return;
  }
  if (module.controls.some((control) => control.key === "speed" && control.type === "range")) {
    setRangeValueFromCanvas("speed", xr * 2.2);
    return;
  }
  if (module.controls.some((control) => control.key === "angle" && control.type === "range")) {
    setRangeValueFromCanvas("angle", 180 - yr * 180);
    return;
  }
  if (module.controls.some((control) => control.key === "mass" && control.type === "range")) {
    setRangeValueFromCanvas("mass", 0.5 + xr * 7.5);
  }
}

function updateQuickStats() {
  const module = getActiveModule();
  const stats = module.stats ? module.stats(getValues()) : [];
  quickStats.innerHTML = stats.map((stat) => `<span>${stat}</span>`).join("");
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

function drawGrid(x, y, w, h, gap) {
  ctx.save();
  ctx.strokeStyle = palette.grid;
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

function label(text, x, y, color = palette.ink, align = "left", size = 13) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `800 ${size}px system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function arrow(x1, y1, x2, y2, color = palette.ink, width = 2) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(angle - Math.PI / 6), y2 - size * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - size * Math.cos(angle + Math.PI / 6), y2 - size * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function vector(origin, vx, vy, color, text) {
  arrow(origin.x, origin.y, origin.x + vx, origin.y + vy, color, 2.5);
  if (text) label(text, origin.x + vx + 8, origin.y + vy, color);
}

function roundRect(x, y, w, h, r, fill, stroke = palette.line) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
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

function plotFrame(x, y, w, h, title, xLabel = "t", yLabel = "") {
  roundRect(x, y, w, h, 8, "rgba(255,255,255,0.82)", palette.line);
  ctx.save();
  ctx.strokeStyle = "#bfccd8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 34, y + h - 34);
  ctx.lineTo(x + w - 18, y + h - 34);
  ctx.moveTo(x + 34, y + h - 34);
  ctx.lineTo(x + 34, y + 22);
  ctx.stroke();
  ctx.restore();
  arrow(x + w - 28, y + h - 34, x + w - 18, y + h - 34, "#8b98a5", 1.5);
  arrow(x + 34, y + 32, x + 34, y + 22, "#8b98a5", 1.5);
  label(title, x + 14, y + 18, palette.ink);
  label(xLabel, x + w - 24, y + h - 16, palette.muted, "right", 12);
  if (yLabel) label(yLabel, x + 12, y + 34, palette.muted, "left", 12);
  return { x0: x + 34, y0: y + h - 34, w: w - 56, h: h - 62 };
}

function plotCurve(frame, points, color = palette.blue, width = 3) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  points.forEach((point, i) => {
    if (i === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  ctx.restore();
}

function drawGround(y) {
  ctx.save();
  ctx.strokeStyle = "#8592a0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(36, y);
  ctx.lineTo(state.width - 36, y);
  ctx.stroke();
  for (let x = 44; x < state.width - 36; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 8, y + 10);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCar(x, y, color, name) {
  roundRect(x - 34, y - 22, 68, 28, 7, color, palette.ink);
  ctx.fillStyle = "#dff6ff";
  ctx.fillRect(x - 18, y - 18, 20, 10);
  ctx.fillStyle = palette.ink;
  ctx.beginPath();
  ctx.arc(x - 20, y + 8, 7, 0, TAU);
  ctx.arc(x + 22, y + 8, 7, 0, TAU);
  ctx.fill();
  label(name, x, y - 38, color, "center");
}

function drawBlock(x, y, w, h, color = palette.amber) {
  roundRect(x - w / 2, y - h, w, h, 6, color, palette.ink);
}

function blockCenter(x, y, h) {
  return { x, y: y - h / 2 };
}

function rotatedPoint(x, y, localX, localY, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: x + localX * c - localY * s,
    y: y + localX * s + localY * c,
  };
}

function drawSpring(x, y1, y2, coils = 9, amp = 18) {
  ctx.save();
  ctx.strokeStyle = palette.teal;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y1);
  const length = y2 - y1;
  const steps = coils * 2;
  for (let i = 1; i <= steps; i += 1) {
    const y = y1 + (length * i) / steps;
    const offset = i % 2 === 0 ? -amp : amp;
    ctx.lineTo(x + offset, y);
  }
  ctx.lineTo(x, y2);
  ctx.stroke();
  ctx.restore();
}

function drawHorizontalSpring(x1, y, x2, coils = 9, amp = 14) {
  ctx.save();
  ctx.strokeStyle = palette.teal;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  const length = x2 - x1;
  const steps = coils * 2;
  for (let i = 1; i <= steps; i += 1) {
    const x = x1 + (length * i) / steps;
    const offset = i % 2 === 0 ? -amp : amp;
    ctx.lineTo(x, y + offset);
  }
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.restore();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function wrap(value, max) {
  return ((value % max) + max) % max;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function resultant(f1, a1, f2, a2) {
  const x = f1 * Math.cos(a1) + f2 * Math.cos(a2);
  const y = f1 * Math.sin(a1) + f2 * Math.sin(a2);
  return { x, y, mag: Math.hypot(x, y), angle: Math.atan2(y, x) };
}

function inclineAcceleration(v) {
  return G * (Math.sin(toRad(v.angle)) - v.mu * Math.cos(toRad(v.angle)));
}

function drawFrames(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const groundY = h * 0.66;
  const trackX = 72;
  const trackW = w - 144;
  const frameSpeed = v.frame === "car" ? v.observerSpeed : 0;
  const relRed = v.objectSpeed - frameSpeed;
  const relBlue = v.observerSpeed - frameSpeed;
  const redX = trackX + wrap(160 + relRed * state.time * 42, trackW);
  const blueX = trackX + wrap(430 + relBlue * state.time * 42, trackW);

  drawGround(groundY + 24);
  label(v.frame === "ground" ? "当前参考系：地面" : "当前参考系：蓝车", 46, 42, palette.teal);
  arrow(62, groundY - 72, w - 64, groundY - 72, palette.muted, 1.8);
  label("x 轴", w - 74, groundY - 92, palette.muted);

  if (v.showTrail) {
    ctx.save();
    ctx.strokeStyle = "rgba(232,93,79,0.38)";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(trackX, groundY - 12);
    ctx.lineTo(redX, groundY - 12);
    ctx.stroke();
    ctx.strokeStyle = "rgba(48,102,190,0.36)";
    ctx.beginPath();
    ctx.moveTo(trackX, groundY + 32);
    ctx.lineTo(blueX, groundY + 32);
    ctx.stroke();
    ctx.restore();
  }

  drawCar(redX, groundY, palette.coral, "红车");
  drawCar(blueX, groundY + 62, palette.blue, "蓝车");
  vector({ x: redX, y: groundY - 58 }, Math.sign(relRed || 1) * clamp(Math.abs(relRed) * 18, 16, 130), 0, palette.coral, `v'=${relRed.toFixed(1)}`);
  vector({ x: blueX, y: groundY + 8 }, Math.sign(relBlue || 1) * clamp(Math.abs(relBlue) * 18, 16, 130), 0, palette.blue, `v'=${relBlue.toFixed(1)}`);
  label("同一个运动，换参考系后位置与速度描述会改变。", 46, h - 46, palette.ink);
  readout.innerHTML = `以${v.frame === "ground" ? "地面" : "蓝车"}为参考系时，红车速度为 <strong>${relRed.toFixed(1)} m/s</strong>。相对运动不是“假运动”，而是描述运动必须先选参考系。`;
}

function quadPoint(p0, p1, p2, t) {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

function drawDisplacement(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.58;
  const xMap = (x) => 70 + ((x + 6) / 14) * (w - 140);
  const start = { x: xMap(v.startX), y };
  const end = { x: xMap(v.endX), y };
  const control = { x: (start.x + end.x) / 2, y: y - 60 - v.curvature * 150 };
  const t = (Math.sin(state.time * 0.9 - Math.PI / 2) + 1) / 2;
  const p = quadPoint(start, control, end, t);

  arrow(50, y + 78, w - 54, y + 78, palette.muted, 1.8);
  for (let x = -6; x <= 8; x += 2) {
    const px = xMap(x);
    ctx.strokeStyle = palette.line;
    ctx.beginPath();
    ctx.moveTo(px, y + 68);
    ctx.lineTo(px, y + 88);
    ctx.stroke();
    label(String(x), px, y + 104, palette.muted, "center", 12);
  }
  if (v.showPath) {
    ctx.save();
    ctx.strokeStyle = palette.blue;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(control.x, control.y, end.x, end.y);
    ctx.stroke();
    ctx.restore();
    label("实际路径", control.x, control.y - 18, palette.blue, "center");
  }
  arrow(start.x, start.y + 32, end.x, end.y + 32, palette.coral, 3);
  label("位移 Δx", (start.x + end.x) / 2, y + 52, palette.coral, "center");
  ctx.fillStyle = palette.green;
  ctx.beginPath();
  ctx.arc(start.x, start.y, 8, 0, TAU);
  ctx.arc(end.x, end.y, 8, 0, TAU);
  ctx.fill();
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 11, 0, TAU);
  ctx.fill();
  ctx.stroke();
  label("起点", start.x, start.y - 24, palette.green, "center");
  label("终点", end.x, end.y - 24, palette.green, "center");
  const displacement = v.endX - v.startX;
  const roughPath = Math.abs(displacement) * (1 + v.curvature * 0.5);
  readout.innerHTML = `当前位移 Δx = <strong>${displacement.toFixed(1)} m</strong>，估计路程约 <strong>${roughPath.toFixed(1)} m</strong>。位移只关心初末位置和方向。`;
}

function drawVelocity(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const a = v.motionMode === "uniform" ? 0 : v.acceleration;
  const T = 6;
  const t = wrap(state.time, T);
  const x = v.initialVelocity * t + 0.5 * a * t * t;
  const currentV = v.initialVelocity + a * t;
  const topY = h * 0.34;
  const trackX = 70;
  const trackW = w - 140;
  const carX = trackX + wrap(x * 34, trackW);

  drawGround(topY + 46);
  drawCar(carX, topY, palette.coral, "质点模型");
  vector({ x: carX, y: topY - 54 }, Math.sign(currentV || 1) * clamp(Math.abs(currentV) * 18, 18, 130), 0, palette.coral, `v=${currentV.toFixed(1)}`);

  const frame = plotFrame(44, h * 0.48, w - 88, h * 0.42, "x-t 图像", "t/s", "x/m");
  const xs = [];
  for (let i = 0; i <= 120; i += 1) {
    const ti = (T * i) / 120;
    xs.push(v.initialVelocity * ti + 0.5 * a * ti * ti);
  }
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 1);
  const points = xs.map((xi, i) => ({
    x: frame.x0 + (frame.w * i) / 120,
    y: frame.y0 - ((xi - minX) / (maxX - minX || 1)) * frame.h,
  }));
  plotCurve(frame, points, palette.blue, 3);
  const currentPoint = points[Math.round((t / T) * 120)];
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(currentPoint.x, currentPoint.y, 7, 0, TAU);
  ctx.fill();
  if (v.showTangent) {
    const slope = currentV;
    const dx = 48;
    const dy = -slope * 9;
    arrow(currentPoint.x - dx, currentPoint.y - dy, currentPoint.x + dx, currentPoint.y + dy, palette.teal, 2);
    label("切线斜率 = 瞬时速度", currentPoint.x + 10, currentPoint.y - 30, palette.teal);
  }
  readout.innerHTML = `当前时刻 t = <strong>${t.toFixed(1)} s</strong>，瞬时速度约 <strong>${currentV.toFixed(1)} m/s</strong>。x-t 图像斜率越大，速度大小越大。`;
}

function drawAcceleration(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const dt = v.deltaT;
  const vEnd = v.v0 + v.a * dt;
  const frame = plotFrame(42, 38, w - 84, h * 0.48, "v-t 图像", "t/s", "v");
  const minV = Math.min(v.v0, vEnd, 0) - 1;
  const maxV = Math.max(v.v0, vEnd, 0) + 1;
  const yOf = (speed) => frame.y0 - ((speed - minV) / (maxV - minV)) * frame.h;
  const x0 = frame.x0;
  const x1 = frame.x0 + frame.w;
  plotCurve(frame, [
    { x: x0, y: yOf(v.v0) },
    { x: x1, y: yOf(vEnd) },
  ], palette.blue, 4);
  const nowRatio = (Math.sin(state.time * 0.9 - Math.PI / 2) + 1) / 2;
  const nowT = dt * nowRatio;
  const nowV = v.v0 + v.a * nowT;
  const px = frame.x0 + frame.w * nowRatio;
  const py = yOf(nowV);
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(px, py, 7, 0, TAU);
  ctx.fill();

  const baseY = h * 0.76;
  label("速度矢量比较", 52, baseY - 78, palette.ink);
  vector({ x: 90, y: baseY - 30 }, v.v0 * 24, 0, palette.blue, "v₀");
  vector({ x: 90, y: baseY + 20 }, vEnd * 24, 0, palette.coral, "v");
  if (v.showDelta) vector({ x: 90 + v.v0 * 24, y: baseY + 58 }, (vEnd - v.v0) * 24, 0, palette.teal, "Δv");
  label(`a = Δv/Δt = ${(v.a).toFixed(1)} m/s²`, w - 280, baseY, palette.teal);
  readout.innerHTML = `在 Δt = <strong>${dt.toFixed(1)} s</strong> 内，速度变化量 Δv = <strong>${(vEnd - v.v0).toFixed(1)} m/s</strong>，所以加速度 a = <strong>${v.a.toFixed(1)} m/s²</strong>。`;
}

function drawTicker(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const tapeY = h * 0.34;
  const startX = 58;
  const count = 15;
  const scale = Math.min(150, (w - 120) / (v.v0 * v.interval * count + 0.5 * v.a * Math.pow(v.interval * count, 2) + 0.5));
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    const t = i * v.interval;
    dots.push({ t, x: startX + scale * (v.v0 * t + 0.5 * v.a * t * t) });
  }
  roundRect(34, tapeY - 32, w - 68, 64, 6, "#fff8e4", "#ead28a");
  dots.forEach((dot, i) => {
    ctx.fillStyle = i % 5 === 0 ? palette.coral : palette.ink;
    ctx.beginPath();
    ctx.arc(dot.x, tapeY, 4, 0, TAU);
    ctx.fill();
    if (i % 3 === 0) label(`${(dot.t).toFixed(2)}s`, dot.x, tapeY + 24, palette.muted, "center", 11);
  });
  label("打点计时器纸带：相等时间间隔", 44, tapeY - 54, palette.ink);

  const frame = plotFrame(48, h * 0.52, w - 96, h * 0.38, "由纸带估算的 v-t 图像", "t/s", "v");
  const speeds = [];
  for (let i = 1; i < dots.length - 1; i += 1) {
    const dx = (dots[i + 1].x - dots[i - 1].x) / scale;
    speeds.push({ t: dots[i].t, v: dx / (2 * v.interval) });
  }
  const maxSpeed = Math.max(...speeds.map((item) => item.v), 1);
  const points = speeds.map((item) => ({
    x: frame.x0 + (item.t / (v.interval * count)) * frame.w,
    y: frame.y0 - (item.v / maxSpeed) * frame.h,
  }));
  points.forEach((point) => {
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4.5, 0, TAU);
    ctx.fill();
  });
  if (v.showFit && points.length > 1) plotCurve(frame, [points[0], points[points.length - 1]], palette.teal, 2.5);
  readout.innerHTML = `纸带点距随时间增大，估算出的速度点近似落在直线上，说明小车做加速度约为 <strong>${v.a.toFixed(1)} m/s²</strong> 的匀变速运动。`;
}

function drawVtRelation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const T = v.duration;
  const t = wrap(state.time, T);
  const currentV = v.v0 + v.a * t;
  const frame = plotFrame(48, 40, w - 96, h * 0.54, "v-t 图像：截距 v₀，斜率 a", "t/s", "v");
  drawVtGraph(frame, v.v0, v.a, T, t, v.showArea);
  const carY = h * 0.78;
  drawGround(carY + 28);
  const x = 80 + wrap((v.v0 * t + 0.5 * v.a * t * t) * 36, w - 160);
  drawCar(x, carY, palette.coral, "小车");
  vector({ x, y: carY - 54 }, Math.sign(currentV || 1) * clamp(Math.abs(currentV) * 18, 18, 135), 0, palette.coral, `v=${currentV.toFixed(1)}`);
  readout.innerHTML = `当前 v = v₀ + at = <strong>${currentV.toFixed(1)} m/s</strong>。图像的纵截距是 v₀，斜率是 a。`;
}

function drawVtGraph(frame, v0, a, T, currentT, showArea) {
  const samples = 80;
  const velocities = [];
  for (let i = 0; i <= samples; i += 1) velocities.push(v0 + a * (T * i) / samples);
  const minV = Math.min(...velocities, 0) - 1;
  const maxV = Math.max(...velocities, 0) + 1;
  const yOf = (speed) => frame.y0 - ((speed - minV) / (maxV - minV)) * frame.h;
  const xOf = (time) => frame.x0 + (time / T) * frame.w;
  const zeroY = yOf(0);
  ctx.save();
  ctx.strokeStyle = "#9ba8b5";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(frame.x0, zeroY);
  ctx.lineTo(frame.x0 + frame.w, zeroY);
  ctx.stroke();
  ctx.restore();
  if (showArea) {
    ctx.save();
    ctx.fillStyle = "rgba(242,183,5,0.28)";
    ctx.beginPath();
    ctx.moveTo(frame.x0, zeroY);
    for (let i = 0; i <= samples; i += 1) {
      const t = (currentT * i) / samples;
      ctx.lineTo(xOf(t), yOf(v0 + a * t));
    }
    ctx.lineTo(xOf(currentT), zeroY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  const points = velocities.map((speed, i) => ({ x: frame.x0 + (frame.w * i) / samples, y: yOf(speed) }));
  plotCurve(frame, points, palette.blue, 4);
  const px = xOf(currentT);
  const py = yOf(v0 + a * currentT);
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(px, py, 7, 0, TAU);
  ctx.fill();
}

function drawStRelation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const T = v.duration;
  const currentT = wrap(state.time, T);
  const xNow = v.v0 * currentT + 0.5 * v.a * currentT * currentT;
  const top = plotFrame(44, 34, w - 88, h * 0.44, "s-t 图像", "t/s", "s");
  const values = [];
  for (let i = 0; i <= 100; i += 1) {
    const ti = (T * i) / 100;
    values.push(v.v0 * ti + 0.5 * v.a * ti * ti);
  }
  const minS = Math.min(...values, 0) - 1;
  const maxS = Math.max(...values, 1) + 1;
  const points = values.map((s, i) => ({
    x: top.x0 + (top.w * i) / 100,
    y: top.y0 - ((s - minS) / (maxS - minS)) * top.h,
  }));
  plotCurve(top, points, palette.blue, 3.5);
  const p = points[Math.round((currentT / T) * 100)];
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 7, 0, TAU);
  ctx.fill();

  const bottom = plotFrame(44, h * 0.55, w - 88, h * 0.34, "v-t 面积 = 位移", "t/s", "v");
  drawVtGraph(bottom, v.v0, v.a, T, currentT, v.showArea);
  readout.innerHTML = `当前 t = <strong>${currentT.toFixed(1)} s</strong>，位移 s = <strong>${xNow.toFixed(2)} m</strong>。上方抛物线和下方面积对应同一个运动。`;
}

function drawFreeFall(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const top = 52;
  const bottom = h - 58;
  const fallTime = Math.sqrt((2 * v.height) / v.g);
  const t = wrap(state.time, fallTime + 0.8);
  const effectiveT = Math.min(t, fallTime);
  const ratio = v.airResistance
    ? (1 - Math.exp(-effectiveT / (fallTime * 0.42))) / (1 - Math.exp(-1 / 0.42))
    : (0.5 * v.g * effectiveT * effectiveT) / v.height;
  const y = top + clamp(ratio, 0, 1) * (bottom - top);
  const x = w * 0.45;
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x - 120, top);
  ctx.lineTo(x - 120, bottom);
  ctx.stroke();
  for (let i = 0; i <= v.height; i += Math.max(1, Math.round(v.height / 10))) {
    const tickY = top + (i / v.height) * (bottom - top);
    ctx.strokeStyle = "#9ba8b5";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 128, tickY);
    ctx.lineTo(x - 108, tickY);
    ctx.stroke();
    label(`${(v.height - i).toFixed(0)}m`, x - 138, tickY, palette.muted, "right", 11);
  }
  if (v.showStrobe) {
    const n = 9;
    for (let i = 0; i <= n; i += 1) {
      const ti = (fallTime * i) / n;
      const ri = v.airResistance ? (1 - Math.exp(-ti / (fallTime * 0.42))) / (1 - Math.exp(-1 / 0.42)) : (0.5 * v.g * ti * ti) / v.height;
      ctx.fillStyle = "rgba(48,102,190,0.38)";
      ctx.beginPath();
      ctx.arc(x, top + clamp(ri, 0, 1) * (bottom - top), 6, 0, TAU);
      ctx.fill();
    }
  }
  ctx.fillStyle = palette.coral;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, TAU);
  ctx.fill();
  ctx.stroke();
  arrow(x + 42, y - 6, x + 42, y + 58, palette.coral, 3);
  label("v", x + 52, y + 58, palette.coral);
  label(v.airResistance ? "加入空气阻力：点距增长变慢" : "理想自由落体：a = g", w - 330, 54, palette.teal);
  readout.innerHTML = `忽略空气阻力时，落地时间约 <strong>${fallTime.toFixed(2)} s</strong>，位移满足 h = 1/2gt²。频闪点间距增大表示速度增大。`;
}

function drawGravityElastic(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  if (v.elasticScene === "horizontal") {
    const y = h * 0.52;
    const wallX = 80;
    const extension = (v.mass * v.g) / v.k;
    const blockX = wallX + 185 + extension * 80;
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(wallX, y - 95);
    ctx.lineTo(wallX, y + 68);
    ctx.stroke();
    drawHorizontalSpring(wallX + 22, y, blockX - 46, 8, 14);
    drawGround(y + 46);
    drawBlock(blockX, y + 46, 86, 50, palette.amber);
    const c = blockCenter(blockX, y + 46, 50);
    if (v.showForces) {
      vector(c, -clamp(v.k * extension * 4, 24, 130), 0, palette.blue, "F弹");
      vector(c, clamp(v.mass * v.g * 4, 24, 130), 0, palette.coral, "外拉力");
    }
    drawFormulaPanel(["F弹=kx", "弹力沿恢复形变方向", `x=${extension.toFixed(2)}m`]);
    readout.innerHTML = `水平弹簧被拉长时，弹力沿着恢复原状的方向作用在物块上；箭头从物块中心引出便于受力分析。`;
    return;
  }
  if (v.elasticScene === "meter") {
    const meterX = w * 0.42;
    const topY = 64;
    const extension = (v.mass * v.g) / v.k;
    const hookY = topY + 90 + extension * 80;
    roundRect(meterX - 34, topY, 68, 210, 10, "#f8fafc", palette.ink);
    for (let i = 0; i <= 10; i += 1) {
      const y = topY + 20 + i * 16;
      ctx.strokeStyle = palette.muted;
      ctx.beginPath();
      ctx.moveTo(meterX - 28, y);
      ctx.lineTo(meterX - (i % 5 === 0 ? 4 : 14), y);
      ctx.stroke();
    }
    arrow(meterX + 18, topY + 22, meterX + 18, hookY, palette.coral, 2);
    drawSpring(meterX, topY + 26, hookY - 18, 8, 12);
    drawBlock(meterX, hookY + 48, 70, 46, palette.amber);
    const c = blockCenter(meterX, hookY + 48, 46);
    if (v.showForces) {
      vector(c, 0, -70, palette.blue, "拉力");
      vector(c, 0, 70, palette.coral, "G");
    }
    drawFormulaPanel(["测力计读数≈拉力", `G=${(v.mass * v.g).toFixed(1)}N`, "静止：T=G"]);
    readout.innerHTML = `弹簧测力计读数反映挂钩对物体的拉力。静止时拉力与重力等大反向。`;
    return;
  }
  const topY = 58;
  const anchorX = w * 0.42;
  const extension = (v.mass * v.g) / v.k;
  const scale = 90;
  const restLength = 105;
  const dynamic = 0;
  const blockY = topY + restLength + extension * scale + dynamic;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(anchorX - 120, topY);
  ctx.lineTo(anchorX + 120, topY);
  ctx.stroke();
  drawSpring(anchorX, topY + 10, blockY - 38, 9, 16);
  drawBlock(anchorX, blockY, 80, 54, palette.amber);
  label("弹簧", anchorX + 42, (topY + blockY) / 2, palette.teal);
  if (v.showForces) {
    const c = blockCenter(anchorX, blockY, 54);
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 4, 0, TAU);
    ctx.fill();
    vector(c, 0, 84, palette.coral, "G=mg");
    vector(c, 0, -84, palette.blue, "F弹=kx");
  }
  roundRect(w - 300, 56, 248, 120, 8, "rgba(255,255,255,0.9)", palette.line);
  label(`G = ${(v.mass * v.g).toFixed(1)} N`, w - 276, 90, palette.coral);
  label(`x = ${(extension).toFixed(2)} m`, w - 276, 120, palette.teal);
  label(`F弹 = ${(v.k * extension).toFixed(1)} N`, w - 276, 150, palette.blue);
  readout.innerHTML = `静止平衡时，弹力大小等于重力：k x = mg。当前伸长量约 <strong>${extension.toFixed(2)} m</strong>。`;
}

function drawFriction(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  if (v.frictionScene === "incline") {
    const angle = toRad(clamp(8 + v.push * 0.45, 8, 42));
    const base = { x: w * 0.18, y: h * 0.72 };
    const length = Math.min(w * 0.55, 440);
    const top = { x: base.x + length * Math.cos(angle), y: base.y - length * Math.sin(angle) };
    ctx.fillStyle = "#edf3f8";
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(top.x, top.y);
    ctx.lineTo(top.x, base.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    const bx = top.x - length * 0.42 * Math.cos(angle);
    const by = top.y + length * 0.42 * Math.sin(angle);
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(-angle);
    drawBlock(0, 0, 82, 48, palette.amber);
    ctx.restore();
    const c = rotatedPoint(bx, by, 0, -24, -angle);
    const tendency = v.normal * Math.sin(angle);
    const fMax = v.muStatic * v.normal * Math.cos(angle);
    const sliding = tendency > fMax;
    const f = sliding ? v.muKinetic * v.normal * Math.cos(angle) : tendency;
    vector(c, -Math.cos(angle) * 86, Math.sin(angle) * 86, palette.coral, "下滑趋势");
    vector(c, Math.cos(angle) * clamp(f * 2, 22, 110), -Math.sin(angle) * clamp(f * 2, 22, 110), palette.blue, sliding ? "f滑" : "f静");
    vector(c, -Math.sin(angle) * 76, -Math.cos(angle) * 76, palette.teal, "N");
    label(sliding ? "斜面上滑动摩擦阻碍相对运动" : "静摩擦阻碍下滑趋势", 46, 48, sliding ? palette.coral : palette.teal, "left", 17);
    drawFormulaPanel(["摩擦力阻碍相对运动/趋势", "f静≤μsN", sliding ? "f=μkN" : "静止趋势"]);
    readout.innerHTML = `斜面场景中，摩擦力沿接触面方向，阻碍物块相对斜面的运动或运动趋势。当前${sliding ? "会滑动" : "可保持静止"}。`;
    return;
  }
  if (v.frictionScene === "stack") {
    const groundY = h * 0.64;
    const x = w * 0.42;
    drawGround(groundY);
    drawBlock(x, groundY, 130, 46, palette.teal);
    drawBlock(x - 10, groundY - 46, 78, 40, palette.amber);
    const lowerC = blockCenter(x, groundY, 46);
    const upperC = blockCenter(x - 10, groundY - 46, 40);
    const fMax = v.muStatic * v.normal;
    const slip = v.push > fMax;
    vector(lowerC, clamp(v.push * 2, 20, 150), 0, palette.coral, "拉力");
    vector(upperC, clamp(Math.min(v.push, fMax) * 1.8, 18, 120), 0, palette.blue, slip ? "相对滑动" : "静摩擦带动");
    vector(lowerC, -clamp(Math.min(v.push, fMax) * 1.8, 18, 120), 0, palette.blue, "反向摩擦");
    label("叠放物块：上下接触面摩擦力成对出现", 46, 48, palette.ink, "left", 17);
    drawFormulaPanel(["接触面成对摩擦", `fmax=${fMax.toFixed(1)}N`, slip ? "上块打滑" : "共同运动"]);
    readout.innerHTML = `叠放物块中，上下物块间的摩擦力大小相等、方向相反，分别作用在不同物体上。`;
    return;
  }
  const groundY = h * 0.62;
  const fMax = v.muStatic * v.normal;
  const kinetic = v.muKinetic * v.normal;
  const moving = v.push > fMax;
  const friction = moving ? kinetic : v.push;
  const x = moving ? 160 + clamp((v.push - kinetic) * state.time * 2.5, 0, w - 300) : w * 0.45;
  drawGround(groundY);
  drawBlock(x, groundY, 96, 56, palette.amber);
  const c = blockCenter(x, groundY, 56);
  ctx.fillStyle = palette.ink;
  ctx.beginPath();
  ctx.arc(c.x, c.y, 4, 0, TAU);
  ctx.fill();
  vector(c, clamp(v.push * 2.1, 0, 160), 0, palette.coral, "F");
  vector(c, -clamp(friction * 2.1, 0, 160), 0, palette.blue, moving ? "f滑" : "f静");
  vector(c, 0, -76, palette.teal, "N");
  vector(c, 0, 76, palette.coral, "G");
  label(moving ? "已滑动：f = μkN" : "静止：f静 自动匹配外力", 46, 48, moving ? palette.coral : palette.teal);
  label(`最大静摩擦力 fmax = ${fMax.toFixed(1)} N`, 46, 78, palette.ink);
  readout.innerHTML = moving
    ? `推力超过最大静摩擦力，木块开始滑动；当前滑动摩擦力为 <strong>${kinetic.toFixed(1)} N</strong>。`
    : `推力尚未超过最大静摩擦力，静摩擦力大小为 <strong>${friction.toFixed(1)} N</strong>，与推力平衡。`;
}

function drawActionReaction(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.58;
  const phase = Math.min(1.8, state.time);
  const leftMove = 0.5 * (v.force / v.massA) * phase * phase * 38;
  const rightMove = 0.5 * (v.force / v.massB) * phase * phase * 38;
  const leftX = w * 0.5 - 42 - leftMove;
  const rightX = w * 0.5 + 42 + rightMove;
  drawGround(y + 40);
  drawSkater(leftX, y, palette.blue, "A");
  drawSkater(rightX, y, palette.coral, "B");
  vector({ x: leftX + 40, y: y - 62 }, -100, 0, palette.blue, "B 对 A");
  vector({ x: rightX - 40, y: y - 62 }, 100, 0, palette.coral, "A 对 B");
  if (v.showAcceleration) {
    label(`aA = ${(v.force / v.massA).toFixed(2)} m/s²`, leftX - 76, y + 78, palette.blue);
    label(`aB = ${(v.force / v.massB).toFixed(2)} m/s²`, rightX + 34, y + 78, palette.coral);
  }
  label("两个力大小相等、方向相反、作用在不同物体上。", 46, 46, palette.ink);
  readout.innerHTML = `相互作用力大小都为 <strong>${v.force.toFixed(0)} N</strong>，但加速度由 a = F/m 决定，所以质量不同会导致速度变化不同。`;
}

function drawSkater(x, y, color, name) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y - 44, 16, 0, TAU);
  ctx.fill();
  ctx.stroke();
  roundRect(x - 20, y - 28, 40, 50, 8, color, palette.ink);
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 28, y + 28);
  ctx.lineTo(x + 28, y + 28);
  ctx.stroke();
  ctx.restore();
  label(name, x, y - 72, color, "center");
}

function drawForceVector(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const o = { x: w * 0.38, y: h * 0.58 };
  const scale = 2.2;
  if (v.vectorMode === "combine") {
    const f1 = { x: v.f1 * scale, y: 0 };
    const f2 = { x: v.f2 * scale * Math.cos(toRad(v.angle)), y: -v.f2 * scale * Math.sin(toRad(v.angle)) };
    const r = { x: f1.x + f2.x, y: f1.y + f2.y };
    vector(o, f1.x, f1.y, palette.blue, "F₁");
    vector(o, f2.x, f2.y, palette.teal, "F₂");
    ctx.save();
    ctx.strokeStyle = "rgba(96,112,128,0.5)";
    ctx.setLineDash([7, 7]);
    ctx.beginPath();
    ctx.moveTo(o.x + f1.x, o.y + f1.y);
    ctx.lineTo(o.x + r.x, o.y + r.y);
    ctx.moveTo(o.x + f2.x, o.y + f2.y);
    ctx.lineTo(o.x + r.x, o.y + r.y);
    ctx.stroke();
    ctx.restore();
    vector(o, r.x, r.y, palette.coral, "F合");
    const mag = Math.hypot(r.x / scale, r.y / scale);
    label(`|F合| ≈ ${mag.toFixed(1)} N`, 48, 48, palette.coral);
  } else {
    const f = { x: v.f1 * scale * Math.cos(toRad(v.angle)), y: -v.f1 * scale * Math.sin(toRad(v.angle)) };
    vector(o, f.x, f.y, palette.coral, "F");
    vector(o, f.x, 0, palette.blue, "Fx");
    vector({ x: o.x + f.x, y: o.y }, 0, f.y, palette.teal, "Fy");
    ctx.save();
    ctx.strokeStyle = "rgba(96,112,128,0.5)";
    ctx.setLineDash([7, 7]);
    ctx.beginPath();
    ctx.moveTo(o.x + f.x, o.y);
    ctx.lineTo(o.x + f.x, o.y + f.y);
    ctx.stroke();
    ctx.restore();
    label(`Fx=${(v.f1 * Math.cos(toRad(v.angle))).toFixed(1)}N, Fy=${(v.f1 * Math.sin(toRad(v.angle))).toFixed(1)}N`, 48, 48, palette.teal);
  }
  arrow(70, h - 60, w - 70, h - 60, palette.muted, 1.5);
  label("水平方向", w - 138, h - 80, palette.muted);
  readout.innerHTML = v.vectorMode === "combine"
    ? "平行四边形的对角线表示两个共点力的合力，合力与原来两个力的共同作用效果等效。"
    : "分解不是创造新的力，而是把同一个力按选定方向表示成两个等效分量。";
}

function drawEquilibrium(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const o = { x: w * 0.42, y: h * 0.56 };
  const scale = 1.65;
  const r = resultant(v.f1, 0, v.f2, -toRad(v.angle));
  vector(o, v.f1 * scale, 0, palette.blue, "F₁");
  vector(o, v.f2 * scale * Math.cos(toRad(v.angle)), -v.f2 * scale * Math.sin(toRad(v.angle)), palette.teal, "F₂");
  vector(o, -r.x * scale, -r.y * scale, palette.coral, "所需 F₃");
  ctx.fillStyle = palette.ink;
  ctx.beginPath();
  ctx.arc(o.x, o.y, 8, 0, TAU);
  ctx.fill();
  if (v.showComponents) {
    label(`ΣFx = ${r.x.toFixed(1)} N，ΣFy = ${(-r.y).toFixed(1)} N`, 46, 48, palette.ink);
    label(`要平衡，需要第三个力大小 ${r.mag.toFixed(1)} N，方向与 F₁+F₂ 相反`, 46, 78, palette.coral);
  }
  drawClosedTriangle(w - 210, 120, v, r);
  readout.innerHTML = `共点力平衡要求合力为零。当前 F₁ 与 F₂ 的合力大小为 <strong>${r.mag.toFixed(1)} N</strong>，第三个力应与它等大反向。`;
}

function drawClosedTriangle(x, y, v, r) {
  const scale = 0.9;
  const p0 = { x, y };
  const p1 = { x: x + v.f1 * scale, y };
  const p2 = { x: p1.x + v.f2 * scale * Math.cos(toRad(v.angle)), y: p1.y - v.f2 * scale * Math.sin(toRad(v.angle)) };
  ctx.save();
  ctx.strokeStyle = "rgba(23,32,42,0.22)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p0.x, p0.y);
  ctx.stroke();
  ctx.restore();
  label("力三角形", x, y - 28, palette.muted);
}

function drawInertia(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.58;
  drawGround(y + 30);
  const a = v.friction * G / Math.sqrt(v.mass);
  const tStop = a > 0 ? v.initialSpeed / a : 100;
  const t = Math.min(state.time, Math.min(7, tStop + 1.5));
  const movingT = Math.min(t, tStop);
  const s = v.initialSpeed * movingT - 0.5 * a * movingT * movingT;
  const x = 70 + clamp(s * 42, 0, w - 150);
  drawCar(x, y, palette.coral, "小车");
  vector({ x, y: y - 58 }, Math.max(18, (v.initialSpeed - a * movingT) * 20), 0, palette.coral, "v");
  if (v.showIdeal) {
    const idealX = 70 + clamp(v.initialSpeed * state.time * 42, 0, w - 150);
    drawCar(idealX, y + 92, palette.teal, "理想光滑");
    vector({ x: idealX, y: y + 34 }, v.initialSpeed * 20, 0, palette.teal, "匀速");
  }
  label("阻力越小，小车保持运动的趋势越明显。", 44, 48, palette.ink);
  readout.innerHTML = `在阻力趋近于零的理想情况下，小车不需要持续受力也会保持匀速直线运动。当前估计停止时间约 <strong>${tStop > 20 ? "很长" : `${tStop.toFixed(1)} s`}</strong>。`;
}

function drawFmaExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.32;
  drawGround(y + 28);
  const a = v.force / v.mass;
  const x = 70 + clamp(0.5 * a * state.time * state.time * 50, 0, w - 150);
  drawCar(x, y, palette.coral, "实验小车");
  vector({ x: x + 34, y: y - 8 }, clamp(v.force * 18, 18, 130), 0, palette.coral, "F");
  const frame = plotFrame(48, h * 0.48, w - 96, h * 0.42, v.experimentMode === "force" ? "控制 m：a-F 图像" : "控制 F：a-1/m 图像", v.experimentMode === "force" ? "F/N" : "1/m", "a");
  const points = [];
  for (let i = 0; i < 7; i += 1) {
    const input = v.experimentMode === "force" ? (i + 1) * 1.1 : (i + 1) / 5;
    const accel = v.experimentMode === "force" ? input / v.mass : v.force * input;
    points.push({
      x: frame.x0 + (input / (v.experimentMode === "force" ? 8 : 1.4)) * frame.w,
      y: frame.y0 - (accel / 8) * frame.h,
    });
  }
  if (v.showData) {
    points.forEach((point, i) => {
      ctx.fillStyle = i % 2 ? palette.blue : palette.coral;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, TAU);
      ctx.fill();
    });
  }
  plotCurve(frame, [points[0], points[points.length - 1]], palette.teal, 2.5);
  readout.innerHTML = `当前 a = F/m = <strong>${a.toFixed(2)} m/s²</strong>。实验核心是控制变量：只改变 F 或只改变 m。`;
}

function drawNewtonSecond(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const net = v.forceRight - v.forceLeft;
  const a = net / v.mass;
  if (v.viewMode === "fbd") {
    const c = { x: w * 0.46, y: h * 0.48 };
    drawBlock(c.x, c.y + 34, 118, 68, palette.amber);
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 5, 0, TAU);
    ctx.fill();
    vector(c, clamp(v.forceRight * 1.8, 0, 150), 0, palette.coral, "F右");
    vector(c, -clamp(v.forceLeft * 1.8, 0, 150), 0, palette.blue, "F左");
    vector({ x: c.x, y: c.y + 64 }, Math.sign(net || 1) * clamp(Math.abs(net) * 1.8, 12, 150), 0, palette.teal, "F合");
    if (v.showVelocity) vector({ x: c.x, y: c.y - 78 }, Math.sign(a || 1) * clamp(Math.abs(a) * 12, 18, 130), 0, palette.purple, "a");
    label("独立受力图：所有外力从同一质心点引出", 46, 48, palette.ink, "left", 17);
    drawFormulaPanel(["F合=ma", `F合=${net.toFixed(0)}N`, `a=${a.toFixed(1)}m/s²`]);
    readout.innerHTML = `受力分析图中，力箭头从小车质心引出，便于比较合力与加速度方向。`;
    return;
  }
  const y = h * 0.58;
  const motion = clamp(0.5 * Math.abs(a) * state.time * state.time * 15, 0, w * 0.5 - 110);
  const x = w * 0.5 + Math.sign(a || 1) * motion;
  drawGround(y + 28);
  drawCar(x, y, palette.amber, "受力小车");
  const c = { x, y: y - 8 };
  vector(c, clamp(v.forceRight * 1.8, 0, 150), 0, palette.coral, "F右");
  vector(c, -clamp(v.forceLeft * 1.8, 0, 150), 0, palette.blue, "F左");
  vector({ x, y: y + 34 }, Math.sign(net || 1) * clamp(Math.abs(net) * 1.8, 12, 150), 0, palette.teal, "F合");
  if (v.showVelocity) vector({ x, y: y - 82 }, Math.sign(a || 1) * clamp(Math.abs(a) * 12, 18, 130), 0, palette.purple, "a");
  label(`F合 = ${net.toFixed(0)} N`, 46, 48, palette.teal);
  label(`a = F合/m = ${a.toFixed(1)} m/s²`, 46, 78, palette.teal);
  readout.innerHTML = `小车的加速度方向与合力方向相同。当前合力为 <strong>${net.toFixed(0)} N</strong>，加速度为 <strong>${a.toFixed(1)} m/s²</strong>。`;
}

function drawUnits(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const force = v.mass * v.accel;
  label("力学单位制把物理量关系和单位关系统一起来", 42, 48, palette.ink, "left", 16);
  const centerX = w * 0.5;
  const y = h * 0.44;
  drawUnitCard(centerX - 250, y, "kg", `${v.mass.toFixed(1)} kg`, palette.blue);
  drawUnitCard(centerX - 70, y, "m/s²", `${v.accel.toFixed(1)} m/s²`, palette.teal);
  drawUnitCard(centerX + 130, y, "N", `${force.toFixed(1)} N`, palette.coral);
  arrow(centerX - 118, y, centerX - 92, y, palette.muted, 3);
  label("×", centerX - 105, y - 24, palette.muted, "center", 20);
  arrow(centerX + 70, y, centerX + 102, y, palette.muted, 3);
  label("=", centerX + 86, y - 24, palette.muted, "center", 20);
  roundRect(52, h * 0.68, w - 104, 78, 8, "#f8fafc", palette.line);
  label(v.unitMode === "si" ? "国际单位制：1 N = 1 kg·m/s²" : `${(v.mass * 1000).toFixed(0)} g × ${(v.accel * 100).toFixed(0)} cm/s² = ${(force * 100000).toFixed(0)} dyn`, 78, h * 0.73, palette.ink, "left", 18);
  readout.innerHTML = `当前 F = ma = <strong>${force.toFixed(1)} N</strong>。单位换算时，数值会随单位缩放，但物理关系保持不变。`;
}

function drawUnitCard(x, y, title, value, color) {
  roundRect(x, y - 64, 132, 128, 8, "#ffffff", palette.line);
  label(title, x + 66, y - 18, color, "center", 24);
  label(value, x + 66, y + 26, palette.ink, "center", 14);
}

function drawApplications(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const angle = toRad(v.angle);
  const a = inclineAcceleration(v);
  const weightLen = 96;
  if (v.analysisView === "fbd") {
    const c = { x: w * 0.44, y: h * 0.48 };
    drawBlock(c.x, c.y + 30, 92, 60, palette.amber);
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 5, 0, TAU);
    ctx.fill();
    vector(c, 0, weightLen, palette.coral, "mg");
    vector(c, -Math.sin(angle) * 88, -Math.cos(angle) * 88, palette.teal, "N");
    vector(c, Math.cos(angle) * 86, -Math.sin(angle) * 86, palette.blue, a > 0 ? "f" : "f静");
    ctx.save();
    ctx.strokeStyle = palette.muted;
    ctx.setLineDash([7, 7]);
    ctx.beginPath();
    ctx.moveTo(c.x - 110 * Math.cos(angle), c.y + 110 * Math.sin(angle) + 50);
    ctx.lineTo(c.x + 145 * Math.cos(angle), c.y - 145 * Math.sin(angle) + 50);
    ctx.stroke();
    ctx.restore();
    label("独立受力图：力从物块质心点引出", 46, 48, palette.ink, "left", 17);
    drawFormulaPanel(["沿斜面列方程", "垂直斜面列方程", `a=${a.toFixed(2)}m/s²`]);
    readout.innerHTML = `受力图视图把物块从斜面中“隔离”出来，重力、支持力、摩擦力都从质心引出，方向与斜面几何保持一致。`;
    return;
  }
  if (v.analysisView === "components") {
    const c = { x: w * 0.42, y: h * 0.45 };
    drawBlock(c.x, c.y + 30, 92, 60, palette.amber);
    vector(c, 0, weightLen, palette.coral, "mg");
    vector(c, -Math.cos(angle) * 110, Math.sin(angle) * 110, palette.purple, "mg sinθ");
    vector(c, Math.sin(angle) * 90, Math.cos(angle) * 90, palette.green, "mg cosθ");
    ctx.save();
    ctx.strokeStyle = palette.muted;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(c.x - 120 * Math.cos(angle), c.y + 120 * Math.sin(angle));
    ctx.lineTo(c.x + 150 * Math.cos(angle), c.y - 150 * Math.sin(angle));
    ctx.moveTo(c.x - 90 * Math.sin(angle), c.y - 90 * Math.cos(angle));
    ctx.lineTo(c.x + 120 * Math.sin(angle), c.y + 120 * Math.cos(angle));
    ctx.stroke();
    ctx.restore();
    label("重力分解：平行斜面与垂直斜面", 46, 48, palette.ink, "left", 17);
    drawFormulaPanel(["mg sinθ", "mg cosθ", `θ=${v.angle.toFixed(0)}°`]);
    readout.innerHTML = `分力图只是在选定坐标轴上表示同一个重力。平行斜面的分力使物块有下滑趋势，垂直斜面的分力由支持力平衡。`;
    return;
  }
  const base = { x: w * 0.25, y: h * 0.72 };
  const length = Math.min(w * 0.58, 460);
  const top = { x: base.x + length * Math.cos(angle), y: base.y - length * Math.sin(angle) };
  ctx.save();
  ctx.fillStyle = "#edf3f8";
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(base.x, base.y);
  ctx.lineTo(top.x, top.y);
  ctx.lineTo(top.x, base.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  const s = a > 0 ? clamp(0.5 * a * state.time * state.time * 35, 0, length - 80) : length * 0.35;
  const bx = top.x - s * Math.cos(angle);
  const by = top.y + s * Math.sin(angle);
  ctx.save();
  ctx.translate(bx, by);
  ctx.rotate(-angle);
  drawBlock(0, 0, 72, 44, palette.amber);
  ctx.restore();
  const origin = rotatedPoint(bx, by, 0, -22, -angle);
  ctx.fillStyle = palette.ink;
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, 4, 0, TAU);
  ctx.fill();
  vector(origin, 0, 96, palette.coral, "mg");
  vector(origin, -Math.sin(angle) * 90, -Math.cos(angle) * 90, palette.teal, "N");
  vector(origin, Math.cos(angle) * 90, -Math.sin(angle) * 90, palette.blue, a > 0 ? "f" : "静止");
  if (v.showComponents) {
    vector(origin, -Math.cos(angle) * 104, Math.sin(angle) * 104, palette.purple, "mg sinθ");
    vector(origin, Math.sin(angle) * 82, Math.cos(angle) * 82, palette.green, "mg cosθ");
  }
  label(`a = g(sinθ - μcosθ) = ${a.toFixed(2)} m/s²`, 46, 50, a > 0 ? palette.teal : palette.coral);
  readout.innerHTML = a > 0
    ? `沿斜面向下的分力大于摩擦阻碍，物块加速下滑，a = <strong>${a.toFixed(2)} m/s²</strong>。`
    : `摩擦足以阻止下滑趋势，物块可保持静止或匀速；沿斜面合力不使其加速下滑。`;
}

function drawElevator(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const centerX = w * 0.45;
  const carY = h * 0.5 + Math.sin(state.time * 1.2) * 30 * Math.sign(v.accel || 1);
  const normal = Math.max(0, v.mass * (G + v.accel));
  const weight = v.mass * G;
  roundRect(centerX - 110, carY - 120, 220, 240, 8, "#edf3f8", palette.ink);
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX - 110, 30);
  ctx.lineTo(centerX - 110, h - 30);
  ctx.moveTo(centerX + 110, 30);
  ctx.lineTo(centerX + 110, h - 30);
  ctx.stroke();
  drawPerson(centerX, carY + 26);
  roundRect(centerX - 52, carY + 78, 104, 20, 4, "#ffffff", palette.line);
  label(`${normal.toFixed(0)} N`, centerX, carY + 88, palette.teal, "center", 13);
  if (v.showForces) {
    vector({ x: centerX + 84, y: carY + 40 }, 0, -clamp(normal / 8, 20, 130), palette.teal, "N");
    vector({ x: centerX - 84, y: carY + 20 }, 0, clamp(weight / 8, 20, 130), palette.coral, "mg");
  }
  const stateText = normal > weight + 1 ? "超重" : normal < weight - 1 ? (normal <= 1 ? "完全失重" : "失重") : "正常视重";
  label(`状态：${stateText}`, 52, 56, stateText === "超重" ? palette.coral : palette.teal, "left", 18);
  label(`N - mg = ma`, 52, 90, palette.ink);
  label(`体重计读数 N = ${normal.toFixed(0)} N`, 52, 120, palette.teal);
  readout.innerHTML = `人的重力仍为 <strong>${weight.toFixed(0)} N</strong>，变化的是支持力 N。当前体重计读数为 <strong>${normal.toFixed(0)} N</strong>，表现为${stateText}。`;
}

function drawPerson(x, y) {
  ctx.save();
  ctx.fillStyle = palette.coral;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y - 54, 15, 0, TAU);
  ctx.fill();
  ctx.stroke();
  roundRect(x - 18, y - 38, 36, 52, 8, palette.coral, palette.ink);
  ctx.beginPath();
  ctx.moveTo(x - 12, y + 14);
  ctx.lineTo(x - 28, y + 48);
  ctx.moveTo(x + 12, y + 14);
  ctx.lineTo(x + 28, y + 48);
  ctx.stroke();
  ctx.restore();
}

function drawCurvedMotion(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const x0 = 70;
  const y0 = h * 0.68;
  const T = 4.6;
  const t = Math.min(state.time, T);
  const sx = v.speed * t;
  const sy = 0.5 * v.sideAccel * t * t;
  const scale = Math.min(42, (w - 140) / (v.speed * T + 1));
  const x = x0 + sx * scale;
  const y = y0 - sy * scale;
  ctx.save();
  ctx.strokeStyle = palette.blue;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 120; i += 1) {
    const ti = (T * i) / 120;
    const px = x0 + v.speed * ti * scale;
    const py = y0 - 0.5 * v.sideAccel * ti * ti * scale;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, TAU);
  ctx.fill();
  ctx.stroke();
  if (v.showVelocity) {
    const vx = v.speed;
    const vy = -v.sideAccel * t;
    vector({ x, y }, clamp(vx * 16, 18, 120), clamp(vy * 16, -120, 120), palette.coral, "v 切线");
  }
  if (v.showForce && Math.abs(v.sideAccel) > 0.02) {
    vector({ x: x - 28, y }, 0, -Math.sign(v.sideAccel) * 90, palette.teal, "F合");
  }
  label("合力与速度不共线时，运动轨迹会弯曲。", 44, 48, palette.ink);
  readout.innerHTML = `当前横向加速度为 <strong>${v.sideAccel.toFixed(1)} m/s²</strong>。速度方向沿轨迹切线，合力方向指向轨迹弯曲的内侧。`;
}

function drawMotionComposition(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const riverTop = 72;
  const riverBottom = h - 66;
  const riverW = riverBottom - riverTop;
  ctx.fillStyle = "#e6f4f8";
  ctx.fillRect(42, riverTop, w - 84, riverW);
  ctx.strokeStyle = "#9bc9d6";
  ctx.lineWidth = 2;
  ctx.strokeRect(42, riverTop, w - 84, riverW);
  for (let y = riverTop + 28; y < riverBottom; y += 38) {
    arrow(58, y, 98 + v.riverSpeed * 16, y, "rgba(48,102,190,0.5)", 1.5);
  }
  const vx = v.riverSpeed + v.boatSpeed * Math.sin(toRad(v.heading));
  const vy = v.boatSpeed * Math.cos(toRad(v.heading));
  const crossTime = riverW / Math.max(0.1, vy * 32);
  const t = Math.min(state.time, crossTime);
  const progress = Math.min(1, t / crossTime);
  const startX = w * 0.48;
  const startY = riverBottom;
  const x = startX + vx * 32 * t;
  const y = startY - vy * 32 * t;
  ctx.save();
  ctx.strokeStyle = palette.coral;
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + vx * 32 * crossTime * progress, startY - vy * 32 * crossTime * progress);
  ctx.stroke();
  ctx.restore();
  drawBoat(x, y, -toRad(v.heading), palette.amber);
  if (v.showComponents) {
    vector({ x, y }, v.riverSpeed * 26, 0, palette.blue, "v水");
    vector({ x, y }, v.boatSpeed * Math.sin(toRad(v.heading)) * 26, -v.boatSpeed * Math.cos(toRad(v.heading)) * 26, palette.teal, "v船");
    vector({ x: x + 12, y: y + 18 }, vx * 26, -vy * 26, palette.coral, "v合");
  }
  label("河岸", 50, riverTop - 24, palette.ink);
  label("对岸", 50, riverBottom + 28, palette.ink);
  readout.innerHTML = `分运动等时独立。当前合速度分量 vx = <strong>${vx.toFixed(1)} m/s</strong>，vy = <strong>${vy.toFixed(1)} m/s</strong>。`;
}

function drawBoat(x, y, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.lineTo(22, 16);
  ctx.lineTo(0, 28);
  ctx.lineTo(-22, 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function projectileState(v0x, v0y, g, duration) {
  const liveT = Math.min(state.time, duration);
  return { t: liveT, x: v0x * liveT, y: v0y * liveT - 0.5 * g * liveT * liveT };
}

function drawProjectileExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const top = 62;
  const groundY = h - 70;
  const left = 70;
  const fallTime = Math.sqrt((2 * v.height) / v.g);
  const rangeValue = v.v0 * fallTime;
  const scale = Math.min((w - 150) / Math.max(rangeValue, 1), (groundY - top) / v.height);
  const s = projectileState(v.v0, 0, v.g, fallTime);
  const x = left + s.x * scale;
  const y = top + (-s.y) * scale;
  drawGround(groundY);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, groundY);
  ctx.stroke();
  if (v.showStrobe) {
    for (let i = 0; i <= 10; i += 1) {
      const ti = (fallTime * i) / 10;
      const px = left + v.v0 * ti * scale;
      const py = top + 0.5 * v.g * ti * ti * scale;
      ctx.fillStyle = "rgba(48,102,190,0.35)";
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, TAU);
      ctx.fill();
    }
  }
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, TAU);
  ctx.fill();
  if (v.showComparison) {
    const freeY = top + 0.5 * v.g * s.t * s.t * scale;
    const horizontalX = left + v.v0 * s.t * scale;
    ctx.fillStyle = palette.teal;
    ctx.beginPath();
    ctx.arc(left - 32, freeY, 9, 0, TAU);
    ctx.arc(horizontalX, top - 28, 9, 0, TAU);
    ctx.fill();
    label("自由落体对照", left + 8, freeY, palette.teal);
    label("水平匀速对照", horizontalX, top - 52, palette.teal, "center");
  }
  label("水平位移等间隔，竖直位移递增。", 44, 38, palette.ink);
  readout.innerHTML = `平抛落地时间由高度决定：t = <strong>${fallTime.toFixed(2)} s</strong>；当前射程 R = <strong>${rangeValue.toFixed(1)} m</strong>。`;
}

function drawProjectileLaw(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const groundY = h - 62;
  const left = 62;
  const angle = toRad(v.angle);
  const v0x = v.v0 * Math.cos(angle);
  const v0y = v.v0 * Math.sin(angle);
  const flightT = Math.max(0.8, (2 * v0y) / v.g || 3);
  const rangeValue = v0x * flightT;
  const maxH = (v0y * v0y) / (2 * v.g);
  const scale = Math.min((w - 140) / Math.max(rangeValue, 1), (groundY - 70) / Math.max(maxH, 1));
  const s = projectileState(v0x, v0y, v.g, flightT);
  drawGround(groundY);
  ctx.save();
  ctx.strokeStyle = palette.blue;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 120; i += 1) {
    const ti = (flightT * i) / 120;
    const px = left + v0x * ti * scale;
    const py = groundY - (v0y * ti - 0.5 * v.g * ti * ti) * scale;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
  const x = left + s.x * scale;
  const y = groundY - s.y * scale;
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, TAU);
  ctx.fill();
  if (v.showVectors) {
    vector({ x, y }, v0x * 7, 0, palette.blue, "vx");
    vector({ x, y }, 0, -(v0y - v.g * s.t) * 7, palette.teal, "vy");
    vector({ x, y }, v0x * 7, -(v0y - v.g * s.t) * 7, palette.coral, "v");
  }
  label(`最高点 H≈${maxH.toFixed(1)}m，射程 R≈${rangeValue.toFixed(1)}m`, 46, 42, palette.ink);
  readout.innerHTML = `抛体运动可分解为水平匀速和竖直匀变速。当前 vx = <strong>${v0x.toFixed(1)} m/s</strong>，初始 vy = <strong>${v0y.toFixed(1)} m/s</strong>。`;
}

function drawCircularMotion(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.48, y: h * 0.52 };
  const angle = state.time * v.omega;
  const x = c.x + v.radius * Math.cos(angle);
  const y = c.y + v.radius * Math.sin(angle);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(c.x, c.y, v.radius, 0, TAU);
  ctx.stroke();
  ctx.fillStyle = palette.ink;
  ctx.beginPath();
  ctx.arc(c.x, c.y, 5, 0, TAU);
  ctx.fill();
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 13, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = palette.muted;
  ctx.beginPath();
  ctx.moveTo(c.x, c.y);
  ctx.lineTo(x, y);
  ctx.stroke();
  if (v.showVelocity) {
    vector({ x, y }, -Math.sin(angle) * 85, Math.cos(angle) * 85, palette.coral, "v");
  }
  if (v.showAngle) {
    ctx.strokeStyle = palette.teal;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 42, 0, angle % TAU);
    ctx.stroke();
    label("θ = ωt", c.x + 50, c.y - 20, palette.teal);
  }
  readout.innerHTML = `周期 T = 2π/ω = <strong>${(TAU / v.omega).toFixed(2)} s</strong>，线速度大小 v = ωr。`;
}

function drawCentripetalForce(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.47, y: h * 0.52 };
  const radiusPx = 135;
  const omega = v.speed / v.radius;
  const angle = state.time * omega;
  const x = c.x + radiusPx * Math.cos(angle);
  const y = c.y + radiusPx * Math.sin(angle);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(c.x, c.y, radiusPx, 0, TAU);
  ctx.stroke();
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(c.x, c.y);
  ctx.lineTo(x, y);
  ctx.stroke();
  const breakMode = v.stringBreak;
  let bx = x;
  let by = y;
  if (breakMode) {
    bx = x - Math.sin(angle) * wrap(state.time, 2) * v.speed * 34;
    by = y + Math.cos(angle) * wrap(state.time, 2) * v.speed * 34;
  }
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(bx, by, 13, 0, TAU);
  ctx.fill();
  ctx.stroke();
  if (!breakMode) vector({ x, y }, (c.x - x) * 0.56, (c.y - y) * 0.56, palette.teal, "F向心");
  vector({ x: bx, y: by }, -Math.sin(angle) * 88, Math.cos(angle) * 88, palette.coral, breakMode ? "绳断后沿切线" : "v");
  readout.innerHTML = `所需向心力 Fₙ = mv²/r = <strong>${(v.mass * v.speed * v.speed / v.radius).toFixed(1)} N</strong>。绳断后不再有向心力，小球沿切线方向飞出。`;
}

function drawCentripetalAccel(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.46, y: h * 0.52 };
  const radiusPx = clamp(v.radius * 58, 70, 190);
  const omega = v.speed / v.radius;
  const angle = state.time * omega;
  const p = { x: c.x + radiusPx * Math.cos(angle), y: c.y + radiusPx * Math.sin(angle) };
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(c.x, c.y, radiusPx, 0, TAU);
  ctx.stroke();
  ctx.fillStyle = palette.amber;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 13, 0, TAU);
  ctx.fill();
  if (v.showVelocity) vector(p, -Math.sin(angle) * 82, Math.cos(angle) * 82, palette.coral, "v");
  if (v.showAcceleration) vector(p, (c.x - p.x) * 0.58, (c.y - p.y) * 0.58, palette.teal, "aₙ");
  const a = v.speed * v.speed / v.radius;
  drawFormulaPanel([`aₙ = v²/r`, `aₙ = ${v.speed.toFixed(1)}² / ${v.radius.toFixed(1)}`, `aₙ = ${a.toFixed(1)} m/s²`]);
  readout.innerHTML = `匀速圆周运动速率可不变，但速度方向不断改变，因此有指向圆心的加速度 <strong>${a.toFixed(1)} m/s²</strong>。`;
}

function drawLifeCircular(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.47, y: h * 0.55 };
  const r = 145;
  const angle = state.time * v.speed / Math.max(8, v.radius);
  const car = { x: c.x + r * Math.cos(angle), y: c.y + r * Math.sin(angle) };
  const safe = Math.sqrt(v.mu * G * v.radius);
  ctx.strokeStyle = v.speed <= safe ? palette.teal : palette.coral;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(c.x, c.y, r, 0, TAU);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(c.x, c.y, r - 46, 0, TAU);
  ctx.fill();
  drawTopCar(car.x, car.y, angle + Math.PI / 2, v.speed <= safe ? palette.amber : palette.coral);
  vector(car, (c.x - car.x) * 0.5, (c.y - car.y) * 0.5, palette.teal, "摩擦力提供向心力");
  if (v.showLimit) label(`最大安全速度 ≈ ${safe.toFixed(1)} m/s`, 46, 52, v.speed <= safe ? palette.teal : palette.coral, "left", 18);
  readout.innerHTML = v.speed <= safe
    ? `所需向心力未超过最大静摩擦力，车辆可以安全转弯。`
    : `当前车速超过安全速度，所需向心力过大，存在侧滑风险。`;
}

function drawTopCar(x, y, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  roundRect(-20, -34, 40, 68, 7, color, palette.ink);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-12, -16, 24, 16);
  ctx.restore();
}

function drawPlanetLaws(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.5, y: h * 0.52 };
  const a = v.semiMajor;
  const b = a * Math.sqrt(1 - v.eccentricity * v.eccentricity);
  const focus = { x: c.x - a * v.eccentricity, y: c.y };
  const theta = state.time * (1.1 + v.eccentricity);
  const x = c.x + a * Math.cos(theta);
  const y = c.y + b * Math.sin(theta);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(c.x, c.y, a, b, 0, 0, TAU);
  ctx.stroke();
  if (v.showArea) {
    ctx.fillStyle = "rgba(242,183,5,0.28)";
    ctx.beginPath();
    ctx.moveTo(focus.x, focus.y);
    ctx.ellipse(c.x, c.y, a, b, 0, theta - 0.35, theta);
    ctx.closePath();
    ctx.fill();
  }
  if (v.showFocus) drawSun(focus.x, focus.y);
  drawPlanet(x, y, palette.blue, "行星");
  label("太阳位于椭圆焦点，而不是中心", 44, 46, palette.ink);
  readout.innerHTML = `偏心率 e = <strong>${v.eccentricity.toFixed(2)}</strong>。近日点附近同样时间扫过近似相等面积，所以行星运动更快。`;
}

function drawSun(x, y) {
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 17, 0, TAU);
  ctx.fill();
  ctx.stroke();
}

function drawPlanet(x, y, color, text) {
  ctx.fillStyle = color;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, TAU);
  ctx.fill();
  ctx.stroke();
  if (text) label(text, x + 14, y - 14, color);
}

function drawGravitation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const cx = w * 0.5;
  const y = h * 0.52;
  const left = { x: cx - v.distance / 2, y };
  const right = { x: cx + v.distance / 2, y };
  if (v.showField) {
    for (let r = 40; r < 180; r += 32) {
      ctx.strokeStyle = "rgba(48,102,190,0.16)";
      ctx.beginPath();
      ctx.arc(left.x, y, r, 0, TAU);
      ctx.arc(right.x, y, r, 0, TAU);
      ctx.stroke();
    }
  }
  drawPlanet(left.x, left.y, palette.blue, "m₁");
  drawPlanet(right.x, right.y, palette.coral, "m₂");
  vector(left, Math.min(140, v.distance / 2 - 20), 0, palette.teal, "F");
  vector(right, -Math.min(140, v.distance / 2 - 20), 0, palette.teal, "F");
  label("大小相等、方向相反，沿连线相互吸引", 44, 48, palette.ink);
  readout.innerHTML = `万有引力与 m₁m₂ 成正比，与 r² 成反比。当前相对强度 F ∝ <strong>${(v.m1 * v.m2 / (v.distance * v.distance) * 10000).toFixed(2)}</strong>。`;
}

function drawGravityAchievements(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.43, y: h * 0.52 };
  const r = clamp(v.orbitRadius * 28, 80, 220);
  const theta = state.time * TAU / Math.max(2, v.period);
  drawSun(c.x, c.y);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(c.x, c.y, r, 0, TAU);
  ctx.stroke();
  drawPlanet(c.x + r * Math.cos(theta), c.y + r * Math.sin(theta), palette.blue, "卫星");
  if (v.showFormula) {
    drawFormulaPanel(["GMm/r² = m4π²r/T²", "M = 4π²r³/(GT²)", "测 r、T 可估算中心天体质量"]);
  }
  readout.innerHTML = `轨道半径和周期可观测，代入圆周运动与万有引力关系，可反推出中心天体质量，且卫星质量 m 会约去。`;
}

function drawSpaceflight(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.42, y: h * 0.56 };
  const earthR = 72;
  ctx.fillStyle = "#8bd2e6";
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(c.x, c.y, earthR, 0, TAU);
  ctx.fill();
  ctx.stroke();
  label("地球", c.x, c.y, palette.ink, "center");
  const start = { x: c.x, y: c.y - earthR - v.altitude * 28 };
  const mode = v.launchSpeed >= 11.2 ? "escape" : v.launchSpeed >= 7.9 ? "orbit" : "fall";
  ctx.save();
  ctx.strokeStyle = mode === "fall" ? palette.coral : mode === "escape" ? palette.purple : palette.teal;
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (mode === "fall") {
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(start.x + 150, start.y - 40, c.x + earthR * 0.75, c.y - earthR * 0.65);
  } else if (mode === "escape") {
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(start.x + 180, start.y - 120, w - 70, 70);
  } else {
    ctx.ellipse(c.x, c.y, earthR + 42 + v.altitude * 28, earthR + 30 + v.altitude * 22, 0, 0, TAU);
  }
  ctx.stroke();
  ctx.restore();
  drawPlanet(start.x, start.y, palette.amber, "飞船");
  vector(start, 110, 0, palette.coral, "发射速度");
  if (v.showThresholds) label("7.9 km/s 近地环绕，11.2 km/s 逃逸", 44, 46, palette.ink);
  readout.innerHTML = `当前速度 <strong>${v.launchSpeed.toFixed(1)} km/s</strong>，轨迹判断：${mode === "fall" ? "落回地面" : mode === "escape" ? "逃逸轨迹" : "绕地轨道"}。`;
}

function drawRelativityLimit(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const gamma = 1 / Math.sqrt(1 - v.beta * v.beta);
  const frame = plotFrame(48, 54, w - 96, h * 0.58, "γ 随 v/c 的变化", "v/c", "γ");
  const points = [];
  for (let i = 0; i <= 100; i += 1) {
    const beta = 0.99 * i / 100;
    const g = 1 / Math.sqrt(1 - beta * beta);
    points.push({ x: frame.x0 + beta / 0.99 * frame.w, y: frame.y0 - clamp((g - 1) / 6, 0, 1) * frame.h });
  }
  plotCurve(frame, points, palette.blue, 3);
  if (v.showNewtonZone) {
    ctx.fillStyle = "rgba(79,157,105,0.18)";
    ctx.fillRect(frame.x0, frame.y0 - frame.h, frame.w * 0.1 / 0.99, frame.h);
    label("低速近似区", frame.x0 + 10, frame.y0 - frame.h + 20, palette.green);
  }
  const px = frame.x0 + v.beta / 0.99 * frame.w;
  const py = frame.y0 - clamp((gamma - 1) / 6, 0, 1) * frame.h;
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(px, py, 7, 0, TAU);
  ctx.fill();
  label(`γ = ${gamma.toFixed(2)}`, px + 12, py - 18, palette.coral);
  readout.innerHTML = `当 v/c = <strong>${v.beta.toFixed(2)}</strong> 时，γ = <strong>${gamma.toFixed(2)}</strong>。低速时牛顿力学是非常好的近似，高速时需要相对论修正。`;
}

function drawWorkPower(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.64;
  const work = v.force * v.distance * Math.cos(toRad(v.angle));
  drawGround(y + 28);
  const x = 90 + wrap(state.time * 48, Math.max(120, w - 260));
  drawBlock(x, y, 90, 54, palette.amber);
  vector({ x, y: y - 34 }, Math.cos(toRad(v.angle)) * 120, -Math.sin(toRad(v.angle)) * 120, palette.coral, "F");
  arrow(x - 40, y + 50, x - 40 + v.distance * 22, y + 50, palette.blue, 3);
  label("位移 l", x - 36 + v.distance * 11, y + 76, palette.blue, "center");
  drawFormulaPanel([`W = Flcosα`, `W = ${work.toFixed(1)} J`, `P = ${(work / v.time).toFixed(1)} W`]);
  readout.innerHTML = `力与位移夹角 α = <strong>${v.angle.toFixed(0)}°</strong>，做功 W = <strong>${work.toFixed(1)} J</strong>。`;
}

function drawPotentialEnergy(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const baseY = h - 70;
  const scale = (h - 150) / 14;
  const zeroY = baseY - (v.zeroLevel + 2) * scale;
  const objY = baseY - (v.height + 2) * scale;
  ctx.strokeStyle = palette.coral;
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(42, zeroY);
  ctx.lineTo(w - 42, zeroY);
  ctx.stroke();
  ctx.setLineDash([]);
  label("零势能面", 52, zeroY - 18, palette.coral);
  if (v.showPaths) {
    ctx.strokeStyle = "rgba(48,102,190,0.45)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.34, baseY);
    ctx.bezierCurveTo(w * 0.18, h * 0.45, w * 0.58, h * 0.45, w * 0.48, objY);
    ctx.stroke();
  }
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w * 0.48, objY, 18, 0, TAU);
  ctx.fill();
  ctx.stroke();
  arrow(w * 0.56, objY, w * 0.56, zeroY, palette.teal, 2);
  label(`h相对=${(v.height - v.zeroLevel).toFixed(1)}m`, w * 0.57, (objY + zeroY) / 2, palette.teal);
  drawEnergyBar(w - 150, baseY, 34, v.mass * G * (v.height - v.zeroLevel), v.mass * G * 14, palette.coral, "Ep");
  readout.innerHTML = `重力势能 Ep = mgh，其中 h 是相对零势能面的高度。当前 Ep = <strong>${(v.mass * G * (v.height - v.zeroLevel)).toFixed(1)} J</strong>。`;
}

function drawKineticTheorem(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.58;
  const work = v.force * v.distance;
  const ek0 = 0.5 * v.mass * v.v0 * v.v0;
  const ek = Math.max(0, ek0 + work);
  const vEnd = Math.sqrt((2 * ek) / v.mass);
  drawGround(y + 28);
  const progress = (Math.sin(state.time * 0.8 - Math.PI / 2) + 1) / 2;
  const x = 80 + progress * Math.min(w - 180, v.distance * 46);
  drawCar(x, y, palette.amber, "小车");
  vector({ x, y: y - 54 }, Math.sign(v.force || 1) * clamp(Math.abs(v.force) * 2.2, 12, 150), 0, v.force >= 0 ? palette.coral : palette.blue, "F合");
  drawEnergyBar(w - 210, h - 76, 34, ek0, Math.max(ek0, ek, 1), palette.blue, "Ek初");
  drawEnergyBar(w - 150, h - 76, 34, ek, Math.max(ek0, ek, 1), palette.coral, "Ek末");
  label(`W合 = ${work.toFixed(1)}J = ΔEk`, 44, 48, palette.teal, "left", 18);
  readout.innerHTML = `合力做功 <strong>${work.toFixed(1)} J</strong>，动能变化 <strong>${(ek - ek0).toFixed(1)} J</strong>，末速度约 <strong>${vEnd.toFixed(1)} m/s</strong>。`;
}

function drawEnergyConservation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const bottom = h - 74;
  const top = 82;
  const progress = (Math.sin(state.time * 0.8 - Math.PI / 2) + 1) / 2;
  const heightNow = v.height * (1 - progress);
  const loss = v.friction * progress * v.mass * G * v.height;
  const total0 = v.mass * G * v.height;
  const ep = v.mass * G * heightNow;
  const ek = Math.max(0, total0 - ep - loss);
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(70, bottom);
  ctx.lineTo(w * 0.62, top);
  ctx.stroke();
  const x = lerp(90, w * 0.6, progress);
  const y = lerp(bottom - 8, top + 8, progress);
  drawBlock(x, y, 60, 38, palette.amber);
  if (v.showBars) {
    drawEnergyBar(w - 220, bottom, 34, ep, total0, palette.coral, "Ep");
    drawEnergyBar(w - 160, bottom, 34, ek, total0, palette.blue, "Ek");
    drawEnergyBar(w - 100, bottom, 34, ep + ek, total0, palette.teal, "E");
  }
  label(v.friction === 0 ? "只有重力做功：机械能守恒" : "存在阻力：机械能减少", 44, 48, v.friction === 0 ? palette.teal : palette.coral, "left", 18);
  readout.innerHTML = `当前 Ep = <strong>${ep.toFixed(0)} J</strong>，Ek = <strong>${ek.toFixed(0)} J</strong>，机械能 E = <strong>${(ep + ek).toFixed(0)} J</strong>。`;
}

function drawEnergyExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const ep = v.mass * G * v.dropHeight;
  const ek = ep * (1 - v.loss);
  const tapeX = w * 0.42;
  const top = 54;
  const bottom = h - 64;
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(tapeX, top);
  ctx.lineTo(tapeX, bottom);
  ctx.stroke();
  if (v.showTape) {
    for (let i = 0; i <= 12; i += 1) {
      const ratio = (i / 12) ** 2;
      const y = top + ratio * (bottom - top);
      ctx.fillStyle = i % 3 === 0 ? palette.coral : palette.ink;
      ctx.beginPath();
      ctx.arc(tapeX, y, 4, 0, TAU);
      ctx.fill();
    }
  }
  const live = (Math.sin(state.time * 0.9 - Math.PI / 2) + 1) / 2;
  const y = top + live * live * (bottom - top);
  drawBlock(tapeX + 80, y + 20, 62, 44, palette.amber);
  drawEnergyBar(w - 220, bottom, 34, ep, Math.max(ep, ek), palette.coral, "ΔEp");
  drawEnergyBar(w - 160, bottom, 34, ek, Math.max(ep, ek), palette.blue, "ΔEk");
  label(`相对误差 ≈ ${(v.loss * 100).toFixed(0)}%`, 44, 54, palette.teal, "left", 18);
  readout.innerHTML = `理想情况下 ΔEp ≈ ΔEk。当前 ΔEp = <strong>${ep.toFixed(2)} J</strong>，ΔEk = <strong>${ek.toFixed(2)} J</strong>。`;
}

function drawEnergyBar(x, baseY, width, value, maxValue, color, text) {
  const height = clamp(Math.abs(value) / Math.max(1, Math.abs(maxValue)) * 150, 0, 150);
  ctx.fillStyle = "rgba(216,224,231,0.7)";
  ctx.fillRect(x, baseY - 150, width, 150);
  ctx.fillStyle = color;
  ctx.fillRect(x, baseY - height, width, height);
  ctx.strokeStyle = palette.line;
  ctx.strokeRect(x, baseY - 150, width, 150);
  label(text, x + width / 2, baseY + 18, color, "center", 12);
}

function drawFormulaPanel(lines) {
  const w = state.width;
  roundRect(w - 300, 48, 252, 34 + lines.length * 26, 8, "rgba(255,255,255,0.92)", palette.line);
  lines.forEach((line, i) => label(line, w - 278, 76 + i * 26, i === 0 ? palette.ink : palette.teal));
}

function materialRho(material) {
  if (material === "iron") return 5.8;
  if (material === "nichrome") return 18;
  return 1.7;
}

function meterLabel(mode) {
  if (mode === "current") return "电流挡";
  if (mode === "resistance") return "电阻挡";
  return "电压挡";
}

function loadLabel(load) {
  if (load === "lamp") return "灯泡";
  if (load === "motor") return "电动机";
  return "电热器";
}

function waveBandLabel(band) {
  if (band === "microwave") return "微波";
  if (band === "visible") return "可见光";
  return "无线电";
}

function drawPlusMinus(x, y, sign, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 4, y);
  ctx.lineTo(x + 4, y);
  if (sign > 0) {
    ctx.moveTo(x, y - 4);
    ctx.lineTo(x, y + 4);
  }
  ctx.stroke();
  ctx.restore();
}

function drawBracket(x1, y1, x2, y2, text) {
  ctx.save();
  ctx.strokeStyle = palette.coral;
  ctx.fillStyle = palette.coral;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1 - 10);
  ctx.lineTo(x1, y1 + 10);
  ctx.moveTo(x2, y2 - 10);
  ctx.lineTo(x2, y2 + 10);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.font = "800 12px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(text, (x1 + x2) / 2, y1 + 14);
  ctx.restore();
}

function drawElectricCharge(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const rodX = w * 0.33;
  const rodY = h * 0.32;
  const scopeX = w * 0.62;
  const scopeY = h * 0.62;
  roundRect(rodX - 22, rodY - 110, 44, 220, 20, v.charge >= 0 ? palette.coral : palette.blue, palette.ink);
  if (v.showCharges) {
    for (let i = 0; i < 10; i += 1) {
      drawPlusMinus(rodX, rodY - 86 + i * 19, Math.sign(v.charge || 1), "rgba(255,255,255,0.28)");
    }
  }
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(scopeX, scopeY - 150);
  ctx.lineTo(scopeX, scopeY - 20);
  ctx.stroke();
  ctx.fillStyle = palette.amber;
  ctx.beginPath();
  ctx.arc(scopeX, scopeY - 150, 20, 0, TAU);
  ctx.fill();
  ctx.stroke();
  const open = clamp(Math.abs(v.charge) * (v.mode === "contact" ? 7 : 4), 6, 52);
  ctx.strokeStyle = palette.teal;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(scopeX, scopeY - 20);
  ctx.lineTo(scopeX - open, scopeY + 70);
  ctx.moveTo(scopeX, scopeY - 20);
  ctx.lineTo(scopeX + open, scopeY + 70);
  ctx.stroke();
  if (v.showCharges) {
    for (let i = 0; i < 8; i += 1) {
      drawPlusMinus(scopeX - 60 + i * 18, scopeY - 152, v.mode === "contact" ? Math.sign(v.charge || 1) : -Math.sign(v.charge || 1), palette.teal);
    }
  }
  label(v.mode === "contact" ? "接触后验电器带同种电荷" : "感应时电荷重新分布，总量可不变", 44, 48, palette.ink);
  readout.innerHTML = `电荷守恒是核心。当前演示为 <strong>${v.mode === "contact" ? "接触带电" : "静电感应"}</strong>，金属箔张角反映同种电荷排斥。`;
}

function drawCoulombLaw(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.5, y: h * 0.52 };
  const p1 = { x: c.x - v.distance / 2, y: c.y };
  const p2 = { x: c.x + v.distance / 2, y: c.y };
  const same = v.q1 * v.q2 > 0;
  drawPlusMinus(p1.x, p1.y, Math.sign(v.q1 || 1), v.q1 >= 0 ? palette.coral : palette.blue);
  drawPlusMinus(p2.x, p2.y, Math.sign(v.q2 || 1), v.q2 >= 0 ? palette.coral : palette.blue);
  const force = Math.abs(v.q1 * v.q2) / (v.distance * v.distance) * 12000;
  const len = clamp(force * 8, 22, 130);
  vector(p1, same ? -len : len, 0, palette.teal, "F");
  vector(p2, same ? len : -len, 0, palette.teal, "F");
  drawBracket(p1.x, c.y + 70, p2.x, c.y + 70, `r = ${v.distance.toFixed(0)} px`);
  if (v.showFormula) drawFormulaPanel(["F = kq₁q₂/r²", same ? "同种电荷相斥" : "异种电荷相吸", `相对强度 ${force.toFixed(2)}`]);
  readout.innerHTML = `两个点电荷的库仑力大小相等、方向相反。当前表现为 <strong>${same ? "相互排斥" : "相互吸引"}</strong>。`;
}

function drawElectricField(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const center = { x: w * 0.43, y: h * 0.52 };
  const test = { x: center.x + v.testX * w * 0.38, y: center.y - 18 };
  if (v.showLines) {
    const sign = Math.sign(v.sourceCharge || 1);
    for (let i = 0; i < 18; i += 1) {
      const a = (TAU * i) / 18;
      const r1 = 36;
      const r2 = 190;
      const from = sign > 0 ? { x: center.x + r1 * Math.cos(a), y: center.y + r1 * Math.sin(a) } : { x: center.x + r2 * Math.cos(a), y: center.y + r2 * Math.sin(a) };
      const to = sign > 0 ? { x: center.x + r2 * Math.cos(a), y: center.y + r2 * Math.sin(a) } : { x: center.x + r1 * Math.cos(a), y: center.y + r1 * Math.sin(a) };
      arrow(from.x, from.y, to.x, to.y, "rgba(48,102,190,0.48)", 1.4);
    }
  }
  drawPlusMinus(center.x, center.y, Math.sign(v.sourceCharge || 1), v.sourceCharge >= 0 ? palette.coral : palette.blue);
  drawPlusMinus(test.x, test.y, Math.sign(v.testCharge || 1), v.testCharge >= 0 ? palette.coral : palette.blue);
  const dx = test.x - center.x;
  const dy = test.y - center.y;
  const r = Math.hypot(dx, dy) || 1;
  const eDir = Math.sign(v.sourceCharge || 1);
  vector(test, (dx / r) * 80 * eDir * Math.sign(v.testCharge || 1), (dy / r) * 80 * eDir * Math.sign(v.testCharge || 1), palette.teal, "F=qE");
  label("电场线方向定义为正试探电荷受力方向", 44, 46, palette.ink);
  readout.innerHTML = `试探电荷受力 F = qE。若试探电荷为负，受力方向与电场方向相反。`;
}

function drawElectrostaticUse(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  if (v.useMode === "shield") {
    roundRect(w * 0.33, h * 0.28, w * 0.34, h * 0.42, 8, "rgba(216,224,231,0.35)", palette.ink);
    for (let y = h * 0.18; y < h * 0.82; y += 34) {
      arrow(60, y, w * 0.3, y, "rgba(48,102,190,0.55)", 1.6);
      arrow(w * 0.7, y, w - 60, y, "rgba(48,102,190,0.55)", 1.6);
    }
    label("金属壳内部 E≈0", w * 0.5, h * 0.5, palette.teal, "center", 18);
  } else if (v.useMode === "dust") {
    for (let i = 0; i < 22; i += 1) {
      const x = 70 + (i % 11) * 58;
      const y = 100 + Math.floor(i / 11) * 180 + Math.sin(state.time + i) * 24;
      drawPlusMinus(x, y, -1, palette.blue);
      arrow(x, y, w - 90, h * 0.5, "rgba(15,139,141,0.26)", 1.2);
    }
    roundRect(w - 94, 70, 28, h - 140, 4, palette.coral, palette.ink);
    label("集尘极", w - 112, h * 0.5, palette.coral, "right");
  } else {
    ctx.fillStyle = "#637081";
    ctx.fillRect(0, 0, w, 80);
    for (let i = 0; i < 22; i += 1) drawPlusMinus(40 + i * 42, 42, -1, palette.blue);
    const baseY = h - 70;
    drawGround(baseY);
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, baseY);
    ctx.lineTo(w * 0.5, h * 0.34);
    ctx.lineTo(w * 0.5 - 12, h * 0.38);
    ctx.moveTo(w * 0.5, h * 0.34);
    ctx.lineTo(w * 0.5 + 12, h * 0.38);
    ctx.stroke();
    for (let i = 0; i < v.cloudCharge; i += 1) arrow(w * 0.5 - 80 + i * 18, 90, w * 0.5, h * 0.34, "rgba(242,183,5,0.65)", 1.5);
    label("尖端放电把危险电荷引入大地", 44, 112, palette.ink);
  }
  readout.innerHTML = `静电既可能造成危害，也能被利用。当前场景：<strong>${v.useMode === "shield" ? "静电屏蔽" : v.useMode === "dust" ? "静电除尘" : "避雷针"}</strong>。`;
}

function drawElectricPotential(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const left = 80;
  const right = w - 90;
  const y = h * 0.52;
  for (let x = left; x < right; x += 46) arrow(x, 94, x + 28, 94, "rgba(48,102,190,0.6)", 1.5);
  if (v.showEquipotential) {
    for (let i = 0; i < 8; i += 1) {
      const x = left + ((right - left) * i) / 7;
      ctx.strokeStyle = "rgba(232,93,79,0.42)";
      ctx.setLineDash([6, 7]);
      ctx.beginPath();
      ctx.moveTo(x, 120);
      ctx.lineTo(x, h - 88);
      ctx.stroke();
      ctx.setLineDash([]);
      label(`${(10 * (1 - i / 7)).toFixed(0)}V`, x, h - 64, palette.coral, "center", 11);
    }
  }
  const x = left + (right - left) * v.position;
  drawPlusMinus(x, y, Math.sign(v.charge || 1), v.charge >= 0 ? palette.coral : palette.blue);
  vector({ x, y }, Math.sign(v.charge * v.field || 1) * 90, 0, palette.teal, "F");
  drawFormulaPanel(["Ep = qφ", "沿电场方向电势降低", `Ep ∝ ${(v.charge * v.field * (1 - v.position)).toFixed(1)}`]);
  readout.innerHTML = `电势是电场的能量性质。当前试探电荷的电势能相对量为 <strong>${(v.charge * v.field * (1 - v.position)).toFixed(1)}</strong>。`;
}

function drawPotentialDifference(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const left = 76;
  const right = w - 76;
  const y = h * 0.5;
  arrow(left, y, right, y, palette.muted, 2);
  const ax = left + (right - left) * v.pointA;
  const bx = left + (right - left) * v.pointB;
  const phiA = 10 * (1 - v.pointA) + v.zero;
  const phiB = 10 * (1 - v.pointB) + v.zero;
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(ax, y, 12, 0, TAU);
  ctx.arc(bx, y, 12, 0, TAU);
  ctx.fill();
  label("A", ax, y - 30, palette.coral, "center", 16);
  label("B", bx, y - 30, palette.coral, "center", 16);
  drawBracket(ax, y + 54, bx, y + 54, `UAB = ${(phiA - phiB).toFixed(1)} V`);
  drawFormulaPanel([`φA=${phiA.toFixed(1)}V`, `φB=${phiB.toFixed(1)}V`, `W=qU=${(v.charge * (phiA - phiB)).toFixed(1)}`]);
  readout.innerHTML = `电势会随零点改变而整体平移，但电势差 UAB = φA - φB 与零点选择无关。`;
}

function drawFieldPotentialRelation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const cx = w * 0.5;
  const y1 = h * 0.22;
  const y2 = h * 0.78;
  const x1 = cx - v.distance / 2;
  const x2 = cx + v.distance / 2;
  roundRect(x1 - 12, y1, 24, y2 - y1, 3, palette.coral, palette.ink);
  roundRect(x2 - 12, y1, 24, y2 - y1, 3, palette.blue, palette.ink);
  for (let y = y1 + 28; y < y2; y += 34) arrow(x1 + 22, y, x2 - 22, y, "rgba(48,102,190,0.58)", 1.6);
  if (v.showEquipotential) {
    for (let i = 1; i < 5; i += 1) {
      const x = x1 + ((x2 - x1) * i) / 5;
      ctx.strokeStyle = "rgba(232,93,79,0.42)";
      ctx.setLineDash([5, 7]);
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  drawBracket(x1, y2 + 34, x2, y2 + 34, `d = ${v.distance.toFixed(0)} px`);
  drawFormulaPanel(["U = Ed", `E=${v.field.toFixed(1)}`, `U∝${(v.field * v.distance / 100).toFixed(1)}`]);
  readout.innerHTML = `匀强电场中沿电场方向的电势差 U = Ed；等势面与电场线垂直。`;
}

function drawCapacitor(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const cx = w * 0.48;
  const y1 = h * 0.25;
  const y2 = h * 0.75;
  const plateH = 95 + v.area * 28;
  const x1 = cx - v.distance / 2;
  const x2 = cx + v.distance / 2;
  roundRect(x1 - 10, h * 0.5 - plateH / 2, 20, plateH, 4, palette.coral, palette.ink);
  roundRect(x2 - 10, h * 0.5 - plateH / 2, 20, plateH, 4, palette.blue, palette.ink);
  ctx.fillStyle = `rgba(242,183,5,${0.08 + v.dielectric * 0.045})`;
  ctx.fillRect(x1 + 10, h * 0.5 - plateH / 2, x2 - x1 - 20, plateH);
  for (let y = y1; y <= y2; y += 24) arrow(x1 + 24, y, x2 - 24, y, "rgba(48,102,190,0.45)", 1.2);
  const c = v.dielectric * v.area / (v.distance / 100);
  drawFormulaPanel(["C = Q/U", "C ∝ εS/d", `Q∝CU=${(c * v.voltage).toFixed(1)}`]);
  readout.innerHTML = `增大面积或介电常数会增大电容，增大板间距会减小电容。当前相对电容 C ∝ <strong>${c.toFixed(2)}</strong>。`;
}

function drawParticleElectricField(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const x0 = 72;
  const y0 = h * 0.5;
  const plateTop = h * 0.25;
  const plateBottom = h * 0.75;
  roundRect(60, plateTop - 12, w - 120, 16, 4, palette.coral, palette.ink);
  roundRect(60, plateBottom - 4, w - 120, 16, 4, palette.blue, palette.ink);
  const a = v.charge * v.field / v.mass;
  const T = 4.2;
  const t = wrap(state.time, T);
  const scale = Math.min(48, (w - 160) / (v.speed * T));
  const x = x0 + v.speed * t * scale;
  const y = y0 + 0.5 * a * t * t * scale;
  ctx.strokeStyle = palette.blue;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 120; i += 1) {
    const ti = (T * i) / 120;
    const px = x0 + v.speed * ti * scale;
    const py = y0 + 0.5 * a * ti * ti * scale;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  drawPlusMinus(x, clamp(y, plateTop + 24, plateBottom - 24), Math.sign(v.charge || 1), v.charge >= 0 ? palette.coral : palette.blue);
  drawFormulaPanel(["F=qE", "a=qE/m", `a=${a.toFixed(2)}`]);
  readout.innerHTML = `粒子在电场中受恒力 F=qE，水平匀速、竖直匀加速，轨迹类似平抛。`;
}

function drawSourceCurrent(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  drawCircuitLoop(w, h, v.closed);
  const i = v.closed ? v.voltage / v.resistance : 0;
  if (v.showElectrons && v.closed) drawMovingDots(w, h, i, palette.blue);
  drawFormulaPanel(["I = q/t", "持续电流：闭合回路 + 电源", `I=${i.toFixed(2)}A`]);
  readout.innerHTML = `电源维持电路两端电势差。当前开关 <strong>${v.closed ? "闭合" : "断开"}</strong>，电流 I = <strong>${i.toFixed(2)} A</strong>。`;
}

function drawCircuitLoop(w, h, closed = true) {
  const x1 = 110;
  const x2 = w - 170;
  const y1 = h * 0.28;
  const y2 = h * 0.7;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y1);
  ctx.lineTo(x2, y2);
  if (closed) ctx.lineTo(x1, y2);
  else {
    ctx.lineTo((x1 + x2) / 2 - 30, y2);
    ctx.moveTo((x1 + x2) / 2 + 30, y2);
    ctx.lineTo(x1, y2);
  }
  ctx.lineTo(x1, y1);
  ctx.stroke();
  roundRect(x1 - 28, (y1 + y2) / 2 - 46, 56, 92, 5, palette.amber, palette.ink);
  label("+", x1, (y1 + y2) / 2 - 20, palette.ink, "center", 18);
  label("-", x1, (y1 + y2) / 2 + 22, palette.ink, "center", 18);
  roundRect(x2 - 34, (y1 + y2) / 2 - 34, 68, 68, 6, "#f8fafc", palette.ink);
  label("R", x2, (y1 + y2) / 2, palette.ink, "center", 18);
}

function drawMovingDots(w, h, speed, color) {
  const points = [
    [110, h * 0.28, w - 170, h * 0.28],
    [w - 170, h * 0.28, w - 170, h * 0.7],
    [w - 170, h * 0.7, 110, h * 0.7],
    [110, h * 0.7, 110, h * 0.28],
  ];
  const phase = state.time * Math.max(0.4, speed) * 0.22;
  for (let i = 0; i < 18; i += 1) {
    const p = (phase + i / 18) % 1;
    const seg = Math.floor(p * 4);
    const local = p * 4 - seg;
    const [x1, y1, x2, y2] = points[seg];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(lerp(x1, x2, local), lerp(y1, y2, local), 5, 0, TAU);
    ctx.fill();
  }
}

function drawResistance(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const rho = materialRho(v.material);
  const r = rho * v.length / v.area;
  const wireW = 90 + v.length * 40;
  const wireH = 20 + v.area * 7;
  roundRect(w * 0.5 - wireW / 2, h * 0.48 - wireH / 2, wireW, wireH, 14, v.material === "copper" ? palette.amber : v.material === "iron" ? "#9aa3ad" : palette.coral, palette.ink);
  for (let i = 0; i < 16; i += 1) arrow(w * 0.5 - wireW / 2 + 20 + i * (wireW - 40) / 15, h * 0.48, w * 0.5 - wireW / 2 + 28 + i * (wireW - 40) / 15, h * 0.48, "rgba(255,255,255,0.7)", 1);
  drawFormulaPanel(["R = ρl/S", `R=${r.toFixed(2)}Ω`, `I=${(v.voltage / r).toFixed(2)}A`]);
  readout.innerHTML = `电阻由材料、长度和横截面积共同决定。当前材料电阻率相对值 ρ = <strong>${rho.toFixed(1)}</strong>。`;
}

function drawResistivityExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const frame = plotFrame(54, 46, w - 108, h * 0.58, "U-I 图像", "I/A", "U/V");
  const points = [];
  for (let i = 1; i <= 7; i += 1) {
    const current = i * 0.18;
    const noise = Math.sin(i * 1.7) * 0.08;
    const voltage = v.sampleR * current + noise;
    points.push({ x: frame.x0 + current / 1.4 * frame.w, y: frame.y0 - voltage / (v.sampleR * 1.4) * frame.h });
  }
  points.forEach((p) => {
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, TAU);
    ctx.fill();
  });
  if (v.showFit) plotCurve(frame, [points[0], points[points.length - 1]], palette.teal, 2.5);
  const area = Math.PI * (v.diameter / 2) ** 2;
  drawFormulaPanel(["R=U/I", "ρ=RS/l", `ρ∝${(v.sampleR * area / v.length).toFixed(2)}`]);
  readout.innerHTML = `由 U-I 图像斜率求 R，再结合长度和横截面积求电阻率。当前相对 ρ = <strong>${(v.sampleR * area / v.length).toFixed(2)}</strong>。`;
}

function drawSeriesParallel(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const rEq = v.circuitMode === "series" ? v.r1 + v.r2 : 1 / (1 / v.r1 + 1 / v.r2);
  drawCircuitLoop(w, h, true);
  if (v.circuitMode === "series") {
    roundRect(w * 0.38, h * 0.28 - 22, 70, 44, 5, "#fff", palette.ink);
    roundRect(w * 0.55, h * 0.28 - 22, 70, 44, 5, "#fff", palette.ink);
    label("R₁", w * 0.38 + 35, h * 0.28, palette.ink, "center");
    label("R₂", w * 0.55 + 35, h * 0.28, palette.ink, "center");
  } else {
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.36, h * 0.36);
    ctx.lineTo(w * 0.62, h * 0.36);
    ctx.moveTo(w * 0.36, h * 0.58);
    ctx.lineTo(w * 0.62, h * 0.58);
    ctx.stroke();
    roundRect(w * 0.45, h * 0.36 - 22, 70, 44, 5, "#fff", palette.ink);
    roundRect(w * 0.45, h * 0.58 - 22, 70, 44, 5, "#fff", palette.ink);
    label("R₁", w * 0.45 + 35, h * 0.36, palette.ink, "center");
    label("R₂", w * 0.45 + 35, h * 0.58, palette.ink, "center");
  }
  drawFormulaPanel([v.circuitMode === "series" ? "串联：R=R₁+R₂" : "并联：1/R=1/R₁+1/R₂", `R等=${rEq.toFixed(2)}Ω`, `I=${(v.voltage / rEq).toFixed(2)}A`]);
  readout.innerHTML = `当前为 <strong>${v.circuitMode === "series" ? "串联" : "并联"}</strong>。等效电阻 R = <strong>${rEq.toFixed(2)} Ω</strong>。`;
}

function drawMultimeter(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const cx = w * 0.46;
  const cy = h * 0.52;
  roundRect(cx - 130, cy - 160, 260, 320, 8, "#26333f", palette.ink);
  roundRect(cx - 96, cy - 130, 192, 92, 6, "#e9f3e8", palette.ink);
  const safe = v.trueValue <= v.range * 1.6;
  label(v.properConnection ? `${v.trueValue.toFixed(1)}` : "接法错误", cx, cy - 84, safe ? palette.ink : palette.coral, "center", 28);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy + 46, 68, Math.PI * 0.85, Math.PI * 2.15);
  ctx.stroke();
  const angle = Math.PI * 0.85 + clamp(v.trueValue / (v.range * 1.6), 0, 1.2) * Math.PI * 1.3;
  arrow(cx, cy + 46, cx + Math.cos(angle) * 64, cy + 46 + Math.sin(angle) * 64, palette.coral, 3);
  label(meterLabel(v.meterMode), cx, cy + 138, palette.amber, "center", 18);
  drawFormulaPanel(["电压并联", "电流串联", "电阻断电测量"]);
  readout.innerHTML = `当前选择 <strong>${meterLabel(v.meterMode)}</strong>。测量前要先选合适量程，再按对应方式接入电路。`;
}

function drawCircuitEnergy(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const power = v.current * v.current * v.resistance;
  drawCircuitLoop(w, h, true);
  const loadColor = v.load === "heater" ? palette.coral : v.load === "lamp" ? palette.amber : palette.teal;
  roundRect(w * 0.64, h * 0.42, 100, 88, 8, loadColor, palette.ink);
  label(loadLabel(v.load), w * 0.64 + 50, h * 0.46, palette.ink, "center");
  drawEnergyBar(w - 220, h - 76, 34, power * v.time, Math.max(1, 6 * 6 * 30 * 20), palette.coral, "Q");
  drawFormulaPanel(["P=UI", "Q=I²Rt", `Q=${(power * v.time).toFixed(0)}J`]);
  readout.innerHTML = `电流通过用电器时发生能量转化。当前焦耳热 Q = <strong>${(power * v.time).toFixed(0)} J</strong>。`;
}

function drawClosedCircuit(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const i = v.emf / (v.externalR + v.internalR);
  drawCircuitLoop(w, h, true);
  drawFormulaPanel(["I=E/(R+r)", `U端=${(v.emf - i * v.internalR).toFixed(2)}V`, `I=${i.toFixed(2)}A`]);
  if (v.showPower) {
    drawEnergyBar(w - 220, h - 76, 34, i * i * v.externalR, Math.max(1, v.emf * v.emf / Math.max(0.2, v.internalR)), palette.teal, "P外");
    drawEnergyBar(w - 160, h - 76, 34, i * i * v.internalR, Math.max(1, v.emf * v.emf / Math.max(0.2, v.internalR)), palette.coral, "P内");
  }
  readout.innerHTML = `闭合电路中 E = U外 + Ir。当前端电压为 <strong>${(v.emf - i * v.internalR).toFixed(2)} V</strong>。`;
}

function drawBatteryExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const frame = plotFrame(54, 46, w - 108, h * 0.62, "U-I 图像", "I/A", "U/V");
  const points = [];
  for (let i = 0; i <= 7; i += 1) {
    const current = i * 0.4;
    const noise = v.showError ? Math.sin(i * 1.9) * 0.08 : 0;
    const voltage = v.emf - v.internalR * current + noise;
    points.push({ x: frame.x0 + current / 3 * frame.w, y: frame.y0 - voltage / Math.max(1, v.emf) * frame.h });
  }
  points.forEach((p) => {
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, TAU);
    ctx.fill();
  });
  if (v.showFit) plotCurve(frame, [points[0], points[points.length - 1]], palette.teal, 2.5);
  drawFormulaPanel(["U=E-Ir", "截距 E", "斜率 -r"]);
  readout.innerHTML = `U-I 图像纵截距为电动势 E，斜率绝对值为内阻 r。`;
}

function drawEnergySustainability(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const output = v.inputEnergy * v.efficiency / 100;
  const loss = v.inputEnergy - output;
  const y = h * 0.48;
  const labels = v.source === "solar" ? ["太阳辐射", "电能", "用电"] : v.source === "wind" ? ["风能", "机械能", "电能"] : ["化学能", "内能", "电能"];
  labels.forEach((text, i) => {
    roundRect(70 + i * 190, y - 48, 126, 96, 8, i === 0 ? palette.amber : i === 1 ? palette.teal : palette.blue, palette.ink);
    label(text, 133 + i * 190, y, palette.ink, "center");
    if (i < 2) arrow(202 + i * 190, y, 250 + i * 190, y, palette.muted, 3);
  });
  drawEnergyBar(w - 210, h - 76, 34, output, v.inputEnergy, palette.teal, "输出");
  if (v.showLoss) drawEnergyBar(w - 150, h - 76, 34, loss, v.inputEnergy, palette.coral, "损耗");
  readout.innerHTML = `能量守恒但能量转化具有方向性。当前有用输出 <strong>${output.toFixed(0)}</strong>，损耗 <strong>${loss.toFixed(0)}</strong>。`;
}

function drawMagneticFieldLines(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const cx = w * 0.5;
  const cy = h * 0.52;
  roundRect(cx - 140, cy - 34, 280, 68, 8, "#f8fafc", palette.ink);
  roundRect(cx - 140, cy - 34, 140, 68, 8, palette.coral, palette.ink);
  roundRect(cx, cy - 34, 140, 68, 8, palette.blue, palette.ink);
  label("N", cx - 70, cy, "#fff", "center", 22);
  label("S", cx + 70, cy, "#fff", "center", 22);
  if (v.showLines) {
    for (let i = 0; i < 7; i += 1) {
      const off = (i - 3) * 28;
      ctx.strokeStyle = "rgba(15,139,141,0.55)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 145, cy + off);
      ctx.bezierCurveTo(cx - 220, cy + off - 95, cx + 220, cy + off - 95, cx + 145, cy + off);
      ctx.stroke();
    }
  }
  const pa = toRad(v.probeAngle);
  const px = cx + 210 * Math.cos(pa);
  const py = cy + 140 * Math.sin(pa);
  arrow(px - 30, py, px + 30, py, palette.amber, 4);
  label("小磁针 N 极指向磁场方向", 44, 46, palette.ink);
  readout.innerHTML = `磁感线用于形象描述磁场，切线方向表示磁场方向，疏密表示强弱。`;
}

function drawMagneticFlux(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const cx = w * 0.47;
  const cy = h * 0.52;
  for (let x = 70; x < w - 70; x += 36) arrow(x, 80, x, h - 80, "rgba(48,102,190,0.48)", 1.3);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(toRad(v.angle));
  roundRect(-90 * v.area / 2, -55, 90 * v.area, 110, 6, "rgba(242,183,5,0.25)", palette.ink);
  if (v.showNormal) vector({ x: 0, y: 0 }, 0, -100, palette.coral, "法线");
  ctx.restore();
  drawFormulaPanel(["Φ=BS cosθ", `Φ=${(v.B * v.area * Math.cos(toRad(v.angle))).toFixed(2)}`, "θ为B与法线夹角"]);
  readout.innerHTML = `磁通量描述穿过某面积的磁场多少。当前 Φ = <strong>${(v.B * v.area * Math.cos(toRad(v.angle))).toFixed(2)}</strong>。`;
}

function drawInduction(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const coilX = w * 0.58;
  const coilY = h * 0.5;
  const magnetX = coilX - 220 + Math.sin(state.time * Math.sign(v.magnetSpeed || 1) * Math.abs(v.magnetSpeed) * 0.7) * 110;
  for (let i = 0; i < 8; i += 1) {
    ctx.strokeStyle = palette.teal;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(coilX + i * 4, coilY, 42, 105, 0, 0, TAU);
    ctx.stroke();
  }
  roundRect(magnetX - 70, coilY - 28, 140, 56, 8, "#fff", palette.ink);
  roundRect(magnetX - 70, coilY - 28, 70, 56, 8, palette.coral, palette.ink);
  roundRect(magnetX, coilY - 28, 70, 56, 8, palette.blue, palette.ink);
  label("N", magnetX - 35, coilY, "#fff", "center", 18);
  label("S", magnetX + 35, coilY, "#fff", "center", 18);
  const current = v.closed ? v.magnetSpeed * v.turns / 20 : 0;
  arrow(coilX + 84, coilY, coilX + 84, coilY - clamp(current * 18, -90, 90), current >= 0 ? palette.coral : palette.blue, 3);
  if (v.showFlux) label(`磁通变化率 ∝ ${v.magnetSpeed.toFixed(1)}`, 44, 52, palette.ink, "left", 18);
  readout.innerHTML = `闭合回路中磁通量变化会产生感应电流。当前感应电流相对值 <strong>${current.toFixed(1)}</strong>。`;
}

function drawEMWave(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const mid = h * 0.52;
  const amp = v.amplitude;
  const lambda = 220 / v.frequency;
  ctx.strokeStyle = palette.blue;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 40; x < w - 40; x += 3) {
    const y = mid + amp * Math.sin(TAU * (x / lambda - state.time * 0.4));
    if (x === 40) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.strokeStyle = palette.coral;
  ctx.beginPath();
  for (let x = 40; x < w - 40; x += 3) {
    const y = mid + amp * 0.62 * Math.cos(TAU * (x / lambda - state.time * 0.4));
    if (x === 40) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  if (v.showVectors) {
    vector({ x: 90, y: h - 62 }, 90, 0, palette.teal, "传播");
    vector({ x: 90, y: h - 62 }, 0, -62, palette.blue, "E");
    vector({ x: 90, y: h - 62 }, 54, 42, palette.coral, "B");
  }
  drawFormulaPanel(["c = λf", `λ∝${(1 / v.frequency).toFixed(2)}`, waveBandLabel(v.band)]);
  readout.innerHTML = `电磁波可在真空中传播，电场、磁场和传播方向两两垂直。当前频段：<strong>${waveBandLabel(v.band)}</strong>。`;
}

function drawQuantization(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const x1 = 90;
  const x2 = w - 190;
  const baseY = h - 84;
  const gap = 62;
  for (let i = 1; i <= 5; i += 1) {
    const y = baseY - i * gap;
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
    label(`E${i}`, x1 - 18, y, palette.muted, "right");
  }
  const a = Math.round(v.levelA);
  const b = Math.round(v.levelB);
  const ya = baseY - a * gap;
  const yb = baseY - b * gap;
  vector({ x: w * 0.44, y: ya }, 0, yb - ya, palette.coral, "跃迁");
  const need = Math.abs(b - a);
  if (v.showPhoton) {
    for (let i = 0; i < 4; i += 1) {
      const x = 80 + i * 42 + (state.time * 40) % 42;
      ctx.strokeStyle = palette.amber;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let j = 0; j < 20; j += 1) {
        const px = x + j * 4;
        const py = h * 0.25 + Math.sin(j * 0.8) * 10;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }
  drawFormulaPanel(["E = hν", `ΔE=${need}`, `hν∝${v.frequency.toFixed(1)}`]);
  readout.innerHTML = Math.abs(v.frequency - need) < 0.25
    ? `入射光子能量与能级差匹配，可以发生跃迁。`
    : `能量不匹配时不能被原子连续吸收，这体现了能量量子化。`;
}

function drawMomentumBasic(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.6;
  const travel = clamp(v.velocity * state.time * 34, -(w - 250), w - 250);
  const x = w * 0.5 + travel;
  drawGround(y + 28);
  drawCar(x, y, palette.amber, "研究对象");
  if (v.showVector) vector({ x, y: y - 56 }, Math.sign(v.velocity || 1) * clamp(Math.abs(v.mass * v.velocity) * 12, 18, 150), 0, palette.coral, `p=${(v.mass * v.velocity).toFixed(1)}`);
  drawFormulaPanel(["p = mv", "动量是矢量", `方向同 v`]);
  readout.innerHTML = `动量由质量和速度共同决定。当前 p = <strong>${(v.mass * v.velocity).toFixed(1)} kg·m/s</strong>。`;
}

function drawImpulseTheorem(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const impulse = v.mass * (v.v1 - v.v0);
  const force = impulse / v.time;
  const frame = plotFrame(48, 44, w - 96, h * 0.52, "F-t 图像：面积表示冲量", "t/s", "F/N");
  const yZero = frame.y0 - (0.5 * frame.h);
  const yForce = yZero - clamp(force / 80, -0.45, 0.45) * frame.h;
  ctx.fillStyle = force >= 0 ? "rgba(15,139,141,0.22)" : "rgba(232,93,79,0.22)";
  ctx.fillRect(frame.x0, Math.min(yZero, yForce), frame.w * (v.time / 2), Math.abs(yForce - yZero));
  plotCurve(frame, [
    { x: frame.x0, y: yForce },
    { x: frame.x0 + frame.w * (v.time / 2), y: yForce },
  ], force >= 0 ? palette.teal : palette.coral, 4);
  label(`I = Δp = ${impulse.toFixed(1)} N·s`, 52, h - 92, palette.teal, "left", 18);
  label(`F均 = ${force.toFixed(1)} N`, 52, h - 60, palette.coral, "left", 18);
  readout.innerHTML = `同样的动量变化，作用时间越长，平均力越小。当前冲量 I = <strong>${impulse.toFixed(1)} N·s</strong>。`;
}

function drawMomentumConservation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.6;
  const p = v.m1 * v.v1 + v.m2 * v.v2;
  const phase = clamp(state.time / 1.5, 0, 1);
  const x1 = w * 0.34 + (v.v1 * phase * 34);
  const x2 = w * 0.66 + (v.v2 * phase * 34);
  drawGround(y + 28);
  drawCar(x1, y, palette.blue, "车1");
  drawCar(x2, y, palette.coral, "车2");
  vector({ x: x1, y: y - 58 }, v.v1 * 18, 0, palette.blue, "p₁");
  vector({ x: x2, y: y - 58 }, v.v2 * 18, 0, palette.coral, "p₂");
  drawEnergyBar(w - 190, h - 70, 34, p, Math.max(1, Math.abs(p), 20), palette.teal, "p总");
  if (v.external > 0) vector({ x: w * 0.5, y: y + 62 }, v.external * 24, 0, palette.purple, "外力");
  readout.innerHTML = v.external === 0
    ? `系统合外力为零，总动量 <strong>${p.toFixed(1)}</strong> 在碰撞前后保持不变。`
    : `存在外力扰动时，系统总动量会随外力冲量改变，守恒条件被破坏。`;
}

function drawMomentumExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const pBefore = v.m1 * v.v1;
  const pAfter = pBefore * (1 - v.error / 100);
  drawGround(h * 0.46);
  drawCar(w * 0.34, h * 0.42, palette.blue, "入射车");
  drawCar(w * 0.62, h * 0.42, palette.coral, "被碰车");
  const frame = plotFrame(54, h * 0.55, w - 108, h * 0.34, "实验记录：p前 与 p后", "实验序号", "p");
  for (let i = 0; i < 6; i += 1) {
    const err = Math.sin(i * 1.8) * v.error / 100;
    const point = pBefore * (1 - err);
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(frame.x0 + (i / 5) * frame.w, frame.y0 - (point / Math.max(1, pBefore * 1.2)) * frame.h, 5, 0, TAU);
    ctx.fill();
  }
  label(`p前=${pBefore.toFixed(2)}, p后≈${pAfter.toFixed(2)}`, 54, 52, palette.teal, "left", 18);
  readout.innerHTML = `实验中 p后 与 p前 接近即可验证动量守恒。当前相对误差设置为 <strong>${v.error.toFixed(0)}%</strong>。`;
}

function collisionResult(v) {
  const p = v.m1 * v.v1 + v.m2 * v.v2;
  if (v.collisionMode === "sticky") {
    const vf = p / (v.m1 + v.m2);
    return { u1: vf, u2: vf };
  }
  const elasticU1 = ((v.m1 - v.m2) / (v.m1 + v.m2)) * v.v1 + (2 * v.m2 / (v.m1 + v.m2)) * v.v2;
  const elasticU2 = (2 * v.m1 / (v.m1 + v.m2)) * v.v1 + ((v.m2 - v.m1) / (v.m1 + v.m2)) * v.v2;
  if (v.collisionMode === "elastic") return { u1: elasticU1, u2: elasticU2 };
  const vf = p / (v.m1 + v.m2);
  return { u1: lerp(elasticU1, vf, 0.55), u2: lerp(elasticU2, vf, 0.55) };
}

function drawCollisionTypes(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.56;
  const res = collisionResult(v);
  const t = Math.min(state.time, 4);
  const before = t < 2;
  const x1 = before ? w * 0.28 + v.v1 * t * 26 : w * 0.48 + res.u1 * (t - 2) * 26;
  const x2 = before ? w * 0.72 + v.v2 * t * 26 : w * 0.52 + res.u2 * (t - 2) * 26;
  drawGround(y + 28);
  drawCar(x1, y, palette.blue, "1");
  drawCar(x2, y, palette.coral, "2");
  const ek0 = 0.5 * v.m1 * v.v1 ** 2 + 0.5 * v.m2 * v.v2 ** 2;
  const ek1 = 0.5 * v.m1 * res.u1 ** 2 + 0.5 * v.m2 * res.u2 ** 2;
  drawEnergyBar(w - 210, h - 72, 34, ek0, Math.max(ek0, ek1, 1), palette.blue, "Ek前");
  drawEnergyBar(w - 150, h - 72, 34, ek1, Math.max(ek0, ek1, 1), palette.coral, "Ek后");
  readout.innerHTML = `动量守恒不等于机械能一定守恒。当前碰撞后动能约为碰前的 <strong>${(ek1 / ek0 * 100).toFixed(0)}%</strong>。`;
}

function drawRecoilRocket(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const thrust = v.exhaustSpeed * v.flowRate;
  const a = thrust / v.rocketMass;
  const x = 90 + clamp(0.5 * a * state.time ** 2 * 120, 0, w - 180);
  const y = h * 0.55;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(-34, -28);
  ctx.lineTo(-20, 0);
  ctx.lineTo(-34, 28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  if (v.showGas) {
    for (let i = 0; i < 16; i += 1) {
      ctx.fillStyle = "rgba(232,93,79,0.55)";
      ctx.beginPath();
      ctx.arc(x - 38 - wrap(state.time * v.exhaustSpeed * 28 + i * 18, 220), y + Math.sin(i) * 24, 5, 0, TAU);
      ctx.fill();
    }
  }
  vector({ x: x - 30, y }, -120, 0, palette.coral, "喷气");
  vector({ x: x + 38, y: y - 42 }, 110, 0, palette.teal, "反冲");
  readout.innerHTML = `喷出气体向后获得动量，火箭向前反冲。当前相对加速度 a ∝ <strong>${a.toFixed(2)}</strong>。`;
}

function drawSimpleHarmonic(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const mid = h * 0.38;
  const x = w * 0.42 + v.amplitude * Math.cos(v.omega * state.time + toRad(v.phase));
  drawHorizontalSpring(70, mid, x - 26, 8, 14);
  drawBlock(x, mid + 28, 58, 46, palette.amber);
  ctx.strokeStyle = palette.line;
  ctx.beginPath();
  ctx.moveTo(w * 0.42, mid - 80);
  ctx.lineTo(w * 0.42, mid + 80);
  ctx.stroke();
  if (v.showGraph) drawShmTrace(50, h * 0.56, w - 100, h * 0.34, v.amplitude, v.omega, toRad(v.phase));
  readout.innerHTML = `简谐运动位移可写为 x = A cos(ωt + φ)。当前周期 T = <strong>${(TAU / v.omega).toFixed(2)} s</strong>。`;
}

function drawShmTrace(x, y, w, h, amp, omega, phase) {
  const frame = plotFrame(x, y, w, h, "x-t 图像", "t", "x");
  const points = [];
  for (let i = 0; i <= 160; i += 1) {
    const t = i / 160 * 6;
    points.push({ x: frame.x0 + (i / 160) * frame.w, y: frame.y0 - frame.h / 2 - (Math.cos(omega * (state.time - 6 + t) + phase) * 0.45 * frame.h) });
  }
  plotCurve(frame, points, palette.blue, 2.5);
}

function drawShmDescription(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.34, y: h * 0.48 };
  const a = state.time * TAU * v.frequency;
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(c.x, c.y, v.amplitude, 0, TAU);
  ctx.stroke();
  vector(c, v.amplitude * Math.cos(a), v.amplitude * Math.sin(a), palette.blue, "旋转矢量");
  const x1 = c.x + v.amplitude * Math.cos(a);
  const x2 = c.x + v.amplitude * Math.cos(a + toRad(v.phaseDiff));
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(x1, c.y + 150, 9, 0, TAU);
  ctx.arc(x2, c.y + 190, 9, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = palette.muted;
  ctx.beginPath();
  ctx.moveTo(c.x - v.amplitude - 20, c.y + 150);
  ctx.lineTo(c.x + v.amplitude + 20, c.y + 150);
  ctx.moveTo(c.x - v.amplitude - 20, c.y + 190);
  ctx.lineTo(c.x + v.amplitude + 20, c.y + 190);
  ctx.stroke();
  if (v.showSecond) label(`第二振动相差 ${v.phaseDiff.toFixed(0)}°`, w * 0.58, h * 0.42, palette.teal, "left", 18);
  drawFormulaPanel(["T=1/f", "ω=2πf", "相位=ωt+φ"]);
  readout.innerHTML = `频率、周期、角频率、初相和相位差共同描述振动状态。`;
}

function drawShmEnergy(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const mid = h * 0.46;
  const omega = Math.sqrt(v.k / v.mass);
  const x = v.amplitude * Math.cos(omega * state.time);
  const px = w * 0.42 + x;
  drawHorizontalSpring(70, mid, px - 28, 8, 14);
  drawBlock(px, mid + 28, 56, 44, palette.amber);
  vector({ x: px, y: mid - 52 }, -x * v.k, 0, palette.teal, "F=-kx");
  const ep = 0.5 * v.k * x * x;
  const total = 0.5 * v.k * v.amplitude * v.amplitude;
  const ek = total - ep;
  if (v.showEnergy) {
    drawEnergyBar(w - 210, h - 72, 34, ep, total, palette.coral, "Ep");
    drawEnergyBar(w - 150, h - 72, 34, ek, total, palette.blue, "Ek");
    drawEnergyBar(w - 90, h - 72, 34, total, total, palette.teal, "E");
  }
  readout.innerHTML = `回复力总指向平衡位置。动能和势能相互转化，总机械能保持不变。`;
}

function drawPendulum(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const pivot = { x: w * 0.45, y: 72 };
  const lengthPx = 120 + v.length * 90;
  const theta = toRad(v.angle) * Math.cos(state.time * Math.sqrt(v.g / v.length));
  const bob = { x: pivot.x + lengthPx * Math.sin(theta), y: pivot.y + lengthPx * Math.cos(theta) };
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pivot.x, pivot.y);
  ctx.lineTo(bob.x, bob.y);
  ctx.stroke();
  ctx.fillStyle = palette.amber;
  ctx.beginPath();
  ctx.arc(bob.x, bob.y, 18, 0, TAU);
  ctx.fill();
  ctx.stroke();
  if (v.showForces) {
    vector(bob, 0, 82, palette.coral, "mg");
    vector(bob, (pivot.x - bob.x) * 0.35, (pivot.y - bob.y) * 0.35, palette.teal, "T");
  }
  drawFormulaPanel(["T = 2π√(l/g)", `T=${(TAU * Math.sqrt(v.length / v.g)).toFixed(2)}s`, "小角度近似"]);
  readout.innerHTML = `小角度下单摆周期主要由摆长和 g 决定，与摆球质量无关。`;
}

function drawPendulumExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const trueT = TAU * Math.sqrt(v.length / G);
  const measuredT = trueT + v.timeError / v.cycles;
  const gValue = 4 * Math.PI * Math.PI * v.length / (measuredT * measuredT);
  drawPendulum({ length: v.length, angle: 8, g: gValue, showForces: false });
  if (v.showCalc) drawFormulaPanel(["T=t/N", "g=4π²l/T²", `g=${gValue.toFixed(2)}m/s²`]);
  readout.innerHTML = `测量 ${v.cycles.toFixed(0)} 次全振动总时间可减小计时误差，当前计算 g ≈ <strong>${gValue.toFixed(2)} m/s²</strong>。`;
}

function resonanceAmp(v) {
  const diff = v.driveF - v.naturalF;
  return 1 / Math.sqrt(diff * diff + v.damping * v.damping);
}

function drawForcedResonance(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const amp = clamp(resonanceAmp(v) * 18, 18, 150);
  const x = w * 0.42 + amp * Math.sin(TAU * v.driveF * state.time);
  drawHorizontalSpring(70, h * 0.36, x - 24, 8, 12);
  drawBlock(x, h * 0.39, 54, 42, palette.amber);
  if (v.showCurve) {
    const frame = plotFrame(48, h * 0.52, w - 96, h * 0.36, "共振曲线", "f", "A");
    const pts = [];
    for (let i = 0; i <= 130; i += 1) {
      const f = 0.2 + (4.8 * i) / 130;
      const a = 1 / Math.sqrt((f - v.naturalF) ** 2 + v.damping ** 2);
      pts.push({ x: frame.x0 + (i / 130) * frame.w, y: frame.y0 - clamp(a / 8, 0, 1) * frame.h });
    }
    plotCurve(frame, pts, palette.blue, 3);
  }
  readout.innerHTML = `驱动频率接近固有频率时振幅显著增大。当前相对振幅约 <strong>${resonanceAmp(v).toFixed(1)}</strong>。`;
}

function drawWaveFormationSelective(v) {
  clearCanvas();
  drawSineWave(v.amplitude, v.wavelength, v.frequency, hMid(), v.showParticles);
  readout.innerHTML = `机械波传播的是振动形式和能量，介质质点只在平衡位置附近振动。`;
}

function hMid() {
  return state.height * 0.52;
}

function drawSineWave(amplitude, wavelength, frequency, mid, particles = true) {
  const w = state.width;
  const x0 = 56;
  const x1 = w - 52;
  ctx.strokeStyle = palette.blue;
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let x = x0; x <= x1; x += 2) {
    const y = mid + amplitude * Math.sin(TAU * ((x - x0) / wavelength - frequency * state.time));
    if (x === x0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.strokeStyle = palette.line;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(x0, mid);
  ctx.lineTo(x1, mid);
  ctx.stroke();
  ctx.setLineDash([]);
  if (particles) {
    for (let i = 0; i <= 16; i += 1) {
      const x = x0 + (x1 - x0) * i / 16;
      const y = mid + amplitude * Math.sin(TAU * ((x - x0) / wavelength - frequency * state.time));
      ctx.fillStyle = i % 2 ? palette.teal : palette.amber;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, TAU);
      ctx.fill();
      ctx.stroke();
    }
  }
}

function drawSource(x, y, text) {
  ctx.save();
  ctx.fillStyle = palette.amber;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = palette.ink;
  ctx.font = "900 12px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawWaveDescriptionSelective(v) {
  clearCanvas();
  const w = state.width;
  const topMid = state.height * 0.35;
  drawSineWave(42, v.wavelength, v.frequency, topMid, false);
  const probeX = 56 + (w - 108) * v.probe;
  if (v.showProbe) {
    ctx.strokeStyle = palette.coral;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(probeX, 70);
    ctx.lineTo(probeX, state.height * 0.55);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  drawShmTrace(48, state.height * 0.58, w - 96, state.height * 0.32, 42, TAU * v.frequency, (probeX / v.wavelength) * TAU);
  readout.innerHTML = `上方波形图读 λ，下方振动图像读 T；波速满足 v = λf。`;
}

function drawWaveBoundary(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const mid = h * 0.52;
  if (v.phenomenon === "reflection") {
    for (let x = 80; x < w * 0.62; x += v.wavelength) arrow(x, mid - 120, x + 42, mid - 78, palette.blue, 2);
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w * 0.72, 80);
    ctx.lineTo(w * 0.72, h - 80);
    ctx.stroke();
    arrow(w * 0.65, mid + 80, w * 0.54, mid + 120, palette.coral, 2);
  } else if (v.phenomenon === "refraction") {
    ctx.fillStyle = "rgba(48,102,190,0.08)";
    ctx.fillRect(w * 0.5, 0, w * 0.5, h);
    ctx.strokeStyle = palette.ink;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, 40);
    ctx.lineTo(w * 0.5, h - 40);
    ctx.stroke();
    arrow(90, h * 0.28, w * 0.5, mid, palette.blue, 3);
    arrow(w * 0.5, mid, w - 110, mid + (v.speedRatio < 1 ? 90 : -60), palette.coral, 3);
    label("进入新介质：频率不变，波速和波长改变", 44, 48, palette.ink);
  } else {
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w * 0.48, 70);
    ctx.lineTo(w * 0.48, mid - v.slitWidth / 2);
    ctx.moveTo(w * 0.48, mid + v.slitWidth / 2);
    ctx.lineTo(w * 0.48, h - 70);
    ctx.stroke();
    for (let r = 35; r < 230; r += v.wavelength * 0.65) {
      ctx.strokeStyle = "rgba(48,102,190,0.55)";
      ctx.beginPath();
      ctx.arc(w * 0.48, mid, r, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
    }
    label("狭缝越接近波长，衍射越明显", 44, 48, palette.ink);
  }
  readout.innerHTML = `当前演示：<strong>${v.phenomenon === "reflection" ? "反射" : v.phenomenon === "refraction" ? "折射" : "衍射"}</strong>。`;
}

function drawWaveInterferenceSelective(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const s1 = { x: w * 0.36, y: h * 0.5 - v.sourceDistance / 2 };
  const s2 = { x: w * 0.36, y: h * 0.5 + v.sourceDistance / 2 };
  const phase = v.phase === "pi" ? Math.PI : 0;
  const cell = 6;
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const r1 = Math.hypot(x - s1.x, y - s1.y);
      const r2 = Math.hypot(x - s2.x, y - s2.y);
      const val = Math.sin(TAU * (r1 / v.wavelength - state.time * 0.7)) + Math.sin(TAU * (r2 / v.wavelength - state.time * 0.7) + phase);
      ctx.fillStyle = val > 0 ? `rgba(232,93,79,${Math.abs(val) * 0.18})` : `rgba(48,102,190,${Math.abs(val) * 0.18})`;
      ctx.fillRect(x, y, cell, cell);
    }
  }
  drawSource(s1.x, s1.y, "S1");
  drawSource(s2.x, s2.y, "S2");
  if (v.showNodes) label("红/蓝强色区：相长；浅色区：相消附近", 36, 40, palette.ink);
  readout.innerHTML = `相干波叠加形成稳定干涉图样。路径差决定相长或相消。`;
}

function drawDopplerEffect(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const source = { x: w * 0.44 + Math.sin(state.time * 0.8) * v.sourceSpeed * 180, y: h * 0.52 };
  if (v.showWavefronts) {
    for (let i = 1; i < 11; i += 1) {
      const age = (i + state.time * v.frequency) % 10;
      const r = age * 24;
      const cx = source.x - v.sourceSpeed * age * 40;
      ctx.strokeStyle = "rgba(48,102,190,0.45)";
      ctx.beginPath();
      ctx.arc(cx, source.y, r, 0, TAU);
      ctx.stroke();
    }
  }
  ctx.fillStyle = palette.amber;
  ctx.beginPath();
  ctx.arc(source.x, source.y, 14, 0, TAU);
  ctx.fill();
  const obsX = 60 + (w - 120) * v.observerX;
  drawPerson(obsX, h * 0.72);
  label("前方波面更密，后方波面更疏", 42, 44, palette.ink);
  readout.innerHTML = `声源相对观察者接近时接收频率升高，远离时降低，这就是多普勒效应。`;
}

function drawLightRefraction(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const mid = h * 0.5;
  ctx.fillStyle = "rgba(48,102,190,0.08)";
  ctx.fillRect(0, mid, w, h - mid);
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, mid);
  ctx.lineTo(w - 40, mid);
  ctx.stroke();
  if (v.showNormal) {
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(w * 0.5, 70);
    ctx.lineTo(w * 0.5, h - 70);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  const s = Math.min(1, (v.n1 / v.n2) * Math.sin(toRad(v.incident)));
  const refr = Math.asin(s);
  const p = { x: w * 0.5, y: mid };
  arrow(p.x - Math.sin(toRad(v.incident)) * 150, p.y - Math.cos(toRad(v.incident)) * 150, p.x, p.y, palette.blue, 3);
  arrow(p.x, p.y, p.x + Math.sin(refr) * 170, p.y + Math.cos(refr) * 170, palette.coral, 3);
  drawFormulaPanel(["n₁sinθ₁=n₂sinθ₂", `θ₂=${(refr * 180 / Math.PI).toFixed(1)}°`, "光路可逆"]);
  readout.innerHTML = `折射角由折射定律决定。当前 θ₂ ≈ <strong>${(refr * 180 / Math.PI).toFixed(1)}°</strong>。`;
}

function drawTotalInternalReflection(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const mid = h * 0.5;
  const c = Math.asin(Math.min(1, v.nRare / v.nDense));
  const total = toRad(v.incident) >= c;
  ctx.fillStyle = "rgba(48,102,190,0.12)";
  ctx.fillRect(0, 0, w, mid);
  ctx.strokeStyle = palette.ink;
  ctx.beginPath();
  ctx.moveTo(40, mid);
  ctx.lineTo(w - 40, mid);
  ctx.stroke();
  const p = { x: w * 0.5, y: mid };
  arrow(p.x - Math.sin(toRad(v.incident)) * 150, p.y - Math.cos(toRad(v.incident)) * 150, p.x, p.y, palette.blue, 3);
  arrow(p.x, p.y, p.x + Math.sin(toRad(v.incident)) * 150, p.y - Math.cos(toRad(v.incident)) * 150, palette.coral, 3);
  if (!total) arrow(p.x, p.y, p.x + Math.sin(Math.asin((v.nDense / v.nRare) * Math.sin(toRad(v.incident)))) * 110, p.y + 80, palette.teal, 2);
  if (v.showFiber) {
    roundRect(60, h - 90, w - 120, 34, 16, "rgba(15,139,141,0.16)", palette.teal);
    arrow(80, h - 73, w - 90, h - 73, palette.teal, 2);
  }
  drawFormulaPanel(["sinC=n₂/n₁", `C=${(c * 180 / Math.PI).toFixed(1)}°`, total ? "全反射" : "有折射"]);
  readout.innerHTML = total ? `入射角大于临界角，发生全反射。` : `入射角小于临界角，同时存在反射和折射。`;
}

function drawLightInterference(v) {
  clearCanvas();
  drawFringePattern(v.wavelength, v.slitDistance, v.screenDistance, v.showPattern, "光的干涉条纹");
  readout.innerHTML = `相干光叠加形成稳定明暗条纹，条纹间距 Δx = lλ/d。`;
}

function drawDoubleSlitExperiment(v) {
  clearCanvas();
  drawFringePattern(v.fringeSpacing * 500, v.slitDistance, v.screenDistance, true, "测量多条明纹间距");
  drawBracket(90, state.height - 78, 90 + v.fringeSpacing * v.fringeCount * 18, state.height - 78, `${v.fringeCount.toFixed(0)}条总宽`);
  drawFormulaPanel(["λ=dΔx/l", `λ≈${(v.slitDistance * v.fringeSpacing / v.screenDistance * 1000).toFixed(0)}nm`, "多条纹减小误差"]);
  readout.innerHTML = `由条纹间距、双缝间距和屏距可计算波长。当前 λ ≈ <strong>${(v.slitDistance * v.fringeSpacing / v.screenDistance * 1000).toFixed(0)} nm</strong>。`;
}

function drawFringePattern(wavelength, slitDistance, screenDistance, showPattern, title) {
  const w = state.width;
  const h = state.height;
  label(title, 42, 42, palette.ink, "left", 18);
  if (!showPattern) return;
  const spacing = clamp(wavelength * screenDistance / slitDistance / 80, 12, 90);
  const center = w * 0.55;
  for (let i = -14; i <= 14; i += 1) {
    const x = center + i * spacing;
    const bright = Math.cos(i * Math.PI) ** 2;
    ctx.fillStyle = `rgba(242,183,5,${0.18 + bright * 0.55})`;
    ctx.fillRect(x - spacing * 0.24, 92, spacing * 0.48, h - 180);
  }
  roundRect(60, h * 0.38, 20, h * 0.24, 3, palette.ink, null);
  roundRect(86, h * 0.45, 10, 18, 2, "#fff", palette.ink);
  roundRect(86, h * 0.53, 10, 18, 2, "#fff", palette.ink);
}

function drawLightDiffraction(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const center = w * 0.55;
  const width = clamp(v.wavelength / v.slitWidth / 4, 28, 210);
  for (let x = 60; x < w - 60; x += 4) {
    const u = (x - center) / width;
    const intensity = u === 0 ? 1 : (Math.sin(u) / u) ** 2;
    ctx.fillStyle = `rgba(242,183,5,${0.08 + intensity * 0.75})`;
    ctx.fillRect(x, 90, 4, h - 180);
  }
  roundRect(70, h * 0.36, 22, h * 0.28, 3, palette.ink, null);
  roundRect(92, h * 0.5 - v.slitWidth * 18, 12, v.slitWidth * 36, 2, "#fff", palette.ink);
  if (v.showEnvelope) label(`中央亮纹宽度 ∝ λ/a`, 42, 46, palette.ink, "left", 18);
  readout.innerHTML = `狭缝越窄、波长越长，衍射越明显，中央亮纹越宽。`;
}

function drawPolarizationLaser(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const intensity = Math.cos(toRad(v.angle)) ** 2;
  if (v.lightMode === "laser") {
    ctx.strokeStyle = palette.coral;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(60, h * 0.5);
    ctx.lineTo(w - 80, h * 0.5);
    ctx.stroke();
    label("激光：方向性好、单色性好、相干性好", 44, 54, palette.ink, "left", 18);
  } else {
    drawPolarizer(w * 0.32, h * 0.5, 0);
    drawPolarizer(w * 0.58, h * 0.5, toRad(v.angle));
    ctx.strokeStyle = `rgba(242,183,5,${0.25 + intensity * 0.65})`;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(70, h * 0.5);
    ctx.lineTo(w - 90, h * 0.5);
    ctx.stroke();
  }
  if (v.showIntensity) drawEnergyBar(w - 150, h - 76, 38, intensity, 1, palette.amber, "I");
  drawFormulaPanel(["I=I₀cos²θ", `I/I₀=${intensity.toFixed(2)}`, v.lightMode === "laser" ? "激光" : "偏振"]);
  readout.innerHTML = `偏振现象说明光是横波。当前透射强度 I/I₀ = <strong>${intensity.toFixed(2)}</strong>。`;
}

function drawPolarizer(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  roundRect(-12, -120, 24, 240, 6, "rgba(48,102,190,0.25)", palette.ink);
  for (let yy = -100; yy <= 100; yy += 20) {
    ctx.strokeStyle = palette.blue;
    ctx.beginPath();
    ctx.moveTo(-8, yy);
    ctx.lineTo(8, yy);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMagneticFieldPattern(x, y, w, h, outward = false, gap = 42) {
  ctx.save();
  for (let yy = y; yy <= y + h; yy += gap) {
    for (let xx = x; xx <= x + w; xx += gap) {
      ctx.strokeStyle = "rgba(48,102,190,0.45)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(xx, yy, 9, 0, TAU);
      ctx.stroke();
      if (outward) {
        ctx.fillStyle = palette.blue;
        ctx.beginPath();
        ctx.arc(xx, yy, 2.5, 0, TAU);
        ctx.fill();
      } else {
        ctx.strokeStyle = palette.blue;
        ctx.beginPath();
        ctx.moveTo(xx - 5, yy - 5);
        ctx.lineTo(xx + 5, yy + 5);
        ctx.moveTo(xx + 5, yy - 5);
        ctx.lineTo(xx - 5, yy + 5);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

function drawInductionCoil(x, y, turns, width, height, color = palette.teal) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  const n = Math.max(4, Math.min(18, Math.round(turns)));
  for (let i = 0; i <= n * 20; i += 1) {
    const t = i / (n * 20);
    const px = x + t * width;
    const py = y + Math.sin(t * n * TAU) * height * 0.45;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

function drawSmallBulb(x, y, on, labelText = "") {
  ctx.save();
  ctx.strokeStyle = palette.ink;
  ctx.fillStyle = on ? "rgba(242,183,5,0.8)" : "#f8fafc";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 9, y - 6);
  ctx.lineTo(x + 9, y + 6);
  ctx.moveTo(x + 9, y - 6);
  ctx.lineTo(x - 9, y + 6);
  ctx.stroke();
  if (labelText) label(labelText, x, y + 34, palette.ink, "center", 12);
  ctx.restore();
}

function drawAcWave(x, y, w, h, amplitude, frequency, phase, color, title) {
  const frame = plotFrame(x, y, w, h, title, "t", "u");
  const mid = frame.y0 - frame.h / 2;
  const scale = frame.h * 0.42;
  const pts = [];
  for (let i = 0; i <= 180; i += 1) {
    const t = i / 180;
    pts.push({
      x: frame.x0 + t * frame.w,
      y: mid - Math.sin(TAU * (frequency * t + phase)) * scale * amplitude,
    });
  }
  plotCurve(frame, pts, color, 3);
  return { frame, mid, scale };
}

function sensorOutput(v) {
  const input = v.inputValue / 100;
  if (v.sensorType === "thermal") return clamp(0.18 + input * 0.7, 0, 1);
  if (v.sensorType === "hall") return clamp(0.1 + input * 0.82, 0, 1);
  return clamp(0.9 - input * 0.72, 0, 1);
}

function drawAmpereForce(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  if (v.showField) {
    drawMagneticFieldPattern(54, 64, w - 108, h - 150, false, 44);
    label("B 入纸面", 56, 44, palette.blue, "left", 16);
  }
  const c = { x: w * 0.46, y: h * 0.5 };
  const angle = toRad(v.angle);
  const len = 110 + v.length * 32;
  const dx = Math.cos(angle) * len / 2;
  const dy = Math.sin(angle) * len / 2;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(c.x - dx, c.y - dy);
  ctx.lineTo(c.x + dx, c.y + dy);
  ctx.stroke();
  ctx.lineCap = "butt";
  const iSign = v.current >= 0 ? 1 : -1;
  arrow(c.x - dx * iSign * 0.45, c.y - dy * iSign * 0.45, c.x + dx * iSign * 0.45, c.y + dy * iSign * 0.45, palette.amber, 4);
  label("I", c.x + dx * iSign * 0.52, c.y + dy * iSign * 0.52 - 20, palette.amber, "center", 16);
  const f = v.field * Math.abs(v.current) * v.length * Math.sin(angle);
  const forceLen = clamp(f * 12, 18, 150);
  const fx = -Math.sin(angle) * forceLen * iSign;
  const fy = Math.cos(angle) * forceLen * iSign;
  vector(c, fx, fy, palette.coral, "F");
  drawFormulaPanel(["F = BILsinθ", `θ=${v.angle.toFixed(0)}°`, `F=${Math.abs(f).toFixed(2)}N`]);
  readout.innerHTML = `安培力大小随 B、I、L 和 sinθ 增大而增大。当前导线与磁场夹角为 <strong>${v.angle.toFixed(0)}°</strong>。`;
}

function drawLorentzForce(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  drawMagneticFieldPattern(54, 70, w - 108, h - 160, false, 42);
  const p = { x: w * 0.35 + (Math.sin(state.time * 0.8) + 1) * w * 0.12, y: h * 0.52 };
  const chargeColor = v.charge >= 0 ? palette.coral : palette.blue;
  drawPlusMinus(p.x, p.y, Math.sign(v.charge || 1), chargeColor);
  arrow(p.x - 95, p.y, p.x - 18, p.y, palette.teal, 3);
  label("v", p.x - 56, p.y - 22, palette.teal, "center", 16);
  if (v.showForce) {
    const force = Math.abs(v.charge) * v.speed * v.field * Math.sin(toRad(v.angle));
    const sign = v.charge >= 0 ? 1 : -1;
    vector(p, 0, sign * clamp(force * 4, 18, 130), palette.coral, "F");
  }
  drawFormulaPanel(["F = qvBsinθ", `θ=${v.angle.toFixed(0)}°`, "F ⟂ v，F ⟂ B"]);
  readout.innerHTML = `洛伦兹力始终垂直于粒子速度，因而只改变运动方向，不改变速率。当前电荷为 <strong>${v.charge >= 0 ? "正" : "负"}</strong>。`;
}

function drawChargedParticleMagnetic(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  drawMagneticFieldPattern(48, 58, w - 96, h - 132, false, 44);
  const q = Math.max(0.1, Math.abs(v.charge));
  const r = clamp((v.mass * v.speed / (q * v.field)) * 34, 42, Math.min(w, h) * 0.33);
  const c = { x: w * 0.46, y: h * 0.52 };
  const direction = v.charge >= 0 ? 1 : -1;
  const a = direction * state.time * v.field * q / v.mass + 0.7;
  ctx.strokeStyle = palette.teal;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(c.x, c.y, r, 0, TAU);
  ctx.stroke();
  const p = { x: c.x + r * Math.cos(a), y: c.y + r * Math.sin(a) };
  drawPlusMinus(p.x, p.y, Math.sign(v.charge || 1), v.charge >= 0 ? palette.coral : palette.blue);
  vector(p, -Math.sin(a) * 54 * direction, Math.cos(a) * 54 * direction, palette.amber, "v");
  vector(p, (c.x - p.x) * 0.38, (c.y - p.y) * 0.38, palette.coral, "F向");
  if (v.showRadius) {
    ctx.strokeStyle = palette.muted;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.setLineDash([]);
    label("r", (c.x + p.x) / 2, (c.y + p.y) / 2 - 10, palette.muted, "center", 14);
  }
  drawFormulaPanel(["r = mv/(|q|B)", "T = 2πm/(|q|B)", `r∝${(v.mass * v.speed / (q * v.field)).toFixed(2)}`]);
  readout.innerHTML = `磁场中的洛伦兹力提供向心力。速度越大半径越大，磁场或电荷量越大半径越小。`;
}

function drawAcceleratorSpectrometer(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const speed = Math.sqrt((2 * v.charge * v.voltage) / v.mass);
  const r = clamp(v.mass * speed / (v.charge * v.field) * 34, 42, 190);
  if (v.device === "mass") {
    drawMagneticFieldPattern(w * 0.42, 70, w * 0.46, h - 155, false, 40);
    roundRect(52, h * 0.44 - 28, 86, 56, 8, palette.amber, palette.ink);
    label("离子源", 95, h * 0.44, palette.ink, "center", 14);
    arrow(145, h * 0.44, w * 0.42, h * 0.44, palette.teal, 3);
    ctx.strokeStyle = palette.coral;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w * 0.42, h * 0.44 + r, r, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    roundRect(w * 0.42 - 18, h * 0.44 + 2 * r - 12, 150, 24, 4, "rgba(232,93,79,0.15)", palette.coral);
    label("检测屏", w * 0.42 + 75, h * 0.44 + 2 * r + 28, palette.coral, "center", 13);
    drawFormulaPanel(["1/2mv²=qU", "r=mv/(qB)", `r∝${(v.mass * speed / (v.charge * v.field)).toFixed(2)}`]);
    readout.innerHTML = `质谱仪通过带电粒子在磁场中的偏转半径区分荷质比，不同质量会落在不同位置。`;
  } else {
    const c = { x: w * 0.45, y: h * 0.52 };
    ctx.strokeStyle = palette.blue;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(c.x - 12, c.y, 122, Math.PI / 2, Math.PI * 1.5);
    ctx.arc(c.x + 12, c.y, 122, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    roundRect(c.x - 18, c.y - 134, 36, 268, 4, "rgba(255,255,255,0.72)", palette.line);
    for (let i = 1; i <= 5; i += 1) {
      ctx.strokeStyle = `rgba(232,93,79,${0.25 + i * 0.1})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 22 + i * 22, state.time * 0.6 + i, state.time * 0.6 + i + Math.PI * 1.45);
      ctx.stroke();
    }
    arrow(c.x - 20, c.y, c.x + 20, c.y, palette.amber, 4);
    label("交变电场加速", c.x, c.y + 158, palette.amber, "center", 15);
    drawFormulaPanel(["T = 2πm/(qB)", "每过缝隙加速一次", `v末∝${speed.toFixed(2)}`]);
    readout.innerHTML = `回旋加速器用磁场让粒子反复转回缝隙，用交变电场在每次过缝隙时继续加速。`;
  }
}

function drawLenzLaw(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const coilX = w * 0.54;
  const coilY = h * 0.5;
  const magnetX = w * 0.2 + v.distance * w * 0.25;
  roundRect(magnetX - 42, coilY - 32, 84, 64, 8, "#f8fafc", palette.ink);
  roundRect(magnetX - 42, coilY - 32, 42, 64, 8, palette.coral, null);
  roundRect(magnetX, coilY - 32, 42, 64, 8, palette.blue, null);
  label("N", magnetX - 20, coilY, "#fff", "center", 18);
  label("S", magnetX + 20, coilY, "#fff", "center", 18);
  drawInductionCoil(coilX, coilY, v.turns / 3, 150, 76, palette.teal);
  if (v.showFlux) {
    for (let i = -2; i <= 2; i += 1) arrow(magnetX + 48, coilY + i * 22, coilX + 138, coilY + i * 12, "rgba(48,102,190,0.55)", 2);
  }
  if (v.closed) {
    const cw = v.magnetSpeed >= 0 ? 1 : -1;
    ctx.strokeStyle = palette.coral;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(coilX + 75, coilY, 72, 46, 0, cw > 0 ? -0.3 : Math.PI + 0.3, cw > 0 ? Math.PI * 1.5 : Math.PI * 0.5);
    ctx.stroke();
    const arrowY = coilY + (cw > 0 ? -46 : 46);
    arrow(coilX + 76, arrowY, coilX + 100 * cw + 76, arrowY + 2, palette.coral, 3);
  }
  arrow(magnetX - 74, coilY + 76, magnetX - 74 + v.magnetSpeed * 18, coilY + 76, palette.amber, 3);
  drawFormulaPanel(["楞次定律", v.magnetSpeed >= 0 ? "磁通量增加" : "磁通量减少", v.closed ? "产生感应电流" : "线圈断开"]);
  readout.innerHTML = `感应电流的磁场总要阻碍原磁通量的变化。这里“阻碍”的对象是磁通量变化，而不是简单阻止磁体运动。`;
}

function drawFaradayLaw(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const emf = Math.abs(v.turns * v.fluxChange / v.deltaT);
  drawInductionCoil(w * 0.18, h * 0.45, v.turns / 4, 170, 82, palette.teal);
  const barH = clamp(emf / 25, 0, 1) * 160;
  roundRect(w * 0.47, h * 0.65 - 160, 58, 160, 6, "rgba(216,224,231,0.65)", palette.line);
  roundRect(w * 0.47, h * 0.65 - barH, 58, barH, 6, palette.coral, null);
  label("ε", w * 0.47 + 29, h * 0.65 + 24, palette.coral, "center", 16);
  if (v.showGraph) {
    const frame = plotFrame(w * 0.58, 56, w * 0.34, h * 0.5, "Φ-t 图像", "t", "Φ");
    const pts = [];
    for (let i = 0; i <= 80; i += 1) {
      const t = i / 80;
      pts.push({ x: frame.x0 + t * frame.w, y: frame.y0 - frame.h * (0.45 + 0.42 * (t - 0.5) * Math.sign(v.fluxChange || 1)) });
    }
    plotCurve(frame, pts, palette.blue, 3);
  }
  drawFormulaPanel(["ε = N|ΔΦ/Δt|", `N=${v.turns.toFixed(0)}`, `ε=${emf.toFixed(1)}V`]);
  readout.innerHTML = `感应电动势由磁通量变化率决定；同样的磁通量变化发生得越快，电动势越大。`;
}

function drawEddyCurrent(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const conductivity = v.material === "copper" ? 1 : v.material === "aluminum" ? 0.65 : 0.06;
  const damping = conductivity * v.magnetSpeed * v.field;
  const plateColor = v.material === "insulator" ? "rgba(96,112,128,0.18)" : v.material === "aluminum" ? "rgba(96,112,128,0.34)" : "rgba(242,183,5,0.28)";
  roundRect(80, h * 0.58, w - 160, 70, 8, plateColor, palette.ink);
  label(v.material === "copper" ? "铜板" : v.material === "aluminum" ? "铝板" : "绝缘板", 112, h * 0.58 + 35, palette.ink, "left", 15);
  const magnetX = 120 + ((state.time * v.magnetSpeed * 38) % Math.max(160, w - 260));
  roundRect(magnetX, h * 0.36, 76, 72, 8, palette.coral, palette.ink);
  label("磁体", magnetX + 38, h * 0.36 + 36, "#fff", "center", 15);
  arrow(magnetX + 88, h * 0.36 + 36, magnetX + 142, h * 0.36 + 36, palette.amber, 3);
  if (conductivity > 0.1) {
    for (let i = 0; i < 5; i += 1) {
      ctx.strokeStyle = `rgba(15,139,141,${0.18 + conductivity * 0.45})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(magnetX + 38 + (i - 2) * 22, h * 0.58 + 35, 18 + i * 2, 10 + i, state.time + i, 0, TAU);
      ctx.stroke();
    }
  }
  arrow(magnetX + 34, h * 0.35 - 28, magnetX + 34 - clamp(damping * 9, 12, 110), h * 0.35 - 28, palette.coral, 3);
  label("阻尼力", magnetX - 48, h * 0.35 - 48, palette.coral, "center", 14);
  if (v.showHeat && conductivity > 0.1) {
    for (let i = 0; i < 8; i += 1) label("热", 180 + i * 54, h * 0.72 + Math.sin(state.time * 2 + i) * 8, palette.coral, "center", 13);
  }
  drawFormulaPanel(["涡流", "电磁阻尼", `阻尼∝${damping.toFixed(1)}`]);
  readout.innerHTML = `导体板内的涡流产生磁场并阻碍相对运动，导电性越好、磁体运动越快，阻尼越明显。`;
}

function drawMutualSelfInductance(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const core = v.core === "iron" ? 1.8 : 1;
  const emf = Math.abs(v.currentChange) * v.turns * core / 20;
  const y = h * 0.48;
  if (v.core === "iron") roundRect(w * 0.31, y - 62, w * 0.3, 124, 12, "rgba(96,112,128,0.22)", palette.muted);
  if (v.mode === "mutual") {
    drawInductionCoil(w * 0.24, y, v.turns / 4, 150, 72, palette.blue);
    drawInductionCoil(w * 0.56, y, v.turns / 4, 150, 72, palette.teal);
    arrow(w * 0.24 - 52, y, w * 0.24 - 8, y, v.currentChange >= 0 ? palette.amber : palette.coral, 3);
    drawSmallBulb(w * 0.78, y, emf > 2.5, "副线圈");
    label("原线圈电流变化", w * 0.24 + 75, y + 98, palette.blue, "center", 14);
    label("副线圈产生感应电动势", w * 0.56 + 75, y + 98, palette.teal, "center", 14);
  } else {
    drawInductionCoil(w * 0.36, y, v.turns / 3, 210, 84, palette.teal);
    drawSmallBulb(w * 0.72, y, Math.abs(v.currentChange) < 2, "灯泡");
    arrow(w * 0.25, y - 92, w * 0.25 + v.currentChange * 10, y - 92, palette.amber, 3);
    label(v.currentChange >= 0 ? "电流增大，自感阻碍增大" : "电流减小，自感阻碍减小", w * 0.48, y + 112, palette.ink, "center", 14);
  }
  drawFormulaPanel([v.mode === "mutual" ? "互感" : "自感", "ε ∝ N·ΔI/Δt", `ε∝${emf.toFixed(1)}`]);
  readout.innerHTML = `线圈中的电流变化会引起磁通量变化，从而在自身或邻近线圈中产生感应电动势。`;
}

function drawAlternatingCurrent(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const phase = v.phase / 360;
  if (v.showGenerator) {
    const c = { x: w * 0.25, y: h * 0.44 };
    drawMagneticFieldPattern(c.x - 130, c.y - 110, 260, 220, false, 44);
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(TAU * v.frequency * state.time + toRad(v.phase));
    roundRect(-58, -34, 116, 68, 5, "rgba(242,183,5,0.22)", palette.ink);
    arrow(-48, 0, 48, 0, palette.coral, 3);
    ctx.restore();
    label("发电机线圈", c.x, c.y + 142, palette.ink, "center", 15);
  }
  drawAcWave(w * 0.43, 56, w * 0.49, h * 0.58, clamp(v.amplitude / 12, 0.12, 1), v.frequency, phase + state.time * 0.08, palette.blue, "e-t 图像");
  drawFormulaPanel(["e = Emsinωt", `Em=${v.amplitude.toFixed(1)}V`, `T=${(1 / v.frequency).toFixed(2)}s`]);
  readout.innerHTML = `线圈在磁场中匀速转动时，磁通量周期性变化，产生正弦式交变电动势。`;
}

function drawACDescription(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const uEff = v.peakVoltage / Math.sqrt(2);
  const wave = drawAcWave(52, 54, w - 104, h * 0.58, 0.92, clamp(v.frequency / 50, 0.25, 2), state.time * 0.06, palette.blue, "正弦交流电");
  ctx.strokeStyle = palette.coral;
  ctx.setLineDash([7, 7]);
  ctx.beginPath();
  ctx.moveTo(wave.frame.x0, wave.mid - wave.scale * 0.92);
  ctx.lineTo(wave.frame.x0 + wave.frame.w, wave.mid - wave.scale * 0.92);
  ctx.moveTo(wave.frame.x0, wave.mid + wave.scale * 0.92);
  ctx.lineTo(wave.frame.x0 + wave.frame.w, wave.mid + wave.scale * 0.92);
  ctx.stroke();
  label("±Um", wave.frame.x0 + wave.frame.w - 4, wave.mid - wave.scale * 0.92 - 16, palette.coral, "right", 13);
  if (v.showEffective) {
    ctx.strokeStyle = palette.teal;
    ctx.beginPath();
    ctx.moveTo(wave.frame.x0, wave.mid - wave.scale * 0.92 / Math.sqrt(2));
    ctx.lineTo(wave.frame.x0 + wave.frame.w, wave.mid - wave.scale * 0.92 / Math.sqrt(2));
    ctx.stroke();
    label("U有效", wave.frame.x0 + 18, wave.mid - wave.scale * 0.92 / Math.sqrt(2) - 14, palette.teal, "left", 13);
  }
  ctx.setLineDash([]);
  drawEnergyBar(w - 210, h - 68, 36, v.peakVoltage, v.peakVoltage, palette.coral, "Um");
  drawEnergyBar(w - 150, h - 68, 36, uEff, v.peakVoltage, palette.teal, "U");
  drawFormulaPanel(["U = Um/√2", `U=${uEff.toFixed(0)}V`, `P=${(uEff * uEff / v.resistance).toFixed(1)}W`]);
  readout.innerHTML = `正弦交流电的有效值由热效应等效定义。家庭用电的 220V 通常指有效值。`;
}

function drawTransformer(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const u2 = v.u1 * v.n2 / v.n1;
  const i2 = u2 / v.load;
  const i1 = (u2 * i2) / Math.max(1, v.u1);
  roundRect(w * 0.35, h * 0.23, w * 0.22, h * 0.46, 14, "rgba(96,112,128,0.22)", palette.muted);
  drawInductionCoil(w * 0.25, h * 0.46, v.n1 / 48, 145, 92, palette.blue);
  drawInductionCoil(w * 0.55, h * 0.46, v.n2 / 70, 170, 108, palette.teal);
  label(`N₁=${v.n1.toFixed(0)}`, w * 0.32, h * 0.72, palette.blue, "center", 14);
  label(`N₂=${v.n2.toFixed(0)}`, w * 0.64, h * 0.72, palette.teal, "center", 14);
  arrow(w * 0.14, h * 0.46, w * 0.23, h * 0.46, palette.amber, 3);
  arrow(w * 0.73, h * 0.46, w * 0.84, h * 0.46, palette.coral, 3);
  roundRect(w * 0.84, h * 0.41, 64, 58, 7, "#f8fafc", palette.ink);
  label("负载", w * 0.84 + 32, h * 0.44, palette.ink, "center", 13);
  label(`R=${v.load.toFixed(0)}Ω`, w * 0.84 + 32, h * 0.49, palette.muted, "center", 12);
  drawFormulaPanel(["U₂/U₁=N₂/N₁", `U₂=${u2.toFixed(0)}V`, `I₁≈${i1.toFixed(2)}A`]);
  readout.innerHTML = `理想变压器中电压比等于匝数比，升压时电流相应减小，功率近似守恒。`;
}

function drawPowerTransmission(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const current = v.power / v.voltage;
  const loss = current * current * v.lineResistance;
  roundRect(54, h * 0.48 - 58, 90, 116, 8, palette.amber, palette.ink);
  label("电站", 99, h * 0.48, palette.ink, "center", 16);
  roundRect(176, h * 0.48 - 46, 76, 92, 8, "rgba(15,139,141,0.18)", palette.teal);
  label("升压", 214, h * 0.48, palette.teal, "center", 15);
  roundRect(w - 250, h * 0.48 - 46, 76, 92, 8, "rgba(15,139,141,0.18)", palette.teal);
  label("降压", w - 212, h * 0.48, palette.teal, "center", 15);
  roundRect(w - 130, h * 0.48 - 58, 82, 116, 8, "#f8fafc", palette.ink);
  label("用户", w - 89, h * 0.48, palette.ink, "center", 16);
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(252, h * 0.41);
  ctx.lineTo(w - 250, h * 0.41);
  ctx.moveTo(252, h * 0.55);
  ctx.lineTo(w - 250, h * 0.55);
  ctx.stroke();
  for (let x = 300; x < w - 300; x += 70) {
    const heat = clamp(loss / v.power, 0, 1);
    ctx.fillStyle = `rgba(232,93,79,${0.12 + heat * 0.55})`;
    ctx.beginPath();
    ctx.arc(x, h * 0.48 + Math.sin(state.time * 2 + x) * 12, 7 + heat * 10, 0, TAU);
    ctx.fill();
  }
  if (v.showCompare) {
    const lowCurrent = v.power / 10;
    const lowLoss = lowCurrent * lowCurrent * v.lineResistance;
    drawEnergyBar(w - 230, h - 70, 34, loss, Math.max(loss, lowLoss), palette.teal, "高压损");
    drawEnergyBar(w - 168, h - 70, 34, lowLoss, Math.max(loss, lowLoss), palette.coral, "低压损");
  }
  drawFormulaPanel(["P损=I²R", `I=P/U=${current.toFixed(2)}`, `损耗率=${(loss / v.power * 100).toFixed(1)}%`]);
  readout.innerHTML = `输送功率一定时，提高输电电压可以减小电流，从而显著降低线路热损耗。`;
}

function drawLCOscillation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const omega = 1 / Math.sqrt(v.capacitance * v.inductance);
  const decay = Math.exp(-v.resistance * state.time * 0.45);
  const phase = omega * state.time * 1.8;
  const q = v.charge * decay * Math.cos(phase);
  const i = v.charge * decay * Math.sin(phase);
  const cx = w * 0.34;
  const cy = h * 0.47;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 150, cy - 80);
  ctx.lineTo(cx - 58, cy - 80);
  ctx.moveTo(cx + 58, cy - 80);
  ctx.lineTo(cx + 150, cy - 80);
  ctx.lineTo(cx + 150, cy + 92);
  ctx.lineTo(cx - 150, cy + 92);
  ctx.lineTo(cx - 150, cy - 80);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx - 34, cy - 120);
  ctx.lineTo(cx - 34, cy - 40);
  ctx.moveTo(cx + 34, cy - 120);
  ctx.lineTo(cx + 34, cy - 40);
  ctx.stroke();
  drawInductionCoil(cx - 70, cy + 92, 8, 140, 40, palette.teal);
  for (let n = 0; n < Math.min(7, Math.abs(q) + 2); n += 1) {
    drawPlusMinus(cx - 54, cy - 105 + n * 12, Math.sign(q || 1), q >= 0 ? palette.coral : palette.blue);
    drawPlusMinus(cx + 54, cy - 105 + n * 12, -Math.sign(q || 1), q >= 0 ? palette.blue : palette.coral);
  }
  if (Math.abs(i) > 0.2) arrow(cx - 118, cy + 92, cx - 118 + Math.sign(i) * 82, cy + 92, palette.amber, 3);
  drawEnergyBar(w - 220, h - 70, 36, q * q, v.charge * v.charge, palette.coral, "电场能");
  drawEnergyBar(w - 150, h - 70, 36, i * i, v.charge * v.charge, palette.teal, "磁场能");
  drawFormulaPanel(["T=2π√(LC)", `T∝${(TAU * Math.sqrt(v.capacitance * v.inductance)).toFixed(1)}`, "能量往复转化"]);
  readout.innerHTML = `LC 回路中电容器电场能与线圈磁场能周期性转化；电阻越大，振荡衰减越快。`;
}

function drawEMFieldWaveSelective2(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const mid = h * 0.52;
  const x0 = 62;
  const x1 = w - 70;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 2;
  arrow(x0, mid, x1, mid, palette.ink, 2);
  label("传播方向", x1 - 10, mid + 24, palette.ink, "right", 13);
  if (v.showElectric) {
    ctx.strokeStyle = palette.coral;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = x0; x <= x1; x += 3) {
      const y = mid - v.amplitude * Math.sin(TAU * ((x - x0) / (180 / v.frequency) - state.time * 0.45));
      if (x === x0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    vector({ x: w * 0.42, y: mid }, 0, -v.amplitude, palette.coral, "E");
  }
  if (v.showMagnetic) {
    ctx.strokeStyle = palette.blue;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = x0; x <= x1; x += 3) {
      const y = mid + 90 + v.amplitude * 0.65 * Math.sin(TAU * ((x - x0) / (180 / v.frequency) - state.time * 0.45));
      if (x === x0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    vector({ x: w * 0.42, y: mid + 90 }, 58, 0, palette.blue, "B");
  }
  drawFormulaPanel(["E ⟂ B ⟂ v", "c = λf", `λ相对=${(1 / v.frequency).toFixed(2)}`]);
  readout.innerHTML = `电磁波是横波，电场、磁场和传播方向两两垂直，并且可以在真空中传播。`;
}

function drawRadioTransmitReceive(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const tx = { x: w * 0.18, y: h * 0.54 };
  const rx = { x: w * 0.82, y: h * 0.54 };
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(tx.x, tx.y + 90);
  ctx.lineTo(tx.x, tx.y - 76);
  ctx.moveTo(tx.x - 42, tx.y + 90);
  ctx.lineTo(tx.x, tx.y + 20);
  ctx.lineTo(tx.x + 42, tx.y + 90);
  ctx.moveTo(rx.x, rx.y + 90);
  ctx.lineTo(rx.x, rx.y - 64);
  ctx.moveTo(rx.x - 34, rx.y + 90);
  ctx.lineTo(rx.x, rx.y + 26);
  ctx.lineTo(rx.x + 34, rx.y + 90);
  ctx.stroke();
  label("发射", tx.x, tx.y + 120, palette.ink, "center", 15);
  label("接收", rx.x, rx.y + 120, palette.ink, "center", 15);
  const strength = 1 - v.distance * 0.75;
  for (let r = 38; r < w * 0.52; r += 46) {
    ctx.strokeStyle = `rgba(48,102,190,${0.1 + strength * 0.35})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tx.x, tx.y - 42, r + Math.sin(state.time * 2 + r) * 5, -0.65, 0.65);
    ctx.stroke();
  }
  const frame = plotFrame(w * 0.28, 54, w * 0.42, h * 0.34, v.showModulation ? "调幅波" : "载波", "t", "u");
  ctx.strokeStyle = palette.coral;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 240; i += 1) {
    const t = i / 240;
    const envelope = v.showModulation ? 0.42 + 0.34 * Math.sin(TAU * v.audio * t + state.time) : 0.55;
    const y = frame.y0 - frame.h / 2 - Math.sin(TAU * v.carrier * t * 3 + state.time * 2) * envelope * frame.h * 0.5;
    const x = frame.x0 + t * frame.w;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  drawFormulaPanel(["调制 → 发射", "调谐 → 接收", `接收强度∝${strength.toFixed(2)}`]);
  readout.innerHTML = `无线电通信把低频信息加载到高频载波上，由天线发射并由接收电路调谐、解调。`;
}

function drawSpectrum(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const x = 72;
  const y = h * 0.43;
  const bw = w - 144;
  const bh = 58;
  const grad = ctx.createLinearGradient(x, 0, x + bw, 0);
  grad.addColorStop(0, "#3f51b5");
  grad.addColorStop(0.18, "#00acc1");
  grad.addColorStop(0.34, "#43a047");
  grad.addColorStop(0.48, "#fdd835");
  grad.addColorStop(0.62, "#fb8c00");
  grad.addColorStop(0.78, "#8e24aa");
  grad.addColorStop(1, "#263238");
  roundRect(x, y, bw, bh, 10, grad, palette.ink);
  const bands = ["无线电", "微波", "红外", "可见光", "紫外", "X射线", "γ射线"];
  bands.forEach((band, i) => label(band, x + (i + 0.5) * bw / bands.length, y + bh + 28, palette.ink, "center", 12));
  const px = x + bw * v.position;
  arrow(px, y - 78, px, y - 8, palette.coral, 3);
  label("频率升高，波长变短", x + bw / 2, y - 98, palette.ink, "center", 16);
  arrow(x + 8, y + bh + 62, x + bw - 8, y + bh + 62, palette.teal, 2);
  label("f", x + bw - 8, y + bh + 84, palette.teal, "right", 13);
  arrow(x + bw - 8, y + bh + 86, x + 8, y + bh + 86, palette.blue, 2);
  label("λ", x + 8, y + bh + 108, palette.blue, "left", 13);
  if (v.showApplications) {
    const app = v.focusBand === "radio" ? "广播、通信、雷达" : v.focusBand === "xray" ? "医学成像、安检" : "照明、视觉、光合作用";
    roundRect(w * 0.28, h * 0.73, w * 0.44, 48, 8, "rgba(255,255,255,0.86)", palette.line);
    label(app, w * 0.5, h * 0.73 + 24, palette.ink, "center", 15);
  }
  drawFormulaPanel(["c = λf", "频率越高能量越高", "波谱连续"]);
  readout.innerHTML = `电磁波谱按频率或波长连续排列，可见光只是其中很窄的一段。`;
}

function drawSensorIntro(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.46;
  const names = {
    temperature: ["温度", "热敏元件"],
    light: ["光照", "光敏元件"],
    pressure: ["压力", "压敏元件"],
  };
  const boxes = [
    { x: w * 0.12, text: names[v.inputType][0] },
    { x: w * 0.32, text: names[v.inputType][1] },
    { x: w * 0.52, text: "转换电路" },
    { x: w * 0.72, text: "输出电信号" },
  ];
  boxes.forEach((box, i) => {
    roundRect(box.x, y - 42, 126, 84, 8, i === 1 ? "rgba(15,139,141,0.18)" : "#f8fafc", palette.ink);
    label(box.text, box.x + 63, y, palette.ink, "center", 15);
    if (i < boxes.length - 1) arrow(box.x + 132, y, boxes[i + 1].x - 8, y, palette.teal, 3);
  });
  const signal = v.inputValue / 100;
  drawEnergyBar(w - 175, h - 78, 36, signal, 1, palette.blue, "输入");
  drawEnergyBar(w - 118, h - 78, 36, signal, 1, signal >= v.threshold / 100 ? palette.coral : palette.teal, "输出");
  if (v.showSignal) {
    const triggered = v.inputValue >= v.threshold;
    label(triggered ? "超过阈值：触发" : "未超过阈值", w * 0.5, h * 0.68, triggered ? palette.coral : palette.muted, "center", 18);
  }
  drawFormulaPanel(["非电学量 → 电信号", `输入=${v.inputValue.toFixed(0)}%`, `阈值=${v.threshold.toFixed(0)}%`]);
  readout.innerHTML = `传感器的价值在于把环境中的非电学量转换成可测、可处理、可控制的电信号。`;
}

function drawSensorPrinciples(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const output = sensorOutput(v);
  const typeName = v.sensorType === "photo" ? "光敏电阻" : v.sensorType === "thermal" ? "热敏电阻" : "霍尔元件";
  roundRect(w * 0.16, h * 0.34, 120, 92, 8, "rgba(15,139,141,0.18)", palette.teal);
  label(typeName, w * 0.16 + 60, h * 0.34 + 46, palette.ink, "center", 15);
  roundRect(w * 0.16 + 170, h * 0.34, 94, 92, 8, "#f8fafc", palette.ink);
  label("分压", w * 0.16 + 217, h * 0.34 + 46, palette.ink, "center", 15);
  arrow(w * 0.16 + 126, h * 0.34 + 46, w * 0.16 + 164, h * 0.34 + 46, palette.teal, 3);
  drawEnergyBar(w * 0.16 + 320, h * 0.34 + 92, 42, output * v.supply, v.supply, palette.coral, "Uout");
  if (v.showCurve) {
    const frame = plotFrame(w * 0.53, 54, w * 0.39, h * 0.48, "特性曲线", "输入", "输出");
    const pts = [];
    for (let i = 0; i <= 100; i += 1) {
      const input = i / 100;
      const val = v.sensorType === "photo" ? 0.9 - input * 0.72 : 0.18 + input * 0.7;
      pts.push({ x: frame.x0 + input * frame.w, y: frame.y0 - clamp(val, 0, 1) * frame.h });
    }
    plotCurve(frame, pts, v.sensorType === "photo" ? palette.blue : palette.coral, 3);
    const px = frame.x0 + (v.inputValue / 100) * frame.w;
    const py = frame.y0 - output * frame.h;
    ctx.fillStyle = palette.amber;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, TAU);
    ctx.fill();
  }
  drawFormulaPanel(["敏感元件", `Uout=${(output * v.supply).toFixed(2)}V`, `电源=${v.supply.toFixed(1)}V`]);
  readout.innerHTML = `不同传感器的敏感元件不同，但课堂建模都可以落到“输入变化引起电路输出变化”。`;
}

function drawSensorControl(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const on = v.sensorValue >= v.threshold;
  const y = h * 0.48;
  roundRect(w * 0.12, y - 44, 116, 88, 8, "rgba(15,139,141,0.18)", palette.teal);
  label("传感器", w * 0.12 + 58, y, palette.ink, "center", 15);
  roundRect(w * 0.34, y - 44, 116, 88, 8, "#f8fafc", palette.ink);
  label("比较器", w * 0.34 + 58, y, palette.ink, "center", 15);
  roundRect(w * 0.56, y - 44, 126, 88, 8, on ? "rgba(242,183,5,0.35)" : "#f8fafc", palette.ink);
  const actuatorName = v.actuator === "fan" ? "风扇" : v.actuator === "lamp" ? "灯" : "报警器";
  label(actuatorName, w * 0.56 + 63, y, palette.ink, "center", 15);
  arrow(w * 0.12 + 124, y, w * 0.34 - 8, y, palette.teal, 3);
  arrow(w * 0.34 + 124, y, w * 0.56 - 8, y, on ? palette.coral : palette.muted, 3);
  if (on) {
    if (v.actuator === "fan") {
      const c = { x: w * 0.56 + 63, y: y - 3 };
      for (let i = 0; i < 3; i += 1) {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(state.time * 8 + i * TAU / 3);
        roundRect(0, -8, 44, 16, 8, palette.blue, null);
        ctx.restore();
      }
    } else if (v.actuator === "lamp") {
      drawSmallBulb(w * 0.56 + 63, y - 4, true);
    } else {
      for (let i = 0; i < 3; i += 1) ctx.strokeStyle = palette.coral;
      label("响", w * 0.56 + 63, y - 4, palette.coral, "center", 24);
    }
  }
  if (v.feedback) {
    ctx.strokeStyle = palette.blue;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(w * 0.56 + 63, y + 68);
    ctx.lineTo(w * 0.18, y + 68);
    ctx.lineTo(w * 0.18, y + 48);
    ctx.stroke();
    ctx.setLineDash([]);
    label("反馈", w * 0.36, y + 88, palette.blue, "center", 13);
  }
  drawEnergyBar(w - 190, h - 76, 34, v.sensorValue, 100, palette.blue, "信号");
  drawEnergyBar(w - 134, h - 76, 34, v.threshold, 100, palette.coral, "阈值");
  drawFormulaPanel(["比较阈值", on ? "执行器 ON" : "执行器 OFF", v.feedback ? "含反馈" : "开环"]);
  readout.innerHTML = `简单自动控制装置由传感器、判断电路和执行器组成。当前信号 <strong>${on ? "超过" : "低于"}</strong> 阈值。`;
}

function molecularPotential(r) {
  const safeR = Math.max(0.55, r);
  return clamp(1 / safeR ** 12 - 2 / safeR ** 6, -1.2, 3);
}

function drawPistonBox(x, y, w, h, pistonRatio, fill = "rgba(48,102,190,0.12)") {
  roundRect(x, y, w, h, 8, fill, palette.ink);
  const pistonX = x + clamp(pistonRatio, 0.12, 0.92) * w;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(pistonX, y + 4);
  ctx.lineTo(pistonX, y + h - 4);
  ctx.stroke();
  return pistonX;
}

function drawAtomNucleus(x, y, protons, neutrons, scale = 1) {
  const total = Math.max(1, protons + neutrons);
  const count = Math.min(52, total);
  for (let i = 0; i < count; i += 1) {
    const ring = Math.floor(Math.sqrt(i));
    const angle = i * 2.399;
    const r = (7 + ring * 9) * scale;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    const isProton = i < protons || i % Math.max(2, Math.round(total / Math.max(1, protons))) === 0;
    ctx.fillStyle = isProton ? palette.coral : palette.blue;
    ctx.beginPath();
    ctx.arc(px, py, 7 * scale, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(23,32,42,0.55)";
    ctx.stroke();
  }
}

function drawMolecularTheory(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const boxW = clamp(w * 0.58 * v.volume, 250, w - 120);
  const boxH = clamp(h * 0.48 * v.volume, 190, h - 150);
  const x0 = (w - boxW) / 2;
  const y0 = h * 0.45 - boxH / 2;
  roundRect(x0, y0, boxW, boxH, 10, "rgba(48,102,190,0.08)", palette.ink);
  const speedScale = Math.sqrt(v.temperature / 300);
  for (let i = 0; i < v.particleCount; i += 1) {
    const seed = i * 12.989;
    const px = x0 + 14 + ((Math.sin(seed + state.time * speedScale * (0.7 + (i % 5) * 0.12)) + 1) / 2) * (boxW - 28);
    const py = y0 + 14 + ((Math.sin(seed * 1.7 + state.time * speedScale * (0.9 + (i % 7) * 0.1)) + 1) / 2) * (boxH - 28);
    ctx.fillStyle = i % 3 === 0 ? palette.coral : i % 3 === 1 ? palette.teal : palette.amber;
    ctx.beginPath();
    ctx.arc(px, py, 4.5, 0, TAU);
    ctx.fill();
    if (v.showCollisions && (i + Math.floor(state.time * 8)) % 13 === 0) {
      ctx.strokeStyle = "rgba(232,93,79,0.55)";
      ctx.beginPath();
      ctx.arc(px, py, 11, 0, TAU);
      ctx.stroke();
    }
  }
  drawEnergyBar(w - 210, h - 72, 36, v.temperature, 900, palette.coral, "T");
  drawEnergyBar(w - 150, h - 72, 36, speedScale, Math.sqrt(900 / 300), palette.teal, "v均");
  drawFormulaPanel(["温度 ∝ 平均动能", "大量分子统计规律", `v均∝${speedScale.toFixed(2)}`]);
  readout.innerHTML = `分子永不停息地做无规则运动。温度升高时平均动能增大，但单个分子的速率仍有涨落。`;
}

function drawOilFilmExperiment(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const pureVolume = v.dropVolume * v.concentration / 100;
  const thickness = pureVolume / v.filmArea;
  ctx.fillStyle = "rgba(48,102,190,0.12)";
  ctx.beginPath();
  ctx.ellipse(w * 0.42, h * 0.48, w * 0.28, h * 0.22, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = palette.blue;
  ctx.stroke();
  const filmR = clamp(Math.sqrt(v.filmArea) * 4, 55, Math.min(w, h) * 0.28);
  ctx.fillStyle = "rgba(242,183,5,0.35)";
  ctx.beginPath();
  ctx.ellipse(w * 0.42, h * 0.48, filmR * 1.25, filmR * 0.62, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = palette.amber;
  ctx.stroke();
  label("单分子油膜", w * 0.42, h * 0.48, palette.ink, "center", 15);
  arrow(w * 0.2, h * 0.18, w * 0.34, h * 0.34, palette.coral, 3);
  label("油酸溶液", w * 0.18, h * 0.16, palette.coral, "left", 14);
  if (v.showCalc) {
    roundRect(w * 0.63, h * 0.32, w * 0.28, 150, 8, "rgba(255,255,255,0.88)", palette.line);
    label(`V油酸 = ${pureVolume.toExponential(2)} mL`, w * 0.65, h * 0.36, palette.ink);
    label(`S油膜 = ${v.filmArea.toFixed(0)} cm²`, w * 0.65, h * 0.42, palette.ink);
    label(`d = V/S`, w * 0.65, h * 0.48, palette.teal);
    label(`d相对 = ${thickness.toExponential(2)}`, w * 0.65, h * 0.54, palette.coral);
  }
  drawFormulaPanel(["d = V/S", "单分子层假设", "数量级估算"]);
  readout.innerHTML = `油膜法把油酸铺成单分子层，用纯油酸体积除以油膜面积估测分子大小。`;
}

function drawSpeedDistribution(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const frame = plotFrame(54, 58, w - 108, h * 0.62, "分子速率分布", "v", "f(v)");
  function distribution(temp, mass, x) {
    const a = mass / Math.max(80, temp);
    return x * x * Math.exp(-a * x * x);
  }
  const maxX = 7;
  const maxVal = distribution(v.temperature, v.molecularMass, Math.sqrt(v.temperature / v.molecularMass));
  const pts = [];
  for (let i = 0; i <= 160; i += 1) {
    const x = (i / 160) * maxX;
    pts.push({ x: frame.x0 + (x / maxX) * frame.w, y: frame.y0 - (distribution(v.temperature, v.molecularMass, x) / maxVal) * frame.h * 0.84 });
  }
  if (v.showCompare) {
    const lowPts = [];
    const lowT = Math.max(100, v.temperature * 0.55);
    const lowMax = distribution(lowT, v.molecularMass, Math.sqrt(lowT / v.molecularMass));
    for (let i = 0; i <= 160; i += 1) {
      const x = (i / 160) * maxX;
      lowPts.push({ x: frame.x0 + (x / maxX) * frame.w, y: frame.y0 - (distribution(lowT, v.molecularMass, x) / lowMax) * frame.h * 0.7 });
    }
    plotCurve(frame, lowPts, "rgba(96,112,128,0.55)", 2);
  }
  plotCurve(frame, pts, palette.blue, 3);
  const vp = Math.sqrt(v.temperature / v.molecularMass);
  if (v.showMostLikely) {
    const px = frame.x0 + clamp(vp / maxX, 0, 1) * frame.w;
    arrow(px, frame.y0, px, frame.y0 - frame.h * 0.72, palette.coral, 2);
    label("最概然速率", px + 10, frame.y0 - frame.h * 0.72, palette.coral, "left", 13);
  }
  drawFormulaPanel(["统计分布", `vp∝√(T/m)`, `vp∝${vp.toFixed(2)}`]);
  readout.innerHTML = `速率分布描述大量分子的统计规律；升温后曲线变宽并向高速方向移动。`;
}

function drawMolecularEnergy(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const r = v.distance;
  const ep = molecularPotential(r);
  const y = h * 0.36;
  const gap = 80 * r;
  ctx.fillStyle = palette.blue;
  ctx.beginPath();
  ctx.arc(w * 0.38 - gap / 2, y, 22, 0, TAU);
  ctx.arc(w * 0.38 + gap / 2, y, 22, 0, TAU);
  ctx.fill();
  if (v.showForce) {
    const f = r < 1 ? 1 : -1;
    vector({ x: w * 0.38 - gap / 2, y }, -f * 62, 0, r < 1 ? palette.coral : palette.teal, r < 1 ? "斥力" : "引力");
    vector({ x: w * 0.38 + gap / 2, y }, f * 62, 0, r < 1 ? palette.coral : palette.teal, "");
  }
  if (v.showPotential) {
    const frame = plotFrame(60, h * 0.52, w - 120, h * 0.34, "分子势能曲线", "r/r₀", "Ep");
    const pts = [];
    for (let i = 0; i <= 160; i += 1) {
      const x = 0.65 + (i / 160) * 1.9;
      pts.push({ x: frame.x0 + (i / 160) * frame.w, y: frame.y0 - (molecularPotential(x) + 1.2) / 4.2 * frame.h });
    }
    plotCurve(frame, pts, palette.blue, 3);
    const px = frame.x0 + ((r - 0.65) / 1.9) * frame.w;
    const py = frame.y0 - (ep + 1.2) / 4.2 * frame.h;
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, TAU);
    ctx.fill();
  }
  drawEnergyBar(w - 210, h - 72, 36, v.temperature, 900, palette.coral, "Ek");
  drawEnergyBar(w - 150, h - 72, 36, ep + 1.2, 4.2, palette.teal, "Ep");
  drawFormulaPanel(["内能=Ek+Ep", `r/r₀=${r.toFixed(2)}`, `Ep∝${ep.toFixed(2)}`]);
  readout.innerHTML = `分子平均动能主要由温度决定；分子势能随分子间距离变化，在平衡距离附近最低。`;
}

function drawTemperatureScale(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const k = v.celsius + 273.15;
  const f = v.celsius * 9 / 5 + 32;
  const scales = [
    ["℃", v.celsius, -120, 260, palette.coral],
    ["K", k, 153, 533, palette.teal],
    ["℉", f, -184, 500, palette.blue],
  ];
  scales.forEach(([name, value, min, max, color], i) => {
    const x = w * (0.25 + i * 0.22);
    roundRect(x - 24, h * 0.2, 48, h * 0.55, 22, "#f8fafc", palette.ink);
    const fillH = clamp((value - min) / (max - min), 0, 1) * h * 0.48;
    roundRect(x - 15, h * 0.72 - fillH, 30, fillH, 14, color, null);
    label(name, x, h * 0.8, color, "center", 18);
    label(`${value.toFixed(name === "K" ? 1 : 0)}`, x, h * 0.14, palette.ink, "center", 16);
  });
  if (v.showThermometer) label("热平衡：温度计与被测物体达到共同温度", w * 0.5, h * 0.9, palette.ink, "center", 16);
  drawFormulaPanel(["T = t + 273.15", `t=${v.celsius.toFixed(0)}℃`, `T=${k.toFixed(1)}K`]);
  readout.innerHTML = `温度反映冷热程度。热力学温标与摄氏温标只差一个平移量，0K 对应绝对零度。`;
}

function drawIsothermalGas(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const p = v.amount * v.temperature / v.volume;
  const pistonRatio = clamp(v.volume / 3, 0.16, 0.88);
  drawPistonBox(70, h * 0.28, w * 0.42, h * 0.34, pistonRatio);
  for (let i = 0; i < 24; i += 1) {
    const x = 88 + ((Math.sin(i * 2.1 + state.time) + 1) / 2) * (w * 0.42 * pistonRatio - 30);
    const y = h * 0.31 + ((Math.sin(i * 3.7 + state.time * 1.4) + 1) / 2) * (h * 0.28);
    ctx.fillStyle = palette.blue;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, TAU);
    ctx.fill();
  }
  if (v.showCurve) {
    const frame = plotFrame(w * 0.56, 56, w * 0.36, h * 0.55, "p-V 图像", "V", "p");
    const pts = [];
    for (let i = 0; i <= 100; i += 1) {
      const vv = 0.5 + (i / 100) * 2.5;
      const pp = v.amount * v.temperature / vv;
      pts.push({ x: frame.x0 + (vv - 0.5) / 2.5 * frame.w, y: frame.y0 - clamp(pp / (v.amount * v.temperature / 0.5), 0, 1) * frame.h });
    }
    plotCurve(frame, pts, palette.coral, 3);
  }
  drawFormulaPanel(["pV=C", `p∝${p.toFixed(1)}`, `pV∝${(p * v.volume).toFixed(1)}`]);
  readout.innerHTML = `一定质量理想气体在温度不变时，压强与体积成反比，pV 保持不变。`;
}

function drawGasLaws(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const ratio = v.temperature / 300;
  const y = h * 0.3;
  if (v.mode === "isobaric") {
    const volume = clamp(v.baseValue * ratio, 0.35, 2.8);
    drawPistonBox(80, y, w * 0.44, h * 0.32, clamp(volume / 3, 0.18, 0.9), "rgba(15,139,141,0.12)");
    label("等压加热：活塞移动，V 随 T 增大", w * 0.31, y + h * 0.4, palette.teal, "center", 15);
  } else {
    drawPistonBox(80, y, w * 0.44, h * 0.32, 0.48, "rgba(232,93,79,0.1)");
    const pressure = v.baseValue * ratio;
    vector({ x: w * 0.31, y: y + 34 }, 0, clamp(pressure * 34, 26, 120), palette.coral, "p");
    label("等容加热：体积不变，p 随 T 增大", w * 0.31, y + h * 0.4, palette.coral, "center", 15);
  }
  if (v.showGraph) {
    const frame = plotFrame(w * 0.58, 60, w * 0.34, h * 0.5, v.mode === "isobaric" ? "V-T 图像" : "p-T 图像", "T/K", v.mode === "isobaric" ? "V" : "p");
    const pts = [];
    for (let i = 0; i <= 80; i += 1) {
      const t = 200 + (i / 80) * 500;
      const val = v.baseValue * t / 300;
      pts.push({ x: frame.x0 + (i / 80) * frame.w, y: frame.y0 - clamp(val / 2.8, 0, 1) * frame.h });
    }
    plotCurve(frame, pts, palette.blue, 3);
  }
  drawFormulaPanel([v.mode === "isobaric" ? "V/T=C" : "p/T=C", "T 用热力学温标", `T=${v.temperature.toFixed(0)}K`]);
  readout.innerHTML = `等压或等容条件下，气体状态量与热力学温度呈线性关系。`;
}

function drawSolidCrystal(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const cols = 9;
  const rows = 6;
  const gap = Math.min(48, (w - 140) / cols);
  const x0 = w * 0.22;
  const y0 = h * 0.24;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const disorder = v.solidType === "amorphous" ? 18 : v.defects * 36;
      const dx = Math.sin((r * cols + c) * 2.2) * disorder;
      const dy = Math.cos((r * cols + c) * 1.7) * disorder;
      const defect = Math.sin((r * cols + c) * 4.1) < -1 + v.defects * 2;
      ctx.fillStyle = defect ? palette.coral : palette.blue;
      ctx.beginPath();
      ctx.arc(x0 + c * gap + dx, y0 + r * gap + dy, defect ? 5 : 8, 0, TAU);
      ctx.fill();
      if (v.solidType === "crystal" && c > 0) {
        ctx.strokeStyle = "rgba(96,112,128,0.25)";
        ctx.beginPath();
        ctx.moveTo(x0 + (c - 1) * gap, y0 + r * gap);
        ctx.lineTo(x0 + c * gap, y0 + r * gap);
        ctx.stroke();
      }
    }
  }
  if (v.showUnitCell && v.solidType === "crystal") {
    roundRect(x0 - gap / 2, y0 - gap / 2, gap * 2, gap * 2, 4, null, palette.coral);
    label("晶胞", x0 + gap * 0.5, y0 - gap * 0.75, palette.coral, "center", 13);
  }
  drawEnergyBar(w - 190, h - 76, 36, v.temperature, 1, palette.amber, "T");
  drawFormulaPanel([v.solidType === "crystal" ? "晶体：长程有序" : "非晶体：无长程有序", "各向异性", "固定熔点"]);
  readout.innerHTML = `晶体内部粒子呈规则排列，非晶体缺少长程有序；微观结构决定许多宏观性质。`;
}

function drawLiquidSurface(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const tension = v.surfaceTension * (1 - v.temperature * 0.35);
  const height = (v.wetting === "wet" ? 1 : -1) * tension / v.capillaryRadius;
  ctx.fillStyle = "rgba(48,102,190,0.18)";
  ctx.fillRect(60, h * 0.58, w - 120, h * 0.25);
  ctx.strokeStyle = palette.blue;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 60; x <= w - 60; x += 4) {
    const y = h * 0.58 + Math.sin((x / 30) + state.time) * tension * 4;
    if (x === 60) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  const tubeX = w * 0.55;
  const tubeW = 26 + v.capillaryRadius * 16;
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tubeX - tubeW / 2, h * 0.2);
  ctx.lineTo(tubeX - tubeW / 2, h * 0.74);
  ctx.moveTo(tubeX + tubeW / 2, h * 0.2);
  ctx.lineTo(tubeX + tubeW / 2, h * 0.74);
  ctx.stroke();
  const meniscusY = h * 0.58 - height * 75;
  ctx.fillStyle = "rgba(48,102,190,0.35)";
  ctx.fillRect(tubeX - tubeW / 2 + 2, meniscusY, tubeW - 4, h * 0.74 - meniscusY);
  ctx.strokeStyle = palette.coral;
  ctx.beginPath();
  ctx.ellipse(tubeX, meniscusY, tubeW / 2 - 2, 10, 0, 0, Math.PI, v.wetting !== "wet");
  ctx.stroke();
  label(v.wetting === "wet" ? "浸润：液面上升" : "不浸润：液面下降", w * 0.3, h * 0.3, palette.ink, "center", 16);
  drawFormulaPanel(["毛细现象", "h ∝ σ/r", `h∝${height.toFixed(2)}`]);
  readout.innerHTML = `表面张力使液面趋于收缩；毛细管越细，浸润或不浸润导致的升降越明显。`;
}

function drawWorkHeatInternal(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const delta = v.work + v.heat;
  drawPistonBox(90, h * 0.28, w * 0.42, h * 0.34, clamp(0.52 - v.work / 500, 0.22, 0.8), "rgba(242,183,5,0.12)");
  arrow(70, h * 0.45, 120, h * 0.45, v.work >= 0 ? palette.coral : palette.blue, 3);
  label(v.work >= 0 ? "外界做功" : "系统做功", 76, h * 0.38, v.work >= 0 ? palette.coral : palette.blue);
  arrow(w * 0.33, h * 0.18, w * 0.33, h * 0.29, v.heat >= 0 ? palette.amber : palette.teal, 3);
  label(v.heat >= 0 ? "吸热" : "放热", w * 0.36, h * 0.2, v.heat >= 0 ? palette.amber : palette.teal);
  if (v.showPath) {
    const frame = plotFrame(w * 0.58, 58, w * 0.34, h * 0.46, "过程路径", "V", "p");
    plotCurve(frame, [
      { x: frame.x0 + frame.w * 0.2, y: frame.y0 - frame.h * 0.25 },
      { x: frame.x0 + frame.w * 0.48, y: frame.y0 - frame.h * 0.58 },
      { x: frame.x0 + frame.w * 0.76, y: frame.y0 - frame.h * 0.42 },
    ], palette.blue, 3);
  }
  drawEnergyBar(w - 220, h - 70, 36, v.initialEnergy, v.initialEnergy + Math.abs(delta), palette.muted, "U0");
  drawEnergyBar(w - 160, h - 70, 36, v.initialEnergy + delta, v.initialEnergy + Math.abs(delta), delta >= 0 ? palette.coral : palette.blue, "U");
  drawFormulaPanel(["ΔU = Q + W", `Q=${v.heat.toFixed(0)}J`, `W=${v.work.toFixed(0)}J`]);
  readout.innerHTML = `做功和热传递都能改变内能。当前内能变化 ΔU = <strong>${delta.toFixed(0)} J</strong>。`;
}

function drawFirstLawThermo(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const q = v.process === "adiabatic" ? 0 : v.heat;
  const work = v.process === "isovolumic" ? 0 : v.work;
  const delta = q + work;
  roundRect(w * 0.36, h * 0.26, w * 0.28, h * 0.32, 12, "rgba(48,102,190,0.08)", palette.ink);
  label("系统", w * 0.5, h * 0.42, palette.ink, "center", 24);
  arrow(w * 0.16, h * 0.35, w * 0.35, h * 0.35, q >= 0 ? palette.amber : palette.teal, 4);
  label(`Q=${q.toFixed(0)}J`, w * 0.25, h * 0.3, q >= 0 ? palette.amber : palette.teal, "center", 16);
  arrow(w * 0.5, h * 0.73, w * 0.5, h * 0.59, work >= 0 ? palette.coral : palette.blue, 4);
  label(`W=${work.toFixed(0)}J`, w * 0.55, h * 0.68, work >= 0 ? palette.coral : palette.blue, "left", 16);
  if (v.showLedger) {
    drawEnergyBar(w - 220, h - 70, 34, Math.abs(q), 240, palette.amber, "Q");
    drawEnergyBar(w - 166, h - 70, 34, Math.abs(work), 240, palette.coral, "W");
    drawEnergyBar(w - 112, h - 70, 34, Math.abs(delta), 240, delta >= 0 ? palette.teal : palette.blue, "ΔU");
  }
  drawFormulaPanel(["ΔU=Q+W", `过程=${v.process === "adiabatic" ? "绝热" : v.process === "isovolumic" ? "等容" : "等压"}`, `ΔU=${delta.toFixed(0)}J`]);
  readout.innerHTML = `热力学第一定律是能量守恒在热现象中的表达。当前过程满足 ΔU = Q + W。`;
}

function drawThermoEnergyConservation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const useful = v.inputEnergy * v.efficiency / 100;
  const thermal = v.inputEnergy * v.thermalLoss / 100;
  const other = Math.max(0, v.inputEnergy - useful - thermal);
  roundRect(70, h * 0.42, 110, 70, 8, palette.amber, palette.ink);
  label("输入能量", 125, h * 0.42 + 35, palette.ink, "center", 15);
  const branches = [
    [useful, "有用输出", palette.teal, h * 0.26],
    [thermal, "热损失", palette.coral, h * 0.47],
    [other, "其他耗散", palette.blue, h * 0.68],
  ];
  branches.forEach(([value, text, color, y]) => {
    arrow(182, h * 0.42 + 35, w * 0.72, y, color, clamp(value / v.inputEnergy * 14, 2, 12));
    roundRect(w * 0.72, y - 26, 118, 52, 8, "rgba(255,255,255,0.86)", color);
    label(`${text}`, w * 0.72 + 59, y - 8, color, "center", 13);
    label(`${value.toFixed(0)}J`, w * 0.72 + 59, y + 12, palette.ink, "center", 13);
  });
  if (v.showSankey) label("总输入 = 各输出之和，能量没有消失", w * 0.5, h * 0.86, palette.ink, "center", 16);
  drawFormulaPanel(["能量守恒", `η=${v.efficiency.toFixed(0)}%`, `有用=${useful.toFixed(0)}J`]);
  readout.innerHTML = `能量转化过程中总量守恒，但有用能可能转化为较难再利用的内能等形式。`;
}

function drawSecondLawThermo(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const eta = Math.max(0, 1 - v.coldTemp / v.hotTemp);
  roundRect(w * 0.18, h * 0.16, 160, 64, 8, "rgba(232,93,79,0.18)", palette.coral);
  label(`高温热源 ${v.hotTemp.toFixed(0)}K`, w * 0.18 + 80, h * 0.16 + 32, palette.coral, "center", 14);
  roundRect(w * 0.18, h * 0.68, 160, 64, 8, "rgba(48,102,190,0.18)", palette.blue);
  label(`低温热源 ${v.coldTemp.toFixed(0)}K`, w * 0.18 + 80, h * 0.68 + 32, palette.blue, "center", 14);
  roundRect(w * 0.52, h * 0.38, 138, 96, 10, "#f8fafc", palette.ink);
  label(v.mode === "engine" ? "热机" : "制冷机", w * 0.52 + 69, h * 0.38 + 48, palette.ink, "center", 20);
  if (v.mode === "engine") {
    arrow(w * 0.28, h * 0.25, w * 0.52, h * 0.42, palette.coral, 4);
    arrow(w * 0.52 + 69, h * 0.48, w * 0.83, h * 0.48, palette.teal, 4);
    arrow(w * 0.52, h * 0.48, w * 0.28, h * 0.68, palette.blue, 4);
    label("输出功", w * 0.82, h * 0.43, palette.teal, "right", 16);
  } else {
    arrow(w * 0.83, h * 0.48, w * 0.52 + 138, h * 0.48, palette.teal, 4);
    arrow(w * 0.28, h * 0.68, w * 0.52, h * 0.52, palette.blue, 4);
    arrow(w * 0.52, h * 0.42, w * 0.28, h * 0.25, palette.coral, 4);
    label("外界做功", w * 0.82, h * 0.43, palette.teal, "right", 16);
  }
  if (v.showEntropy) label("自然过程具有方向性", w * 0.5, h * 0.86, palette.ink, "center", 17);
  drawFormulaPanel(["ηC=1-Tc/Th", `ηmax=${(eta * 100).toFixed(1)}%`, v.mode === "engine" ? "热机" : "制冷机"]);
  readout.innerHTML = `热力学第二定律说明能量转化具有方向性，热机不能把吸收的热量全部转化为功。`;
}

function drawPlanckRadiation(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const frame = plotFrame(56, 58, w - 112, h * 0.58, "黑体辐射曲线", "λ/nm", "强度");
  function intensity(temp, lambda) {
    const x = lambda / (2900000 / temp);
    return x <= 0 ? 0 : (1 / x ** 5) / (Math.exp(4 / x) - 1);
  }
  const max = intensity(v.temperature, 2900000 / v.temperature);
  const pts = [];
  for (let i = 0; i <= 180; i += 1) {
    const lambda = 100 + (i / 180) * 1900;
    pts.push({ x: frame.x0 + (lambda - 100) / 1900 * frame.w, y: frame.y0 - clamp(intensity(v.temperature, lambda) / max, 0, 1) * frame.h * 0.86 });
  }
  plotCurve(frame, pts, palette.coral, 3);
  if (v.showClassical) {
    const classical = [];
    for (let i = 0; i <= 180; i += 1) {
      const lambda = 100 + (i / 180) * 1900;
      classical.push({ x: frame.x0 + (lambda - 100) / 1900 * frame.w, y: frame.y0 - clamp(600 / lambda, 0, 1) * frame.h });
    }
    plotCurve(frame, classical, "rgba(96,112,128,0.55)", 2);
  }
  const px = frame.x0 + (v.wavelength - 100) / 1900 * frame.w;
  arrow(px, frame.y0, px, frame.y0 - frame.h * 0.72, palette.blue, 2);
  drawFormulaPanel(["E=hν", "λmaxT≈常量", `λmax≈${(2900000 / v.temperature).toFixed(0)}nm`]);
  readout.innerHTML = `黑体温度升高时，辐射峰向短波方向移动，总辐射强度增大，能量量子化解释了实验曲线。`;
}

function drawPhotoelectricEffectS3(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const ek = Math.max(0, v.frequency - v.workFunction);
  roundRect(w * 0.15, h * 0.32, 90, 160, 6, "rgba(96,112,128,0.28)", palette.ink);
  label("金属板", w * 0.15 + 45, h * 0.32 + 180, palette.ink, "center", 13);
  for (let i = 0; i < 7; i += 1) arrow(62 + i * 22, h * 0.22, w * 0.15 + 10 + i * 8, h * 0.35 + i * 14, palette.amber, 2);
  if (ek > 0) {
    const count = Math.round(v.intensity / 14);
    for (let i = 0; i < count; i += 1) {
      const y = h * 0.36 + i * 19;
      arrow(w * 0.15 + 94, y, w * 0.15 + 170 + ek * 18, y + Math.sin(state.time + i) * 12, palette.blue, 2);
      ctx.fillStyle = palette.blue;
      ctx.beginPath();
      ctx.arc(w * 0.15 + 170 + ek * 18, y + Math.sin(state.time + i) * 12, 4, 0, TAU);
      ctx.fill();
    }
  } else {
    label("频率低于截止频率：无光电子", w * 0.55, h * 0.48, palette.coral, "center", 18);
  }
  drawEnergyBar(w - 220, h - 72, 36, v.frequency, 12, palette.amber, "hν");
  drawEnergyBar(w - 162, h - 72, 36, v.workFunction, 12, palette.coral, "W0");
  drawEnergyBar(w - 104, h - 72, 36, ek, 12, palette.teal, "Ek");
  drawFormulaPanel(["hν=W₀+Ek", ek > 0 ? `Ek=${ek.toFixed(1)}` : "ν<ν₀", `光强=${v.intensity.toFixed(0)}%`]);
  readout.innerHTML = `光电效应中，频率决定单个光子的能量；光强主要影响单位时间逸出的电子数。`;
}

function drawNuclearAtomModel(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const nucleus = { x: w * 0.58, y: h * 0.5 };
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(nucleus.x, nucleus.y, 18, 0, TAU);
  ctx.fill();
  label("原子核", nucleus.x, nucleus.y + 36, palette.coral, "center", 13);
  if (v.showTracks) {
    for (let i = -5; i <= 5; i += 1) {
      const offset = i * 24;
      const bend = 70 / (v.energy * (Math.abs(i) * 0.12 + v.impact));
      ctx.strokeStyle = i === 0 ? palette.coral : "rgba(48,102,190,0.55)";
      ctx.lineWidth = i === 0 ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(50, nucleus.y + offset);
      ctx.quadraticCurveTo(nucleus.x - 80, nucleus.y + offset, nucleus.x + 30, nucleus.y + offset + Math.sign(offset || 1) * bend);
      ctx.lineTo(w - 60, nucleus.y + offset + Math.sign(offset || 1) * bend * 1.5);
      ctx.stroke();
    }
  } else {
    const bend = 90 / (v.energy * v.impact);
    ctx.strokeStyle = palette.blue;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(60, nucleus.y - v.impact * 80);
    ctx.quadraticCurveTo(nucleus.x - 70, nucleus.y - v.impact * 80, nucleus.x + 50, nucleus.y - v.impact * 80 - bend);
    ctx.lineTo(w - 60, nucleus.y - v.impact * 80 - bend * 1.3);
    ctx.stroke();
  }
  drawFormulaPanel(["α 粒子散射", "少数大角度偏转", `偏转∝${(1 / (v.energy * v.impact)).toFixed(2)}`]);
  readout.innerHTML = `α 粒子散射实验表明，原子的正电荷和绝大部分质量集中在很小的原子核中。`;
}

function drawHydrogenBohr(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const high = Math.max(v.nHigh, v.nLow + 1);
  const low = Math.min(v.nLow, high - 1);
  const energy = 13.6 * (1 / (low * low) - 1 / (high * high));
  const cx = w * 0.33;
  const cy = h * 0.5;
  ctx.fillStyle = palette.coral;
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, TAU);
  ctx.fill();
  for (let n = 1; n <= 6; n += 1) {
    ctx.strokeStyle = n === high ? palette.amber : n === low ? palette.teal : "rgba(96,112,128,0.32)";
    ctx.lineWidth = n === high || n === low ? 3 : 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, n * 28, 0, TAU);
    ctx.stroke();
  }
  const a1 = state.time % TAU;
  const p1 = { x: cx + Math.cos(a1) * high * 28, y: cy + Math.sin(a1) * high * 28 };
  const p2 = { x: cx + Math.cos(a1 + 0.9) * low * 28, y: cy + Math.sin(a1 + 0.9) * low * 28 };
  drawPlusMinus(p1.x, p1.y, -1, palette.blue);
  arrow(p1.x, p1.y, p2.x, p2.y, palette.coral, 3);
  arrow(cx + high * 28 + 20, cy - 20, w * 0.72, h * 0.28, palette.amber, 3);
  label("光子 hν", w * 0.72, h * 0.25, palette.amber, "center", 15);
  if (v.showSpectrum) {
    for (let i = 0; i < 5; i += 1) {
      const x = w * 0.62 + i * 34;
      ctx.strokeStyle = i === low ? palette.coral : palette.blue;
      ctx.lineWidth = i === low ? 5 : 3;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.58);
      ctx.lineTo(x, h * 0.78);
      ctx.stroke();
    }
    label("分立谱线", w * 0.72, h * 0.82, palette.ink, "center", 14);
  }
  drawFormulaPanel(["En=-13.6/n² eV", `跃迁 ${high.toFixed(0)}→${low.toFixed(0)}`, `hν=${energy.toFixed(2)}eV`]);
  readout.innerHTML = `氢原子只能处于分立能级，电子跃迁时发射或吸收特定频率的光子。`;
}

function drawMatterWave(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const lambda = 1 / (v.mass * v.speed);
  arrow(60, h * 0.48, w * 0.36, h * 0.48, palette.blue, 3);
  drawPlusMinus(w * 0.22 + Math.sin(state.time * v.speed) * 35, h * 0.48, -1, palette.blue);
  roundRect(w * 0.4, h * 0.26, 20, h * 0.44, 3, palette.ink, null);
  roundRect(w * 0.4 + 20, h * 0.45 - v.slitSpacing * 14, 10, v.slitSpacing * 28, 2, "#fff", palette.ink);
  if (v.showDiffraction) {
    const center = w * 0.72;
    const spacing = clamp(lambda / v.slitSpacing * 190, 10, 110);
    for (let i = -8; i <= 8; i += 1) {
      const alpha = Math.exp(-Math.abs(i) * 0.22);
      ctx.fillStyle = `rgba(242,183,5,${0.08 + alpha * 0.55})`;
      ctx.fillRect(center + i * spacing - 5, h * 0.22, 10, h * 0.56);
    }
  }
  drawFormulaPanel(["λ=h/p", "p=mv", `λ相对=${lambda.toFixed(2)}`]);
  readout.innerHTML = `德布罗意关系把动量和波长联系起来；质量或速度越大，物质波波长越短。`;
}

function drawNucleusComposition(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const z = Math.round(v.protons);
  const n = Math.round(v.neutrons);
  drawAtomNucleus(w * 0.42, h * 0.5, z, n, 1.25);
  if (v.showSymbol) {
    const a = z + n;
    label(`${a}`, w * 0.64, h * 0.38, palette.ink, "right", 20);
    label(`${z}`, w * 0.64, h * 0.48, palette.ink, "right", 20);
    label("X", w * 0.67, h * 0.43, palette.coral, "left", 46);
    label("A=Z+N", w * 0.72, h * 0.39, palette.teal, "left", 16);
    label("Z 决定元素", w * 0.72, h * 0.49, palette.teal, "left", 16);
  }
  drawEnergyBar(w - 190, h - 76, 34, z, 26, palette.coral, "Z");
  drawEnergyBar(w - 134, h - 76, 34, n, 26, palette.blue, "N");
  drawFormulaPanel(["A=Z+N", `Z=${z}`, `A=${z + n}`]);
  readout.innerHTML = `原子核由质子和中子组成。质子数决定元素种类，中子数不同可形成同位素。`;
}

function drawRadioactiveDecay(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const left = v.initialN * 2 ** (-v.elapsed / v.halfLife);
  const decayed = v.initialN - left;
  const cols = 14;
  const count = Math.min(196, Math.round(v.initialN));
  const x0 = 54;
  const y0 = 68;
  for (let i = 0; i < count; i += 1) {
    const alive = i < left + Math.sin(i * 7.1) * 1.8;
    ctx.fillStyle = alive ? palette.blue : "rgba(232,93,79,0.4)";
    ctx.beginPath();
    ctx.arc(x0 + (i % cols) * 18, y0 + Math.floor(i / cols) * 18, 6, 0, TAU);
    ctx.fill();
  }
  if (v.showGraph) {
    const frame = plotFrame(w * 0.48, 58, w * 0.44, h * 0.5, "N-t 衰变曲线", "t", "N");
    const pts = [];
    for (let i = 0; i <= 120; i += 1) {
      const t = (i / 120) * 30;
      const val = v.initialN * 2 ** (-t / v.halfLife);
      pts.push({ x: frame.x0 + (i / 120) * frame.w, y: frame.y0 - (val / v.initialN) * frame.h });
    }
    plotCurve(frame, pts, palette.coral, 3);
    const px = frame.x0 + (v.elapsed / 30) * frame.w;
    arrow(px, frame.y0, px, frame.y0 - (left / v.initialN) * frame.h, palette.teal, 2);
  }
  drawFormulaPanel(["N=N₀(1/2)^(t/T)", `剩余≈${left.toFixed(0)}`, `衰变≈${decayed.toFixed(0)}`]);
  readout.innerHTML = `半衰期描述大量原子核衰变的统计规律，不能预测某一个原子核的具体衰变时刻。`;
}

function bindingCurveValue(a) {
  return clamp(8.8 * (1 - Math.exp(-a / 18)) - Math.max(0, a - 60) * 0.004, 0.5, 8.8);
}

function drawBindingEnergy(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  if (v.showCurve) {
    const frame = plotFrame(56, 58, w - 112, h * 0.56, "比结合能曲线", "A", "E/A");
    const pts = [];
    for (let i = 2; i <= 240; i += 2) {
      pts.push({ x: frame.x0 + (i - 2) / 238 * frame.w, y: frame.y0 - bindingCurveValue(i) / 9 * frame.h });
    }
    plotCurve(frame, pts, palette.blue, 3);
    const px = frame.x0 + (v.massNumber - 2) / 238 * frame.w;
    const py = frame.y0 - bindingCurveValue(v.massNumber) / 9 * frame.h;
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, TAU);
    ctx.fill();
  }
  drawEnergyBar(w - 210, h - 70, 36, v.massDefect * 931.5, 1700, palette.coral, "E");
  drawEnergyBar(w - 150, h - 70, 36, v.massDefect * 931.5 / v.massNumber, 9, palette.teal, "E/A");
  drawFormulaPanel(["ΔE=Δmc²", `E=${(v.massDefect * 931.5).toFixed(0)}MeV`, `E/A=${(v.massDefect * 931.5 / v.massNumber).toFixed(2)}`]);
  readout.innerHTML = `质量亏损对应结合能。比结合能越大，平均每个核子结合得越牢，原子核通常越稳定。`;
}

function drawFissionFusion(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const energy = v.massDefect * 931.5;
  if (v.reaction === "fission") {
    drawAtomNucleus(w * 0.28, h * 0.5, 20, 28, 0.9);
    arrow(w * 0.08, h * 0.5, w * 0.21, h * 0.5, palette.blue, 3);
    label("中子", w * 0.11, h * 0.45, palette.blue);
    arrow(w * 0.37, h * 0.5, w * 0.52, h * 0.35, palette.coral, 3);
    arrow(w * 0.37, h * 0.5, w * 0.52, h * 0.65, palette.coral, 3);
    drawAtomNucleus(w * 0.6, h * 0.35, 10, 12, 0.75);
    drawAtomNucleus(w * 0.6, h * 0.65, 9, 15, 0.75);
    if (v.showChain) {
      for (let i = 0; i < Math.round(v.neutronFactor * 2); i += 1) arrow(w * 0.67, h * 0.5, w * 0.82, h * (0.25 + i * 0.16), palette.blue, 2);
    }
  } else {
    drawAtomNucleus(w * 0.27, h * 0.42, 1, 1, 0.85);
    drawAtomNucleus(w * 0.27, h * 0.62, 1, 2, 0.85);
    arrow(w * 0.34, h * 0.45, w * 0.5, h * 0.5, palette.coral, 3);
    arrow(w * 0.34, h * 0.6, w * 0.5, h * 0.5, palette.coral, 3);
    drawAtomNucleus(w * 0.62, h * 0.5, 2, 2, 1.05);
    label("高温高压克服库仑斥力", w * 0.5, h * 0.78, palette.coral, "center", 16);
  }
  for (let i = 0; i < 9; i += 1) {
    arrow(w * 0.47, h * 0.5, w * 0.47 + Math.cos(i * TAU / 9) * (70 + energy), h * 0.5 + Math.sin(i * TAU / 9) * (70 + energy), palette.amber, 1.8);
  }
  drawFormulaPanel(["释放能量=Δmc²", `E≈${energy.toFixed(1)}MeV`, v.reaction === "fission" ? "链式反应" : "聚变反应"]);
  readout.innerHTML = `裂变和聚变都可能释放能量，本质上是反应后总质量减小，质量亏损转化为能量。`;
}

function drawElementaryParticles(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const groups = v.category === "quark"
    ? [["u", palette.coral], ["d", palette.coral], ["s", palette.coral], ["c", palette.coral], ["b", palette.coral], ["t", palette.coral]]
    : v.category === "lepton"
      ? [["e", palette.blue], ["μ", palette.blue], ["τ", palette.blue], ["νe", palette.blue], ["νμ", palette.blue], ["ντ", palette.blue]]
      : [["p", palette.teal], ["n", palette.teal], ["π", palette.teal], ["K", palette.teal], ["Λ", palette.teal], ["强子", palette.teal]];
  groups.forEach(([text, color], i) => {
    const x = w * 0.28 + (i % 3) * 110;
    const y = h * 0.32 + Math.floor(i / 3) * 105;
    roundRect(x - 34, y - 28, 68, 56, 8, `rgba(255,255,255,0.86)`, color);
    label(text, x, y, color, "center", 20);
  });
  if (v.showForces) {
    const center = { x: w * 0.7, y: h * 0.44 };
    ["电磁", "强", "弱", "引力"].forEach((name, i) => {
      const a = i * TAU / 4 + state.time * 0.15;
      const x = center.x + Math.cos(a) * 82;
      const y = center.y + Math.sin(a) * 82;
      arrow(center.x, center.y, x, y, [palette.amber, palette.coral, palette.blue, palette.muted][i], 2);
      label(name, x, y, palette.ink, "center", 12);
    });
    label("相互作用", center.x, center.y, palette.ink, "center", 16);
  }
  drawEnergyBar(w - 160, h - 72, 36, v.energy, 100, palette.coral, "E");
  drawFormulaPanel(["高能探测小尺度", `尺度∝1/E`, `E=${v.energy.toFixed(0)}GeV`]);
  readout.innerHTML = `现代粒子物理把粒子按夸克、轻子和强子等分类；更高能量的碰撞能探测更小尺度结构。`;
}

function momentumModelLabel(model) {
  if (model === "collision2d") return "二维碰撞";
  if (model === "explosion") return "爆炸";
  if (model === "rocket") return "火箭";
  if (model === "boat") return "人船";
  if (model === "spring") return "弹簧小球";
  if (model === "pendulum") return "动飞摆";
  if (model === "groove") return "小球凹槽";
  if (model === "ballSlope") return "小球斜面";
  return "一维碰撞";
}

function drawForceCompositionStudio(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const o = { x: w * 0.42, y: h * 0.54 };
  const scale = 1.75;
  if (v.model === "rope") {
    const theta = toRad(clamp(v.angle, 12, 78));
    const tension = v.load / Math.max(0.25, 2 * Math.sin(theta));
    const left = { x: o.x - Math.cos(theta) * 150, y: o.y - Math.sin(theta) * 150 };
    const right = { x: o.x + Math.cos(theta) * 150, y: o.y - Math.sin(theta) * 150 };
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(o.x, o.y);
    ctx.lineTo(right.x, right.y);
    ctx.stroke();
    drawBlock(o.x, o.y + 86, 78, 46, palette.amber);
    ctx.strokeStyle = palette.ink;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x, o.y + 40);
    ctx.stroke();
    vector(o, -Math.cos(theta) * 100, -Math.sin(theta) * 100, palette.blue, "T₁");
    vector(o, Math.cos(theta) * 100, -Math.sin(theta) * 100, palette.teal, "T₂");
    vector(o, 0, 96, palette.coral, "G");
    if (v.showTriangle) drawClosedTriangle(w - 220, 130, { f1: tension, f2: tension, angle: 180 - 2 * (theta * 180 / Math.PI) }, { mag: v.load });
    drawFormulaPanel(["2Tsinθ=G", `T≈${tension.toFixed(1)}N`, "ΣF=0"]);
    readout.innerHTML = `绳结平衡时，左右拉力的竖直分量共同平衡重力，水平分量互相抵消。`;
    return;
  }
  if (v.model === "decompose") {
    const f = { x: v.f1 * scale * Math.cos(toRad(v.angle)), y: -v.f1 * scale * Math.sin(toRad(v.angle)) };
    vector(o, f.x, f.y, palette.coral, "F");
    vector(o, f.x, 0, palette.blue, "Fx");
    vector({ x: o.x + f.x, y: o.y }, 0, f.y, palette.teal, "Fy");
    if (v.showTriangle) {
      ctx.strokeStyle = "rgba(96,112,128,0.55)";
      ctx.setLineDash([7, 7]);
      ctx.beginPath();
      ctx.moveTo(o.x + f.x, o.y);
      ctx.lineTo(o.x + f.x, o.y + f.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    drawFormulaPanel(["Fx=Fcosθ", "Fy=Fsinθ", `θ=${v.angle.toFixed(0)}°`]);
    readout.innerHTML = `正交分解只是把同一个力按坐标轴表示，分力的共同效果与原来的力等效。`;
    return;
  }
  const f1 = { x: v.f1 * scale, y: 0 };
  const f2 = { x: v.f2 * scale * Math.cos(toRad(v.angle)), y: -v.f2 * scale * Math.sin(toRad(v.angle)) };
  const r = { x: f1.x + f2.x, y: f1.y + f2.y };
  vector(o, f1.x, f1.y, palette.blue, "F₁");
  vector(o, f2.x, f2.y, palette.teal, "F₂");
  if (v.showTriangle) {
    ctx.strokeStyle = "rgba(96,112,128,0.45)";
    ctx.setLineDash([7, 7]);
    ctx.beginPath();
    ctx.moveTo(o.x + f1.x, o.y);
    ctx.lineTo(o.x + r.x, o.y + r.y);
    ctx.moveTo(o.x + f2.x, o.y + f2.y);
    ctx.lineTo(o.x + r.x, o.y + r.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  if (v.model === "balance") {
    vector(o, -r.x, -r.y, palette.coral, "F₃");
    drawFormulaPanel(["F₁+F₂+F₃=0", `|F₃|=${Math.hypot(r.x / scale, r.y / scale).toFixed(1)}N`, "力多边形闭合"]);
    readout.innerHTML = `三力平衡时，第三个力必须与前两个力的合力等大反向，力多边形首尾相接后闭合。`;
  } else {
    vector(o, r.x, r.y, palette.coral, "F合");
    drawFormulaPanel(["平行四边形法则", `|F合|=${Math.hypot(r.x / scale, r.y / scale).toFixed(1)}N`, "共同作用效果"]);
    readout.innerHTML = `双力合成用一个合力替代两个力的共同作用效果，合力是平行四边形的对角线。`;
  }
}

function drawMomentumWorkshop(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const y = h * 0.58;
  const pTotal = v.m1 * v.v1 + v.m2 * v.v2;
  const vcm = pTotal / (v.m1 + v.m2);
  drawGround(y + 46);
  if (v.model === "collision2d") {
    const theta = toRad(v.angle2d);
    const phase = clamp(state.time / 4, 0, 1);
    const before = phase < 0.5;
    const t = before ? phase / 0.5 : (phase - 0.5) / 0.5;
    const center = { x: w * 0.48, y: h * 0.47 };
    const incoming1 = { x: lerp(90, center.x - 26, t), y: lerp(center.y - 80, center.y - 18, t) };
    const incoming2 = { x: lerp(w - 105, center.x + 26, t), y: lerp(center.y + 72, center.y + 18, t) };
    const outgoing1 = { x: lerp(center.x - 26, center.x - 130 * Math.cos(theta), t), y: lerp(center.y - 18, center.y - 90 * Math.sin(theta), t) };
    const outgoing2 = { x: lerp(center.x + 26, center.x + 150 * Math.cos(theta), t), y: lerp(center.y + 18, center.y + 110 * Math.sin(theta), t) };
    const b1 = before ? incoming1 : outgoing1;
    const b2 = before ? incoming2 : outgoing2;
    ctx.fillStyle = "#f8fafc";
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 2;
    roundRect(62, 76, w * 0.68, h * 0.62, 8, "#f8fafc", palette.line);
    ctx.setLineDash([6, 6]);
    arrow(center.x - 150, center.y, center.x + 150, center.y, palette.muted, 1.4);
    arrow(center.x, center.y + 120, center.x, center.y - 120, palette.muted, 1.4);
    ctx.setLineDash([]);
    ctx.fillStyle = palette.blue;
    ctx.beginPath();
    ctx.arc(b1.x, b1.y, 21, 0, TAU);
    ctx.fill();
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(b2.x, b2.y, 17, 0, TAU);
    ctx.fill();
    vector(b1, before ? 72 : -70 * Math.cos(theta), before ? 42 : -54 * Math.sin(theta), palette.blue, "p₁");
    vector(b2, before ? -68 : 78 * Math.cos(theta), before ? -35 : 58 * Math.sin(theta), palette.coral, "p₂");
    label("px、py 分别守恒", 74, 58, palette.ink, "left", 17);
  } else if (v.model === "rocket") {
    const x = w * 0.42 + clamp(vcm * state.time * 24, -w * 0.18, w * 0.18);
    roundRect(x - 58, y - 54, 116, 54, 18, palette.coral, palette.ink);
    label("火箭", x, y - 27, "#fff", "center", 15);
    for (let i = 0; i < 7; i += 1) arrow(x - 62 - i * 12, y - 26 + Math.sin(state.time * 5 + i) * 14, x - 98 - i * 16, y - 26, palette.amber, 2);
    vector({ x, y: y - 88 }, clamp((v.v1 + 8) * 10, 28, 150), 0, palette.teal, "火箭动量");
    vector({ x: x - 90, y: y + 22 }, -clamp((v.v1 + 8) * 10, 28, 150), 0, palette.blue, "喷气动量");
  } else if (v.model === "boat") {
    roundRect(w * 0.25, y - 10, 280, 46, 20, "rgba(48,102,190,0.18)", palette.blue);
    const personX = w * 0.35 + Math.sin(state.time * 0.8) * 78;
    drawPerson(personX, y - 16);
    vector({ x: personX, y: y - 88 }, v.v1 * 18, 0, palette.coral, "人");
    vector({ x: w * 0.39, y: y + 62 }, -v.v1 * v.m1 / v.m2 * 18, 0, palette.teal, "船");
  } else if (v.model === "pendulum") {
    const pivot = { x: w * 0.34, y: 76 };
    const phase = clamp(state.time / 5, 0, 1);
    const release = phase > 0.46;
    const swing = toRad(42) * Math.cos(phase * Math.PI * 1.4);
    const bob = release
      ? { x: pivot.x + 115 + (phase - 0.46) * 360, y: pivot.y + 124 + (phase - 0.46) ** 2 * 420 }
      : { x: pivot.x + Math.sin(swing) * 150, y: pivot.y + Math.cos(swing) * 150 };
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pivot.x - 82, pivot.y);
    ctx.lineTo(pivot.x + 82, pivot.y);
    if (!release) {
      ctx.moveTo(pivot.x, pivot.y);
      ctx.lineTo(bob.x, bob.y);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(232,93,79,0.38)";
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(pivot.x + 115, pivot.y + 124);
    ctx.quadraticCurveTo(pivot.x + 250, pivot.y + 104, pivot.x + 360, pivot.y + 220);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(bob.x, bob.y, 18, 0, TAU);
    ctx.fill();
    vector(bob, release ? 72 : Math.cos(swing) * 42, release ? 18 : -Math.sin(swing) * 42, palette.teal, "p");
    label("摆动阶段近似看作系统内动量传递，脱离后转为抛体运动。", 60, h - 70, palette.ink, "left", 14);
  } else if (v.model === "groove") {
    const baseX = w * 0.46 + Math.sin(state.time * 0.7) * 36;
    const baseY = y + 12;
    const phase = (Math.sin(state.time * 1.1 - Math.PI / 2) + 1) / 2;
    const a = Math.PI + phase * Math.PI;
    const r = 126;
    roundRect(baseX - 175, baseY - 8, 350, 36, 8, "rgba(48,102,190,0.10)", palette.blue);
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(baseX, baseY - 20, r, Math.PI, TAU);
    ctx.stroke();
    const bx = baseX + Math.cos(a) * r;
    const by = baseY - 20 + Math.sin(a) * r;
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(bx, by, 17, 0, TAU);
    ctx.fill();
    vector({ x: bx, y: by - 32 }, -Math.sin(a) * 70, Math.cos(a) * 32, palette.teal, "v");
    label("凹槽与小球构成水平外力近似为零的系统", 60, 62, palette.ink, "left", 16);
  } else if (v.model === "ballSlope") {
    const theta = toRad(clamp(v.angle2d, 8, 58));
    const phase = clamp(state.time * 0.22, 0, 1);
    const wedgeX = w * 0.44 - phase * 72;
    const baseY = y + 42;
    const length = 280;
    const top = { x: wedgeX + length * Math.cos(theta), y: baseY - length * Math.sin(theta) };
    const low = { x: wedgeX, y: baseY };
    ctx.fillStyle = "#f8fafc";
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(low.x, low.y);
    ctx.lineTo(top.x, top.y);
    ctx.lineTo(top.x, low.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    const bx = lerp(top.x - 12, low.x + 52, phase);
    const by = lerp(top.y + 8, low.y - 22, phase);
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(bx, by, 17, 0, TAU);
    ctx.fill();
    vector({ x: bx, y: by - 38 }, 64 * Math.cos(theta), 64 * Math.sin(theta), palette.teal, "v球");
    vector({ x: wedgeX + 115, y: baseY + 42 }, -54, 0, palette.blue, "v斜面");
  } else if (v.model === "spring") {
    const phase = (Math.sin(state.time * 1.4 - Math.PI / 2) + 1) / 2;
    const sep = 44 + phase * 180;
    drawHorizontalSpring(w * 0.5 - sep / 2 + 36, y - 34, w * 0.5 + sep / 2 - 36, 8, 10);
    drawBlock(w * 0.5 - sep / 2, y, 66, 44, palette.blue);
    drawBlock(w * 0.5 + sep / 2, y, 66, 44, palette.coral);
    vector({ x: w * 0.5 - sep / 2, y: y - 66 }, -v.m2 * 16, 0, palette.blue, "p₁");
    vector({ x: w * 0.5 + sep / 2, y: y - 66 }, v.m1 * 16, 0, palette.coral, "p₂");
  } else if (v.model === "explosion") {
    const phase = clamp(state.time / 1.6, 0, 1);
    const sep = phase * 230;
    drawBlock(w * 0.5 - sep * v.m2 / (v.m1 + v.m2), y, 68, 44, palette.blue);
    drawBlock(w * 0.5 + sep * v.m1 / (v.m1 + v.m2), y, 68, 44, palette.coral);
    const fragments = Math.round(v.fragments);
    for (let i = 0; i < fragments; i += 1) {
      const a = (i * TAU) / fragments + 0.2;
      const dist = 52 + phase * 80 * (1 + (i % 2) * 0.18);
      arrow(w * 0.5, y - 28, w * 0.5 + Math.cos(a) * dist, y - 28 + Math.sin(a) * dist, palette.amber, 1.5);
    }
  } else {
    const e = v.elasticity;
    const u1 = v.v1;
    const u2 = v.v2;
    const v1p = (v.m1 * u1 + v.m2 * u2 - v.m2 * e * (u1 - u2)) / (v.m1 + v.m2);
    const v2p = (v.m1 * u1 + v.m2 * u2 + v.m1 * e * (u1 - u2)) / (v.m1 + v.m2);
    const phase = clamp(state.time / 4, 0, 1);
    const before = phase < 0.5;
    const t = before ? phase / 0.5 : (phase - 0.5) / 0.5;
    const x1 = before ? lerp(110, w * 0.45, t) : lerp(w * 0.45, w * 0.45 + v1p * 35, t);
    const x2 = before ? lerp(w - 130, w * 0.55, t) : lerp(w * 0.55, w * 0.55 + v2p * 35, t);
    drawBlock(x1, y, 70, 46, palette.blue);
    drawBlock(x2, y, 70, 46, palette.coral);
    vector({ x: x1, y: y - 68 }, (before ? u1 : v1p) * 16, 0, palette.blue, "v₁");
    vector({ x: x2, y: y - 68 }, (before ? u2 : v2p) * 16, 0, palette.coral, "v₂");
  }
  if (v.showCenterMass) {
    const cmX = w * 0.5 + vcm * Math.sin(state.time * 0.6) * 40;
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.arc(cmX, y + 72, 7, 0, TAU);
    ctx.fill();
    label("质心", cmX, y + 94, palette.ink, "center", 12);
  }
  drawFormulaPanel(["Σp 守恒", `p总=${pTotal.toFixed(1)}`, `v质心=${vcm.toFixed(2)}`]);
  readout.innerHTML = `当前模型：${momentumModelLabel(v.model)}。只要系统外力可忽略，总动量保持不变，质心运动由总动量决定。`;
}

function drawInclineWorkshop(v) {
  if (v.view === "energy") {
    clearCanvas();
    const w = state.width;
    const h = state.height;
    const ep = v.mass * G * v.height;
    const loss = ep * clamp(v.mu / Math.max(0.12, Math.tan(toRad(v.angle))), 0, 0.9);
    const ek = Math.max(0, ep - loss);
    const base = { x: w * 0.18, y: h * 0.72 };
    const length = Math.min(w * 0.5, 420);
    const angle = toRad(v.angle);
    const top = { x: base.x + length * Math.cos(angle), y: base.y - length * Math.sin(angle) };
    ctx.fillStyle = "#edf3f8";
    ctx.strokeStyle = palette.ink;
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(top.x, top.y);
    ctx.lineTo(top.x, base.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    const s = clamp(state.time * 0.18, 0, 1);
    const bx = lerp(top.x, base.x + 36, s);
    const by = lerp(top.y, base.y - 18, s);
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(-angle);
    drawBlock(0, 0, 72, 44, palette.amber);
    ctx.restore();
    if (v.showComponents) {
      arrow(top.x, top.y - 28, top.x, base.y - 28, palette.coral, 2);
      label("h", top.x + 12, (top.y + base.y) / 2, palette.coral);
    }
    drawEnergyBar(w - 235, h - 76, 36, ep * (1 - s), ep, palette.coral, "Ep");
    drawEnergyBar(w - 175, h - 76, 36, ek * s, ep, palette.blue, "Ek");
    drawEnergyBar(w - 115, h - 76, 36, loss * s, ep, palette.amber, "内能");
    drawFormulaPanel(["mgh=Ek+耗散", `Ep=${ep.toFixed(1)}J`, `损耗≈${loss.toFixed(1)}J`]);
    readout.innerHTML = `能量视角把斜面运动看成重力势能向动能和内能的转化；有摩擦时机械能不再守恒。`;
    return;
  }
  drawApplications({
    mass: v.mass,
    angle: v.angle,
    mu: v.mu,
    showComponents: v.showComponents,
    analysisView: v.view === "fbd" ? "fbd" : "motion",
  });
}

function drawEnergyWorkshop(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const ep0 = v.mass * G * v.height;
  const phase = (Math.sin(state.time * 1.1 - Math.PI / 2) + 1) / 2;
  const loss = ep0 * v.loss * phase;
  const ep = ep0 * (1 - phase);
  const springEnergy = v.scene === "spring" ? 0.5 * v.springK * (v.height / 5) ** 2 : 0;
  const totalAvailable = ep0 + springEnergy;
  const ek = Math.max(0, totalAvailable - ep - loss);
  if (v.scene === "pendulum") {
    const pivot = { x: w * 0.4, y: 72 };
    const angle = toRad(38) * Math.cos(state.time * 1.2);
    const bob = { x: pivot.x + 170 * Math.sin(angle), y: pivot.y + 170 * Math.cos(angle) };
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pivot.x, pivot.y);
    ctx.lineTo(bob.x, bob.y);
    ctx.stroke();
    ctx.fillStyle = palette.amber;
    ctx.beginPath();
    ctx.arc(bob.x, bob.y, 18, 0, TAU);
    ctx.fill();
  } else if (v.scene === "spring") {
    const y = h * 0.56;
    drawHorizontalSpring(74, y, 190 + phase * 260 - 38, 10, 14);
    drawGround(y + 28);
    drawBlock(190 + phase * 260, y + 28, 70, 46, palette.amber);
    label("弹性势能 → 动能", 56, 58, palette.ink, "left", 17);
  } else if (v.scene === "freefall") {
    const y = h * 0.18 + phase * h * 0.48;
    ctx.fillStyle = palette.amber;
    ctx.beginPath();
    ctx.arc(w * 0.42, y, 18, 0, TAU);
    ctx.fill();
    arrow(w * 0.42 + 42, h * 0.18, w * 0.42 + 42, h * 0.66, palette.coral, 2);
    label("h", w * 0.42 + 56, h * 0.42, palette.coral);
  } else {
    const yBase = h * 0.68;
    ctx.strokeStyle = palette.ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i <= 140; i += 1) {
      const x = 70 + (i / 140) * (w * 0.56);
      const y = yBase - 95 * Math.sin((i / 140) * Math.PI) ** 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const x = 70 + phase * w * 0.56;
    const y = yBase - 95 * Math.sin(phase * Math.PI) ** 2;
    drawCar(x, y, palette.coral, "车");
  }
  if (v.showBars) {
    drawEnergyBar(w - 245, h - 78, 34, ep, totalAvailable, palette.coral, "Ep");
    drawEnergyBar(w - 188, h - 78, 34, ek, totalAvailable, palette.blue, "Ek");
    drawEnergyBar(w - 131, h - 78, 34, loss, totalAvailable, palette.amber, "耗散");
  }
  drawFormulaPanel(["E=Ek+Ep+E弹", `可用=${(totalAvailable - loss).toFixed(1)}J`, `损耗=${(loss).toFixed(1)}J`]);
  readout.innerHTML = `不同情境共用同一套能量账本：没有非保守力做功时机械能守恒，有损耗时机械能转化为内能。`;
}

function drawNewtonCradle(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const balls = Math.round(v.balls);
  const active = Math.min(Math.round(v.activeBalls), balls - 1);
  const topY = 78;
  const centerX = w * 0.42;
  const spacing = 36;
  const baseX = centerX - ((balls - 1) * spacing) / 2;
  const decay = Math.exp(-v.damping * state.time);
  const phase = Math.sin(state.time * 1.8);
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(baseX - 45, topY);
  ctx.lineTo(baseX + (balls - 1) * spacing + 45, topY);
  ctx.stroke();
  for (let i = 0; i < balls; i += 1) {
    const leftActive = i < active && phase < 0;
    const rightActive = i >= balls - active && phase > 0;
    const swing = (leftActive || rightActive ? Math.abs(phase) * toRad(v.angle) * decay : 0) * (leftActive ? -1 : 1);
    const pivotX = baseX + i * spacing;
    const bob = { x: pivotX + Math.sin(swing) * 145, y: topY + Math.cos(swing) * 145 };
    ctx.strokeStyle = palette.muted;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pivotX, topY);
    ctx.lineTo(bob.x, bob.y);
    ctx.stroke();
    ctx.fillStyle = leftActive || rightActive ? palette.coral : palette.blue;
    ctx.beginPath();
    ctx.arc(bob.x, bob.y, 17, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = palette.ink;
    ctx.stroke();
  }
  if (v.showImpulse) {
    for (let i = 0; i < balls - 1; i += 1) arrow(baseX + i * spacing + 18, topY + 156, baseX + (i + 1) * spacing - 18, topY + 156, palette.amber, 2);
    label("冲量传递", centerX, topY + 188, palette.amber, "center", 14);
  }
  drawFormulaPanel(["p 守恒 + Ek 近似守恒", `${active} 个撞入 → ${active} 个弹出`, "耗散使振幅衰减"]);
  readout.innerHTML = `牛顿摆近似展示弹性碰撞：动量和机械能同时约束碰后结果，因此常见同样数量的小球弹出。`;
}

function drawOrbitWorkshop(v) {
  clearCanvas();
  const w = state.width;
  const h = state.height;
  const c = { x: w * 0.46, y: h * 0.48 };
  const circular = Math.sqrt(v.centralMass / Math.max(1, v.radius / 120));
  const escape = Math.SQRT2;
  ctx.fillStyle = palette.amber;
  ctx.beginPath();
  ctx.arc(c.x, c.y, 22 + v.centralMass * 1.2, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = palette.ink;
  ctx.stroke();
  label(v.orbitMode === "binary" ? "共同质心" : "中心天体", c.x, c.y + 44, palette.ink, "center", 13);
  if (v.orbitMode === "binary") {
    const r1 = v.radius * 0.55;
    const r2 = v.radius * 0.85;
    const a = state.time * v.speed * 0.8;
    ctx.strokeStyle = "rgba(48,102,190,0.5)";
    ctx.beginPath();
    ctx.arc(c.x, c.y, r1, 0, TAU);
    ctx.arc(c.x, c.y, r2, 0, TAU);
    ctx.stroke();
    ctx.fillStyle = palette.blue;
    ctx.beginPath();
    ctx.arc(c.x + Math.cos(a) * r1, c.y + Math.sin(a) * r1, 16, 0, TAU);
    ctx.fill();
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(c.x - Math.cos(a) * r2, c.y - Math.sin(a) * r2, 12, 0, TAU);
    ctx.fill();
  } else {
    const e = v.orbitMode === "transfer" ? 0.45 : clamp(Math.abs(v.speed - 1) * 0.72, 0, 0.86);
    const a = v.radius * (v.orbitMode === "escape" || v.speed >= escape ? 1.1 : 1);
    const b = a * Math.sqrt(Math.max(0.12, 1 - e * e));
    ctx.strokeStyle = v.orbitMode === "escape" || v.speed >= escape ? palette.coral : palette.blue;
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (v.orbitMode === "escape" || v.speed >= escape) {
      ctx.moveTo(c.x + v.radius, c.y);
      ctx.quadraticCurveTo(c.x + v.radius * 1.4, c.y - 120, w - 70, c.y - 160);
    } else {
      ctx.ellipse(c.x, c.y, a, b, 0, 0, TAU);
    }
    ctx.stroke();
    const t = state.time * v.speed * 0.45;
    const px = c.x + Math.cos(t) * a;
    const py = c.y + Math.sin(t) * b;
    ctx.fillStyle = palette.coral;
    ctx.beginPath();
    ctx.arc(px, py, 12, 0, TAU);
    ctx.fill();
    vector({ x: px, y: py }, -Math.sin(t) * 62 * v.speed, Math.cos(t) * 46 * v.speed, palette.teal, "v");
    vector({ x: px, y: py }, (c.x - px) * 0.28, (c.y - py) * 0.28, palette.blue, "F引");
  }
  if (v.showEnergy) {
    drawEnergyBar(w - 185, h - 76, 34, v.speed, 2.2, palette.teal, "v");
    drawEnergyBar(w - 128, h - 76, 34, escape, 2.2, palette.coral, "v逃");
  }
  drawFormulaPanel(["v圆=√(GM/r)", "v逃=√2 v圆", v.speed >= escape ? "逃逸" : "有界轨道"]);
  readout.innerHTML = `轨道形态由初速度和引力参数共同决定；速度达到逃逸速度后，物体可离开中心天体束缚。`;
}

function drawFrame() {
  setCanvasSize();
  const values = getValues();
  switch (getActiveModule().sim) {
    case "forceCompositionStudio":
      drawForceCompositionStudio(values);
      break;
    case "momentumWorkshop":
      drawMomentumWorkshop(values);
      break;
    case "inclineWorkshop":
      drawInclineWorkshop(values);
      break;
    case "energyWorkshop":
      drawEnergyWorkshop(values);
      break;
    case "newtonCradle":
      drawNewtonCradle(values);
      break;
    case "orbitWorkshop":
      drawOrbitWorkshop(values);
      break;
    case "frames":
      drawFrames(values);
      break;
    case "displacement":
      drawDisplacement(values);
      break;
    case "velocity":
      drawVelocity(values);
      break;
    case "acceleration":
      drawAcceleration(values);
      break;
    case "ticker":
      drawTicker(values);
      break;
    case "vtRelation":
      drawVtRelation(values);
      break;
    case "stRelation":
      drawStRelation(values);
      break;
    case "freeFall":
      drawFreeFall(values);
      break;
    case "gravityElastic":
      drawGravityElastic(values);
      break;
    case "friction":
      drawFriction(values);
      break;
    case "actionReaction":
      drawActionReaction(values);
      break;
    case "forceVector":
      drawForceVector(values);
      break;
    case "equilibrium":
      drawEquilibrium(values);
      break;
    case "inertia":
      drawInertia(values);
      break;
    case "fmaExperiment":
      drawFmaExperiment(values);
      break;
    case "newtonSecond":
      drawNewtonSecond(values);
      break;
    case "units":
      drawUnits(values);
      break;
    case "applications":
      drawApplications(values);
      break;
    case "elevator":
      drawElevator(values);
      break;
    case "curvedMotion":
      drawCurvedMotion(values);
      break;
    case "motionComposition":
      drawMotionComposition(values);
      break;
    case "projectileExperiment":
      drawProjectileExperiment(values);
      break;
    case "projectileLaw":
      drawProjectileLaw(values);
      break;
    case "circularMotion":
      drawCircularMotion(values);
      break;
    case "centripetalForce":
      drawCentripetalForce(values);
      break;
    case "centripetalAccel":
      drawCentripetalAccel(values);
      break;
    case "lifeCircular":
      drawLifeCircular(values);
      break;
    case "planetLaws":
      drawPlanetLaws(values);
      break;
    case "gravitation":
      drawGravitation(values);
      break;
    case "gravityAchievements":
      drawGravityAchievements(values);
      break;
    case "spaceflight":
      drawSpaceflight(values);
      break;
    case "relativityLimit":
      drawRelativityLimit(values);
      break;
    case "workPower":
      drawWorkPower(values);
      break;
    case "potentialEnergy":
      drawPotentialEnergy(values);
      break;
    case "kineticTheorem":
      drawKineticTheorem(values);
      break;
    case "energyConservation":
      drawEnergyConservation(values);
      break;
    case "energyExperiment":
      drawEnergyExperiment(values);
      break;
    case "electricCharge":
      drawElectricCharge(values);
      break;
    case "coulombLaw":
      drawCoulombLaw(values);
      break;
    case "electricField":
      drawElectricField(values);
      break;
    case "electrostaticUse":
      drawElectrostaticUse(values);
      break;
    case "electricPotential":
      drawElectricPotential(values);
      break;
    case "potentialDifference":
      drawPotentialDifference(values);
      break;
    case "fieldPotentialRelation":
      drawFieldPotentialRelation(values);
      break;
    case "capacitor":
      drawCapacitor(values);
      break;
    case "particleElectricField":
      drawParticleElectricField(values);
      break;
    case "sourceCurrent":
      drawSourceCurrent(values);
      break;
    case "resistance":
      drawResistance(values);
      break;
    case "resistivityExperiment":
      drawResistivityExperiment(values);
      break;
    case "seriesParallel":
      drawSeriesParallel(values);
      break;
    case "multimeter":
      drawMultimeter(values);
      break;
    case "circuitEnergy":
      drawCircuitEnergy(values);
      break;
    case "closedCircuit":
      drawClosedCircuit(values);
      break;
    case "batteryExperiment":
      drawBatteryExperiment(values);
      break;
    case "energySustainability":
      drawEnergySustainability(values);
      break;
    case "magneticFieldLines":
      drawMagneticFieldLines(values);
      break;
    case "magneticFlux":
      drawMagneticFlux(values);
      break;
    case "emInduction":
      drawInduction(values);
      break;
    case "emWave":
      drawEMWave(values);
      break;
    case "quantization":
      drawQuantization(values);
      break;
    case "momentumBasic":
      drawMomentumBasic(values);
      break;
    case "impulseTheorem":
      drawImpulseTheorem(values);
      break;
    case "momentumConservation":
      drawMomentumConservation(values);
      break;
    case "momentumExperiment":
      drawMomentumExperiment(values);
      break;
    case "collisionTypes":
      drawCollisionTypes(values);
      break;
    case "recoilRocket":
      drawRecoilRocket(values);
      break;
    case "simpleHarmonic":
      drawSimpleHarmonic(values);
      break;
    case "shmDescription":
      drawShmDescription(values);
      break;
    case "shmEnergy":
      drawShmEnergy(values);
      break;
    case "pendulum":
      drawPendulum(values);
      break;
    case "pendulumExperiment":
      drawPendulumExperiment(values);
      break;
    case "forcedResonance":
      drawForcedResonance(values);
      break;
    case "waveFormationSelective":
      drawWaveFormationSelective(values);
      break;
    case "waveDescriptionSelective":
      drawWaveDescriptionSelective(values);
      break;
    case "waveBoundary":
      drawWaveBoundary(values);
      break;
    case "waveInterferenceSelective":
      drawWaveInterferenceSelective(values);
      break;
    case "dopplerEffect":
      drawDopplerEffect(values);
      break;
    case "lightRefraction":
      drawLightRefraction(values);
      break;
    case "totalInternalReflection":
      drawTotalInternalReflection(values);
      break;
    case "lightInterference":
      drawLightInterference(values);
      break;
    case "doubleSlitExperiment":
      drawDoubleSlitExperiment(values);
      break;
    case "lightDiffraction":
      drawLightDiffraction(values);
      break;
    case "polarizationLaser":
      drawPolarizationLaser(values);
      break;
    case "ampereForce":
      drawAmpereForce(values);
      break;
    case "lorentzForce":
      drawLorentzForce(values);
      break;
    case "chargedParticleMagnetic":
      drawChargedParticleMagnetic(values);
      break;
    case "acceleratorSpectrometer":
      drawAcceleratorSpectrometer(values);
      break;
    case "lenzLaw":
      drawLenzLaw(values);
      break;
    case "faradayLaw":
      drawFaradayLaw(values);
      break;
    case "eddyCurrent":
      drawEddyCurrent(values);
      break;
    case "mutualSelfInductance":
      drawMutualSelfInductance(values);
      break;
    case "alternatingCurrent":
      drawAlternatingCurrent(values);
      break;
    case "acDescription":
      drawACDescription(values);
      break;
    case "transformer":
      drawTransformer(values);
      break;
    case "powerTransmission":
      drawPowerTransmission(values);
      break;
    case "lcOscillation":
      drawLCOscillation(values);
      break;
    case "emFieldWave":
      drawEMFieldWaveSelective2(values);
      break;
    case "radioTransmitReceive":
      drawRadioTransmitReceive(values);
      break;
    case "spectrum":
      drawSpectrum(values);
      break;
    case "sensorIntro":
      drawSensorIntro(values);
      break;
    case "sensorPrinciples":
      drawSensorPrinciples(values);
      break;
    case "sensorControl":
      drawSensorControl(values);
      break;
    case "molecularTheory":
      drawMolecularTheory(values);
      break;
    case "oilFilmExperiment":
      drawOilFilmExperiment(values);
      break;
    case "speedDistribution":
      drawSpeedDistribution(values);
      break;
    case "molecularEnergy":
      drawMolecularEnergy(values);
      break;
    case "temperatureScale":
      drawTemperatureScale(values);
      break;
    case "isothermalGas":
      drawIsothermalGas(values);
      break;
    case "gasLaws":
      drawGasLaws(values);
      break;
    case "solidCrystal":
      drawSolidCrystal(values);
      break;
    case "liquidSurface":
      drawLiquidSurface(values);
      break;
    case "workHeatInternal":
      drawWorkHeatInternal(values);
      break;
    case "firstLawThermo":
      drawFirstLawThermo(values);
      break;
    case "thermoEnergyConservation":
      drawThermoEnergyConservation(values);
      break;
    case "secondLawThermo":
      drawSecondLawThermo(values);
      break;
    case "planckRadiation":
      drawPlanckRadiation(values);
      break;
    case "photoelectricEffectS3":
      drawPhotoelectricEffectS3(values);
      break;
    case "nuclearAtomModel":
      drawNuclearAtomModel(values);
      break;
    case "hydrogenBohr":
      drawHydrogenBohr(values);
      break;
    case "matterWave":
      drawMatterWave(values);
      break;
    case "nucleusComposition":
      drawNucleusComposition(values);
      break;
    case "radioactiveDecay":
      drawRadioactiveDecay(values);
      break;
    case "bindingEnergy":
      drawBindingEnergy(values);
      break;
    case "fissionFusion":
      drawFissionFusion(values);
      break;
    case "elementaryParticles":
      drawElementaryParticles(values);
      break;
    default:
      drawFrames(values);
  }
}

function tick(now) {
  const delta = Math.min(0.05, (now - state.lastFrame) / 1000);
  state.lastFrame = now;
  if (state.playing) state.time += delta * state.speed;
  drawFrame();
  requestAnimationFrame(tick);
}

function switchTopic(topicId) {
  if (!modules.some((module) => module.id === topicId)) return;
  state.activeId = topicId;
  state.time = 0;
  renderNav();
  renderLessonMeta();
  renderControls();
  drawFrame();
}

function syncPlaybackControls() {
  const enabled = isPlaybackRelevant();
  playControls.hidden = !enabled;
  if (speedControl) speedControl.hidden = !enabled;
  state.playing = enabled;
  if (!enabled) state.time = 0;
}

bookSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("[data-book]");
  if (!button) return;
  activeBookId = button.dataset.book;
  refreshBookModules();
  state.activeId = modules[0].id;
  state.time = 0;
  renderBookSwitcher();
  renderNav();
  renderLessonMeta();
  renderControls();
  drawFrame();
});

topicRail.addEventListener("click", (event) => {
  const topic = event.target.closest("[data-topic]");
  if (!topic) return;
  switchTopic(topic.dataset.topic);
});

lessonNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chapter]");
  if (!button) return;
  const chapter = activeBook.chapters.find((item) => item.id === button.dataset.chapter);
  if (!chapter) return;
  switchTopic(chapter.sections[0].id);
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
  if (!segment) return;
  getValues()[segment.dataset.segment] = segment.dataset.value;
  renderControls();
  updateQuickStats();
});

controlGroups.addEventListener("change", (event) => {
  const target = event.target;
  const key = target.dataset.toggle;
  if (!key) return;
  getValues()[key] = target.checked;
  refreshControlOutputs();
});

canvas.addEventListener("pointerdown", (event) => {
  canvas.setPointerCapture?.(event.pointerId);
  handleCanvasInteraction(event);
});

canvas.addEventListener("pointermove", (event) => {
  if (event.buttons !== 1) return;
  handleCanvasInteraction(event);
});

restartDemo.addEventListener("click", () => {
  state.time = 0;
  state.lastFrame = performance.now();
  syncPlaybackControls();
  drawFrame();
});

speedRange.addEventListener("input", () => {
  state.speed = Number(speedRange.value);
});

window.addEventListener("resize", () => {
  setCanvasSize();
  drawFrame();
});

refreshBookModules();
renderBookSwitcher();
renderNav();
renderLessonMeta();
renderControls();
setCanvasSize();
syncPlaybackControls();
requestAnimationFrame(tick);
