function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://150.230.71.237:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function traerInformacion(){
    $.ajax({
        url:"http://150.230.71.237:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta)
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable ="<table border>"
    myTable+="<tr bgcolor='#80b3ff'>";
    myTable+="<td>NOMBRE</td>";
    myTable+="<td>MARCA</td>";
    myTable+="<td>HABITACIONES</td>";
    myTable+="<td>DESCRIPCION</td>";
    myTable+="<td>CATEGORIA</td>";
    myTable+="<td>EDITAR</td>";
    myTable+="<td>ACTUALIZAR</td>";
    myTable+="<td>BORRAR</td>";
    
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].rooms+"</td>";        
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name + "</td>";
        myTable+="<td> <button onclick='editarInformacion("+respuesta[i].id+")'>editar</button>";
        myTable+="<td> <button onclick='actualizar("+respuesta[i].id+")'>actualizar</button>";
        myTable+="<td> <button onclick='borrarElemento("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";    
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function guardarInformacion(){
    if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#rooms").val().length == 0 || $("#description").val().length == 0){
        alert("Todos los campos son obligatorios")
     }else{
    let var2 = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        description:$("#description").val(),
        category:{id:+$("#select-category").val()},
        }
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://150.230.71.237:8080/api/Cabin/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
    }
}

function editarInformacion(id){
    $.ajax({
        dataType: 'json',
        url:"http://150.230.71.237:8080/api/Cabin/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name").val(item.name);
            $("#brand").val(item.brand);
            $("#rooms").val(item.rooms);
            $("#description").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function actualizar(idElemento){
    let myData={
        id:idElemento,
        name:$("#name").val(),
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        description:$("#description").val(),
        category:{id:+$("#select-category").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.71.237:8080/api/Cabin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#brand").val("");
            $("#rooms").val("");
            $("#description").val("");
            traerInformacion();
            console.log(respuesta);
            alert("se ha Actualizado correctamente la información")
        }
    });

}


function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.71.237:8080/api/Cabin/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha Eliminado.")
        }
    });
}
