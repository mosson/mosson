/**
 * null, undefinedを削除してつめる: 非破壊
 */

if( Array.prototype.compact === undefined ){
	Array.prototype.compact = function(){
		var i, len, arr;
		arr = [];
		for( i = 0, len = this.length ; i < len; i++ ){
			if( this[i] !== undefined && this[i] !== null ) arr.push( this[i] );
		}
		return arr;
	}
}

/**
 * 逆順に並び替え
 */

if( Array.prototype.reverse === undefined ){
	Array.prototype.reverse = function(){
		this.sort( function(a, b){
			return 1;
		});
		return this;
	}
}

/**
 * 配列のイテレータ
 */

if( Array.prototype.each === undefined ){
	Array.prototype.each = function( callback ){
		if( callback === undefined || callback === null ) return;
		if( typeof( callback ) !== "function" ) throw new Error("Array.prototype.each needs callback is function");

		var i, len;
		for( i = 0, len = this.length; i < len; i++ ){
			if( callback.call(this[i], i, this) ) break;
		}
		return this;
	}
}

/**
 * 重複する要素を削除
 */

if( Array.prototype.uniq === undefined ){
	Array.prototype.uniq = function(){
		var o = {},r = [];
        for (var i = 0;i < this.length;i++) if (this[i] in o? false: o[this[i]] = true) r.push(this[i]);
        return r;
	}
}

/**
 * ランダムに並び替え
 */

if( Array.prototype.shuffle === undefined ){
	Array.prototype.shuffle = function(){
		this.sort(function(a, b){
		        return Math.random() > 0.5 ? 1 : -1;
		});

		return this;
	}
}

/**
 * 一致する要素の位置を返す なければ-1
 */

if( Array.prototype.indexOf === undefined ){
	Array.prototype.indexOf = function( key ){
		var i, len;
		for( i = 0, len = this.length; i < len; i++ ){
			if( this[i] == key ){
				return i;
			}
		}
		return -1;
	}
}

/**
 * 一致する要素の位置を後ろから数えて返す, なければ-1
 */

if( Array.prototype.lastIndexOf === undefined ){
	Array.prototype.lastIndexOf = function( key ){
		var i;
		for( i = len - 1; i >= 0; i-- ){
			if( this[i] == key ){
				return i;
			}
		}
		return -1;
	}
}