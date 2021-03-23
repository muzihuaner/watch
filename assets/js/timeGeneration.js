// 生成时间 农历 公历 时间
function TimeGeneration() {

}

TimeGeneration.prototype = {
    constructor: TimeGeneration,

    WEEKDAY_NAME: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    NUMBER_STRING: "一二三四五六七八九十",
    MONTH_STRING: "正二三四五六七八九十冬腊",
    MONTH_ADD: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    CALENDAR_DATA: [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95],

    _getBit: function (m, n) {
        return (m >> n) & 1;
    },


    // 获取时间 array
    getTime: function () {
        var time = new Date();
        return [parseInt(time.getHours() / 10),
            parseInt(time.getHours() % 10),
            parseInt(time.getMinutes() / 10),
            parseInt(time.getMinutes() % 10),
            parseInt(time.getSeconds() / 10),
            parseInt(time.getSeconds() % 10)]
    },

    // 获取公历日期 array
    getDate: function () {
        var date = new Date();
        return [
            date.getMonth() + 1,
            date.getDate(),
            this.WEEKDAY_NAME[date.getDay()]
        ]
    },

    // 获取农历日期 string
    getCalendarDate: function () {
        var calendar = new Date();
        var tmp = calendar.getFullYear();

        if (tmp < 1900) {
            tmp += 1900;
        }

        var total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.MONTH_ADD[calendar.getMonth()] + calendar.getDate() - 38;
        if (calendar.getFullYear() % 4 == 0 && calendar.getMonth() > 1) {
            total++;
        }

        var isEnd = false;
        var n, m, k
        for (m = 0; ; m++) {
            k = (this.CALENDAR_DATA[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + this._getBit(this.CALENDAR_DATA[m], n)) {
                    isEnd = true;
                    break;
                }
                total = total - 29 - this._getBit(this.CALENDAR_DATA[m], n);
            }
            if (isEnd) break;
        }

        var month = k - n + 1;
        var day = total;

        if (k == 12) {
            if (month == Math.floor(this.CALENDAR_DATA[m] / 0x10000) + 1) {
                month = 1 - month;
            }
            if (month > Math.floor(this.CALENDAR_DATA[m] / 0x10000) + 1) {
                month--;
            }
        }

        var tmp = "";
        if (month < 1) {
            tmp += "(闰)";
            tmp += this.MONTH_STRING.charAt(-month - 1);
        } else {
            tmp += this.MONTH_STRING.charAt(month - 1);
        }

        tmp += "月";
        tmp += (day < 11) ? "初" : ((day < 20) ? "十" : ((day < 30) ? "廿" : "三十"));
        if (day % 10 != 0 || day == 10) {
            tmp += this.NUMBER_STRING.charAt((day - 1) % 10);
        }
        return tmp;
    }

}


