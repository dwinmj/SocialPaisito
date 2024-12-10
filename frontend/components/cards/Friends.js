import { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import { UserContext } from '../../context';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import ProfileImage from '../images/ProfileImage'; 
import axios from 'axios';


const daysago = (postDate) => { 
    dayjs.extend(relativeTime).locale(localeEn) 
    let fromNowOn = dayjs(postDate).fromNow(); 
    return(fromNowOn)
 };


 const Friends =  (limit) =>{
    const [ state ] = useContext(UserContext);
    const [ friends, setFriends] = useState([]);


    useEffect(() => {
        if( state && state.token ){ 
            fetchFriends();
     }
    }, [ state && state.token ]);
    const fetchFriends = async () => {
        try {
            const { data } = await axios.get("/get-friends");
            setFriends(data);
        } catch (error) {
            console.log(error);
        }
    };
    const _limit = parseInt(limit) && limit < friends.length ? limit : friends.length;

     return (
        <>
            <div className="friends-list list-wrapper" >
                
                <div className="header-title friends-header"><h3 >Friends </h3><Link href="/dashboard/friends">See all( { friends && friends.length && ( friends.length )}  )</Link></div>
                <ul className="list">
                    { friends && friends.length && friends.slice(0,_limit).map( user =>
                    <li className="list-item" key={user._id}>
                        
                            { state !== null && (
                                <ProfileImage profilephoto = { user.profile_photo} size={40} class_name="frnds-profile" />
                            )
                                                         
                            }
                        <div className="list-item-content">
                            <h4>{user.name}</h4>
                            <p>@{user.username}</p>
                        </div>
                        <div className='friends-chat' >
                            <Link  href="#" >  
                                <div className="frnd-chat"></div>    
                            </Link>
                        </div>

                    </li>)
                }
                </ul>
            </div>
        </>
     );
 };


 export default Friends;

