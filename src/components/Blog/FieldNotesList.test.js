import { groupPostsByYear } from './FieldNotesList';

describe('groupPostsByYear', () => {
  it('keeps source order while deriving deterministic year groups and counts', () => {
    const source = [
      { slug: 'newest', date: '2026-07-10' },
      { slug: 'same-year', date: '2026-01-02' },
      { slug: 'older', date: '2025-12-31' },
    ];

    expect(groupPostsByYear(source)).toEqual([
      { year: '2026', posts: [source[0], source[1]] },
      { year: '2025', posts: [source[2]] },
    ]);
    expect(source.map((post) => post.slug)).toEqual(['newest', 'same-year', 'older']);
  });
});
