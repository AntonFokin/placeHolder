;(function($){
 	var defaults={
 		duration: 400,
 	};
 	function Dropdown(dropdown, options){
 		this.config= $.extend({}, defaults, options);
 		this.dropdown= dropdown;
 		this.init();
 	};
	Dropdown.prototype.init= function(){
		var self= this;
		this.li= $(this.dropdown).find("li");
		this.drop= $(this.dropdown).children(".drop");
		this.action(self);
	};
	Dropdown.prototype.action= function(self){
		var anchor= false;
		this.dropdown.on('click', function(){
			self.drop.slideToggle(self.config.duration);
			anchor= true;
		});
		$(document).on('click', function(e){
			if(e.target.tagName == "LI" && $(e.target).closest(self.dropdown)){
				var targetInner= $(e.target).text();
				anchor= false;
				self.setInner(targetInner);
			}else{
				if(anchor && e.target.tagName !== "SPAN" && e.target.className !== "dropdown"){
					self.drop.slideToggle(self.config.duration);
					anchor= false;
				};
			};
		});
		
	};
	Dropdown.prototype.setInner= function(inner){
		var placeholder= $(this.dropdown).find(".placeholder");
		$(placeholder).data("text", inner);
		inner= $(placeholder).data().text;
		$(placeholder).text(inner);
	}
	
 	$.fn.myDropdown= function(options){
 		new Dropdown(this, options);
 	};
})(jQuery);