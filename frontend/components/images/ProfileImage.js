
const ProfileImage = ({profilephoto, size, class_name}) =>( 
    <div className={`icon-col no-grow${class_name ? ' '+ class_name: ''}`} key={ profilephoto && profilephoto.s3Name ? profilephoto.s3Name  : '644addd3ef42fe9e0b760724' }  >
        <div style={{ width:`${size}px`}} className="meterGraph">
            <div className="spacing">
                <span className="helper-profileImage profileImage" data-init-helper="true">
                    <span className="thumbnail">
                        
                        { profilephoto && profilephoto.public_url ? (
                            <>
                            <span className="img-wrapper">
                                <img alt={profilephoto.s3Name} src={profilephoto.public_url} className='user profile-image' height={size} width={size} />
                            </span>
                            </>
                                
                        ):(
                            <>
                            <span className="img-wrapper default-profile">
                                <div className="default-profile" height={size}  width={size} ></div>   
                            </span>
                            </>
                        )}
                        
                    </span>
                </span>
            </div>
        </div>
    </div>
);
export default ProfileImage;