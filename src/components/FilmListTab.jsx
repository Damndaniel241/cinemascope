import React,{useCallback, useState} from 'react'
import "../styles/FilmListTabStyles.css"

export const FilmListTabs = ({children}) => {

    const initialTab = children[0].props.label;
    const [activeTab, setActiveTab] = useState(initialTab); 
    
    const handleActiveTab = useCallback((label)=> setActiveTab(label),[])  ;
  
    const tabs = children.map((child => {
        return <button
        key = {child.props.label}
        className={`${activeTab === child.props.label ? "active": "deactivate"}`}
        onClick = {
            (e) => {
                e.preventDefault();
                handleActiveTab(child.props.label);
            }

        }

        >{child.props.tabName}
        </button>

    }));

    const tabContent = children.filter(
        (child)=>  child.props.label  === activeTab 
    ); 

    return (
        <div>
            <div className='tabs'>{tabs} </div>
            
            <div className='tab_content'>{tabContent} </div>
        </div>
    )
}; 



export const FilmListTab = ({children}) =>{
    return (
        <>
        {children}
        
        </>
    )
}

