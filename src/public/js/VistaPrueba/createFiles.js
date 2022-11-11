$(document).ready(function() {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    $("i").on('click',function(){
        $('i').removeClass('highligth');
        $(this).addClass('highligth');
    })
    $("#addFile").on('click',function(){
        const position = $(".highligth img").attr("class")
        let nombre = $(".highligth").parent().html();
        nombre = nombre.split('</i>')
        nombre = nombre[1]
        $('#ubicaiconFile').val(nombre)
        $('.btnAddFile').attr('id',position)
    })
    $(".btnAddFile").on('click',function(){
        const position = $('.btnAddFile').attr('id')

        var data = new FormData($('#fileAdd')[0]);

        $.ajax({
            url:'/VistaPrueba/addFile',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: function(res){
                $.post("/VistaPrueba/add/file",{position:position,fileName:res}, function( data ) {
                    // let text = '<ul>'
                    // for (const key in data) {
                    //         text += '<li>'
      
        
                    //         text += `<span><i class="fa fa-minus-square" style="margin-right: 5px;"><img
                    //         src="/assets/folder.png" class="${data[key].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${data[key].position}-${data[key].dirName}</span>
                    //         <ul>`
                    //         for (const key1 in data[key].file) {
                    //             const file1 = data[key].file

                    //             text+=`<li>
                    //                 <span> <img src="/assets/docs.png" class="files" width="20" height="20"
                    //                 alt="logo">${file1[key1].fileName}</span>
                    //             </li>`
                    //         }
                    //         for (const key2 in data[key].dir) {
                    //             const dir1 =data[key].dir
                    //             text +='<li>'
                    //             text += `<span><i class="fa fa-minus-square" style="margin-right: 5px;"><img
                    //             src="/assets/folder.png" class="${dir1[key2].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${data[key].position}-${dir1[key2].dirName}</span>
                    //             <ul>`
                    //             for (const key3 in dir1[key2].file) {
                    //                 const file2 = dir1[key2].file
                    //                 text+=`<li>
                    //                 <span> <img src="/assets/docs.png" class="files" width="20" height="20"
                    //                 alt="logo">${file2[key3].fileName}</span>
                    //             </li>`
                    //             }
                    //              for (const key4 in dir1[key2].dir) {
                    //                 const dir2 =dir1[key2].dir
                    //                 text +='<li>'
                    //                 text += `<span><i class="fa fa-minus-square" style="margin-right: 5px;"><img
                    //                 src="/assets/folder.png" class="${dir1[key2].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${data[key].position}-${dir2[key4].dirName}</span>
                    //                 <ul>`
                    //                 for (const key5 in dir2[key4].file) {
                    //                     const file3 = dir2[key4].file
                    //                     text+=`<li>
                    //                     <span> <img src="/assets/docs.png" class="files" width="20" height="20"
                    //                     alt="logo">${file3[key5].fileName}</span>
                    //                 </li>`
                    //                 }
                    //                 for (const key6 in dir2[key4].dir) {
                    //                     const dir3 =dir2[key4].dir
                    //                     text +='<li>'
                    //                     text += `<span><i class="fa fa-minus-square" style="margin-right: 5px;"><img
                    //                     src="/assets/folder.png" class="${dir3[key6].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${data[key].position}-${dir3[key6].dirName}</span>
                    //                     <ul>`
                    //                     for (const key7 in dir3[key6].file) {
                    //                         file3 = dir3[key6].file
                    //                         text+=`<li>
                    //                         <span> <img src="/assets/docs.png" class="files" width="20" height="20"
                    //                         alt="logo">${file2[key7].fileName}</span>
                    //                     </li>`
                    //                     }
                    //                     text+='</ul>'
                    //                     text +='</li>'
                    //                 }
                    //                 text+='</ul>'
                    //                 text +='</li>'
                    //         }
                    //             text+='</ul>'
                    //             text +='</li>'
                    //         }
                    //         text+='</ul>'
                    //         text +='</li>'
                    //     }
                    //   text+='</ul>'
                    //   $('.tree').empty();
                    //   $('.tree').append(text);
                    //   TreeView();
                    //   collapse();
                    alert('Se agrego correctamente el archivo');
                    location.reload()
                })
            },
            error: function(){
                alert('Error: In sending the request!');
            }
        })

    })
});

function collapse() {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $(".tree li.parent_li > span").each(function(e){

        var children = $(this).parent('li.parent_li').find(' > ul > li');
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square').removeClass('fa-minus-square');
                // e.stopPropagation();
    })


}
function TreeView() {
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
}
