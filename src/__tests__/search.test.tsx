import Search from '@/components/Search/Search'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import { setSearchValue } from '@/store/features/playlistSlice'

jest.mock('../store/store.ts')

const mockUseAppDispatch = useAppDispatch as jest.Mock
const mockUseAppSelector = useAppSelector as jest.Mock
const mockDispatch = jest.fn()

describe('Поиск', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		mockUseAppDispatch.mockReturnValue(mockDispatch)
	})
	afterEach(() => {
		cleanup()
	})

	const searchInputTests = [
		{
			searchValue: '',
		},
		{
			searchValue: '1',
		},
		{
			searchValue: 'один',
		},
	]

	searchInputTests.forEach(value => {
		it('рендер компонента', () => {
			mockUseAppSelector.mockReturnValue({
				filterOptions: { searchValue: value.searchValue },
			})

			const search = renderer.create(<Search />).toJSON()
			expect(search).toMatchSnapshot()
		})
	})

	it('рендер поля для поиска', () => {
		mockUseAppSelector.mockReturnValue({ filterOptions: { searchValue: '' } })

		render(<Search />)
		const searchInput = screen.getByPlaceholderText('Поиск')
		expect(searchInput).toBeInTheDocument()
	})
	it('отображение текущего значения', () => {
		const searchValue = 'Тест'
		mockUseAppSelector.mockReturnValue({
			filterOptions: { searchValue: searchValue },
		})

		render(<Search />)
		const searchInput = screen.getByPlaceholderText('Поиск')
		expect(searchInput).toHaveValue(searchValue)
	})
	it('передача текущего значения в экшен(setSearchValue)', () => {
		mockUseAppSelector.mockReturnValue({ filterOptions: { searchValue: '' } })

		render(<Search />)
		const searchInput = screen.getByPlaceholderText('Поиск')
		fireEvent.change(searchInput, { target: { value: 'Тест второй' } })
		expect(mockDispatch).toHaveBeenCalledWith(setSearchValue('Тест второй'))
	})
})
