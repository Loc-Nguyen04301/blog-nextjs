import world from '@/public/WeAreTheWorld.mp3';
import top from '@/public/dbangWorld.mp3';
import forest from '@/public/forestLullaby.mp3';
import podcast from '@/public/thePodcastIntro.mp3';

import dbanj from './dbanj.png';
import jackson from './jackson.jpeg';
import { Track } from '@/types/track';

export const trackMusics: Track[] = [
    {
        title: 'Michael Jackson – We Are The World',
        src: world,
        author: 'Michael Jackson',
        thumbnail: jackson,
    },
    {
        title: 'D’banj -Top Of The World',
        src: top,
        author: 'Dbanj',
        thumbnail: dbanj,
    },
    {
        title: 'Forest Lullaby',
        src: forest,
        author: 'Lesfm',
    },
    {
        title: 'The Podcast Intro',
        src: podcast,
        author: 'Music Unlimited',
    },
];
