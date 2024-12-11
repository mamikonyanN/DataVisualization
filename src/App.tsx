import Header from '~/layouts/Header'
import Chart from '~/features/Chart'
import useTestStore from '~/stores/testStore'

function App() {
  const { result } = useTestStore()

  if (!result) return <h1>Loading...</h1>

  return (
    <div className="container">
      <Header />
      <Chart />
    </div>
  )
}

export default App
