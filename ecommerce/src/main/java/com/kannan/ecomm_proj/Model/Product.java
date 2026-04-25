package com.kannan.ecomm_proj.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String name;
    private String desc;
    private String brand ;
    private BigDecimal price ;
    private String category ;

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy")
    private Date releaseDate ;
    private boolean available ;
    private Integer stockQuantity ;

    //HANDLING IMAGES
    //you can either store the image on cloud storage and get a link or you can store the image in database
    //specify the type of content - format
    private String imageName ;
    private String imageType;
    //storing in database
    @Lob
    private byte[] imageDate ; //byte array because we want to store a large object -> LOB



}
