class CarrousselTs {
    private numberImg : number;
    private duration :number;
    private idInterval : number;

    constructor(duration = 7000) {
        this.numberImg = 1;
        this.duration = duration;
        this.idInterval =undefined;
        
        $('#carrousel ul li').append('<div class="btn-tiret"></div>');
        for (let i:number=0; i < maxiImg; i++) {
            $('#carrousel ul li .btn-tiret').append(`<img class=" btn-tiret-${i}" value="${i}" src="./icon/tiret1.svg" alt="" />`);
        }
        $(`#carrousel ul li .btn-tiret .btn-tiret-0`).css("background-color","black");

        // create btn navigation next pause/play preview
         $(`#carrousel ul li`).append(`<div class="btn-link">
            <img class="btn-link--size btn-link_preview" src="./icon/prev.svg" alt="" />
            <img class="btn-link--size btn-link_next" src="./icon/next.svg" alt="" />
            </div>`);
        
        // Stop la propagation de l'evenement sur le conteneur parent qui lui aussi attends un event click
        $('#carrousel .btn-link').on('click', () => event.stopPropagation());
        
        // evt précédent
        $('#carrousel ul li .btn-link .btn-link_preview').on('click', () => {
            event.stopPropagation();
            this.vidange();
            if(IterImg > 0){
                IterImg += -2;
            } else {
                IterImg = maxiImg-2;
            }
            this.show();
        });

        // evt suivant
        $('#carrousel ul li .btn-link .btn-link_next').on('click', () => {
            event.stopPropagation();
            this.vidange();
            if(IterImg === maxiImg-1){ 
                IterImg = -1;
            }
            this.show();
        });

        // evt selection d'une image
        $('#carrousel ul li .btn-tiret img').on('click', (event) => {
            const valueAttr:string = event.target.getAttribute("value");
            event.stopPropagation();
            this.vidange();
            IterImg = Number(valueAttr)-1;
            this.show();
        });

        // evt redemarre l'animation
        $('#carrousel ul li').on('click', () => {
            if(this.idInterval === undefined){
                this.animate();
            } 
        });

        // Démarre l'animation
        this.animate();
    }

    // Masque et affiche les images suivantes
    animate(){
        if(this.idInterval === undefined){
            this.idInterval = setInterval(this.show, this.duration);
        } 
    }

    // Stop et supprime l'id de l'animation
    private vidange(){
        clearInterval(this.idInterval);
        this.idInterval =undefined;
    }

    // Masque et affiche les images suivantes
    private show(){
        $(`#carrousel ul li .btn-tiret .btn-tiret-${idImg}`).css("background-color","unset");
        IterImg = (IterImg + 1) % maxiImg;
        $(`#carrousel ul li`).addClass("hidden");
        $(`#carrousel ul li:nth-child(0n+${IterImg+1})`).removeClass("hidden");
        $(`#carrousel ul li .btn-tiret .btn-tiret-${IterImg}`).css("background-color","black");
        idImg=IterImg;
    }
}
let idImg:number = 0;
let IterImg : number = 0;
let maxiImg : number = $(`#carrousel ul li`).length;
const Carroussel = new CarrousselTs(6000);
