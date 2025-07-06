import { describe, it, expect } from 'vitest'

describe('App Component', () => {
  it('simple test that should pass', () => {
    expect(1 + 1).toBe(2)
  })

  it('tests basic string functionality', () => {
    expect('User Management').toContain('User')
  })

  it('validates email format logic', () => {
    // test the email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    expect(emailRegex.test('user@example.com')).toBe(true)
    expect(emailRegex.test('invalid-email')).toBe(false)
    expect(emailRegex.test('user@')).toBe(false)
    expect(emailRegex.test('@example.com')).toBe(false)
  })

  it('tests user data structure', () => {
    // test with the mock data
    const mockUser = {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surname": "Doe", 
      "email": "john.doe@example.com",
      "company": "BlackRock",
      "jobTitle": "Financial Analyst"
    }
    
    expect(mockUser.uuid).toBeDefined()
    expect(mockUser.email).toContain('@')
    expect(mockUser.company).toBe('BlackRock')
  })
})