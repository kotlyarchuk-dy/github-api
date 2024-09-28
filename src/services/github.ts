import { useReposStore } from '@/stores/repos'
import type { Repo, Lang, ReposByLanguage } from '@/types'

type RawRepo = {
  id: number
  name: string
  description: string
  created_at: string
  stargazers_count: number
}

const BASE_URL = 'https://api.github.com'

export const GithubService = {
  async searchByLanguageList(languageList: Lang[]) {
    const promises = languageList.map((language) => this.searchByLanguage(language))
    const results = await Promise.all(promises)
    const reposByLanguage: ReposByLanguage = {}

    languageList.forEach((language, index) => {
      reposByLanguage[language] = results[index]
    })

    const reposStore = useReposStore()
    reposStore.setRepos(reposByLanguage)
  },

  async searchByLanguage(lang: Lang) {
    const queryString = new URLSearchParams({
      q: `language:${lang}`,
      sort: 'stars',
      order: 'desc'
    })
    const response = await fetch(`${BASE_URL}/search/repositories?${queryString}`)
    const json = await response.json()

    return json.items.map((item: RawRepo) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        created_at: item.created_at,
        starsCount: item.stargazers_count
      }
    }) as Repo[]
  }
}
