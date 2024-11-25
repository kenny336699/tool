interface HiddenSpirit {
  relation: string;
  positions: number;
  branch?: string;
  element?: string;
  number?: number;
}

interface StemBranch {
  heavenlyStem: string;
  earthlyBranch: string;
  element: string;
  relation: string;
}

interface YiuLine {
  hiddensStemBranch: StemBranch | null;
  stemBranch: StemBranch;
}

interface NajiaResult {
  name: string;
  yiuLines: YiuLine[];
}

import {
  hexagrams,
  trigrams,
  PALACE_NAJIA_RULES,
  FIVE_PHASE_RELATIONS,
  Trigram,
  BranchElement,
} from "./data";
import { findSelfResponse } from "./util";

function getTrigramByNumber(number: number): Trigram | undefined {
  return Object.values(trigrams).find((trigram) => trigram.number === number);
}

const findByPosition = (
  combinedArray: HiddenSpirit[],
  targetPosition: number
): HiddenSpirit | null => {
  return (
    combinedArray.find((item) => item.positions === targetPosition) || null
  );
};

const matchPositions = (
  arrayA: HiddenSpirit[],
  arrayB: BranchElement[]
): HiddenSpirit[] => {
  return arrayA.map((aItem) => {
    const bItem = arrayB[aItem.positions - 1];
    return {
      relation: aItem.relation,
      positions: aItem.positions,
      branch: bItem.branch,
      element: bItem.element,
      number: bItem.number,
    };
  });
};

function getHexagramNajia(hexagramKey: string | number): {
  result: NajiaResult;
} {
  // Validate input
  if (typeof hexagramKey !== "string" && typeof hexagramKey !== "number") {
    throw new Error("Hexagram key must be a string or number");
  }

  // Convert to string and ensure 6 digits
  const hexStr = hexagramKey.toString();
  if (hexStr.length !== 6) {
    throw new Error("Hexagram key must be 6 digits long");
  }

  const palace = hexagrams[hexStr].palace;
  const palaceTrigram = getTrigramByNumber(palace);

  if (!palaceTrigram) {
    throw new Error("Invalid palace trigram");
  }

  const hexgramEle = FIVE_PHASE_RELATIONS[palaceTrigram.nature];

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
  const { self, resp } = findSelfResponse(hexagrams[hexStr].type);

  //安六親
  let liuqin: string[] = [];

  if (naJiaInner && Array.isArray(naJiaInner.branches)) {
    for (const branch of naJiaInner.branches) {
      liuqin.push(hexgramEle[branch.number]);
    }
  }

  if (naJiaOuter && Array.isArray(naJiaOuter.branches)) {
    for (const branch of naJiaOuter.branches) {
      liuqin.push(hexgramEle[branch.number]);
    }
  }

  //安伏神
  const allRelations = new Set(["兄弟", "子孫", "妻財", "官鬼", "父母"]);
  const currentRelations = new Set(liuqin);
  const missingRelations = [...allRelations].filter(
    (x) => !currentRelations.has(x)
  );

  // Get palace hexagram key
  const palaceNumber = hexagrams[hexStr].palace;
  const palaceHexagramKey = Object.keys(hexagrams).find(
    (key) => hexagrams[key].palace === palaceNumber && hexagrams[key].type === 1
  );

  if (!palaceHexagramKey) {
    throw new Error("Palace hexagram not found");
  }

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

  let palaceliuqin: string[] = [];
  if (palaceNaJiaInner && Array.isArray(palaceNaJiaInner.branches)) {
    for (const branch of palaceNaJiaInner.branches) {
      palaceliuqin.push(hexgramEle[branch.number]);
    }
  }
  if (palaceNaJiaOuter && Array.isArray(palaceNaJiaOuter.branches)) {
    for (const branch of palaceNaJiaOuter.branches) {
      palaceliuqin.push(hexgramEle[branch.number]);
    }
  }

  const allh = [...palaceNaJiaInner.branches, ...palaceNaJiaOuter.branches];

  const hiddenSpirits: HiddenSpirit[] = missingRelations.map((relation) => ({
    relation,
    positions:
      palaceliuqin.length > 0
        ? palaceliuqin.reduce((acc: number[], curr, idx) => {
            if (curr === relation) acc.push(idx + 1);
            return acc;
          }, [])[0]
        : 0,
  }));

  const hidden = matchPositions(hiddenSpirits, allh);
  let yiuLines: YiuLine[] = [];
  const all = [...naJiaInner.branches, ...naJiaOuter.branches];

  for (let i = 0; i < 6; i++) {
    const hidden1 = findByPosition(hidden, i + 1);
    let yiuLine: YiuLine = {
      hiddensStemBranch: hidden1
        ? {
            heavenlyStem: i > 2 ? palaceNaJiaInner.stem : palaceNaJiaInner.stem,
            earthlyBranch: hidden1.branch!,
            element: hidden1.element!,
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

  const result: NajiaResult = {
    name: hexagrams[hexStr].name,
    yiuLines,
  };

  return {
    result,
  };
}

const najiaInfo = getHexagramNajia("110011"); // 取得乾卦納甲信息
console.log(najiaInfo);
