package com.example.bb.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Receiver {
	  @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

	   private String name ;
	   private String emailId;
	   private String phoneNumber;
	   private String bloodGroup;
	   private String country;
	   private String state;
	   private String district;
	   private String reason;
	   private double latitude;
	   private double longitude;
	
	   
	   
	public Receiver() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Receiver(Long id, String name, String emailId, String phoneNumber, String bloodGroup, String country,
			String state, String district, String reason, double latitude, double longitude) {
		super();
		this.id = id;
		this.name = name;
		this.emailId = emailId;
		this.phoneNumber = phoneNumber;
		this.bloodGroup = bloodGroup;
		this.country = country;
		this.state = state;
		this.district = district;
		this.reason = reason;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	   
}
