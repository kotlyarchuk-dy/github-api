import { describe, it, expect } from 'vitest'
import { formatDate } from './date'

describe('formatDate', () => {
  it('should format date string without time', () => {
    expect(formatDate('2021-03-01')).toBe('01.03.2021')
  })

  it('should format date string with time and cut it', () => {
    expect(formatDate('2021-03-01T12:00:00')).toBe('01.03.2021')
  })
})
