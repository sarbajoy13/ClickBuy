package com.webapp.demo.repo;

import com.webapp.demo.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepo extends JpaRepository<Image, Integer> {

//    @Query(value = "select * from image i where i.productId='$id'", nativeQuery = true)
//    List<Image> findByProductId(int id);

}
