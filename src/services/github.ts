import { useReposStore } from '@/stores/repos'
import { useAppStore } from '@/stores/app'
import type { Repo, Lang, ReposByLanguage } from '@/types'

type RawRepo = {
  id: number
  name: string
  description: string
  created_at: string
  stargazers_count: number
  html_url: string
}

type Filters = {
  languages: Lang[]
  fromDate: string | null
  toDate: string | null
  minStars: number | null
}

const BASE_URL = 'https://api.github.com'
const ITEMS_PER_PAGE = 10

let lastUsedFilters: Filters | null = null

export const GithubService = {
  async fetchReposByFilter(filters: Filters) {
    const { languages } = filters
    const promises = languages.map((language) => searchByLanguage(language, filters))
    try {
      const results = await Promise.all(promises)

      const reposByLanguage: ReposByLanguage = {}
      languages.forEach((language, index) => {
        reposByLanguage[language] = results[index]
      })

      const reposStore = useReposStore()
      reposStore.setRepos(reposByLanguage)
      lastUsedFilters = { ...filters }
    } catch (error) {
      const appStore = useAppStore()
      appStore.setError('Failed to fetch repositories')
    }
  },

  async fetchMoreRepos(language: Lang) {
    if (!lastUsedFilters) {
      throw new Error('No filters available. Please fetch repositories first.')
    }

    const reposStore = useReposStore()
    const repos = reposStore.reposByLanguage(language)
    if (!repos) {
      throw new Error('No repositories available for this language.')
    }
    const page = Math.ceil(repos.length / ITEMS_PER_PAGE) + 1

    const queryString = buildQueryString(language, lastUsedFilters, page)
    try {
      const response = await fetch(`${BASE_URL}/search/repositories?${queryString}`)
      const json = await response.json()
      const newRepos = json.items.map(prepareRepoItem) as Repo[]

      reposStore.addRepos(language, newRepos)
    } catch (error) {
      const appStore = useAppStore()
      appStore.setError('Failed to fetch more repositories')
    }
  },

  hasNextPage(language: Lang): boolean {
    if (!lastUsedFilters) {
      return false
    }

    const reposStore = useReposStore()
    const repos = reposStore.reposByLanguage(language)
    if (!repos) {
      throw new Error('No repositories available for this language.')
    }

    return repos.length % ITEMS_PER_PAGE === 0
  },

  getLastUsedFilters() {
    return lastUsedFilters
  }
}

const searchByLanguage = async (lang: Lang, filters: Filters) => {
  const queryString = buildQueryString(lang, filters)
  const response = await fetch(`${BASE_URL}/search/repositories?${queryString}`)
  const json = await response.json()

  return json.items.map(prepareRepoItem) as Repo[]
}

const prepareRepoItem = (item: RawRepo): Repo => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: item.created_at,
    starsCount: item.stargazers_count,
    url: item.html_url
  }
}

const buildQueryString = (lang: Lang, filters: Filters, page?: number) => {
  const { fromDate, toDate, minStars } = filters
  let query = `language:${lang}`
  if (fromDate && toDate) {
    query += ` created:${fromDate}..${toDate}`
  } else if (fromDate) {
    query += ` created:>${fromDate}`
  } else if (toDate) {
    query += ` created:<${toDate}`
  }

  if (minStars && !isNaN(minStars)) {
    query += ` stars:>${minStars}`
  }

  const searchParams = new URLSearchParams({
    q: query,
    sort: 'stars',
    order: 'desc',
    per_page: ITEMS_PER_PAGE.toString()
  })

  if (page) {
    searchParams.set('page', page.toString())
  }

  return searchParams.toString()
}
