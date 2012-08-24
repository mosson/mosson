if( Object.prototype.forEach === undefined ){
	Object.prototype.forEach = function( fn ){
		var key;
		for( key in this.valueOf() ){
			if( fn.call(this, key, this[key], this) ) break;
		}
	}
}