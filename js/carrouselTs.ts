class CarrousselTs {
    private duration :number;
    private idInterval : number;
    private idImg:number;
    private IterImg : number;
    private maxiImg : number;

    constructor(duration = 7000) {
        this.duration = duration;
        this.idInterval = undefined;
        this.idImg = 0;
        this.IterImg = 0;
        this.maxiImg = $(`#carrousel ul li`).length;
        
        $('#carrousel ul li').append('<div class="btn-tiret"></div>');
        for (let i:number=0; i < this.maxiImg; i++) {
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
            if(this.IterImg > 0){
                this.IterImg += -2;
            } else {
                this.IterImg = this.maxiImg-2;
            }
            this.show();
        });

        // evt suivant
        $('#carrousel ul li .btn-link .btn-link_next').on('click', () => {
            event.stopPropagation();
            this.vidange();
            if(this.IterImg === this.maxiImg-1){ 
                this.IterImg = -1;
            }
            this.show();
        });

        // evt selection d'une image
        $('#carrousel ul li .btn-tiret img').on('click', (event) => {
            const valueAttr:string = event.target.getAttribute("value");
            event.stopPropagation();
            this.vidange();
            this.IterImg = Number(valueAttr)-1;
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
            this.idInterval = setInterval(() => this.show(), this.duration);
        } 
    }

    // Stop et supprime l'id de l'animation
    private vidange(){
        clearInterval(this.idInterval);
        this.idInterval =undefined;
    }

    // Masque et affiche les images suivantes
    private show(){
        $(`#carrousel ul li .btn-tiret .btn-tiret-${this.idImg}`).css("background-color","unset");
        this.IterImg = (this.IterImg + 1) % this.maxiImg;
        $(`#carrousel ul li`).addClass("hidden");
        $(`#carrousel ul li:nth-child(0n+${this.IterImg+1})`).removeClass("hidden");
        $(`#carrousel ul li .btn-tiret .btn-tiret-${this.IterImg}`).css("background-color","black");
        this.idImg = this.IterImg;
    }
}

const Carroussel = new CarrousselTs(6000);
