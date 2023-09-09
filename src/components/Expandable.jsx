import React,{useState,useEffect} from 'react'


const Expandable = ({children,maxChars=77}) => {

    let [expanded,setExpanded]= useState(true);
    

    if (children.length <= maxChars) return <p className='light-charcoal'>{children}</p>

    let text = expanded? children.substring(0,maxChars):children ;

    // const [expanded, setExpanded] = useState(true);
    // const [text, setText] = useState(children);
  
    // useEffect(() => {
    //   if (children.length <= maxChars) {
    //     setText(children);
    //   } else {
    //     setText(expanded ? children.substring(0, maxChars) : children);
    //   }
    // }, [children, expanded, maxChars]);
  
  return (
    <>
    <p className='light-charcoal'>{text}{!expanded ? null : '...'}
    <a className='light-charcoal no-decoration-link' style={{cursor:"pointer"}} onClick={()=> setExpanded(!expanded)}>{expanded?"read more":"read less" }</a>
    </p>
    
    </>
  )
}

export default Expandable