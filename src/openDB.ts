import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// you would have to import / invoke this in another file
export default async function openDB() {
	return open({
		filename: './microphones.sqlite',
		driver: sqlite3.Database
	});
}
