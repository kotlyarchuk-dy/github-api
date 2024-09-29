import { nextTick } from 'vue'
import { vi, describe, it, expect, beforeEach, afterEach, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchResult from '../search-result/SearchResult.vue'
import { useReposStore } from '@/stores/repos'
import { GithubService } from '@/services/github'
import { setActivePinia, createPinia } from 'pinia'

describe('SearchResult', () => {
  let reposStore: ReturnType<typeof useReposStore>
  let mockGetLastUsedFilters: Mock

  beforeEach(() => {
    setActivePinia(createPinia())
    reposStore = useReposStore()

    mockGetLastUsedFilters = vi.fn()
    mockGetLastUsedFilters.mockImplementation(() => {
      return {
        languages: ['JavaScript', 'TypeScript'],
        fromDate: null,
        toDate: null,
        minStars: 0
      }
    })
    GithubService.getLastUsedFilters = mockGetLastUsedFilters
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component', () => {
    const wrapper = mount(SearchResult)
    expect(wrapper.exists()).toBe(true)
  })

  it('has empty state at the beginning', () => {
    const wrapper = mount(SearchResult)
    expect(wrapper.text()).toContain('Select some languages first')
  })

  it('has block for every language in the store', async () => {
    const wrapper = mount(SearchResult)

    reposStore.setRepos({
      JavaScript: [],
      TypeScript: []
    })
    await nextTick()

    expect(wrapper.text()).toContain('JavaScript')
    expect(wrapper.text()).toContain('TypeScript')
  })

  it('shows the repositories for the selected languages', async () => {
    const wrapper = mount(SearchResult)

    reposStore.setRepos({
      JavaScript: [
        {
          id: 1,
          name: 'repo1',
          description: 'description1',
          createdAt: '2021-01-01',
          starsCount: 10,
          url: ''
        }
      ],
      TypeScript: [
        {
          id: 2,
          name: 'repo2',
          description: 'description2',
          createdAt: '2021-01-02',
          starsCount: 20,
          url: ''
        }
      ]
    })
    await nextTick()

    expect(wrapper.text()).toContain('repo1')
    expect(wrapper.text()).toContain('description1')
    expect(wrapper.text()).toContain('10')

    expect(wrapper.text()).toContain('repo2')
    expect(wrapper.text()).toContain('description2')
    expect(wrapper.text()).toContain('20')
  })

  it('shows empty state for languages without repositories', async () => {
    const wrapper = mount(SearchResult)

    reposStore.setRepos({
      JavaScript: []
    })
    await nextTick()

    expect(wrapper.text()).toContain('No results')
  })

  describe('search summary', () => {
    it('shows date range when both dates are set', async () => {
      const wrapper = mount(SearchResult)

      mockGetLastUsedFilters.mockImplementation(() => {
        return {
          languages: ['JavaScript'],
          fromDate: '2021-01-01',
          toDate: '2021-12-31',
          minStars: 0
        }
      })

      reposStore.setRepos({
        JavaScript: []
      })
      await nextTick()

      expect(wrapper.text()).toContain('01.01.2021')
      expect(wrapper.text()).toContain('31.12.2021')
    })

    it('shows date range when only the from date is set', async () => {
      const wrapper = mount(SearchResult)

      mockGetLastUsedFilters.mockImplementation(() => {
        return {
          languages: ['JavaScript'],
          fromDate: '2021-01-01',
          toDate: null,
          minStars: 0
        }
      })

      reposStore.setRepos({
        JavaScript: []
      })
      await nextTick()

      expect(wrapper.text()).toContain('01.01.2021')
    })

    it('shows date range when only the to date is set', async () => {
      const wrapper = mount(SearchResult)

      mockGetLastUsedFilters.mockImplementation(() => {
        return {
          languages: ['JavaScript'],
          fromDate: null,
          toDate: '2021-12-31',
          minStars: 0
        }
      })

      reposStore.setRepos({
        JavaScript: []
      })
      await nextTick()

      expect(wrapper.text()).toContain('31.12.2021')
    })

    it('shows min stars', async () => {
      const wrapper = mount(SearchResult)

      mockGetLastUsedFilters.mockImplementation(() => {
        return {
          languages: ['JavaScript'],
          fromDate: null,
          toDate: null,
          minStars: 10
        }
      })

      reposStore.setRepos({
        JavaScript: []
      })
      await nextTick()

      expect(wrapper.text()).toContain('10')
    })
  })
})
