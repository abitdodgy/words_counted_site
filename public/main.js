$.fn.scrollView = function() {
    return this.each(function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 400);
    });
};

$(document).ready(function() {

  var selector = 'tr.hidden';

  $('[data-show]').on('click', function(e) {
        e.preventDefault();

        var element = $(this);
        var targetId = element.data('show');
        var target = $('#' + targetId);

        element.hide().siblings('[data-hide]').show();

        var count = element.siblings('.results__count');
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

    $('[data-toggle]').on('click', function(e) {
        e.preventDefault();

        $(this).children('.shown').toggle().siblings('.hidden').toggle();

        var target = $(this).data('toggle');
        $('.' + target).slideToggle();
    });

    $('button[type="submit"').on('click', function(e) {
        var textarea = $('textarea');

        if (textarea.val().length < 1) {
            e.preventDefault();

            var error = $('.error-text');
            var errorTemplate = '<p class="error-text">Type something...</p>';

            error.length ? error.replaceWith(errorTemplate) : textarea.after(errorTemplate);

            return false;
        }
    });
});
