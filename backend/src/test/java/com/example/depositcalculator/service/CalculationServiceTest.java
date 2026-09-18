package com.example.depositcalculator.service;

import com.example.depositcalculator.dto.CalculateRequest;
import com.example.depositcalculator.dto.CalculateResponse;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculationServiceTest {

    private final CalculationService service = new CalculationService();

    @Test
    void matchesAssignmentTestCase() {

        CalculateRequest request = new CalculateRequest(
                BigDecimal.valueOf(100000), 12, BigDecimal.valueOf(8));

        CalculateResponse response = service.calculate(request);

        assertEquals(0, response.getTotal().subtract(new BigDecimal("108300")).abs()
                .compareTo(new BigDecimal("50")));
        assertEquals(0, response.getProfit().subtract(new BigDecimal("8300")).abs()
                .compareTo(new BigDecimal("50")));
    }
}
