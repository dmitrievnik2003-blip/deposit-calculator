import { useState, FormEvent } from 'react';
import { calculateDeposit, ApiError } from './api';
import { LIMITS } from './types';
import type { CalculateResponse } from './types';

type FieldErrors = Partial<Record<'amount' | 'months' | 'rate', string>>;

const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    value,
  );

function validate(amount: string, months: string, rate: string): FieldErrors {
  const errors: FieldErrors = {};
  const amountNum = Number(amount);
  const monthsNum = Number(months);
  const rateNum = Number(rate);

  if (!amount || Number.isNaN(amountNum)) {
    errors.amount = 'Введите сумму';
  } else if (amountNum < LIMITS.amount.min || amountNum > LIMITS.amount.max) {
    errors.amount = `Сумма должна быть от ${LIMITS.amount.min.toLocaleString('ru-RU')} до ${LIMITS.amount.max.toLocaleString('ru-RU')} ₽`;
  }

  if (!months || Number.isNaN(monthsNum)) {
    errors.months = 'Введите срок';
  } else if (monthsNum < LIMITS.months.min || monthsNum > LIMITS.months.max) {
    errors.months = `Срок должен быть от ${LIMITS.months.min} до ${LIMITS.months.max} месяцев`;
  }

  if (!rate || Number.isNaN(rateNum)) {
    errors.rate = 'Введите ставку';
  } else if (rateNum < LIMITS.rate.min || rateNum > LIMITS.rate.max) {
    errors.rate = `Ставка должна быть от ${LIMITS.rate.min}% до ${LIMITS.rate.max}%`;
  }

  return errors;
}

export default function App() {
  const [amount, setAmount] = useState('100000');
  const [months, setMonths] = useState('12');
  const [rate, setRate] = useState('8.5');

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculateResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    setResult(null);

    const errors = validate(amount, months, rate);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await calculateDeposit({
        amount: Number(amount),
        months: Number(months),
        rate: Number(rate),
      });
      setResult(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(err.message);
        if (err.fieldErrors) {
          setFieldErrors((prev) => ({ ...prev, ...err.fieldErrors }));
        }
      } else {
        setFormError('Что-то пошло не так. Попробуйте ещё раз.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page">
      <main className="card">
        <h1>Калькулятор вклада</h1>
        <p className="subtitle">Посчитайте доход по вкладу с ежемесячной капитализацией</p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Сумма вклада</span>
            <div className="input-suffix">
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-invalid={Boolean(fieldErrors.amount)}
              />
              <span className="suffix">₽</span>
            </div>
            {fieldErrors.amount && <span className="error">{fieldErrors.amount}</span>}
          </label>

          <label className="field">
            <span>Срок</span>
            <div className="input-suffix">
              <input
                type="number"
                inputMode="numeric"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                aria-invalid={Boolean(fieldErrors.months)}
              />
              <span className="suffix">мес.</span>
            </div>
            {fieldErrors.months && <span className="error">{fieldErrors.months}</span>}
          </label>

          <label className="field">
            <span>Годовая ставка</span>
            <div className="input-suffix">
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                aria-invalid={Boolean(fieldErrors.rate)}
              />
              <span className="suffix">%</span>
            </div>
            {fieldErrors.rate && <span className="error">{fieldErrors.rate}</span>}
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Считаем…' : 'Рассчитать'}
          </button>

          {formError && <p className="form-error">{formError}</p>}
        </form>

        {result && (
          <section className="result" aria-live="polite">
            <div className="result-row">
              <span>Начальная сумма</span>
              <strong>{formatMoney(Number(amount))} ₽</strong>
            </div>
            <div className="result-row">
              <span>Итоговая сумма</span>
              <strong>{formatMoney(result.total)} ₽</strong>
            </div>
            <div className="result-row highlight">
              <span>Доход</span>
              <strong>+{formatMoney(result.profit)} ₽</strong>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
