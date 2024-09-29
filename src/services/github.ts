import { useReposStore } from '@/stores/repos'
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

export const GithubService = {
  async fetchReposByFilter(filters: Filters) {
    const { languages } = filters
    const promises = languages.map((language) => searchByLanguage(language, filters))
    const results = await Promise.all(promises)
    const reposByLanguage: ReposByLanguage = {}

    languages.forEach((language, index) => {
      reposByLanguage[language] = results[index]
    })

    const reposStore = useReposStore()
    reposStore.setRepos(reposByLanguage)
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

const buildQueryString = (lang: Lang, filters: Filters) => {
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

  return new URLSearchParams({
    q: query,
    sort: 'stars',
    order: 'desc',
    per_page: ITEMS_PER_PAGE.toString()
  }).toString()
}
