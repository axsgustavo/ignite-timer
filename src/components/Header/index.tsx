import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'

import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <NavLink to="/"className="logo">
        <img src={logo} />
      </NavLink>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}