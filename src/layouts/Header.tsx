import useTestStore from '~/stores/testStore'
import { OSoptionList as OSoption } from '~/types'
import Dropdown from '~/ui/Dropdown'
import { Ellipsis } from '~/ui/Ellipsis'

const list: OSoption[] = [
  { title: 'OS Doors', url: 'https://rcslabs.ru/ttrp1.json' },
  { title: 'OS Bombuntu', url: 'https://rcslabs.ru/ttrp2.json' },
  { title: 'Mibre Office', url: 'https://rcslabs.ru/ttrp3.json' },
  { title: 'LoWtEx', url: 'https://rcslabs.ru/ttrp4.json' },
]

const Header = () => {
  const { result, getTestResult } = useTestStore()

  const handleOnSelect = (option: OSoption) => {
    getTestResult(option.url)
  }

  return (
    <header className="header">
      <span className="header__title">
        Количество пройденных тестов "{result?.title}"
      </span>
      <Dropdown
        options={list}
        onSelect={handleOnSelect}
        renderItem={(item) => item.title}
      >
        <Ellipsis />
      </Dropdown>
    </header>
  )
}

export default Header
