export const formatDate = (date: string) => {
  const [dateWithoutTime] = date.split('T')
  const [year, month, day] = dateWithoutTime.split('-')

  return `${day}.${month}.${year}`
}
