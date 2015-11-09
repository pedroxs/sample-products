package com.pedroxs.products.repository;

import com.pedroxs.products.domain.Product;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("select distinct product from Product product left join fetch product.categories")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.categories where product.id =:id")
    Product findOneWithEagerRelationships(@Param("id") Long id);

}
