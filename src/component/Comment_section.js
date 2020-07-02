import React,{useState,useEffect} from 'react';
import './Comment_section.css'
import axios from 'axios'
import Comment from './Comment'

/*comments form = [{comment:comment1,
                    reply:reply1},
                                ...]*/
const Comment_section = (props) => {
    //const [comments,setComments] = useState([])
    const [text, setText] = useState("")
    
    
    useEffect(() => {
        // handleSubmit()
        renderComments()
    },[])

    
    const handleInputChange = (e) => {
        let value = e.target.value
        setText(value)
        console.log(text)
    }
    const handleSubmit = (e) => {
        axios.post('',{
            comment: text,
            reply: ""
        }).then(function(data){
            console.log(data)
            if(data.success === 1){
                alert("訊息已送達")
                renderComments()
            }else{
                alert("Something's wrong")
            }
        }).catch(function (err){
            console.log(err)
        })
    }
    const renderComments = () => {
        axios.post('',{})
            .then(function (data) {
                if(data.success===1){
                    console.log(data.data)
                    
                    let comments_list = []
                    let count = 1
                    for (let comment in data.data){
                        comments_list.push(<Comment id={"Comment_"+count} comment={comment.comment} reply={comment.reply?comment.reply:""}></Comment>)
                        count = count + 1
                    }
                    //setComments(data.data)
                    return(
                        <div id="Comment_section_container">
                            {comments_list}
                            <form onSubmit={handleSubmit}>
                                <textarea id="Comment_section_textarea" onChange={handleInputChange}></textarea>
                                <input type="submit" value="submit" onSubmit={handleSubmit}></input>
                            </form>
                        </div>
                    )
                }else{
                    console.log(data)
                }
                
        }).catch(function (error) {
                console.log(error);
           });
    }

    // const renderComments = () => {
    //     let comments_list = []
    //     let count = 1
    //     for (let comment in comments){
    //         comments_list.push(<Comment id={"Comment_"+count} comment={comment.comment} reply={comment.reply?comment.reply:""}></Comment>)
    //         count = count + 1
    //     }
    //     return(
    //         <div id="Comment_section_container">
    //             {comments_list}
    //             <form onSubmit={}>
    //                 <textarea id="Comment_section_textarea"></textarea>
    //                 <input type="submit" value="submit" onSubmit={}></input>
    //             </form>
    //         </div>
    //     )
    }
    

export default Comment_section;