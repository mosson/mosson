/**
 * ランダムな文字列化(0-zまで)
 */

if( String.prototype.randomize === undefined ){
	String.prototype.randomize = function( len ){
		var str = "";

		while( str.length < len )
			str += (Math.random()*36|0).toString(36);

		return str;
	}
}

/**
 * htmlエンティティ化: 非破壊
 */

if( String.prototype.htmlspecialchars === undefined ){
	String.prototype.htmlspecialchars = function(){
		return this.replace(/[&"'<>]/g, function($0) {
		    if ($0 == "&")  return '&amp;';
		    if ($0 == "\"") return '&quot;';
		    if ($0 == "'")  return '&#039;';
		    if ($0 == "<")  return '&lt;';
		    if ($0 == ">")  return '&gt;';
		});
	}
}

/**
 * htmlエンティティ解除: 非破壊
 */

if( String.prototype.htmlspecialchars_decode === undefined ){
	String.prototype.htmlspecialchars_decode = function(){
		return this.replace(/&(gt|lt|#039|quot|amp);/ig, function($0, $1) {
			if (/^gt$/i.test($1))   return ">";
			if (/^lt$/i.test($1))   return "<";
			if (/^#039$/.test($1))  return "'";
			if (/^quot$/i.test($1)) return "\"";
			if (/^amp$/i.test($1))  return "&";
		});
	}
}

/**
 * @description 有害なHTMLを除外する Aタグのhrefにjavascriptが含まれている場合は強制的に除外
 *
 * 非破壊
 *
 */

if( String.prototype.sanitize === undefined ){
	String.prototype.sanitize = function( validElements ){
		if( validElements === undefined ) validElements = [];
		str = this.valueOf().htmlspecialchars();

		var i, len;
		for( i = 0, len = validElements.length; i < len; i++ ){
			var tag = validElements[i];

			var pattern;
			pattern = new RegExp("&lt;"+tag+".*?&gt;.+?&lt;/"+tag+"&gt;", "i");
			while( pattern.test(str) ){
				var match = str.match(pattern)[0];
				if( match.indexOf("javascript") >= 0 ) break;

				var left = RegExp.leftContext;
				var right = RegExp.rightContext;
				str = left + match.htmlspecialchars_decode() + right;
			}

			pattern = new RegExp("(&lt;"+tag+"(.*?)/&gt;)", "im");
			while( pattern.test(str) ){
				var match = str.match(pattern)[0];
				if( match.indexOf("javascript") >= 0 ) break;

				var left = RegExp.leftContext;
				var right = RegExp.rightContext;
				str = left + match.htmlspecialchars_decode() + right;
			}
		}

		return str;
	}
}

/**
 * 一文字ごとのループ
 *
 * callback( item, index )
 *
 */

if( String.prototype.each === undefined ){
	String.prototype.each = function( callback ){
		if( typeof(callback) != "function" ) throw new Error("String.prototype.each function needs callback is function");
		var i, len;
		for( i = 0, len = this.length; i < len; i++ ){
			var status = callback.call(this[i], i, this);
			if( status < 0 ) i -= 1
			else if( status !== undefined && status !== null ) break
		}
		return this;
	}
}

/**
 * 一行ごとのループ
 *
 * callback( item, index )
 *
 */

if( String.prototype.eachline == undefined ){
	String.prototype.eachline = function( callback ){
		if( typeof(callback) !== "function" ) throw new Error("String.prototype.eachline function needs callback is function");

		var arr = this.match(/.+/img);
		var i, len;
		for( i = 0, len = arr.length; i < len; i++ ){
			var status = callback.call( arr[i], i, len, arr );
			if( status < 0 ) i -= 1
			else if( status !== undefined && status !== null ) break
		}

		return this;
	}
}

/**
 * 指定桁で省略する:非破壊
 */

if( String.prototype.truncate === undefined ){
	String.prototype.truncate = function( len, offset ){
		if( offset === undefined ) offset = 0;
		var buf = ( offset == 0 ? "" : "..." ) + this.substr( offset );

		if( buf.length > len ){
			return buf.substr( 0, len - 3 ) + "...";
		}
		else{
			return buf;
		}
	}
}

/**
 * 改行を空白に変換: 非破壊
 */

if( String.prototype.singleline === undefined ){
	String.prototype.singleline = function(){
		return this.replace(/(\r\n|\r|\n)/igm, " ");
	}
}

/**
 * 改行をとる:非破壊
 */

if( String.prototype.chomp === undefined ){
	String.prototype.chomp = function(){
		return this.replace(/(\r\n|\r|\n)/igm, "");
	}
}


/**
 * Email書式かどうか
 *
 * @return BOOL
 */


if( String.prototype.is_email === undefined ){
	String.prototype.is_email = function(){
		if( /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/.test(this) ){
			return true;
		}else{
			return false;
		}
	}
}

/**
 * HTTP|HTTPS書式かどうか
 *
 * @return BOOL
 */

if( String.prototype.is_http === undefined ){
	String.prototype.is_http = function(){
		if( /^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/.test(this) ){
			return true;
		}else{
			return false;
		}
	}
}

/**
 * force LF
 */

if( String.prototype.flatReturn === undefined ){
	String.prototype.flatReturn = function(){
		var str = this.valueOf();
		return str.split("\r\n").join("\n").split("\r").join("\n");
	}
}

/**
 * require Array.extends.js
 * @return Array
 */

if( String.prototype.parseCSV === undefined ){
	String.prototype.parseCSV = function(){
		var src = this.valueOf().flatReturn();
		var csv = src.split("\n").each(function(i, container){
			container[i] = this.split(",");
			container[i].each(function(j, cols){
				if( /\"/.test(this.valueOf()) ){
					if( cols[j+1] && /\"/.test(cols[j+1].valueOf()) ){
						cols[j] = (cols[j].valueOf() + "," + cols[j+1].valueOf()).replace(/\"/g, "");
						cols.splice(j+1, 1);
						return -1;
					}
				}
			});
		});
		return csv;
	}
}