'use strict';

module.exports = function (t, a) {
	var tzOffset;

	a(t('2011-01-01'), 1293840000000, "Just date");
	a(t('2011-01-01T00:00:00.000Z'), 1293840000000,
		"Date and time with milliseconds");

	a(t('0001-01-01T00:00:00Z'), -62135596800000, "Before Unix");
	a(t('+275760-09-13T00:00:00.000Z'), 8.64e15, "+");
	a(t('+033658-09-27T01:46:40.000Z'), 1e15, "+ leading zero");
	a(t('-000001-01-01T00:00:00Z'), -62198755200000, "- leading zero");
	a(t('+002009-12-15T00:00:00Z'), 1260835200000, "+ leading zero #2");

	a(t("2012-11-31T23:59:59.000Z"), NaN, "Invalid day");
	a(t("2012-12-31T23:59:59.000Z"), 1356998399000, "End of year");
	a(t("2012-12-31T23:59:60.000Z"), NaN, "Invalid seconds");
	a(t("2012-04-04T05:02:02.170Z"), 1333515722170, "Miliconds");
	a(t("2012-04-04T05:02:02.170999Z"), 1333515722170, "Microseconds");
	a(t("2012-04-04T05:02:02.17Z"), 1333515722170, "Hundred parts of seconds");
	a(t("2012-04-04T05:02:02.1Z"), 1333515722100, "Tenth parts of seconds");
	a(t("2012-04-04T24:00:00.000Z"), 1333584000000, "24 hour");
	a(t("2012-04-04T24:00:00.500Z"), NaN, "24 hour plus");
	a(t("2012-12-31T10:08:60.000Z"), NaN, "Invalid seconds #2");
	a(t("2012-13-01T12:00:00.000Z"), NaN, "Invalid month");
	a(t("2012-12-32T12:00:00.000Z"), NaN, "Invalid day");
	a(t("2012-12-31T25:00:00.000Z"), NaN, "Invalid hour");
	a(t("2012-12-31T24:01:00.000Z"), NaN, "24 hour plus minutes");
	a(t("2012-12-31T12:60:00.000Z"), NaN, "Invalid minutes");
	a(t("2012-12-31T12:00:60.000Z"), NaN, "Invalid seconds #3");
	a(t("2012-00-31T23:59:59.000Z"), NaN, "Invalid month #2");
	a(t("2012-12-00T23:59:59.000Z"), NaN, "Invalid day #2");
	a(t("2012-02-29T12:00:00.000Z"), 1330516800000, "Leap day");
	a(t("2011-02-29T12:00:00.000Z"), NaN, "Invalid leap day");
	a(t("2011-03-01T12:00:00.000Z"), 1298980800000, "Day after 28th of Feb");

	// extended years:
	a(t("0000-01-01T00:00:00.000Z"), -621672192e5, "0 AD");
	a(t("+275760-09-13T00:00:00.000Z"), 8.64e15, "+ Future");
	a(t("-271821-04-20T00:00:00.000Z"), -8.64e15, "BC");
	a(t("+275760-09-13T00:00:00.001Z"), NaN, "Beyond range");
	a(t("-271821-04-19T23:59:59.999Z"), NaN, "Before range");

	// https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
	a(t("2034-03-01T00:00:00.000Z") -
		t("2034-02-27T23:59:59.999Z"), 86400001, "Leap day bug");

	// Time Zone Offset
	a.h1("Time Zone Offset");
	a(t("2012-01-29T12:00:00.000+01:00"), 132783480e4, 1);
	a(t("2012-01-29T12:00:00.000-00:00"), 132783840e4, 2);
	a(t("2012-01-29T12:00:00.000+00:00"), 132783840e4, 3);
	a(t("2012-01-29T12:00:00.000+23:59"), 132775206e4, 4);
	a(t("2012-01-29T12:00:00.000-23:59"), 132792474e4, 5);
	a(t("2012-01-29T12:00:00.000+24:00"), NaN, 6);
	a(t("2012-01-29T12:00:00.000+24:01"), NaN, 7);
	a(t("2012-01-29T12:00:00.000+24:59"), NaN, 8);
	a(t("2012-01-29T12:00:00.000+25:00"), NaN, 9);
	a(t("2012-01-29T12:00:00.000+00:60"), NaN, 10);
	a(t("-271821-04-20T00:00:00.000+00:01"), NaN, 11);
	a(t("-271821-04-20T00:01:00.000+00:01"), -8.64e15, 12);

	// When time zone is missed, local offset should be used (ES 5.1 bug)
	// see https://bugs.ecmascript.org/show_bug.cgi?id=112
	tzOffset = Number(new Date(1970, 0));
	// same as (new Date().getTimezoneOffset() * 60000)
	a(t('1970-01-01T00:00:00'), tzOffset, "Missing offset");
};
