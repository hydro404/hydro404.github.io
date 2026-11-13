import type { ImageMetadata } from 'astro';
import camapa from '../assets/achievements/camapa-2025.jpg';
import dlsmhsi from '../assets/achievements/dlsmhsi-2026.jpg';
import eduvote from '../assets/achievements/eduvote-2026.jpg';
import hydroPin from '../assets/achievements/hydro-pin-2026.jpg';
import roboZ2025 from '../assets/achievements/robo-z-2025.jpg';
import roboZChampion from '../assets/achievements/robo-z-2026-champion.jpg';
import roboZMentors from '../assets/achievements/robo-z-2026-mentors.jpg';
import robosoccer from '../assets/achievements/robosoccer-2026.jpg';
import smartR from '../assets/achievements/smart-r-2025.jpg';
import summerCup from '../assets/achievements/summer-cup-2026.jpg';

/**
 * Coaching and competition results. Students are not named in the text:
 * give the event, the result, and my own role. Newest first in each list.
 */
export interface AchievementPhoto {
  src: ImageMetadata;
  alt: string;
}

export interface Achievement {
  title: string;
  event: string;
  date: string;
  results: string[];
  role: string;
  summary?: string;
  photos: AchievementPhoto[];
}

export const research: Achievement[] = [
  {
    title: 'Hydro-PIN',
    event: 'Mathematics and Computational Science, Division Science and Technology Fair',
    date: '2026',
    results: ['1st place'],
    role: 'Adult Sponsor',
    summary: 'A map-based web tool that estimates flood depth at any location in Camalig, Albay. Its results agreed 79% to 87% with Project NOAH flood-hazard maps.',
    photos: [{ src: hydroPin, alt: 'Division Science and Technology Fair 2026 announcement: Mathematics and Computational Science, individual, 1st place' }],
  },
  {
    title: 'EduVote',
    event: 'Science Innovation Expo, Division Science and Technology Fair',
    date: '2026',
    results: ['3rd place'],
    role: 'Adult Sponsor',
    summary: 'An offline voting system for school elections.',
    photos: [{ src: eduvote, alt: 'Division Science and Technology Fair 2026 announcement: Science Innovation Expo, 3rd place' }],
  },
  {
    title: 'SMART-R',
    event: 'Mathematics and Computational Science, team category',
    date: '2025',
    results: [
      '1st place and Best Presenter, Division Science and Technology Fair',
      '2nd place, Regional Science and Technology Fair',
    ],
    role: 'Coach and Adult Sponsor',
    summary: 'A routing tool that finds the shortest safe routes for relief vehicles in flood-prone Camalig, Albay. It combines Dijkstra’s algorithm and vehicle-routing optimization in Python with flood-hazard maps.',
    photos: [{ src: smartR, alt: 'The Mathematics and Computational Science team with their coaches, holding a certificate for 1st place and Best Presenter' }],
  },
  {
    title: 'CAMAPA',
    event: 'Robotics and Intelligent Machines, team category',
    date: '2025',
    results: ['3rd place and Best Presenter, Division Science and Technology Fair'],
    role: 'Coach and Adult Sponsor',
    summary: 'An Arduino-based device that monitors rainfall and flood levels and sends alerts in several ways. Its sensors tested above 95% accuracy.',
    photos: [{ src: camapa, alt: 'The Robotics and Intelligent Machines team with their coaches, holding certificates for 3rd place and Best Presenter' }],
  },
];

export const robotics: Achievement[] = [
  {
    title: 'Robo Z: Philippine Robotics Innovation Cup, Leg 1',
    event: 'De La Salle Santiago Zobel School, Muntinlupa',
    date: 'October 2026',
    results: [
      'Champion, Z-Puck Tri-Bot Hockey 1 kg RC, Upper Division',
      '2nd place, Z-Puck Tri-Bot Hockey 1 kg RC, Mentors’ Edition, as a competitor',
      '5th place, Z-Puck Tri-Bot Hockey 1 kg RC, Upper Division',
      '8th place overall for the school, Upper Division',
    ],
    role: 'Coach and competitor',
    photos: [
      { src: roboZChampion, alt: 'Three students with gold medals and a certificate: Champion, Z-Puck Tri-Bot Hockey, Upper Division' },
      { src: roboZMentors, alt: 'Three coaches with medals: 2nd place, Z-Puck Tri-Bot Hockey, Mentors’ Edition' },
    ],
  },
  {
    title: 'RoboSoccer, Division Science and Technology Fair',
    event: 'Schools Division science fair',
    date: '2026',
    results: ['2nd place'],
    role: 'Coach',
    photos: [{ src: robosoccer, alt: 'Three students holding their RoboSoccer robots and controllers, standing with their two coaches' }],
  },
  {
    title: 'Pilipinas RoboSports Tournament Summer Cup, Luzon Leg',
    event: 'Sorsogon Provincial Gymnasium, Sorsogon City',
    date: 'May 2026',
    results: ['5th place, RoboHockey Advanced (Open), two teams'],
    role: 'Coach',
    photos: [{ src: summerCup, alt: 'A coach and three students on stage holding certificates of recognition at the Summer Cup' }],
  },
  {
    title: 'DLSMHSI RoboSports Tournament',
    event: 'De La Salle Medical and Health Sciences Institute, Dasmariñas, Cavite',
    date: 'January 2026',
    results: ['5th place, RoboHockey Raptor Basic (Open), two teams'],
    role: 'Coach',
    photos: [{ src: dlsmhsi, alt: 'Students and coaches on stage holding 5th place certificates at the DLSMHSI RoboSports Tournament' }],
  },
  {
    title: 'Robo Z: Philippine Robotics Innovation Cup',
    event: 'De La Salle Santiago Zobel School, Muntinlupa',
    date: 'October 2025',
    results: ['8th place, Programmable Line Tracing, senior division'],
    role: 'Coach',
    photos: [{ src: roboZ2025, alt: 'A coach with two students holding medals and 8th place certificates at Robo Z 2025' }],
  },
];

/** The five results shown on the homepage. */
export const highlights = [
  { date: 'October 2026', result: 'Champion', detail: 'Z-Puck Tri-Bot Hockey, Robo Z: Philippine Robotics Innovation Cup', role: 'Coach' },
  { date: 'October 2026', result: '2nd place, Mentors’ Edition', detail: 'Z-Puck Tri-Bot Hockey, Robo Z: Philippine Robotics Innovation Cup', role: 'Competitor' },
  { date: '2026', result: '1st place', detail: 'Hydro-PIN, a student flood-depth research project, Division Science and Technology Fair', role: 'Adult Sponsor' },
  { date: '2026', result: '2nd place', detail: 'RoboSoccer, Division Science and Technology Fair', role: 'Coach' },
  { date: '2025', result: '1st place and Best Presenter', detail: 'SMART-R, a student disaster-routing research project. 2nd place at the regional fair', role: 'Coach and Adult Sponsor' },
];
