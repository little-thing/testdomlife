function ajax(url,type,data){
     return new Promise(function(resolve, reject) {
         $.ajax({
             url:url,
             type:type,
             data:data,
             dataType: "json",
             success:function(obj){
                 resolve(obj);
             },
             error:function(err){
                 reject(err)
             }
         });
     });
}

!function(){
    let name=`小明`;
    $("#test-name").on("click",function(){
        console.log(name)
    })
}()