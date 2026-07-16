module.exports = [
  {
    id: "q01",
    scene: "你认定自己能办成大事，但得伤害一个无辜的人。你会？",
    bookHint: "《罪与罚》",
    options: [
      {
        text: "先做，事后再找理由解释",
        flash: {
          who: "拉斯柯尔尼科夫",
          characterId: "raskolnikov",
          line: "他握紧想法：不是为钱，是为证明自己有权跨过别人的血。",
          image: "/assets/scenes/q01-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 1, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 2 }
      },
      {
        text: "停手，人不能当垫脚石",
        flash: {
          who: "索尼娅",
          characterId: "sonya",
          line: "她不争对错。只是伸手，把那个人从边缘轻轻拉回来。",
          image: "/assets/scenes/q01-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 2, 热忱: 3 }
      },
      {
        text: "无所谓，认真不起来",
        flash: {
          who: "斯维德里盖洛夫",
          characterId: "svidrigailov",
          line: "他笑了一下：所谓界限，不过是别人吓自己的词。",
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
    scene: "朋友把自己关在屋里，又病又倔，谁都不让进。你会？",
    bookHint: "《罪与罚》",
    options: [
      {
        text: "直接闯进去，把人拉起来",
        flash: {
          who: "拉祖米欣",
          characterId: "razumikhin",
          line: "门被撞开。他骂着「你发什么疯」，一边把热汤塞进对方怀里。",
          image: "/assets/scenes/q02-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 4, 激情: 3, 虚无: 1, 自尊: 2, 热忱: 5 }
      },
      {
        text: "先问清楚，再决定逼不逼",
        flash: {
          who: "波尔菲里",
          characterId: "porfiry",
          line: "他不急着破门。只是把椅子拉近，用闲聊把缝隙听出来。",
          image: "/assets/scenes/q02-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 3, 激情: 1, 虚无: 2, 自尊: 3, 热忱: 2 }
      },
      {
        text: "坐门口陪着，不催也不走",
        flash: {
          who: "阿辽沙",
          characterId: "alyosha-karamazov",
          line: "他靠着门框，不催破门。只让屋里的人知道：还有人在。",
          image: "/assets/scenes/q02-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 4 }
      }
    ],
    quote: "他几乎不出门，谁来看他都像是打扰。",
    quoteSource: "《罪与罚》"
  },
  {
    id: "q03",
    scene: "有人要你签一份婚约换全家安稳，但你会被当成筹码。你会？",
    bookHint: "《罪与罚》",
    options: [
      {
        text: "谈条件可以，被卖不行",
        flash: {
          who: "杜尼娅",
          characterId: "dunya",
          line: "她抬起下巴：可以谈条件，被当成货物谈判——一步都不让。",
          image: "/assets/scenes/q03-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 2, 激情: 4, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "为了家人，我先吞下去",
        flash: {
          who: "索尼娅",
          characterId: "sonya",
          line: "她手指掐进掌心，脸上仍平静。有人还需要她撑着。",
          image: "/assets/scenes/q03-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "笑着撕掉，顺便嘲讽正经",
        flash: {
          who: "斯维德里盖洛夫",
          characterId: "svidrigailov",
          line: "他把纸推回去：安稳？不过是别人吓自己的词。",
          image: "/assets/scenes/q03-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 3, 虚无: 3, 自尊: 4, 热忱: 2 }
      }
    ],
    quote: "她可以为家里牺牲许多，却容不得自己被当成货物来谈。",
    quoteSource: "《罪与罚》"
  },
  {
    id: "q04",
    scene: "街角有人无端挨打，孩子哭得很惨。你最先怎样？",
    bookHint: "《卡拉马佐夫兄弟》",
    options: [
      {
        text: "走开：这种世界我不要",
        flash: {
          who: "伊万",
          characterId: "ivan-karamazov",
          line: "孩子的眼泪在他眼前放大。若这是和谐的代价，他拒绝进入。",
          image: "/assets/scenes/q04-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 3, 激情: 2, 虚无: 3, 自尊: 4, 热忱: 1 }
      },
      {
        text: "靠近，先安抚受伤的人",
        flash: {
          who: "阿辽沙",
          characterId: "alyosha-karamazov",
          line: "他蹲在尘土里，不问世界公不公正——先握住那个人的手。",
          image: "/assets/scenes/q04-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 1, 热忱: 5 }
      },
      {
        text: "冲上去，先拦住打人的",
        flash: {
          who: "德米特里",
          characterId: "dmitry-karamazov",
          line: "他已经冲进人群，嗓门盖过哭声：谁再动手，冲我来。",
          image: "/assets/scenes/q04-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 3, 激情: 5, 虚无: 1, 自尊: 3, 热忱: 5 }
      }
    ],
    quote: "我不是不接受上帝，我只是恭恭敬敬地把入场券退还。",
    quoteSource: "《卡拉马佐夫兄弟》"
  },
  {
    id: "q05",
    scene: "家里为钱、面子和欲望大吵，场面又脏又乱。你会？",
    bookHint: "《卡拉马佐夫兄弟》",
    options: [
      {
        text: "开玩笑搅局，嘲讽正经人",
        flash: {
          who: "老卡拉马佐夫",
          characterId: "fyodor-karamazov",
          line: "正经话被他一声浪笑打断。他举杯：尊严？先干杯再说。",
          image: "/assets/scenes/q05-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 1, 激情: 5, 虚无: 5, 自尊: 1, 热忱: 1 }
      },
      {
        text: "又爱又恨，把所有人卷进来",
        flash: {
          who: "格鲁申卡",
          characterId: "grushenka",
          line: "门一开，两个人都转头。她站在光里，像故意把整座房子点着。",
          image: "/assets/scenes/q05-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 2, 激情: 5, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "不吭声，把羞辱记在心里",
        flash: {
          who: "斯麦尔佳科夫",
          characterId: "smerdyakov",
          line: "他站在门边，把一句轻蔑听进心里，转身消失在阴影里。",
          image: "/assets/scenes/q05-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 3, 热忱: 1 }
      }
    ],
    quote: "我们是卑鄙的，我们是有情欲的，我们是卡拉马佐夫！",
    quoteSource: "《卡拉马佐夫兄弟》"
  },
  {
    id: "q06",
    scene: "有人说：最终幸福要用无辜孩子的痛苦换。你接受吗？",
    bookHint: "《卡拉马佐夫兄弟》",
    options: [
      {
        text: "拒绝：这种幸福我不要",
        flash: {
          who: "伊万",
          characterId: "ivan-karamazov",
          line: "他推开椅子：用孩子眼泪买来的和谐，票价他付不起。",
          image: "/assets/scenes/q06-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 4, 激情: 1, 虚无: 3, 自尊: 4, 热忱: 1 }
      },
      {
        text: "不争了，先去安慰哭的人",
        flash: {
          who: "阿辽沙",
          characterId: "alyosha-karamazov",
          line: "他没有赢下辩论。他只是站起来，去找那个还在哭的人。",
          image: "/assets/scenes/q06-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 5 }
      },
      {
        text: "听完，把话默默记在心里",
        flash: {
          who: "斯麦尔佳科夫",
          characterId: "smerdyakov",
          line: "他听完高论，嘴角几不可察地动了动：说归说，刺归刺。",
          image: "/assets/scenes/q06-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 3, 热忱: 1 }
      }
    ],
    quote: "如果苦难是买和谐的门票，这票价我付不起。",
    quoteSource: "《卡拉马佐夫兄弟》"
  },
  {
    id: "q07",
    scene: "一边是快崩溃、需要你救的人，一边是真心爱你的人。你选？",
    bookHint: "《白痴》",
    options: [
      {
        text: "去托住那个快毁掉的人",
        flash: {
          who: "梅什金",
          characterId: "prince-myshkin",
          line: "他走向被议论的人，只说：我相信你——哪怕这会伤到另一个人。",
          image: "/assets/scenes/q07-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 1, 热忱: 4 }
      },
      {
        text: "抓住属于自己的那份爱",
        flash: {
          who: "阿格拉娅",
          characterId: "aglaya",
          line: "她抬眼像在考试：你可以谈拯救，先证明你不是把我当成旁白。",
          image: "/assets/scenes/q07-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 2, 激情: 4, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "抓不住就一起沉，谁也别要",
        flash: {
          who: "罗戈任",
          characterId: "rogozhin",
          line: "他的手指捏白。他低声说：你是我的——不然谁都别想要。",
          image: "/assets/scenes/q07-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 1, 激情: 5, 虚无: 2, 自尊: 3, 热忱: 3 }
      }
    ],
    quote: "美将拯救世界。",
    quoteSource: "《白痴》"
  },
  {
    id: "q08",
    scene: "你想用善意帮一个人，旁人却笑你天真、说你是傻瓜。你会？",
    bookHint: "《白痴》",
    options: [
      {
        text: "仍走近对方，不怕当傻瓜",
        flash: {
          who: "梅什金",
          characterId: "prince-myshkin",
          line: "他红着脸，仍把话说完：善意若救不了人，至少让我不先变脏。",
          image: "/assets/scenes/q08-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 1, 热忱: 4 }
      },
      {
        text: "先看清楚：对方是不是真心",
        flash: {
          who: "阿格拉娅",
          characterId: "aglaya",
          line: "她抬眼看人：你可以谈美善，先证明你不是在哄我。",
          image: "/assets/scenes/q08-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 2, 激情: 4, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "冷笑：善意只会把人烧疼",
        flash: {
          who: "纳斯塔霞",
          characterId: "nastasya",
          line: "她笑了一下，笑声里有刀：别用美来救我——先回答你敢不敢选我。",
          image: "/assets/scenes/q08-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 2, 激情: 5, 虚无: 3, 自尊: 5, 热忱: 2 }
      }
    ],
    quote: "有时候，人们把最干净的心叫做白痴。",
    quoteSource: "《白痴》"
  },
  {
    id: "q09",
    scene: "一群人围着魅力人物谈理想、起哄，都等他表态。你会？",
    bookHint: "《群魔》",
    options: [
      {
        text: "坐正中喝茶，什么也不表态",
        flash: {
          who: "斯塔夫罗金",
          characterId: "stavrogin",
          line: "众人把理想堆到他脚边。他只微微点头，像接受献祭，却不献出自己。",
          image: "/assets/scenes/q09-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 1, 虚无: 5, 自尊: 3, 热忱: 1 }
      },
      {
        text: "推动局面，把人当棋子用",
        flash: {
          who: "彼得·韦尔霍文斯基",
          characterId: "pyotr-verkhovensky",
          line: "他拍拍某人的肩，像分配角色：你去点火，你去传话，他——站中间。",
          image: "/assets/scenes/q09-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 4, 虚无: 5, 自尊: 3, 热忱: 3 }
      },
      {
        text: "先问：这热闹谁会受伤",
        flash: {
          who: "沙托夫",
          characterId: "shatov",
          line: "口号正热。他却转向角落里没说话的人：这热闹，谁在付钱。",
          image: "/assets/scenes/q09-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 2, 虚无: 2, 自尊: 2, 热忱: 5 }
      }
    ],
    quote: "人们把他当作旗帜，他自己却站在空处。",
    quoteSource: "《群魔》"
  },
  {
    id: "q10",
    scene: "有人说：嘴上谈自由不算，要用极端行动证明。你会？",
    bookHint: "《群魔》",
    options: [
      {
        text: "认同：半吊子自由更刺耳",
        flash: {
          who: "基里洛夫",
          characterId: "kirillov",
          line: "他说话很快，像在跟时间赛跑：半吊子的自由，比奴役更刺耳。",
          image: "/assets/scenes/q10-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 3, 虚无: 4, 自尊: 4, 热忱: 2 }
      },
      {
        text: "转身利用：这能编进计划",
        flash: {
          who: "彼得·韦尔霍文斯基",
          characterId: "pyotr-verkhovensky",
          line: "他听完，眼睛亮了一下：好，这可以变成一件「有用」的事。",
          image: "/assets/scenes/q10-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 2, 激情: 3, 虚无: 4, 自尊: 3, 热忱: 3 }
      },
      {
        text: "去找一件还能真心相信的事",
        flash: {
          who: "沙托夫",
          characterId: "shatov",
          line: "他声音发颤，却更定：我不需要更响的口号，我需要还能信的东西。",
          image: "/assets/scenes/q10-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 3, 虚无: 2, 自尊: 3, 热忱: 5 }
      }
    ],
    quote: "有人把自由谈得很满，却容不得自己半吊子。",
    quoteSource: "《群魔》"
  },
  {
    id: "q11",
    scene: "别人劝你精明利己。你偏想做件对自己有害的蠢事——会吗？",
    bookHint: "《地下室手记》",
    options: [
      {
        text: "会，证明我不是算计机器",
        flash: {
          who: "地下室人",
          characterId: "underground-man",
          line: "他笑着把杯子推远：快乐的奴隶？我宁可痛苦地自由。",
          image: "/assets/scenes/q11-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 1, 激情: 3, 虚无: 4, 自尊: 5, 热忱: 1 }
      },
      {
        text: "不会。真正自由要靠理性",
        flash: {
          who: "波尔菲里",
          characterId: "porfiry",
          line: "他慢慢搅着茶：跟自己作对不算自由，只是另一种被念头牵着走。",
          image: "/assets/scenes/q11-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 1, 虚无: 2, 自尊: 3, 热忱: 2 }
      },
      {
        text: "想过，最终不敢，窝着恨",
        flash: {
          who: "地下室人",
          characterId: "underground-man",
          line: "他对空墙比划完反击，第二天遇见对方，却连眼神都躲。",
          image: "/assets/scenes/q11-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 5, 热忱: 1 }
      }
    ],
    quote: "人并非总是追求利益最大化的动物。",
    quoteSource: "《地下室手记》"
  },
  {
    id: "q12",
    scene: "一段短暂相遇快结束了。明知不会长久，你会？",
    bookHint: "《白夜》",
    options: [
      {
        text: "全力投入，明知会散也要",
        flash: {
          who: "白夜梦想家",
          characterId: "dreamer",
          line: "桥栏很凉。他把整个夏天的幻想，都押进这几个短短的夜晚。",
          image: "/assets/scenes/q12-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 3, 激情: 4, 虚无: 1, 自尊: 1, 热忱: 3 }
      },
      {
        text: "说清去向，不把人留在梦里",
        flash: {
          who: "娜斯简卡",
          characterId: "nastenka",
          line: "她握住对方的手：谢谢你来过，我仍要往自己的路走。",
          image: "/assets/scenes/q12-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 4, 激情: 3, 虚无: 1, 自尊: 3, 热忱: 3 }
      },
      {
        text: "珍惜这一晚，不要求成一生",
        flash: {
          who: "娜斯简卡",
          characterId: "nastenka",
          line: "她把故事讲完，声音轻而清楚：美可以短，诚实必须长。",
          image: "/assets/scenes/q12-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 3, 激情: 2, 虚无: 2, 自尊: 2, 热忱: 2 }
      }
    ],
    quote: "我是个幻想家。我自己编造完整的生活。",
    quoteSource: "《白夜》"
  },
  {
    id: "q13",
    scene: "钱很紧，还想守住体面。你会怎么过？",
    bookHint: "《穷人》",
    options: [
      {
        text: "省自己，把温柔留给在乎的人",
        flash: {
          who: "杰武什金",
          characterId: "makar-devushkin",
          line: "他搓着手写完整的问候。茶淡了没关系，字必须端正。",
          image: "/assets/scenes/q13-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 3, 热忱: 4 }
      },
      {
        text: "领受善意，但路要自己走",
        flash: {
          who: "瓦尔瓦拉",
          characterId: "varvara-dobroselova",
          line: "她回信写得很暖，也写得很清：感谢你，我的路要我自己走。",
          image: "/assets/scenes/q13-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 3, 激情: 2, 虚无: 1, 自尊: 5, 热忱: 3 }
      },
      {
        text: "把苦写成礼貌，绝不哭穷",
        flash: {
          who: "杰武什金",
          characterId: "makar-devushkin",
          line: "他改掉一句诉苦，换上天气与问好。体面，是他最后的制服。",
          image: "/assets/scenes/q13-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 4, 激情: 1, 虚无: 1, 自尊: 4, 热忱: 3 }
      }
    ],
    quote: "即使只剩几戈比，信里也还要写得体面、温柔。",
    quoteSource: "《穷人》"
  },
  {
    id: "q14",
    scene: "出身让你抬不起头。明天见人，你靠什么站直？",
    bookHint: "《少年》",
    options: [
      {
        text: "先变成别人看得起的那种人",
        flash: {
          who: "阿尔卡季",
          characterId: "arkady",
          line: "他把领结系紧，像系住一个即将登场的新身份。",
          image: "/assets/scenes/q14-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 3, 虚无: 1, 自尊: 5, 热忱: 5 }
      },
      {
        text: "靠见识谈吐，让人仰望",
        flash: {
          who: "韦尔西洛夫",
          characterId: "versilov",
          line: "他说话不紧不慢，房间像被打开一扇更大的窗——人却看不清他站在哪。",
          image: "/assets/scenes/q14-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 2, 虚无: 2, 自尊: 4, 热忱: 2 }
      },
      {
        text: "关键时刻安静地在，被人需要",
        flash: {
          who: "马卡尔",
          characterId: "makar",
          line: "他不多话。只是把一件小事做好，让慌乱的人肩上轻一点。",
          image: "/assets/scenes/q14-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 5 }
      }
    ],
    quote: "我的主意是成为某种人，好让出身闭嘴。",
    quoteSource: "《少年》"
  },
  {
    id: "q15",
    scene: "有人默默把热茶推到你手边，不讲话。你会？",
    bookHint: "《少年》",
    options: [
      {
        text: "收下，改天默默帮回去",
        flash: {
          who: "马卡尔",
          characterId: "makar",
          line: "他点点头，像把一件旧棉衣递过来：穿上就行，不必谢。",
          image: "/assets/scenes/q15-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 5, 激情: 1, 虚无: 1, 自尊: 2, 热忱: 5 }
      },
      {
        text: "感激，却更急着证明自己配",
        flash: {
          who: "阿尔卡季",
          characterId: "arkady",
          line: "他收下帮助，耳朵却发烫：我不能一直是被人扶的那个。",
          image: "/assets/scenes/q15-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 2, 激情: 3, 虚无: 1, 自尊: 5, 热忱: 4 }
      },
      {
        text: "感动，随即用大道理冲淡它",
        flash: {
          who: "韦尔西洛夫",
          characterId: "versilov",
          line: "他微笑致谢，随即把善谈成「人类情感的某种形式」——暖意淡了一层。",
          image: "/assets/scenes/q15-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 2, 虚无: 3, 自尊: 3, 热忱: 2 }
      }
    ],
    quote: "有些扶持不响，却比演说更托得住人。",
    quoteSource: "《少年》"
  },
  {
    id: "q16",
    scene: "旧伤忽然翻上来，胸口发紧。你下意识会？",
    bookHint: "《涅托奇卡·涅兹瓦诺娃》",
    options: [
      {
        text: "更用力抓住身边的人",
        flash: {
          who: "涅托奇卡",
          characterId: "netochka",
          line: "她抓住身边的人不放——像抓住自己还能被爱的证据。",
          image: "/assets/scenes/q16-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 4, 激情: 3, 虚无: 1, 自尊: 4, 热忱: 2 }
      },
      {
        text: "昂着头，绝不容自己变普通",
        flash: {
          who: "叶菲莫夫",
          characterId: "yefimov",
          line: "掌声退去后，他仍昂着头。跌落不可原谅——尤其对自己。",
          image: "/assets/scenes/q16-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 1, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 1 }
      },
      {
        text: "看见别人抖，自己先伸手",
        flash: {
          who: "涅托奇卡",
          characterId: "netochka",
          line: "她看见别人发抖，会先发抖。伤过的人，才能把别人的疼读出来。",
          image: "/assets/scenes/q16-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 3, 热忱: 3 }
      }
    ],
    quote: "她记得每一种屈辱，也记得音乐怎样把她托起来。",
    quoteSource: "《涅托奇卡·涅兹瓦诺娃》"
  },
  {
    id: "q17",
    scene: "你清醒知道对方不值得，可一见面狠话又碎掉。你会？",
    bookHint: "《被侮辱与被损害的》",
    options: [
      {
        text: "狠心止损，亲手斩断",
        flash: {
          who: "涅莉",
          characterId: "nelly",
          line: "有人递来面包与同情。她退半步：穷可以，被可怜不行。",
          image: "/assets/scenes/q17-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 2, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 2 }
      },
      {
        text: "继续爱，哪怕最后一无所有",
        flash: {
          who: "娜塔莎",
          characterId: "natasha",
          line: "她把指控都听完，眼睛仍亮：你们可以判我傻，不能替我决定我爱谁。",
          image: "/assets/scenes/q17-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 4, 激情: 5, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "想走，见他又全部崩塌",
        flash: {
          who: "娜塔莎",
          characterId: "natasha",
          line: "她每天都想结束，每次见面又全部崩塌。恨他，更恨自己的软弱。",
          image: "/assets/scenes/q17-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 3, 激情: 4, 虚无: 3, 自尊: 3, 热忱: 2 }
      }
    ],
    quote: "我明知他是个空心人，我还是爱他。",
    quoteSource: "《被侮辱与被损害的》"
  },
  {
    id: "q18",
    scene: "失去自由，日子被铃声切成段。你靠什么撑住？",
    bookHint: "《死屋手记》",
    options: [
      {
        text: "观察、记录身边的人",
        flash: {
          who: "亚历山大·彼得罗维奇",
          characterId: "alexander-petrovich",
          line: "他在嘈杂里仍看人：残暴、滑稽、善意——一律入眼，像抓住最后的秩序。",
          image: "/assets/scenes/q18-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 3, 激情: 1, 虚无: 2, 自尊: 3, 热忱: 3 }
      },
      {
        text: "把半块面包递出去",
        flash: {
          who: "阿列伊",
          characterId: "alei",
          line: "他分享半块面包，声音很轻。粗粝里这一点礼貌，让周围也慢半拍。",
          image: "/assets/scenes/q18-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "认真学点东西，给自己明天",
        flash: {
          who: "阿列伊",
          characterId: "alei",
          line: "他跟着学字，学得认真。铁窗外面是远方，铁窗里面也可以有明天。",
          image: "/assets/scenes/q18-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 4, 激情: 2, 虚无: 1, 自尊: 3, 热忱: 4 }
      }
    ],
    quote: "人可以失去自由，却不必立刻失去人的样子。",
    quoteSource: "《死屋手记》"
  },
  {
    id: "q19",
    scene: "社交场上，一个更会来事的「你」抢先寒暄。你会？",
    bookHint: "《双重人格》",
    options: [
      {
        text: "越解释越乱，死守体面",
        flash: {
          who: "戈利亚德金",
          characterId: "golyadkin-senior",
          line: "他连连鞠躬，词语绊在舌头上：我不是那样的人——越说，缝越大。",
          image: "/assets/scenes/q19-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 2, 怜悯: 2, 激情: 3, 虚无: 3, 自尊: 5, 热忱: 1 }
      },
      {
        text: "让那个圆滑的自己先上场",
        flash: {
          who: "小戈利亚德金",
          characterId: "golyadkin-junior",
          line: "他笑得恰到好处，抢先握手寒暄。场面站在他这边，本人却被挤到阴影里。",
          image: "/assets/scenes/q19-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 4, 怜悯: 1, 激情: 3, 虚无: 4, 自尊: 3, 热忱: 3 }
      },
      {
        text: "先看清：是怕，还是真有人拆台",
        flash: {
          who: "戈利亚德金",
          characterId: "golyadkin-senior",
          line: "他按住胸口，强迫自己看清：拆台的也许不是别人，是怕。",
          image: "/assets/scenes/q19-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 2, 虚无: 2, 自尊: 3, 热忱: 2 }
      }
    ],
    quote: "最怕的不是对手，是那个更会处事的自己。",
    quoteSource: "《双重人格》"
  },
  {
    id: "q20",
    scene: "你犯过错，夜里它还坐在房间角落。你会？",
    bookHint: "跨书",
    options: [
      {
        text: "整夜审讯自己，睡不着",
        flash: {
          who: "拉斯柯尔尼科夫",
          characterId: "raskolnikov",
          line: "夜里更响的，是良心在狭小房间里的脚步声——事已做成，人还醒着。",
          image: "/assets/scenes/q20-A.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 5, 怜悯: 2, 激情: 3, 虚无: 2, 自尊: 5, 热忱: 2 }
      },
      {
        text: "陪着对方：路还长，你不孤单",
        flash: {
          who: "索尼娅",
          characterId: "sonya",
          line: "她不谈免罪。她只是伸手：你若还站得住，我不让你一个人站着。",
          image: "/assets/scenes/q20-B.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 1, 怜悯: 5, 激情: 2, 虚无: 1, 自尊: 2, 热忱: 4 }
      },
      {
        text: "耸肩：不想再陪它演戏",
        flash: {
          who: "斯维德里盖洛夫",
          characterId: "svidrigailov",
          line: "他耸耸肩：过错？不过是故事的一种写法。他打了个哈欠，不想再陪它演戏。",
          image: "/assets/scenes/q20-C.jpg",
          imageKind: "scene"
        },
        axes: { 理性: 3, 怜悯: 1, 激情: 2, 虚无: 5, 自尊: 2, 热忱: 1 }
      }
    ],
    quote: "人与过错相处的方式，往往比过错本身更像他是谁。",
    quoteSource: "跨书"
  }
];
