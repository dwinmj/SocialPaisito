
import UserRoute from "../../../components/routes/UserRoute";
import Friends from "../../../components/cards/Friends";
const FriendsPage = () => {


    return(
        <UserRoute>
            <div className="container">
                <div className="row py-3  bg-default-image">
                    <div className="col">
                        <h1 className="display-1 text-center"> Friends </h1>
                    </div>
                </div>

                <div className="row py-3" >
                    <div className="col-md-8"> 
                        <Friends limit={31} />
                    </div>
                    <div className="col-md-4">
                        Sidebar 2
                    </div>
                </div>
            </div>
        </UserRoute>
    )}
export default FriendsPage;
