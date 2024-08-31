package com.parking.backend.Models;


import com.parking.backend.Enum.PROVINCE;

//@Entity
//@Table(name="Member")
public class Member  //extends User
{

  //@Column(name = "address", nullable = true)
  private String address;

 // @Enumerated(EnumType.STRING)
 // @Column(name = "province", nullable = true)
  private PROVINCE province=PROVINCE.UNKNOWN;


  //  @Column(name="contractType", nullable = false)
    private String contractType;

    //@Column(name="paymentMethod", nullable = false)
    private String paymentMethod;

    // Getters and setters
}
