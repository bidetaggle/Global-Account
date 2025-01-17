import React, {useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import useArConnect from 'use-arconnect';
import {ctx} from '../../utils';
import {PathParams} from '../../types';
import {Menu, MenuItem} from '@material-ui/core';
import {IconButtonS} from '../../style/components/Header';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function GlobalAccountButton(){
  const arConnect = useArConnect();
  const {walletAddr, setWalletAddr} = useContext(ctx);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement | null)>(null);

  const history = useHistory();
  const {pathBase} = useParams<PathParams>();

  const disconnectWallet = async () => {
    await arConnect.disconnect();
    setWalletAddr("");
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openGlobalAccount = (e: React.MouseEvent<HTMLElement>) => {
    history.push(`/${pathBase}/${walletAddr}`);
    handleClose();
  };

  return(
    <>
      <IconButtonS onClick={handleClick}>
        <AccountCircleIcon />
      </IconButtonS>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={openGlobalAccount}>My Global Account</MenuItem>
        <MenuItem onClick={disconnectWallet}>Logout</MenuItem>
      </Menu>
    </>
  ); 
}

export default GlobalAccountButton;