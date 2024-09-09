
import { useState, useEffect, ChangeEvent } from 'react';

import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";

import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

async function unpackFile (file: Blob) {
  const reader = new FileReader();
  reader.readAsText(file);

  const zipFileReader = new BlobReader(file);

  const textWriter = new TextWriter();
  const zipReader = new ZipReader(zipFileReader);
  const firstEntry = (await zipReader.getEntries()).shift();

  if (firstEntry === undefined || firstEntry.getData === undefined) {
    return null;
  }

  const data = await firstEntry.getData(textWriter);
  await zipReader.close();

  return data;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// eslint-disable-next-line @typescript-eslint/ban-types
export default function Library({ handlePlay } : { handlePlay : Function }) {
  const [library, setLibrary] = useState({
    items: [{ id: 0, title: 'Test book', ref: '', content: '' }],
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialogOpen = (open: boolean) => {
    if (dialogOpen !== open) {
      setDialogOpen(open);
      console.log(`Setting to ${open}`);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('library');
    if (data) {
      const library = JSON.parse(data);
      if (library) {
        setLibrary(library);
      }
    } else {
      localStorage.setItem('library', JSON.stringify([]));
    }
  }, []);

  const handleAddMedia = ({ title, ref, content }: { title: string, ref: string, content: string }) => {
    setLibrary({
      ...library,
      items: [
        ...(library.items === undefined ? [] : library.items),
        {
          id: library.items === undefined ? 0 : library.items.length,
          title: title,
          ref: ref,
          content: content,
        }
      ],
    });
    localStorage.setItem('library', JSON.stringify({
      ...library,
      items: [
        ...(library.items === undefined ? [] : library.items),
        {
          id: library.items === undefined ? 0 : library.items.length,
          title: title,
          ref: ref,
          content: content,
        }
      ],
    }));
  };

  const handleRemoveMedia = (id: number) => {
    setLibrary({
      items: [
        ...library.items.slice(0, id),
        ...library.items.slice(id + 1, library.items.length),
      ],
    });
    localStorage.setItem('library', JSON.stringify({
      items: [
        ...library.items.slice(0, id),
        ...library.items.slice(id + 1, library.items.length),
      ],
    }));
  }

  const handleSpeakRequest = (text: string) => {
    console.log(`Playing ${text}`);
    const synth = window.speechSynthesis;

    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);

    handlePlay('play', text);
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }

    unpackFile(file).then((data) => {
      console.log(data);
    });
  }
  
  return (
    <Paper sx={{ p: 2 }}>
      <List sx={{ mb: 2 }}>
        {
          library.items
            ? library.items.map(({ id, title, content }) => (
              <ListItem
                key={id}
                secondaryAction={
                  <Stack direction="row">
                    <IconButton edge="start" aria-label="play" onClick={() => handleSpeakRequest(content)}>
                      <PlayArrowIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMedia(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={title}
                  secondary={content.length < 32 ? content : `${content.substring(0, 32)}...`}
                />
              </ListItem>
            ))
            : <Typography>No items</Typography>
        }
      </List>
      <Stack direction="row" justifyContent="space-between" sx={{ maxWidth: 450, m: 'auto' }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload book
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleFileUpload(e)}
            multiple
          />
        </Button>
        <Button variant="contained" onClick={() => toggleDialogOpen(true)}>Add File</Button>
        <Button variant="outlined">Remove All Data</Button>
      </Stack>
      <Dialog
        open={dialogOpen}
        onClose={() => toggleDialogOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formJson = Object.fromEntries((formData as any).entries());
            const title = formJson.title;
            const content = formJson.content;

            handleAddMedia({ title: title, ref: '', content: content });
            toggleDialogOpen(false);
          },
        }}
      >
        <DialogTitle>Add Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            multiline
            rows={4}
            margin="dense"
            id="name"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}