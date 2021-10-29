/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package G37_Reto4_5.interfaz;

import G37_Reto4_5.modelo.Cliente;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author DLEAL
 */
public interface InterfaceCliente extends CrudRepository<Cliente,Integer>
 {
    
}
