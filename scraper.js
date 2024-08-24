import * as cheerio from 'cheerio';


// Fetch HTML content from the given URL
const fetchHTML = async (url) => {
  try {
    return await cheerio.fromURL(url);
  } catch (error) {
    console.error('Error fetching the page:', error);
    throw error;
  }
};

// Format name into first and last name parts
const formatNameParts = (name) => {
  const parts = name.split(' ');
  const lastName = parts.filter((part, index) => { return /^[A-ZÁÉÍÓÚÑÜ]+$/.test(part) || index === parts.length - 1}).join(' ');
  const firstName = parts.filter((part, index) => !/^[A-ZÁÉÍÓÚÑÜ]+$/.test(part) && index !== parts.length - 1).join(' ');
  return { firstName, lastName };
}

// Generate profile URL based on member data
const generateProfileUrl = (profilePath, firstName, lastName) => {
  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ñ/g, "N").replace(/Ü/g, "U");
  const formattedFirstName = removeAccents(firstName.toUpperCase());
  const formattedLastName = removeAccents(lastName).replace(/ /g, '+');
  return `${profilePath}/${formattedFirstName}_${formattedLastName}/home`;
};

// Extract member data from the HTML element
const extractMemberData = ($element) => {
  const name = $element.find('div[class*="erpl_title-h4"]').text().trim()
  const { firstName, lastName } = formatNameParts(name);
  const partyGroup = $element.find('span[class*="sln-additional-info"]').eq(0).text().trim();
  const country = $element.find('span[class*="sln-additional-info"]').eq(1).text().trim();
  const image = $element.find('div[class*="erpl_image-frame"] img').eq(1).attr('src');
  const profilePath = $element.find('a').attr('href');
  const url = generateProfileUrl(profilePath, firstName, lastName);
  return { name, lastName, partyGroup, country, image, url };
}

// Scrape EU legislators from the page
export const scrapeEULegislators = async () => {
    const $ = await fetchHTML('https://www.europarl.europa.eu/meps/en/full-list/all');
    const first10MEPs = $('div[class*="erpl_member-list-item"]').slice(0, 10);
    return first10MEPs.map((_, element) => {
      const $element = $(element);
      return extractMemberData($element);
    }).get();
  }
