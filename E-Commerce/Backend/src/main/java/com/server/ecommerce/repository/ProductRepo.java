package src.main.java.com.server.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import src.main.java.com.server.ecommerce.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

}
