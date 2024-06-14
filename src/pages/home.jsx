import {useState, useContext, useEffect, Fragment} from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { TextField, Avatar, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import RecipeReviewCard from '../components/card';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link } from 'react-router-dom';
import img1 from '../image/logo.png'
import { PostContext } from '../contextprovider/PostContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
baseURL: "http://127.0.0.1:8000"
});

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Home() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDecimal, setProductDecimal] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(null);
  const {setPosts} = useContext(PostContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(()=>{
    client.get('/api/getproduct').
    then(function(res){
      const data = res.data
      setPosts(data);
    })
  },[setPosts]);

  const sendPost= async() => {
    console.log("asdasd")
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURLt = URL.createObjectURL(file);
      setImageURL(imageURLt);
      setImage(file);
    }
  };

  const handleOpenPostDialog = () => {
    setOpenPostDialog(true);
  }

  const handleClosePostDialog = () => {
    setOpenPostDialog(false);
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

   const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/profile" style={{textDecoration:'none', color:'black'}}>Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/" style={{textDecoration:'none', color:'black'}}>Log out</Link></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Link to="/profile">Profile</Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' , textstyle:'bold', flexGrow:10} }}
            >
            SAVERS TRAILBLAZER
            </Typography>
          
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <img src={img1} alt="" style={{height:'auto', width:'50px'}}/>
            </div>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
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
            {['Profile', 'Shop', 'Crud', 'Favorites'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <Link to={`/${text === 'Profile' ? 'profile' : text === 'Shop' ? 'shop': text === 'Crud' ? 'crud' :text.toLowerCase()}`} style={{textDecoration: 'none', color:'black'}}>
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
          <div style={{margin:'30px'}}>
            <DrawerHeader />
            <div style={{display: 'flex', flexDirection:'row',flexWrap: 'wrap', gap: '5px', justifyContent:'center' }}>
              <RecipeReviewCard />
            </div>
          </div>
        {renderMobileMenu}
        {renderMenu}
      </Box>

      {/* Post Dialog */}
      <Fragment>
        <Dialog
          sx={{
            '& .MuiDialog-paper': {
              minWidth: { md: '500px', lg: '700px' },
            },
          }}
          fullScreen={fullScreen}
          open={openPostDialog}
          onClose={handleClosePostDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create a Post"}
          </DialogTitle>
          <DialogContent>
            <TextField 
              value={productName}
              fullWidth 
              className="title" 
              id="outlined-basic" 
              label="Product Name" 
              variant="outlined"
              onChange={e => setProductName(e.target.value)}
            />
            <TextField
              value={productPrice}
              fullWidth
              id="outlined-multiline-static"
              label="Price"
              variant="outlined"
              margin="normal"
              onChange={e => setProductPrice(e.target.value)}
            />
            <TextField
              value={productDecimal}
              fullWidth
              id="outlined-multiline-static"
              variant="outlined"
              margin="normal"
              onChange={e => setProductDecimal(e.target.value)}
            />
            <TextField
              value={productDescription}
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={5}
              variant="outlined"
              margin="normal"
              onChange={e => setProductDescription(e.target.value)}
            />
            {imageURL && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 2,
                }}
              >
                <Avatar
                  alt="Selected Image"
                  src={imageURL}
                  variant="square"
                  sx={{ width: 150, height: 150 }}
                />
              </Box>
          )}
          </DialogContent>
          <DialogActions>
          <Button 
            component="label"
          >
            Add Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>

            <Button autoFocus onClick={handleClosePostDialog}>
              Cancel
            </Button>
            <Button onClick={sendPost} autoFocus>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </>
    
  );
}
