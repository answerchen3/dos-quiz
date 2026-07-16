/**
 * 陀翁金句 · 每日一句数据源
 *
 * 字段：{ text, book, character? }
 * - text：金句正文（不带书名号）
 * - book：出处书名（不带书名号）
 * - character：可选，说话人/相关角色名
 *
 * 轮换规则：quotes[dayOfYear % quotes.length]
 * 纯前端确定，不需要后端。
 */
module.exports = [
  { text: '凡是非凡的人，都有权利允许自己的良心跨过某些障碍。', book: '罪与罚', character: '拉斯柯尔尼科夫' },
  { text: '美将拯救世界。', book: '白痴', character: '梅什金公爵' },
  { text: '我不是不接受上帝，而是不接受他创造的世界。', book: '卡拉马佐夫兄弟', character: '伊万' },
  { text: '既然上帝不存在，那么人就成了神。', book: '群魔', character: '基里洛夫' },
  { text: '人并非总是追求利益最大化的动物。', book: '地下室手记', character: '地下室人' },
  { text: '我是有病的人。我太清醒了。', book: '地下室手记', character: '地下室人' },
  { text: '人可以习惯一切，哪怕是绞刑架。', book: '死屋手记', character: '亚历山大·彼得罗维奇' },
  { text: '最深的伤，常常来自最亲近的人。', book: '被侮辱与被损害的', character: '娜塔莎' },
  { text: '我明知他是个空心人，我还是爱他。', book: '被侮辱与被损害的', character: '娜塔莎' },
  { text: '我是个幻想家。我自己编造完整的生活。', book: '白夜', character: '梦想家' },
  { text: '即使只剩几戈比，信里也还要写得体面、温柔。', book: '穷人', character: '杰武什金' },
  { text: '不要剥夺我唯一活下去的意义——就是照顾你。', book: '穷人', character: '杰武什金' },
  { text: '她记得每一种屈辱，也记得音乐怎样把她托起来。', book: '涅托奇卡·涅兹瓦诺娃', character: '涅托奇卡' },
  { text: '最怕的不是对手，是那个更会处事的自己。', book: '双重人格', character: '戈利亚德金' },
  { text: '思想使人疯狂，把人逼向最极端的境地。', book: '罪与罚', character: '拉斯柯尔尼科夫' },
  { text: '我们是卑鄙的，我们是有情欲的，我们是卡拉马佐夫！', book: '卡拉马佐夫兄弟', character: '德米特里' },
  { text: '离开自己的土壤，人就失去了根，变成了浮萍。', book: '群魔', character: '斯塔夫罗金' },
  { text: '金钱即力量。', book: '少年', character: '阿尔卡季' },
  { text: '要想不被自己折磨，就先承认自己是怎样的人。', book: '罪与罚', character: '拉斯柯尔尼科夫' },
  { text: '怜悯是最可贵的美德，可它也会杀人。', book: '白痴', character: '梅什金公爵' },
  { text: '没有上帝，一切都被允许。', book: '卡拉马佐夫兄弟', character: '伊万' },
  { text: '爱一个人，就是看见他所有的丑陋仍愿留下。', book: '卡拉马佐夫兄弟', character: '阿辽沙' },
  { text: '骄傲先于坠落，狂热的自傲先于毁灭。', book: '罪与罚', character: '拉斯柯尔尼科夫' },
  { text: '幸福不在于理由，而在于被理解。', book: '白痴', character: '梅什金公爵' },
  { text: '清醒若没有行动，只是更精致的牢笼。', book: '地下室手记', character: '地下室人' },
  { text: '谁比谁更痛苦，永远比不出来。', book: '被侮辱与被损害的', character: '娜塔莎' },
  { text: '夜里写的字，白天读会脸红，但那才是自己。', book: '白夜', character: '梦想家' },
  { text: '人不是靠面包活着，是靠一句被听见的话。', book: '穷人', character: '杰武什金' },
  { text: '我装作不痛，是因为说出痛来也不会有人接住。', book: '涅托奇卡·涅兹瓦诺娃', character: '涅托奇卡' },
  { text: '习惯会把最荒谬的事，磨成日常的形状。', book: '死屋手记', character: '亚历山大·彼得罗维奇' },
  { text: '两个人格住在同一个身体里，先累的是身体。', book: '双重人格', character: '戈利亚德金' },
  { text: '自由是危险的，可比起被拴着的安全，它值得一试。', book: '群魔', character: '斯塔夫罗金' },
  { text: '把心里那点善意留到最后，胜过一次漂亮的英雄主义。', book: '卡拉马佐夫兄弟', character: '阿辽沙' },
  { text: '少年人最深的渴望，是被一个年长的人真正看见。', book: '少年', character: '阿尔卡季' },
  { text: '人会用一辈子的孤独，去换一次被认真问起的瞬间。', book: '白夜', character: '梦想家' },
  { text: '最难的不是原谅别人，是原谅那个无能为力的自己。', book: '罪与罚', character: '索尼娅' },
  { text: '世界以痛吻我，要我以咒骂作答——可我没答。', book: '被侮辱与被损害的', character: '娜塔莎' },
  { text: '人能被一种想法占满，直到容不下别的呼吸。', book: '群魔', character: '基里洛夫' },
  { text: '真正的善意，是连自己的难堪也算进去。', book: '白痴', character: '梅什金公爵' },
  { text: '苦难不是奖杯，它只是把人按到水底，看谁还会抬头。', book: '死屋手记', character: '亚历山大·彼得罗维奇' },
  { text: '我们终其一生在等一句没说出口的道歉。', book: '卡拉马佐夫兄弟', character: '阿辽沙' },
  { text: '梦想若不落到一件小事上，就只是漂亮的雾。', book: '白夜', character: '梦想家' },
]
