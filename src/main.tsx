import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './styles.css';

export const createRoot = ViteReactSSG({ routes });
