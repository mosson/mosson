/**
 * usage
 *
 * class = (function(_super) {
    __extends(class, _super);
    function class() {
      class.__super__.constructor.call(this);
    }
    class.prototype.method = function() {
      class.__super__.method.call(this);
    };
    return class;
  })(superclass);
 *
 */

__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) {
    for (var key in parent) {
	    if (__hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
	    this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
};

/**
 * @description 安全なログ
 */

if( log === undefined ){
	var log = function(){
		for(var i = 0; i < arguments.length; i++){
			try{
				console.log(arguments[i]);
			}catch(e){

			}
		}
	}
}

/**
 * @description スリープします !ロックします
 * @param naptime　時間
 *
 * */

if( sleep === undefined ){
	var sleep = function( naptime ){
		var sleeping = true;
	    var now = new Date();
	    var alarm;
	    var startingMSeconds = now.getTime();
	    while(sleeping){
	        alarm = new Date();
	        alarmMSeconds = alarm.getTime();
	        if(alarmMSeconds - startingMSeconds > naptime){ sleeping = false; }
	    }
	    return "finished"
	}
}