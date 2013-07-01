var SonicPaging = function( opt ){
	this._loadOpt(opt);
	var target = document.getElementById( this._opt.appendTo );
	if( !target ){
		this.debug("element not found:" + this._opt.appendTo  );
		return;
	}
	//calculate begin and end page
	var begin = this._opt.currentPage - this._opt.pagesBefore;
	if( begin < 1 ){
		begin = 1;
	}

	var end = this._opt.currentPage + this._opt.pagesAfter;
	if( end - begin > this._opt.maxDispPages ){
		end = begin + this._opt.maxDispPages;
	}
	if( end <= this._opt.currentPage ){
		end = this._opt.currentPage + 1;
	}
	if( end > this._opt.totalPages ){
		end = this._opt.totalPages;
	}

	var buf = [];
	buf.push( "<ul class='" + this._opt.ulClass + "'>" );
	
	//display previous and first 
	if( this._opt.currentPage > this._opt.pagesBefore ){
		
		buf.push("<li class='" + this._opt.prevClass + "'>" + this._navLink( this._opt.prevText ) + "</li>" );
		if( this._opt.isShowFirst && begin > 2 ){
			buf.push("<li class='" + this._opt.liClass + "'>" + this._navLink( 1 ) + "</li>" );
			buf.push("<li class='skip " + this._opt.liClass + "'>" + this._navLink("...") + "</li>" );
		}
	} // if

	// display pages
	for( ; begin <= end; begin++ ){
		buf.push("<li class='");
		if( begin == this._opt.currentPage ){
			buf.push( this._opt.liClass + " " + this._opt.activeClass );
		}else{
			buf.push( this._opt.liClass );
		} 

		buf.push( "'>" + this._navLink( begin ) + "</li>");
	} // for

	// next and last page
	if( this._opt.isShowLast &&  end < this._opt.totalPages ){
		buf.push("<li class='skip " + this._opt.liClass + "'>" + this._navLink( "..." ) + "</li>");
		buf.push("<li class='" + this._opt.liClass + "'>" + this._navLink( this._opt.totalPages ) + "</li>");
	}

	if( this._opt.currentPage < this._opt.totalPages ){
		buf.push("<li class='" + this._opt.prevClass + "'>" + this._navLink( this._opt.nextText ) + "</li>" );
	}

	buf.push("</ul>");
	target.innerHTML = buf.join(""); 
}

SonicPaging.prototype._defOpt = {
	appendTo: "",
	currentPage: 	1,
	totalPages: 	20,

	maxDispPages: 	10,
	pagesBefore: 	5,
	pagesAfter: 	4,

	ulClass: 	"SonicPaging",
	liClass: 	"",
	linkClass: 	"", 
	activeClass: "active",
	prevClass: "perv",
	nextClass: "next",

	prevText: "<",
	nextText: ">",

	pageHref: "javascript:void(0)",
	dataAttName: "page",
	dataAttValue: "{#}", 

	isShowFirst: 	true,
	isShowLast: 	true,

	end:0
}

SonicPaging.prototype._loadOpt = function( opt ){
	this._opt = {};
	for( key in this._defOpt ){
		this._opt[key] = this._defOpt[key];
	};
	
	var src, target;
	for( key in opt ){
		//this._opt[key] = opt[key];
		src = this._opt[key];
		target = opt[key];
		
		if( src === target ){
			continue;
		}
		this._opt[key] = target;
	}; // for
}

SonicPaging.prototype._navLink = function( page ){
	return "<a class='" + this._opt.linkClass + "' " 
	+ this._opt.dataAttName + "='" + this._opt.dataAttValue.replace( "{#}", page ) + "' "
	+ "href='" + this._opt.pageHref.replace( "{#}", page ) + "' " 
	+ " >" 
	+ page + "</a>";
}


SonicPaging.prototype.debug = function( str ){
	console.log( str );
}