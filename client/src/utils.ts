export const excerpt = (str: string): string => {
  if(str.length > 40) {
    str = str.substring(0, 40) + '...'
  }
  return str
}