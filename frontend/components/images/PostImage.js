const PostImage = ({image, post_id}) =>( 
    <div key={post_id} 
        alt={image.s3Name} 
        className={'my-3'}
                                        style={{
                                            backgroundImage: "url("+ image.public_url + ")",
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center center',
                                            backgroundSize: 'contain',
                                            height: '400px'
                                        }}
        ></div> 
          
);
export default PostImage;