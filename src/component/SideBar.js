import { useContext, useState, useEffect } from 'react'
import '../css/SideBar.css'
import ProjectContext from '../context/ProjectContext'

const SideBar = (props) => {
    let userId = props.userId
    const { SetProjects, projects, SetCurrentProject, currentProject } = useContext(ProjectContext)

    //SIDEBAR AND MAINCOMPONENT MOVEMENT FUNCTIONS
    const hide = () => {
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

    //NAME OF THE USER
    const [UserName, setUserName] = useState('')
    const getuserName = async () => {
        let url = `https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/name.json`
        let data = await fetch(url)
        let parsedata = await data.json()
        setUserName(parsedata)
    }

    //SHOW ALL PROJECT NAME
    const getdata = async () => {
        try {
            let url = `https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/todo.json`
            let data = await fetch(url)
            let parsedata = await data.json()
            if (parsedata) {
                let extractHeader = Object.keys(parsedata)
                SetProjects(extractHeader)
            }
            // console.log(project)
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getdata()
        getuserName()
        // console.log(projects)
        // eslint-disable-next-line
    }, [currentProject])

    //PROJECT ADD FORM SHOW/HIDE TOGGLE FUNCTION
    const [showTaskForm, setShowTaskForm] = useState(false)
    const handleShowTaskForm = (event) => {
        event.preventDefault()
        if (showTaskForm === true) {
            setShowTaskForm(false)
        } else {
            setShowTaskForm(true)
        }
    }

    // ADDING NEW PROJECT
    const [projectName, setProjectName] = useState('')
    const handleChange = (event) => {
        setProjectName(event.target.value);
    }
    const addProject = async (event) => {
        event.preventDefault()
        if (projectName !== '') {
            let item = projectName
            setProjectName('')
            SetProjects(prevArray => [...prevArray, item])
            // console.log(projects)
            setShowTaskForm(false)
            await fetch(`https://todolist-8c25b-default-rtdb.firebaseio.com/data/${userId}/todo/${item}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(`Welcom to ${item}`),
            });
        }
    }
    const handleProjectChange = (item) => {
        let value = item
        SetCurrentProject(value)
        projects.forEach(element => {
            if (element === value) {
                let a = document.querySelector(`#${element}`)
                a.classList.add('projectNameHover')
            }
            else {
                let b = document.querySelector(`#${element}`)
                if (b.classList.contains('projectNameHover')) {
                    b.classList.remove('projectNameHover')
                }
            }
        if(window.screen.width <= 750){
            hide()
        }
        });
    }
    return (
        <>
            <div className="sidebar" >
                <div className="container px-4 py-2">
                    <div className="row user ">
                        <div className="col align-middle mb-3 user-detail p-1">
                            <p className='fw-medium useName d-inline'>
                                <i className="bi bi-person me-2 fs-5"></i>{UserName ? UserName : "User"}
                            </p>
                            <span><i className="bi bi-layout-sidebar slide" onClick={hide}></i></span>
                        </div>
                    </div>
                    <div className="row projects">
                        <p className='mt-2' id='Home' onClick={() => { handleProjectChange('Home ') }}>Home <i className="bi bi-house-door"></i></p>
                        <div className='project mt-1'>
                            <p className='x fw-medium fs-6'>My projects </p>
                            <span className='addProject ms-auto' onClick={handleShowTaskForm} title='Add Project'>+</span>
                        </div>
                        <div className='mt-1 '>
                            {projects.map((item, index) => (
                                (item !== 'Home') && (
                                    <div className='d-flex projectNames' id={item} onClick={() => { handleProjectChange(item) }} key={index}>
                                        <p className='d-inline ps-1 d-flex align-items-center' key={index}> <i className="bi bi-hash fs-4" style={{ color: '#bf4c3d' }}></i> {item}</p>
                                        {/* <p className='d-inline ms-auto pe-1'>1</p> */}
                                    </div>
                                )
                            ))}
                        </div>

                        {showTaskForm && (<div className='container-fluid border taskAddForm p-3 mt-2'>
                            <input type="text"
                                className='w-100 taskDetail mb-2'
                                placeholder='Project Name'
                                value={projectName}
                                onChange={handleChange} />
                            <hr />
                            <div className='d-flex'>
                                <button className='button button-primary button-sm me-1' onClick={addProject}>Add Project</button>
                                <button className='button button-sm button-danger   ' onClick={handleShowTaskForm}>Cancel</button>
                            </div>
                        </div>)}
                    </div>
                </div>

            </div>
        </>
    )
}
export default SideBar