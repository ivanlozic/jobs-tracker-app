import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Job {
  id: number
  title: string
  // Add other job properties here
}

interface JobsState {
  jobs: Job[]
}

const initialState: JobsState = {
  jobs: []
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload)
    }
  }
})

export const { addJob } = jobsSlice.actions
export default jobsSlice.reducer
