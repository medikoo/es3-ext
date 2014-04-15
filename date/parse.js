// Taken from es3-shim project:
// https://github.com/es-shims/es5-shim/blob/master/es5-shim.js

'use strict';

var isoDateExpression, months, dayFromMonth, toUTC;

months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
dayFromMonth = function (year, month) {
	var t = month > 1 ? 1 : 0;
	return (
		months[month] +
			Math.floor((year - 1969 + t) / 4) -
			Math.floor((year - 1901 + t) / 100) +
			Math.floor((year - 1601 + t) / 400) +
			365 * (year - 1970)
	);
};
toUTC = function (t) { return Number(new Date(1970, 0, 1, 0, 0, 0, t)); };

isoDateExpression = new RegExp("^" +
	"(\\d{4}|[+-]\\d{6})" + // four-digit year capture or sign +
	// 6-digit extended year
	"(?:-(\\d{2})" + // optional month capture
	"(?:-(\\d{2})" + // optional day capture
	"(?:" + // capture hours:minutes:seconds.milliseconds
	"T(\\d{2})" + // hours capture
	":(\\d{2})" + // minutes capture
	"(?:" + // optional :seconds.milliseconds
	":(\\d{2})" + // seconds capture
	"(?:(\\.\\d{1,}))?" + // milliseconds capture
	")?" +
	"(" + // capture UTC offset component
	"Z|" + // UTC capture
	"(?:" + // offset specifier +/-hours:minutes
	"([-+])" + // sign capture
	"(\\d{2})" + // hours offset capture
	":(\\d{2})" + // minutes offset capture
	")" +
	")?)?)?)?" +
	"$");

module.exports = function (string) {
	var match = isoDateExpression.exec(String(string)), year, month, day, hour
	  , minute, second, millisecond, isLocalTime, signOffset, hourOffset
	  , minuteOffset, result;
	if (!match) return undefined;

	// parse months, days, hours, minutes, seconds, and milliseconds
	// provide default values if necessary
	// parse the UTC offset component
	year = Number(match[1]);
	month = Number(match[2] || 1) - 1;
	day = Number(match[3] || 1) - 1;
	hour = Number(match[4] || 0);
	minute = Number(match[5] || 0);
	second = Number(match[6] || 0);
	millisecond = Math.floor(Number(match[7] || 0) * 1000);
	// When time zone is missed, local offset should be used
	// (ES 5.1 bug)
	// see https://bugs.ecmascript.org/show_bug.cgi?id=112
	isLocalTime = Boolean(match[4] && !match[8]);
	signOffset = match[9] === "-" ? 1 : -1;
	hourOffset = Number(match[10] || 0);
	minuteOffset = Number(match[11] || 0);
	if (minute > 59) return NaN;
	if (second > 59) return NaN;
	if (millisecond > 999) return NaN;
	if ((month < 0) || (month > 11)) return NaN;
	if (hourOffset > 23) return NaN;
	if (minuteOffset > 59) return NaN;
	if (day < 0) return NaN;
	if (day >= (dayFromMonth(year, month + 1) - dayFromMonth(year, month))) {
		return NaN;
	}
	if ((minute > 0) || (second > 0) || (millisecond > 0)) {
		if (hour > 23) return NaN;
	} else {
		if (hour > 24) return NaN;
	}
	result = (
		(dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset
	) * 60;
	result = (
		(result + minute + minuteOffset * signOffset) * 60 +
			second
	) * 1000 + millisecond;
	if (isLocalTime) result = toUTC(result);
	if (result < -8.64e15) return NaN;
	if (result > 8.64e15) return NaN;
	return result;
};
