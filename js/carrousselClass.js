
class CarrousselRc {
    constructor(duration = 7000) {
        this.numberImg = 1;
        this.duration = duration;
        this.idInterval = undefined ;
        
        // create button
        $(`#carrousel ul li`).append('<img class="btn-link btn-link_1" src="./icon/preview.png" alt="" /><img class="btn-link btn-link_2" src="./icon/next.png" alt="" />');
        
        // Stop la propagation de l'evenement sur le conteneur parent qui lui aussi attends un event click
        $('#carrousel .btn-link').on('click', () => event.stopPropagation());
        
        // evt précédent
        $('#carrousel .btn-link_1').on('click', () => {
            event.stopPropagation();
            this.vidange();
            if($val>1){
                $val += -2;
            } else {
                $val = maxImg-2;
            }
            this.show();
            console.log('rt : ' + $val);
        });

        // evt suivant
        $('#carrousel .btn-link_2').on('click', () => {
            event.stopPropagation();
            this.vidange();
            if($val<maxImg-1){
                $val *= 1;
            } else {
                $val = 0;
            }
            this.show();
            console.log('suiv : ' + $val);
        });

        // evt redemarre l'animation
        $('#carrousel ul li').on('click', () => {
            this.animate();
        });

        // Démarre l'animation
        console.log('marche' + $val);
        this.animate();
    }

    // Masque et affiche les images suivantes
    animate(){
        if(this.idInterval === undefined){
            this.idInterval = setInterval(this.show, this.duration);
        } 
    }

    // Stop et supprime l'id de l'animation
    vidange(){
        clearInterval(this.idInterval);
        this.idInterval =undefined;
    }

    // Masque et affiche les images suivantes
    show(){
        $val = ($val + 1) % maxImg;
        $(`#carrousel ul li`).addClass("hidden");
        $(`#carrousel ul li:nth-child(0n+${$val})`).removeClass("hidden");
        console.log('show : ' + $val);
    }
}

let $val = 1;
let maxImg = $(`#carrousel ul li`).length;
const myCarroussel = new CarrousselRc(7000);

