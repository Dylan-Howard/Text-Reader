"use client"

import { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SpeedIcon from '@mui/icons-material/Speed';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';

import Library from './library';

export default function Reader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [media, setMedia] = useState({
    content: '',
    isPlaying: false,
    speechRate: 1,
    voice: '',
  });

  const toggleDrawer = (open: boolean) => {
    console.log('Setting drawer to ' + open);
    setDrawerOpen(open);
  };

  const handlePlayerClick = (action: string, body: string | null) => {
    console.log(`Received a ${action}`);
    if (action === 'play' && body !== null) {
      window.speechSynthesis.resume();
      setMedia({ ...media, content: body, isPlaying: true });
      toggleDrawer(true);
      return;
    }
    if (action === 'play') {
      window.speechSynthesis.resume();
      setMedia({ ...media, isPlaying: true });
      return;
    }
    if (action === 'pause') {
      window.speechSynthesis.pause();
      setMedia({ ...media, isPlaying: false });
      return;
    }
    if (action === 'stop') {
      window.speechSynthesis.pause();
      setMedia({ ...media, content: '', isPlaying: false });
      return;
    }
  }

  const handleRateSelectChange = (e: SelectChangeEvent<number>) => {
    setMedia({ ...media, speechRate: parseInt(e.target.value.toString()) });
  };

  const handleVoiceSelectChange = (e: SelectChangeEvent<string>) => {
    setMedia({ ...media, voice: e.target.value });
  };

  const voiceOptions = window.speechSynthesis.getVoices();

  const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const PlayerControls = (
    <Box
      role="presentation"
      sx={{ width: 450, p: 2 }}
    >
      <Box sx={{ height: 126, width: 126, backgroundColor: 'black' }} />
      <Stack direction="row">
        <IconButton
          aria-label={media.isPlaying ? 'pause' : 'play' }
          onClick={() => handlePlayerClick(media.isPlaying ? 'pause' : 'play', null)}
        >
          {media.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton aria-label="stop" onClick={() => handlePlayerClick('stop', null)}>
          <StopIcon />
        </IconButton>
        <IconButton aria-label="change speed">
          <SpeedIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <FormControl>
          <InputLabel id="select-rate-label">Speech Rate</InputLabel>
          <Select
            labelId="select-rate-label"
            id="select-rate"
            value={media.speechRate}
            label="Speech Rate"
            onChange={(e) => handleRateSelectChange(e)}
            sx={{ width: 200 }}
          >
            <MenuItem value={.5}>0.5</MenuItem>
            <MenuItem value={1}>1.0</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2.0</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-voice-label">Speech Voice</InputLabel>
          <Select
            labelId="select-voice-label"
            id="select-voice"
            value={media.voice}
            label="Voice"
            onChange={(e) => handleVoiceSelectChange(e)}
            sx={{ width: 200 }}
          >
            {
              voiceOptions.map((voc) => (
                <MenuItem key={voc.voiceURI} value={voc.name}>{voc.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );

  return (
    <Box component="main">
      <Container maxWidth="sm">
        <Stack
          component="main"
          direction="row"
          justifyContent="center"
          sx={{ mt: 8, mb: 2 }}
        >
          <Stack direction="column">
            <Typography variant="h1">Lisez</Typography>
            <Typography variant="body1" gutterBottom>
              Lisez is a user-friendly app designed to simplify the reading experience for those who prefer to listen to their books. By providing a dedicated interface, Lisez offers a more intuitive and accessible way to load documents and have them read aloud.
            </Typography>
            <Button variant="contained" onClick={() => toggleDrawer(true)} sx={{ mb: 2 }}>Open</Button>
            <Library handlePlay={handlePlayerClick} />
          </Stack>
        </Stack>
      </Container>
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onOpen={() => toggleDrawer(true)}
        onClose={() => toggleDrawer(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        { PlayerControls }
      </SwipeableDrawer>
    </Box>
  );
}