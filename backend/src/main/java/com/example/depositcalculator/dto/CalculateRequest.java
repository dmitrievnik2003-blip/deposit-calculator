package com.example.depositcalculator.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;


public class CalculateRequest {

    @NotNull(message = "Сумма обязательна")
    @DecimalMin(value = "1000", message = "Сумма не может быть меньше 1 000 ₽")
    @DecimalMax(value = "10000000", message = "Сумма не может быть больше 10 000 000 ₽")
    private BigDecimal amount;

    @NotNull(message = "Срок обязателен")
    @Min(value = 1, message = "Срок не может быть меньше 1 месяца")
    @Max(value = 60, message = "Срок не может быть больше 60 месяцев")
    private Integer months;

    @NotNull(message = "Ставка обязательна")
    @DecimalMin(value = "1", message = "Ставка не может быть меньше 1%")
    @DecimalMax(value = "20", message = "Ставка не может быть больше 20%")
    private BigDecimal rate;

    public CalculateRequest() {
    }

    public CalculateRequest(BigDecimal amount, Integer months, BigDecimal rate) {
        this.amount = amount;
        this.months = months;
        this.rate = rate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getMonths() {
        return months;
    }

    public void setMonths(Integer months) {
        this.months = months;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }
}
