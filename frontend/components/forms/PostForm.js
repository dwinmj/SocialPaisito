import { useState, useContext, useEffect, } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { Avatar } from "antd";
//import { v4 as uuidv4 } from 'uuid';
//import ReactQuill   from "react-quill";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    const { default: ImageUploader } = await import('../ImageUploader/ImageUploader');
    const { ImageDrop } = await import('quill-image-drop-module');
    const { default: ImageResize } = await import('quill-image-resize');
    RQ.Quill.register('modules/imageUploader', ImageUploader);
    RQ.Quill.register('modules/imageDrop', ImageDrop);
    RQ.Quill.register('modules/imageResize', ImageResize);
    return RQ;
  }, { ssr: false, });

import "react-quill/dist/quill.snow.css";
import "quill-image-uploader/src/quill.imageUploader.css";
import { CameraOutlined, CodeSandboxCircleFilled, ImportOutlined, LoadingOutlined } from "@ant-design/icons";





const handleImage = async (ifile) => {


  try {
    var nimages = [];
    var formData = new FormData();
    if (!ifile.length) {
      nimages[0] = ifile;
    } else {
      nimages = [...ifile];
    }

    Array.from(nimages).forEach(img => {
      formData.append('images', img)
    });

    const data  = await axios.post('/upload-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                      .then(response => {
                        // Handle response
                        const responseImageNames = response.data.image_names;
                        const imagesPosted = window.localStorage.getItem('postImages');
                        if( imagesPosted) {
                            let oldImages = JSON.parse(imagesPosted);
                            window.localStorage.setItem(`postImages` , JSON.stringify([...oldImages, ...responseImageNames]));
                        } else {
                            window.localStorage.setItem(`postImages` , JSON.stringify([...responseImageNames]));
                        }
                        return responseImageNames;
                    })
                    .catch(err => {
                        // Handle errors
                        toast.error(data.err);
                        console.log('data.error : ', data.err);
                    });
          return data;

  } catch (error) {
    console.log(error);
    //setUploading(false); 
  }
};

const handleImageClick = async (e) => {
  e.preventDefault();
  const _images = e.target.files;
  
  const imgs = await handleImage(_images);
  console.info("image handled");
  window.setImage = true;
  return true;
};



const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', { align: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
    ['color']
    [{ color: [] }, { background: [] }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageUploader: {
    upload: async (file) => {

      const imageUploaded = await handleImage(file);
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          resolve(`${imageUploaded[0].public_url}`);

          reject('failed!');
        }, 3500);
      });
    }
  },
  imageDrop: {
    displaySize: true
  },
  imageResize: {
    modules: ['Resize', 'Toolbar', 'DisplaySize']
    // See optional "config" below  'DisplaySize',
  },

};

const PostForm = ({ content, setContent, postSubmit, handleAttachments, uploading, images, setImages }) => {
 const [ imageset, setImageset] = useState(false);
 useEffect(() => {
    if( window && imageset && window.localStorage.getItem('postImages') ){ 
        const imagesPosted = window.localStorage.getItem('postImages');
        var newImages = [] ;
       if( imagesPosted ) {
          const addedImages = JSON.parse(imagesPosted);
          window.localStorage.removeItem(`postImages`);
          if( images.length ){
            setImages([...images, ...addedImages]);
          } else {
            setImages([...addedImages]);   
          }
         // setImages(addedImages);
         setImageset(false);
       }
     }
  }, [ process.browser && imageset && window && window.localStorage.getItem('postImages')  ]); 

    setInterval(() => {
      if(window.setImage) setImageset(true);
    }, 2000);
/*
  useEffect(() => {
    const fetchData = async () => {
      if( window && window.localStorage.getItem('postImages') ){ 
        const imagesPosted = window.localStorage.getItem('postImages');
        var newImages = [] ;
       if( imagesPosted ) {
          const addedImages = JSON.parse(imagesPosted);
          window.localStorage.removeItem(`postImages`);
          if( images.length ){
            setImages([...images, ...addedImages]);
          } else {
            setImages([...addedImages]);   
          }
         // setImages(addedImages);
         
       }
     }
      console.log('Hello useEffect');
    };
  
    setInterval( () =>{
      fetchData() .catch(console.error);
      }, 4500); 
      // make sure to catch any error
     
  }, []) */

  return (
    <UserRoute>
      <div className="card" >
        <form className="form-group" onSubmit={postSubmit}  >
          <div className="card-body pb-3">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(e) => setContent(e)}
              className="form-control"
              placeholder="What did you do today"
              modules={modules}
              key='710b962e-041c-11e1-9234-0123456789ab'
              // key={uuidv4()} its blocking the thetextbox
            />

          </div>

          <div className="card-footer d-flex justify-content-between text-muted">
            <button disabled={!content} className="btn btn-primary btn-sm mt-1" >Post</button>
            <label >
              {
                images && images.length ?
                  images.map((img) =>
                      <Avatar key={img.s3Name} size={60} src={img.public_url} className="mt-2" />
                  )
                  : uploading ? (<LoadingOutlined className="mt-2" />) : (
                    <>
                    </>
                  )
              }
            </label><label>
              <CameraOutlined className="mt-2" />
              <input onChange={ handleImageClick } type="file" accept="image/*" name="image" hidden multiple />

            </label>
          </div>
        </form>
      </div>
    </UserRoute>
  );

};

export default PostForm;