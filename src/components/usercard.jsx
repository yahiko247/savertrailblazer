import {useState,useContext,Fragment} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios'
import { UserPostContext } from '../contextprovider/UserPostContext';
import { Button } from '@mui/material';



//localhost
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
baseURL: "http://127.0.0.1:8000"
});


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const {userPosts} = useContext(UserPostContext);
  const [selectedPost, setSelectedPost] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openDelDialog, setOpenDelDialog] = useState(false);
//   const [imageURL, setImageURL] = useState(`${user.profilepic}`)
  

  
  
//   const updateProfilePicture = async(e) => {
//     e.preventDefault()
//     try{
//         const formData = new FormData();
//         if (image instanceof File){
//             formData.append('profilepic',image)
//         }
//           const response = await client.put(
//             `/api/updateusername/${String(user.id)}`,
//             formData,
//             {
//               headers:{
//                 'Content-Type' : 'multipart/form-data',
//               }
//         });
//     }catch(error){
//         console.error('failed to update Error:',error)
//     }

//   }
  

  const deleteProduct = async(postId) => {
    const token = localStorage.getItem('authToken');
  
    try{
      const response = await client.delete(`/api/deleteproduct/${String(postId)}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      if(response.status === 200){
        
      }
    }catch (error) {
    console.error("Error deleting post:",error)
    }
  };

  const handleClose = () => {
    setOpenDelDialog(false);
  }

  const handleOpenDelDialog = () => {
    setOpenDelDialog(true);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleVertClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const handleVertClick = (e, post) => {
    setAnchorEl(e.currentTarget);
    setSelectedPost(post)
  };

  const handleSoldButtonClick = () => {
    handleClose();
    deleteProduct(selectedPost.id);
  }

  return (
    <>
    {userPosts.length > 0 ?
      (userPosts.map( post =>(
        <Card sx={{ width: '19rem', margin:'20px' }}>
          <CardHeader
            avatar={
                <Avatar 
                sx={{ bgcolor: red[500] }} 
                aria-label="recipe" 
                src={`${client.defaults.baseURL}/media/${post.author_profile}`}/>
            }
              
            action={
              <IconButton aria-label="settings" onClick={(e) => handleVertClick(e, post)}>
                <MoreVertIcon />
              </IconButton>
            }
            title={post.author_username}
            // subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image={`${client.defaults.baseURL}${post.image}`}
          />
          <CardContent>
            <Typography >
                 <div>₱{post.price}</div>  
            </Typography>
            <Typography>
              <div>{"Description"}</div>
            </Typography>
            <Typography>
              <div>{post.description}</div>
            </Typography>
          </CardContent>
        </Card>
      ))) : (
        <Typography>No Posted Products Yet</Typography>
      )} 
    <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleVertClose}
    >
        
        <MenuItem onClick={() => {handleOpenDelDialog(); }}>Delete Post</MenuItem>
    </Menu>

    <Fragment>
        <Dialog
            fullScreen={fullScreen}
            open={openDelDialog}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
            {"Mark as Sold"}
            </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you mark this product as sold this would delete it and neither you nor other people would be able to see it anymore.
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
            </Button>
            <Button autoFocus onClick={handleSoldButtonClick}>
                Sold
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
    </>
  );
}
