import {
  hexagrams,
  trigrams,
  PALACE_NAJIA_RULES,
  FIVE_PHASE_RELATIONS,
} from "./data.js";
import { findSelfResponse } from "./util.js";
function getTrigramByNumber(number) {
  return Object.values(trigrams).find((trigram) => trigram.number === number);
}

function getStemBranchCombinations(...configs) {
  const combinations = [];
  configs.forEach((config) => {
    const { stem, branches } = config;
    branches.forEach((branch) => {
      combinations.push(`${stem}${branch.branch}`);
    });
  });
  return combinations;
}
const findByPosition = (combinedArray, targetPosition) => {
  // Find item where positions matches targetPosition
  return (
    combinedArray.find((item) => item.positions === targetPosition) || null
  );
};
const matchPositions = (arrayA, arrayB) => {
  return arrayA.map((aItem) => {
    // Find matching B item (position is 1-based, so we subtract 1 for 0-based array index)
    const bItem = arrayB[aItem.positions - 1];

    // Combine the properties from both items
    return {
      relation: aItem.relation,
      positions: aItem.positions,
      branch: bItem.branch,
      element: bItem.element,
      number: bItem.number,
    };
  });
};
//卦的五行與六神關係
const hexgramEle = (key) => {
  return FIVE_PHASE_RELATIONS[getTrigramByNumber(hexagrams[key].palace).nature];
};
// 獲取卦的納甲信息
function getHexagramNajia(hexagramKey) {
  // Validate input
  if (typeof hexagramKey !== "string" && typeof hexagramKey !== "number") {
    throw new Error("Hexagram key must be a string or number");
  }

  // Convert to string and ensure 6 digits
  const hexStr = hexagramKey.toString();
  if (hexStr.length !== 6) {
    throw new Error("Hexagram key must be 6 digits long");
  }

  const hexgramEle =
    FIVE_PHASE_RELATIONS[
      getTrigramByNumber(hexagrams[hexagramKey].palace).nature
    ];

  // Split into outer and inner trigrams
  const outerTrigramKey = hexStr.slice(0, 3);
  const innerTrigramKey = hexStr.slice(3);

  // Get trigram information
  const outerTrigram = trigrams[outerTrigramKey];
  const innerTrigram = trigrams[innerTrigramKey];
  //納甲
  const naJiaInner = PALACE_NAJIA_RULES[innerTrigram.number].inner;
  const naJiaOuter = PALACE_NAJIA_RULES[outerTrigram.number].outer;

  //找世應
  const { self, resp } = findSelfResponse(hexagrams[hexagramKey].type);

  //安六親
  let liuqin = [];

  if (naJiaInner && Array.isArray(naJiaInner.branches)) {
    for (let i = 0; i < naJiaInner.branches.length; i++) {
      liuqin.push(hexgramEle[naJiaInner.branches[i].number]);
    }
  }

  if (naJiaOuter && Array.isArray(naJiaOuter.branches)) {
    for (let i = 0; i < naJiaOuter.branches.length; i++) {
      liuqin.push(hexgramEle[naJiaOuter.branches[i].number]);
    }
  }

  //安伏神, 找出本卦所缺的六親, 然後從卦的本宮找出對應的六親及其位置
  // Calculate hidden spirits (伏神)
  const allRelations = new Set(["兄弟", "子孫", "妻財", "官鬼", "父母"]);
  const currentRelations = new Set(liuqin);
  const missingRelations = [...allRelations].filter(
    (x) => !currentRelations.has(x)
  );

  // Get palace hexagram key
  const palaceNumber = hexagrams[hexagramKey].palace;
  const palaceHexagramKey = Object.keys(hexagrams).find(
    (key) => hexagrams[key].palace === palaceNumber && hexagrams[key].type === 1
  );

  // Get palace hexagram's six relations
  const palaceNajia = {
    hexgramEle,
    outerTrigramKey: palaceHexagramKey.slice(0, 3),
    innerTrigramKey: palaceHexagramKey.slice(3),
  };

  const palaceOuterTrigram = trigrams[palaceNajia.outerTrigramKey];
  const palaceInnerTrigram = trigrams[palaceNajia.innerTrigramKey];

  const palaceNaJiaInner = PALACE_NAJIA_RULES[palaceInnerTrigram.number].inner;
  const palaceNaJiaOuter = PALACE_NAJIA_RULES[palaceOuterTrigram.number].outer;

  let palaceliuqin = [];
  if (palaceNaJiaInner && Array.isArray(palaceNaJiaInner.branches)) {
    for (let i = 0; i < palaceNaJiaInner.branches.length; i++) {
      palaceliuqin.push(hexgramEle[palaceNaJiaInner.branches[i].number]);
    }
  }
  if (palaceNaJiaOuter && Array.isArray(palaceNaJiaOuter.branches)) {
    for (let i = 0; i < palaceNaJiaOuter.branches.length; i++) {
      palaceliuqin.push(hexgramEle[palaceNaJiaOuter.branches[i].number]);
    }
  }

  const allh = [...palaceNaJiaInner.branches, ...palaceNaJiaOuter.branches];

  // Map missing relations to their positions in palace hexagram
  const hiddenSpirits = missingRelations.map((relation) => ({
    relation,
    positions:
      palaceliuqin.length > 0
        ? palaceliuqin.reduce((acc, curr, idx) => {
            if (curr === relation) acc.push(idx + 1);
            return acc;
          }, [])[0]
        : null,
  }));
  const hidden = matchPositions(hiddenSpirits, allh);
  let yiuLines = [];
  const all = [...naJiaInner.branches, ...naJiaOuter.branches];

  for (let i = 0; i < 6; i++) {
    const hidden1 = findByPosition(hidden, i + 1);
    let yiuLine = {
      hiddensStemBranch:
        hidden1 != null
          ? {
              heavenlyStem:
                i > 2 ? palaceNaJiaInner.stem : palaceNaJiaInner.stem,
              earthlyBranch: hidden1.branch,
              element: hidden1.element,
              relation: hidden1.relation,
            }
          : null,
      stemBranch: {
        heavenlyStem: i > 2 ? naJiaOuter.stem : naJiaInner.stem,
        earthlyBranch: all[i].branch,
        element: all[i].element,
        relation: liuqin[i],
      },
    };
    yiuLines.push(yiuLine);
  }

  const result = {
    name: hexagrams[hexagramKey].name,
    yiuLines,
  };
  return {
    result,
  };
}

const najiaInfo = getHexagramNajia("110011"); // 取得乾卦納甲信息
console.log(najiaInfo);
