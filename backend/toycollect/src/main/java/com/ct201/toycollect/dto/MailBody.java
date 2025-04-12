package com.ct201.toycollect.dto;

import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String text) {

}
