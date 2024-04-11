import React,{useState} from "react";
import ProjectContext from "./ProjectContext"

const ProjectContextProvider =({children})=>{
    const [projects,SetProjects] = useState([])
    const [currentProject,SetCurrentProject] = useState('Home')
    return(
        <ProjectContext.Provider value={{projects,SetProjects,currentProject,SetCurrentProject}}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider
// const addProject =(projectName)=>{
//     SetProjects(...projects,projectName)
//   }      