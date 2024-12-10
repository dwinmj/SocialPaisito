import UserRoute from "../../../components/routes/UserRoute";
import Friends from "../../../components/cards/RecommendedFriends";
import RecommendedFriends from "../../../components/cards/RecommendedFriends";
const RecommendedPage = () => {


    return(
        <UserRoute>
            <div className="container">
                <div className="row py-3  bg-default-image">
                    <div className="col">
                        <h2 className="display-4 text-center"> Recommended Friends </h2>
                    </div>
                </div>

                <div className="row py-3" >
                    <div className="col-md-8"> 
                        <RecommendedFriends limit={15} />
                    </div>
                    <div className="col-md-4">
                        Sidebar 2
                    </div>
                </div>
            </div>
        </UserRoute>
    )}
export default RecommendedPage;