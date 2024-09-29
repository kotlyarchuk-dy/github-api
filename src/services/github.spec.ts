import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { vi, type Mock } from 'vitest'
import { GithubService } from '@/services/github'
import { useReposStore } from '@/stores/repos'
import { useAppStore } from '@/stores/app'
import type { Lang } from '@/types'

vi.mock('@/stores/repos')
vi.mock('@/stores/app')

describe('GithubService', () => {
  let reposStoreMock: any
  let appStoreMock: any
  let mockFetch: any

  beforeEach(() => {
    mockFetch = vi.fn()
    global.fetch = mockFetch

    reposStoreMock = {
      setRepos: vi.fn(),
      reposByLanguage: vi.fn(),
      addRepos: vi.fn()
    }
    ;(useReposStore as unknown as Mock).mockReturnValue(reposStoreMock)

    appStoreMock = {
      setError: vi.fn()
    }
    ;(useAppStore as unknown as Mock).mockReturnValue(appStoreMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch repositories by filter and set them in the store', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'Repo 1',
        description: 'Description 1',
        created_at: '2021-01-01',
        stargazers_count: 100,
        html_url: 'http://example.com/repo1'
      }
    ]
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ items: mockRepos })
    })

    const filters = {
      languages: ['JavaScript'] as Lang[],
      fromDate: '2021-01-01',
      toDate: null,
      minStars: 50
    }

    await GithubService.fetchReposByFilter(filters)

    const encodedExpectedString = encodeURIComponent('language:JavaScript')
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(encodedExpectedString))
    expect(reposStoreMock.setRepos).toHaveBeenCalledWith({
      JavaScript: [
        {
          id: 1,
          name: 'Repo 1',
          description: 'Description 1',
          createdAt: '2021-01-01',
          starsCount: 100,
          url: 'http://example.com/repo1'
        }
      ]
    })
  })

  it('should handle fetch errors and set an error in the app store', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const filters = {
      languages: ['JavaScript'] as Lang[],
      fromDate: null,
      toDate: null,
      minStars: 50
    }

    await GithubService.fetchReposByFilter(filters)

    expect(appStoreMock.setError).toHaveBeenCalledWith('Failed to fetch repositories')
  })

  it('should fetch more repositories for a specific language', async () => {
    const mockRepos = [
      {
        id: 2,
        name: 'Repo 2',
        description: 'Description 2',
        created_at: '2021-02-01',
        stargazers_count: 150,
        html_url: 'http://example.com/repo2'
      }
    ]
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ items: mockRepos })
    })

    const language = 'JavaScript' as Lang
    reposStoreMock.reposByLanguage.mockReturnValue([
      {
        id: 1,
        name: 'Repo 1',
        description: 'Description 1',
        createdAt: '2021-01-01',
        starsCount: 100,
        url: 'http://example.com/repo1'
      }
    ])

    await GithubService.fetchMoreRepos(language)

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('page=2'))
    expect(reposStoreMock.addRepos).toHaveBeenCalledWith(language, [
      {
        id: 2,
        name: 'Repo 2',
        description: 'Description 2',
        createdAt: '2021-02-01',
        starsCount: 150,
        url: 'http://example.com/repo2'
      }
    ])
  })

  it('should return false for hasNextPage when the number of repos is not a multiple of items per page', () => {
    const language = 'JavaScript' as Lang
    reposStoreMock.reposByLanguage.mockReturnValue([{ id: 1 }, { id: 2 }])

    const result = GithubService.hasNextPage(language)

    expect(result).toBe(false)
  })

  it('should return true for hasNextPage when the number of repos is a multiple of items per page', () => {
    const language = 'JavaScript' as Lang
    reposStoreMock.reposByLanguage.mockReturnValue(new Array(10).fill({ id: 1 }))

    const result = GithubService.hasNextPage(language)

    expect(result).toBe(true)
  })
})
