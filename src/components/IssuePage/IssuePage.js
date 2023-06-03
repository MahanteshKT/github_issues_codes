import React, { useEffect, useState } from 'react'
import Point from './point.jpg'
import "./IssuePage.css"
import IssuePaginate from '../Pagination/IssuePaginate';

function IssuePage() {
    const [issues,setIssues]=useState([]);
    const [page,setPage]=useState(1);

    useEffect(()=>{
        fetchIssues();
    },[page])

    const fetchIssues=async ()=>{
        const response=await fetch(
            `https://api.github.com/repos/facebook/react/issues?state=open&page=${page}`);
        const data=await response.json();
        if(data){
            setIssues(data);
            console.log(issues);
        }
        if(!data){
            setIssues(null);
        }
        
    }

    const handlePage=(currentPage)=>{
        setPage(currentPage);
    }

    
  return (
    <div style={{margin:'60px 0px'}} >
        
        <div className='issue'>
            <p id="issue-page-name">FaceBook / <b>React</b> <span className='public'>Public</span></p>
            <div className='links'>
                <p><a href="#">code</a></p>
                <p><a href="#">Issues</a></p>
                <p><a href="#">Pull requests</a></p>
                <p><a href="#">Actions</a></p>
                <p><a href="#">Projects</a></p>
            </div>
        </div>

        <div className='issue-page'>
                <div className='header'>
                    <p style={{textAlign:'center'}}>GitHub Issues</p>
                </div>
                <div className='issue-list'>    
                    {issues &&
                        issues.map((issue)=>(
                            <div className="issues_each" key={issue.id}>
                                <div className="point"><img src={Point} alt="p"/></div>
                                <div className='issue_each_text'>
                                    <a href={issue.html_url} target="_blank" >{issue.title}</a>
                                    <p>
                                        <span className='issue-number'>#{issue.number} </span>
                                        <span className='issue-user'>Opened by <b>{issue.user.login}</b> </span>
                                    </p>
                                </div>
                            </div>                             
                        ))
                    }                
                </div>
            
            <IssuePaginate total_page={issues.length} handlePage={handlePage} />
        </div>
    </div>
  )
}

export default IssuePage
