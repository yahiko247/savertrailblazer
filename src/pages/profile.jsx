import {useState, useContext, useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RecipeReviewCard from '../components/usercard';
import { Link } from 'react-router-dom';
import img1 from '../image/avatar.png'
import img2 from '../image/bg.jpg'
import { AuthContext } from '../contextprovider/AuthContext';
import { UserPostContext } from '../contextprovider/UserPostContext';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
baseURL: "http://127.0.0.1:8000"
});

//drawer settings
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ProfilePage() {
    //drawer
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const {setUserPosts} = useContext(UserPostContext);

  useEffect(() => {
    client.get(
      `/api/getuserproducts/${String(user.id)}`
      ).then (function(res){
          const data = res.data
          setUserPosts(data)
      })
  },[setUserPosts, user.id]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{background:'rgb(45, 92, 222)'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) } }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List  >
          {['Home', 'Shop', 'Add to cart', 'Favorites'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link to={`/${text === 'Home' ? 'home' : text === 'Shop' ? 'shop': text === 'Add to cart' ? 'add' :text.toLowerCase()}`} style={{textDecoration: 'none', color:'black'}}>
              <ListItemButton>
                <ListItemIcon style={{color:'black'}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
         <DrawerHeader />
        <Box className="col w-100" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
                <div className="row" style={{ color: 'black',  padding:'20px', borderRadius:'10px', position:'absolute',marginTop:'450px'}}>
                    <img src={img1} alt='' style={{height:'auto', width:'300px'}}/>
                    <p style={{marginTop:'-100px', marginLeft:'50px',color:'white', fontSize:'30px'}}>{user.username}</p>
                    
                </div> 
                 <div style={{ color: 'black', height:'auto', width:'auto', borderRadius:'50px'}}>
                    <img src={img2} alt="" style={{height:'auto', width:'100%' }}/>
                    <hr className="divider" />
                </div>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: '5px' }}>
                <RecipeReviewCard />
            </Box>
        </Box>
      </Main>
    </Box>
  );
}