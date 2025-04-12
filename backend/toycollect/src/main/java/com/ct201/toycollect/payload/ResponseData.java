package com.ct201.toycollect.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseData {
    private int status;
    private String description;
    private Object data;
    private boolean success;

    public ResponseData(boolean b, int i, String productDeletedSuccessfully) {
    }
}
