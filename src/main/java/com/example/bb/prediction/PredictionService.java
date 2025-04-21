package com.example.bb.prediction;

import smile.neighbor.KDTree;
import smile.neighbor.Neighbor;
import org.springframework.stereotype.Service;
import com.example.bb.model1.DonorInfo;
import java.util.List;

@Service
public class PredictionService {

    public int[] findNearestDonors(List<DonorInfo> donorInfoList, double[] receiverLocation, int k) {
        if (donorInfoList.isEmpty()) {
            return new int[0];
        }

        // Convert List<DonorInfo> to double[][] (latitude and longitude) and Integer[] (indices)
        double[][] data = new double[donorInfoList.size()][2];  // 2 because each donor has latitude and longitude
        Integer[] indexes = new Integer[donorInfoList.size()];

        // Populate the data and indexes arrays
        for (int i = 0; i < donorInfoList.size(); i++) {
            DonorInfo donor = donorInfoList.get(i);
            data[i][0] = donor.getLatitude();  // Latitude
            data[i][1] = donor.getLongitude(); // Longitude
            indexes[i] = i;  // Use the index of the donor
        }

        // Build KDTree with data points and their indices
        KDTree<Integer> kdTree = new KDTree<>(data, indexes);

        // Find k nearest neighbors
        Neighbor<double[], Integer>[] neighbors = kdTree.knn(receiverLocation, k);

        // Prepare result
        int[] nearestIndexes = new int[neighbors.length];
        for (int i = 0; i < neighbors.length; i++) {
            nearestIndexes[i] = neighbors[i].value;  // neighbor.value is the donor index
        }

        return nearestIndexes;
    }
}
