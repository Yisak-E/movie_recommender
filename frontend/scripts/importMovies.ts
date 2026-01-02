import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ----------------------------- TYPES ----------------------------- */

type RawMovie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
};

type MoviesFile = {
  movies: RawMovie[];
};

/* ------------------------ FIREBASE INIT --------------------------- */

const serviceAccountPath = path.resolve(
  __dirname,
  '../firebase/serviceAccountKey.json'
);

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
  ),
});

const db = admin.firestore();

/* -------------------------- HELPERS ------------------------------- */

function parseNumber(value?: string): number | null {
  if (!value || value === 'N/A') return null;
  const n = Number(value.replace(/,/g, ''));
  return isNaN(n) ? null : n;
}

function splitList(value?: string): string[] {
  if (!value || value === 'N/A') return [];
  return value.split(',').map(v => v.trim());
}

function normalizeMovie(raw: RawMovie) {
  return {
    imdbId: raw.imdbID,
    title: raw.Title,
    year: parseNumber(raw.Year),
    rated: raw.Rated,
    released: raw.Released,
    runtimeMinutes: parseNumber(raw.Runtime),
    genres: splitList(raw.Genre),
    directors: splitList(raw.Director),
    writers: splitList(raw.Writer),
    actors: splitList(raw.Actors),
    plot: raw.Plot,
    languages: splitList(raw.Language),
    countries: splitList(raw.Country),
    awards: raw.Awards,
    poster:
      raw.Poster && raw.Poster !== 'N/A'
        ? raw.Poster
        : null,
    ratings: raw.Ratings ?? [],
    metascore: parseNumber(raw.Metascore),
    imdbRating: parseNumber(raw.imdbRating),
    imdbVotes: parseNumber(raw.imdbVotes),
    boxOffice: parseNumber(raw.BoxOffice),
    type: raw.Type,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

/* -------------------------- IMPORT LOGIC --------------------------- */

async function importMovies() {
  const jsonPath = path.resolve(__dirname, '../data/movies.json');
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const parsed = JSON.parse(rawData) as MoviesFile;

  const movies = parsed.movies;

  if (!Array.isArray(movies)) {
    throw new Error('movies.json -> movies is not an array');
  }

  console.log(`🎬 Found ${movies.length} movies`);

  const BATCH_LIMIT = 500;
  let batch = db.batch();
  let batchCount = 0;
  let total = 0;

  for (const raw of movies) {
    if (!raw.imdbID) {
      console.warn(`⚠️ Skipping movie without imdbID: ${raw.Title}`);
      continue;
    }

    const ref = db.collection('movies').doc(raw.imdbID);
    const movie = normalizeMovie(raw);

    batch.set(ref, movie, { merge: true });
    batchCount++;
    total++;

    if (batchCount === BATCH_LIMIT) {
      await batch.commit();
      console.log(`✅ Committed ${total} movies`);
      batch = db.batch();
      batchCount = 0;
    }
  }

  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`🎉 Import completed: ${total} movies`);
}

/* ----------------------------- RUN ------------------------------- */

importMovies()
  .then(() => {
    console.log('🚀 Done');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Import failed:', err);
    process.exit(1);
  });
