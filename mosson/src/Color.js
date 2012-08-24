if( Color === undefined ){
	var Color = (function(){
		function Color( R, G, B ){
			this.R = R;
			this.G = G;
			this.B = B;

			this.recalculateFromRGB();
		}

		Color.prototype.getColorString = function(){
			return "#"+this.R.toString(16).substr(0, 2) + this.G.toString(16).substr(0, 2) + this.B.toString(16).substr(0, 2);
		}

		Color.prototype.recalculateFromRGB = function(){
			var r, g, b;

			if(this.R >= 255) this.R = 255;
			if(this.G >= 255) this.G = 255;
			if(this.B >= 255) this.B = 255;
			if( this.R < 0 ) this.R = 0;
			if( this.G < 0 ) this.G = 0;
			if( this.B < 0 ) this.B = 0;

			var max = Math.max(this.R, this.G, this.B);
			var min = Math.min(this.R, this.G, this.B);

			if( max != 0 ) this.S = 255 * ( max - min ) / max
			else this.S = 0;

			if( (max - min) != 0 ){
				r = ( max - this.R ) / (max - min);
				g = ( max - this.G ) / (max - min);
				b = ( max - this.B ) / (max - min);
			}else{
				r = 0;
				g = 0;
				b = 0;
			}

			if( max == this.R ){
				this.H = 60 * ( b - g );
			}else if( max == G ){
				this.H = 60 * ( 2 + r - b );
			}else{
				this.H = 60 * ( 4 + g - r );
			}

			if( this.H < 0){
				this.H = ( this.H + 360 ) % 360;
			}

			this.S = this.S / 255;
			this.V = max / 255;
		}

		Color.prototype.recalculateFromHSV = function(){
			var integ;
			var fl;
			var m, n;

			if(this.H >= 360) this.H = 359;
			if(this.H < 0) this.H = 0;
			if(this.S >= 1) this.S = 1;
			if(this.S < 0) this.S = 0;
			if(this.V >= 1) this.V = 1;
			if(this.V < 0) this.V = 0;

			integ = Math.floor( this.H / 60 );
			fl = ( this.H / 60 ) - integ;

			if( !(integ & 1)) fl = 1 - fl;

			m = this.V * ( 1 - this.S);
			n = this.V * ( 1 - this.S * fl);
			switch(integ){
				case 0: this.R = this.V;    this.G = n;         this.B = m; break;
				case 1: this.R = n;         this.G = this.V;    this.B = m; break;
				case 2: this.R = m;         this.G = this.V;    this.B = n; break;
				case 3: this.R = m;         this.G = n;         this.B = this.V; break;
				case 4: this.R = n;         this.G = m;         this.B = this.V; break;
				case 5: this.R = this.V;    this.G = m;         this.B = n; break;
			}

			this.R *= 255;
			this.G *= 255;
			this.B *= 255;
		}

		Color.prototype.getR = function(){ return this.R };
		Color.prototype.getG = function(){ return this.G };
		Color.prototype.getB = function(){ return this.B };
		Color.prototype.getH = function(){ return this.H };
		Color.prototype.getS = function(){ return this.S };
		Color.prototype.getV = function(){ return this.V };

		Color.prototype.setR = function(value){ this.R = Math.max( Math.min( value, 255 ), 0 ); this.recalculateFromRGB(); return this };
		Color.prototype.setG = function(value){ this.G = Math.max( Math.min( value, 255 ), 0 ); this.recalculateFromRGB(); return this };
		Color.prototype.setB = function(value){ this.B = Math.max( Math.min( value, 255 ), 0 ); this.recalculateFromRGB(); return this };
		Color.prototype.setH = function(value){ this.H = value % 360; this.recalculateFromHSV(); return this };
		Color.prototype.setS = function(value){ this.S = Math.max( Math.min( value, 1 ), 0 ); this.recalculateFromHSV(); return this };
		Color.prototype.setV = function(value){ this.V = Math.max( Math.min( value, 1 ), 0 ); this.recalculateFromHSV(); return this };

		return Color;

	})();
}


