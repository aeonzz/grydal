import { env } from '@/env';
import { createClient } from 'pexels';

export const pexelsClient = createClient(env.PEXELS_API_KEY);
