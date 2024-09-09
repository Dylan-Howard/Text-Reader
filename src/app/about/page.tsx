import Link from 'next/link'
import Image from "next/image";

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function About() {
  return (
    <Container maxWidth="md">
      <Stack component="nav" direction="row" justifyContent="left">
        <Link href="/">Home</Link>
      </Stack>
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
          <Typography variant="h2" sx={{ mt: 2 }}>Key features include:</Typography>
          <ul>
            <li>
              <Typography variant="body1"><b>Easy document loading</b>: Simply upload your favorite books, PDFs, and other text-based documents.</Typography>
            </li>
            <li>
              <Typography variant="body1"><b>Customizable playback</b>: Adjust reading speed, voice options, and more to suit your preferences.</Typography>
            </li>
            <li>
              <Typography variant="body1"><b>Intuitive navigation</b>: Easily navigate through your documents with simple controls.</Typography>
            </li>
            <li>
              <Typography variant="body1"><b>Accessibility-focused</b>: Lisez is designed with accessibility in mind, making it suitable for a wide range of users.</Typography>
            </li>
          </ul>
          <Typography variant="body1" gutterBottom>
            Whether you&lsquo;re a visually impaired reader, a busy professional, or simply enjoy listening to books, Lisez offers a convenient and enjoyable way to experience your favorite stories.
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Link
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy now
            </Link>
            <Link
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </Link>
          </Stack>
        </Stack>
      </Stack>
      <Stack component="footer" direction="row" justifyContent="center" spacing={2}>
        <Link
          href="/about"
          target="_self"
          rel="noopender noreferrer"
        >
          About
        </Link>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </Stack>
    </Container>
  );
}