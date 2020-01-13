var CarrousselTs = /** @class */ (function () {
    function CarrousselTs(duration) {
        var _this = this;
        if (duration === void 0) { duration = 7000; }
        this.duration = duration;
        this.idInterval = undefined;
        this.idImg = 0;
        this.IterImg = 0;
        this.maxiImg = $("#carrousel ul li").length;
        $('#carrousel ul li').append('<div class="btn-tiret"></div>');
        for (var i = 0; i < this.maxiImg; i++) {
            $('#carrousel ul li .btn-tiret').append("<img class=\" btn-tiret-" + i + "\" value=\"" + i + "\" src=\"./icon/tiret1.svg\" alt=\"\" />");
        }
        $("#carrousel ul li .btn-tiret .btn-tiret-0").css("background-color", "black");
        // create btn navigation next pause/play preview
        $("#carrousel ul li").append("<div class=\"btn-link\">\n            <img class=\"btn-link--size btn-link_preview\" src=\"./icon/prev.svg\" alt=\"\" />\n            <img class=\"btn-link--size btn-link_next\" src=\"./icon/next.svg\" alt=\"\" />\n            </div>");
        // Stop la propagation de l'evenement sur le conteneur parent qui lui aussi attends un event click
        $('#carrousel .btn-link').on('click', function () { return event.stopPropagation(); });
        // evt précédent
        $('#carrousel ul li .btn-link .btn-link_preview').on('click', function () {
            event.stopPropagation();
            _this.vidange();
            if (_this.IterImg > 0) {
                _this.IterImg += -2;
            }
            else {
                _this.IterImg = _this.maxiImg - 2;
            }
            _this.show();
        });
        // evt suivant
        $('#carrousel ul li .btn-link .btn-link_next').on('click', function () {
            event.stopPropagation();
            _this.vidange();
            if (_this.IterImg === _this.maxiImg - 1) {
                _this.IterImg = -1;
            }
            _this.show();
        });
        // evt selection d'une image
        $('#carrousel ul li .btn-tiret img').on('click', function (event) {
            var valueAttr = event.target.getAttribute("value");
            event.stopPropagation();
            _this.vidange();
            _this.IterImg = Number(valueAttr) - 1;
            _this.show();
        });
        // evt redemarre l'animation
        $('#carrousel ul li').on('click', function () {
            if (_this.idInterval === undefined) {
                _this.animate();
            }
        });
        // Démarre l'animation
        this.animate();
    }
    // Masque et affiche les images suivantes
    CarrousselTs.prototype.animate = function () {
        var _this = this;
        if (this.idInterval === undefined) {
            this.idInterval = setInterval(function () { return _this.show(); }, this.duration);
        }
    };
    // Stop et supprime l'id de l'animation
    CarrousselTs.prototype.vidange = function () {
        clearInterval(this.idInterval);
        this.idInterval = undefined;
    };
    // Masque et affiche les images suivantes
    CarrousselTs.prototype.show = function () {
        $("#carrousel ul li .btn-tiret .btn-tiret-" + this.idImg).css("background-color", "unset");
        this.IterImg = (this.IterImg + 1) % this.maxiImg;
        $("#carrousel ul li").addClass("hidden");
        $("#carrousel ul li:nth-child(0n+" + (this.IterImg + 1) + ")").removeClass("hidden");
        $("#carrousel ul li .btn-tiret .btn-tiret-" + this.IterImg).css("background-color", "black");
        this.idImg = this.IterImg;
    };
    return CarrousselTs;
}());
var Carroussel = new CarrousselTs(6000);
