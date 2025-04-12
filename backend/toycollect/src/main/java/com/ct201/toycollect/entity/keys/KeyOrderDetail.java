package com.ct201.toycollect.entity.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeyOrderDetail implements Serializable {
    @Column(name = "orderId")
    private int orderId;

    @Column(name="productId")
    private int productId;
}
