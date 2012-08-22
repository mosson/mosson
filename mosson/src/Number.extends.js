/**
 * 3桁おきにカンマふる
 *
 * @return String
 */

if( Number.prototype.delimiterize === undefined ){
	Number.prototype.delimiterize = function(){
		return this.valueOf().toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
	}
}

/**
 * 0パディング
 *
 * @return String
 */

if( Number.prototype.paddingToString === undefined ){
	Number.prototype.paddingToString = function( len ){
		var str = this.valueOf().toString();
		if( str.length < len ) {
			var i, l, p;
			p = "";
			for( i = 0, l = len - str.length; i < l; i++ ) p += "0";
			str = p + str;
		}
		return str;
	}
}


/**
 * ミリ秒前
 *
 * @return Number
 */

if( Number.prototype.milliseconds === undefined ){
	Number.prototype.milliseconds = function(){
		return this.valueOf();
	}
}
if( Number.prototype.millisecond === undefined ){
	// alias
	Number.prototype.millisecond = Number.prototype.milliseconds;
}


/**
 * 秒前
 *
 * @return Number
 */

if( Number.prototype.seconds === undefined ){
	Number.prototype.seconds = function(){
		return this.valueOf() * 1000;
	}
}
if( Number.prototype.second === undefined ){
	//alias
	Number.prototype.second = Number.prototype.seconds;
}

/**
 * 分前
 *
 * @return Number
 */

if( Number.prototype.minutes === undefined ){
	Number.prototype.minutes = function(){
		return this.valueOf() * 1000 * 60;
	}
}
if( Number.prototype.minute === undefined ){
	// alias
	Number.prototype.minute = Number.prototype.minutes;
}

/**
 * 時前
 *
 * @return Number
 */

if( Number.prototype.hours === undefined ){
	Number.prototype.hours = function(){
		return this.valueOf() * 1000 * 60 * 60;
	}
}
if( Number.prototype.hour === undefined ){
	//alias
	Number.prototype.hour = Number.prototype.hours;
}

/**
 * 日前
 *
 * @return Number
 */

if( Number.prototype.days === undefined ){
	Number.prototype.days = function(){
		return this.valueOf() * 1000 * 60 * 60 * 24;
	}
}
if( Number.prototype.day === undefined ){
	//alias
	Number.prototype.day = Number.prototype.days;
}

/**
 * 週前
 *
 * @return Number
 */

if( Number.prototype.weeks === undefined ){
	Number.prototype.weeks = function(){
		return this.valueOf() * 1000 * 60 * 60 * 24 * 7;
	}
}
if( Number.prototype.week === undefined ){
	//alias
	Number.prototype.week = Number.prototype.weeks;
}

/**
 * 月前
 *
 * @return Number
 */

if( Number.prototype.months === undefined ){
	Number.prototype.months = function(){
		return this.valueOf() * 1000 * 60 * 60 * 24 * 31;
	}
}
if( Number.prototype.month === undefined ){
	//alias
	Number.prototype.month = Number.prototype.months;
}

/**
 * 年前
 *
 * @return Number
 */

if( Number.prototype.years === undefined ){
	Number.prototype.years = function(){
		return this.valueOf() * 1000 * 60 * 60 * 24 * 365;
	}
}
if( Number.prototype.year === undefined ){
	//alias
	Number.prototype.year = Number.prototype.years;
}


/**
 * 日付操作
 *
 * @return Date
 */

if( Number.prototype.ago === undefined ){
	Number.prototype.ago = function(){
		return new Date().setMilliseconds( new Date().getMilliseconds() - this.valueOf() );
	}
}

if( Number.prototype.before === undefined ){
	Number.prototype.before = Number.prototype.ago;
}

if( Number.prototype.after === undefined ){
	Number.prototype.after = function(){
		return new Date().setMilliseconds( new Date().getMilliseconds() + this.valueOf() );
	}
}
