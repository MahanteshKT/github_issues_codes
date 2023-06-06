import React, { useEffect, useState } from 'react'
import Point from './point.jpg'
import "./IssuePage.css"
import IssuePaginate from '../Pagination/IssuePaginate';
function IssuePage() {
    const [issues,setIssues]=useState([]);
    const [page,setPage]=useState(1);
    const [owner,setOwner]=useState('octocat');
    const [repo,setRepo]=useState('Hello-World');
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState("");
    useEffect(()=>{
        fetchIssues();
    },[page,repo,owner])

    const fetchIssues=async ()=>{
        setLoading(true);
        const res=await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues`);
        
        const resOwner=res.json();

        if(!resOwner){
            setError("please povide correct values to search.");
            setLoading(false);
            return;
        }
        
        const response=await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues?state=open&page=${page}`);
        const data=await response.json();
        if(data){
            setIssues(data);
            console.log(issues);
            console.log(data.length);
            if(data.message==='Not Found'){
                setIssues([]);
                setError("please provide correct repo and owner")
            }
            
            setLoading(false);


        }
        
        
    }   

    const handlePage=(currentPage)=>{
        setPage(currentPage);
    }

    const onClickSubmit=(e)=>{
        e.preventDefault();
        if(e.target.owner.value==='' || e.target.repo.value===''){
            setError("please provide the Owner and Repo value")
            return;
        }
        setError(null)
        setOwner(e.target.owner.value)
        console.log("Owner",owner);
        setRepo(e.target.repo.value);

        
    }

    
  return (
    <div style={{margin:'60px 0px'}} >
        <div className='form'>
                <form onSubmit={onClickSubmit}>
                        <div className='ind'>
                        <label foreach="owner">Owner:</label>
                        <input type="text" id="owner" name="owner" placeholder={owner} />
                        </div>
                        
                        <div className='ind'>
                        <label foreach="repo">Repo:</label>
                        <input type="text" id="repo" name="repo" placeholder={repo} />
                        </div>

                        <button>Get Issues</button>
                        

                </form>
                {error && <p className='err'>{error}</p>}
        </div>
        <div className='issue'>
            
            <p id="issue-page-name">{owner} / <b>{repo}</b> <span className='public'>Public</span></p>
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
                    <p>Page <b>{page}</b> of {issues.length} </p>
                </div>
                
                {issues.length===0 && <p>   Not Found Please Provide Correct Owner and Repo</p>}
                <div className='issue-list'>
                        
                    {issues.length>0 &&
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
