//view  Stds by batch
$(function(){
    $('#batch-view').on('submit',function(e){
        e.preventDefault();
        var val = $('#viewSel');
        $.ajax({
            url:'/Student/students',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({batch:val.val()}),
            success:function(respond){
                var tbody = $('tbody');
                var error = $('#vieberror');
                error.html('');
                tbody.html('');
                if(respond.vserrors){
                    respond.vserrors.forEach((vserror) => {
                            error.append('\
                        <div class="alert alert-danger">'+ vserror.msg +'</div>\
                        ');
                    });
                    
                }else{
                    respond.stds.forEach((std) => {
                        tbody.append('\
                        <tr>\
                        <td>'+ std.admNo + '</td>\
                        <td>'+ std.name + ' </td>\
                        <td>'+ std.gender +' </td>\
                        <td>'+ std.takenBkId + '</td>\
                        <td><a href="/Student/EditStudent/<%= std._id %>" class="btn btn-info"> Edit</a></td>\
                        </tr>\
                        ');
                    });
                }
            }
        });
    });
});

//search box
$(function(){
    $('#search-bk').on('submit',function(e){
        e.preventDefault();
        var val = $('#serBk');
        var error = $('#searchError');
        error.html('');
        if(!val.val()){
            error.append('\
                <div class="alert alert-danger">Please enter a book Name </div>\
            ');
        }else{
            $.ajax({
                url:'/search',
                method:'POST',
                contentType:'application/json',
                data:JSON.stringify({searchBK:val.val()}),
                success:function(respond){
                    var table = $('#bookTable');
                    table.html('');


                    if(respond.searerrors){
                        respond.searerrors.forEach((searerror) => {
                                error.append('\
                            <div class="alert alert-danger">'+ searerror.msg +'</div>\
                            ');
                        });
                        
                    }else{
                        table.append('\
                            <table class="table table-bordered tb">\
                            <thead>\
                                <tr>\
                                    <th>Id</th>\
                                    <th>ISBN</th>\
                                    <th>Title</th>\
                                    <th>Author</th>\
                                    <th>Edition</th>\
                                    <th>Availability</th>\
                                </tr>\
                            </thead>\
                            <tbody id="tbody">\
                            </tbody>\
                            </table>\
                        ');
                        var tbody = $('#tbody');
                        tbody.html('');

                        respond.sBK.forEach((bk) => {
                            tbody.append(
                            '<tr>\
                            <td>' + bk.bookId + '</td>\
                            <td>' + bk.isbn + '</td>\
                            <td>' + bk.title + '</td>\
                            <td>' + bk.author + '</td>\
                            <td>' + bk.edition + '</td>'+
                            (bk.stdAdId == 0  ? 
                                '<td><center><i class="fa fa-check fa-lg avail"></i></center></td>'
                                :
                                '<td><center><i class="fa fa-times fa-lg not-avail"></i></center></td>'
                            )+
                            '</tr>'
                            )
                        });
                        
                    }
                }
            });
        }
        
    });
});