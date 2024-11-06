const trigrams = {
  // 乾(天)
  111: { name: "乾", nature: "金", symbol: "天", number: 1 },
  // 兌(澤)
  110: { name: "兌", nature: "金", symbol: "澤", number: 2 },
  // 離(火)
  101: { name: "離", nature: "火", symbol: "火", number: 3 },
  // 震(雷)
  100: { name: "震", nature: "木", symbol: "雷", number: 4 },
  // 巽(風)
  "011": { name: "巽", nature: "木", symbol: "風", number: 5 },
  // 坎(水)
  "010": { name: "坎", nature: "水", symbol: "水", number: 6 },
  // 艮(山)
  "001": { name: "艮", nature: "土", symbol: "山", number: 7 },
  // 坤(地)
  "000": { name: "坤", nature: "土", symbol: "地", number: 8 },
};

const fivePhase = ["金", "木", "水", "火", "土"];

const hexagrams = {
  // 乾宮卦
  111111: { name: "乾為天", number: 1, palace: 1, type: 1 },
  111110: { name: "姤", number: 44, palace: 1, type: 2 },
  111100: { name: "遯", number: 33, palace: 1, type: 3 },
  111000: { name: "否", number: 12, palace: 1, type: 4 },
  110000: { name: "觀", number: 20, palace: 1, type: 5 },
  100000: { name: "剝", number: 23, palace: 1, type: 6 },
  101000: { name: "晉", number: 35, palace: 1, type: 7 },
  101111: { name: "大有", number: 14, palace: 1, type: 8 },

  // 坤宮卦
  "000000": { name: "坤為地", number: 2, palace: 8, type: 1 },
  "000001": { name: "復", number: 24, palace: 8, type: 2 },
  "000011": { name: "臨", number: 19, palace: 8, type: 3 },
  "000111": { name: "泰", number: 11, palace: 8, type: 4 },
  "001111": { name: "大壯", number: 34, palace: 8, type: 5 },
  "011111": { name: "夬", number: 43, palace: 8, type: 6 },
  "010111": { name: "咸", number: 31, palace: 8, type: 7 },
  "010000": { name: "比", number: 8, palace: 8, type: 8 },

  // 震宮卦
  "001001": { name: "震為雷", number: 51, palace: 4, type: 1 },
  "001000": { name: "豫", number: 16, palace: 4, type: 2 },
  "001010": { name: "解", number: 40, palace: 4, type: 3 },
  "001110": { name: "恆", number: 32, palace: 4, type: 4 },
  "000110": { name: "升", number: 46, palace: 4, type: 5 },
  "010110": { name: "井", number: 44, palace: 4, type: 6 },
  "011110": { name: "升", number: 46, palace: 4, type: 7 },
  "011001": { name: "恆", number: 32, palace: 4, type: 8 },

  // 離宮卦
  101101: { name: "離為火", number: 30, palace: 3, type: 1 },
  101100: { name: "旅", number: 56, palace: 3, type: 2 },
  101110: { name: "大過", number: 28, palace: 3, type: 3 },
  101010: { name: "鼎", number: 50, palace: 3, type: 4 },
  100010: { name: "升", number: 46, palace: 3, type: 5 },
  110010: { name: "小過", number: 62, palace: 3, type: 6 },
  111010: { name: "鼎", number: 50, palace: 3, type: 7 },
  111101: { name: "離", number: 30, palace: 3, type: 8 },

  // 艮宮卦
  100100: { name: "艮為山", number: 52, palace: 7, type: 1 },
  100101: { name: "蠱", number: 18, palace: 7, type: 2 },
  100111: { name: "賁", number: 22, palace: 7, type: 3 },
  100011: { name: "明夷", number: 36, palace: 7, type: 4 },
  101011: { name: "師", number: 7, palace: 7, type: 5 },
  111011: { name: "小畜", number: 9, palace: 7, type: 6 },
  110011: { name: "遁", number: 33, palace: 7, type: 7 },
  110100: { name: "謙", number: 15, palace: 7, type: 8 },

  // 坎宮卦
  "010010": { name: "坎為水", number: 29, palace: 6, type: 1 },
  "010011": { name: "節", number: 60, palace: 6, type: 2 },
  "010001": { name: "屯", number: 3, palace: 6, type: 3 },
  "010101": { name: "既濟", number: 63, palace: 6, type: 4 },
  "011101": { name: "革", number: 49, palace: 6, type: 5 },
  "001101": { name: "豐", number: 55, palace: 6, type: 6 },
  "000101": { name: "明夷", number: 36, palace: 6, type: 7 },
  "000010": { name: "師", number: 7, palace: 6, type: 8 },

  // 巽宮卦
  "011011": { name: "巽為風", number: 57, palace: 5, type: 1 },
  "011010": { name: "漸", number: 53, palace: 5, type: 2 },
  "011000": { name: "觀", number: 20, palace: 5, type: 3 },
  "011100": { name: "中孚", number: 61, palace: 5, type: 4 },
  "010100": { name: "家人", number: 37, palace: 5, type: 5 },
  "000100": { name: "益", number: 42, palace: 5, type: 6 },
  "001100": { name: "渙", number: 59, palace: 5, type: 7 },
  "001011": { name: "隨", number: 17, palace: 5, type: 8 },

  // 兌宮卦
  110110: { name: "兌為澤", number: 58, palace: 2, type: 1 },
  110111: { name: "隨", number: 17, palace: 2, type: 2 },
  110101: { name: "大過", number: 28, palace: 2, type: 3 },
  110001: { name: "困", number: 47, palace: 2, type: 4 },
  111001: { name: "咸", number: 31, palace: 2, type: 5 },
  101001: { name: "萃", number: 45, palace: 2, type: 6 },
  100001: { name: "臨", number: 19, palace: 2, type: 7 },
  100110: { name: "損", number: 41, palace: 2, type: 8 },
};

const CHANGING_RULES = {
  OLD_YIN: { value: 6, changing: true, baseYao: 0 }, // 老陰變陽
  YOUNG_YANG: { value: 7, changing: false, baseYao: 1 }, // 少陽
  YOUNG_YIN: { value: 8, changing: false, baseYao: 0 }, // 少陰
  OLD_YANG: { value: 9, changing: true, baseYao: 1 }, // 老陽變陰
};
// 地支列表
const EARTHLY_BRANCHES = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];

// 納甲規則：八宮卦對應的天干地支
const PALACE_NAJIA_RULES = {
  1: {
    // 乾宮：乾內甲子外壬午
    inner: {
      stem: "甲",
      branches: ["子", "寅", "辰"], // 內卦地支順序
    },
    outer: {
      stem: "壬",
      branches: ["午", "申", "戌"], // 外卦地支順序
    },
  },
  6: {
    // 坎宮：坎內戊寅外戊申
    inner: {
      stem: "戊",
      branches: ["寅", "辰", "午"],
    },
    outer: {
      stem: "戊",
      branches: ["申", "戌", "子"],
    },
  },
  4: {
    // 震宮：震內庚子外庚午
    inner: {
      stem: "庚",
      branches: ["子", "寅", "辰"],
    },
    outer: {
      stem: "庚",
      branches: ["午", "申", "戌"],
    },
  },
  3: {
    // 離宮：離內己卯外己酉
    inner: {
      stem: "己",
      branches: ["卯", "巳", "未"],
    },
    outer: {
      stem: "己",
      branches: ["酉", "亥", "丑"],
    },
  },
  5: {
    // 巽宮：巽內辛丑外辛未
    inner: {
      stem: "辛",
      branches: ["丑", "卯", "巳"],
    },
    outer: {
      stem: "辛",
      branches: ["未", "酉", "亥"],
    },
  },
  7: {
    // 艮宮：艮內丙辰外丙戌
    inner: {
      stem: "丙",
      branches: ["辰", "午", "申"],
    },
    outer: {
      stem: "丙",
      branches: ["戌", "子", "寅"],
    },
  },
  8: {
    // 坤宮：坤內乙未外癸丑
    inner: {
      stem: "乙",
      branches: ["未", "酉", "亥"],
    },
    outer: {
      stem: "癸",
      branches: ["丑", "卯", "巳"],
    },
  },
  2: {
    // 兌宮：兌內丁巳外丁亥
    inner: {
      stem: "丁",
      branches: ["巳", "未", "酉"],
    },
    outer: {
      stem: "丁",
      branches: ["亥", "丑", "卯"],
    },
  },
};

// 獲取卦的納甲信息
function getHexagramNajia(hexagramKey) {
  const hexagram = hexagrams[hexagramKey];
  if (!hexagram) return null;

  return PALACE_NAJIA_RULES[hexagram.palace];
}

// 獲取完整的干支組合
function getStemBranchCombination(stem, branch) {
  return `${stem}${branch}`;
}
const najiaInfo = getHexagramNajia("111111"); // 取得乾卦納甲信息
console.log(najiaInfo);
