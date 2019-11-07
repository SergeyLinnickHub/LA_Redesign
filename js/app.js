$(document).ready(function() {

	// side-menu

	if ($('.side-menu').length) {
		const sideMenuScroll = new PerfectScrollbar('.side-menu');
		// side-menu  nested list
		$('.side-menu-list li.with-sub').each(function() {
			var parent = $(this),
				clickLink = parent.find('>span'),
				subMenu = parent.find('>ul');

			clickLink.click(function() {
				if (parent.hasClass('opened')) {
					parent.removeClass('opened');
					subMenu.slideUp();
					subMenu.find('.opened').removeClass('opened');
				} else {
					if (clickLink.parents('.with-sub').length == 1) {
						$('.side-menu-list .opened').removeClass('opened').find('ul').slideUp();
					}
					parent.addClass('opened');
					subMenu.slideDown();
				}
				// chech height and init custom scroll
				sideMenuScroll.update();
			});
		});
	}

	// Left mobile menu

	var scrollWidth = 0;
	if ($('body').hasScrollBar()) {
		scrollWidth = 17;
	}
	// console.log("Scroll width: " + scrollWidth + "px");

	function animatehamburgerIco(){
		$('#show-hide-sidebar-toggle').on('click', function() {
			if ($(window).width() < 991 - scrollWidth){
				$(this).toggleClass('open');
			}
			leftMenu();
		});
	}
	animatehamburgerIco();

	$(window).on('resize', function() {
		if ($(window).width() < 991 - scrollWidth) {
			$('body').removeClass('sidebar-hidden');
			$('#show-hide-sidebar-toggle').removeClass('open');
		} else {
			$('body').removeClass('sidebar-shown-mob');
		}
	});

	function leftMenu(){
		if ($(window).width()> 991 - scrollWidth) {
			if (!$('body').hasClass('sidebar-hidden')) {
				$('body').addClass('sidebar-hidden');
			} else {
				$('body').removeClass('sidebar-hidden');
			}
		} else {
			if (!$('body').hasClass('sidebar-shown-mob')) {
				$('body').addClass('sidebar-shown-mob');
			} else {
				$('body').removeClass('sidebar-shown-mob');
			}
		}
		// overlay click
		$('.mobile-menu-left-overlay').click(function(){
			$('body').removeClass('sidebar-shown-mob');
			$('#show-hide-sidebar-toggle').removeClass('open');
		});
	}

	// Right mobile menu

	$('#show-hide-menu-mob').click(function(){
		if ($('body').hasClass('menu-right-opened')) {
			$('body').removeClass('menu-right-opened');
			$('html').css('overflow','auto');
		} else {
			$('.hamburger').removeClass('is-active');
			$('body').removeClass('menu-left-opened');
			$('body').addClass('menu-right-opened');
			$('html').css('overflow','hidden');
		}
	});

	$('.mobile-menu-right-overlay').click(function(){
		$('body').removeClass('menu-right-opened');
		$('html').css('overflow','auto');
	});

	$(window).on('resize', function() {
		if ($(window).width() > 991 && $('body').hasClass('menu-right-opened')) {
			$('body').removeClass('menu-right-opened');
		}
	});

	// header search

	$('.site-header-search').each(function(){
		var parent = $(this),
			overlay = parent.find('.overlay');

		overlay.click(function(){
			parent.removeClass('closed');
		});

		parent.click(function(){
			event.stopPropagation();
		});

		$(document).click(function() {
			if (!parent.hasClass('closed')) {
				parent.addClass('closed');
			}
		});
	});

	// adaptive tabs control

	$(".tabs-control").click(function(){
		$(".responsive-tabs").toggleClass("open");
	});

	// focuc for double inputs

	$('.double-inputs input').bind('blur', function() {
		$(".double-inputs").toggleClass("active");
	});
	$('.double-inputs input').bind('focus', function() {
		$(".double-inputs").toggleClass("active");
	});

	//change select color
	$('.form-control-cls').each(function() {
		var sel = $(this),
			cls = sel.find('option:selected').data("class");
		$(this).addClass(cls);
	});
	$(".form-control-cls").change(function() {
		var sel = $(this),
			cls = sel.find('option:selected').data("class");
		sel.find('option').each(function() {
			var opCls = $(this).data("class");
			sel.removeClass(opCls);
		});
		sel.addClass(cls);
	});

	// card controls

	cardContrlols();

	// entry side list custom scroll

	if ($('.side-list-holder .list-group-with-controls').length) {
		const entrySideList = new PerfectScrollbar('.list-group-with-controls');
	}

	//side-list-controls-menu dropdown

	//$(function() {
	//	$(".list-controls").click(function() {
	//		$(this).toggleClass("open");
	//	});
	//});

	// dropdown popups

	// open full page pop-up
	$(function() {
		//open dd-page
		$('[data-ddpage-open]').on('click', function(e) {
			var thisDdPage = this.getAttribute("data-ddpage-open");
			$('.dd-page[data-ddpage="' + thisDdPage + '"]').addClass("open");
			$('body').addClass("dd-page-opened");
			e.preventDefault();
		});
		//close dd-page
		$('[data-ddpage-close]').on('click', function(e) {
			var thisDdPage = this.getAttribute("data-ddpage-close");
			$('.dd-page[data-ddpage="' + thisDdPage + '"]').removeClass("open");
			$('body').removeClass("dd-page-opened");
			e.preventDefault();
		});
	});

	// change button text
	$("#saveCloseButton .dropdown-item").click(function() {
		$("#saveCloseButtonText").text($(this).text());
		$("#saveCloseButtonText").val($(this).text());
	});

	// Add active for current page

	function changeLinkState(){
		$('.side-menu-list').find('a').each(function() {
			const link = $(this);
			const activeHref = link.attr("href").slice($(this).attr("href").lastIndexOf('/') + 1);
			const loc = window.location.toString();
			const urlCheck = loc.slice(loc.lastIndexOf('/') + 1);
			if(urlCheck == activeHref){
				// console.log("Curnt page is: " + activeHref);
				link.addClass("active");
				link.parents("li.with-sub").addClass("opened current-page");
			}
		})
	}
	changeLinkState();

	// browsers checking

	$.browser = {};
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());

	if ($.browser.chrome) {
		$('body').addClass('chrome-browser');
	} else if ($.browser.msie) {
		$('body').addClass('msie-browser');
	} else if ($.browser.mozilla) {
		$('body').addClass('mozilla-browser');
	}

	// Plugins inits

	// datatables

	if ($('#dataTable').length) {
		$('#dataTable').DataTable( {
			// responsive: true,
			colReorder: true,
			"dom": '<"row " <"col"l> <"col"f> > <"data-table-holder"rt> <"data-table-pagination-holder" p> <"data-table-info-holder" i>'
		} );
	}

	// jq-ui sortable

	if ($('.col-sort').length) {
		$(function() {
			$(".col-sort").sortable({
				connectWith: ".col-sort",
				handle: ".title-control",
				cancel: ".card-side-control",
				placeholder: "card-placeholder",
				opacity: 0.9,
				revert: 300,
				scroll: false,
				tolerance: "pointer",
				delay: 150,
				distance: 5,
				forcePlaceholderSize: true,
			});

			$(".card")
				.find(".card-header-controls")
				.prepend("<div class='card-side-control'><i class='fa fa-caret-down portlet-toggle'></i></div>");

			$(".portlet-toggle").on("click", function() {
				var icon = $(this);
				icon.toggleClass("fa-caret-down fa-caret-right");
				icon.closest(".card").find(".card-body").toggle();
			});
		});
	};

	if ($('.summernote').length) {
		$('.summernote').summernote({
			placeholder: 'Placeholder ...',
			tabsize: 2,
			height: 100,
		});
	}

	if ($('.select2-multiple').length) {
		$('.select2-multiple').select2({
			placeholder: "Click to select",
			allowClear: true,
			theme: "bootstrap4",
			width: null
		});
	}
});

// definde scroll of element

(function($) {
	$.fn.hasScrollBar = function() {
		return this.get(0).scrollHeight > this.height();
	}
})(jQuery);

// actions for card control buttons

function cardContrlols() {
	$(".remove-card").on("click", function() {
		$(this).closest(".card").remove();
	});
	$(".expand-card").on("click", function() {
		$(this).toggleClass("fa-expand, fa-compress")
			.closest(".card").toggleClass("card-fs");
			$(this).closest(".title-control").remove();
		$("body").toggleClass("card-is-fs");
	});
}


// Copying text to the clipboard - start
// Tooltip
$('.btn-copy').tooltip({
	trigger: 'click',
	placement: 'top'
});

function setTooltip(btn, message) {
	$(btn).tooltip('hide')
	.attr('data-original-title', message)
	.tooltip('show');
}

function hideTooltip(btn) {
	setTimeout(function() {
		$(btn).tooltip('hide');
	}, 1000);
}

// Clipboard
var clipboard = new Clipboard('.btn-copy');

clipboard.on('success', function(e) {
	setTooltip(e.trigger, 'Copied!');
	hideTooltip(e.trigger);
});

clipboard.on('error', function(e) {
	setTooltip(e.trigger, 'Failed!');
	hideTooltip(e.trigger);
});
// Copying text to the clipboard - end

// Popovers
$(function () {
	$('[data-toggle="popover"]').popover({
		trigger: 'focus'
	})
})


// clickoutside function

// (function(jQuery) {
//   jQuery.fn.clickoutside = function(callback) {
// 	var outside = 1, self = $(this);
// 	self.cb = callback;
// 	this.click(function() {
// 	  outside = 0;
// 	});
// 	$(document).click(function() {
// 		outside && self.cb();
// 		outside = 1;
// 	});
// 	return $(this);
//   }
// })(jQuery);