function autoInicioCategoria(){
    console.log("test");
        $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table border>";
    myTable+="<tr bgcolor='#80b3ff'>";
    myTable+="<td>NOMBRE CATEGORIA</td>";
    myTable+="<td>DESCRIPCION</td>";
    myTable+="<td>EDITAR</td>";
    myTable+="<td>ACTUALIZAR</td>";
    myTable+="<td>BORRAR</td>";
    "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr bgcolor='#d1d1e0'>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='editarInformacion("+respuesta[i].id+")'>Editar</button>";
        myTable+="<td> <button onclick='actualizar("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#name").val(),
        description:$("#description").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Category/save",
       
        
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
function editarInformacion(id){
    $.ajax({
        dataType: 'json',
        url:"http://localhost:8080/api/Category/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name").val(item.name);
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
        description:$("#description").val()
    };
    
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            autoInicioCategoria();
            alert("se ha Actualizado correctamente la información")
        }
    });

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCategoria();
            alert("Se ha Eliminado.")
        }
    });

}


