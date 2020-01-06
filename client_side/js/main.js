const view = new View("main");


$("[data-layer]").on("click",function () {
    view.layerUpdate($(this).data("layer"));
});

let $logo = $(".logo");
view.listen("main", ()=> {
    $logo.addClass("logo-start")
},()=>{
    $logo.removeClass("logo-start")
});

$(".info-home").on("click",function () {
    view.layerUpdate("main");
});

$(".info-prev").on("click",function () {
    view.layerBack();
})

$("[data-level]").on("click",function () {
    let level = $(this).data("level");
    view.layerUpdate("manage")
    $(".layer-manage").find(".label").text(level);
})
