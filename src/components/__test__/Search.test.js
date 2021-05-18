import fireEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import SearchForm from '../Search/SearchForm'
import customRender from './utils'
import {postRoute, getRoute} from '../../util/server_api_util'

jest.mock('../../util/server_api_util')

describe('postRoute', () => {
  it('handles error postRoute', async () => {
    postRoute.mockRejectedValueOnce({
      response: {status: 'Error', data: 'Error'},
    })

    const {getByRole, getByText} = customRender(<SearchForm />)

    const origin = getByRole('textbox', {name: /origin/i})
    const destination = getByRole('textbox', {name: /destination/i})

    fireEvent.type(origin, 'innocentre')
    fireEvent.type(destination, 'Hong Kong International Airport Terminal 1')

    fireEvent.click(getByText(/submit/i))

    await waitFor(() => {
      expect(postRoute).toHaveBeenCalledTimes(1)
      expect(postRoute).toHaveBeenCalledWith({
        origin: 'innocentre',
        destination: 'Hong Kong International Airport Terminal 1',
      })
    })
  })

  it('handles success and calls getRoute', async () => {
    postRoute.mockResolvedValueOnce({data: {token: 1234}})
    getRoute.mockResolvedValueOnce({data: 'data', status: 'success'})

    const {getByRole, getByText} = customRender(<SearchForm />)

    const origin = getByRole('textbox', {name: /origin/i})
    const destination = getByRole('textbox', {name: /destination/i})

    fireEvent.type(origin, 'innocentre')
    fireEvent.type(destination, 'Hong Kong International Airport Terminal 1')

    fireEvent.click(getByText(/submit/i))

    await waitFor(() => {
      expect(postRoute).toHaveBeenCalledTimes(1)
      expect(postRoute).toHaveBeenCalledWith({
        origin: 'innocentre',
        destination: 'Hong Kong International Airport Terminal 1',
      })
      expect(getRoute).toHaveBeenCalledTimes(1)
      expect(getRoute).toHaveBeenCalledWith(1234)
    })
  })
})

describe('Search component', () => {
  it('can render properly', () => {
    const component = customRender(<SearchForm />)
    expect(component).toBeDefined()
  })

  it('should show empty origin and destination', () => {
    const {getByTestId} = customRender(<SearchForm />)
    expect(getByTestId(/search/i)).toHaveFormValues({
      origin: '',
      destination: '',
    })
  })

  it('should show submit and reset', () => {
    const {getByText} = customRender(<SearchForm />)
    expect(getByText(/submit/i)).toBeDefined()
    expect(getByText(/reset/i)).toBeDefined()
  })

  it('should update when user types', () => {
    const {getByRole} = customRender(<SearchForm />)

    const origin = getByRole('textbox', {name: /origin/i})
    const destination = getByRole('textbox', {name: /destination/i})

    fireEvent.type(origin, 'innocentre')
    fireEvent.type(destination, 'Hong Kong International Airport Terminal 1')

    expect(origin.value).toBe('innocentre')
    expect(destination.value).toBe('Hong Kong International Airport Terminal 1')
  })
})
