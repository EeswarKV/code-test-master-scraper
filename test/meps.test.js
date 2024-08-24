import { scrapeEULegislators } from '../scraper.js'

describe('EU Legislators Scraper', () => {
  let legislators;

  // Fetch the legislators before running the tests
  beforeAll(async () => {
    legislators = await scrapeEULegislators();
  });

  test('should return an array of 10 legislators', () => {
    expect(Array.isArray(legislators)).toBeTruthy();
    expect(legislators.length).toBe(10);
  });

  test('should validate the first legislator details', () => {
    const first = legislators[0];

    expect(first.name).toBe('Mika AALTOLA');
    expect(first.lastName).toBe('AALTOLA');
    expect(first.partyGroup).toBe('Group of the European People\'s Party (Christian Democrats)');
    expect(first.country).toBe('Finland');
    expect(first.url).toBe('https://www.europarl.europa.eu/meps/en/256810/MIKA_AALTOLA/home');
    expect(first.image).toBe('https://www.europarl.europa.eu/mepphoto/256810.jpg');
  });

  test('should validate the second legislator details', () => {
    const second = legislators[1];

    expect(second.name).toBe('Maravillas ABADÍA JOVER');
    expect(second.lastName).toBe('ABADÍA JOVER');
    expect(second.partyGroup).toBe('Group of the European People\'s Party (Christian Democrats)');
    expect(second.country).toBe('Spain');
    expect(second.url).toBe('https://www.europarl.europa.eu/meps/en/257043/MARAVILLAS_ABADIA+JOVER/home');
    expect(second.image).toBe('https://www.europarl.europa.eu/mepphoto/257043.jpg');
  });
});
