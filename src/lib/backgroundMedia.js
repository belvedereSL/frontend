function backgroundImageUrl(source, width) {
  const parameters = new URLSearchParams({
    url: source,
    w: String(width),
    q: "90",
  });

  return `/.netlify/images?${parameters}`;
}

function backgroundImageSet(source, width, retinaWidth) {
  return `image-set(url("${backgroundImageUrl(source, width)}") 1x, url("${backgroundImageUrl(source, retinaWidth)}") 2x)`;
}

export function backgroundImageStyle(source) {
  return {
    "--detail-hero-background-original": `url("${source}")`,
    "--detail-hero-background-desktop": backgroundImageSet(source, 1600, 2560),
    "--detail-hero-background-mobile": backgroundImageSet(source, 960, 1920),
  };
}
