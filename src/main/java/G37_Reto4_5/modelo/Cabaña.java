/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package G37_Reto4_5.modelo;
/*Importacion de paquetes*/
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
/*implementacion del metodo entidad*/
@Entity
/*definicion del nombre de la tabla Cabin */
@Table(name = "cabins")
/*creacion de la clase cabaña con la implementacion serializable*/
public class Cabaña implements Serializable{
/*implementacion del metodo identificador*/
@Id
 /*implementacion del metodo de campos de la tabla*/   
@GeneratedValue(strategy = GenerationType.IDENTITY)
/*Creacion de las propiedas de la clase Cabin*/
    private Integer id;
    private String name;
    private String brand;     
    private Integer rooms;
    private String description;
       
  /*implementacion relacional del metodo muchos a uno*/  
    @ManyToOne
    /*implementacion del Id realcional de la clase Category*/
    @JoinColumn(name = "category_id")
    /*definicion para omitir el resultado de Cabins*/
    @JsonIgnoreProperties("cabins")
    /*definicion de la relacion category*/
    private Categoria category;

    /*implementacion relacional del metodo uno a muchos*/  
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "cabin")
    /*implementacion omitir contenido cabin y client*/
    @JsonIgnoreProperties({"cabin", "client"})
    /*definicion de la relacion menssage*/
    private List<Mensaje> messages;

    /*implementacion relacional del metodo uno a muchos*/ 
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "cabin")
    /*implementacion omitir contenido de cabin y client*/
    @JsonIgnoreProperties({"cabin", "client"})
    /*definicion de la relacion reservation*/
    private List<Reservaciones> reservations;
/*creacion de los metodos Get and Sed*/
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getRooms() {
        return rooms;
    }

    public void setRooms(Integer rooms) {
        this.rooms = rooms;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Categoria getCategory() {
        return category;
    }

    public void setCategory(Categoria category) {
        this.category = category;
    }

    public List<Mensaje> getMessages() {
        return messages;
    }

    public void setMessages(List<Mensaje> messages) {
        this.messages = messages;
    }

    public List<Reservaciones> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservaciones> reservations) {
        this.reservations = reservations;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

  
    
}
