
import UserRoute from "../../components/routes/UserRoute";

const Profile = () => {


    return(
        <UserRoute>
            <div className="container">
                <div className="row py-3  bg-default-image">
                    <div className="col">
                        <h1 className="display-1 text-center"> admin profile </h1>
                    </div>
                </div>

                <div className="row py-3" >
                    <div className="col-md-8"> 
                        teams
                    </div>
                    <div className="col-md-4">
                        Sidebar 2
                    </div>
                </div>
            </div>
        </UserRoute>
    )}
export default Profile;