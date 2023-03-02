export function formatDate (date: string) {
  if (date) {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    month = month.length < 2 ? '0' + month : month
    day = day.length < 2 ? '0' + day : day

    return [year, month, day].join('-')
  }
  return ''
}
