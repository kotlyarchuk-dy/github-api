import type { Repo } from '@/types'

type RawRepo = {
  id: number
  name: string
  description: string
  created_at: string
  stargazers_count: number
}

const BASE_URL = 'https://api.github.com'

export const GithubService = {
  async getRepos() {
    const queryString = new URLSearchParams({
      q: 'language:javascript',
      sort: 'stars',
      order: 'desc'
    })
    const response = await fetch(`${BASE_URL}/search/repositories?${queryString}`)

    const json = await response.json()
    const items: Repo[] = json.items.map((item: RawRepo) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        created_at: item.created_at,
        starsCount: item.stargazers_count
      }
    })

    return items
  }
}
