var imgs = null;
$(document).ready(function () {
    var comic = sessionStorage.getItem('comic');
    var currentComic = $("#comic").val();
    if(comic == null){
        sessionStorage.setItem('comic', currentComic);
        comic = currentComic;
    }
    if(currentComic != comic){
        sessionStorage.removeItem('next');
        sessionStorage.removeItem('prev');
        sessionStorage.setItem('comic', currentComic);
    }
    imgs = $(".page").toArray();
    $(".container").find('.page').remove();
    var prev = sessionStorage.getItem('prev');
    if (prev != null && parseInt(prev) >= 0) {
        $("#prev").removeClass("disabled");
    } else {
        $("#prev").addClass("disabled");
    }

    var next = sessionStorage.getItem('next');
    if (!next) {
        sessionStorage.setItem('next', 0);
    }
    var page = paginate(imgs, next!= null ? parseInt(next) : 0);
    $(".page-container").append(page);
    $('.zoom').zoom();

    $("#next").off().on('click', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        nextEvent();
    });

    $("#prev").off().on('click', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        prevEvent();
    });    

    $(".page-container").zoom();
});

function nextEvent() {
    $(".page-container").trigger('zoom.destroy');
    var next = sessionStorage.getItem('next');
    if (next) {
        $(".container").find('.page').remove();
        next = parseInt(next) + 1;
        sessionStorage.setItem('next', next);
        var prev = parseInt(next) - 1;
        sessionStorage.setItem('prev', prev);
        var page = paginate(imgs, parseInt(sessionStorage.getItem('next')));
        $(".page-container").append(page);
        if (prev >= 0) {
            $("#prev").removeClass("disabled");
        }

        if(next == (imgs.length - 1)){
            $("#next").addClass("disabled");
        }
    }
    $(".page-container").zoom();
}

function prevEvent() {
    $(".page-container").trigger('zoom.destroy');
    var prev = sessionStorage.getItem('prev');
    if (prev) {
        $(".container").find('.page').remove();
        var next = sessionStorage.getItem('next');
        var prev = parseInt(next) - 1;
        sessionStorage.setItem('next', parseInt(next - 1));
        sessionStorage.setItem('prev', prev)
        var page = paginate(imgs, parseInt(sessionStorage.getItem('prev')));
        $(".page-container").append(page);
        if(prev == 0){
            $("#prev").addClass("disabled");   
        }
    }
    $(".page-container").zoom();
}

function paginate(array, page_number) {
    console.log(page_number);
    return array[page_number];
}