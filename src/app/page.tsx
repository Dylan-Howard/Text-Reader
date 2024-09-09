import Link from 'next/link';

import Box from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Reader from './reader';

export default function Home() {

  return (
    <Box>
      <Stack component="nav" direction="row">
        <Link href="about">About</Link>
      </Stack>
      <Reader />
    </Box>
  );
}
