package com.example.bb.bservice1;

import com.example.bb.prediction.PredictionService;
import com.example.bb.model1.DonorInfo;
import com.example.bb.Bloodentity.Blood;
import com.example.bb.bloodrepo.BloodRepo;
import com.example.bb.bservice1.BloodCompatibilityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("BloodService1")
public class BloodService {

    private final BloodRepo bloodRepo;
    private final BloodCompatibilityService bloodCompatibilityService;
    private final PredictionService predictionService;

    @Autowired
    public BloodService(BloodRepo bloodRepo, BloodCompatibilityService bloodCompatibilityService, PredictionService predictionService) {
        this.bloodRepo = bloodRepo;
        this.bloodCompatibilityService = bloodCompatibilityService;
        this.predictionService = predictionService;
    }

    /**
     * Find the nearest donors for the receiver's blood request
     * 
     * @param lat Receiver's latitude
     * @param lon Receiver's longitude
     * @param bloodGroup Receiver's blood group
     * @return List of nearest donors
     */
    public List<DonorInfo> findDonors(double lat, double lon, String bloodGroup) {
        // Step 1: Get valid blood groups for the receiver
        List<String> validBloodGroups = bloodCompatibilityService.getValidDonorGroups(bloodGroup);

        // Step 2: Fetch all eligible donors
        List<Blood> eligibleDonors = bloodRepo.findByBloodGroupIn(validBloodGroups);

        // Step 3: Convert donors to DonorInfo objects
        List<DonorInfo> donorInfoList = eligibleDonors.stream().map(donor -> {
            DonorInfo donorInfo = new DonorInfo();
            donorInfo.setName(donor.getName());
            donorInfo.setEmail(donor.getEmailId());
            donorInfo.setLatitude(donor.getLatitude());
            donorInfo.setLongitude(donor.getLongitude());
            return donorInfo;
        }).collect(Collectors.toList());

        // Step 4: Use KNN to find the nearest donors using the DonorInfo list
        double[] receiverLocation = {lat, lon};
        int[] nearestIndexes = predictionService.findNearestDonors(donorInfoList, receiverLocation, 5);

        // Step 5: Get the corresponding DonorInfo objects using indexes
        List<DonorInfo> nearestDonors = new ArrayList<>();
        for (int index : nearestIndexes) {
            nearestDonors.add(donorInfoList.get(index));
        }

        return nearestDonors;
    }
}
