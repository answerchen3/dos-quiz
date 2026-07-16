module.exports = [
  {
    id: "q01",
    scene: "为了成就一番「伟大的事业」，需要跨越凡人的鲜血，你会？",
    bookHint: "《罪与罚》",
    options: [
      {
        text: "跨过去，事后再解释",
        flash: {
          who: "拉斯柯尔尼科夫",
          characterId: "raskolnikov",
          line: "跨过去。事后再解释。",
          image: "/assets/scenes/q01-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 1, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 2 }
      },
      {
        text: "停手，任何人的生命都不能成为垫脚石",
        flash: {
          who: "索尼娅",
          characterId: "sonya",
          line: "停手。人不能当垫脚石。",
          image: "/assets/scenes/q01-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 2, 热忱: 3 }
      },
      {
        text: "无所谓，与我无关",
        flash: {
          who: "斯维德里盖洛夫",
          characterId: "svidrigailov",
          line: "无所谓。与我无关。",
          image: "/assets/scenes/q01-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 3, 虚无: 5, 自尊: 1, 热忱: 1 }
      }
    ],
    quote: "凡是非凡的人，都有权利允许自己的良心跨过某些障碍。",
    quoteSource: "《罪与罚》"
  },
  {
    id: "q02",
    scene: "如果世界的终极和谐必须建立在某个无辜孩子的一滴痛苦眼泪之上，你会接受吗？",
    bookHint: "《卡拉马佐夫兄弟》",
    options: [
      {
        text: "接受",
        flash: {
          who: "老卡拉马佐夫",
          characterId: "fyodor-karamazov",
          line: "接受。代价而已。",
          image: "/assets/scenes/q02-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 1, 激情: 5, 虚无: 5, 自尊: 1, 热忱: 1 }
      },
      {
        text: "拒绝。用无辜者的苦难换来的和谐，我不要",
        flash: {
          who: "伊万",
          characterId: "ivan-karamazov",
          line: "我不要这种和谐。",
          image: "/assets/scenes/q02-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 4, 激情: 1, 虚无: 3, 自尊: 4, 热忱: 1 }
      },
      {
        text: "我无法接受，但也无力反抗，只好冷眼旁观",
        flash: {
          who: "斯麦尔佳科夫",
          characterId: "smerdyakov",
          line: "无力反抗，只好旁观。",
          image: "/assets/scenes/q02-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 3, 热忱: 1 }
      }
    ],
    quote: "我不是不接受上帝，而是不接受他创造的世界。",
    quoteSource: "《卡拉马佐夫兄弟》"
  },
  {
    id: "q03",
    scene: "当你的博爱（对所有人的怜悯）与一对一的爱情发生冲突时，你会？",
    bookHint: "《白痴》",
    options: [
      {
        text: "选择拯救",
        flash: {
          who: "梅什金",
          characterId: "prince-myshkin",
          line: "选择拯救。",
          image: "/assets/scenes/q03-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 1, 热忱: 4 }
      },
      {
        text: "选择幸福",
        flash: {
          who: "阿格拉娅",
          characterId: "aglaya",
          line: "选择幸福。",
          image: "/assets/scenes/q03-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 2, 激情: 4, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "我无法选择",
        flash: {
          who: "纳斯塔霞",
          characterId: "nastasya",
          line: "无法选择。",
          image: "/assets/scenes/q03-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 2, 激情: 5, 虚无: 3, 自尊: 5, 热忱: 2 }
      }
    ],
    quote: "美将拯救世界。",
    quoteSource: "《白痴》"
  },
  {
    id: "q04",
    scene: "如果坚信「上帝已死」，世界本无意义，你会如何面对？",
    bookHint: "《群魔》",
    options: [
      {
        text: "通过极端行为宣示自由",
        flash: {
          who: "基里洛夫",
          characterId: "kirillov",
          line: "用极端行为宣示自由。",
          image: "/assets/scenes/q04-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 3, 虚无: 4, 自尊: 4, 热忱: 2 }
      },
      {
        text: "自己为世界创造意义",
        flash: {
          who: "沙托夫",
          characterId: "shatov",
          line: "自己创造意义。",
          image: "/assets/scenes/q04-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 3, 虚无: 2, 自尊: 3, 热忱: 5 }
      },
      {
        text: "陷入彻底的虚无",
        flash: {
          who: "斯塔夫罗金",
          characterId: "stavrogin",
          line: "彻底的虚无。",
          image: "/assets/scenes/q04-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 1, 虚无: 5, 自尊: 3, 热忱: 1 }
      }
    ],
    quote: "既然上帝不存在，那么人就成了神。",
    quoteSource: "《群魔》"
  },
  {
    id: "q05",
    scene: "坚信「只要有了钱，一切问题都能解决」，但真的赚到足够多的钱后，空虚依然如影随形。你会？",
    bookHint: "《少年》",
    options: [
      {
        text: "继续追逐更多钱",
        flash: {
          who: "阿尔卡季",
          characterId: "arkady",
          line: "继续追逐更多钱。",
          image: "/assets/scenes/q05-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 3, 虚无: 1, 自尊: 5, 热忱: 5 }
      },
      {
        text: "停下来寻找别的意义",
        flash: {
          who: "马卡尔",
          characterId: "makar",
          line: "停下来，找别的意义。",
          image: "/assets/scenes/q05-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 5 }
      },
      {
        text: "陷入彻底的迷茫",
        flash: {
          who: "韦尔西洛夫",
          characterId: "versilov",
          line: "彻底的迷茫。",
          image: "/assets/scenes/q05-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 2, 虚无: 3, 自尊: 3, 热忱: 2 }
      }
    ],
    quote: "金钱即力量。",
    quoteSource: "《少年》"
  },
  {
    id: "q06",
    scene: "为了证明你拥有「自由意志」，你会选择做一件对自己毫无益处、甚至有害的「蠢事」吗？",
    bookHint: "《地下室手记》",
    options: [
      {
        text: "会",
        flash: {
          who: "地下室人",
          characterId: "underground-man",
          line: "会。宁可痛苦地自由。",
          image: "/assets/scenes/q06-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 1, 激情: 3, 虚无: 4, 自尊: 5, 热忱: 1 }
      },
      {
        text: "不会",
        flash: {
          who: "波尔菲里",
          characterId: "porfiry",
          line: "不会。真正的自由靠理性。",
          image: "/assets/scenes/q06-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 1, 虚无: 2, 自尊: 3, 热忱: 2 }
      },
      {
        text: "我或许想过，但最终还是不敢",
        flash: {
          who: "地下室人",
          characterId: "underground-man",
          line: "想过，最终不敢。",
          image: "/assets/scenes/q06-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 5, 热忱: 1 }
      }
    ],
    quote: "人并非总是追求利益最大化的动物。",
    quoteSource: "《地下室手记》"
  },
  {
    id: "q07",
    scene: "你渴望被理解和关注，但当有人真的试图靠近你、看透你时，你却感到恐惧和羞耻。你会？",
    bookHint: "《地下室手记》",
    options: [
      {
        text: "推开一切靠近的人",
        flash: {
          who: "地下室人",
          characterId: "underground-man",
          line: "推开。被看穿更可怕。",
          image: "/assets/scenes/q07-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 5, 热忱: 1 }
      },
      {
        text: "尝试打开一条缝",
        flash: {
          who: "地下室人",
          characterId: "underground-man",
          line: "打开一条缝。",
          image: "/assets/scenes/q07-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 3, 激情: 2, 虚无: 3, 自尊: 4, 热忱: 2 }
      },
      {
        text: "反复横跳",
        flash: {
          who: "地下室人",
          characterId: "underground-man",
          line: "推开又拉回。",
          image: "/assets/scenes/q07-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 3, 虚无: 4, 自尊: 5, 热忱: 1 }
      }
    ],
    quote: "我是有病的人。我太清醒了。",
    quoteSource: "《地下室手记》"
  },
  {
    id: "q08",
    scene: "如果剥夺你的自由，将你置于完全丧失个人空间和尊严的环境中，你会？",
    bookHint: "《死屋手记》",
    options: [
      {
        text: "保持精神独立",
        flash: {
          who: "亚历山大·彼得罗维奇",
          characterId: "alexander-petrovich",
          line: "肉体可囚，灵魂不降。",
          image: "/assets/scenes/q08-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 3, 激情: 1, 虚无: 2, 自尊: 3, 热忱: 3 }
      },
      {
        text: "寻找同盟与温情",
        flash: {
          who: "阿列伊",
          characterId: "alei",
          line: "寻找同盟与温情。",
          image: "/assets/scenes/q08-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "陷入麻木与虚无",
        flash: {
          who: "亚历山大·彼得罗维奇",
          characterId: "alexander-petrovich",
          line: "麻木。只要能活下去。",
          image: "/assets/scenes/q08-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 1, 虚无: 5, 自尊: 2, 热忱: 1 }
      }
    ],
    quote: "人可以习惯一切，哪怕是绞刑架。",
    quoteSource: "《死屋手记》"
  },
  {
    id: "q09",
    scene: "长期处于压抑但「稳定」的环境中，突然获得自由后，你发现自己竟然怀念那个牢笼。你会？",
    bookHint: "《死屋手记》",
    options: [
      {
        text: "拥抱自由，即使恐惧",
        flash: {
          who: "亚历山大·彼得罗维奇",
          characterId: "alexander-petrovich",
          line: "拥抱自由，即使恐惧。",
          image: "/assets/scenes/q09-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 2, 激情: 3, 虚无: 2, 自尊: 4, 热忱: 4 }
      },
      {
        text: "渴望退回牢笼",
        flash: {
          who: "阿列伊",
          characterId: "alei",
          line: "渴望退回牢笼。",
          image: "/assets/scenes/q09-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 3, 激情: 1, 虚无: 4, 自尊: 2, 热忱: 2 }
      },
      {
        text: "我被撕裂了",
        flash: {
          who: "亚历山大·彼得罗维奇",
          characterId: "alexander-petrovich",
          line: "理智要自由，身子想逃回去。",
          image: "/assets/scenes/q09-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 2, 激情: 2, 虚无: 4, 自尊: 3, 热忱: 2 }
      }
    ],
    quote: "人可以习惯一切，哪怕是绞刑架。",
    quoteSource: "《死屋手记》"
  },
  {
    id: "q10",
    scene: "如果善良注定会让自己受伤，你还愿意做一个善良的人吗？",
    bookHint: "《被侮辱与被损害的》",
    options: [
      {
        text: "依然选择善良",
        flash: {
          who: "娜塔莎",
          characterId: "natasha",
          line: "依然选择善良。",
          image: "/assets/scenes/q10-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 3, 虚无: 1, 自尊: 3, 热忱: 4 }
      },
      {
        text: "必须学会自卫",
        flash: {
          who: "涅莉",
          characterId: "nelly",
          line: "必须学会自卫。",
          image: "/assets/scenes/q10-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 2, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 2 }
      },
      {
        text: "我不知道",
        flash: {
          who: "娜塔莎",
          characterId: "natasha",
          line: "不忍伤害，又怕被伤害。",
          image: "/assets/scenes/q10-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 2, 虚无: 3, 自尊: 3, 热忱: 2 }
      }
    ],
    quote: "最深的伤，常常来自最亲近的人。",
    quoteSource: "《被侮辱与被损害的》"
  },
  {
    id: "q11",
    scene: "你爱的人在所有人眼中都不值得，你自己也清醒地知道这一点。但你就是放不下。你会？",
    bookHint: "《被侮辱与被损害的》",
    options: [
      {
        text: "狠心止损",
        flash: {
          who: "涅莉",
          characterId: "nelly",
          line: "狠心止损。亲手斩断。",
          image: "/assets/scenes/q11-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 2, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 2 }
      },
      {
        text: "继续燃烧",
        flash: {
          who: "娜塔莎",
          characterId: "natasha",
          line: "继续燃烧。",
          image: "/assets/scenes/q11-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 4, 激情: 5, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "我无法退出，但我也恨自己",
        flash: {
          who: "娜塔莎",
          characterId: "natasha",
          line: "想结束，见他又崩塌。",
          image: "/assets/scenes/q11-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 3, 激情: 4, 虚无: 3, 自尊: 3, 热忱: 2 }
      }
    ],
    quote: "我明知他是个空心人，我还是爱他。",
    quoteSource: "《被侮辱与被损害的》"
  },
  {
    id: "q12",
    scene: "当短暂的美好幻灭，你是宁愿继续沉浸在那个梦里，还是忍着剧痛回到冰冷的现实？",
    bookHint: "《白夜》",
    options: [
      {
        text: "回到现实",
        flash: {
          who: "娜斯简卡",
          characterId: "nastenka",
          line: "回到现实。",
          image: "/assets/scenes/q12-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 4, 激情: 3, 虚无: 1, 自尊: 3, 热忱: 3 }
      },
      {
        text: "保留那个梦",
        flash: {
          who: "白夜梦想家",
          characterId: "dreamer",
          line: "保留那个梦。",
          image: "/assets/scenes/q12-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 3, 激情: 4, 虚无: 1, 自尊: 1, 热忱: 3 }
      },
      {
        text: "现实与幻想早已模糊",
        flash: {
          who: "白夜梦想家",
          characterId: "dreamer",
          line: "分不清真假，也无所谓了。",
          image: "/assets/scenes/q12-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 2, 激情: 2, 虚无: 4, 自尊: 2, 热忱: 2 }
      }
    ],
    quote: "我是个幻想家。我自己编造完整的生活。",
    quoteSource: "《白夜》"
  },
  {
    id: "q13",
    scene: "当尊严与生存产生冲突时，你是选择保留骨气，还是为了所爱之人放下身段接受那带着怜悯的施舍？",
    bookHint: "《穷人》",
    options: [
      {
        text: "保持骨气，宁折不弯",
        flash: {
          who: "瓦尔瓦拉",
          characterId: "varvara-dobroselova",
          line: "保持骨气，宁折不弯。",
          image: "/assets/scenes/q13-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 3, 激情: 2, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "为了爱的人，我愿意低头",
        flash: {
          who: "杰武什金",
          characterId: "makar-devushkin",
          line: "为了爱的人，愿意低头。",
          image: "/assets/scenes/q13-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "我被撕裂了",
        flash: {
          who: "杰武什金",
          characterId: "makar-devushkin",
          line: "想帮，又怕被可怜。",
          image: "/assets/scenes/q13-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 1, 虚无: 2, 自尊: 4, 热忱: 3 }
      }
    ],
    quote: "即使只剩几戈比，信里也还要写得体面、温柔。",
    quoteSource: "《穷人》"
  },
  {
    id: "q14",
    scene: "你对一个人的付出已经到了牺牲自己的程度。对方哭着求你「别再对我好了，你看看你自己都成什么样了」。你会？",
    bookHint: "《穷人》",
    options: [
      {
        text: "停止付出，照顾好自己",
        flash: {
          who: "瓦尔瓦拉",
          characterId: "varvara-dobroselova",
          line: "停止付出，照顾好自己。",
          image: "/assets/scenes/q14-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 3, 激情: 2, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "继续付出",
        flash: {
          who: "杰武什金",
          characterId: "makar-devushkin",
          line: "继续付出。停下等于死去。",
          image: "/assets/scenes/q14-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 3, 热忱: 4 }
      },
      {
        text: "我不知道怎么停",
        flash: {
          who: "杰武什金",
          characterId: "makar-devushkin",
          line: "不知道怎么停。",
          image: "/assets/scenes/q14-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 1, 虚无: 3, 自尊: 3, 热忱: 3 }
      }
    ],
    quote: "不要剥夺我唯一活下去的意义——就是照顾你。",
    quoteSource: "《穷人》"
  },
  {
    id: "q15",
    scene: "如果你身边有一个极具天赋却自暴自弃的人，你会选择无底线包容他、相信他「总会醒悟」，还是狠心离开，让他独自面对堕落？",
    bookHint: "《涅托奇卡·涅兹瓦诺娃》",
    options: [
      {
        text: "继续包容，无条件相信",
        flash: {
          who: "涅托奇卡",
          characterId: "netochka",
          line: "继续包容，无条件相信。",
          image: "/assets/scenes/q15-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 3, 热忱: 3 }
      },
      {
        text: "狠心离开，让他自己面对",
        flash: {
          who: "叶菲莫夫",
          characterId: "yefimov",
          line: "狠心离开。他自己面对。",
          image: "/assets/scenes/q15-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 1 }
      },
      {
        text: "我既心疼又无力",
        flash: {
          who: "涅托奇卡",
          characterId: "netochka",
          line: "心疼，又无力。",
          image: "/assets/scenes/q15-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 4, 激情: 3, 虚无: 2, 自尊: 4, 热忱: 2 }
      }
    ],
    quote: "她记得每一种屈辱，也记得音乐怎样把她托起来。",
    quoteSource: "《涅托奇卡·涅兹瓦诺娃》"
  },
  {
    id: "q16",
    scene: "如果世界上出现了一个「更好的你」——他比你自信、比你成功、比你更受欢迎，但他是你的影子，甚至想取代你。你会？",
    bookHint: "《双重人格》",
    options: [
      {
        text: "与他和解，承认他的存在",
        flash: {
          who: "戈利亚德金",
          characterId: "golyadkin-senior",
          line: "与他和解。",
          image: "/assets/scenes/q16-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 2, 激情: 2, 虚无: 2, 自尊: 3, 热忱: 2 }
      },
      {
        text: "彻底对抗，消灭他",
        flash: {
          who: "戈利亚德金",
          characterId: "golyadkin-senior",
          line: "彻底对抗。消灭他。",
          image: "/assets/scenes/q16-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 1, 激情: 4, 虚无: 3, 自尊: 5, 热忱: 1 }
      },
      {
        text: "陷入自我怀疑",
        flash: {
          who: "小戈利亚德金",
          characterId: "golyadkin-junior",
          line: "分不清谁才是真的我。",
          image: "/assets/scenes/q16-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 3, 虚无: 4, 自尊: 3, 热忱: 3 }
      }
    ],
    quote: "最怕的不是对手，是那个更会处事的自己。",
    quoteSource: "《双重人格》"
  },
  {
    id: "q17",
    scene: "你相信「美」真的能拯救世界吗？或者说，在一个充满苦难和不公的世界里，「美」是否只是一种奢侈的幻觉？",
    bookHint: "《白痴》",
    options: [
      {
        text: "相信",
        flash: {
          who: "梅什金",
          characterId: "prince-myshkin",
          line: "相信。美不是幻觉。",
          image: "/assets/scenes/q17-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 1, 热忱: 4 }
      },
      {
        text: "不相信",
        flash: {
          who: "纳斯塔霞",
          characterId: "nastasya",
          line: "不相信。美救不了世界。",
          image: "/assets/scenes/q17-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 2, 激情: 5, 虚无: 3, 自尊: 5, 热忱: 2 }
      },
      {
        text: "我不确定",
        flash: {
          who: "阿格拉娅",
          characterId: "aglaya",
          line: "不确定。光芒很快熄灭。",
          image: "/assets/scenes/q17-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 2, 激情: 4, 虚无: 2, 自尊: 5, 热忱: 3 }
      }
    ],
    quote: "美将拯救世界。",
    quoteSource: "《白痴》"
  },
  {
    id: "q18",
    scene: "你是否曾被一个「理念」深深抓住，以至于它开始主导你的生活——你为它辩护、为它牺牲、为它失眠。但你渐渐发现，你已经不是在「使用」这个理念，而是被这个理念「使用」了。你会停下来审视，还是继续被它推着走？",
    bookHint: "《罪与罚》",
    options: [
      {
        text: "停下来审视",
        flash: {
          who: "索尼娅",
          characterId: "sonya",
          line: "停下来审视。",
          image: "/assets/scenes/q18-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "继续被推着走",
        flash: {
          who: "拉斯柯尔尼科夫",
          characterId: "raskolnikov",
          line: "继续被推着走。",
          image: "/assets/scenes/q18-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 1, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 2 }
      },
      {
        text: "我已经分辨不出来了",
        flash: {
          who: "斯维德里盖洛夫",
          characterId: "svidrigailov",
          line: "分不清是谁在想。",
          image: "/assets/scenes/q18-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 2, 热忱: 1 }
      }
    ],
    quote: "思想使人疯狂，把人逼向最极端的境地。",
    quoteSource: "《罪与罚》"
  },
  {
    id: "q19",
    scene: "如果你发现，传统意义上的「好人」和「坏人」的标签完全无法解释你内心的复杂——你既渴望被爱，又享受伤害别人后的快感；既追求崇高，又沉迷卑琐。你承认这种复杂性，还是用「我是一个好人」来简化自己？",
    bookHint: "《卡拉马佐夫兄弟》",
    options: [
      {
        text: "承认这种复杂性",
        flash: {
          who: "德米特里",
          characterId: "dmitry-karamazov",
          line: "承认。善与恶并存。",
          image: "/assets/scenes/q19-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 3, 激情: 5, 虚无: 2, 自尊: 3, 热忱: 4 }
      },
      {
        text: "用「好人」来简化自己",
        flash: {
          who: "阿辽沙",
          characterId: "alyosha-karamazov",
          line: "努力做一个纯粹的好人。",
          image: "/assets/scenes/q19-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 5 }
      },
      {
        text: "我被这种复杂性撕裂了",
        flash: {
          who: "伊万",
          characterId: "ivan-karamazov",
          line: "两半之间，每天挣扎。",
          image: "/assets/scenes/q19-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 3, 激情: 2, 虚无: 4, 自尊: 4, 热忱: 1 }
      }
    ],
    quote: "我们是卑鄙的，我们是有情欲的，我们是卡拉马佐夫！",
    quoteSource: "《卡拉马佐夫兄弟》"
  },
  {
    id: "q20",
    scene: "如果让你选择一种身份认同——做一个坚定的「中国人」（深耕自己的文化和传统），还是做一个「世界公民」（超越民族界限，拥抱全人类共同的价值），你会倾向于哪一方？",
    bookHint: "《作家日记》",
    options: [
      {
        text: "做坚定的中国人",
        flash: {
          who: "沙托夫",
          characterId: "shatov",
          line: "做坚定的中国人。",
          image: "/assets/scenes/q20-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 3, 虚无: 2, 自尊: 3, 热忱: 5 }
      },
      {
        text: "做世界公民",
        flash: {
          who: "韦尔西洛夫",
          characterId: "versilov",
          line: "做世界公民。",
          image: "/assets/scenes/q20-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 2, 虚无: 3, 自尊: 4, 热忱: 2 }
      },
      {
        text: "我相信两者可以共存",
        flash: {
          who: "阿辽沙",
          characterId: "alyosha-karamazov",
          line: "两者可以共存。",
          image: "/assets/scenes/q20-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 5 }
      }
    ],
    quote: "拯救世界之路就是由这些个别的平凡人开始的。",
    quoteSource: "《作家日记》"
  }
];
