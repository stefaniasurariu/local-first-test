// src/db.ts
import Dexie, { Table } from 'dexie';

export interface Note {
  id?: number;
  title: string;
  content: string;
  updatedAt: Date;
}

export class MySubClassedDexie extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      notes: '++id, title, content, updatedAt', // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
