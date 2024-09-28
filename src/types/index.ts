import { langs } from '@/assets/data/langs'

export type Repo = {
  id: number
  name: string
  description: string
  createdAt: string
  starsCount: number
}

export type Lang = (typeof langs)[number]
export type ReposByLanguage = Partial<Record<Lang, Repo[]>>
