let $val = 1;
let idInterval;

// Récupère le nombre d'image
let maxImg = $(`#carrousel ul li`).length;

// create buttons
$(`#carrousel ul li`).append('<img class="btn-link btn-link_1" src="./icon/preview.png" alt="" /><img class="btn-link btn-link_2" src="./icon/next.png" alt="" />');
for (let i in maxImg) {
    $(`#carrousel ul li`).append(`<img class="btn-link btn-tiret${i}" src="./icon/tiret1.png" alt="" />`);
}


// evt button précédent
$('#carrousel .btn-link_1').on('click', () => {
    event.stopPropagation();
    vidange();
    if ($val > 1) {
        $val += -2;
    } else {
        $val = maxImg - 2;
    }
    show();
});

// evt button suivant
$('#carrousel .btn-link_2').on('click', () => {
    event.stopPropagation();
    vidange();
    if ($val < maxImg - 1) {
        $val *= 1;
    } else {
        $val = 0;
    }
    show();
});

// evt redemarre l'animation
$('#carrousel ul li').on('click', () => {
    if(idInterval === undefined){
        idInterval = setInterval(show, 5000);
    } 
});

// Stop et supprime l'id de l'animation
function vidange(){
    clearInterval(idInterval);
    idInterval =undefined;
}

// Masque et affiche les images suivantes
function show() {
    $val = ($val + 1) % maxImg;
    $(`#carrousel ul li`).addClass("hidden");
    $(`#carrousel ul li:nth-child(0n+${$val})`).removeClass("hidden");
}

// Démarre l'animation
idInterval = setInterval(show, 5000);
