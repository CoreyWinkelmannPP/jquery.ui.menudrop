(function($) {
	$.widget("ui.menudrop", {
		options : {
			title : "",
			menuItems : [
				{
					id : '',
					text : '',
					link_to : ''
				}
			],
			position: 'top' // top, bottom
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
		},
		_init: function() {
			var self = this,
				o = self.options,
				el = self.element,
				container = self.container = $('<div></div>').addClass("ui-widget ui-menudrop ui-state-default ui-corner-all").hide().appendTo('body'),
				triangle = $('<div></div>').addClass("ui-menudrop-triangle").appendTo(container),
				header = $('<div></div>').addClass('ui-widget-header ui-menudrop-header ui-corner-top'),
				content = $('<div></div>').addClass('ui-menudrop-content ui-widget-content ui-corner-bottom'),
				ul = $('<ul></ul>').addClass('ui-menudrop-list'),
				li = $('<li></li>').addClass('ui-menudrop-list-item ui-state-default')
						.bind('mouseover.menudrop', function() { $(this).addClass('ui-state-hover'); })
						.bind('mousedown.menudrop', function() { $(this).addClass('ui-state-active'); })
						.bind('mouseout.menudrop', function() { $(this).removeClass('ui-state-hover ui-state-active'); });

			o.title = o.title || null;
			o.menuItems = o.menuItems || [];

			if ( o.title ) {
				header.html(o.title);
				container.append(header);
			}


			if ( o.menuItems.length > 0 ) {
				var liList = [];
				var link = jQuery('<a></a>');
				for ( var i = 0; i < o.menuItems.length; i++ ) {
					o.menuItems[i].text = o.menuItems[i].text || null;
					o.menuItems[i].link_to = o.menuItems[i].link_to || null;
					if ( o.menuItems[i].text ) {
						var liClone = li.clone();
						if ( o.menuItems[i].link_to ) {
							liClone.append(link.clone().attr('href', o.menuItems[i].link_to).html(o.menuItems[i].text));
						}
						else {
							liClone.append(link.clone().attr('href', '#').html(o.menuItems[i].text));
						}
						ul.append(liClone);
					}
				}
			}

			content.append(ul).appendTo(container);

			el.bind('click.menudrop', function(e) {
				e.preventDefault();

				if ( $(this).hasClass('ui-menudrop-list-item-active') ) {
				  $(this).removeClass('ui-menudrop-list-item-active');
				}
				else {
				  $(this).addClass('ui-menudrop-list-item-active');
				}
				container
					.position({
						my : 'top',
						at : 'bottom',
						of : el,
						offset : '0 18',
						collision : 'fit'
					})
					.fadeToggle('fast');
				triangle.position({
					my : 'bottom',
					at : 'top',
					of : container
				});
			});

			$('html, body').bind('click.menudrop', function(e) {
				if ( ! $(e.target).closest([el]).length ) {
				  container.stop(true, true).hide();
				  el.removeClass('ui-menudrop-list-item-active');
				}
			});
			
		},
		destroy: function() {
			$('html, body').unbind('click.menudrop');
			this.element.unbind('click.menudrop');
			this.container.remove();
		}
		
	});
})(jQuery);
