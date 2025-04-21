package com.example.bb.bloodrepo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.bb.Bloodentity.Blood;

public interface BloodRepo extends JpaRepository<Blood, Long> {
    
    @Query("SELECT b FROM Blood b WHERE TRIM(b.phoneNumber) = TRIM(:phoneNumber) order by name")
    List<Blood> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

	List<Blood> findByBloodGroupContainingIgnoreCase(String bloodGroup);

	List<Blood> findByBloodGroupIn(List<String> validBloodGroups);
}
