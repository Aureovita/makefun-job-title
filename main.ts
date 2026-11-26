// Entry for the "Weirdest Job Title" bounty on make.fun.
// The entire submission is a single job title: it borrows the most
// corporate phrasing imaginable ("Senior Vice President of ...") and
// spends all that gravitas on the oldest joke in tech support —
// turning it off and on again. This program simply files the title
// into entry.txt inside the output directory, unchanged, every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOB_TITLE = 'Senior Vice President of Turning It Off and On Again';
const MAX_TITLE_LENGTH = 60;

function assertTitleFits(title: string): void {
  if (title.length === 0) {
    throw new Error('job title must not be empty');
  }
  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(
      `job title is ${title.length} characters; the limit is ${MAX_TITLE_LENGTH}`,
    );
  }
}

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.trim() !== '' ? fromEnv : '/output';
}

function main(): void {
  assertTitleFits(JOB_TITLE);
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, 'entry.txt');
  writeFileSync(target, JOB_TITLE + '\n', 'utf8');
  // Echo the filing to stdout so the run log shows the exact title
  // and where it landed, without anyone having to open the file.
  console.log(`filed ${JOB_TITLE.length} chars to ${target}: ${JOB_TITLE}`);
}

main();
