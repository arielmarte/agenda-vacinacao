export function convertToDatetimeStr(dateStr: string): string {
    const dt = new Date(dateStr);
    const ts = Math.floor(dt.getTime());
    const formatted = dt.toLocaleString('pt-BR', { timeZone: 'UTC' })
    return formatted;
  }

  export function convertDateToStr(date: Date): string {
    const formatted = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    return formatted;
  }