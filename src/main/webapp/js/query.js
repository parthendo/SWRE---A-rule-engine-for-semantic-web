var classes=[];
var propertis=[];
var query=[];
var count=1;
// var result=[["mohit","studies","ds603"],["parth","teaches","ds603"]];
var api = "webapi/Rule/getNode";
$.get(api,function(create,status) {
    if (status === "success") {
        //alert(create);
        for (var i = 0; i<create[0].length; i++)
            classes.push(create[0][i]);
        for (var j = 0; j< create[1].length; j++)
            propertis.push(create[1][j]);
       newNode();
    }
    else
        alert("fail");
});
function newNode() {
    var str="";
    str+=`<div class="row mt-1"> <div class="col-lg-3 text-center"><select class="form-control subject" style="border-radius: 50px" onchange="checkValues(this.value,`+count+`)">`;
    for(var i=0;i<classes.length;i++){
        str+=`<option value="`+classes[i]+`">`+classes[i]+`</option>`;
    }
    str+=`<option value="other">Other</option></select><input type="text" id="s`+count+`" placeholder="Enter Subject" class="form-control hide" style="border-radius: 50px"></div><div class="col-lg-3 text-center"><select class="form-control predicate" style="border-radius: 50px">`;
    for(var i=0;i<propertis.length;i++){
        str+=`<option value="`+propertis[i]+`">`+propertis[i]+`</option>`;
    }
    str+=`</select></div><div class="col-lg-3 text-center"><select class="form-control object" style="border-radius: 50px" onchange="checkValueo(this.value,`+count+`)">`;

    for(var i=0;i<classes.length;i++){
        str+=`<option value="`+classes[i]+`">`+classes[i]+`</option>`;
    }
    str+=`<option value="other">Other</option></select><input type="text" id="o`+count+`" placeholder="Enter Object" class="form-control hide" style="border-radius: 50px"></div><div class="col-lg-3 text-center"><select class="form-control and" style="border-radius: 50px"><option value="AND">AND</option><option value="OR">OR</option></select></div></div>`;

    $('#node').append(str);
    count++;
    $('.loader').hide();
}

// function go(){
//     query = [];
//     subject="";predicate="";object="";other="";
//     $('.loader').show();
//     if($('#subject').val()=== "other"){
//         subject=$("#s1").val();
//         other="sub";
//     }
//     else
//         subject=$('#subject').val();
//     predicate=$('#predicate').val();
//     if($('#object').val()=== "other"){
//         object=$("#o1").val();
//         other="obj";
//     }
//     else
//         object=$('#object').val();
//     query.push(subject);query.push(predicate);query.push(object);
//     var data=JSON.stringify({rules:query});
//     $.ajax({
//         url: 'webapi/Rule/getQuery',
//         type: "POST",
//         data: data,
//         //enctype:'multipart/form-data',
//         processData: false,
//         contentType: 'application/json',
//         cache: false,
//         async: true,
//         timeout: 60000,
//         success: function (result,status) {
//             alert(result);
//             showResult(result,predicate);
//         }
//
//     });
// }
//
// function showResult(result,predicate){
//     $("#result").show();
//     var str="";
//     if(other==="") {
//         for (var i = 0; i < result.length; i++) {
//             str += `<div class="row mt-1"><div class="col-lg-4"><p>` + result[i][0] + `</p></div><div class="col-lg-4"><p>` + predicate + `</p></div><div class="col-lg-4"><p>` + result[i][1] + `</p></div></div>`;
//         }
//     }
//     else if(other==="sub"){
//         for (var i = 0; i < result.length; i++) {
//             str += `<div class="row mt-1"><div class="col-lg-4"><p>` + subject+ `</p></div><div class="col-lg-4"><p>` + predicate + `</p></div><div class="col-lg-4"><p>` + result[i]+ `</p></div></div>`;
//         }
//     }
//     else{
//         for (var i = 0; i < result.length; i++) {
//             str += `<div class="row mt-1"><div class="col-lg-4"><p>` + result[i]+ `</p></div><div class="col-lg-4"><p>` + predicate + `</p></div><div class="col-lg-4"><p>` + object + `</p></div></div>`;
//         }
//     }
//     $('.loader').hide();
//     $("#showresult").html(str);
//
// }
function go(){
    query=[];
    var subject=$('.subject');
    var predicate=$('.predicate');
    var object=$('.object');
    var and=$('.and');

    //storing query value into array of string;
    for(var i=0;i<subject.length;i++){
        if(subject[i].value==="other") {
            query.push($("#s" + (i + 1)).val());
        }
        else {
            query.push(subject[i].value);
        }

        query.push(predicate[i].value);

        if(object[i].value==="other") {
            query.push($("#o" + (i + 1)).val());
        }
        else {
            query.push(object[i].value);
        }

        if(i<subject.length-1)
            query.push(and[i].value);
    }
    console.log(query);
    var data=JSON.stringify({rules:query});
    $.ajax({
        url: 'webapi/Rule/getQuery',
        type: "POST",
        data: data,
        processData: false,
        contentType: 'application/json',
        cache: false,
        async: true,
        timeout: 60000,
        success: function (result,status) {
            alert(result);
            showResult(result);
        }

    });
}
function showResult(result){
    $("#result").show();
    var str="";
    for(var i=0;i<result.length;i++){
        str+=`<p>`;
        for(var j=0;j<result[i].length;j++){
            str+=result[i][j]+` `;
        }
        str+=`</p>`;
    }
    $("#showresult").html(str);

}
function checkValues(val,id) {
    if(val==="other"){
        $("#s"+id).show();
    }
    else
        $("#s"+id).hide();
}
function checkValueo(val,id) {
    if(val==="other"){
        $("#o"+id).show();
    }
    else
        $("#o"+id).hide();
}
