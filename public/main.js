var updateVisibleCount = function(element) {
	target = element.siblings('.results__count');
	target.find('em').text(target.data('result-count'));
}

$.fn.scrollView = function() {
	return this.each(function () {
		$('html, body').animate({
			scrollTop: $(this).offset().top
		}, 400);
	});
};

$(document).ready(function() {

  var selector = 'tr.hidden';

  $('[data-show]').on('click', function(e) {
		e.preventDefault();

		var targetId = $(this).data('show');
		var target = $('#' + targetId);

		$(this).hide().siblings('[data-hide]').show();

		var count = $(this).siblings('.results__count');
		count.text(count.data('expanded-text'));

		target.find(selector).show();
	});

	$('[data-hide]').on('click', function(e, freeze) {
		e.preventDefault();

		var element = $(this);

		var targetId = element.data('hide');
		var target = $('#' + targetId);

		element.hide().siblings('[data-show]').show();

		var count = element.siblings('.results__count');
		count.text(count.data('collapsed-text'));

		target.find(selector).hide();

		if (!freeze) {
			element.parents('.results__data').scrollView();
		}
	});

	$('[data-expand]').on('click', function(e) {
		e.preventDefault();

		$(this).hide().siblings('[data-collapse]').show();
		$('[data-show]').trigger('click');

		$('.results').scrollView();
	});

	$('[data-collapse]').on('click', function(e) {
		e.preventDefault();

		$(this).hide().siblings('[data-expand]').show();
		$('[data-hide]').trigger('click', true);

		$('.results').scrollView();
	});
});
