import { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import { UserContext } from "../../context/index";
import Link from 'next/link';
//import friends from '../cards/Friends';
import axios from "axios";
import { toast } from 'react-toastify';
//require("dotenv").config();


//fetchrecomFriends

const RecommendedFriends = ({limit}) => {
   const [state, setState] = useContext(UserContext);
    const [friends, setFriends] =  useState([]); 
    const [suggestfriends, setSuggestfriends ] = useState([]); //useContext(UserContext); get-suggested-friends
    const router = useRouter();

    //const limit = limit;
    const fetchrecomFriends = async (limit) => {
        try {
             //console.log('RecommendedFriends:'+limit);
            const { data } = await axios.get("/get-suggested-friends/"+limit);
            
            setSuggestfriends(data);
        } catch (error) {
            throw new Error(error);
        }
    };
    const makefriend = async (user) => {

        try {
            const  { data }  = await axios.put('/add-friend', { _id: user._id });
            let _auth = JSON.parse(localStorage.getItem('auth'));
            _auth.user = data.user;
            localStorage.setItem('auth', JSON.stringify(_auth));
            setState({ ...state, user: data.user });
            let filteredFriends = suggestfriends.filter((p) => p._id !== user._id ); //.filter((p) => p._id !== user._id);
            setSuggestfriends(filteredFriends);
            setFriends( data.user.friends);
            toast.success(`You are now following ${ data.follower.name}!`);

        } catch (error) {
            throw new Error(error);
        }
    };
    const removefriend = async (user) => {
        try {
            const { data } = await axios.delete('/remove-friend', { _id: user._id });
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        if( state && state.token ){ 
            console.log('FETCHCOMFRIENDS::'+limit)
         fetchrecomFriends(limit);
     }
    }, [ state && state.token ]);
    
    
    const suggest_friends = suggestfriends;
    
    
    return (
        <>
        { suggest_friends.length }
            <div className="header-title"><h4>Recommended Friends</h4> 
                <Link href="/dashboard/friends/recommended">See all</Link>
            </div>
            <ul className="list row">
                {suggest_friends && suggest_friends.map((user) =>
                    <li className="list-item col-md-6" key={user._id}>
                        <div className="tcard">
                            <div className="card" style={{width:'185px'}}>
                                <div className="top" style={{ backgroundImage: "url(" + user.profile_photo.public_url + ")", height: '120px' }}> 
                                </div>
                                <div className="card-body">
                                    <h5 className="c-text card-title">{user.name}</h5>
                                    <p className="c-text card-text">@{user.username}</p>

                                </div>
                                <div className="card-footer">
                                    <a href="#" onClick={() => { makefriend(user) }} className="btn btn-primary">Add Friend</a>
                                    {/* <a href="#" onClick={() => { removefriend(user) }} className="btn btn-primary">X</a> */}
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            </ul>

        </>);
};

export default RecommendedFriends; //, fetchUserPosts, fetchFriends, fetchrecomFriends };