import { useEffect, useState, useContext } from 'react'
import '../css/MainContent.css'
// import Task from './Task'
// import '../css/Task.css' 
import ProjectContext from '../context/ProjectContext'

const MainContent = (props) => {
    const { currentProject, SetCurrentProject } = useContext(ProjectContext)
    // const [p, setP] = useState('')
    // setP(projectShow)

    // FETCHING THE DATA TO SHOW;
    const [task, setTask] = useState({})
    let userId = props.userId
    const getdata = async () => {
        try {
            let url = `https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/todo/${currentProject}.json`
            let data = await fetch(url)
            let parsedata = await data.json()
            setTask(parsedata)
            // console.log(tasks)
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getdata()
        // eslint-disable-next-line
    }, [currentProject])

    // REMOVING THE DATA
    const remove = async (event) => {
        let index = event.target.value;
        await fetch(`https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/todo/${currentProject}/${index}.json`, {
            method: 'DELETE'
        });
        getdata()
    }

    // ADDING THE DATA
    const [AddTask, setAddTask] = useState("")
    const handleChange = (e) => {
        setAddTask(e.target.value);
    };
    const addTask = async (event) => {
        event.preventDefault()
        const item = AddTask
        await fetch(`https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/todo/${currentProject}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        getdata()
        setAddTask("")
    }

    // SHOW AND HIDE ADD TASK FORM ON CLICK
    const [showTaskForm, setShowTaskForm] = useState(false)
    const handleShowTaskForm = (event) => {
        event.preventDefault()
        if (showTaskForm === true) {
            setShowTaskForm(false)
        } else {
            setShowTaskForm(true)
        }
    }

    // ENTER KEY HANDLE FOR TASK ADD FORM 
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (AddTask) {
                const item = AddTask
                await fetch(`https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/todo/${currentProject}.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                });
                getdata()
                setAddTask("")
            }
        }
    }

    //DELETE PROJECT
    const deleteProject = async (event) => {
        event.preventDefault()
        alert("are you sure to delete project")
        await fetch(`https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/todo/${currentProject}.json`, {
            method: 'DELETE'
        });
        SetCurrentProject('Home')
    }
    const hide = () => {
        if (window.innerWidth <= 750) {
            let sidebar, slide, main, title
            sidebar = document.querySelector(".sidebar")
            sidebar.classList.toggle("hide")

            slide = document.querySelector(".slide")
            slide.classList.toggle("moveSlide")

            main = document.querySelector(".main")
            main.classList.toggle("mainMove")
            main.classList.toggle("mainDissable")

            title = document.querySelector(".header")
            title.classList.toggle("headerMove")
        }
    }
    return (
        <>

            <div className="container-fluid m-0 p-0" onClick={hide}>

                <div className='container-fluid main mainDissable' onClick={hide}>
                    <div className="row header">
                        <p className='d-inline w-auto'>My projects/</p>
                        {/* {currentProject !== 'Home' && <button className='button button-sm button-outline-danger ms-auto deleteProject d-inline me-2' onClick={deleteProject}>Delete Project</button>} */}

                    </div >
                    <div className="row row2 ">
                        <div className="container tasks">
                            <h2 className='mb-4 mt-3 d-flex'>
                                <span className='d-inline'>{currentProject} {currentProject === 'Home' && <i className="bi bi-house" />}
                                    {currentProject !== 'Home' && task !== "" && <i className="bi bi-list-nested"></i>}
                                </span>
                                {/* {currentProject !== 'Home' && <button className='d-inline btn btn-sm btn-outline-danger ms-auto deleteProject' onClick={deleteProject}>Delete Project</button>} */}
                            </h2>
                            {
                                task ? (
                                    Object.entries(task).map(([key, value]) => (
                                        <div className='task p-2 mb-2' key={key}>
                                            <div className='d-inline d-flex'>
                                                <button className='removeBtn' onClick={remove} value={key}></button>
                                            </div>
                                            <label htmlFor="" className='mb-1 task-name d-block'>{value}</label>
                                        </div>
                                    ))
                                ) : (
                                    <label htmlFor="" className='mb-1'>Please Add Data</label>
                                )
                            }
                            <div className='mt-3'>
                                <form mathod='POST'>
                                    {!showTaskForm && (
                                        <div className='d-flex justifycontent-space-between'>
                                            <button className='button button-sm button-second addTask' onClick={handleShowTaskForm}><span className='round'>+</span> Add task</button>
                                            {currentProject !== 'Home' && <button className='btn btn-sm btn-outline-danger ms-auto deleteProject' onClick={deleteProject}>Delete Project</button>}
                                        </div>
                                    )}
                                    {showTaskForm && (
                                        <div className='container-fluid taskAddForm p-3 mb-5'>
                                            <input type="text"
                                                onChange={handleChange}
                                                value={AddTask}
                                                onKeyDown={handleKeyDown}
                                                className='w-100 taskDetail d-block mb-2 '
                                                placeholder='Task Name' />
                                            <hr />
                                            <div className='d-flex'>
                                                <button className='button button-sm button-danger ms-auto' onClick={handleShowTaskForm}>Cancel</button>
                                                <button className='button button-primary button-sm ms-1' onClick={addTask} disabled={!AddTask}>
                                                    Add Task
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MainContent