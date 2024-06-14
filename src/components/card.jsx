import * as React from 'react';
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
import axios from 'axios'
import { PostContext } from '../contextprovider/PostContext';
import {useContext} from 'react';



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
  const [expanded, setExpanded] = React.useState(false);
  const {posts} = useContext(PostContext);




  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {posts.length > 0 ?
      (posts.map( post =>(
        <Card sx={{ width: '19rem', margin:'20px' }}>
          <CardHeader
            avatar={
              <Avatar 
              sx={{ bgcolor: red[500] }} 
              aria-label="recipe" 
              src={`${client.defaults.baseURL}/media/${post.author_profile}`}/>
            }
            action={
              <IconButton aria-label="settings">
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
    </>
  );
}
