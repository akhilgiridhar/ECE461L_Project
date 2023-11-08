import React, { useState, useEffect } from "react";
import "./App.css";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Tooltip, Avatar, Container, Grid, TextField, Button, Modal, Box } from "@mui/material";
import ProjectsScreen from "./pages/ProjectsScreen";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 10,
};

function Projects() {

  const navigate = useNavigate();
  const auth = useAuth()

  const { userid, name } = useParams();

  const settings = ['Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleLogout = (e) => {
    auth.logout(userid)
    navigate('/')
  }

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [message, setMessage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectId2, setProjectId2] = useState("");
  const [projectDescription, setProjectDescription] = useState("")
  const [projects, setProjects] = useState(null);

  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectId = (e) => {
    setProjectId(e.target.value);
  };

  const handleProjectId2 = (e) => {
    setProjectId2(e.target.value);
  };

  const handleProjectDescription = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleModal3 = () => {
    setIsModalOpen3(true);
  };

  const closeModal3 = () => {
    setIsModalOpen3(false);
  };

  useEffect(() => {
    handleGetProjects(); // Fetch projects when the component mounts
  }, []);

  const handleGetProjects = () => {
    var fetchURL = "/getProjects/" + userid;
    fetch(fetchURL)
      .then((response) => response.text())
      .then(function (data) {
        data = JSON.parse(data)
        setProjects(data)
        console.log(data)
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    var fetchURL = "/createProject?name=" + projectName + "&description=" + projectDescription + "&projectId=" + projectId + "&userId=" + userid + "&userName=" + name;
    fetch(fetchURL)
      .then((response) => response.text())
      //.then((data) => console.log(data))
      .then(function (data) {
        data = JSON.parse(data);

        if (data.isAuthenticated) {
          closeModal1();
          handleGetProjects();
        } else {
          setMessage("Project exists");
          setIsModalOpen2(true)
        }
      });
  }

  const handleJoinProject = (e) => {
    e.preventDefault();
    var fetchURL = "/joinProject?projectid=" + projectId2 + "&username=" + userid + "&name=" + name;
    fetch(fetchURL)
      .then((response) => response.text())
      //.then((data) => console.log(data))
      .then(function (data) {
        data = JSON.parse(data);

        if (data.code === 200) {
          if(data.joined) {
            closeModal3();
            handleGetProjects();
          } else {
            setMessage(data.message);
            setIsModalOpen2(true)
          }
        } else {
          setMessage(
            "response code: " +
            data.code +
            " and message recieved: " +
            data.error
          );
        }
      });
  }

  const displayProjects = () => {
    if (!projects) return null;

    return projects.map((project, index) => (
      <Grid item xs={12} key={index}>
        <ProjectsScreen userid={userid} projectid={project.projectId} name={project.name} qty1={project.HW1} qty2={project.HW2} users={project.names} joined={project.joined} user={name} reload={handleGetProjects}></ProjectsScreen>
      </Grid>
    ));
  }

  return (
    <Container maxWidth="xl" className="top-left-container">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Welcome {name}!
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{ display: 'flex', alignContent: 'center', paddingTop: '10px', textAlign: 'center' }}>
        <Button
          onClick={handleModal1}
          variant="contained"
          color="success"
          size="medium"
          style={{}}
        >
          Create Project
        </Button>
      </div>
      <div style={{ display: 'flex', alignContent: 'center', paddingTop: '10px', textAlign: 'center' }}>
        <Button
          onClick={handleModal3}
          variant="contained"
          color="success"
          size="medium"
          style={{}}
        >
          Join Project
        </Button>
      </div>
      <Modal
        open={isModalOpen1}
        onClose={closeModal1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create Project</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '60px', marginBottom: '10px' }}>
            <h3>Name:</h3>
            <TextField onChange={handleProjectName} ></TextField>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <h3>Description:</h3>
            <TextField onChange={handleProjectDescription} ></TextField>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '10px' }}>
            <h3>Project ID:</h3>
            <TextField onChange={handleProjectId} ></TextField>
          </div>
          <Button onClick={handleCreateProject}>Create</Button>
        </Box>
      </Modal>
      <Modal
        open={isModalOpen3}
        onClose={closeModal3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Join Project</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '10px' }}>
            <h3>Project ID:</h3>
            <TextField onChange={handleProjectId2}></TextField>
          </div>
          <Button onClick={handleJoinProject}>Join</Button>
        </Box>
      </Modal>
      <Modal
        open={isModalOpen2}
        onClose={closeModal2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{message}</h2>
          <Button onClick={closeModal2}>Close</Button>
        </Box>
      </Modal>
      <Grid container spacing={3} style={{ padding: "5px" }}>
        {displayProjects()}
      </Grid>
    </Container>
  );
}

export default Projects;
