import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TicTacToeApp } from './TicTacToeApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <section className='bg-slate-800 h-dvh w-dvw flex flex-col justify-center items-center'>
      <TicTacToeApp />
    </section>
  </StrictMode>,
)
