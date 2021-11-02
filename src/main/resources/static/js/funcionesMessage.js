function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioCabin(){

    $.ajax({
        url:"http://localhost:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-cabin");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}
function traerInformacion(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
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
    myTable+="<td>MENSAJE</td>";
    myTable+="<td>CABAÑA</td>";
    myTable+="<td>CLIENTE</td>";
    myTable+="<td>EDITAR</td>";
    myTable+="<td>ACTUALIZAR</td>";
    myTable+="<td>BORRAR</td>";
    
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr bgcolor='#d1d1e0'>";
        myTable+="<td>"+respuesta[i].messageText+"</td>"
        myTable+="<td>"+respuesta[i].cabin.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick='editarInformacion("+respuesta[i].idMessage+")'>Editar</button>"
        myTable+="<td> <button onclick='actualizar("+respuesta[i].idMessage+")'>Actualizar</button>"
        myTable+="<td> <button onclick='borrarElemento("+respuesta[i].idMessage+")'>Borrar</button>"
        
        myTable+="</tr>";    
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function guardarInformacion(){
    if ($("#messageText").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{
    let var2 = {
        messageText:$("#messageText").val(),
        cabin:{id:$("#select-cabin").val()},
        client:{idClient:$("#select-client").val()},
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Message/save",
       
        
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
        url:"http://localhost:8080/api/Message/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#messageText").val(item.messageText);
            
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function actualizar(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(),
        cabin:{id:+$("#select-cabin").val()},
        client:{idClient:+$("#select-client").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            //$("#select-cabin").val("");
            //$("#select-client").val("");
            traerInformacion();
            console.log(respuesta);
            alert("se ha Actualizado correctamente el mensaje")
        }
    });

}

function borrarElemento(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
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


