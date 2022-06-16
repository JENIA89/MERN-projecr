export const excerpt = (str: string): string => {
  if(str.length > 45) {
    str = str.substring(0, 45) + '...'
  }
  return str
}