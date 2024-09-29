import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FiltersPanel from '@/components/filters-panel/FiltersPanel.vue'
import { useFiltersStore } from '@/stores/filters'
import { setActivePinia, createPinia } from 'pinia'

describe('RepoFilterComponent.vue', () => {
  let filtersStore: ReturnType<typeof useFiltersStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    filtersStore = useFiltersStore()
  })

  it('renders the component', () => {
    const wrapper = mount(FiltersPanel)
    expect(wrapper.exists()).toBe(true)
  })

  describe('date range filter', () => {
    it('filters model has default values', () => {
      expect(filtersStore.fromDate).toBe(null)
      expect(filtersStore.toDate).toBe(null)
    })

    it('updates the filters store when user interacts with the date range filter', async () => {
      const wrapper = mount(FiltersPanel)

      const fromDateInput = wrapper.find('input[data-test-id="fromDate"]')
      await fromDateInput.setValue('2021-01-01')

      const toDateInput = wrapper.find('input[data-test-id="toDate"]')
      await toDateInput.setValue('2021-12-31')

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(filtersStore.fromDate).toBe('2021-01-01')
      expect(filtersStore.toDate).toBe('2021-12-31')
    })

    it('updates the filter store when only the from date is set', async () => {
      const wrapper = mount(FiltersPanel)

      const fromDateInput = wrapper.find('input[data-test-id="fromDate"]')
      await fromDateInput.setValue('2021-01-01')

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(filtersStore.fromDate).toBe('2021-01-01')
      expect(filtersStore.toDate).toBe(null)
    })

    it('updates the filter store when only the to date is set', async () => {
      const wrapper = mount(FiltersPanel)

      const toDateInput = wrapper.find('input[data-test-id="toDate"]')
      await toDateInput.setValue('2021-12-31')

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(filtersStore.fromDate).toBe(null)
      expect(filtersStore.toDate).toBe('2021-12-31')
    })
  })

  describe('min stars filter', () => {
    it('filters model has default values', () => {
      expect(filtersStore.minStars).toBe(0)
    })

    it('updates the filters store when user interacts with the min stars filter', async () => {
      const wrapper = mount(FiltersPanel)

      const minStarsInput = wrapper.find('input[data-test-id="minStars"]')
      await minStarsInput.setValue('100')

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(filtersStore.minStars).toBe(100)
    })

    it('handles negative values', async () => {
      const wrapper = mount(FiltersPanel)

      const minStarsInput = wrapper.find('input[data-test-id="minStars"]')
      await minStarsInput.setValue('-100')

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(filtersStore.minStars).toBe(0)
    })
  })
})
