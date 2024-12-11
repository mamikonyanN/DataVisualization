import { ReactNode, useState } from 'react'
import { generateUniqueKey } from '~/utils/functions'

interface Props<T> {
  children: ReactNode
  options: T[]
  onSelect: (option: T) => void
  renderItem: (item: T) => ReactNode
}

const Dropdown = <T,>({
  children,
  options,
  onSelect,
  renderItem,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSelect = (option: T) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={handleToggle} className="header__dropdown">
        {children}
      </button>
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            margin: 0,
            padding: '8px 0',
            listStyle: 'none',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            minWidth: '100%',
          }}
        >
          {options.map((option) => (
            <li
              key={generateUniqueKey()}
              onClick={() => handleSelect(option)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              {renderItem(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
