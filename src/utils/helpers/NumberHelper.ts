// eslint-disable-next-line import/prefer-default-export
export function convertToInternationalCurrencySystem(labelValue: any) {
  /* eslint-disable no-nested-ternary */
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? `${(Math.abs(Number(labelValue)) / 1.0e9).toFixed(2)}B`
    : Math.abs(Number(labelValue)) >= 1.0e6
      ? `${(Math.abs(Number(labelValue)) / 1.0e6).toFixed(2)}M`
      : Math.abs(Number(labelValue)) >= 1.0e3
        ? `${(Math.abs(Number(labelValue)) / 1.0e3).toFixed(2)}K`
        : Math.abs(Number(labelValue));
}
