package com.example.bb.bservice1;


import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class BloodCompatibilityService {

    private final Map<String, List<String>> bloodCompatibilityMap;

    public BloodCompatibilityService() {
        bloodCompatibilityMap = new HashMap<>();

        // Defining blood group compatibility based on the receiver's blood group
        bloodCompatibilityMap.put("A+", Arrays.asList("A+", "A-", "O+", "O-"));
        bloodCompatibilityMap.put("B+", Arrays.asList("B+", "B-", "O+", "O-"));
        bloodCompatibilityMap.put("AB+", Arrays.asList("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"));
        bloodCompatibilityMap.put("O+", Arrays.asList("O+", "O-"));
        bloodCompatibilityMap.put("A-", Arrays.asList("A-", "O-"));
        bloodCompatibilityMap.put("B-", Arrays.asList("B-", "O-"));
        bloodCompatibilityMap.put("AB-", Arrays.asList("AB-", "A-", "B-", "O-"));
        bloodCompatibilityMap.put("O-", Arrays.asList("O-"));
    }

    /**
     * Get valid donor blood groups for a receiver based on the receiver's blood group.
     *
     * @param receiverBloodGroup Receiver's blood group
     * @return List of valid blood groups for donors
     */
    public List<String> getValidDonorGroups(String receiverBloodGroup) {
        return bloodCompatibilityMap.getOrDefault(receiverBloodGroup, Collections.emptyList());
    }
}
