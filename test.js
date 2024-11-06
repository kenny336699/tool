const { Solar } = require("lunar-javascript");

// 创建公历日期对象
const solar = Solar.fromYmd(2024, 11, 5);

// 获取对应的农历日期对象
const lunar = solar.getLunar();

// 获取天干地支年、月、日
const gzYear = lunar.getYearInGanZhi(); // 年的天干地支
const gzMonth = lunar.getMonthInGanZhi(); // 月的天干地支
const gzDay = lunar.getDayInGanZhi(); // 日的天干地支

console.log(`公历日期：${solar.toYmd()}`);
console.log(`对应的农历日期：${lunar.toString()}`);
console.log(`天干地支年：${gzYear}`);
console.log(`天干地支月：${gzMonth}`);
console.log(`天干地支日：${gzDay}`);
