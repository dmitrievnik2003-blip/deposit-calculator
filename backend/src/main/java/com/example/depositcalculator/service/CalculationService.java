package com.example.depositcalculator.service;

import com.example.depositcalculator.dto.CalculateRequest;
import com.example.depositcalculator.dto.CalculateResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;


@Service
public class CalculationService {

        private static final MathContext CALCULATION_CONTEXT = new MathContext(20, RoundingMode.HALF_UP);

    private static final BigDecimal ONE_HUNDRED = BigDecimal.valueOf(100);
    private static final BigDecimal TWELVE = BigDecimal.valueOf(12);

    public CalculateResponse calculate(CalculateRequest request) {
        BigDecimal amount = request.getAmount();
        BigDecimal annualRate = request.getRate();
        int months = request.getMonths();

        BigDecimal monthlyRate = annualRate
                .divide(ONE_HUNDRED, CALCULATION_CONTEXT)
                .divide(TWELVE, CALCULATION_CONTEXT);

                BigDecimal growthFactor = BigDecimal.ONE
                .add(monthlyRate, CALCULATION_CONTEXT)
                .pow(months, CALCULATION_CONTEXT);

        BigDecimal total = amount.multiply(growthFactor, CALCULATION_CONTEXT)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal profit = total.subtract(amount)
                .setScale(2, RoundingMode.HALF_UP);

        return new CalculateResponse(total, profit);
    }
}
