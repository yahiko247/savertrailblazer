import React, { useState } from 'react';
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
import HouseIcon from '@mui/icons-material/House';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SourceIcon from '@mui/icons-material/Source';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import GavelIcon from '@mui/icons-material/Gavel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


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

export default function Crud() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([
    { id: 1, name: 'John', lname:'Doe', contact:'9917121400', email:'jondoe@gmail.com', barangay: 'San Vicente', age: 20, zone: 6, municipal: 'Baungon', province:'bukidnon' },
    { id: 2, name: 'Jane ',lname:'Smith', contact:'9917121400', email:'jondoe@gmail.com', barangay: 'Imabtug', age: 18, zone: 7,municipal: 'Baungon', province:'bukidnon'},
   
  ]);
  const [formData, setFormData] = useState({ name: '', lname:'', contact:'', email:'', barangay: '', age:'', zone: '', municipal:'', province:''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    const newData = [...data, { id: data.length + 1, ...formData }];
    setData(newData);
    setFormData({ name: '', lname:'', contact:'', email:'', barangay: '', age:'' , zone:'', municipal:'', province:''});
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}style={{ background: 'rgba(254, 200, 10, 1)', color: 'white',}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Youth Page
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
             background: 'rgba(26, 24, 88, 1)'
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
        <List style={{color:'white'}}>
          {['Home', 'Brg Cetificate', 'Brg Official', 'Brg Indigency'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                 {index === 0 ? <HouseIcon style={{color: 'white'}} /> : index === 1 ? <MailIcon style={{color:'white'}}/> : index === 2 ? <GavelIcon style={{color:'white'}}/> : <InsertDriveFileIcon style={{color:'white'}}/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List style={{color: 'white'}}>
          {['Brg Clearance', 'Residendts', 'Request Documents'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ?  <FileCopyIcon style={{color: 'white'}}/> : index ===1 ? <FileOpenIcon style={{color:'white'}}/> : <SourceIcon style={{color:'white'}}/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <div >
            <Button onClick={handleOpenModal}>Add  Youth </Button>
              <Modal
                keepMounted
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style}>
                  <h3>Resident Form</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div style={{ marginRight: '10px'}}>
                            <Typography>
                                <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Name</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                                <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Barangay</label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        placeholder=""
                                        name="barangay"
                                        value={formData.barangay}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                                  <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Contact</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                                  <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Email</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                                  <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Age</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                            </Typography>
                        </div >
                        <div>
                            <Typography>
                                <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Surame</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="lname"
                                        value={formData.lname}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                                <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Zone</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="zone"
                                        value={formData.zone}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                                <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Municipal</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="municipal"
                                        value={formData.municipal}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                                <div>
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Province</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder=""
                                        name="province"
                                        value={formData.province}
                                        onChange={handleChange}
                                        style={{ margin: '5px' }}
                                    />
                                </div>
                            </Typography>
                        </div>
                    </div>
                    <button className='btn btn-success w-100' onClick={handleAdd}>Submit</button>
                </Box>
              </Modal>
            </div> 
          
        </Typography>
        <Typography paragraph>
          <TableContainer components={Paper}>
        
            <Table sx={{ minWidth: 650}}aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell >ID</TableCell >
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Email </TableCell>
                  <TableCell>Barangay</TableCell>
                  <TableCell>Age</TableCell >
                  <TableCell>Zone</TableCell>
                  <TableCell>Municipality</TableCell>
                  <TableCell>Province</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(item => (
                  <TableRow  key={item.id}>
                    <TableCell>{item.id}</TableCell >
                    <TableCell>{item.name}</TableCell >
                    <TableCell>{item.lname}</TableCell >
                    <TableCell>{item.contact}</TableCell >
                    <TableCell>{item.email}</TableCell >
                    <TableCell>{item.barangay}</TableCell >
                    <TableCell>{item.age}</TableCell >
                    <TableCell>{item.zone}</TableCell>
                    <TableCell>{item.municipal}</TableCell>
                    <TableCell>{item.province}</TableCell>
                    
                    <TableCell >
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </TableCell >
                  </TableRow>
                ))}
              </TableBody>
            </Table>
           
          </TableContainer>
          
        </Typography>
      </Main>
    </Box>
  );
}