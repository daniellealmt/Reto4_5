
package G37_Reto4_5.modelo;

import G37_Reto4_5.modelo.Cabaña;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.source.doctree.SerialDataTree;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author DANIEL LEAL
 */
@Entity
@Table(name = "category_id")

public class Categoria implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy="category")
    @JsonIgnoreProperties("category_id")
    private List<Cabaña> cabins;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Cabaña> getCabins() {
        return cabins;
    }

    public void setCabins(List<Cabaña> cabins) {
        this.cabins = cabins;
    }

   
    
}
