/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package G37_Reto4_5.repositorio;

import G37_Reto4_5.modelo.Cabaña;
import G37_Reto4_5.interfaz.InterfaceCabin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author USUARIO
 */
@Repository
public class RepositorioCabin {
    
    @Autowired
    private InterfaceCabin crud;

    public List<Cabaña> getAll(){
        return (List<Cabaña>) crud.findAll();
    }

    public Optional<Cabaña> getCabin(int id){
        return crud.findById(id);
    }

    public Cabaña save(Cabaña cabin){
        return crud.save(cabin);
    }
    public void delete(Cabaña cabin){
        crud.delete(cabin);
    }
    
}

