import ColorBox from '~/ui/ColorBox'

const Legend = () => {
  return (
    <ul className="legend">
      <li>
        <ColorBox color="#4AB6E8" />
        Клиентская часть
      </li>
      <li>
        <ColorBox color="#AA6FAC" />
        Серверная часть
      </li>
      <li>
        <ColorBox color="#E85498" />
        База данных
      </li>
    </ul>
  )
}

export default Legend
