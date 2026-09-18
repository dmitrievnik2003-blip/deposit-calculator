package com.example.depositcalculator.dto;

import java.math.BigDecimal;


public class CalculateResponse {

    private final BigDecimal total;
    private final BigDecimal profit;

    public CalculateResponse(BigDecimal total, BigDecimal profit) {
        this.total = total;
        this.profit = profit;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public BigDecimal getProfit() {
        return profit;
    }
}
