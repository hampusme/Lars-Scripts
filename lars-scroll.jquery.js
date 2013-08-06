// scrollTo
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

(function( $ ) {
  $.fn.larsScroller = function(settings) {
		
		// Default  	
  		if(!settings)
  			settings = {}
  		if(! settings.children)
  			settings.children = $(".item");
  		if(! settings.duration)
  			settings.duration = 300;

  		
 		var $self, $container, $next, $prev;
 		$self = $(this);
		$container = $self.find(".mask");
		$next =  $self.find(".next");
		$prev = $self.find(".prev");
		$reset = $self.find(".reset")
		
		var hammpus = hej;
		
 		var methods = {
 			get_next : function(){

 				var $active_selector =  $(settings.children.selector+".active", $self) ;
				
				//console.log($active_selector.next(":visible"));
				
				if($active_selector.nextAll(':visible').size()){
					$active_selector.removeClass("active").nextAll(':visible').first().addClass("active");

				} else {
					$active_selector.removeClass("active");
					$(settings.children.selector+":visible").first().addClass("active");

				}
				
				return $(settings.children.selector+".active", $self);
 			},
 			
 			get_prev : function(){
 				var $active_selector =  $(settings.children.selector+".active", $self) ;
				
				if($active_selector.prevAll(':visible').size()){
					$active_selector.removeClass("active").prevAll(':visible').first().addClass("active");
				} else {
					$active_selector.removeClass("active");
					$(settings.children.selector+":visible").first().addClass("active");
				}
				
				return $(settings.children.selector+".active", $self);
 			},
 			
 			next : function(){
 				$container.scrollTo( methods.get_next(), {duration : settings.duration} );
 			},
 			
 			prev : function(){
 				$container.scrollTo( methods.get_prev(), {duration : settings.duration} );
 			},
 			reset : function(){
 				$container.scrollTo('.first', {duration : settings.duration} );
 			}
 		}
 		
 		$next.click(function(){
 			methods.next();
 		});

 		$prev.click(function(){
 			methods.prev();
 		});
 		$reset.click(function(){
 			methods.reset();
 		});
 		return this;
  };
  
  
})( jQuery );