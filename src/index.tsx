// import 'dotenv/config';

import { createRoot } from 'react-dom/client';
import { Root } from './Root';

import './index.css';

createRoot(document.getElementById('root') as HTMLElement)
  .render(<Root />);
