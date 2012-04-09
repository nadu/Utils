//autocomplete plugin
(function($){
	$.fn.extend({
		//plugin name - autocomplete
		autocomplete:function(options){
			var defaults = {
				values:[]
			};
			var options = $.extend(defaults,options);
			return this.each(function(){
				$(this).bind('keyup', function(e){
					console.log(this);
					var typed = $(this).val();
					var autoValues;
					var values = options.values;
					console.log(values);
					var regex = new RegExp(typed, "gi");
					var autocompleteEl = $('[autocomplete-for='+$(this).attr('id')+']');
					autocompleteEl.html('');
					autocompleteEl.hide();
					if(typed === '') {
						return; 
					}
					autoValues = filter(values, function(i){
						if(i.match(regex)){
							return true;
						}
						return false;
					});
					if(!autoValues.length) {
						autoValues.push('No students found');
					}
					// append to autocomplete box
					var frag = document.createDocumentFragment();
					forEach(autoValues, function(i){
						var val = document.createElement('div');
						$(val).html(i);
						$(val).addClass('autocomplete-element');
						frag.appendChild(val);
					});
					autocompleteEl.append(frag);
					autocompleteEl.show();
				});

				$('[autocomplete-for]').on('click','.autocomplete-element',function(e){
					var inputEl = $(this).closest('.autocomplete').attr('autocomplete-for');
					$('#'+inputEl).val($(this).html());
					$(this).closest('[autocomplete-for]').hide();
				});

			})
		}
	})
}(jQuery));

