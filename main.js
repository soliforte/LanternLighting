var lantern = jQuery('.lantern');

lantern.addClass('sway2d')

lantern.bind("webkitAnimationEnd mozAnimationEnd animationend", function() {
	jQuery(this).removeClass("sway2d");
	});

	jQuery(window).scroll(function() {
		lantern.addClass('sway2d');
});
