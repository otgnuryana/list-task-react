import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    return (
        <div>
            <button onClick={onClick} style={{ backgroundColor: color }} className="btn-add">{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: 'orange',
    text: 'Add'
}

Button.propType = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button

