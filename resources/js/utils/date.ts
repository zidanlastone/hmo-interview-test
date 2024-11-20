export function toLocalDatetime(dateString: string | undefined) {
  if (typeof dateString == 'string') {
    return new Date(dateString as string).toISOString().replace('Z', '');
  }
  return new Date().toISOString().replace('Z', '');
}