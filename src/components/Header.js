import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'


const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation() 
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button onClick={onAdd} text={showAdd ? 'Close' : 'Add'} color={showAdd ? 'yellow' : 'aqua'} />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Daftar Menu'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
// CSS in JS
// const headingStyle = {
//     color: 'pink',
//     backgroundColor: 'black'
// }
export default Header
