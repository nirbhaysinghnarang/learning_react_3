import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';

const HamburgerMenu = ({setTab}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const options = [
    { name: "projects" },
    { name: "about" },
    { name: "experience" },
    { name: "education" },
    { name: "home" },
    { name: "passion projects"}
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setTab(option)
    handleClose();
  };

  return (
    <div style={{ position: 'absolute', top: 100, right: 100, color:"hotpink", zIndex: 9999 }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
  
        open={isOpen}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem sx={{ color: 'hotpink', fontFamily: "Dela Gothic One" }}key={index} onClick={() => handleMenuItemClick(option)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HamburgerMenu;
