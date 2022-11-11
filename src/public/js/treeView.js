collapse();
function collapse() {
    console.log("aa");
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $(".tree li.parent_li > span").each(function(e){

        var children = $(this).parent('li.parent_li').find(' > ul > li');
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square').removeClass('fa-minus-square');
                // e.stopPropagation();
    })


}
$(function () {
     $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
     $('.tree li.parent_li > span').on('click', function (e) {
         var children = $(this).parent('li.parent_li').find(' > ul > li');
         if (children.is(":visible")) {
             children.hide('fast');
             $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square').removeClass('fa-minus-square');
         } else {
             children.show('fast');
             $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus-square').removeClass('fa-plus-square');
         }
         e.stopPropagation();
     });
 });


 $('.files').on('click',function(){
     let name = $(this).parent().html()
     name = name.split('>');
     name = name[1];
     $('#PDFViewer').attr('src',`/pdf/certificaciones/${name}.pdf`)
 })