import { useState } from 'react'

function AddTask({onAdd}) {
    const [text, setText] = useState('')
    const [day, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = e => {
        e.preventDefault()
        
        if(!text) {
            alert('Please add a Task')
        } else if(!day) {
            alert('Please add Day and Time')
        }
        onAdd({ text, day, reminder })

        setText('')
        setDate('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label htmlFor="">Task</label>
                <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Add Task" />
            </div>
            <div className='form-control'>
                <label htmlFor="">Day & Time</label>
                <input type="text" value={day} onChange={e => setDate(e.target.value)} placeholder="Add Day & Time" />
            </div>
            <div className='form-control'>
                <label htmlFor="">Set Reminder</label>
                <input checked={reminder} value={reminder} onChange={e => setReminder(e.currentTarget.checked)} type="checkbox" />
            </div>

            <input type="submit" className="submit-task" value="Save Task" />
        </form>
    )
}

export default AddTask
