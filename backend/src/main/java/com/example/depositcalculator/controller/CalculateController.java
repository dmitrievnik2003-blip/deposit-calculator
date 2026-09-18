package com.example.depositcalculator.controller;

import com.example.depositcalculator.dto.CalculateRequest;
import com.example.depositcalculator.dto.CalculateResponse;
import com.example.depositcalculator.service.CalculationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculateController {

    private final CalculationService calculationService;

    public CalculateController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @PostMapping("/api/calculate")
    public CalculateResponse calculate(@Valid @RequestBody CalculateRequest request) {
        return calculationService.calculate(request);
    }
}
