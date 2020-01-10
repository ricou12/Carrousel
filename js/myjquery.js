let $val = 1;

// setTimeout(function() {
//     $(`ul li`).addClass("hidden");
//     $(`ul li:nth-child(0n+${$val+1})`).removeClass("hidden");
//     $val = ($val + 1) % 9;
//     console.log($val);
// },1000);

function Carrousel(){
    $(`ul li`).addClass("hidden");
    $(`ul li:nth-child(0n+${$val+1})`).removeClass("hidden");
    $val = ($val + 1) % 9;
    console.log($val);
}

setInterval(Carrousel,3000);