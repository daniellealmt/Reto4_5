function traerInformacion(){
    $.ajax({
        url:"http://150.230.71.237:8080/api/Client/all",
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
    myTable+="<td>CORREO</td>";
    myTable+="<td>CONTRASEÑA</td>";
    myTable+="<td>NOMBRE</td>";
    myTable+="<td>EDAD</td>";
    myTable+="<td>EDITAR</td>";
    myTable+="<td>ACTUALIZAR</td>";
    myTable+="<td>BORRAR</td>";
    
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        //myTable+="<td>"+respuesta[i].idClient+"</td>"
        myTable+="<td>"+respuesta[i].email+"</td>"
        myTable+="<td>"+respuesta[i].password+"</td>"
        myTable+="<td>"+respuesta[i].name+"</td>"        
        myTable+="<td>"+respuesta[i].age+"</td>"
        myTable+="<td> <button onclick='editarInformacion("+respuesta[i].idClient+")'>Editar</button>"
        myTable+="<td> <button onclick='actualizar("+respuesta[i].idClient+")'>Actualizar</button>"
        myTable+="<td> <button onclick='borrarElemento("+respuesta[i].idClient+")'>Borrar</button>"
        myTable+="</tr>";    
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function guardarInformacion(){
    let var2 = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://150.230.71.237:8080/api/Client/save",
       
        
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
        url:"http://150.230.71.237:8080/api/Client/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#idClient").val(item.idClient);
            $("#email").val(item.email);
            $("#password").val(item.password);
            $("#name").val(item.name);
            $("#age").val(item.age);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function actualizar(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.71.237:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#email").val("");
            $("#password").val("");
            $("#name").val("");
            $("#age").val("");
            traerInformacion();
            console.log(respuesta);
            alert("se ha Actualizado correctamente la información")
        }
    });

}

function borrarElemento(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.71.237:8080/api/Client/"+idElemento,
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


