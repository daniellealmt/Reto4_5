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
        url:"http://localhost:8080/api/Reservation/all",
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
    myTable+="<td>FECHA ENTRADA</td>";
    myTable+="<td>FECHA SALIDA</td>";
    myTable+="<td>CLIENTE</td>";
    myTable+="<td>CABAÑA</td>";
    myTable+="<td>ESTATUS</td>";
    myTable+="<td>BORRAR</td>";
    myTable+="<td>ACTUALIZAR</td>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>"
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>"
        myTable+="<td>"+respuesta[i].client.name+"</td>"        
        myTable+="<td>"+respuesta[i].cabin.name+"</td>"
        myTable+="<td>"+respuesta[i].status+"</td>"
        myTable+="<td> <button onclick='editarInformacion("+respuesta[i].idReservation+")'>Editar</button>"
        myTable+="<td> <button onclick='actualizar("+respuesta[i].idReservation+")'>actualizar</button>"
        myTable+="<td> <button onclick='borrarElemento("+respuesta[i].idReservation+")'>Borrar</button>"
        myTable+="</tr>";    
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function guardarInformacion(){
    let var1 = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        cabin:{id:$("#select-cabin").val()},
        client:{idClient:$("#select-client").val()},
        status:$("#status").val()        
        };
     
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var1),
        
        url:"http://localhost:8080/api/Reservation/save",
       
        
        success:function(response) {
                console.log(response);
                console.log(var1);
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
        url:"http://localhost:8080/api/Reservation/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;
            $("#idReservation").val(item.idReservation);
            $("#satrtDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);
            
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function actualizar(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        cabin:{id:$("#id").val()},
        client:{idClient:$("#idClient").val()},
        status:$("#status").val()   

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idReservation").val("");
            $("#satrtDate").val("");
            $("#devolutionDate").val("");
            $("#id").val("");
            $("#idClient").val("");
            $("#status").val();
            traerInformacion();
            console.log(respuesta);
            alert("se ha Actualizado correctamente la información")
        }
    });

}


function borrarElemento(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
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


